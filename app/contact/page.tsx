export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="gradient-bg">
        <div className="container section">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              <span className="text-gradient">Contáctanos</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              ¿Tienes preguntas sobre nuestros servicios? ¿Necesitas más información? 
              Estamos aquí para ayudarte en tu camino hacia una vida más saludable.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="card p-8">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                    Información de Contacto
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-neutral-900">Teléfono</h3>
                        <p className="mt-1 text-sm text-neutral-600">+34 600 123 456</p>
                        <p className="text-xs text-neutral-500">Lunes a Viernes, 9:00 - 18:00</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-neutral-900">Email</h3>
                        <p className="mt-1 text-sm text-neutral-600">info@nutricionsaludable.com</p>
                        <p className="text-xs text-neutral-500">Respuesta en 24-48 horas</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-neutral-900">Ubicación</h3>
                        <p className="mt-1 text-sm text-neutral-600">
                          Calle Ejemplo, 123<br />
                          28001 Madrid, España
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-neutral-900">Horarios de Atención</h3>
                        <div className="mt-1 text-sm text-neutral-600 space-y-1">
                          <p>Lunes - Viernes: 9:00 - 18:00</p>
                          <p>Sábados: 9:00 - 14:00</p>
                          <p>Domingos: Cerrado</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-neutral-200">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">¿Por qué elegirnos?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-success-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-neutral-600">Consulta personalizada y detallada</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-success-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-neutral-600">Enfoque integral y científico</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-success-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-neutral-600">Especialización en casos complejos</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-success-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-neutral-600">Seguimiento continuo</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="card p-8">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                    Envíanos un Mensaje
                  </h2>
                  
                  <form className="space-y-6">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name" className="label">Nombre Completo *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="input"
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="email" className="label">Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="input"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="phone" className="label">Teléfono</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="input"
                          placeholder="+34 600 123 456"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="subject" className="label">Asunto</label>
                        <select id="subject" name="subject" className="input">
                          <option value="">Selecciona un tema</option>
                          <option value="first-consultation">Primera Consulta</option>
                          <option value="follow-up">Consulta de Seguimiento</option>
                          <option value="mental-health">Trastornos Mentales</option>
                          <option value="autism">Autismo</option>
                          <option value="integrative">Nutrición Integrativa</option>
                          <option value="other">Otro</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="label">Mensaje *</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        className="input"
                        placeholder="Cuéntanos en qué podemos ayudarte..."
                      />
                    </div>

                    <div className="form-group">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="privacy"
                            name="privacy"
                            type="checkbox"
                            required
                            className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-600"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="privacy" className="text-neutral-700">
                            Acepto la <a href="/privacy" className="text-primary-600 hover:text-primary-500">política de privacidad</a> y el tratamiento de mis datos personales para responder a mi consulta. *
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                      >
                        Enviar Mensaje
                      </button>
                      <p className="text-sm text-neutral-500">
                        * Campos obligatorios
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Preguntas Frecuentes
            </h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600">
              Respuestas a las consultas más comunes
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-8">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                ¿Cuál es la diferencia entre la primera visita y las de seguimiento?
              </h3>
              <p className="text-neutral-600">
                La primera visita (90€, 120 min) es una evaluación completa donde analizamos tu estado nutricional actual, 
                revisamos tu historial médico y diseñamos un plan personalizado. Las visitas de seguimiento (60€, 60 min) 
                se enfocan en tu progreso y ajustes al plan.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                ¿Qué es el Plan de Nutrición Personalizada?
              </h3>
              <p className="text-neutral-600">
                Es un complemento opcional (30€) disponible para la segunda visita que incluye un plan nutricional 
                detallado y personalizado basado en tu evaluación inicial. Incluye recetas, menús semanales y 
                recomendaciones específicas.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                ¿Cómo funcionan las reservas online?
              </h3>
              <p className="text-neutral-600">
                Nuestro sistema detecta automáticamente si es tu primera, segunda o posterior visita basándose en tu email. 
                El precio se calcula automáticamente y puedes añadir el plan de nutrición si corresponde. 
                El pago se realiza de forma segura a través de Stripe.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                ¿Ofrecen consultas por videollamada?
              </h3>
              <p className="text-neutral-600">
                Actualmente nuestras consultas son presenciales en nuestro centro en Madrid. 
                Estamos evaluando la posibilidad de ofrecer consultas online para casos específicos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}