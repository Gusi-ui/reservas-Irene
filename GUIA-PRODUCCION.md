# 🚀 Guía Paso a Paso para Poner el Sitio en Producción

Ahora que el código está en GitHub, vamos a configurar todo para que tu sitio web de reservas de nutrición esté **completamente funcional** en internet.

---

## 📋 Resumen de Pasos

1. ✅ Código subido a GitHub
2. ⏳ Configurar Supabase (Base de Datos)
3. ⏳ Configurar Stripe (Pagos)
4. ⏳ Desplegar en Vercel (Hosting)
5. ⏳ Configurar Webhook de Stripe
6. ⏳ Probar todo el flujo

---

## 🗄️ PASO 1: Configurar Supabase

### 1.1 Crear Proyecto en Supabase

1. **Ve a Supabase:**
   - https://supabase.com
   - Haz clic en "Start your project" → "Sign in with GitHub"

2. **Crear nuevo proyecto:**
   - Haz clic en "New Project"
   - **Organization:** Crea una nueva o usa una existente
   - **Name:** `nutrition-booking` (o el nombre que prefieras)
   - **Database Password:** Genera una contraseña segura (GUÁRDALA)
   - **Region:** `West EU (London)` o la más cercana a España
   - **Pricing Plan:** Free (suficiente para empezar)
   - Haz clic en "Create new project"
   - ⏱️ Espera 2-3 minutos mientras se crea

### 1.2 Ejecutar el Script SQL

1. **Abrir SQL Editor:**
   - En tu proyecto de Supabase, ve a: `SQL Editor` (menú lateral izquierdo)
   - Haz clic en "+ New query"

2. **Copiar y pegar el SQL:**
   - Abre el archivo `supabase-setup.sql` de tu proyecto local
   - Copia TODO el contenido
   - Pégalo en el editor SQL de Supabase
   - Haz clic en "Run" (botón verde abajo a la derecha)
   - ✅ Deberías ver: "Success. No rows returned"

3. **Verificar que se crearon las tablas:**
   - Ve a: `Table Editor` (menú lateral)
   - Deberías ver: `customers`, `services`, `bookings`, `booking_addons`, `transactions`, `time_slots`

### 1.3 Insertar Servicios Iniciales

Vuelve al SQL Editor y ejecuta esto para crear los servicios de nutrición:

```sql
-- Insertar servicios de nutrición
INSERT INTO services (name, description, base_price, duration_minutes, is_active) VALUES
('Consulta Nutricional Primera Visita', 'Evaluación completa del estado nutricional, análisis de hábitos alimentarios y plan personalizado.', 60.00, 60, true),
('Consulta de Seguimiento', 'Revisión de progreso, ajustes al plan nutricional y resolución de dudas.', 45.00, 45, true),
('Plan Nutricional Personalizado', 'Diseño de menús semanales adaptados a tus necesidades y objetivos específicos.', 80.00, 90, true),
('Asesoramiento Deportivo', 'Nutrición especializada para rendimiento deportivo y composición corporal.', 70.00, 60, true);

-- Insertar horarios disponibles (ejemplo: Lunes a Viernes, 9:00 - 18:00)
INSERT INTO time_slots (day_of_week, start_time, end_time, is_available) VALUES
-- Lunes (1)
(1, '09:00', '10:00', true),
(1, '10:00', '11:00', true),
(1, '11:00', '12:00', true),
(1, '12:00', '13:00', true),
(1, '16:00', '17:00', true),
(1, '17:00', '18:00', true),
-- Martes (2)
(2, '09:00', '10:00', true),
(2, '10:00', '11:00', true),
(2, '11:00', '12:00', true),
(2, '12:00', '13:00', true),
(2, '16:00', '17:00', true),
(2, '17:00', '18:00', true),
-- Miércoles (3)
(3, '09:00', '10:00', true),
(3, '10:00', '11:00', true),
(3, '11:00', '12:00', true),
(3, '12:00', '13:00', true),
(3, '16:00', '17:00', true),
(3, '17:00', '18:00', true),
-- Jueves (4)
(4, '09:00', '10:00', true),
(4, '10:00', '11:00', true),
(4, '11:00', '12:00', true),
(4, '12:00', '13:00', true),
(4, '16:00', '17:00', true),
(4, '17:00', '18:00', true),
-- Viernes (5)
(5, '09:00', '10:00', true),
(5, '10:00', '11:00', true),
(5, '11:00', '12:00', true),
(5, '12:00', '13:00', true),
(5, '16:00', '17:00', true),
(5, '17:00', '18:00', true);
```

### 1.4 Obtener las Credenciales de Supabase

1. **Ve a Settings → API:**
   - En el menú lateral: `Project Settings` (icono de engranaje)
   - Haz clic en `API`

2. **Copiar estas credenciales (las necesitarás después):**
   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

✅ **Supabase configurado correctamente**

---

## 💳 PASO 2: Configurar Stripe

### 2.1 Crear Cuenta en Stripe

