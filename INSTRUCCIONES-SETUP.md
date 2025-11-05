# 🚀 Instrucciones de Configuración Completa
## Sistema de Reservas de Nutrición

Este documento te guiará paso a paso para configurar y desplegar tu aplicación de reservas.

---

## 📋 Tabla de Contenidos

1. [Configuración de Supabase](#1-configuración-de-supabase)
2. [Configuración de Stripe](#2-configuración-de-stripe)
3. [Variables de Entorno](#3-variables-de-entorno)
4. [Instalación y Desarrollo Local](#4-instalación-y-desarrollo-local)
5. [Panel de Administrador](#5-panel-de-administrador)
6. [Despliegue a Producción](#6-despliegue-a-producción)
7. [Testing](#7-testing)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Configuración de Supabase

### 1.1. Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Haz clic en "New Project"
4. Completa los datos:
   - **Name**: nutrition-booking-app (o el nombre que prefieras)
   - **Database Password**: Guarda esta contraseña en un lugar seguro
   - **Region**: Selecciona la región más cercana a tus usuarios (ej: Europe West)
5. Espera a que el proyecto se inicialice (tarda unos 2 minutos)

### 1.2. Ejecutar Script SQL

1. Una vez creado el proyecto, ve a la sección **SQL Editor** en el menú lateral
2. Haz clic en "New Query"
3. Abre el archivo `supabase-setup.sql` que está en la raíz del proyecto
4. **Copia TODO el contenido** del archivo
5. Pégalo en el editor SQL de Supabase
6. Haz clic en "Run" (▶️) para ejecutar el script
7. Verifica que no haya errores (debería aparecer "Success. No rows returned")

Este script crea:
- ✅ Todas las tablas necesarias (customers, bookings, services, transactions, etc.)
- ✅ Políticas RLS (Row Level Security) para seguridad
- ✅ Funciones SQL para lógica de negocio
- ✅ Datos iniciales de servicios y horarios
- ✅ Índices para optimizar el rendimiento
- ✅ Vista de administración para el panel

### 1.3. Obtener Credenciales

1. Ve a **Settings** > **API** en el menú de Supabase
2. Copia estos tres valores:
   - **Project URL**: `https://tu-proyecto.supabase.co`
   - **anon / public key**: Empieza con `eyJ...`
   - **service_role key**: También empieza con `eyJ...` (mantén esto secreto)

---

## 2. Configuración de Stripe

### 2.1. Crear Cuenta en Stripe

1. Ve a [https://stripe.com](https://stripe.com)
2. Crea una cuenta o inicia sesión
3. Activa el "Test Mode" (interruptor en la parte superior derecha)

### 2.2. Obtener Claves API

1. Ve a **Developers** > **API Keys**
2. Copia estos valores:
   - **Publishable key**: Empieza con `pk_test_...`
   - **Secret key**: Empieza con `sk_test_...` (haz clic en "Reveal test key")

### 2.3. Configurar Webhook

Para que Stripe notifique a tu app cuando un pago es exitoso:

1. Ve a **Developers** > **Webhooks**
2. Haz clic en "Add endpoint"
3. En **Endpoint URL**, ingresa:
   - Desarrollo local: `http://localhost:3000/api/webhooks/stripe`
   - Producción: `https://tu-dominio.com/api/webhooks/stripe`
4. En **Events to send**, selecciona:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.payment_failed`
5. Haz clic en "Add endpoint"
6. Copia el **Signing secret** (empieza con `whsec_...`)

**IMPORTANTE**: En producción, deberás actualizar el webhook endpoint a tu dominio real.

---

## 3. Variables de Entorno

### 3.1. Crear archivo .env.local

1. Copia el archivo `.env.example` y renómbralo a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Abre `.env.local` y completa con tus credenciales:

```env
# ============================================
# SUPABASE CONFIGURATION
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (tu anon key)
SUPABASE_SERVICE_ROLE_KEY=eyJ... (tu service role key)

# ============================================
# STRIPE CONFIGURATION
# ============================================
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (tu publishable key)
STRIPE_SECRET_KEY=sk_test_... (tu secret key)
STRIPE_WEBHOOK_SECRET=whsec_... (tu webhook secret)

# URL de tu aplicación
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ============================================
# ADMIN AUTHENTICATION
# ============================================
ADMIN_USERNAME=admin
ADMIN_PASSWORD=cambia_este_password
```

**IMPORTANTE**: 
- El archivo `.env.local` está en `.gitignore` y NO se subirá a git
- En producción, configura estas variables en tu plataforma de hosting

---

## 4. Instalación y Desarrollo Local

### 4.1. Instalar Dependencias

```bash
# Si usas npm
npm install

# Si usas yarn
yarn install
```

### 4.2. Verificar que todo esté instalado

Asegúrate de que estas dependencias estén instaladas:
- ✅ @supabase/supabase-js
- ✅ stripe
- ✅ @stripe/stripe-js
- ✅ jsonwebtoken
- ✅ @types/jsonwebtoken

### 4.3. Ejecutar en Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

### 4.4. Probar el Flujo Completo

1. **Página Principal**: http://localhost:3000
   - Verifica que cargue correctamente
   - Navega por las secciones (Inicio, Sobre Nosotros, Servicios, Contacto)

2. **Hacer una Reserva de Prueba**: http://localhost:3000/booking
   - Selecciona un servicio
   - Elige fecha y hora
   - Completa tus datos (usa un email real para testing)
   - Procede al pago con tarjeta de prueba de Stripe:
     - **Número**: 4242 4242 4242 4242
     - **Fecha**: Cualquier fecha futura (ej: 12/25)
     - **CVC**: Cualquier 3 dígitos (ej: 123)
     - **Código postal**: Cualquiera (ej: 12345)

3. **Verificar en Supabase**:
   - Ve a tu proyecto de Supabase > **Table Editor**
   - Verifica que se hayan creado registros en:
     - `customers` (tu cliente)
     - `bookings` (tu reserva)
     - `transactions` (tu transacción de pago)

4. **Panel de Administrador**: http://localhost:3000/admin
   - Credenciales por defecto:
     - **Usuario**: admin
     - **Contraseña**: admin123 (o la que configuraste en .env.local)
   - Verifica que veas tu reserva de prueba

---

## 5. Panel de Administrador

### 5.1. Acceso

URL: `/admin`

Credenciales configurables en `.env.local`:
- ADMIN_USERNAME
- ADMIN_PASSWORD

### 5.2. Funcionalidades

El panel de administrador te permite:
- ✅ Ver todas las reservas con detalles completos
- ✅ Ver estado de pagos
- ✅ Consultar información de clientes
- ✅ Ver estadísticas (total de reservas, ingresos, clientes)
- ✅ Filtrar por estado (pendiente, confirmado, cancelado)

### 5.3. Seguridad

**IMPORTANTE para Producción**:
1. Cambia las credenciales por defecto en `.env.local`
2. Usa contraseñas fuertes
3. Considera implementar autenticación más robusta (Supabase Auth, Auth0, etc.)

---

## 6. Despliegue a Producción

### 6.1. Opción Recomendada: Vercel

Vercel es la plataforma oficial de Next.js y ofrece despliegue gratuito.

#### Pasos:

1. **Sube tu código a GitHub** (si aún no lo has hecho):
   ```bash
   git add .
   git commit -m "Setup completo de la aplicación"
   git push origin main
   ```

2. **Conecta con Vercel**:
   - Ve a [https://vercel.com](https://vercel.com)
   - Crea una cuenta o inicia sesión
   - Haz clic en "New Project"
   - Importa tu repositorio de GitHub
   - Haz clic en "Deploy"

3. **Configurar Variables de Entorno**:
   - En Vercel, ve a tu proyecto > **Settings** > **Environment Variables**
   - Agrega TODAS las variables de tu `.env.local`:
     - NEXT_PUBLIC_SUPABASE_URL
     - NEXT_PUBLIC_SUPABASE_ANON_KEY
     - SUPABASE_SERVICE_ROLE_KEY
     - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
     - STRIPE_SECRET_KEY
     - STRIPE_WEBHOOK_SECRET
     - NEXT_PUBLIC_APP_URL (usa tu dominio de Vercel: `https://tu-app.vercel.app`)
     - ADMIN_USERNAME
     - ADMIN_PASSWORD

4. **Actualizar Webhook de Stripe**:
   - Ve a Stripe > Developers > Webhooks
   - Edita tu webhook endpoint a: `https://tu-app.vercel.app/api/webhooks/stripe`
   - O crea uno nuevo para producción

5. **Activar Modo Producción en Stripe** (cuando estés listo para pagos reales):
   - Completa la configuración de tu cuenta Stripe
   - Cambia las claves `pk_test_` y `sk_test_` por las de producción `pk_live_` y `sk_live_`

### 6.2. Otras Opciones de Hosting

- **Netlify**: Similar a Vercel, también soporta Next.js
- **Railway**: Incluye base de datos PostgreSQL
- **DigitalOcean App Platform**: Más control, requiere configuración
- **Heroku**: Requiere buildpack para Next.js

---

## 7. Testing

### 7.1. Tarjetas de Prueba de Stripe

- **Pago exitoso**: 4242 4242 4242 4242
- **Pago rechazado**: 4000 0000 0000 0002
- **Requiere autenticación 3D**: 4000 0027 6000 3184

Más tarjetas de prueba: [https://stripe.com/docs/testing](https://stripe.com/docs/testing)

### 7.2. Testing de Emails

- Usa un servicio como [Ethereal](https://ethereal.email/) para testing de emails
- O configura un email real en las variables de entorno TWILIO

### 7.3. Checklist de Testing

Antes de lanzar a producción, verifica:

- [ ] Los servicios se cargan correctamente desde Supabase
- [ ] El flujo de reservas funciona de principio a fin
- [ ] El pago con Stripe procesa correctamente
- [ ] Las reservas se guardan en Supabase
- [ ] El webhook de Stripe actualiza el estado de las reservas
- [ ] El panel de administrador muestra datos correctos
- [ ] Las páginas responden correctamente en móvil
- [ ] No hay errores en la consola del navegador
- [ ] Las variables de entorno están configuradas correctamente

---

## 8. Troubleshooting

### Problema: "Error al cargar servicios"
**Solución**: Verifica que:
1. Ejecutaste el script SQL completo en Supabase
2. Las credenciales de Supabase en `.env.local` son correctas
3. Las políticas RLS están habilitadas

### Problema: "Error al crear la reserva"
**Solución**: 
1. Verifica en Supabase > Logs si hay errores
2. Asegúrate de que la función `get_or_create_customer` existe
3. Verifica que todas las tablas tienen permisos RLS correctos

### Problema: "El pago se procesa pero la reserva queda en pendiente"
**Solución**: 
1. Verifica que el webhook de Stripe esté configurado correctamente
2. Revisa Stripe > Developers > Webhooks > Eventos para ver si hay errores
3. Verifica que `STRIPE_WEBHOOK_SECRET` sea correcto en `.env.local`

### Problema: "No puedo acceder al panel de administrador"
**Solución**: 
1. Verifica las credenciales en `.env.local`
2. Asegúrate de que `ADMIN_USERNAME` y `ADMIN_PASSWORD` estén configurados
3. Intenta con las credenciales por defecto: admin/admin123

### Problema: Error de CORS o "Network Error"
**Solución**: 
1. Verifica que `NEXT_PUBLIC_APP_URL` esté configurado correctamente
2. En desarrollo debe ser `http://localhost:3000`
3. En producción debe ser tu dominio completo con HTTPS

### Obtener Soporte

Si tienes problemas:
1. Revisa los logs en la consola del navegador (F12)
2. Revisa los logs en Supabase > Logs
3. Revisa los eventos del webhook en Stripe > Developers > Webhooks
4. Consulta la documentación oficial:
   - [Next.js](https://nextjs.org/docs)
   - [Supabase](https://supabase.com/docs)
   - [Stripe](https://stripe.com/docs)

---

## 📝 Notas Finales

### Seguridad

- ✅ Todas las credenciales sensibles están en variables de entorno
- ✅ Las políticas RLS de Supabase protegen la base de datos
- ✅ Los pagos se procesan a través de Stripe (PCI compliant)
- ✅ El panel de admin requiere autenticación

### Próximos Pasos (Opcional)

Una vez que la aplicación esté funcionando, puedes considerar:

1. **Notificaciones por WhatsApp/Email**:
   - Configura Twilio para WhatsApp
   - Configura un servicio de email (SendGrid, Resend, etc.)

2. **Backup Automático**:
   - Supabase hace backups automáticos
   - Considera exportar datos periódicamente

3. **Analytics**:
   - Agrega Google Analytics
   - Usa Vercel Analytics (si usas Vercel)

4. **SEO**:
   - Los metadatos ya están configurados
   - Considera agregar un sitemap
   - Envía el sitemap a Google Search Console

5. **Mejoras de Autenticación**:
   - Implementa Supabase Auth para el admin
   - Agrega 2FA (autenticación de dos factores)

---

## ✅ Checklist de Lanzamiento

Antes de anunciar tu aplicación:

- [ ] Ejecuté el script SQL en Supabase
- [ ] Configuré todas las variables de entorno
- [ ] Probé el flujo completo de reservas
- [ ] Configuré el webhook de Stripe
- [ ] Cambié las credenciales del admin
- [ ] Desplegué a producción (Vercel/Netlify)
- [ ] Probé en producción con tarjetas de prueba
- [ ] Activé el modo producción de Stripe (cuando esté listo)
- [ ] Configuré dominio personalizado (opcional)
- [ ] Verifiqué la app en dispositivos móviles

---

## 🎉 ¡Felicidades!

Tu sistema de reservas está listo para funcionar. Si seguiste todos los pasos, deberías tener:

- ✅ Una aplicación web moderna y responsiva
- ✅ Sistema de reservas con precios dinámicos
- ✅ Procesamiento de pagos seguro con Stripe
- ✅ Base de datos en Supabase con datos persistentes
- ✅ Panel de administración para gestionar reservas
- ✅ Sistema preparado para producción

**¡Buena suerte con tu negocio de consultas de nutrición!** 🍃

---

*Última actualización: Noviembre 2025*

