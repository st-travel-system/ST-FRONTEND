'use client';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import CustomItinerary from "./components/CustomItinerary";
import AgencyInfo from "./components/AgencyInfo";
import Footer from "./components/Footer";
import { FeaturedTours } from "./components/FeaturedTours";
import { TourCard } from "./components/TourCard";
import { HorizontalFilter } from "./components/HorizontalFilter";
import { DOMAIN_BACK } from "../../env";
import ReactPaginate from 'react-paginate';
import './styles/base.css'

export interface Tour {
  title: string;
  location: string;
  price: number;
  convertedPrice?: number;
  currency: string;
  continente: string;
  duration: string;
  imageUrl: string;
  description: string;
  region?: string;
  gallery?: string[];
  priorityValue: number;
  descripciones?: { titulo: string; descripcion: string; descripcion_editada: string }[];
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
  convertedPrice?: number;
  foto_portada: string;
  fotos_galeria: string;
  foto_principal: string;
  filtros: string;
  priorityValue: number;
  hoteles: string;
  descriptions: { titulo: string; descripcion: string; descripcion_editada: string }[];
}

const convertTour = (tour: Tour_F, cambio: number) => {
  const fechaInicio = new Date(tour.fecha_inicio).getTime();
  const fechaFin = new Date(tour.fecha_fin).getTime();
  const duracionDias = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));

  const galleryArray = Array.isArray(tour.fotos_galeria) ? tour.fotos_galeria : JSON.parse(tour.fotos_galeria);

  // const galleryUrls = galleryArray.map((foto) => `${DOMAIN_BACK}/static/fotos_galeria/${tour.id_tour}/${foto}`);

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

    // Lista de regiones europeas (puedes ajustarla según tu clasificación)
    const regionesEuropeas = [
      "ITMI", "RCIU", "ITPA", "COMP", "RPAR", "RLON", "RRUS", "ITRO", "EXML", "RPOL", "CRES", "ALEM", "LOAP", "RSUZ"
    ];
      
  // Función para clasificar cada región
  const clasificarRegion = region => regionesEuropeas.includes(region) ? "Europa" : "Lejano";

  // DETERMINAR EL PRECIO SI ES EN DOLARES O EUROS
 
  const regionC = clasificarRegion(tour.tipo_tour);

  var currency = "$";

  if(regionC == "Europa"){
     currency = "$";
   
  } else {
     currency = "$";
  }
  

  return {
    id_tour: tour.id_tour,
    title: regionC === "Europa" ? limpiarNombreTour(tour.nombre_tour) : limpiarNombreTourMedio(tour.nombre_tour),
    location: '',
    region: tour.tipo_tour,
    price: tour.precio,
    convertedPrice: regionC === "Europa" ? Math.round(tour.precio * cambio) : tour.precio,
    currency: currency,
    continente: regionC,
    duration: `${duracionDias + 1} días`,
    imageUrl: tour.foto_principal  || galleryArray[0].urlCompleta,
    description: tour.nombre_categoria,
    gallery: galleryArray,
    filtros: tour.filtros,
    priorityValue:0,
    hoteles: tour.hoteles,
    descripciones: tour.descriptions,
  };
};

