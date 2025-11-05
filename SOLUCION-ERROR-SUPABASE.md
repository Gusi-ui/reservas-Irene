# 🔧 Solución: Error "column duration_minutes does not exist"

## ❌ El Error

```
ERROR: 42703: column "duration_minutes" of relation "services" does not exist
```

## ✅ La Solución

El script `supabase-setup.sql` usa el nombre correcto de columna: `base_duration` (no `duration_minutes`).

---

## 🎯 Pasos para Corregir

### Opción 1: Borrar y Reiniciar (RECOMENDADO)

Si acabas de empezar y no tienes datos importantes:

1. **Ir a SQL Editor en Supabase**

2. **Ejecutar este comando para limpiar:**
```sql
-- Eliminar todas las tablas
DROP TABLE IF EXISTS booking_addons CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS time_slots CASCADE;
```

3. **Ejecutar el script completo:**
   - Abre el archivo `supabase-setup.sql` de tu proyecto
   - Copia TODO el contenido
   - Pégalo en el SQL Editor de Supabase
   - Haz clic en "Run"
   - ✅ Deberías ver: "Success. No rows returned"

4. **Verificar:**
   - Ve a: `Table Editor`
   - Deberías ver las 6 tablas creadas
   - La tabla `services` ya tiene 4 servicios por defecto
   - La tabla `time_slots` ya tiene horarios de Lunes a Viernes

---

### Opción 2: Añadir Servicios Adicionales (OPCIONAL)

Si el script principal ya se ejecutó correctamente y solo quieres añadir más servicios:

1. **Ir a SQL Editor en Supabase**

2. **Ejecutar este SQL:**

```sql
-- Servicios adicionales
INSERT INTO services (name, description, base_price, base_duration, service_type, is_active) VALUES
('Consulta Nutricional Completa', 
 'Evaluación completa del estado nutricional con análisis detallado.', 
 90.00, 120, 'general', true),

('Seguimiento Nutricional', 
 'Revisión de progreso y ajustes al plan.', 
 60.00, 60, 'general', true),

('Plan de Menús Personalizado', 
 'Diseño completo de menús semanales.', 
 30.00, 30, 'addon', true);
```

---

## 📋 Estructura Correcta de la Tabla `services`

La tabla `services` tiene estas columnas:

| Columna         | Tipo      | Descripción                           |
|-----------------|-----------|---------------------------------------|
| `id`            | UUID      | ID único (auto-generado)              |
| `name`          | TEXT      | Nombre del servicio                   |
| `description`   | TEXT      | Descripción del servicio              |
| `base_price`    | DECIMAL   | Precio en euros (ej: 60.00)           |
| `base_duration` | INTEGER   | Duración en minutos (ej: 60)          |
| `service_type`  | TEXT      | Tipo: 'general', 'specialized', etc.  |
| `is_active`     | BOOLEAN   | Si está activo o no                   |
| `created_at`    | TIMESTAMP | Fecha de creación                     |
| `updated_at`    | TIMESTAMP | Fecha de última actualización         |

---

## 🔍 Verificar que Todo Está Bien

Ejecuta esta consulta en SQL Editor:

```sql
-- Ver todos los servicios
SELECT id, name, base_price, base_duration, service_type, is_active 
FROM services;
```

Deberías ver al menos 4 servicios:
1. Consulta de Nutrición
2. Trastornos Mentales
3. Autismo
4. Nutrición Integrativa

---

## 📚 Archivos Útiles en tu Proyecto

- **`supabase-setup.sql`** - Script completo de la base de datos (¡usa este!)
- **`insertar-servicios.sql`** - Ejemplos de servicios adicionales (opcional)
- **`GUIA-PRODUCCION.md`** - Guía completa paso a paso

---

## ❓ ¿Sigues Teniendo Problemas?

1. **Verifica que ejecutaste `supabase-setup.sql` completo:**
   - Debe incluir la creación de todas las tablas
   - Debe incluir funciones, triggers y políticas RLS
   - Debe incluir datos iniciales

2. **Verifica los nombres de columnas:**
   - ✅ Correcto: `base_duration`
   - ❌ Incorrecto: `duration_minutes`
   
   - ✅ Correcto: `base_price`
   - ❌ Incorrecto: `price`

3. **Revisa los logs en Supabase:**
   - Ve a: `SQL Editor` → Ver el resultado del script
   - Busca mensajes de error en rojo

---

**¡Listo! Con esto tu base de datos debería estar funcionando correctamente.** ✅

