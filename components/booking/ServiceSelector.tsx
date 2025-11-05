'use client';

import { useState, useEffect } from 'react';
import { Service, PriceCalculation } from '@/types';

interface ServiceSelectorProps {
  onServiceSelect: (service: Service) => void;
  selectedService: Service | null;
}

const SERVICES: Service[] = [
  {
    id: 'nutrition',
    name: 'Consulta de Nutrición',
    description: 'Consulta nutricional personalizada para mejorar tu alimentación y hábitos alimentarios.',
    basePrice: 60,
    baseDuration: 60,
    serviceType: 'general',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'mental',
    name: 'Trastornos Mentales',
    description: 'Nutrición especializada para el manejo de trastornos mentales y bienestar emocional.',
    basePrice: 60,
    baseDuration: 60,
    serviceType: 'specialized',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'autism',
    name: 'Autismo',
    description: 'Nutrición especializada para niños y adultos con trastorno del espectro autista.',
    basePrice: 60,
    baseDuration: 60,
    serviceType: 'specialized',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'integrative',
    name: 'Nutrición Integrativa',
    description: 'Enfoque integrativo que combina nutrición convencional con medicina funcional.',
    basePrice: 60,
    baseDuration: 60,
    serviceType: 'advanced',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export function ServiceSelector({ onServiceSelect, selectedService }: ServiceSelectorProps) {
  const [visitCount, setVisitCount] = useState(0);
  const [priceCalculations, setPriceCalculations] = useState<{[key: string]: PriceCalculation}>({});

  useEffect(() => {
    // Simular detección de visitas por email (en producción esto vendría de la API)
    const storedVisitCount = localStorage.getItem('visit-count');
    if (storedVisitCount) {
      setVisitCount(parseInt(storedVisitCount));
    }
  }, []);

  useEffect(() => {
    // Calcular precios dinámicos para cada servicio
    const calculations: {[key: string]: PriceCalculation} = {};
    
    SERVICES.forEach(service => {
      // Simular lógica de precios basada en visita count
      let price = service.basePrice;
      let duration = service.baseDuration;
      let isFirstVisit = false;
      let isSecondVisit = false;
      
      if (visitCount === 0) {
        price = 90;
        duration = 120;
        isFirstVisit = true;
      } else if (visitCount === 1) {
        price = 60;
        duration = 60;
        isSecondVisit = true;
      } else {
        price = 60;
        duration = 60;
      }

      const availableAddons = isSecondVisit ? [
        {
          name: 'Plan de nutrición personalizada',
          price: 30,
          description: 'Plan nutricional completo personalizado para tus necesidades'
        }
      ] : [];

      calculations[service.id] = {
        basePrice: price,
        duration,
        isFirstVisit,
        isSecondVisit,
        availableAddons,
        totalPrice: price
      };
    });

    setPriceCalculations(calculations);
  }, [visitCount]);

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
    }
    return `${minutes}min`;
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900">
          ¿Qué tipo de consulta necesitas?
        </h2>
        <p className="mt-2 text-neutral-600">
          Selecciona el servicio que mejor se adapte a tus necesidades. 
          El precio se ajustará automáticamente: 
          <span className="font-semibold text-primary-600">
            {visitCount === 0 ? ' Primera visita: 90€' : 
             visitCount === 1 ? ' Segunda visita: 60€' : 
             ' Visitas siguientes: 60€'}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {SERVICES.map((service) => {
          const calculation = priceCalculations[service.id];
          const isSelected = selectedService?.id === service.id;
          
          return (
            <div
              key={service.id}
              className={`service-card ${isSelected ? 'service-card-selected' : ''}`}
              onClick={() => onServiceSelect(service)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {service.name}
                  </h3>
                  <span className="duration-badge">
                    {service.serviceType === 'general' ? 'General' : 
                     service.serviceType === 'specialized' ? 'Especializada' : 'Avanzada'}
                  </span>
                </div>
                
                <p className="text-sm text-neutral-600 mb-4">
                  {service.description}
                </p>

                {calculation && (
                  <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-600">
                        {calculation.isFirstVisit ? 'Primera visita' :
                         calculation.isSecondVisit ? 'Segunda visita' :
                         'Visita de seguimiento'}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {formatDuration(calculation.duration)}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-primary-600">
                      {calculation.basePrice}€
                    </div>
                    
                    {calculation.isSecondVisit && calculation.availableAddons.length > 0 && (
                      <div className="mt-2 text-xs text-neutral-600">
                        <p>+ Plan nutrición opcional: {calculation.availableAddons[0].price}€</p>
                      </div>
                    )}
                  </div>
                )}

                <button
                  className={`btn ${isSelected ? 'btn-primary' : 'btn-outline'} w-full`}
                >
                  {isSelected ? 'Seleccionado' : 'Seleccionar'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Price Information */}
      <div className="mt-8 p-4 bg-primary-50 rounded-lg">
        <h4 className="text-sm font-semibold text-primary-900 mb-2">
          💡 Información sobre precios:
        </h4>
        <ul className="text-sm text-primary-800 space-y-1">
          <li>• <strong>Primera visita:</strong> 90€ - 120 minutos</li>
          <li>• <strong>Segunda visita:</strong> 60€ - 60 minutos + Plan Nutrición Opcional (30€)</li>
          <li>• <strong>Visitas siguientes:</strong> 60€ - 60 minutos</li>
          <li>• Los precios se calculan automáticamente según tu historial</li>
        </ul>
      </div>
    </div>
  );
}