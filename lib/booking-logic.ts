import { PriceCalculation } from '@/types';

export class BookingLogic {
  // Pricing logic based on visit count
  static calculatePrice(
    visitCount: number,
    basePrice: number,
    baseDuration: number
  ): PriceCalculation {
    let duration = baseDuration;
    let isFirstVisit = false;
    let isSecondVisit = false;
    
    if (visitCount === 0) {
      // First visit: 90€, 120 minutes
      duration = 120;
      isFirstVisit = true;
      basePrice = 90;
    } else if (visitCount === 1) {
      // Second visit: 60€, 60 minutes, with optional nutrition plan addon
      duration = 60;
      isSecondVisit = true;
      basePrice = 60;
    } else {
      // Third or more visits: 60€, 60 minutes
      duration = 60;
      basePrice = 60;
    }

    const availableAddons = isSecondVisit ? [
      {
        name: 'Plan de nutrición personalizada',
        price: 30,
        description: 'Plan nutricional completo personalizado para tus necesidades'
      }
    ] : [];

    return {
      basePrice,
      duration,
      isFirstVisit,
      isSecondVisit,
      availableAddons,
      totalPrice: basePrice
    };
  }

  // Check if email exists and get visit count
  static async getVisitCountByEmail(email: string): Promise<number> {
    // This will be implemented with actual database query
    // For now, returning 0 as default
    return 0;
  }

  // Format time slot
  static formatTimeSlot(date: Date): string {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  // Get available time slots for a specific date
  static getAvailableTimeSlots(date: Date): Date[] {
    // Business hours: 9:00 AM - 6:00 PM, Monday to Friday
    const slots: Date[] = [];
    const dayOfWeek = date.getDay();
    
    // Skip weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return slots;
    }

    const startHour = 9; // 9 AM
    const endHour = 18;  // 6 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) { // 30-minute slots
        const slotTime = new Date(date);
        slotTime.setHours(hour, minute, 0, 0);
        slots.push(slotTime);
      }
    }

    return slots;
  }

  // Check if a time slot is available (no conflicts with existing bookings)
  static async isTimeSlotAvailable(date: Date, time: string): Promise<boolean> {
    // This will be implemented with actual database query
    // For now, returning true as default
    return true;
  }

  // Generate booking confirmation code
  static generateConfirmationCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Format price for display
  static formatPrice(price: number): string {
    return `${price.toFixed(0)}€`;
  }

  // Format duration for display
  static formatDuration(minutes: number): string {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 
        ? `${hours}h ${remainingMinutes}min`
        : `${hours}h`;
    }
    return `${minutes}min`;
  }

  // Validate email format
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate phone format (Spanish format)
  static isValidPhone(phone: string): boolean {
    const phoneRegex = /^(\+34|0034|34)?[6789]\d{8}$/;
    return phoneRegex.test(phone);
  }

  // Calculate days between dates
  static daysBetween(date1: Date, date2: Date): number {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  // Check if date is in the future
  static isDateInFuture(date: Date): boolean {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate >= now;
  }

  // Get next available booking date
  static getNextAvailableDate(): Date {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // If tomorrow is weekend, move to Monday
    const dayOfWeek = tomorrow.getDay();
    if (dayOfWeek === 0) {
      tomorrow.setDate(tomorrow.getDate() + 1);
    } else if (dayOfWeek === 6) {
      tomorrow.setDate(tomorrow.getDate() + 2);
    }
    
    return tomorrow;
  }
}