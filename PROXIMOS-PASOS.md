# 🎯 Próximos Pasos - Checklist Rápido

✅ **COMPLETADO:** Código subido a GitHub

---

## 📋 Para Poner el Sitio en Producción

Sigue estos pasos en orden:

### 1️⃣ Supabase (Base de Datos) - 10 min

- [ ] Crear cuenta en https://supabase.com
- [ ] Crear nuevo proyecto
- [ ] Ejecutar el SQL de `supabase-setup.sql`
- [ ] Insertar servicios y horarios iniciales
- [ ] Copiar: `Project URL` y `anon key`

📖 **Guía detallada:** [GUIA-PRODUCCION.md](./GUIA-PRODUCCION.md#-paso-1-configurar-supabase)

---

### 2️⃣ Stripe (Pagos) - 5 min

- [ ] Crear cuenta en https://stripe.com
- [ ] Activar modo de prueba (Test mode)
- [ ] Copiar: `Publishable key` y `Secret key` de prueba

📖 **Guía detallada:** [GUIA-PRODUCCION.md](./GUIA-PRODUCCION.md#-paso-2-configurar-stripe)

---

### 3️⃣ Vercel (Hosting) - 15 min

- [ ] Crear cuenta en https://vercel.com (con GitHub)
- [ ] Importar repositorio `reservas-Irene`
- [ ] Configurar variables de entorno:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - `STRIPE_SECRET_KEY`
  - `ADMIN_PASSWORD` (elige una contraseña)
  - `JWT_SECRET` (genera uno aleatorio)
- [ ] Hacer clic en "Deploy"
- [ ] Copiar la URL de tu sitio

📖 **Guía detallada:** [GUIA-PRODUCCION.md](./GUIA-PRODUCCION.md#-paso-3-desplegar-en-vercel)

---

### 4️⃣ Webhook de Stripe - 10 min

- [ ] En Stripe: Ir a Developers → Webhooks
- [ ] Añadir endpoint: `https://TU-SITIO.vercel.app/api/webhooks/stripe`
- [ ] Seleccionar evento: `checkout.session.completed`
- [ ] Copiar el `Signing secret` (empieza con `whsec_...`)
- [ ] En Vercel: Añadir variable `STRIPE_WEBHOOK_SECRET`
- [ ] Redesplegar el sitio

📖 **Guía detallada:** [GUIA-PRODUCCION.md](./GUIA-PRODUCCION.md#-paso-4-configurar-webhook-de-stripe)

---

### 5️⃣ Probar Todo - 5 min

- [ ] Abrir tu sitio: `https://TU-SITIO.vercel.app`
- [ ] Hacer una reserva de prueba
- [ ] Pagar con tarjeta de prueba: `4242 4242 4242 4242`
- [ ] Verificar que aparece en Supabase
- [ ] Entrar al panel admin: `/admin`
- [ ] Verificar que se ven los datos

📖 **Guía detallada:** [GUIA-PRODUCCION.md](./GUIA-PRODUCCION.md#-paso-5-verificar-funcionamiento)

---

## ✅ Cuando Todo Funcione

Tu sitio estará completamente operativo con:

- ✅ Página web profesional
- ✅ Sistema de reservas en tiempo real
- ✅ Pasarela de pago funcional
- ✅ Base de datos en la nube
- ✅ Panel de administración

---

## 🔴 ¿Listo para Pagos Reales?

Cuando quieras aceptar pagos de verdad:

1. Completa la configuración de tu cuenta Stripe
2. Obtén las claves de producción (empiezan con `pk_live_` y `sk_live_`)
3. Actualiza las variables de entorno en Vercel
4. Crea un nuevo webhook de producción

📖 **Guía detallada:** [GUIA-PRODUCCION.md](./GUIA-PRODUCCION.md#-paso-7-activar-modo-producción-cuando-estés-listo)

---

## 📚 Documentación Completa

- **[README.md](./README.md)** - Descripción general del proyecto
- **[GUIA-PRODUCCION.md](./GUIA-PRODUCCION.md)** - Guía paso a paso completa
- **[INSTRUCCIONES-SETUP.md](./INSTRUCCIONES-SETUP.md)** - Detalles técnicos
- **[supabase-setup.sql](./supabase-setup.sql)** - Script de base de datos

---

## ❓ ¿Necesitas Ayuda?

Si encuentras problemas:

1. Revisa la sección "Problemas Comunes" en [GUIA-PRODUCCION.md](./GUIA-PRODUCCION.md#-problemas-comunes)
2. Verifica que todas las variables de entorno estén correctas
3. Revisa los logs en Vercel (Proyecto → Logs)
4. Verifica los eventos del webhook en Stripe

---

**¡Éxito! 🎉**

