-- ============================================
-- INSERTAR SERVICIOS DE NUTRICIÓN
-- ============================================
-- Ejecuta este script DESPUÉS de haber ejecutado supabase-setup.sql
-- ============================================

-- Nota: Los servicios básicos ya están insertados en supabase-setup.sql
-- Este script es para añadir servicios adicionales o personalizados

-- Servicios adicionales (puedes modificar según tus necesidades)
INSERT INTO services (name, description, base_price, base_duration, service_type, is_active) VALUES
('Consulta Nutricional Primera Visita', 
 'Evaluación completa del estado nutricional, análisis de hábitos alimentarios y diseño de plan personalizado inicial.', 
 90.00, 120, 'general', true),

('Consulta de Seguimiento', 
 'Revisión de progreso, ajustes al plan nutricional y resolución de dudas. Incluye análisis de adherencia.', 
 60.00, 60, 'general', true),

('Plan Nutricional Personalizado', 
 'Diseño completo de menús semanales adaptados a tus necesidades, objetivos y preferencias alimentarias.', 
 30.00, 30, 'addon', true),

('Nutrición para Rendimiento Deportivo', 
 'Asesoramiento nutricional especializado para optimizar el rendimiento deportivo y composición corporal.', 
 70.00, 60, 'specialized', true),

('Nutrición Pediátrica', 
 'Consulta especializada en nutrición infantil, crecimiento y desarrollo saludable de niños y adolescentes.', 
 65.00, 60, 'specialized', true),

('Nutrición en el Embarazo y Lactancia', 
 'Asesoramiento nutricional durante el embarazo, postparto y período de lactancia.', 
 70.00, 60, 'specialized', true);

-- ============================================
-- VERIFICAR LOS SERVICIOS INSERTADOS
-- ============================================
-- Ejecuta esta consulta para ver todos los servicios:
-- SELECT id, name, base_price, base_duration, service_type, is_active FROM services;

