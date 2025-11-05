-- ============================================
-- SCRIPT DE CONFIGURACIÓN DE SUPABASE
-- Sistema de Reservas de Nutrición
-- ============================================
-- Ejecuta este script completo en el SQL Editor de Supabase
-- ============================================

-- Eliminar tablas existentes si existen (solo en desarrollo)
DROP TABLE IF EXISTS booking_addons CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS time_slots CASCADE;

-- ============================================
-- TABLA: customers (Clientes)
-- ============================================
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  first_visit_date TIMESTAMPTZ,
  visit_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: services (Servicios)
-- ============================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2) NOT NULL,
  base_duration INTEGER NOT NULL, -- Duración en minutos
  service_type TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: bookings (Reservas)
-- ============================================
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE RESTRICT,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  duration INTEGER NOT NULL, -- Duración en minutos
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled, completed
  stripe_payment_id TEXT,
  stripe_session_id TEXT,
  whatsapp_notified BOOLEAN DEFAULT false,
  notes TEXT,
  visit_type TEXT, -- 'first', 'second', 'followup'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: booking_addons (Complementos de reserva)
-- ============================================
CREATE TABLE booking_addons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  addon_name TEXT NOT NULL,
  addon_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: transactions (Transacciones de pago)
-- ============================================
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  stripe_payment_id TEXT UNIQUE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  status TEXT NOT NULL, -- succeeded, pending, failed, refunded
  payment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: time_slots (Horarios disponibles)
-- ============================================
CREATE TABLE time_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week INTEGER NOT NULL, -- 0 = Domingo, 1 = Lunes, etc.
  start_time TEXT NOT NULL, -- Formato HH:MM
  end_time TEXT NOT NULL, -- Formato HH:MM
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ÍNDICES para mejorar el rendimiento
-- ============================================
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_transactions_booking_id ON transactions(booking_id);
CREATE INDEX idx_transactions_stripe_payment_id ON transactions(stripe_payment_id);

-- ============================================
-- FUNCIONES TRIGGER para updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar triggers a las tablas
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_time_slots_updated_at BEFORE UPDATE ON time_slots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- POLÍTICAS RLS (Row Level Security)
-- ============================================
-- Habilitar RLS en todas las tablas
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;

-- Políticas para customers
CREATE POLICY "Permitir inserción pública de clientes" ON customers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir lectura pública de clientes (solo su email)" ON customers
  FOR SELECT USING (true);

CREATE POLICY "Permitir actualización pública de clientes" ON customers
  FOR UPDATE USING (true);

-- Políticas para services (solo lectura pública)
CREATE POLICY "Permitir lectura pública de servicios activos" ON services
  FOR SELECT USING (is_active = true);

-- Políticas para bookings
CREATE POLICY "Permitir inserción pública de reservas" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir lectura pública de reservas" ON bookings
  FOR SELECT USING (true);

CREATE POLICY "Permitir actualización pública de reservas" ON bookings
  FOR UPDATE USING (true);

-- Políticas para booking_addons
CREATE POLICY "Permitir inserción pública de complementos" ON booking_addons
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir lectura pública de complementos" ON booking_addons
  FOR SELECT USING (true);

-- Políticas para transactions
CREATE POLICY "Permitir inserción pública de transacciones" ON transactions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir lectura pública de transacciones" ON transactions
  FOR SELECT USING (true);

CREATE POLICY "Permitir actualización pública de transacciones" ON transactions
  FOR UPDATE USING (true);

-- Políticas para time_slots (solo lectura pública)
CREATE POLICY "Permitir lectura pública de horarios disponibles" ON time_slots
  FOR SELECT USING (is_available = true);

-- ============================================
-- DATOS INICIALES: Servicios
-- ============================================
INSERT INTO services (name, description, base_price, base_duration, service_type) VALUES
('Consulta de Nutrición', 'Consulta nutricional personalizada para mejorar tu alimentación y hábitos alimentarios.', 60.00, 60, 'general'),
('Trastornos Mentales', 'Nutrición especializada para el manejo de trastornos mentales y bienestar emocional.', 60.00, 60, 'specialized'),
('Autismo', 'Nutrición especializada para niños y adultos con trastorno del espectro autista.', 60.00, 60, 'specialized'),
('Nutrición Integrativa', 'Enfoque integrativo que combina nutrición convencional con medicina funcional.', 60.00, 60, 'advanced');

-- ============================================
-- DATOS INICIALES: Horarios disponibles
-- ============================================
-- Lunes a Viernes (1-5)
INSERT INTO time_slots (day_of_week, start_time, end_time) VALUES
-- Lunes
(1, '09:00', '09:30'),
(1, '09:30', '10:00'),
(1, '10:00', '10:30'),
(1, '10:30', '11:00'),
(1, '11:00', '11:30'),
(1, '11:30', '12:00'),
(1, '12:00', '12:30'),
(1, '16:00', '16:30'),
(1, '16:30', '17:00'),
(1, '17:00', '17:30'),
(1, '17:30', '18:00'),
-- Martes
(2, '09:00', '09:30'),
(2, '09:30', '10:00'),
(2, '10:00', '10:30'),
(2, '10:30', '11:00'),
(2, '11:00', '11:30'),
(2, '11:30', '12:00'),
(2, '12:00', '12:30'),
(2, '16:00', '16:30'),
(2, '16:30', '17:00'),
(2, '17:00', '17:30'),
(2, '17:30', '18:00'),
-- Miércoles
(3, '09:00', '09:30'),
(3, '09:30', '10:00'),
(3, '10:00', '10:30'),
(3, '10:30', '11:00'),
(3, '11:00', '11:30'),
(3, '11:30', '12:00'),
(3, '12:00', '12:30'),
(3, '16:00', '16:30'),
(3, '16:30', '17:00'),
(3, '17:00', '17:30'),
(3, '17:30', '18:00'),
-- Jueves
(4, '09:00', '09:30'),
(4, '09:30', '10:00'),
(4, '10:00', '10:30'),
(4, '10:30', '11:00'),
(4, '11:00', '11:30'),
(4, '11:30', '12:00'),
(4, '12:00', '12:30'),
(4, '16:00', '16:30'),
(4, '16:30', '17:00'),
(4, '17:00', '17:30'),
(4, '17:30', '18:00'),
-- Viernes
(5, '09:00', '09:30'),
(5, '09:30', '10:00'),
(5, '10:00', '10:30'),
(5, '10:30', '11:00'),
(5, '11:00', '11:30'),
(5, '11:30', '12:00'),
(5, '12:00', '12:30'),
(5, '16:00', '16:30'),
(5, '16:30', '17:00'),
(5, '17:00', '17:30'),
(5, '17:30', '18:00');

