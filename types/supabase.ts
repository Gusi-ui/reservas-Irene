export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          email: string
          name: string | null
          phone: string | null
          first_visit_date: string | null
          visit_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          phone?: string | null
          first_visit_date?: string | null
          visit_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          phone?: string | null
          first_visit_date?: string | null
          visit_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string | null
          base_price: number
          base_duration: number
          service_type: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          base_price: number
          base_duration: number
          service_type: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          base_price?: number
          base_duration?: number
          service_type?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          customer_id: string
          service_id: string
          booking_date: string
          booking_time: string
          duration: number
          total_price: number
          status: string
          stripe_payment_id: string | null
          stripe_session_id: string | null
          whatsapp_notified: boolean
          notes: string | null
          visit_type: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          service_id: string
          booking_date: string
          booking_time: string
          duration: number
          total_price: number
          status?: string
          stripe_payment_id?: string | null
          stripe_session_id?: string | null
          whatsapp_notified?: boolean
          notes?: string | null
          visit_type?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          service_id?: string
          booking_date?: string
          booking_time?: string
          duration?: number
          total_price?: number
          status?: string
          stripe_payment_id?: string | null
          stripe_session_id?: string | null
          whatsapp_notified?: boolean
          notes?: string | null
          visit_type?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      booking_addons: {
        Row: {
          id: string
          booking_id: string
          addon_name: string
          addon_price: number
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          addon_name: string
          addon_price: number
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          addon_name?: string
          addon_price?: number
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          booking_id: string
          stripe_payment_id: string
          amount: number
          currency: string
          status: string
          payment_method: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          stripe_payment_id: string
          amount: number
          currency?: string
          status: string
          payment_method?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          stripe_payment_id?: string
          amount?: number
          currency?: string
          status?: string
          payment_method?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      time_slots: {
        Row: {
          id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          day_of_week: number
          start_time: string
          end_time: string
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          day_of_week?: number
          start_time?: string
          end_time?: string
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      admin_bookings_view: {
        Row: {
          id: string | null
          booking_date: string | null
          booking_time: string | null
          status: string | null
          total_price: number | null
          visit_type: string | null
          created_at: string | null
          customer_name: string | null
          customer_email: string | null
          customer_phone: string | null
          visit_count: number | null
          service_name: string | null
          service_type: string | null
          notes: string | null
          stripe_payment_id: string | null
          whatsapp_notified: boolean | null
          addons: Json | null
        }
      }
    }
    Functions: {
      get_or_create_customer: {
        Args: {
          p_email: string
          p_name: string
          p_phone: string
        }
        Returns: string
      }
      calculate_booking_price: {
        Args: {
          p_customer_email: string
          p_service_id: string
          p_include_nutrition_plan: boolean
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

