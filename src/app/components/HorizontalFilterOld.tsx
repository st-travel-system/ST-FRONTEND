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
  { id: "asia", name: "Asia", iconUrl: "/filtros/asia.png" },
  { id: "medio-oriente", name: "Medio Oriente", iconUrl: "/filtros/medio_oriente.png" },
  { id: "africa", name: "África", iconUrl: "/filtros/africa.png" },
  { id: "paris", name: "Paris", iconUrl: "/filtros/paris.png" },
  { id: "londres", name: "Londres", iconUrl: "/filtros/londres.png" },
  { id: "madrid", name: "Madrid", iconUrl: "/filtros/madrid.png" },
  { id: "amsterdam", name: "Amsterdam", iconUrl: "/filtros/amsterdam.png" },
  { id: "italia", name: "Italia", iconUrl: "/filtros/italia.png" },
  { id: "noruega", name: "Noruega", iconUrl: "/filtros/noruega.png" },
  { id: "finlandia", name: "Finlandia", iconUrl: "/filtros/finlandia.png" },
  { id: "nordicos", name: "Nórdicos", iconUrl: "/filtros/nordicos.png" },
  { id: "belgica", name: "Bélgica", iconUrl: "/filtros/belgica.png" },
  { id: "praga", name: "Praga", iconUrl: "/filtros/praga.png" },
  { id: "ciudades_imperiales", name: "Ciudades Imperiales", iconUrl: "/filtros/ciudades_imperiales.png" },
  { id: "croacia", name: "Croacia", iconUrl: "/filtros/croacia.png" },
  { id: "balcanes", name: "Los Balcanes", iconUrl: "/filtros/balcanes.png" },
  { id: "gran_bretaña", name: "Gran Bretaña", iconUrl: "/filtros/gran_bretaña.png" },
  { id: "escocia", name: "Escocia", iconUrl: "/filtros/escocia.png" },
 
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


const dayFilters = [
  "6 a 9 días",
  "10 a 14 días",
  "15 a 19 días",
  "+20 días",
];

export const HorizontalFilter = ({
  selectedRegion,
  setSelectedRegion,
  selectedDays,
  setSelectedDays,
  selectedCountries,
  setSelectedCountries,
  toursByRegion,
}: HorizontalFilterProps) => {
  const settings = {
    infinite: true,
    slidesToShow: 10,
    slidesToScroll: 2,
    arrows: true,  // Make sure arrows are enabled
    // prevArrow: <div className="slick-arrow-left"><FaChevronLeft size={24} color="purple" /></div>, // Left arrow
    // nextArrow: <div className="slick-arrow-right"><FaChevronRight size={24} color="purple" /></div>, // Right arrow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  


return (
    <div className="relative w-full bg-accent pt-12 mb-8">
      <div className="container mx-auto">
        <div className="relative">
          {!selectedRegion ? (
             <Slider {...settings}>
             {regions.map((region) => (
               <FilterItem
                 key={region.id}
                 {...region}
                 noBorder={true}
                 onClick={() => {
                   console.log("Selected Region:", region.name);
                   setSelectedRegion(region.name);
                 }}
               />
             ))}
           </Slider>
          ) : (
            <div className="flex items-center gap-4">
              <FilterItem
                {...regions.find(r => r.name === selectedRegion)!}
                showCloseIcon={true}
                isSelected={true}
                noBorder={true}
                onClick={() => {
                  console.log("Deselected Region");
                  setSelectedRegion(null);
                }}
              />
              <Separator orientation="vertical" className="h-20 bg-gray-200" />
              <div className="flex gap-4">
                {dayFilters.map((day) => (
                  <button
                    key={day}
                    className={`px-4 py-2 border rounded-full ${selectedDays === day ? "bg-gray-200" : ""}`}
                    onClick={() => {
                      console.log("Selected Days:", day);
                      setSelectedDays(day);
                    }}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
