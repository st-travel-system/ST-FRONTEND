'use client';
import { useState, useMemo, useEffect } from "react";
import { TourCard } from "./TourCard";
import { HorizontalFilter } from "./HorizontalFilter";
import SearchBar from "./SearchBar";
import { DOMAIN_BACK } from "../../../env";

export interface Tour {
  title: string;
  location: string;
  cambio: number;
  price: number;
  duration: string;
  currency: string;
  continente: string;
  imageUrl: string;
  description: string;
  region?: string;
  hoteles: string;
  gallery?: string[];
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
  hoteles: string;
  foto_portada: string;
  fotos_galeria: string;
  descriptions: { titulo: string; descripcion: string; descripcion_editada: string  }[];
}

const convertTour = (tour: Tour_F) => {
  const fechaInicio = new Date(tour.fecha_inicio).getTime();
  const fechaFin = new Date(tour.fecha_fin).getTime();
  const duracionDias = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));

  const galleryArray = Array.isArray(tour.fotos_galeria) ? tour.fotos_galeria : JSON.parse(tour.fotos_galeria);
  const galleryUrls = galleryArray.map((foto) => `${DOMAIN_BACK}/static/fotos_galeria/${tour.id_tour}/${foto}`);

    // Lista de regiones europeas (puedes ajustarla según tu clasificación)
    const regionesEuropeas = ["GREC", "ALEM", "ITMI", "ITPA"];
  
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
    title: tour.nombre_tour,
    location: 'Asia',
    region: tour.nombre_categoria,
    price: tour.precio,
    currency: currency,
    continente: regionC,
    duration: `${duracionDias + 1} días`,
    imageUrl: galleryUrls[0] || "/default-image.jpg",
    description: `Descubre las maravillas de ${tour.nombre_categoria}, visitando China, Japón y Corea del Sur.`,
    gallery: galleryUrls,
    descripciones: tour.descriptions,
    hoteles: tour.hoteles
  };
};

export const FeaturedTours = ({ showFilter = true }: FeaturedToursProps) => {
  const [loading, setLoading] = useState(true);
  const [toursPublicados, setTours] = useState<Tour_F[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let retryCount = 0;
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      while (retryCount < 3) {
        try {
          const response = await fetch(`${DOMAIN_BACK}/obtener_tours_publicados`);
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


  return (
    <section>
      <SearchBar setSearchTerm={setSearchTerm} />
      {showFilter && (
        <div className="mb-4">
          <HorizontalFilter 
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays} 
            toursByRegion={toursByRegion}
          />
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
            {filteredTours.length > 0 ? (
              filteredTours.map((tour, index) => (
                <div key={tour.title}>
                  <TourCard {...tour} currency={tour.currency} cambio={cambio} isPopular={index === 0} />
                </div>
              ))
            ) : (
              <div className="text-center col-span-3">No se encontraron tours.</div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
