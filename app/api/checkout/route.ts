import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      bookingId,
      customerEmail,
      customerName,
      amount,
      bookingDetails,
    } = body;

    // Validar campos requeridos
    if (!bookingId || !customerEmail || !customerName || !amount || !bookingDetails) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Crear sesión de checkout en Stripe
    const session = await createCheckoutSession({
      bookingId,
      customerEmail,
      customerName,
      amount,
      bookingDetails,
    });

    // Guardar el session_id en la reserva
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ stripe_session_id: session.id })
      .eq('id', bookingId);

    if (updateError) {
      console.error('Error updating booking with session_id:', updateError);
    }

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error al crear la sesión de pago' },
      { status: 500 }
    );
  }
}

