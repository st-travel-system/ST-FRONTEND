'use client';
import { useState, useMemo,useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../components/ui/breadcrumb";
// import { a } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../components/ui/carousel";
import { CalendarDays, Globe, Hotel, MapPin,MoveRight, Star, Users } from "lucide-react";
import { RecommendedTours } from "../../components/RecommendedTours";
import { useIsMobile } from "../../hooks/use-mobile";
import { MobileBottomBar } from "../../components/MobileBottomBar";
import { TourItinerary } from "../../components/TourItinerary";
import { TourPricing } from "../../components/TourPricing";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { TourCategoryBadge } from "../../components/TourCategoryBadge";
import Footer from "../../components/Footer";
import {DOMAIN_FRONT,DOMAIN_BACK}  from "../../../../env";

const Tour = ({params}) => {

  interface Tour {
    nombre_tour: string;
    nombre_categoria: string;
    precio: number;
    fecha_inicio: string;
    fecha_fin: string;
    id_tour: string;
    tipo_tour: string;
    decripcion_tour: string;
    fotos_galeria: string[] | string;
    descripciones: string[] | string;
    itinerarios: string[] | string;
    fechas_inicio: string[];
  }
  
  const [isLoading, setIsLoading] = useState(true);
  const id_tour = params.id;
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [tour, setTour] = useState<Tour | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  // Available departure dates for 2025
  const availableDates = [
    "2025-05-02", "2025-05-16", "2025-05-30",
    "2025-06-13", "2025-06-27",
    "2025-07-11", "2025-07-25",
    "2025-08-08", "2025-08-22",
    "2025-09-05", "2025-09-19", "2025-09-26"
  ];

  const firstAvailableDate = new Date(availableDates[0]);
  const defaultMonth = firstAvailableDate;
  const uniqueMonths = [...new Set(availableDates.map(date => new Date(date).getMonth()))];
  const months = uniqueMonths.map(month => new Date(2025, month, 1));

  const calendarProps = {
    mode: "single" as const,
    selected: date,
    onSelect: setDate,
    defaultMonth: defaultMonth,
    modifiers: {
      available: (date: Date) => availableDates.includes(date.toISOString().split('T')[0])
    },
    modifiersStyles: {
      available: {
        backgroundColor: '#2d0a44',
        color: 'white'
      }
    },
    disabled: (date: Date) => {
      return !availableDates.includes(date.toISOString().split('T')[0]);
    }
  };


  
const [descripcion_tour, setDescripcionTour] = useState("");
const [searchTerm, setSearchTerm] = useState("");
const [duracion, setDuracion] = useState(0)
const [ciudades, setCiudades] = useState(0)
const [galleryUrls, setGalleryUrls] = useState([])
const [hotelesFiltrados, setHotelesFiltrados] = useState(null);
const [hoteles, setHoteles] = useState([]);
const [descripcionFiltrada, setDescripciones] = useState([]);
const [items_precio_incluye, setItems_precio_incluye] = useState([]);
const [itinerarios, setItinerarios] = useState([]);
const [valorAñadido, setValorAñadido] = useState([]);
const [identificador, setIdentificador] = useState('');
const [cambio, setCambio] = useState(0);

function parseHoteles(descripcion) {
  // Normalizar los saltos de línea reemplazando <BR> por \n y eliminando \r
  const lineas = descripcion
      .replace(/\r/g, '') // Eliminar \r para un manejo uniforme
      .replace(/<BR>/g, '\n') // Reemplazar <BR> por saltos de línea
      .split('\n') // Dividir en líneas
      .map(line => line.trim()) // Eliminar espacios en blanco extra
      .filter(line => line); // Filtrar líneas vacías

  let ciudad = '';
  const hoteles = [];

  for (const linea of lineas) {
      if (linea.startsWith('<b>') && linea.includes('</b>')) {
          // Extraer la ciudad eliminando las etiquetas <b>
          ciudad = linea.replace(/<\/?b>/g, '').trim();
          hoteles.push({ ciudad, opciones: [] });
      } else {
          // Extraer nombre del hotel y estrellas
          const match = linea.match(/(.*?)\s*(\d\*)?$/);
          if (match) {
              const nombre = match[1].trim();
              const estrellas = match[2] ? parseInt(match[2]) : null; // Extraer el número de estrellas

              if (hoteles.length > 0) {
                  hoteles[hoteles.length - 1].opciones.push({ nombre, estrellas });
              }
          }
      }
  }

  return hoteles;
}

function limpiarNombreTourMedio(nombre) {
  const partes = nombre.split('-');
  // const resultado = nombre.substring(nombre.indexOf('-') + 1);
  // if (partes.length === 1) {
  //   return nombre.trim(); // No hay guion
  // } else if (partes.length === 2) {
    // return resultado; // Solo un guion
  // } else {
  //   // Más de un guion, tomamos lo que está entre el primero y el segundo
    return partes[1].trim();
  // }
}

function limpiarNombreTour(nombre) {
  // Divide por guion
  const partes = nombre.split('-');
  if (partes.length <= 1) return nombre.trim();
  // Une todo menos la primera parte, y quita espacios extra
  return partes.slice(1).join('-').trim();
}




  useEffect(() => {
    const fetchData = async () => {
        try {
            const setsResponse = await fetch(`${DOMAIN_BACK}/obtener_tour_publicado/${id_tour}`);
            const setTourP = await setsResponse.json();
            if (setTourP.tourUnico && setTourP.tourUnico.length > 0) {
              setTour(setTourP.tourUnico[0]); // Asegurar que siempre sea un objeto
            }

            const fechaInicio = new Date(setTourP.tourUnico[0].fecha_inicio).getTime();
            const fechaFin = new Date(setTourP.tourUnico[0].fecha_fin).getTime();
            const duracionDias = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
            setDuracion(duracionDias + 1);
          
            // Generar las URLs de la galería
            const galleryArray = Array.isArray(setTourP.tourUnico[0].fotos_galeria) ? setTourP.tourUnico[0].fotos_galeria : JSON.parse(setTourP.tourUnico[0].fotos_galeria);
            // const galleryUrls = galleryArray.map((foto) => `${DOMAIN_BACK}/static/fotos_galeria/${setTourP.tourUnico[0].id_tour}/${foto}`);
            setGalleryUrls(galleryArray);

            // HOTELES

            // const hotelesFiltrados = setTourP.tourUnico[0]?.descriptions?.find(hot => hot?.titulo === "Hoteles previstos o similares") || { descripcion: "" };
               const hotelesFiltrados = setTourP.tourUnico[0]?.descriptions?.find(hot => 
                 hot?.titulo.toLowerCase() === "hoteles previstos" || 
                 hot?.titulo.toLowerCase() === "hoteles previstos o similares"
               ) || { descripcion: "",descripcion_editada:""};

               let hotelesArray = [];

               if (setTourP.tourUnico[0]?.hoteles) {
                 try {
                   hotelesArray = JSON.parse(setTourP.tourUnico[0]?.hoteles);
                 } catch (error) {
                   console.error("Error al parsear JSON:", error);
                 }
               }
            
               setHoteles(hotelesArray);

             // DESCRIPCIONES
            
               const descripcionFiltrada = setTourP.tourUnico[0]?.descriptions?.find(desc => desc?.titulo === "El precio incluye") || { descripcion: "" };
               setDescripciones(descripcionFiltrada);
  

              // Limpiar y dividir la descripción en elementos individuales
              
               const items_precio_incluye = descripcionFiltrada.descripcion
               .replace(/<br\s*\/?>/gi, '\n')              // Reemplaza <br> o <BR> por saltos de línea
               .replace(/\r/g, '')                         // Elimina \r
               .split(/(?:^|\n)[\.\-]\s+/)                 // Divide por líneas que empiezan con . o - seguido de espacio
               .map(item => item.trim())                   // Limpia espacios
               .filter(item => item.length > 0);           // Elimina vacíos
            


              //  VA 
              const descripcionVA = setTourP.tourUnico[0]?.descriptions.find(desc => desc?.titulo === "Servicios Valor Añadido") || { descripcion: "" };

               // 1. Eliminar etiquetas <BR>, <b>, </b>, etc.
              const cleanText = descripcionVA.descripcion.replace(/<[^>]*>/g, '');
              
              // 2. Separar por saltos de línea o por puntos
              const arregloFinalVA = cleanText
                .split('\n')
                .flatMap(line => line.split('.')) // separar por puntos
                .map(item => item.trim())         // limpiar espacios
                .filter(item => item.length > 0); // eliminar vacíos
           
               setValorAñadido(arregloFinalVA);
              
                 // Extraer ciudades que están dentro de <b>...</b> con RegExp
                const ciudades = [...hotelesFiltrados.descripcion.matchAll(/<b>(.*?)<\/b>/gi)]
                .map(match => match[1].replace(/<BR>/gi, '').trim()); // Elimina <BR> y espacios extra
              
                setItems_precio_incluye(items_precio_incluye);

                 // CANTIDAD DE CIUDADES
     
                 const cantidad_ciudades = hotelesArray.length;

                 setCiudades(cantidad_ciudades);


                //  ITINERARIOS

                setItinerarios(setTourP.tourUnico[0].itineraries);

                setIdentificador(setTourP.tourUnico[0].identificador)

                // DESCRIPCION TOUR

                setDescripcionTour(setTourP.tourUnico[0].Descripciones_tours);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            // setLoading(false);
            setIsLoading(false); 
        }
    };
  
    fetchData();
  }, [id_tour]);

  interface NavbarProps {
    activeFilter?: string;
    onFilterChange?: () => void;
  }



  
function parseHotels(input) {
  const lines = input.split("<BR>");
  const hotelsByCity = [];
  let currentCity = "";

  lines.forEach(line => {
      line = line.replace(/<\/?b>/g, "").trim(); // Eliminar etiquetas <b>

      if (line) {
          if (hotelsByCity.length === 0 || hotelsByCity[hotelsByCity.length - 1].hoteles.length > 0) {
              // Si la última ciudad ya tiene hoteles, se trata de una nueva ciudad
              currentCity = line;
              hotelsByCity.push({ ciudad: currentCity, hoteles: [] });
          } else {
              // Si no es una ciudad, se agregan los hoteles a la última ciudad detectada
              const hoteles = line.split(" / ").map(hotel => hotel.trim());
              hotelsByCity[hotelsByCity.length - 1].hoteles.push(...hoteles);
          }
      }
  });

  return hotelsByCity;
}



const [categorias_tour, SetCategoriasTour] = useState([]);


useEffect(() => {
  const fetchData = async () => {
      try {
          const setsResponse = await fetch(`${DOMAIN_BACK}/obtener_categorias_precios_tours/${identificador}`);
          const setTourP = await setsResponse.json();
          if (setTourP.categoriasPrecios && setTourP.categoriasPrecios.length > 0) {
            SetCategoriasTour(setTourP.categoriasPrecios); // Asegurar que siempre sea un objeto
          }

      } catch (error) {
          console.error('Error fetching data:', error);
      } finally {
          // setLoading(false);
      }
  };

  fetchData();
}, [identificador]);




useEffect(() => {
  let retryCount = 0;
  const fetchDataCambio = async () => {
 
 
    while (retryCount < 3) {
      try {
        const response = await fetch(`${DOMAIN_BACK}/obtener_conversion`);
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        
        const data = await response.json();
        setCambio(data.conversion);
        return; // Salir del bucle si la petición es exitosa
      } catch (error) {
        retryCount++;
        console.error(`Intento ${retryCount}: Error al obtener conversion`, error);
      }
    }
   
    };

  fetchDataCambio();
}, []);



const obtenerDescripcionCategoria = (nombre_tour) => {
  const partes = nombre_tour.split('-');
  return partes.length > 1 ? partes[partes.length - 1].trim() : nombre_tour; // Devuelve solo la parte después del último guion
};






 // Estado para almacenar el índice del tour seleccionado
 const [selectedIndex, setSelectedIndex] = useState(0); // El primer tour es seleccionado por defecto

 // Función para manejar la selección
 const handleSelect = (index) => {
   setSelectedIndex(index);
   var hotelesArray = [];
   // Aquí puedes ejecutar cualquier otra función que desees al seleccionar un tour
   console.log("Tour seleccionado:", categorias_tour[index].hoteles);
   if (categorias_tour[index].hoteles) {
    try {
      hotelesArray = JSON.parse(categorias_tour[index].hoteles);
    } catch (error) {
      console.error("Error al parsear JSON:", error);
    }
  }
  setHoteles(hotelesArray);
 };
 

 console.log(hoteles);
 

 const Loader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-[#2d0a44]"></div>
  </div>
);

if (isLoading) {
  return <Loader />;
}



// CALCULAR PRECIO


  const regionesEuropeas = [
    "ITMI", "RCIU", "ITPA", "COMP", "RPAR", "RLON", "RRUS", "ITRO", "EXML", "RPOL", "CRES", "ALEM", "LOAP", "RSUZ"
  ];
 // Función para clasificar cada región
 const clasificarRegion = region => regionesEuropeas.includes(region) ? "Europa" : "Lejano";

 // DETERMINAR EL PRECIO SI ES EN DOLARES O EUROS

 const region = clasificarRegion(tour?.tipo_tour);

 const nombre_limpio = region === "Europa" ? limpiarNombreTour(tour?.nombre_tour) : limpiarNombreTourMedio(tour?.nombre_tour);

 




 var currency = "$";
 var precio_tour = 0

 if(region == "Europa"){
    currency = "$";
    precio_tour = Math.round(tour?.precio * cambio);
 } else {
    currency = "$";
    precio_tour = tour?.precio;
 }

 


  return (
    <div className="min-h-screen bg-white">
      <Navbar setSearchTerm={setSearchTerm}/>
      <div className="pt-24">
        <div className="bg-accent py-4">
          <div className="container">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <a href="/" className="transition-colors hover:text-foreground">Inicio</a>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <a href="/" className="transition-colors hover:text-foreground">Tours</a>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{tour?.nombre_categoria}</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{limpiarNombreTour(tour?.nombre_tour)}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div className="container py-8">
          {/* Título y Precio Destacado */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-outfit font-bold mb-2">
                {nombre_limpio || ""}
              </h1>
              {isClient && isMobile && (
                <div className="mt-2">
                  <TourCategoryBadge category={tour?.nombre_categoria} />
                </div>
              )}
            </div>
            <div className="text-right hidden md:block">
              <p className="text-sm text-gray-600 mb-1">Desde</p>
              <p className="text-4xl font-outfit font-bold text-primary">{currency}{precio_tour} USD</p>
              <p className="text-sm text-gray-600">por persona</p>
            </div>
          </div>

          {/* Carrusel de Imágenes */}
          <div className="mb-12">
            <Carousel 
              className="w-full"
              opts={{
                align: "start",
                loop: true,
                skipSnaps: false,
                startIndex: 0,
                duration: 20,
                watchDrag: true,
                autoplay: true,
                delay: 5000,
            
              }}
            >
              <CarouselContent>
                {galleryUrls.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-[16/9]">
                      <img
                        src={img.urlCompleta}
                        alt={`Tour imagen ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Grid de Contenido Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna Izquierda: Características y Descripción */}
            <div className="lg:col-span-2 space-y-8">
              {/* Características */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 bg-accent p-4 rounded-lg">
                  <CalendarDays className="text-primary w-5 h-5" />
                  <span>{duracion} días</span>
                </div>
                <div className="flex items-center gap-3 bg-accent p-4 rounded-lg">
                  <MapPin className="text-primary w-5 h-5" />
                  <span>{ciudades} {ciudades > 1 ? 'ciudades': 'ciudad'}</span>
                </div>
                <div className="flex items-center gap-3 bg-accent p-4 rounded-lg">
                  <Globe className="text-primary w-5 h-5" />
                  <span>Guía en Español</span>
                </div>
                <div className="flex items-center gap-3 bg-accent p-4 rounded-lg">
                  <Hotel className="text-primary w-5 h-5" />
                  <span>Hoteles 4★ y 5★</span>
                </div>
              </div>

              {/* Descripción */}
              <div>
                <h2 className="text-2xl font-outfit font-semibold mb-4">Descripción del Tour</h2>
                <p className="text-gray-600 leading-relaxed">
                  {descripcion_tour}
                </p>
              </div>

              {/* Itinerario con el nuevo componente */}
              <TourItinerary itinerario={itinerarios} />

           {/* Sección personalizada de viaje */}
             <div className="relative mt-8 w-full max-w-4xl mx-auto">
               <div
                 className="relative rounded-lg overflow-hidden flex items-center justify-between p-6 md:p-10"
                 style={{
                   backgroundImage: "url('/seccion_personalizada.png')",
                   backgroundSize: "cover",
                   backgroundPosition: "center",
                 }}
               >
                 {/* Fondo oscuro para mejorar la legibilidad */}
                 <div className="absolute inset-0 bg-black bg-opacity-40"></div>
             
                 {/* Contenido del texto */}
                 <div className="relative z-10 text-white max-w-md">
                   <h2 className="text-2xl md:text-3xl font-semibold">¿Quieres un viaje a la medida?</h2>
                   <p className="mt-2 text-xs md:text-base">
                     Creamos itinerarios personalizados que se adaptan perfectamente a tu estilo, tiempo y preferencias.
                   </p>
                 </div>
             
                 {/* Flecha al lado derecho */}
                 <div className="relative z-10">
                   <a href={DOMAIN_FRONT+'itinerario-medida'}>
                    <MoveRight size={32} color="white" />
                   </a>
                 </div>
               </div>
              </div>

              {/* Precio Incluye */}
              <div>
                <h2 className="text-2xl font-outfit font-semibold mb-4">El Precio Incluye</h2>
                <ul className="space-y-2">
                  {items_precio_incluye.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="min-w-4 mt-1">•</div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* VALOR AÑADIDO */}
              {valorAñadido.length > 1 && (
               <>
                 <h2 className="text-lg font-semibold mb-2">Valor añadido</h2>
                 <ul className="list-disc list-inside text-gray-700 mb-6">
                       {valorAñadido.map((item, index) => (
                           <li key={index}>{item.trim()}</li>
                       ))}
                  </ul>
               </>
             )}

              {/* Hoteles */}
              <div>
                <h2 className="text-2xl font-outfit font-semibold mb-4">Hoteles por Ciudad</h2>

                <div className="flex space-x-4">
                  {categorias_tour.map((categoria, index) => (
                     <div
                     key={index}
                     className={`p-4 rounded-lg flex-1 cursor-pointer ${
                       selectedIndex === index
                         ? "bg-[rgb(45,10,68)] text-white" // Color cuando está seleccionado
                         : "bg-gray-200 text-black" // Color por defecto
                     }`}
                     onClick={() => handleSelect(index)} // Ejecutar función al hacer click
                   >
                     <h3 className="text-lg font-semibold">
                       {obtenerDescripcionCategoria(categoria.nombre_tour)}
                     </h3>
                     <p className="text-sm">
                       Desde {currency}{region != "Europa" ? categoria.precio : Math.round(categoria.precio * cambio)} USD
                     </p>
                   </div>
                   ))}
                </div>


                <div className="overflow-x-auto mt-5">
                <Table>
                   <TableHeader>
                     <TableRow>
                       <TableHead>Ciudad</TableHead>
                       <TableHead>Hotel</TableHead>
                       <TableHead>Categoría</TableHead>
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     {hoteles.map((ciudad) =>
                       ciudad.hoteles.map((hotel, index) => (
                         <TableRow key={`${ciudad.ciudad}-${index}`}>
                           {index === 0 && (
                             <TableCell rowSpan={ciudad.hoteles.length} className="font-medium">
                               {ciudad.ciudad}
                             </TableCell>
                           )}
                           <TableCell>{hotel.hotel}</TableCell>
                           <TableCell>
                             <div className="flex items-center gap-1">
                               {[...Array(hotel.stars)].map((_, i) => (
                                 <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                               ))}
                             </div>
                           </TableCell>
                         </TableRow>
                       ))
                     )}
                   </TableBody>
                 </Table>

                </div>
              </div>
            </div>

            {/* Columna Derecha: Reserva - Solo visible en desktop */}
            {isClient && !isMobile && (
              <div className="lg:col-span-1">
                <TourPricing 
                  currency={currency}
                  price={precio_tour}
                  categoria={tour?.nombre_categoria}
                  nombre_tour={tour?.nombre_tour}
                  fechas_inicio={tour?.fechas_inicio}
                  availableDates={availableDates}
                  firstAvailableDate={firstAvailableDate}
                  months={months}
                  calendarProps={calendarProps}
                  buttonText="Reserva con un asesor"
                />
              </div>
            )}
          </div>
        </div>

        {/* Recommended Tours Section */}
        <RecommendedTours tipo_tour={tour.tipo_tour} currency={currency} cambio={cambio} />

        {/* Mobile Bottom Bar */}
        {isClient && isMobile && <MobileBottomBar 
         availableDates={availableDates}
         currency={currency}
         price={precio_tour}
         categoria={tour?.nombre_categoria}
         nombre_tour={tour?.nombre_tour}
         fechas_inicio={tour?.fechas_inicio}
         firstAvailableDate={firstAvailableDate}
         months={months}
         calendarProps={calendarProps}
         buttonText="Reserva con un asesor"
        />}
      </div>
    </div>
  );
};

export default Tour;