-- ============================================
-- FUNCIÓN: Obtener o crear cliente por email
-- ============================================
CREATE OR REPLACE FUNCTION get_or_create_customer(
  p_email TEXT,
  p_name TEXT,
  p_phone TEXT
)
RETURNS UUID AS $$
DECLARE
  v_customer_id UUID;
  v_visit_count INTEGER;
BEGIN
  -- Buscar cliente existente
  SELECT id, visit_count INTO v_customer_id, v_visit_count
  FROM customers
  WHERE email = p_email;
  
  -- Si no existe, crear nuevo cliente
  IF v_customer_id IS NULL THEN
    INSERT INTO customers (email, name, phone, first_visit_date, visit_count)
    VALUES (p_email, p_name, p_phone, NOW(), 0)
    RETURNING id INTO v_customer_id;
  ELSE
    -- Actualizar información del cliente si cambió
    UPDATE customers
    SET name = COALESCE(p_name, name),
        phone = COALESCE(p_phone, phone),
        updated_at = NOW()
    WHERE id = v_customer_id;
  END IF;
  
  RETURN v_customer_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- FUNCIÓN: Calcular precio según historial
-- ============================================
CREATE OR REPLACE FUNCTION calculate_booking_price(
  p_customer_email TEXT,
  p_service_id UUID,
  p_include_nutrition_plan BOOLEAN DEFAULT false
)
RETURNS JSON AS $$
DECLARE
  v_visit_count INTEGER;
  v_base_price DECIMAL(10,2);
  v_duration INTEGER;
  v_final_price DECIMAL(10,2);
  v_visit_type TEXT;
  v_result JSON;
BEGIN
  -- Obtener visit_count del cliente
  SELECT COALESCE(visit_count, 0) INTO v_visit_count
  FROM customers
  WHERE email = p_customer_email;
  
  -- Si no existe el cliente, es primera visita
  IF v_visit_count IS NULL THEN
    v_visit_count := 0;
  END IF;
  
  -- Calcular precio según visit_count
  IF v_visit_count = 0 THEN
    -- Primera visita
    v_final_price := 90.00;
    v_duration := 120;
    v_visit_type := 'first';
  ELSIF v_visit_count = 1 THEN
    -- Segunda visita
    v_final_price := 60.00;
    v_duration := 60;
    v_visit_type := 'second';
    
    -- Agregar plan de nutrición si está seleccionado
    IF p_include_nutrition_plan THEN
      v_final_price := v_final_price + 30.00;
    END IF;
  ELSE
    -- Visitas de seguimiento
    v_final_price := 60.00;
    v_duration := 60;
    v_visit_type := 'followup';
  END IF;
  
  -- Construir resultado JSON
  v_result := json_build_object(
    'price', v_final_price,
    'duration', v_duration,
    'visit_type', v_visit_type,
    'visit_count', v_visit_count,
    'show_nutrition_plan', (v_visit_count = 1)
  );
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- FUNCIÓN: Incrementar contador de visitas
-- ============================================
CREATE OR REPLACE FUNCTION increment_visit_count(
  p_customer_id UUID
)
RETURNS VOID AS $$
BEGIN
  UPDATE customers
  SET visit_count = visit_count + 1,
      updated_at = NOW()
  WHERE id = p_customer_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- VISTA: Resumen de reservas para admin
-- ============================================
CREATE OR REPLACE VIEW admin_bookings_view AS
SELECT 
  b.id,
  b.booking_date,
  b.booking_time,
  b.status,
  b.total_price,
  b.visit_type,
  b.created_at,
  c.name as customer_name,
  c.email as customer_email,
  c.phone as customer_phone,
  c.visit_count,
  s.name as service_name,
  s.service_type,
  b.notes,
  b.stripe_payment_id,
  b.whatsapp_notified,
  COALESCE(
    (SELECT json_agg(json_build_object('name', addon_name, 'price', addon_price))
     FROM booking_addons WHERE booking_id = b.id),
    '[]'::json
  ) as addons
FROM bookings b
LEFT JOIN customers c ON b.customer_id = c.id
LEFT JOIN services s ON b.service_id = s.id
ORDER BY b.booking_date DESC, b.booking_time DESC;

-- ============================================
-- FINALIZADO
-- ============================================
-- Ejecuta este script en tu proyecto de Supabase
-- Luego configura las variables de entorno en .env.local:
-- NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
-- NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
-- SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key (solo para admin)
-- ============================================

