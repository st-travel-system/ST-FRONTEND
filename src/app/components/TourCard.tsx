import { Badge } from "./ui/badge";
import { useState } from "react";

import { DOMAIN_FRONT } from "../../../env";

import { Eye, Link, ExternalLink, ArrowUpRight, Info, Search, Globe, CalendarDays } from "lucide-react";

interface TourCardProps {
  id_tour: number;
  title: string;
  location: string;
  price: number;
  currency: string;
  continente: string;
  duration: string;
  imageUrl: string;
  description: string;
  hoteles: string;
  descripciones: Descripcion[];
  isPopular?: boolean;
  cambio:number;
}


interface Descripcion {
  titulo: string;
  descripcion: string;
  descripcion_editada: string;
}

export const TourCard = ({ id_tour,title, location,continente, price,currency, duration, imageUrl, description,descripciones,hoteles, isPopular,cambio }: TourCardProps) => {

  const [sheetOpen, setSheetOpen] = useState(false);

  const descripcionFiltrada = descripciones?.find(desc => desc?.titulo === "El precio incluye") || { descripcion: "" };
  const hotelesFiltrados = descripciones?.find(hot => 
    hot?.titulo.toLowerCase() === "hoteles previstos" || 
    hot?.titulo.toLowerCase() === "hoteles previstos o similares"
  ) || { descripcion: "", descripcion_editada:""};

  const descripcionVA = descripciones?.find(desc => desc?.titulo === "Servicios Valor Añadido") || { descripcion: "" };

   // Limpiar y dividir la descripción en elementos individuales
   const items_precio_incluye = descripcionFiltrada.descripcion
   .replace(/<br\s*\/?>/gi, '\n')              // Reemplaza <br> o <BR> por saltos de línea
   .replace(/\r/g, '')                         // Elimina \r
   .split(/(?:^|\n)[\.\-]\s+/)                 // Divide por líneas que empiezan con . o - seguido de espacio
   .map(item => item.trim())                   // Limpia espacios
   .filter(item => item.length > 0);           // Elimina vacíos


     // Extraer ciudades que están dentro de <b>...</b> con RegExp
    // const ciudades = [...hotelesFiltrados.descripcion.matchAll(/<b>(.*?)<\/b>/gi)]
    // .map(match => match[1].replace(/<BR>/gi, '').trim()); // Elimina <BR> y espacios extra


    // CANTIDAD DE CIUDADES
    let hotelesArray = [];

     if (hoteles) {
       try {
         hotelesArray = JSON.parse(hoteles);
       } catch (error) {
         console.error("Error al parsear JSON:", error);
       }
     }
     
    const cantidad_ciudades = hotelesArray.length;

    const ciudades = hotelesArray.map(item => item.ciudad);
   
    
  
   // 1. Eliminar etiquetas <BR>, <b>, </b>, etc.
   const cleanText = descripcionVA.descripcion.replace(/<[^>]*>/g, '');
   
   // 2. Separar por saltos de línea o por puntos
   const arregloFinalVA = cleanText
     .split('\n')
     .flatMap(line => line.split('.')) // separar por puntos
     .map(item => item.trim())         // limpiar espacios
     .filter(item => item.length > 0); // eliminar vacíos


     var precio_tour = 0
   
     if(continente == "Europa"){
       precio_tour = Math.round(price * cambio);
     } else {
      precio_tour = price;
     }


  

  return (
    <>
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
              <p className="text-sm opacity-90 line-clamp-2">{description}</p>
            </div>
            <p className="text-sm opacity-90">{location}</p>
            <div className="flex justify-between items-center mt-2">
               <span className="text-lg font-semibold">Desde {currency}{precio_tour} USD</span>
              <span className="text-sm">{duration}</span>
            </div>
          </div>
        </div>
      </div>

      {sheetOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setSheetOpen(false)}></div>
      )}

      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 z-50 overflow-y-auto ${sheetOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ scrollbarWidth: 'thin', scrollbarColor: '#5B2C7C#e5e7eb' }}>
        <button className="absolute top-4 right-4 text-xl" onClick={() => setSheetOpen(false)}>×</button>
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3 className="text-3xl font-bold mb-3">{title} <a
            href={DOMAIN_FRONT + 'tour/' + id_tour}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline text-base font-semibold mb-4"
            title="Ver tour"
          >
            <ExternalLink className="w-5 h-5" />
            
          </a></h3> 
          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-2">
               <CalendarDays className="text-primary w-5 h-5" />
               <span className="text-sm">{duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="text-primary w-5 h-5" />
              <span className="text-sm">{cantidad_ciudades} {cantidad_ciudades > 1 ? 'ciudades': 'ciudad'}</span>
            </div>
          </div>
          <h4 className="text-lg font-semibold mb-2">Ciudades</h4>
          <ul className="list-disc list-inside text-gray-700 mb-4">
                {ciudades.length > 0 ? (
                    ciudades.map((ciudad, index) => <li key={index}>{ciudad}</li>)
                ) : (
                    <li>No hay ciudades disponibles</li>
                )}
          </ul>
          <h4 className="text-lg font-semibold mb-2">El precio incluye</h4>
          <ul className="list-disc list-inside text-gray-700 mb-6">
                {items_precio_incluye.map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                ))}
           </ul>
           {/* VALOR AÑADIDO */}
           {arregloFinalVA.length > 1 && (
             <>
               <h4 className="text-lg font-semibold mb-2">Valor añadido</h4>
               <ul className="list-disc list-inside text-gray-700 mb-6">
                     {arregloFinalVA.map((item, index) => (
                         <li key={index}>{item.trim()}</li>
                     ))}
                </ul>
             </>
           )}
        
        </div>
        <div className="text-center bg-primary py-6">
            <p className="text-xl font-bold text-white mb-2">Desde {currency}{precio_tour} USD</p>
            <a href={DOMAIN_FRONT+'tour/'+id_tour} className="inline-block bg-white text-primary rounded-lg py-2 px-6 font-semibold">Ver Tour Completo</a>
          </div>
      </div>
    </>
  );
};
