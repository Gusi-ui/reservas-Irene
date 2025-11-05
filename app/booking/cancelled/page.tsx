'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function BookingCancelledPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('booking_id');

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                Pago Cancelado
              </h1>
              
              <p className="text-lg text-neutral-600 mb-8">
                El proceso de pago ha sido cancelado. Tu reserva no se ha completado.
              </p>

              <div className="bg-orange-50 rounded-lg p-6 mb-8 text-left">
                <h2 className="text-lg font-semibold text-orange-900 mb-4">
                  ¿Qué pasó?
                </h2>
                <p className="text-orange-800 mb-4">
                  El pago no se completó. Esto puede ocurrir por varias razones:
                </p>
                <ul className="space-y-2 text-orange-800 list-disc list-inside">
                  <li>Cancelaste el proceso de pago</li>
                  <li>Hubo un problema con tu tarjeta</li>
                  <li>Se agotó el tiempo de la sesión</li>
                </ul>
              </div>

              <div className="bg-primary-50 rounded-lg p-6 mb-8">
                <p className="text-sm text-primary-800">
                  💡 <strong>No te preocupes:</strong> Puedes intentar hacer la reserva nuevamente cuando lo desees. Tu slot de horario se liberará automáticamente.
                </p>
              </div>

              {bookingId && (
                <div className="bg-neutral-100 rounded-lg p-4 mb-8">
                  <p className="text-sm text-neutral-600">
                    <strong>ID de Reserva:</strong> <code className="text-xs bg-neutral-200 px-2 py-1 rounded">{bookingId}</code>
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/booking" className="btn btn-primary btn-lg">
                  Intentar de Nuevo
                </Link>
                <Link href="/" className="btn btn-secondary">
                  Volver al Inicio
                </Link>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-neutral-500">
                  Si necesitas ayuda, contáctanos en{' '}
                  <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
                    la página de contacto
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

