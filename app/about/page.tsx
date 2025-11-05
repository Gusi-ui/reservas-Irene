export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="gradient-bg">
        <div className="container section">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Sobre <span className="text-gradient">Nuestra Consulta</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Especialistas en nutrición con enfoque integrativo y personalizado para tu bienestar
            </p>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Nuestra Historia</h2>
              <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
            </div>
            
            <div className="prose prose-lg mx-auto text-neutral-600">
              <p>
                Nuestra consulta de nutrición nace de la pasión por ayudar a las personas a alcanzar su mejor versión 
                a través de una alimentación consciente y saludable. Con años de experiencia en el campo de la nutrición, 
                hemos desarrollado un enfoque único que combina la ciencia nutricional moderna con técnicas de medicina 
                funcional e integrativa.
              </p>
              
              <p>
                Creemos firmemente que cada persona es única, y por eso nuestros planes nutricionales se adaptan 
                completamente a las necesidades individuales de cada cliente. No ofrecemos dietas genéricas, sino 
                soluciones personalizadas que consideran tu estilo de vida, objetivos, preferencias y condiciones 
                de salud particulares.
              </p>
              
              <p>
                Nos especializamos en áreas como la nutrición para trastornos mentales, el tratamiento nutricional 
                del autismo, y la nutrición integrativa. Nuestro compromiso es brindarte el apoyo continuo que necesitas 
                para lograr cambios duraderos en tu salud y bienestar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro Enfoque */}
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Nuestro Enfoque</h2>
              <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
              <p className="mt-6 text-lg text-neutral-600">
                Un método integral que considera todos los aspectos de tu salud
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Personalizado</h3>
                <p className="text-neutral-600">
                  Cada plan nutricional es diseñado específicamente para ti, considerando tu historia médica, 
                  preferencias alimentarias y objetivos personales.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Basado en Evidencia</h3>
                <p className="text-neutral-600">
                  Todos nuestros protocolos están respaldados por la investigación científica más reciente 
                  en nutrición y medicina funcional.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Apoyo Continuo</h3>
                <p className="text-neutral-600">
                  Te acompañamos en cada paso de tu proceso, con seguimientos regulares y ajustes 
                  según tu progreso y necesidades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Nuestras Especialidades</h2>
              <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Nutrición General</h3>
                  <p className="text-neutral-600">
                    Planes nutricionales para pérdida de peso, ganancia de masa muscular, mejora del 
                    rendimiento deportivo y salud general.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Trastornos Mentales</h3>
                  <p className="text-neutral-600">
                    Nutrición especializada para ansiedad, depresión y otros trastornos mentales, 
                    considerando la conexión intestino-cerebro.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Trastorno del Espectro Autista</h3>
                  <p className="text-neutral-600">
                    Protocolos nutricionales especializados para niños y adultos con TEA, abordando 
                    sensibilidades y necesidades específicas.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Nutrición Integrativa</h3>
                  <p className="text-neutral-600">
                    Combinación de nutrición convencional con medicina funcional para un enfoque 
                    holístico de la salud.
                  </p>
                </div>
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
                Reservar Consulta
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

