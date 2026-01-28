'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { addDays, startOfDay, isAfter, isEqual } from 'date-fns';
import 'react-day-picker/style.css';

type Props = {
  fechas_inicio?: (string | Date)[];
  onDateSelect?: (date: Date | undefined) => void;
};

export default function MyDatePicker({ fechas_inicio = [], onDateSelect }: Props) {
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [month, setMonth] = useState<Date>(new Date());

  const today = startOfDay(new Date());

  // 1) Normalizar -> sumar 1 día -> filtrar futuras -> ordenar
  const availableDates = useMemo(() => {
    if (!Array.isArray(fechas_inicio)) return [];
    return fechas_inicio
      .map((d) => {
        const dateObj = d instanceof Date ? d : new Date(d);
        const fixed = addDays(dateObj, 1);      // tu corrección por desfase
        return startOfDay(fixed);
      })
      .filter((d) => !isNaN(d.getTime()) && (isEqual(d, today) || isAfter(d, today)))
      .sort((a, b) => a.getTime() - b.getTime());
  }, [fechas_inicio, today]);

  const firstAvailable = availableDates[0];

  // 2) Clave que representa “el conjunto de fechas disponibles” (para detectar cambios reales)
  const datesKey = useMemo(
    () => availableDates.map((d) => d.toISOString().slice(0, 10)).join('|'),
    [availableDates]
  );

  // 3) Bandera: ¿ya auto-posicionamos el calendario para este set de fechas?
  const positionedRef = useRef(false);

  // 4) Si cambian las fechas disponibles, permitimos auto-posicionar una sola vez
  useEffect(() => {
    positionedRef.current = false;
  }, [datesKey]);

  // 5) Auto-posiciona SOLO una vez cuando hay primera fecha disponible
  useEffect(() => {
    if (firstAvailable && !positionedRef.current) {
      setMonth(firstAvailable);     // mueve la vista al mes correcto
      positionedRef.current = true; // evita volver a moverlo al navegar
      // Si quieres preseleccionar automáticamente:
      // setSelected(firstAvailable);
      // onDateSelect?.(firstAvailable);
    } else if (!firstAvailable && !positionedRef.current) {
      setMonth(today);
      positionedRef.current = true;
    }
  }, [firstAvailable, today, onDateSelect]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelected(date);
    onDateSelect?.(date);
  };

  return (
    <center>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleDateSelect}
        locale={es}

        // 🔹 Controlado: el mes mostrado se mantiene al navegar
        month={month}
        onMonthChange={setMonth}

        modifiers={{ available: availableDates }}
        modifiersStyles={{
          available: {
            background: 'linear-gradient(135deg, #2d0a44, #2d0a44)',
            color: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            fontWeight: 'bold',
          },
          selected: {
            backgroundColor: '#FF9800',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '50%',
            boxShadow: '0 4px 15px rgba(27, 75, 5, 0.5)',
          },
        }}

        // Opcional: solo permitir seleccionar fechas disponibles
        // disabled={[(day) => !availableDates.some(d => d.getTime() === startOfDay(day).getTime())]}

        // Opcional: no mostrar días fuera del mes
        // showOutsideDays={false}
      />
    </center>
  );
}
