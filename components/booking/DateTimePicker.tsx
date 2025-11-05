'use client';

import { useState, useEffect } from 'react';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DateTimePickerProps {
  onDateTimeSelect: (date: Date, time: string) => void;
  selectedDate: Date | null;
  selectedTime: string | null;
  serviceId: string | null;
}

export function DateTimePicker({ onDateTimeSelect, selectedDate, selectedTime, serviceId }: DateTimePickerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Generar días del mes
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Días vacíos al inicio del mes
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  // Verificar si una fecha es válida para reservas
  const isValidBookingDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    // No permitir fechas pasadas o de hoy
    if (checkDate <= today) return false;
    
    // Solo lunes a viernes
    const dayOfWeek = date.getDay();
    return dayOfWeek >= 1 && dayOfWeek <= 5;
  };

  // Obtener horarios disponibles para una fecha
  const fetchAvailableSlots = async (date: Date) => {
    if (!serviceId) return;
    
    setLoading(true);
    try {
      const dateString = date.toISOString().split('T')[0];
      const response = await fetch(`/api/time-slots?date=${dateString}&serviceId=${serviceId}`);
      const data = await response.json();
      
      if (data.success) {
        setAvailableSlots(data.data);
      } else {
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error('Error fetching time slots:', error);
      setAvailableSlots([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate, serviceId]);

  const handleDateSelect = (date: Date) => {
    if (isValidBookingDate(date)) {
      onDateTimeSelect(date, '');
      setCurrentDate(date);
    }
  };

  const handleTimeSelect = (time: string) => {
    if (selectedDate) {
      onDateTimeSelect(selectedDate, time);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return time;
  };

  const days = getDaysInMonth(selectedMonth);
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900">
          Selecciona fecha y hora
        </h2>
        <p className="mt-2 text-neutral-600">
          Elige el día y horario que prefieras para tu consulta.
        </p>
      </div>

      {/* Calendario */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1))}
            className="p-2 hover:bg-neutral-100 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-lg font-semibold">
            {monthNames[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}
          </h3>
          <button
            onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1))}
            className="p-2 hover:bg-neutral-100 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-neutral-500">
              {day}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            if (!date) {
              return <div key={index} className="p-2"></div>;
            }

            const isSelected = selectedDate && 
              date.toDateString() === selectedDate.toDateString();
            const isValid = isValidBookingDate(date);
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <button
                key={index}
                onClick={() => isValid && handleDateSelect(date)}
                disabled={!isValid}
                className={`
                  p-2 text-sm rounded-lg transition-colors
                  ${isSelected 
                    ? 'bg-primary-600 text-white' 
                    : isValid
                    ? 'hover:bg-primary-50 hover:text-primary-600 text-neutral-900'
                    : 'text-neutral-300 cursor-not-allowed'
                  }
                  ${isToday && !isSelected ? 'ring-2 ring-primary-200' : ''}
                `}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fecha seleccionada */}
      {selectedDate && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">
            Horarios disponibles para {formatDate(selectedDate)}
          </h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <p className="mt-2 text-neutral-600">Cargando horarios...</p>
            </div>
          ) : availableSlots.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {availableSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => handleTimeSelect(slot.time)}
                  className={`
                    time-slot
                    ${selectedTime === slot.time 
                      ? 'time-slot-selected' 
                      : 'time-slot-available'
                    }
                  `}
                >
                  {formatTime(slot.time)}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-neutral-600">
                No hay horarios disponibles para esta fecha.
              </p>
              <p className="text-sm text-neutral-500 mt-1">
                Por favor, selecciona otra fecha.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Resumen de selección */}
      {selectedDate && selectedTime && (
        <div className="card p-6 bg-primary-50">
          <h4 className="font-semibold text-primary-900 mb-2">
            ✅ Fecha y hora seleccionadas
          </h4>
          <p className="text-primary-800">
            {formatDate(selectedDate)} a las {formatTime(selectedTime)}
          </p>
        </div>
      )}

      {/* Información adicional */}
      <div className="p-4 bg-neutral-50 rounded-lg">
        <h4 className="text-sm font-semibold text-neutral-900 mb-2">
          ℹ️ Información importante:
        </h4>
        <ul className="text-sm text-neutral-700 space-y-1">
          <li>• Las reservas están disponibles de lunes a viernes</li>
          <li>• No se pueden reservar citas para el mismo día</li>
          <li>• Horario de atención: 9:00 - 18:00</li>
          <li>• Los horarios aparecen en intervalos de 30 minutos</li>
        </ul>
      </div>
    </div>
  );
}