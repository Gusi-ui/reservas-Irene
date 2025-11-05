// Global type definitions for the nutrition booking app

export interface Customer {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  firstVisitDate?: Date;
  visitCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  basePrice: number;
  baseDuration: number; // Duration in minutes
  serviceType: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  customerId: string;
  serviceId: string;
  bookingDate: Date;
  bookingTime: string; // HH:MM format as string
  duration: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  stripePaymentId?: string;
  whatsappNotified: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  customer?: Customer;
  service?: Service;
  addons?: BookingAddon[];
}

export interface BookingAddon {
  id: string;
  bookingId: string;
  addonName: string;
  addonPrice: number;
  createdAt: Date;
}

export interface TimeSlot {
  id: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingFormData {
  serviceId: string;
  date: Date;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  notes?: string;
  selectedAddons: BookingAddon[];
}

export interface PriceCalculation {
  basePrice: number;
  duration: number;
  isFirstVisit: boolean;
  isSecondVisit: boolean;
  availableAddons: Array<{
    name: string;
    price: number;
    description?: string;
  }>;
  totalPrice: number;
}

export interface BookingStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface NavigationItem {
  name: string;
  href: string;
  current?: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address?: string;
  businessHours?: {
    [key: string]: string;
  };
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string; }>;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    message?: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface BookingStats {
  totalBookings: number;
  todayBookings: number;
  weekBookings: number;
  monthBookings: number;
  upcomingBookings: Booking[];
}

export interface CustomerVisitInfo {
  customerId: string;
  email: string;
  visitCount: number;
  lastVisitDate?: Date;
  firstVisitDate?: Date;
}