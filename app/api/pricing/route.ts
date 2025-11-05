import { NextRequest, NextResponse } from 'next/server';
import { calculateBookingPrice } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, serviceId, includeNutritionPlan } = body;

    if (!email || !serviceId) {
      return NextResponse.json(
        { error: 'Email y serviceId son requeridos' },
        { status: 400 }
      );
    }

    const pricing = await calculateBookingPrice(
      email,
      serviceId,
      includeNutritionPlan || false
    );

    return NextResponse.json({ pricing });
  } catch (error) {
    console.error('Error calculating pricing:', error);
    return NextResponse.json(
      { error: 'Error al calcular el precio' },
      { status: 500 }
    );
  }
}

