import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Limpiar datos existentes
  await prisma.bookingAddon.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.service.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.timeSlot.deleteMany()

  // Crear servicios
  const services = await Promise.all([
    prisma.service.create({
      data: {
        id: 'nutrition',
        name: 'Consulta de Nutrición',
        description: 'Consulta nutricional personalizada para mejorar tu alimentación y hábitos alimentarios. Incluye evaluación completa y plan personalizado.',
        basePrice: 60,
        baseDuration: 60,
        serviceType: 'general',
        isActive: true
      }
    }),
    prisma.service.create({
      data: {
        id: 'mental',
        name: 'Trastornos Mentales',
        description: 'Nutrición especializada para el manejo de trastornos mentales y bienestar emocional. Enfoque holístico mente-cuerpo.',
        basePrice: 60,
        baseDuration: 60,
        serviceType: 'specialized',
        isActive: true
      }
    }),
    prisma.service.create({
      data: {
        id: 'autism',
        name: 'Autismo',
        description: 'Nutrición especializada para niños y adultos con trastorno del espectro autista. Protocolos específicos para TEA.',
        basePrice: 60,
        baseDuration: 60,
        serviceType: 'specialized',
        isActive: true
      }
    }),
    prisma.service.create({
      data: {
        id: 'integrative',
        name: 'Nutrición Integrativa',
        description: 'Enfoque integrativo que combina nutrición convencional con medicina funcional. Evaluación avanzada y protocolos personalizados.',
        basePrice: 60,
        baseDuration: 60,
        serviceType: 'advanced',
        isActive: true
      }
    })
  ])

  console.log('✅ Created services:', services.length)

  // Crear horarios disponibles (lunes a viernes, 9:00-18:00)
  const timeSlots = []
  const daysOfWeek = [1, 2, 3, 4, 5] // Monday to Friday
  
  for (const dayOfWeek of daysOfWeek) {
    for (let hour = 9; hour < 18; hour++) {
      for (let minute of [0, 30]) {
        timeSlots.push({
          dayOfWeek,
          startTime: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
          endTime: `${(hour + 1).toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
          isAvailable: true
        })
      }
    }
  }

  await prisma.timeSlot.createMany({
    data: timeSlots
  })

  console.log('✅ Created time slots:', timeSlots.length)

  // Crear algunos clientes de ejemplo
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        email: 'ejemplo@email.com',
        name: 'María García',
        phone: '+34 600 123 456',
        visitCount: 3,
        firstVisitDate: new Date('2024-01-15')
      }
    }),
    prisma.customer.create({
      data: {
        email: 'nuevo@email.com',
        name: 'Carlos López',
        phone: '+34 600 654 321',
        visitCount: 0
      }
    })
  ])

  console.log('✅ Created customers:', customers.length)

  console.log('🎉 Seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })