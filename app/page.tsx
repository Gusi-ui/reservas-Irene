export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative gradient-bg overflow-hidden">
        <div className="container section">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl">
              Tu consulta de <span className="text-gradient">nutrición especializada</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Primera visita personalizada, seguimiento continuo y consultas especializadas en nutrición integrativa.
              Reserva tu cita online de manera fácil y segura.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/booking"
                className="btn btn-primary btn-lg"
              >
                Reservar Consulta
              </a>
              <a
                href="/services"
                className="text-sm font-semibold leading-6 text-neutral-900 hover:text-primary-600 transition-colors duration-200"
              >
                Ver servicios <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Nuestros Servicios Especializados
            </h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600">
              Ofrecemos consultas personalizadas adaptadas a tus necesidades específicas
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Primera Consulta */}
              <div className="service-card">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-900">Primera Consulta</h3>
                    <span className="duration-badge">120 min</span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">
                    Consulta inicial completa donde evaluamos tu estado nutricional actual y diseñamos un plan personalizado.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="price-tag">90€</span>
                    <span className="text-xs text-neutral-500">Cliente nuevo</span>
                  </div>
                </div>
              </div>

              {/* Consulta de Seguimiento */}
              <div className="service-card">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-900">Consulta de Seguimiento</h3>
                    <span className="duration-badge">60 min</span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">
                    Seguimiento de tu progreso, ajustes al plan nutricional y apoyo continuo en tu proceso.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="price-tag">60€</span>
                    <span className="text-xs text-neutral-500">Desde 2ª visita</span>
                  </div>
                </div>
              </div>

              {/* Plan Nutrición Personalizada */}
              <div className="service-card">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-900">Plan Nutrición Personalizada</h3>
                    <span className="duration-badge">Complemento</span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">
                    Plan nutricional completo y personalizado que puedes añadir a tu segunda consulta.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="price-tag">30€</span>
                    <span className="text-xs text-neutral-500">Opcional 2ª visita</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section gradient-bg">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              ¿Por qué elegirnos?
            </h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600">
              Ofrecemos un servicio integral y personalizado para tu bienestar
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">Consulta Personalizada</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Cada consulta se adapta a tus necesidades específicas y objetivos de salud.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">Horarios Flexibles</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Disponibilidad de lunes a viernes, con horarios que se adaptan a tu rutina.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">Reserva Online</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Sistema de reservas online seguro y fácil de usar, disponible 24/7.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.098V5.25c0-.756.726-1.296 1.453-1.098a60.062 60.062 0 0115.796 2.101l.502.4M12 3.75V4.5m0 15a3.75 3.75 0 01-3.75-3.75 3.75 3.75 0 013.75 3.75m0 0v15m-3.75-15v15m-3.75 0h9m0 0v9.75a3.75 3.75 0 013.75-3.75h3.75a3.75 3.75 0 013.75 3.75v9.75" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">Especialización</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Especialistas en trastornos mentales, autismo y nutrición integrativa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              ¿Listo para comenzar tu transformación?
            </h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600">
              Reserva tu primera consulta y da el primer paso hacia una vida más saludable
            </p>
            <div className="mt-10">
              <a
                href="/booking"
                className="btn btn-primary btn-lg"
              >
                Reservar Ahora
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}