1. **Ve a Stripe:**
   - https://stripe.com
   - Haz clic en "Sign in" (o "Registrarse" si no tienes cuenta)
   - Completa el registro

2. **Activar modo de prueba:**
   - En el dashboard, asegúrate de que esté activado el "Test mode" (arriba a la derecha)
   - Verás un toggle que dice "Test mode"

### 2.2 Obtener las Claves API

1. **Ve a Developers → API keys:**
   - En el menú superior, haz clic en "Developers"
   - En el menú lateral, haz clic en "API keys"

2. **Copiar las claves de prueba (las necesitarás después):**
   ```
   Publishable key: pk_test_xxxxxxxxxxxxxxxxxxxxx
   Secret key: sk_test_xxxxxxxxxxxxxxxxxxxxx
   ```
   - Haz clic en "Reveal test key" para ver la Secret key

3. **IMPORTANTE:** Por ahora usa las claves de **prueba** (test). Cuando todo funcione, cambiarás a las claves de producción.

✅ **Stripe configurado correctamente**

---

## 🌐 PASO 3: Desplegar en Vercel

### 3.1 Crear Cuenta en Vercel

1. **Ve a Vercel:**
   - https://vercel.com
   - Haz clic en "Sign Up" → "Continue with GitHub"
   - Autoriza a Vercel

### 3.2 Importar tu Repositorio

1. **Crear nuevo proyecto:**
   - Haz clic en "Add New..." → "Project"
   - Busca tu repositorio: `reservas-Irene`
   - Haz clic en "Import"

2. **Configurar el proyecto:**
   - **Framework Preset:** Next.js (se detecta automáticamente)
   - **Root Directory:** `./` (raíz)
   - **Build Command:** `npm run build` (por defecto)
   - **Output Directory:** `.next` (por defecto)

### 3.3 Configurar Variables de Entorno

Antes de hacer clic en "Deploy", necesitas configurar las variables de entorno:

1. **Expandir "Environment Variables"**

2. **Añadir estas variables** (usa los valores que copiaste antes):

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe (CLAVES DE PRUEBA)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx (esto lo configuraremos después)

# Admin (crea una contraseña segura)
ADMIN_PASSWORD=TuContraseñaSegura123!

# JWT (genera un secreto aleatorio)
JWT_SECRET=un_string_aleatorio_muy_largo_y_seguro_123456
```

**Para generar el JWT_SECRET**, puedes usar este comando en terminal:
```bash
openssl rand -base64 32
```

3. **Hacer clic en "Deploy"**
   - ⏱️ Espera 2-3 minutos mientras se despliega
   - ✅ Cuando termine, verás: "Congratulations! Your project has been deployed."

4. **Copiar la URL de tu sitio:**
   - Verás algo como: `https://reservas-irene.vercel.app`
   - ¡Tu sitio ya está en línea! (pero falta configurar el webhook)

✅ **Sitio desplegado en Vercel**

---

## 🔔 PASO 4: Configurar Webhook de Stripe

Los webhooks permiten que Stripe notifique a tu sitio cuando un pago se completa.

### 4.1 Crear el Webhook en Stripe

1. **Ve a Stripe Dashboard:**
   - https://dashboard.stripe.com
   - Asegúrate de estar en "Test mode"

2. **Ir a Webhooks:**
   - Menú superior: "Developers"
   - Menú lateral: "Webhooks"
   - Haz clic en "+ Add endpoint"

3. **Configurar el endpoint:**
   - **Endpoint URL:** `https://TU-SITIO.vercel.app/api/webhooks/stripe`
     (Ejemplo: `https://reservas-irene.vercel.app/api/webhooks/stripe`)
   - **Description:** "Payment confirmations"
   - **Events to send:**
     - Haz clic en "+ Select events"
     - Busca y selecciona: `checkout.session.completed`
     - Haz clic en "Add events"
   - Haz clic en "Add endpoint"

4. **Copiar el Webhook Secret:**
   - Una vez creado, verás el endpoint
   - Haz clic en "Click to reveal" en "Signing secret"
   - Copia el secreto (empieza con `whsec_...`)

### 4.2 Actualizar Variable de Entorno en Vercel

1. **Volver a Vercel:**
   - Ve a tu proyecto en Vercel
   - Haz clic en "Settings"
   - En el menú lateral, haz clic en "Environment Variables"

2. **Añadir/Editar STRIPE_WEBHOOK_SECRET:**
   - Si no la añadiste antes, haz clic en "Add New"
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** El secreto que copiaste de Stripe (ej: `whsec_xxxxx...`)
   - **Environment:** Production, Preview, Development (marca todas)
   - Haz clic en "Save"

3. **Redesplegar:**
   - Ve a la pestaña "Deployments"
   - Haz clic en los tres puntos del último despliegue
   - Haz clic en "Redeploy"
   - Confirma

✅ **Webhook configurado correctamente**

---

## ✅ PASO 5: Verificar Funcionamiento

### 5.1 Probar el Flujo Completo

