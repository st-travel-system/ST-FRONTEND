import { Badge } from "./ui/badge";
import { useState } from "react";


import { DOMAIN_FRONT } from "../../../env";

import { CalendarDays, Globe, Hotel, MapPin,MoveRight, Star, Users,ArrowRight} from "lucide-react";

interface TourCardRecomendProps {
  id_tour: number;
  title: string;
  location: string;
  price: number;
  duration: string;
  imageUrl: string;
  description: string;
  descripciones: Descripcion[];
  isPopular?: boolean;
  currency: string;
  continente: string;
  cambio: number;
}

interface Descripcion {
  titulo: string;
  descripcion: string;
}

export const TourCardRecomend = ({ id_tour,title, location, price, duration, imageUrl, description,descripciones, isPopular,currency,cambio,continente }: TourCardRecomendProps) => {

  const [sheetOpen, setSheetOpen] = useState(false);

  const descripcionFiltrada = descripciones?.find(desc => desc?.titulo === "El precio incluye") || { descripcion: "" };
  const hotelesFiltrados = descripciones?.find(hot => hot?.titulo === "Hoteles previstos o similares") || { descripcion: "" };
  

   // Limpiar y dividir la descripción en elementos individuales
   const items_precio_incluye = descripcionFiltrada.descripcion
   .replace(/<BR>/gi, '') // Elimina etiquetas <BR>
   .replace(/\r\n/g, '')  // Elimina caracteres de nueva línea
   .split('- ')           // Divide por guion y espacio "- " para separar los elementos
   .filter(item => item.trim() !== ''); // Filtra elementos vacío


     // Extraer ciudades que están dentro de <b>...</b> con RegExp
    const ciudades = [...hotelesFiltrados.descripcion.matchAll(/<b>(.*?)<\/b>/gi)]
    .map(match => match[1].replace(/<BR>/gi, '').trim()); // Elimina <BR> y espacios extra


    // CANTIDAD DE CIUDADES

    const cantidad_ciudades = ciudades.length;


    

    var precio_tour = 0
   
    if(continente == "Europa"){
      precio_tour = Math.round(price * cambio);
    } else {
     precio_tour = price;
    }


  

  return (
    <>
    <a href={DOMAIN_FRONT+'tour/'+id_tour}>
      <div 
        className="group cursor-pointer transition-all duration-300 hover:scale-105"
        onClick={() => setSheetOpen(true)}
      >
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          {/* {isPopular && (
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="secondary" className="font-medium bg-white text-primary">
                Popular
              </Badge>
            </div>
          )} */}
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-all duration-300 group-hover:from-black/90" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-xl font-playfair font-semibold mb-1">{title}</h3>
            <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-300">
              {/* <p className="text-sm opacity-90 line-clamp-2">{description}</p> */}
            </div>
            <p className="text-sm opacity-90">{location}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-semibold">Desde {currency}{Math.round(precio_tour * cambio)} USD</span>
              <span className="text-sm">{duration}</span>
            </div>
          </div>
        </div>
      </div>

      
      </a>
    
    </>
  );
};
