# 🍃 Nutrición Saludable - Sistema de Reservas

Una aplicación Next.js moderna y totalmente funcional para gestionar reservas de consultas nutricionales con detección inteligente de precios, pagos en línea y panel de administración.

## ✨ Características Principales

### 🎯 Sistema de Reservas Inteligente
- **Detección automática** por email sin registro
- **Precios dinámicos** según historial de visitas:
  - Primera visita: 90€ / 120 minutos (evaluación completa)
  - Segunda visita: 60€ / 60 minutos + Plan Nutrición opcional (30€)
  - Visitas siguientes: 60€ / 60 minutos (seguimiento)
- **Calendario interactivo** con horarios disponibles
- **Flujo guiado** de 3 pasos optimizado
- **Integración completa con Stripe** para pagos seguros

### 💳 Pagos y Transacciones
- **Stripe Checkout** integrado
- **Webhooks** para confirmación automática de pagos
- **Páginas de éxito y cancelación** personalizadas
- **Historial de transacciones** en panel de admin
- **Soporte para tarjetas de crédito/débito**

### 🔐 Panel de Administración
- **Autenticación segura** con JWT
- **Dashboard completo** con estadísticas:
  - Total de reservas y clientes
  - Ingresos totales
  - Reservas pendientes
- **Gestión de reservas** con filtros y búsqueda
- **Listado de clientes** con historial de visitas
- **Vista detallada** de cada reserva

### 🗄️ Base de Datos Supabase
- **Supabase** como backend (PostgreSQL)
- **Row Level Security (RLS)** para seguridad
- **Funciones SQL** para lógica de negocio
- **Backups automáticos**
- **Escalabilidad** garantizada

### 🎨 Diseño Moderno
- **Mobile-first** responsive design
- **Componentes reutilizables** con Tailwind CSS
- **Animaciones suaves** y micro-interacciones
- **Accesibilidad** optimizada
- **Performance** de carga rápida

### 🛠️ Stack Tecnológico
- **Next.js 14** con App Router y React Server Components
- **TypeScript** para type safety
- **Supabase** (PostgreSQL) como base de datos
- **Stripe** para procesamiento de pagos
- **Tailwind CSS** para estilos
- **JWT** para autenticación de admin

## 🚀 Inicio Rápido

### ⚡ Pasos Esenciales

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar Supabase**:
   - Crea un proyecto en [supabase.com](https://supabase.com)
   - Ejecuta el script `supabase-setup.sql` en el SQL Editor
   - Copia tus credenciales

3. **Configurar Stripe**:
   - Crea una cuenta en [stripe.com](https://stripe.com)
   - Obtén tus claves API (modo test)
   - Configura el webhook

4. **Variables de entorno**:
   - Copia `.env.example` a `.env.local`
   - Completa con tus credenciales de Supabase y Stripe

5. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

6. **Acceder a la app**:
   - Web: http://localhost:3000
   - Admin: http://localhost:3000/admin (user: admin, pass: admin123)

### 📚 Documentación Completa

Para instrucciones detalladas paso a paso, consulta: **[INSTRUCCIONES-SETUP.md](./INSTRUCCIONES-SETUP.md)**

Este documento incluye:
- ✅ Guía completa de configuración de Supabase
- ✅ Configuración detallada de Stripe y webhooks
- ✅ Configuración de variables de entorno
- ✅ Guía de despliegue a producción (Vercel)
- ✅ Troubleshooting y solución de problemas
- ✅ Testing y checklist de lanzamiento

## 📁 Estructura del Proyecto

```
nutrition-booking-app/
├── app/                    # App Router pages
│   ├── page.tsx           # Homepage
│   ├── booking/           # Sistema de reservas
│   ├── services/          # Página de servicios
│   ├── contact/           # Página de contacto
│   └── api/               # API routes
├── components/            # Componentes reutilizables
│   ├── layout/            # Header, Footer
│   ├── booking/           # Componentes de reservas
│   └── ui/                # Componentes UI
├── lib/                   # Utilidades y configuración
│   ├── prisma.ts          # Cliente Prisma
│   ├── booking-logic.ts   # Lógica de reservas
│   └── stripe.ts          # Configuración Stripe
├── types/                 # Tipos TypeScript
├── prisma/                # Esquema de base de datos
└── styles/                # Estilos globales
```

## 🗄️ Esquema de Base de Datos

### Tablas Principales
- **customers** - Clientes (sin registro, solo email)
- **services** - Servicios nutricionales
- **bookings** - Reservas de citas
- **booking_addons** - Complementos (Plan Nutrición)
- **transactions** - Transacciones de pago
- **time_slots** - Horarios disponibles

## 💳 Integración de Pagos

### Stripe
1. Crear cuenta en [Stripe](https://stripe.com)
2. Obtener claves API
3. Configurar webhooks para confirmaciones
4. El sistema usa Stripe Checkout para pagos seguros

## 📱 Notificaciones

### WhatsApp Business API
- **Confirmaciones automáticas** de reserva
- **Recordatorios** 24h antes de la cita
- **Confirmaciones de pago**

### Email
- **Confirmaciones** de reserva
- **Facturas** y recibos
- **Recordatorios** personalizados

## 🚀 Deployment

### Vercel (Recomendado)
1. Conectar repositorio GitHub
2. Configurar variables de entorno
3. Deploy automático en cada push

### Otros Servicios
- **Netlify** - Compatible con Next.js
- **Railway** - Con base de datos incluida
- **DigitalOcean App Platform**

## 🔧 Personalización

### Colores y Estilos
Editar `tailwind.config.js` y `app/globals.css`:

```css
/* Colores primarios inspirados en Astra */
--primary-600: #667eea;
--primary-700: #5a6fd8;
--secondary-600: #764ba2;
```

### Servicios
Editar los servicios en `components/booking/ServiceSelector.tsx`:

```javascript
const SERVICES = [
  {
    id: 'tu-servicio',
    name: 'Tu Servicio',
    description: 'Descripción...',
    basePrice: 60,
    baseDuration: 60,
    // ...
  }
];
```

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests E2E
npm run test:e2e

# Type checking
npm run type-check
```

## 📈 SEO y Performance

### Optimizaciones Incluidas
- **Meta tags** dinámicos
- **Open Graph** para redes sociales
- **Structured data** para consultas
- **Image optimization** con Next.js
- **Bundle splitting** automático

### Google Analytics
Configurar en `app/layout.tsx`:
```javascript
export const metadata = {
  // ... existing metadata
  verification: {
    google: 'tu-verification-code'
  }
}
```

## 🔒 Seguridad

### Medidas Implementadas
- **Input validation** en todos los formularios
- **CSRF protection** con Next.js
- **Rate limiting** en APIs
- **SQL injection** prevention con Prisma
- **XSS protection** con sanitización

## 📞 Soporte

### Configuración de Producción
1. **Variables de entorno** configuradas
2. **Base de datos** PostgreSQL en producción
3. **Dominio personalizado** configurado
4. **SSL/HTTPS** habilitado
5. **Backup automático** de base de datos

### Monitoreo
- **Error tracking** con Sentry
- **Performance monitoring** con Vercel Analytics
- **Uptime monitoring** con servicios externos

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

1. Fork el proyecto
2. Crear branch para feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit cambios (`git commit -am 'Agregar nueva característica'`)
4. Push al branch (`git push origin feature/nueva-caracteristica`)
5. Abrir Pull Request

---

**Desarrollado con ❤️ para Nutrición Saludable**