export default function ServicesPage() {
  const services = [
    {
      id: 'nutrition',
      name: 'Consulta de Nutrición',
      description: 'Consulta nutricional personalizada para mejorar tu alimentación y hábitos alimentarios. Incluye análisis de tu situación actual y plan personalizado.',
      features: [
        'Evaluación nutricional completa',
        'Análisis de hábitos alimentarios',
        'Plan nutricional personalizado',
        'Recomendaciones específicas',
        'Seguimiento continuo'
      ],
      duration: 'Primera visita: 120min, Seguimiento: 60min',
      price: 'Primera: 90€, Seguimiento: 60€',
      recommended: false
    },
    {
      id: 'mental',
      name: 'Trastornos Mentales',
      description: 'Nutrición especializada para el manejo de trastornos mentales y bienestar emocional. Enfoque holístico que considera la conexión mente-cuerpo.',
      features: [
        'Evaluación nutricional especializada',
        'Protocolos nutricionales específicos',
        'Apoyo en medicación',
        'Educación nutricional terapéutica',
        'Coordinación con profesionales'
      ],
      duration: 'Primera visita: 120min, Seguimiento: 60min',
      price: 'Primera: 90€, Seguimiento: 60€',
      recommended: true
    },
    {
      id: 'autism',
      name: 'Autismo',
      description: 'Nutrición especializada para niños y adultos con trastorno del espectro autista. Especializados en abordar desafíos alimentarios comunes.',
      features: [
        'Evaluación nutricional completa',
        'Protocolos para problemas digestivos',
        'Apoyo para sensibilidad sensorial',
        'Trabajo familiar integral',
        'Monitoreo de crecimiento'
      ],
      duration: 'Primera visita: 120min, Seguimiento: 60min',
      price: 'Primera: 90€, Seguimiento: 60€',
      recommended: false
    },
    {
      id: 'integrative',
      name: 'Nutrición Integrativa',
      description: 'Enfoque integrativo que combina nutrición convencional con medicina funcional. Abordaje personalizado basado en evidencia científica.',
      features: [
        'Evaluación integrativa avanzada',
        'Protocolos funcionales',
        'Análisis de laboratorio',
        'Detoxificación personalizada',
        'Optimización del bienestar'
      ],
      duration: 'Primera visita: 120min, Seguimiento: 60min',
      price: 'Primera: 90€, Seguimiento: 60€',
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="gradient-bg">
        <div className="container section">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Nuestros <span className="text-gradient">Servicios Especializados</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Ofrecemos consultas personalizadas adaptadas a tus necesidades específicas de salud y bienestar nutricional.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {services.map((service) => (
                <div key={service.id} className={`service-card ${service.recommended ? 'ring-2 ring-primary-500' : ''}`}>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-neutral-900">
                        {service.name}
                      </h3>
                      {service.recommended && (
                        <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800">
                          ✨ Recomendado
                        </span>
                      )}
                    </div>

                    <p className="text-neutral-600 mb-6">
                      {service.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-neutral-900 mb-3">Incluye:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-neutral-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-neutral-200 pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-neutral-500">{service.duration}</p>
                          <p className="text-lg font-semibold text-neutral-900">{service.price}</p>
                        </div>
                        <a
                          href="/booking"
                          className="btn btn-primary"
                        >
                          Reservar
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              ¿Cómo funciona nuestro proceso?
            </h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600">
              Un proceso simple y efectivo para lograr tus objetivos de salud
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 mb-6">
                  <span className="text-2xl font-bold text-primary-600">1</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Reserva Online</h3>
                <p className="text-sm text-neutral-600">
                  Selecciona el servicio que necesitas y elige fecha y hora disponible.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 mb-6">
                  <span className="text-2xl font-bold text-primary-600">2</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Primera Consulta</h3>
                <p className="text-sm text-neutral-600">
                  Evaluación completa de tu estado nutricional y diseño del plan personalizado.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 mb-6">
                  <span className="text-2xl font-bold text-primary-600">3</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Implementación</h3>
                <p className="text-sm text-neutral-600">
                  Pones en práctica las recomendaciones y empiezas tu transformación.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 mb-6">
                  <span className="text-2xl font-bold text-primary-600">4</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Seguimiento</h3>
                <p className="text-sm text-neutral-600">
                  Ajustamos el plan según tu progreso y celebramos tus logros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section gradient-bg">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              ¿Listo para comenzar?
            </h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600">
              Reserva tu primera consulta y da el primer paso hacia una vida más saludable
            </p>
            <div className="mt-10">
              <a
                href="/booking"
                className="btn btn-primary btn-lg"
              >
                Reservar Consulta
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}