1. **Ir a tu sitio:**
   - Abre: `https://TU-SITIO.vercel.app`

2. **Hacer una reserva de prueba:**
   - Haz clic en "Reservar Cita"
   - Completa el formulario
   - Selecciona un servicio
   - Selecciona fecha y hora
   - Haz clic en "Proceder al Pago"

3. **Pagar con tarjeta de prueba:**
   - Stripe te llevará a la página de pago
   - Usa esta tarjeta de prueba:
     ```
     Número: 4242 4242 4242 4242
     Fecha: Cualquier fecha futura (ej: 12/25)
     CVC: Cualquier 3 dígitos (ej: 123)
     Código postal: Cualquier 5 dígitos (ej: 12345)
     ```
   - Completa el pago
   - Deberías ser redirigido a la página de éxito

4. **Verificar en Supabase:**
   - Ve a Supabase → Table Editor
   - Revisa la tabla `bookings` - debería aparecer tu reserva
   - Revisa la tabla `customers` - debería aparecer el cliente
   - Revisa la tabla `transactions` - debería aparecer la transacción

### 5.2 Probar el Panel de Administración

1. **Ir al panel admin:**
   - Abre: `https://TU-SITIO.vercel.app/admin`

2. **Iniciar sesión:**
   - Usuario: `admin`
   - Contraseña: La que configuraste en `ADMIN_PASSWORD`

3. **Verificar los datos:**
   - Deberías ver la reserva de prueba
   - Deberías ver los datos del cliente

✅ **¡Todo funciona correctamente!**

---

## 🎨 PASO 6: Personalización (Opcional)

### 6.1 Personalizar los Servicios

Puedes editar los servicios directamente en Supabase:
- Ve a Table Editor → `services`
- Edita nombres, precios, descripciones
- Añade o elimina servicios

### 6.2 Configurar Horarios

Edita los horarios disponibles en:
- Table Editor → `time_slots`
- Añade o elimina franjas horarias según tu disponibilidad

### 6.3 Ajustar el Diseño

El código está en tu repositorio. Puedes modificar:
- Colores en `app/globals.css`
- Textos en los componentes
- Hacer commit y push
- Vercel desplegará automáticamente los cambios

---

## 🚀 PASO 7: Activar Modo Producción (Cuando estés listo)

Cuando quieras aceptar pagos reales:

### 7.1 Activar Stripe en Producción

1. **Completar configuración de Stripe:**
   - Ve a Stripe Dashboard
   - Completa la información de tu negocio
   - Activa tu cuenta

2. **Obtener claves de producción:**
   - Desactiva "Test mode" en Stripe
   - Ve a Developers → API keys
   - Copia las claves de producción (empiezan con `pk_live_` y `sk_live_`)

3. **Crear webhook de producción:**
   - Repite el PASO 4, pero con "Test mode" desactivado
   - Usa la misma URL: `https://TU-SITIO.vercel.app/api/webhooks/stripe`

### 7.2 Actualizar Variables en Vercel

1. Ve a Vercel → Settings → Environment Variables
2. Edita estas variables (solo en Production):
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Clave `pk_live_...`
   - `STRIPE_SECRET_KEY`: Clave `sk_live_...`
   - `STRIPE_WEBHOOK_SECRET`: El nuevo secreto de webhook de producción
3. Redesplegar el sitio

✅ **¡Tu sitio está aceptando pagos reales!**

---

## 📊 Monitoreo y Mantenimiento

### Ver Pagos
- Stripe Dashboard: https://dashboard.stripe.com/payments

### Ver Reservas
- Panel Admin: `https://TU-SITIO.vercel.app/admin`
- Supabase: https://app.supabase.com

### Ver Logs
- Vercel: Proyecto → Logs
- Stripe: Developers → Webhooks → Ver eventos

---

## ❓ Problemas Comunes

### "Error al crear la reserva"
- Verifica que las variables de entorno estén correctamente configuradas en Vercel
- Revisa los logs en Vercel → Logs

### "Payment failed"
- Asegúrate de estar usando las tarjetas de prueba de Stripe en modo test
- Verifica que el webhook esté configurado correctamente

### "Unauthorized" en el panel admin
- Verifica que `ADMIN_PASSWORD` y `JWT_SECRET` estén configurados en Vercel
- Intenta con diferentes navegadores (limpia cookies)

### No aparecen las reservas en Supabase
- Verifica que el webhook de Stripe esté recibiendo eventos
- Ve a Stripe → Developers → Webhooks → Ver eventos recientes

---

## 🎉 ¡Felicidades!

Tu sitio web de reservas nutricionales está **completamente funcional**:

✅ Página web profesional con diseño moderno
✅ Sistema de reservas en tiempo real
✅ Pasarela de pago con Stripe
✅ Base de datos en Supabase
✅ Panel de administración
✅ Cálculo automático de precios (descuento por visitas)
✅ Desplegado en internet (Vercel)

---

**¿Necesitas ayuda con algún paso? Revisa `INSTRUCCIONES-SETUP.md` para más detalles técnicos.**

