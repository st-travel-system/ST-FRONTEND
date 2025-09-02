import { CalendarDays, Globe, Hotel, MapPin, Users } from "lucide-react";

export const TourFeatures = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="flex items-center gap-3 bg-accent p-4 rounded-lg">
        <CalendarDays className="text-primary w-5 h-5" />
        <span>18 días</span>
      </div>
      <div className="flex items-center gap-3 bg-accent p-4 rounded-lg">
        <MapPin className="text-primary w-5 h-5" />
        <span>7 países</span>
      </div>
      <div className="flex items-center gap-3 bg-accent p-4 rounded-lg">
        <Users className="text-primary w-5 h-5" />
        <span>Máx. 20 personas</span>
      </div>
      <div className="flex items-center gap-3 bg-accent p-4 rounded-lg">
        <Globe className="text-primary w-5 h-5" />
        <span>Guía en Español</span>
      </div>
      <div className="flex items-center gap-3 bg-accent p-4 rounded-lg">
        <Hotel className="text-primary w-5 h-5" />
        <span>Hoteles 4★ y 5★</span>
      </div>
      <div className="flex items-center gap-3 bg-accent p-4 rounded-lg">
        <CalendarDays className="text-primary w-5 h-5" />
        <span>Salidas todo el año</span>
      </div>
    </div>
  );
};