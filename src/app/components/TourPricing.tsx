'use client';
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { TourCategoryBadge } from "../components/TourCategoryBadge";
import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import MyDatePicker from "../components/ui/calendar-react";
import { format, parseISO, isAfter,addDays } from "date-fns";
import { es } from "date-fns/locale";

import { FaWhatsapp, FaTiktok } from "react-icons/fa";


interface TourPricingProps {
  currency: string;
  price: number;
  categoria: string;
  nombre_tour: string;
  fechas_inicio?: string[]; // Puede ser undefined inicialmente
  availableDates?: string[];
  firstAvailableDate?: Date;
  months?: Date[];
  calendarProps?: any;
  buttonText?: string;
}

export const TourPricing = ({
  currency,
  price,
  categoria,
  nombre_tour,
  fechas_inicio = [], // 👈 Evita errores asegurando que sea un array
  availableDates = [],
  firstAvailableDate,
  months = [],
  calendarProps,
  buttonText = "Ver Tour Completo"
}: TourPricingProps) => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDateMensual, setSelectedDateMensual] = useState<Date | null>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);


  // Número de WhatsApp
  const phoneNumber = "528125692214"; // Número de WhatsApp

  // Construir el mensaje de WhatsApp con la fecha si se ha seleccionado
  const formattedDate = selectedDate ? format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: es }) : null;
  const message = selectedDate
    ? encodeURIComponent(`Hola, estoy interesado en el tour de ${nombre_tour} para la fecha ${formattedDate}. ¿Podrían brindarme más información?`)
    : encodeURIComponent(`Hola, estoy interesado en el tour de ${nombre_tour}. ¿Podrían brindarme más información?`);

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;


  // Obtener la fecha actual
  const today = new Date();

  // 🔹 Verificar que `fechas_inicio` es un array antes de usar `filter()`
  const validDates = Array.isArray(fechas_inicio) ? fechas_inicio : [];


  // console.log(validDates);
  

  // 🔹 Filtrar solo fechas futuras
const seen = new Set();

const futureDates = validDates.filter(date => {
  try {
    const parsedDate = parseISO(date);

    // Verifica si la fecha es futura y no se ha visto antes
    if (isAfter(parsedDate, today) && !seen.has(date)) {
      seen.add(date);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error al procesar la fecha:", date, error);
    return false;
  }
});



  // 🔹 Agrupar fechas por mes solo con fechas futuras
  const groupedDates: { [key: string]: string[] } = futureDates.reduce((acc, date) => {
    const monthKey = format(parseISO(date), "yyyy-MM", { locale: es });
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(date);
    return acc;
  }, {} as { [key: string]: string[] });

  const handleWhatsAppClick = (event: React.MouseEvent) => {
    if (!selectedDate) {
      setShowMessage(true); // Muestra el mensaje si no hay fecha seleccionada
      event.preventDefault(); // Previene la redirección a WhatsApp si no hay fecha seleccionada
      setTimeout(() => setShowMessage(false), 3000); // Oculta el mensaje después de 3 segundos
    }
  };

  // Función para manejar la selección de fecha en el modal
  const handleDateSelectInModal = (date: string) => {
    const selected = parseISO(date);
    setSelectedDate(selected);
  };

  return (
    <div className="sticky top-28 border rounded-lg p-6 bg-accent">
      <h3 className="text-3xl font-outfit font-bold mb-2 text-primary">
        Desde {currency}{price} USD
      </h3>
      <p className="text-gray-600 mb-4">por persona</p>

      <div className="mb-6">
        <TourCategoryBadge category={`${categoria}`} />
      </div>

      <a
        href={whatsappURL}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full flex items-center justify-center gap-2 text-white mb-5 py-2 px-4 rounded-lg text-lg font-semibold transition ${selectedDate ? "bg-[#2d0a44] hover:bg-[#1e072e]" : "bg-gray-400 cursor-not-allowed"}`}
        style={{ pointerEvents: selectedDate ? "auto" : "none" }}
        onClick={handleWhatsAppClick}
      >
        <FaWhatsapp className="w-4 h-4" />
        {buttonText}
      </a>

      {showMessage && (
        <p className="text-red-500 text-center mt-4">Debe seleccionar una fecha para continuar.</p>
      )}

      <div className="space-y-4 mb-6">
        <MyDatePicker fechas_inicio={futureDates} onDateSelect={setSelectedDate} />

        {/* MODAL DEL CALENDARIO */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Ver calendario anual
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle>Fechas de Salida 2025</DialogTitle>
            </DialogHeader>

        {/* Verificar si hay fechas futuras */}
              {Object.keys(groupedDates).length > 0 ? (
                <div className="grid grid-cols-2 gap-6">
                  {Object.keys(groupedDates).map((monthKey) => (
                    <div key={monthKey} className="p-4 border rounded-lg">
                      <h4 className="text-lg font-semibold text-primary mb-2">
                        {format(parseISO(`${monthKey}-01`), "MMMM yyyy", { locale: es })}
                      </h4>
                      <div className="grid grid-cols-4 gap-2">
                        {groupedDates[monthKey].map((date) => {
                          const nextDay = addDays(parseISO(date), 1); // Sumamos 1 día a cada fecha
              
                          return (
                            <span
                              key={date}
                              className={`text-white px-3 py-1 rounded-md text-center ${
                                selectedDate &&
                                format(nextDay, "yyyy-MM-dd") === format(selectedDateMensual, "yyyy-MM-dd")
                                  ? "bg-[#2d0a44]"
                                  : "bg-[#2d0a44]"
                              }`}
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleDateSelectInModal(format(nextDay, "yyyy-MM-dd"))}
                            >
                              {format(nextDay, "dd", { locale: es })}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No hay fechas futuras disponibles.</p>
              )}

            <a
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full flex items-center justify-center gap-2 text-white mb-5 py-2 px-4 rounded-lg text-lg font-semibold transition ${selectedDate ? "bg-[#2d0a44] hover:bg-[#1e072e]" : "bg-gray-400 cursor-not-allowed"}`}
              style={{ pointerEvents: selectedDate ? "auto" : "none" }}
              onClick={handleWhatsAppClick}
            >
              <FaWhatsapp className="w-4 h-4" />
              {buttonText}
            </a>

          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