const normalizeText = (text: string): string => {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export default function Home() {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [showFilter, setShowFilter] = useState(true);
  const [loading, setLoading] = useState(true);
  const [toursPublicados, setTours] = useState<Tour_F[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const redirectSearch = localStorage.getItem("redirectSearch");
      if (redirectSearch) {
        handleClearFilters(); // Limpia los filtros antes de aplicar el searchTerm
        setSearchTerm(redirectSearch);
        localStorage.removeItem("redirectSearch");
      }
    }
  }, [isClient]);

    
  // console.log(exchangeRate);
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



  
  
  // Función para limpiar los filtros
  const handleClearFilters = () => {
    setSelectedRegion(null);  // Limpiar el filtro de región
    setSelectedCountries([]); // Limpiar los países seleccionados
    setSelectedDays(null);    // Limpiar el filtro de días
    setSearchTerm("");       // Limpiar también el término de búsqueda
  };

  useEffect(() => {
    let retryCount = 0;
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      while (retryCount < 3) {
        try {
          const response = await fetch(`${DOMAIN_BACK}/obtener_tours_publicados/1/1`);
          if (!response.ok) throw new Error("Error en la respuesta del servidor");
          
          const data = await response.json();
          setTours(data.toursUnicos);
          setLoading(false);
          return; // Salir del bucle si la petición es exitosa
        } catch (error) {
          retryCount++;
          console.error(`Intento ${retryCount}: Error al obtener tours`, error);
        }
      }
      setError("No se pudieron cargar los tours. Inténtelo más tarde.");
      setLoading(false);
    };

    fetchData();
  }, []);

  const convertedTours = useMemo(() => {
    return Array.isArray(toursPublicados) ? toursPublicados.map(tour => convertTour(tour, cambio)) : [];
  }, [toursPublicados, cambio]);

  const toursByRegion = useMemo(() => {
    const counts: Record<string, number> = {};
    convertedTours.forEach(tour => {
      if (tour.region) {
        counts[tour.region] = (counts[tour.region] || 0) + 1;
      }
    });
    return counts;
  }, [convertedTours]);

  // const regionCountries = {
  //   "medio-oriente": ["DUBA", "MOTU", "GREC", "LOAP"],
  //   "asia": ["CHIN"],
  //   "africa": ["JORD", "EGIP", "MARR"],
  //   "europa": ["ESP"],
  // };


  const filteredTours = useMemo(() => {
    return convertedTours
      .filter((tour) => {
        const tourFilters = (tour.filtros || "")
              .split(',')
              .map(filter => filter.trim().toLowerCase());

        const prioridad = tourFilters.find(item => !isNaN(Number(item)));
        const priorityValue = prioridad ? Number(prioridad) : Infinity;
  
        if (selectedRegion && !tourFilters.includes(selectedRegion.toLowerCase())) {
          return false;
        }
  
        if (selectedCountries.length > 0) {
          const hasSelectedFilter = selectedCountries.some(
            (filter) => tourFilters.includes(filter.toLowerCase())
          );
          if (!hasSelectedFilter) {
            return false;
          }
        }
  
        if (searchTerm) {
          const normalizedSearchTerm = normalizeText(searchTerm);
          const normalizedTitle = normalizeText(tour.title);
          const normalizedDescription = normalizeText(tour.description);
  
          const searchInFilters = tourFilters.some(filter => normalizeText(filter).includes(normalizedSearchTerm));
  
          if (
            !normalizedTitle.includes(normalizedSearchTerm) &&
            !normalizedDescription.includes(normalizedSearchTerm) &&
            !searchInFilters
          ) {
            return false;
          }
        }
  
        tour.priorityValue = priorityValue;
        // Agregar precio convertido
        tour.convertedPrice = tour.continente === "Europa" 
          ? Math.round(tour.price * cambio) 
          : tour.price;
  
        return true;
      })
      .sort((a, b) => {
        if (searchTerm) {
          const normalizedSearchTerm = normalizeText(searchTerm);
          const normalizedTitleA = normalizeText(a.title);
          const normalizedTitleB = normalizeText(b.title);

          let scoreA = 0;
          if (normalizedTitleA === normalizedSearchTerm) scoreA = 3;
          else if (normalizedTitleA.startsWith(normalizedSearchTerm)) scoreA = 2;
          else if (normalizedTitleA.includes(normalizedSearchTerm)) scoreA = 1;

          let scoreB = 0;
          if (normalizedTitleB === normalizedSearchTerm) scoreB = 3;
          else if (normalizedTitleB.startsWith(normalizedSearchTerm)) scoreB = 2;
          else if (normalizedTitleB.includes(normalizedSearchTerm)) scoreB = 1;

          if (scoreA !== scoreB) {
            return scoreB - scoreA; // Prioritize higher score
          }
          // If scores are equal, sort alphabetically by title
          return normalizedTitleA.localeCompare(normalizedTitleB);
        } else {
          // Original sort logic when no searchTerm
          if (a.priorityValue < b.priorityValue) return -1;
          if (a.priorityValue > b.priorityValue) return 1;
    
          // Usar precio convertido para el ordenamiento
          if (a.convertedPrice < b.convertedPrice) return -1;
          if (a.convertedPrice > b.convertedPrice) return 1;
    
          return 0;
        }
      });
  }, [convertedTours, selectedRegion, selectedCountries, searchTerm, cambio]);
  

  // const regiones = filteredTours.map(tour => tour.region);

  const [currentPage, setCurrentPage] = useState(0);
  const [toursPerPage, setToursPerPage] = useState(24);  // Default to 24 for larger screens

  // Resetear paginación cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedRegion, selectedCountries, selectedDays, searchTerm]);

