import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Cliente para uso del lado del cliente (navegador)
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Cliente para uso del lado del servidor con privilegios de administrador
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Función helper para obtener o crear cliente
export async function getOrCreateCustomer(
  email: string,
  name: string,
  phone: string
) {
  const { data, error } = await supabase
    .rpc('get_or_create_customer', {
      p_email: email,
      p_name: name,
      p_phone: phone
    });

  if (error) {
    console.error('Error getting/creating customer:', error);
    throw error;
  }

  return data as string; // UUID del cliente
}

// Función helper para calcular precio según historial
export async function calculateBookingPrice(
  customerEmail: string,
  serviceId: string,
  includeNutritionPlan: boolean = false
) {
  const { data, error } = await supabase
    .rpc('calculate_booking_price', {
      p_customer_email: customerEmail,
      p_service_id: serviceId,
      p_include_nutrition_plan: includeNutritionPlan
    });

  if (error) {
    console.error('Error calculating price:', error);
    throw error;
  }

  return data as {
    price: number;
    duration: number;
    visit_type: 'first' | 'second' | 'followup';
    visit_count: number;
    show_nutrition_plan: boolean;
  };
}

