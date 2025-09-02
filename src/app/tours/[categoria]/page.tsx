'use client';
import { useState, useMemo, useEffect } from "react";


import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { TourCard } from "../../components/TourCard";
import { DOMAIN_BACK } from "../../../../env";


export interface Tour {
    title: string;
    location: string;
    price: number;
    currency: string;
    continente: string;
    duration: string;
    imageUrl: string;
    description: string;
    region?: string;
    gallery?: string[];
    descripciones?: { titulo: string; descripcion: string; descripcion_editada: string }[];
    hoteles: string;
  }
  
  interface FeaturedToursProps {
    showFilter?: boolean;
  }
  
  interface Tour_F {
    id_tour: number;
    fecha_inicio: string;
    fecha_fin: string;
    nombre_tour: string;
    nombre_categoria: string;
    titulo: string;
    tipo_tour: string;
    precio: number;
    foto_portada: string;
    fotos_galeria: string;
    foto_principal: string;
    descriptions: { titulo: string; descripcion: string;descripcion_editada: string }[];
    hoteles: string;
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
  
  const convertTour = (tour: Tour_F) => {
    const fechaInicio = new Date(tour.fecha_inicio).getTime();
    const fechaFin = new Date(tour.fecha_fin).getTime();
    const duracionDias = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
  
    const galleryArray = Array.isArray(tour.fotos_galeria) ? tour.fotos_galeria : JSON.parse(tour.fotos_galeria);
    // const galleryUrls = galleryArray.map((foto) => `${DOMAIN_BACK}/static/fotos_galeria/${tour.id_tour}/${foto}`);
   
   
    // Lista de regiones europeas (puedes ajustarla según tu clasificación)
    const regionesEuropeas = [
      "ITMI", "RCIU", "ITPA", "COMP", "RPAR", "RLON", "RRUS", "ITRO", "EXML", "RPOL", "CRES", "ALEM", "LOAP", "RSUZ"
    ];
    // Función para clasificar cada región
    const clasificarRegion = region => regionesEuropeas.includes(region) ? "Europa" : "Lejano";
  
    // DETERMINAR EL PRECIO SI ES EN DOLARES O EUROS
   
    const regionC = clasificarRegion(tour.tipo_tour);

    const limpio = regionC === "Europa" ? limpiarNombreTour(tour.nombre_tour) : limpiarNombreTourMedio(tour.nombre_tour);


    var currency = "$";
  
    if(regionC == "Europa"){
       currency = "$";
     
    } else {
       currency = "$";
    }



    return {
      id_tour: tour.id_tour,
      title: limpio,
      location: '',
      region: tour.tipo_tour,
      price: tour.precio,
      currency: currency,
      continente: regionC,
      duration: `${duracionDias + 1} días`,
      imageUrl: tour.foto_principal  || galleryArray[0].urlCompleta,
      description: tour.nombre_categoria,
      gallery: galleryArray,
      descripciones: tour.descriptions,
      hoteles: tour.hoteles,
    };
  };



export default function CategoriaTour({params}) {

   const categoria = params.categoria;


   const decodedCategory = decodeURIComponent(categoria).replace(/-/g, " ");


   console.log(decodedCategory);
   





   const [loading, setLoading] = useState(true);
   const [toursPublicados, setTours] = useState<Tour_F[]>([]);
   const [error, setError] = useState<string | null>(null);
   const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
   const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
   const [selectedDays, setSelectedDays] = useState<string | null>(null);
   const [searchTerm, setSearchTerm] = useState("");


   const [cambio, setCambio] = useState(0)
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
   
 

   useEffect(() => {
       let retryCount = 0;
       const fetchData = async () => {
         setLoading(true);
         setError(null);
   
         while (retryCount < 3) {
           try {
             const response = await fetch(`${DOMAIN_BACK}/obtener_tours_publicados_categoria/`+decodedCategory);
             if (!response.ok) throw new Error("Error en la respuesta del servidor");
             
             const data = await response.json();
             setTours(data.toursUnicos);
             setLoading(false);
             return; // Salir del bucle si la petición es exitosa
           } catch (error) {
             retryCount++;
             setLoading(false);
             console.error(`Intento ${retryCount}: Error al obtener tours`, error);
           }
         }
         setError("No se pudieron cargar los tours. Inténtelo más tarde.");
         setLoading(false);
       };
   
       fetchData();
     }, []);
   
     const convertedTours = useMemo(() => {
       return Array.isArray(toursPublicados) ? toursPublicados.map(convertTour) : [];
     }, [toursPublicados]);
   
     const toursByRegion = useMemo(() => {
       const counts: Record<string, number> = {};
       convertedTours.forEach(tour => {
         if (tour.region) {
           counts[tour.region] = (counts[tour.region] || 0) + 1;
         }
       });
       return counts;
     }, [convertedTours]);
   
     const regionCountries = {
       "medio-oriente": ["DUBA", "MOTU", "GREC", "LOAP"],
       "asia": ["CHIN"],
       "africa": ["JORD", "EGIP", "MARR"],
       "europa": ["ESP"],
     };
   
     const filteredTours = useMemo(() => {
       return convertedTours.filter((tour) => {
         if (selectedRegion) {
           const countriesInRegion = regionCountries[selectedRegion] || [];
           if (selectedCountries.length === 0) {
             if (!countriesInRegion.includes(tour.region)) return false;
           } else {
             if (!selectedCountries.some(country => countriesInRegion.includes(country))) return false;
           }
         }
         if (searchTerm) {
           const lowerCaseTitle = tour.title.toLowerCase();
           const lowerCaseDescription = tour.description.toLowerCase();
           if (!lowerCaseTitle.includes(searchTerm) && !lowerCaseDescription.includes(searchTerm)) {
             return false;
           }
         }
         return true;
       });
     }, [convertedTours, selectedRegion, selectedCountries, searchTerm]);

     
    const Loader = () => (
     <div className="flex justify-center items-center min-h-screen">
       <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-purple-500"></div>
     </div>
   );
   
   if (loading) {
     return <Loader />;
   }


    return (
    <>
     <Navbar setSearchTerm={setSearchTerm}/>
     <main className="min-h-screen mt-32 mb-10">
     <h2 className="text-center text-2xl font-bold mb-6 mt-10"> {decodedCategory ? decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1) : ""}</h2>
       <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.length > 0 ? (
              filteredTours.map((tour, index) => (
                <div key={tour.title}>
                   <TourCard {...tour} cambio={cambio} isPopular={index === 0} />
                </div>
              ))
            ) : (
              <div className="text-center col-span-3">No se encontraron tours.</div>
            )}
          </div>
        </div>
     </main>
     <Footer />
    </>
  )
}
