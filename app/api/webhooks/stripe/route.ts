import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import Stripe from 'stripe';

// Configurar para que Next.js no parsee el body
export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(request: NextRequest): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  const reader = request.body?.getReader();
  
  if (!reader) {
    throw new Error('No request body');
  }

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return Buffer.from(result);
}

export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature');
  
  if (!sig) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const rawBody = await getRawBody(request);
    
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Manejar el evento
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Obtener el bookingId de los metadatos
        const bookingId = session.metadata?.bookingId;
        
        if (!bookingId) {
          console.error('No bookingId in session metadata');
          break;
        }

        // Actualizar el estado de la reserva
        const { error: bookingError } = await supabase
          .from('bookings')
          .update({
            status: 'confirmed',
            stripe_payment_id: session.payment_intent as string,
          })
          .eq('id', bookingId);

        if (bookingError) {
          console.error('Error updating booking:', bookingError);
          break;
        }

        // Crear registro de transacción
        const { error: transactionError } = await supabase
          .from('transactions')
          .insert({
            booking_id: bookingId,
            stripe_payment_id: session.payment_intent as string,
            amount: (session.amount_total || 0) / 100, // Convertir de centavos a euros
            currency: session.currency || 'eur',
            status: 'succeeded',
            payment_method: session.payment_method_types?.[0] || 'card',
          });

        if (transactionError) {
          console.error('Error creating transaction:', transactionError);
        }

        // Aquí podrías enviar notificaciones por WhatsApp/Email
        console.log(`Payment successful for booking ${bookingId}`);
        
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error('Payment failed:', paymentIntent.id);
        
        // Aquí podrías actualizar el estado de la reserva a 'failed'
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
  }
}

