import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { CalendarIcon } from "lucide-react";
import CalendarMovile from "../components/CalendarMovile"

interface MobileBottomBarProps {
  currency:string;
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

export const MobileBottomBar = ({ 
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
}: MobileBottomBarProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controlar el modal
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary border-t p-4 flex items-center justify-between z-50 rounded-t-xl shadow-lg">
      <div>
        <p className="text-sm text-white">Desde</p>
        <p className="text-xl font-bold text-white">{currency}{price} USD</p>
        <p className="text-xs text-white">por persona</p>
      </div>

      {/* Abrir el Dialog al hacer clic */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-white text-primary px-8 py-3 rounded-full text-sm hover:bg-gray-100 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            Ver calendario
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle>Selecciona una Fecha</DialogTitle>
          </DialogHeader>
          {/* Calendario aquí */}
          <CalendarMovile
            price={price}
            categoria={categoria}
            nombre_tour={nombre_tour}
            fechas_inicio={fechas_inicio}
            availableDates={availableDates}
            firstAvailableDate={firstAvailableDate}
            months={months}
            buttonText={buttonText}
            onDateSelect={handleDateSelect}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
