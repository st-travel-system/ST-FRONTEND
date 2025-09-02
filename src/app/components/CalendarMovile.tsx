'use client';
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import MyDatePicker from "../components/ui/calendar-react";
import { format, parseISO, isAfter, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { FaWhatsapp } from "react-icons/fa";
import { TourCategoryBadge } from "../components/TourCategoryBadge";

interface CalendarProps {
  price: number;
  categoria: string;
  nombre_tour: string;
  fechas_inicio?: string[]; // Puede ser undefined inicialmente
  availableDates?: string[];
  firstAvailableDate?: Date;
  months?: Date[];
  buttonText?: string;
  onDateSelect: (date: Date) => void;
}

export const Calendar = ({ 
  price, 
  categoria, 
  nombre_tour, 
  fechas_inicio = [],
  availableDates = [],
  firstAvailableDate,
  months = [],
  buttonText = "Ver Tour Completo",
  onDateSelect
}: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  // Número de WhatsApp
  const phoneNumber = "528125692214"; // Número de WhatsApp

  // Construir el mensaje de WhatsApp con la fecha si se ha seleccionado
  const formattedDate = selectedDate ? format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: es }) : null;
  const message = selectedDate 
    ? encodeURIComponent(`Hola, estoy interesado en el tour de ${nombre_tour} para la fecha ${formattedDate}. ¿Podrían brindarme más información?`)
    : encodeURIComponent(`Hola, estoy interesado en el tour de ${nombre_tour}. ¿Podrían brindarme más información?`);

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

  // Filtrar fechas futuras y agregar un día a cada fecha
  const validDates = Array.isArray(fechas_inicio) ? fechas_inicio : [];
    const seenDates = new Set();
   
   const futureDates = validDates.filter(date => {
     try {
       const parsedDate = parseISO(date);
       const isoDateStr = parsedDate.toISOString().split('T')[0]; // Solo fecha (yyyy-mm-dd)
   
       if (isAfter(parsedDate, new Date()) && !seenDates.has(isoDateStr)) {
         seenDates.add(isoDateStr);
         return true;
       }
   
       return false;
     } catch (error) {
       console.error("Error al procesar la fecha:", date, error);
       return false;
     }
   });


  const handleWhatsAppClick = (event: React.MouseEvent) => {
    if (!selectedDate) {
      setShowMessage(true); // Muestra el mensaje si no hay fecha seleccionada
      event.preventDefault(); // Previene la redirección a WhatsApp si no hay fecha seleccionada
      setTimeout(() => setShowMessage(false), 3000); // Oculta el mensaje después de 3 segundos
    }
  };

  return (
    <div className="space-y-6 mb-16"> {/* Agregar margen en la parte inferior para que el botón no se superponga */}
      <h3 className="text-3xl font-bold text-primary">Desde ${price} USD</h3>
      <p className="text-xs text-gray-600">por persona</p>

      {/* <div className="mb-6">
        <TourCategoryBadge category={`${categoria}`} />
      </div>
      */}
      {showMessage && (
        <p className="text-red-500 text-center mt-4">Debe seleccionar una fecha para continuar.</p>
      )}

      {/* Calendario */}
      <MyDatePicker fechas_inicio={futureDates} onDateSelect={(date) => {
        setSelectedDate(date);
        onDateSelect(date);
      }} />

      {/* Botón para WhatsApp */}
      <div className={`fixed bottom-0 left-0 right-0 border-t p-4 flex items-center justify-between z-50 rounded-t-xl shadow-lg ${
            selectedDate ? "bg-primary hover:bg-[#4a2264]" : "bg-gray-400 cursor-not-allowed"
          }`}>
         <a
          href={whatsappURL}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-center gap-2 text-white px-4 rounded-lg text-lg font-semibold transition ${
            selectedDate ? "bg-[#5B2C7C] hover:bg-[#4a2264]" : "bg-gray-400 cursor-not-allowed"
          }`}
          style={{ pointerEvents: selectedDate ? "auto" : "none" }}
          onClick={handleWhatsAppClick}
        >
          <FaWhatsapp className="w-4 h-4" />
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default Calendar;
