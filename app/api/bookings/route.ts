import { NextRequest, NextResponse } from 'next/server';
import { supabase, getOrCreateCustomer } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      name,
      phone,
      serviceId,
      bookingDate,
      bookingTime,
      duration,
      totalPrice,
      visitType,
      notes,
      includeNutritionPlan
    } = body;

    // Validar campos requeridos
    if (!email || !name || !phone || !serviceId || !bookingDate || !bookingTime) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Obtener o crear el cliente
    const customerId = await getOrCreateCustomer(email, name, phone);

    // Crear la reserva
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        customer_id: customerId,
        service_id: serviceId,
        booking_date: bookingDate,
        booking_time: bookingTime,
        duration,
        total_price: totalPrice,
        visit_type: visitType,
        notes: notes || null,
        status: 'pending' // Inicialmente pendiente hasta que se confirme el pago
      })
      .select()
      .single();

    if (bookingError) {
      console.error('Error creating booking:', bookingError);
      return NextResponse.json(
        { error: 'Error al crear la reserva' },
        { status: 500 }
      );
    }

    // Si incluye plan de nutrición, agregarlo como addon
    if (includeNutritionPlan && visitType === 'second') {
      const { error: addonError } = await supabase
        .from('booking_addons')
        .insert({
          booking_id: booking.id,
          addon_name: 'Plan de Nutrición Personalizada',
          addon_price: 30.00
        });

      if (addonError) {
        console.error('Error adding nutrition plan addon:', addonError);
      }
    }

    // Incrementar visit_count del cliente
    const { error: updateError } = await supabase.rpc('increment_visit_count', {
      p_customer_id: customerId
    });

    if (updateError) {
      console.error('Error incrementing visit count:', updateError);
    }

    return NextResponse.json({ 
      success: true, 
      booking,
      bookingId: booking.id 
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error inesperado al crear la reserva' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      );
    }

    // Obtener el cliente por email
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .single();

    if (customerError && customerError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching customer:', customerError);
      return NextResponse.json(
        { error: 'Error al obtener datos del cliente' },
        { status: 500 }
      );
    }

    // Si no existe el cliente, devolver visitCount 0
    if (!customer) {
      return NextResponse.json({ 
        visitCount: 0,
        exists: false 
      });
    }

    // Obtener las reservas del cliente
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('*')
      .eq('customer_id', customer.id)
      .order('booking_date', { ascending: false });

    if (bookingsError) {
      console.error('Error fetching bookings:', bookingsError);
      return NextResponse.json(
        { error: 'Error al obtener reservas' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      visitCount: customer.visit_count,
      exists: true,
      customer: {
        id: customer.id,
        email: customer.email,
        name: customer.name,
        phone: customer.phone
      },
      bookings: bookings || []
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error inesperado al obtener información del cliente' },
      { status: 500 }
    );
  }
}

