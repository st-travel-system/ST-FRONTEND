import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ScrollArea } from "../components/ui/scroll-area";

interface DayDetail {
  day_number: string;
  titulo: string;
  descripcion: string;
  detalles: string;
}

interface TourItineraryProps {
  itinerario: DayDetail[];
}

export const TourItinerary = ({ itinerario }: TourItineraryProps) => {
  const [openDay, setOpenDay] = useState<string | null>(null);
// Ordenar el itinerario por número de día y filtrar días repetidos

const sortedItinerary = [...(itinerario || [])]
  .sort((a, b) => parseInt(a.day_number) - parseInt(b.day_number)) // Ordenar por día
  .filter((value, index, self) => 
    index === self.findIndex((t) => (
      t.day_number === value.day_number // Filtrar días repetidos
    ))
  );

  const toggleDropdown = (dayNumber: string) => {
    setOpenDay(openDay === dayNumber ? null : dayNumber);
  };

  return (
    <div>
      <h2 className="text-2xl font-outfit font-semibold mb-4">Itinerario</h2>
      <ScrollArea className="h-[400px] rounded-md border p-4">
        <div className="flex flex-col gap-4">
          {sortedItinerary.map((item, index) => (
            <div key={index} className="group">
              {/* Encabezado del Dropdown */}
              <div
                onClick={() => toggleDropdown(item.day_number)}
                className="group flex items-center gap-4 p-3 bg-accent rounded-lg cursor-pointer hover:bg-accent/80 transition-all hover:shadow-md hover:translate-x-0.5 hover:-translate-y-0.5 active:bg-accent/90 active:translate-x-0 active:translate-y-0"
              >
                <div className="font-outfit font-bold text-primary">
                  Día {item.day_number}
                </div>
                <div className="flex-1 text-sm text-muted-foreground">
                  {item.titulo}
                </div>
                {openDay === item.day_number ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
                )}
              </div>

              {/* Contenido Expandible */}
              {openDay === item.day_number && (
                <div className="p-4 border border-gray-200 bg-white rounded-lg shadow-md mt-2">
                  <p className="font-medium text-sm font-jakarta">{item.descripcion}</p>
                  <div className="text-sm text-muted-foreground space-y-2 font-jakarta mt-2">
                    {(item.detalles ?? "").split("\n").map((parrafo, index) => (
                      <p key={index}>{parrafo}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
