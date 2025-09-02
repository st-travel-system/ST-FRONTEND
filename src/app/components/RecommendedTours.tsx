'use client';
import React, {useEffect,useState} from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel";
import { TourCardRecomend } from "./TourCardRecomend";

import { DOMAIN_BACK } from "../../../env";

import '../styles/base.css'


interface Descripcion {
  titulo: string;
  descripcion: string;
}

interface Tour_F {
  id_tour: number;
  fecha_inicio: string;
  fecha_fin: string;
  nombre_categoria: string;
  nombre_tour: string;
  titulo: string;
  tipo_tour: string;
  precio: number;
  foto_portada: string;
  fotos_galeria: string;
  descriptions: Descripcion[];
  
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

  // Generar las URLs de la galería
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


  return {
    id_tour: tour.id_tour,
    title: regionC === "Europa" ? limpiarNombreTour(tour.nombre_tour) : limpiarNombreTourMedio(tour.nombre_tour),
    location: tour.nombre_categoria,
    region: tour.tipo_tour,
    price: tour.precio,
    duration: `${duracionDias + 1} días`,
    imageUrl: `${galleryArray[0].urlCompleta}`,
    description: `Descubre las maravillas de ${tour.nombre_tour}.`,
    gallery: galleryArray,
    descripciones: tour.descriptions,
  };
};
export const RecommendedTours = ({tipo_tour,currency,cambio}) => {

  const [tours, setTours] = useState([])

  useEffect(() => {
    const fetchData = async () => {
        try {
            const setsResponse = await fetch(`${DOMAIN_BACK}/obtener_tours_recomendados/`+tipo_tour);
            const setToursR = await setsResponse.json();
            const toursPublicadosB = Array.isArray(setToursR.toursRecomendados) ? setToursR.toursRecomendados : [];
            const convertedTours = toursPublicadosB.map(convertTour);
            setTours(convertedTours);

  
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            // setLoading(false);
        }
    };
  
    fetchData();
  }, []);



  
  return (
    <section className="py-12 bg-accent">
      <div className="container padding-custom">
        <h2 className="text-2xl font-outfit font-semibold mb-8">Tours Recomendados</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4 px-10">
            {tours.map((tour, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <TourCardRecomend {...tour} currency={currency} cambio={cambio} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};