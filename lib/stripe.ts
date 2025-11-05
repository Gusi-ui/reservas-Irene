import Stripe from 'stripe';

// Cliente de Stripe para el servidor
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});

// Función para crear una sesión de checkout
export async function createCheckoutSession({
  bookingId,
  customerEmail,
  customerName,
  amount,
  bookingDetails,
}: {
  bookingId: string;
  customerEmail: string;
  customerName: string;
  amount: number;
  bookingDetails: {
    service: string;
    date: string;
    time: string;
    visitType: string;
  };
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Consulta de Nutrición - ${bookingDetails.service}`,
            description: `${bookingDetails.visitType} | ${bookingDetails.date} a las ${bookingDetails.time}`,
          },
          unit_amount: Math.round(amount * 100), // Stripe espera el monto en centavos
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/cancelled?booking_id=${bookingId}`,
    customer_email: customerEmail,
    metadata: {
      bookingId,
      customerEmail,
      customerName,
      service: bookingDetails.service,
      date: bookingDetails.date,
      time: bookingDetails.time,
      visitType: bookingDetails.visitType,
    },
  });

  return session;
}

