import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BookingLogic } from '@/lib/booking-logic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    const serviceId = searchParams.get('serviceId');
    
    if (!date || !serviceId) {
      return NextResponse.json(
        { error: 'Date and serviceId are required' },
        { status: 400 }
      );
    }

    const selectedDate = new Date(date);
    const timeSlots = BookingLogic.getAvailableTimeSlots(selectedDate);
    const availableSlots: any[] = [];

    for (const slot of timeSlots) {
      const isAvailable = await BookingLogic.isTimeSlotAvailable(selectedDate, slot.toTimeString());
      if (isAvailable) {
        availableSlots.push({
          time: slot.toTimeString().slice(0, 5), // HH:MM format
          available: true
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: availableSlots
    });
  } catch (error) {
    console.error('Error fetching time slots:', error);
    return NextResponse.json(
      { error: 'Failed to fetch time slots' },
      { status: 500 }
    );
  }
}