'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const bookingId = searchParams.get('booking_id');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dar tiempo para que el webhook procese el pago
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-lg text-neutral-600">Confirmando tu pago...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                ¡Pago Confirmado! 🎉
              </h1>
              
              <p className="text-lg text-neutral-600 mb-8">
                Tu reserva ha sido confirmada exitosamente y el pago se ha procesado correctamente.
              </p>

              <div className="bg-primary-50 rounded-lg p-6 mb-8 text-left">
                <h2 className="text-lg font-semibold text-primary-900 mb-4">
                  📧 ¿Qué sigue?
                </h2>
                <ul className="space-y-3 text-primary-800">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Recibirás un <strong>email de confirmación</strong> con todos los detalles de tu cita</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Te enviaremos un <strong>mensaje por WhatsApp</strong> con el recordatorio de tu cita</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>24 horas antes, recibirás un <strong>recordatorio automático</strong></span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Para tu próxima visita, usa el mismo email para obtener los <strong>descuentos progresivos</strong></span>
                  </li>
                </ul>
              </div>

              {bookingId && (
                <div className="bg-neutral-100 rounded-lg p-4 mb-8">
                  <p className="text-sm text-neutral-600">
                    <strong>ID de Reserva:</strong> <code className="text-xs bg-neutral-200 px-2 py-1 rounded">{bookingId}</code>
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/" className="btn btn-primary">
                  Volver al Inicio
                </Link>
                <Link href="/booking" className="btn btn-secondary">
                  Hacer Otra Reserva
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