// Manejar el cambio de página
const handlePageChange = (selectedPage) => {
  setCurrentPage(selectedPage.selected);
};

// Calcular los tours a mostrar según la página actual
const indexOfLastTour = (currentPage + 1) * toursPerPage;
const indexOfFirstTour = indexOfLastTour - toursPerPage;
const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);

useEffect(() => {
  if (isClient) {
    // Cambiar el número de tours por página según el tamaño de la pantalla
    if (window.innerWidth < 768) {
      setToursPerPage(12); // 12 tours para pantallas pequeñas
    } else {
      setToursPerPage(24); // 24 tours para pantallas grandes
    }

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setToursPerPage(12);
      } else {
        setToursPerPage(24);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }
}, [isClient]);



  return (
    <>
     <Navbar setSearchTerm={setSearchTerm}/>
     <main className="min-h-screen mt-60">
      <section>
           {/* <SearchBar setSearchTerm={setSearchTerm} /> */}
           {showFilter && (
             <div className="mb-4 mt-16">
               <HorizontalFilter 
                 selectedRegion={selectedRegion}
                 setSelectedRegion={setSelectedRegion}
                 selectedCountries={selectedCountries}
                 setSelectedCountries={setSelectedCountries}
                 selectedDays={selectedDays}
                 setSelectedDays={setSelectedDays} 
                 toursByRegion={toursByRegion}
               />
               {(selectedRegion != null || selectedCountries.length > 0 || selectedDays != null || searchTerm) && (
                 <div className="flex justify-center mt-4">
                   <button
                     onClick={handleClearFilters}
                     className="px-6 py-1 mb-4 -mt-4 bg-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-400 transition"
                   >
                     x Limpiar filtros
                   </button>
                 </div>
               )}
             </div>
           )}
     
           {loading ? (
             <div className="flex justify-center items-center h-64">
               <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
             </div>
           ) : error ? (
             <div className="text-center text-red-500">{error}</div>
           ) : (
             <div className="container">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {currentTours.length > 0 ? (
                   currentTours.map((tour, index) => (
                      <div key={tour.title}>
                        <TourCard {...tour} cambio={cambio} isPopular={index === 0} />
                      </div>
                    ))
                  ) : (
                    <div className="text-center col-span-3">No se encontraron tours.</div>
                  )}
               </div>
                 {/* Paginación */}
                 <div className="flex justify-center mt-8">
                  {isClient && (
                   <ReactPaginate
                     pageCount={Math.ceil(filteredTours.length / toursPerPage)}  // Total de páginas
                     onPageChange={handlePageChange}  // Cambiar de página
                     forcePage={currentPage} // <-- controla la página seleccionada
                     containerClassName="pagination"  // Clase para la paginación
                     pageClassName="page-item"  // Clase para cada página
                     pageLinkClassName="page-link"  // Clase del enlace de la página
                     activeClassName="active"  // Clase activa de la página
                     previousLabel="‹"  // Etiqueta para el botón anterior
                     nextLabel="›"  // Etiqueta para el botón siguiente
                     breakLabel="..."  // Etiqueta para el salto de páginas
                     marginPagesDisplayed={2}  // Páginas que se muestran a los lados
                     pageRangeDisplayed={5}  // Rango de páginas que se muestran
                   />
                  )}
                 </div>
             </div>
           )}
         </section>
      </main>
     <CustomItinerary />
     <AgencyInfo />
     <Footer />
    </>
  )
}
