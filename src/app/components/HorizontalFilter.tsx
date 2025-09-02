import { useState, useMemo } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importing React Icons for arrows
import { FilterItem } from "./FilterItem";
import { Separator } from "../components/ui/separator";
import { CountryList } from "./CountryList";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/base.css'


interface Region {
  id: string;
  name: string;
  iconUrl?: string;
}

interface HorizontalFilterProps {
  selectedRegion: string | null;
  setSelectedRegion: (region: string | null) => void;
  selectedDays: string | null;
  setSelectedDays: (days: string | null) => void;
  selectedCountries: string[];
  setSelectedCountries: (countries: string[]) => void;
  toursByRegion: Record<string, number>;
}

const regions: Region[] = [
  { id: "europa", name: "Europa", iconUrl: "/filtros/europa.png" },
  { id: "medio-oriente", name: "Medio Oriente", iconUrl: "/filtros/medio_oriente.png" },
  { id: "paris", name: "Paris", iconUrl: "/filtros/paris.png" },
  { id: "italia", name: "Italia", iconUrl: "/filtros/italia.png" },
   { id: "suiza", name: "Suiza", iconUrl: "/filtros/suiza.png" },
  { id: "mas_solicitados", name: "Más Solicitados", iconUrl: "/filtros/mas_solicitados.png" },
  { id: "tendencia", name: "Tendencia 2025", iconUrl: "/filtros/tendencia.png" },
  { id: "londres", name: "Londres", iconUrl: "/filtros/londres.png" },
  { id: "madrid", name: "Madrid", iconUrl: "/filtros/madrid.png" },
  { id: "amsterdam", name: "Amsterdam", iconUrl: "/filtros/amsterdam.png" },
  { id: "ciudades_imperiales", name: "Ciudades Imperiales", iconUrl: "/filtros/ciudades_imperiales.png" },
  { id: "noruega", name: "Noruega", iconUrl: "/filtros/noruega.png" },
  { id: "finlandia", name: "Finlandia", iconUrl: "/filtros/finlandia.png" },
  { id: "asia", name: "Asia", iconUrl: "/filtros/asia.png" },
  { id: "africa", name: "África", iconUrl: "/filtros/africa.png" },
  { id: "nordicos", name: "Nórdicos", iconUrl: "/filtros/nordicos.png" },
  { id: "belgica", name: "Bélgica", iconUrl: "/filtros/belgica.png" },
  //{ id: "praga", name: "Praga", iconUrl: "/filtros/praga.png" },
  { id: "croacia", name: "Croacia", iconUrl: "/filtros/croacia.png" },
  { id: "balcanes", name: "Los Balcanes", iconUrl: "/filtros/balcanes.png" },
  { id: "gran_bretaña", name: "Gran Bretaña", iconUrl: "/filtros/gran_bretaña.png" },
  // { id: "escocia", name: "Escocia", iconUrl: "/filtros/escocia.png" },
  { id: "grecia", name: "Grecia", iconUrl: "/filtros/grecia.png" },
  { id: "egipto", name: "Egipto", iconUrl: "/filtros/egipto.png" },
  { id: "marruecos", name: "Marruecos", iconUrl: "/filtros/marruecos.png" },
  { id: "dubai", name: "Dubai", iconUrl: "/filtros/dubai.png" },
  { id: "turquia", name: "Turquía", iconUrl: "/filtros/turquia.png" },
  // { id: "exoticos", name: "Destinos Exóticos", iconUrl: "/filtros/exoticos.png" },
  //{ id: "auroras", name: "Auroras Boreales", iconUrl: "/filtros/auroras.png" },
  { id: "safaris", name: "Safaris", iconUrl: "/filtros/safaris.png" },
  { id: "desierto", name: "Experiencias desierto", iconUrl: "/filtros/experiencias_desierto.png" },
  { id: "playas", name: "Playas", iconUrl: "/filtros/playas.png" },
  //{ id: "navidad", name: "Tendencias Navidad", iconUrl: "/filtros/experiencias_navideñas.png" },
  { id: "arte", name: "Arte y Cultura", iconUrl: "/filtros/arte_cultura.png" },
  { id: "camino", name: "Camino Santiago", iconUrl: "/filtros/camino_santiago.png" },
  //{ id: "nuevo", name: "Lo Nuevo", iconUrl: "/filtros/nuevo.png" },
  //{ id: "medievales", name: "Sitios Medievales", iconUrl: "/filtros/sitios_medievales.png" },
 
];


//   const Filtros = [
//     'Destinos exóticos', 'Auroras Boreales', 'Safaris', 'Experiencias en el desierto',
//     'Playas', 'Experiencias Navideñas', 'Arte y Cultura', 'Camino de Santiago', 'Lo Nuevo',
//     'Sitios medievales', 'Europa', 'Medio Oriente', 'Paris', 'Italia', 'Suiza', 
//     'Los más solicitados', 'Tendencia 2025', 'Londres', 'Madrid', 'Amsterdam',
//     'Ciudades Imperiales en Europa', 'Noruega', 'Finlandia', 'Asia', 'África', 
//     'Nórdicos', 'Bélgica', 'Praga', 'Croacia', 'Los Balcanes', 'Gran Bretaña', 
//     'Escocia', 'Grecia', 'Egipto', 'Marruecos', 'Dubai', 'Turquía'
// ];


export const HorizontalFilter = ({
  selectedRegion,
  setSelectedRegion,
  selectedCountries,
  setSelectedCountries,
  toursByRegion,
}: HorizontalFilterProps) => {
  const settings = {
    infinite: false,
    slidesToShow: 14,
    slidesToScroll: 4,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 11,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4.3,
          slidesToScroll: 3,
          arrows: true,
        }
      }
    ],
  };

  return (
    <div className="fixed top-24 left-0 right-0 z-40 bg-[#F8F9FA] backdrop-blur-md shadow-lg">
      <div className="container mx-auto py-3">
        <div className="relative">
          <Slider {...settings}>
            {regions.map((region) => (
              <FilterItem
                key={region.id}
                {...region}
                noBorder={true}
                className={`transition-all duration-300 ${
                  selectedRegion === region.name 
                    ? 'scale-105 border-2 border-purple-800 bg-purple-50/50' 
                    : 'hover:scale-105 hover:bg-gray-50/50'
                }`}
                onClick={() => {
                  console.log("Selected Region:", region.name);
                  setSelectedRegion(region.name);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};


