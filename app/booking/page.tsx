'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Service {
  id: string;
  name: string;
  description: string;
  base_price: number;
  base_duration: number;
  service_type: string;
}

interface PricingInfo {
  price: number;
  duration: number;
  visit_type: 'first' | 'second' | 'followup';
  visit_count: number;
  show_nutrition_plan: boolean;
}

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [includeNutritionPlan, setIncludeNutritionPlan] = useState(false);
  const [pricing, setPricing] = useState<PricingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '16:00', '16:30', '17:00', '17:30'
  ];

  // Cargar servicios desde la API
  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetch('/api/services');
        const data = await response.json();
        setServices(data.services || []);
      } catch (err) {
        console.error('Error loading services:', err);
        setError('Error al cargar servicios');
      }
    };

    loadServices();
  }, []);

  // Calcular pricing cuando cambia el email
  useEffect(() => {
    const calculatePricing = async () => {
      if (customerData.email && selectedService) {
        try {
          const response = await fetch('/api/pricing', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: customerData.email,
              serviceId: selectedService.id,
              includeNutritionPlan,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            setPricing(data.pricing);
          }
        } catch (err) {
          console.error('Error calculating pricing:', err);
        }
      }
    };

    const debounceTimer = setTimeout(calculatePricing, 500);
    return () => clearTimeout(debounceTimer);
  }, [customerData.email, selectedService, includeNutritionPlan]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleDateSelect = (date: Date) => {
    if (selectedDate?.getTime() === date.getTime()) {
      setSelectedDate(null);
      setSelectedTime('');
    } else {
      setSelectedDate(date);
      setSelectedTime('');
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleCustomerDataChange = (field: string, value: string) => {
    setCustomerData({ ...customerData, [field]: value });
  };

  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!selectedService || !selectedDate || !selectedTime || !pricing) {
      setError('Faltan datos de la reserva');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Crear la reserva en Supabase
      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: customerData.email,
          name: customerData.name,
          phone: customerData.phone,
          serviceId: selectedService.id,
          bookingDate: selectedDate.toISOString().split('T')[0],
          bookingTime: selectedTime,
          duration: pricing.duration,
          totalPrice: pricing.price,
          visitType: pricing.visit_type,
          notes: customerData.notes,
          includeNutritionPlan,
        }),
      });

      if (!bookingResponse.ok) {
        throw new Error('Error al crear la reserva');
      }

      const bookingData = await bookingResponse.json();
      const bookingId = bookingData.bookingId;

      // 2. Crear sesión de checkout en Stripe
      const checkoutResponse = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          customerEmail: customerData.email,
          customerName: customerData.name,
          amount: pricing.price,
          bookingDetails: {
            service: selectedService.name,
            date: selectedDate.toLocaleDateString('es-ES'),
            time: selectedTime,
            visitType: getVisitTypeLabel(pricing.visit_type),
          },
        }),
      });

      if (!checkoutResponse.ok) {
        throw new Error('Error al crear la sesión de pago');
      }

      const checkoutData = await checkoutResponse.json();

      // 3. Redirigir a Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Error al cargar Stripe');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: checkoutData.sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err) {
      console.error('Error during booking:', err);
      setError(err instanceof Error ? err.message : 'Error al procesar la reserva');
      setIsLoading(false);
    }
  };

  const getVisitTypeLabel = (visitType: string) => {
    const labels = {
      first: 'Primera Visita',
      second: 'Segunda Visita',
      followup: 'Visita de Seguimiento',
    };
    return labels[visitType as keyof typeof labels] || visitType;
  };

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
    }
    return `${minutes}min`;
  };

  const canProceedFromStep2 = () => {
    return selectedDate && selectedTime;
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            {step === 1 && 'Selecciona tu servicio'}
            {step === 2 && 'Elige fecha y hora'}
            {step === 3 && 'Tus datos de contacto'}
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            {step === 1 && '¿Qué tipo de consulta necesitas?'}
            {step === 2 && '¿Cuándo te viene mejor? Selecciona día Y hora'}
            {step === 3 && 'Completa tus datos para proceder al pago'}
          </p>
          
          {/* Mostrar información de visitas */}
          {pricing && customerData.email && (
            <div className="mt-4 p-3 bg-primary-50 rounded-lg">
              <p className="text-sm text-primary-800">
                📧 <strong>{customerData.email}</strong> - 
                {pricing.visit_count === 0 ? ' Primera visita detectada' :
                 pricing.visit_count === 1 ? ' Segunda visita (plan nutrición opcional disponible)' :
                 ` ${pricing.visit_count} visitas anteriores`}
              </p>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mx-auto max-w-4xl mb-12">
          <nav aria-label="Progress">
            <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
              {[1, 2, 3].map((stepNum) => (
                <li key={stepNum} className="md:flex-1">
                  <div className={`group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 ${
                    step === stepNum ? 'border-primary-600' : 
                    step > stepNum ? 'border-success-500' : 'border-neutral-300'
                  }`}>
                    <span className={`text-sm font-medium ${
                      step === stepNum ? 'text-primary-600' : 
                      step > stepNum ? 'text-success-600' : 'text-neutral-600'
                    }`}>
                      Paso {stepNum}
                    </span>
                    <span className="text-sm text-neutral-500">
                      {stepNum === 1 && 'Servicio'}
                      {stepNum === 2 && 'Fecha y Hora'}
                      {stepNum === 3 && 'Datos y Pago'}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-auto max-w-4xl mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="mx-auto max-w-4xl">
          {step === 1 && (
            <div className="booking-step">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="service-card cursor-pointer"
                    onClick={() => handleServiceSelect(service)}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-neutral-900">
                          {service.name}
                        </h3>
                        <span className="duration-badge">
                          {service.service_type === 'general' ? 'General' : 
                           service.service_type === 'specialized' ? 'Especializada' : 'Avanzada'}
                        </span>
                      </div>
                      
                      <p className="text-sm text-neutral-600 mb-4">
                        {service.description}
                      </p>

                      <div className="p-3 bg-neutral-50 rounded-lg">
                        <div className="text-2xl font-bold text-primary-600">
                          Desde {service.base_price}€
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">
                          El precio se ajusta según tu historial de visitas
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-primary-50 rounded-lg">
                <h4 className="text-sm font-semibold text-primary-900 mb-2">
                  💡 Sistema de precios inteligente:
                </h4>
                <ul className="text-sm text-primary-800 space-y-1">
                  <li>• <strong>Primera visita:</strong> 90€ - 120 minutos (evaluación completa)</li>
                  <li>• <strong>Segunda visita:</strong> 60€ - 60 minutos + Plan Nutrición Opcional (30€)</li>
                  <li>• <strong>Tercera visita+:</strong> 60€ - 60 minutos (consulta de seguimiento)</li>
                  <li>• La detección es automática por email (sin registro necesario)</li>
                </ul>
              </div>
            </div>
          )}

          {step === 2 && selectedService && (
            <div className="booking-step">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    📅 Selecciona una fecha
                    {selectedDate && (
                      <span className="ml-2 text-sm text-primary-600 font-normal">
                        • Seleccionada: {selectedDate.toLocaleDateString('es-ES')}
                      </span>
                    )}
                  </h3>
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
                      <div key={day} className="p-2 text-center text-sm font-medium text-neutral-500">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 30 }, (_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() + i + 1);
                      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                      const isPast = date < new Date();
                      const isSelected = selectedDate?.toDateString() === date.toDateString();
                      
                      return (
                        <button
                          key={i}
                          onClick={() => !isWeekend && !isPast && handleDateSelect(date)}
                          disabled={isWeekend || isPast}
                          className={`
                            p-2 text-sm rounded-lg transition-colors
                            ${isWeekend || isPast 
                              ? 'text-neutral-300 cursor-not-allowed' 
                              : isSelected
                              ? 'bg-primary-600 text-white'
                              : 'hover:bg-primary-50 hover:text-primary-600 text-neutral-900'
                            }
                          `}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    ⏰ Horarios disponibles
                    {!selectedDate && (
                      <span className="ml-2 text-sm text-orange-600 font-normal">
                        • Selecciona una fecha primero
                      </span>
                    )}
                  </h3>
                  {selectedDate ? (
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={`
                            time-slot transition-colors
                            ${selectedTime === time 
                              ? 'time-slot-selected' 
                              : 'time-slot-available'
                            }
                          `}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-neutral-500">
                      <p>Selecciona una fecha para ver los horarios disponibles</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Resumen de selección */}
              {selectedDate && selectedTime && (
                <div className="mt-8 p-6 bg-success-50 border border-success-200 rounded-lg">
                  <h4 className="font-semibold text-success-900 mb-2">
                    ✅ Fecha y hora seleccionadas
                  </h4>
                  <p className="text-success-800">
                    {selectedDate.toLocaleDateString('es-ES')} a las {selectedTime}
                  </p>
                </div>
              )}

              <div className="mt-8 flex justify-between items-center">
                <button 
                  onClick={() => setStep(1)}
                  className="btn btn-secondary"
                >
                  ← Volver
                </button>
                
                {canProceedFromStep2() ? (
                  <button
                    onClick={() => setStep(3)}
                    className="btn btn-primary btn-lg"
                  >
                    Continuar →
                  </button>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-neutral-500 mb-2">
                      Selecciona día Y hora para continuar
                    </p>
                    <button
                      disabled
                      className="btn btn-secondary opacity-50 cursor-not-allowed"
                    >
                      Continuar →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && selectedService && selectedDate && selectedTime && (
            <div className="booking-step">
              {/* Resumen de selección */}
              <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
                <h3 className="font-semibold mb-3">📋 Resumen de tu reserva:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Servicio:</strong> {selectedService.name}</div>
                  <div><strong>Fecha:</strong> {selectedDate.toLocaleDateString('es-ES')}</div>
                  <div><strong>Hora:</strong> {selectedTime}</div>
                  {pricing && (
                    <>
                      <div><strong>Duración:</strong> {formatDuration(pricing.duration)}</div>
                      <div><strong>Tipo:</strong> {getVisitTypeLabel(pricing.visit_type)}</div>
                      <div><strong>Precio:</strong> {pricing.price.toFixed(2)}€</div>
                    </>
                  )}
                </div>
              </div>

              <form onSubmit={handleCustomerSubmit} className="space-y-6">
                <div className="form-row">
                  <div className="form-group">
                    <label className="label">Nombre completo *</label>
                    <input
                      type="text"
                      required
                      value={customerData.name}
                      onChange={(e) => handleCustomerDataChange('name', e.target.value)}
                      className="input"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Email *</label>
                    <input
                      type="email"
                      required
                      value={customerData.email}
                      onChange={(e) => handleCustomerDataChange('email', e.target.value)}
                      className="input"
                      placeholder="tu@email.com"
                    />
                    <p className="text-xs text-neutral-500 mt-1">
                      Usaremos tu email para detectar tu historial de visitas
                    </p>
                  </div>
                </div>

                <div className="form-group">
                  <label className="label">Teléfono *</label>
                  <input
                    type="tel"
                    required
                    value={customerData.phone}
                    onChange={(e) => handleCustomerDataChange('phone', e.target.value)}
                    className="input"
                    placeholder="+34 600 123 456"
                  />
                </div>

                {pricing?.show_nutrition_plan && (
                  <div className="p-4 bg-secondary-50 border border-secondary-200 rounded-lg">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-secondary-600 focus:ring-secondary-500 border-secondary-300 rounded"
                        id="nutrition-plan"
                        checked={includeNutritionPlan}
                        onChange={(e) => setIncludeNutritionPlan(e.target.checked)}
                      />
                      <div>
                        <label htmlFor="nutrition-plan" className="text-sm font-medium text-secondary-900 cursor-pointer">
                          🌿 Agregar Plan de Nutrición Personalizada (+30€)
                        </label>
                        <p className="text-xs text-secondary-700 mt-1">
                          Incluye: Plan alimentario detallado, recetas personalizadas y seguimiento durante 2 semanas
                        </p>
                      </div>
                    </label>
                  </div>
                )}

                <div className="form-group">
                  <label className="label">Notas adicionales (opcional)</label>
                  <textarea
                    rows={4}
                    value={customerData.notes}
                    onChange={(e) => handleCustomerDataChange('notes', e.target.value)}
                    className="input"
                    placeholder="Algún comentario especial, alergias, o información relevante..."
                  />
                </div>

                <div className="bg-primary-50 p-4 rounded-lg">
                  <p className="text-sm text-primary-800">
                    🔒 <strong>Pago seguro con Stripe:</strong> Serás redirigido a una página segura de pago. 
                    Tu reserva se confirmará automáticamente después del pago exitoso.
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <button 
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn btn-secondary"
                    disabled={isLoading}
                  >
                    ← Volver
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Procesando...' : 'Proceder al Pago →'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
