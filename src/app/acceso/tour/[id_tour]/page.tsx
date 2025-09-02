// src/app/page.tsx
"use client";

import React, { useState,useEffect } from 'react';
import { Box, Typography,FormControlLabel, TextField, Button, Checkbox, Grid, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Card } from '@mui/material';
import { FaEdit, FaTrash, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Iconos para editar y eliminar fotos
import Slider from 'react-slick'; // Componente de React Slick para el carrusel
import { ChevronDown, ChevronRight } from "lucide-react";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { useDropzone, Accept } from 'react-dropzone';
import "./tourStyles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {DOMAIN_FRONT,DOMAIN_BACK}  from "../../../../../env";

// Función para manejar las estrellas
const StarRating = ({ value, onChange }) => {
  const handleStarClick = (index) => {
    onChange(index + 1); // Ajustamos para que empiece de 1
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {[0, 1, 2, 3, 4].map((index) => {
        return index < value ? (
          <FaStar key={index} size={24} onClick={() => handleStarClick(index)} style={{ cursor: 'pointer', color: '#FFBC00' }} />
        ) : (
          <FaRegStar key={index} size={24} onClick={() => handleStarClick(index)} style={{ cursor: 'pointer', color: '#FFBC00' }} />
        );
      })}
    </Box>
  );
};


interface Hotel {
  cityIndex: number;
  hotelIndex: number;
  ciudad: string;   // Este es el nombre de la ciudad dentro de hoteles
  city: string;     // Este es el nombre de la ciudad también en los hoteles (puede tener un valor diferente)
  hotel: string;
  stars: number;
}



interface Tour {
  nombre_tour: string;
  nombre_categoria: string;
  precio: number;
  fecha_inicio: string;
  fecha_fin: string;
  id_tour: string;
  fotos_galeria: { urlCompleta: string }[];
  descripciones: string[] | string;
  itinerarios: string[] | string;
  hoteles: string[] | string;
  fechas_inicio: string[];
  publicado: number;
  ciudad: string;
  
}



export default function Page({params}) {
  
  const id_tour = params.id_tour;
  // const [tourT, setTour] = useState<Tour | null>(null);
  const [indentificador, setIdentificador] = useState('')
  const [tourEdit, setTourEdit] =  useState<Tour | null>(null);

  const [duracion, setDuracion] = useState(0)
  const [ciudades, setCiudades] = useState(0)
  const [galleryUrls, setGalleryUrls] = useState([])
  const [hotelesFiltrados, setHotelesFiltrados] = useState(null);
  const [hoteles, setHoteles] = useState('');
  const [id_descripcion_hotel, setIDDescripcionHotel] = useState(0);
  const [openEditHotel, setOpenEditHotel] = useState(false);
  const [hotelToEdit, setHotelToEdit] = useState(null);
  const [hotelesEditados, setHotelesEditados] = useState([]);
  const [descripcionFiltrada, setDescripciones] = useState([]);
  const [descripciones, setDescripcionesG] = useState([]);
  const [items_precio_incluye, setItems_precio_incluye] = useState([]);
  const [itinerarios, setItinerarios] = useState([]);


   useEffect(() => {
      const fetchData = async () => {
          try {
              const setsResponse = await fetch(`${DOMAIN_BACK}/obtener_tour_publicado/${id_tour}`);
              const setTourP = await setsResponse.json();
              setTourEdit(setTourP)
              if (setTourP.tourUnico && setTourP.tourUnico.length > 0) {
                setTourEdit(setTourP.tourUnico[0]); // Asegurar que siempre sea un objeto
              }
              const tourData = setTourP.tourUnico[0];
              setIdentificador(tourData.identificador);

              const fechaInicio = new Date(setTourP.tourUnico[0].fecha_inicio).getTime();
              const fechaFin = new Date(setTourP.tourUnico[0].fecha_fin).getTime();
              const duracionDias = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
              setDuracion(duracionDias + 1);
            
              // Generar las URLs de la galería
              const galleryArray = setTourP.tourUnico[0]?.fotos_galeria
              ? Array.isArray(setTourP.tourUnico[0].fotos_galeria)
                ? setTourP.tourUnico[0].fotos_galeria
                : (() => {
                    try {
                      return JSON.parse(setTourP.tourUnico[0].fotos_galeria) || [];
                    } catch (error) {
                      return [];
                    }
                  })()
              : [];
            
              // const galleryUrls = galleryArray.map((foto) => `${DOMAIN_BACK}/static/fotos_galeria/${setTourP.tourUnico[0].id_tour}/${foto}`);
              setGalleryUrls(galleryArray);
  
              // HOTELES
              const hotelesFiltrados = setTourP.tourUnico[0]?.descriptions?.find(hot => 
                hot?.titulo.toLowerCase() === "hoteles previstos" || 
                hot?.titulo.toLowerCase() === "hoteles previstos o similares"
              ) || { descripcion: "" };

              setIDDescripcionHotel(hotelesFiltrados.id_descripcion);
              
              setHoteles(hotelesFiltrados.descripcion);
              const resultHoteles = parseHotels(hotelesFiltrados.descripcion);  // Aquí obtenemos el resultado parseado

              if(setTourP.tourUnico[0]?.hoteles != null){
                setHotelesEditados(JSON.parse(setTourP.tourUnico[0]?.hoteles));
              } else {
    
                setHotelesEditados(resultHoteles);  // Establecer el valor de hotelesEditados con resultHoteles
    
              }
           
              // DESCRIPCIONES
              setDescripcionesG(setTourP.tourUnico[0]?.descriptions);
             const descripcionFiltrada = setTourP.tourUnico[0]?.descriptions?.find(desc => desc?.titulo === "El precio incluye") || { descripcion: "" };
             setDescripciones(descripcionFiltrada);
  
  
                // Limpiar y dividir la descripción en elementos individuales
                //  const items_precio_incluye = descripcionFiltrada.descripcion
                //  .replace(/<BR>/gi, '') // Elimina etiquetas <BR>
                //  .replace(/\r\n/g, '')  // Elimina caracteres de nueva línea
                //  .split('- ')           // Divide por guion y espacio "- " para separar los elementos
                //  .filter(item => item.trim() !== ''); // Filtra elementos vacío
                
                 
                   const items_precio_incluye = descripcionFiltrada.descripcion
                   .replace(/<br\s*\/?>/gi, '\n')              // Reemplaza <br> o <BR> por saltos de línea
                   .replace(/\r/g, '')                         // Elimina \r
                   .split(/(?:^|\n)[\.\-]\s+/)                 // Divide por líneas que empiezan con . o - seguido de espacio
                   .map(item => item.trim())                   // Limpia espacios
                   .filter(item => item.length > 0);           // Elimina vacíos
            
                   // Extraer ciudades que están dentro de <b>...</b> con RegExp
                  const ciudades = [...hotelesFiltrados.descripcion.matchAll(/<b>(.*?)<\/b>/gi)]
                  .map(match => match[1].replace(/<BR>/gi, '').trim()); // Elimina <BR> y espacios extra
                
                  setItems_precio_incluye(items_precio_incluye);
  
                   // CANTIDAD DE CIUDADES
               
                   const cantidad_ciudades = ciudades.length;
  
                   setCiudades(cantidad_ciudades);
  
  
                  //  ITINERARIOS
  
                  setItinerarios(setTourP.tourUnico[0].itineraries);


                setTourEdit({
                  id_tour: setTourP.tourUnico[0].id_tour,
                  nombre_tour: setTourP.tourUnico[0].nombre_tour,
                  nombre_categoria: setTourP.tourUnico[0].nombre_categoria,
                  precio: setTourP.tourUnico[0].precio,
                  fecha_inicio: setTourP.tourUnico[0].fecha_inicio,
                  fecha_fin: setTourP.tourUnico[0].fecha_fin,
                  fotos_galeria: galleryUrls,
                  descripciones: setTourP.tourUnico[0].descriptions,
                  itinerarios: setTourP.tourUnico[0].itineraries,
                  hoteles: setTourP.tourUnico[0].hoteles,
                  fechas_inicio: setTourP.tourUnico[0].fecha_inicio,
                  publicado: setTourP.tourUnico[0].publicado,
                  ciudad: ''
                });

                setIsPublished(tourData.publicado);
  
              

  
  
          } catch (error) {
              console.error('Error fetching data:', error);
          } finally {
              // setLoading(false);
          }
      };
    
      fetchData();
    }, [id_tour]);



   // Función para separar los hoteles y extraer las estrellas si están presentes
const parseHotels = (input) => {
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

  // Ahora procesamos los hoteles para extraer las estrellas
  hotelsByCity.forEach(city => {
    city.hoteles = city.hoteles.map(hotel => {
      const match = hotel.match(/(.*)(\d+(\.\d+)?)\s?\*\*\*\*/);
      const name = match ? match[1].trim() : hotel;
      const stars = match ? parseInt(match[2]) : 0;
      return { hotel: name, stars };
    });
  });

  return hotelsByCity;
};


    const resultHoteles = parseHotels(hoteles);
  

  const [open, setOpen] = useState(false); // Estado para controlar el diálogo de edición
  const [isPublished, setIsPublished] = useState(0); // Estado para controlar si el tour está publicado
  const [newImage, setNewImage] = useState<File | null>(null); // Para cargar nuevas imágenes

  // Configuración del carrusel
  const settings = {
    dots: true, // Muestra puntos para navegación
    infinite: true, // Carrusel infinito
    speed: 500, // Velocidad de transición
    slidesToShow: 1, // Mostrar una imagen a la vez
    slidesToScroll: 1, // Mover una imagen a la vez
  };

  // Función para abrir el diálogo de edición
  const manejarAbrirDialogo = () => {
    setOpen(true);
  };

  // Función para cerrar el diálogo de edición
  const manejarCerrarDialogo = () => {
    setOpen(false);
  };

  // Función para guardar los cambios
  const manejarGuardarEdicion = () => {
    setOpen(false);
    alert('Cambios guardados');
  };

  // Actualizar los datos del tour editado
  const manejarCambio = (campo: string, valor: string) => {
    setTourEdit({ ...tourEdit, [campo]: valor });
  };

  // Función para cambiar el estado del tour (publicar o no)
  const manejarPublicarTour = async () => {
    // Invertir el estado de publicación
    const nuevoEstado = !isPublished ? 1 : 0;
    
    try {
        // Enviar la solicitud POST a la API con el id_tour y el nuevo estado de publicación
        const response = await fetch(DOMAIN_BACK+`/publicar_tour/${id_tour}/${nuevoEstado}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_tour: tourEdit.id_tour,
                publicado: nuevoEstado,
            }),
        });

        console.log(response);
        
        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error('Error al publicar el tour');
        }

        // Si la solicitud es exitosa, puedes manejar la respuesta de la API si es necesario
        const data = await response.json();
        console.log('Respuesta de la API:', data);

        // Actualizar el estado local después de la respuesta exitosa
        setIsPublished(nuevoEstado);
        setTourEdit({ ...tourEdit, publicado: nuevoEstado }); // Asegurar que tourEdit se actualice también
        
    } catch (error) {
        console.error('Error al enviar la solicitud a la API:', error);
        // Puedes manejar el error aquí, por ejemplo, mostrar un mensaje de error
    }
};

  
  // Configuración de la zona de arrastre para agregar fotos
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
        const formData = new FormData();
        acceptedFiles.forEach(file => {
            formData.append('fotos', file);
        });

        try {
            const response = await fetch(`${DOMAIN_BACK}/subir_imagenes_galeria/${id_tour}`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data.ok) {
                // Agregar las nuevas fotos a las fotos existentes
                alert(data.mensaje);
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
            } else {
                alert(data.mensaje);
            }
        } catch (error) {
            console.error("Error al subir las fotos:", error);
            alert("Hubo un error al subir las fotos.");
        }
    },
    accept: 'image/*' as unknown as Accept,
});


// Agregar un manejador de evento para seleccionar la foto principal
const handleSelectMainImage = async (fotoUrl) => {
  const confirmation = window.confirm("¿Estás seguro de que quieres hacer esta foto la principal?");

  if (confirmation) {
    try {
      const response = await fetch(`${DOMAIN_BACK}/actualizar_foto_principal/${id_tour}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          foto_principal: fotoUrl, // Enviamos la URL de la foto seleccionada
        }),
      });

      const data = await response.json();

      if (data.ok) {
        alert("Foto principal actualizada correctamente");
        // Opcional: actualizar el estado local si es necesario
      } else {
        alert("Error al actualizar la foto principal");
      }
    } catch (error) {
      console.error("Error al actualizar la foto principal:", error);
      alert("Hubo un error al seleccionar la foto principal.");
    }
  }
};


  


    const [openDay, setOpenDay] = useState<string | null>(null);
  
    // Ordenar el itinerario por número de día
    const sortedItinerary = [...(itinerarios || [])].sort(
      (a, b) => parseInt(a.day_number) - parseInt(b.day_number)
    );
  
    const toggleDropdown = (dayNumber: string) => {
      setOpenDay(openDay === dayNumber ? null : dayNumber);
    };


    // ELIMINAR FOTO

  //   const manejarEliminarFoto = async (index: number) => {
  //     // Obtener la URL completa de la foto
  //     const fotoUrl = tourEdit.fotos_galeria[index];
  
  //     // Extraer solo el nombre del archivo (sin la ruta completa)
  //     // const fotoNombre = fotoUrl.split('/').pop();  // Obtiene solo el nombre del archivo
  
  //     const confirmation = window.confirm("¿Estás seguro de que quieres eliminar esta foto?");
  
  //     if (confirmation) {
  //         try {
  //             // Llamada a la API para eliminar la foto
  //             const response = await fetch(`${DOMAIN_BACK}/eliminar_foto/${tourEdit.id_tour}/${fotoNombre}`, {
  //                 method: "DELETE",
  //             });
  
  //             if (response.ok) {
    
  //                  // Verificar si fotos_galeria es un arreglo o una cadena y convertirla a arreglo si es necesario
  //                  const fotosGaleriaArray = Array.isArray(tourEdit.fotos_galeria) ? tourEdit.fotos_galeria : JSON.parse(tourEdit.fotos_galeria || "[]");
                  
  //                  // Eliminar la foto localmente en el frontend
  //                  const nuevasFotos = fotosGaleriaArray.filter((_, i) => i !== index);
                  
  //                 // Actualizar el estado 'tourEdit' con las fotos actualizadas
  //                 setTourEdit({ ...tourEdit, fotos_galeria: nuevasFotos });
  //             } else {
  //                 const data = await response.json();
  //                 alert(data.mensaje);
  //             }
  //         } catch (error) {
  //             console.error("Error al eliminar la foto:", error);
  //             alert("Hubo un error al eliminar la foto.");
  //         }
  //     }
  // };
  const manejarEliminarFoto = async (url: string) => {

     console.log(url);
     

    const fotoUrl = url;  // URL completa de la foto en S3
    
    const confirmation = window.confirm("¿Estás seguro de que quieres eliminar esta foto?");
    
    if (confirmation) {
      try {
        // Extraer solo el nombre del archivo (sin la ruta completa)
        const fotoNombre = fotoUrl.split('/').pop();  // Obtiene solo el nombre del archivo
  
        // Llamada a la API para eliminar la foto
        const response = await fetch(`${DOMAIN_BACK}/eliminar_foto/${id_tour}/${fotoNombre}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
           console.log(response);
           
           setTimeout(() => {
            window.location.reload();
          }, 1000);
          // Verificar si fotos_galeria es un arreglo o una cadena y convertirla a arreglo si es necesario
          // const fotosGaleriaArray = Array.isArray(tourEdit.fotos_galeria) ? tourEdit.fotos_galeria : JSON.parse(tourEdit.fotos_galeria || "[]");

        } else {
          const data = await response.json();
          alert(data.mensaje);
        }
      } catch (error) {
        console.error("Error al eliminar la foto:", error);
        alert("Hubo un error al eliminar la foto.");
      }
    }
  };
  
  




// Función para abrir el formulario de edición del hotel
const openEditHotelDialog = (cityIndex, hotelIndex) => {
  const hotel = hotelesEditados[cityIndex].hoteles[hotelIndex];
  setHotelToEdit({
    cityIndex, 
    hotelIndex, 
    ciudad: hotelesEditados[cityIndex].ciudad,  // Editando ciudad fuera del arreglo hoteles
    city: hotel.city,  // Editando city dentro del objeto hotel
    hotel: hotel.hotel, 
    stars: hotel.stars // Guardamos las estrellas en el estado
  });
  setOpenEditHotel(true);
};

// Función para cerrar el formulario de edición del hotel
const closeEditHotelDialog = () => {
  setHotelToEdit(null);
  setOpenEditHotel(false);
};

// Función para guardar los cambios de un hotel
const handleHotelChange = (e) => {
  const { name, value } = e.target;
  setHotelToEdit({ ...hotelToEdit, [name]: value });
};


const saveHotelChanges = async () => {
  const updatedHotels = [...hotelesEditados];
  
  // Actualizamos tanto la ciudad fuera del arreglo como los hoteles dentro de las ciudades
  updatedHotels[hotelToEdit.cityIndex].hoteles[hotelToEdit.hotelIndex] = {
    ...hotelToEdit,  // Aquí se actualizan los campos: ciudad, city, hotel y estrellas
    stars: hotelToEdit.stars,
  };

  // Si la ciudad ha sido editada fuera del arreglo, también la actualizamos en el objeto principal
  updatedHotels[hotelToEdit.cityIndex].ciudad = hotelToEdit.ciudad;  // Actualizamos ciudad fuera del arreglo
  updatedHotels[hotelToEdit.cityIndex].hoteles[hotelToEdit.hotelIndex].city = hotelToEdit.city;  // Actualizamos city dentro de hotel

  setHotelesEditados(updatedHotels);  // Actualizamos el estado de los hoteles editados

  const descripcionEditada = JSON.stringify(updatedHotels);

  try {
    const response = await fetch(`${DOMAIN_BACK}/actualizar_descripcion_hotel/${id_descripcion_hotel}/${id_tour}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        descripcion_editada: descripcionEditada,
      }),
    });

    const data = await response.json();

    if (data.ok) {
      alert('Descripción actualizada correctamente');
    } else {
      alert('Error al actualizar la descripción');
    }
  } catch (error) {
    console.error('Error al enviar la descripción:', error);
    alert('Hubo un error al actualizar la descripción');
  }

  closeEditHotelDialog();  // Cerrar el diálogo de edición
};



  // Función para manejar el cambio de estrellas
const handleStarChange = (cityIndex, hotelIndex, newRating) => {
  const updatedHotels = [...hotelesEditados];
  updatedHotels[cityIndex].hoteles[hotelIndex].stars = newRating; // Actualizar las estrellas del hotel
  setHotelesEditados(updatedHotels); // Guardar el cambio en el estado
};




// CATEGORIAS PRECIO
const [selectedOptions, setSelectedOptions] = useState([]); // Estado para las opciones seleccionadas
const [categoriasTour, setCategoriasTour] = useState([])

useEffect(() => {
    let retryCount = 0;
    const fetchData = async () => {
   
      while (retryCount < 3) {
        try {
          const response = await fetch(`${DOMAIN_BACK}/obtener_opciones_tours/`+indentificador);
          if (!response.ok) throw new Error("Error en la respuesta del servidor");

          const data = await response.json();
          setCategoriasTour(data.nombresYIdsTours);
      
          return; // Salir del bucle si la petición es exitosa
        } catch (error) {
          retryCount++;
          console.error(`Intento ${retryCount}: Error al obtener tours`, error);
        }
      }
    };

    fetchData();
  }, [indentificador]);


    // Función para manejar la selección de opciones
    const handleOptionChange = (event) => {
      const value = parseInt(event.target.value); // Convertir el valor a entero
      setSelectedOptions(prevSelected => 
        prevSelected.includes(value) 
          ? prevSelected.filter(item => item !== value) // Eliminar si ya está seleccionado
          : [...prevSelected, value] // Agregar si no está seleccionado
      );
    };

  // Extraer los valores después del guion en el nombre_tour
const opciones = categoriasTour.map(tour => {
  const opcion = tour.nombre_tour.split(' - ').pop(); // Tomamos lo que viene después del ' - '
  return {
      id_tour: tour.id_tour,
      opcion: opcion
  };
});



// Función auxiliar para actualizar la descripción de hoteles en la DB
const updateHotelsInDB = async (updatedHotels) => {
  const descripcionEditada = JSON.stringify(updatedHotels);
  try {
    const response = await fetch(`${DOMAIN_BACK}/actualizar_descripcion_hotel/${id_descripcion_hotel}/${id_tour}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ descripcion_editada: descripcionEditada }),
    });

    const data = await response.json();
    if (data.ok) {
      alert('Descripción actualizada correctamente');
    } else {
      alert('Error al actualizar la descripción');
    }
  } catch (error) {
    console.error('Error al enviar la descripción:', error);
    alert('Hubo un error al actualizar la descripción');
  }
};


// Estado para controlar el diálogo de agregar nuevo hotel
const [openAddHotelDialog, setOpenAddHotelDialog] = useState(false);
// Estado para almacenar temporalmente los datos del nuevo hotel
const [newHotel, setNewHotel] = useState({ city: '', hotel: '', stars: 0 });

const openNuevoHotelDialog = () => {
  setNewHotel({ city: '', hotel: '', stars: 0 });
  setOpenAddHotelDialog(true);
};

const closeNuevoHotelDialog = () => {
  setNewHotel({ city: '', hotel: '', stars: 0 });
  setOpenAddHotelDialog(false);
};

const saveNuevoHotel = async () => {
  // Hacemos una copia del arreglo actual
  let updatedHotels = [...hotelesEditados];

  // Verificamos si la ciudad ya existe (ignorando mayúsculas/minúsculas)
  const cityIndex = updatedHotels.findIndex(cityObj => cityObj.ciudad.toLowerCase() === newHotel.city.toLowerCase());

  if (cityIndex >= 0) {
    // Agregamos el nuevo hotel a la ciudad existente
    updatedHotels[cityIndex].hoteles.push({
      hotel: newHotel.hotel,
      stars: newHotel.stars
    });
  } else {
    // Si la ciudad no existe, creamos un nuevo objeto para la ciudad
    updatedHotels.push({
      ciudad: newHotel.city,
      hoteles: [{ hotel: newHotel.hotel, stars: newHotel.stars }]
    });
  }

  // Actualizamos el estado y luego sincronizamos con la DB
  setHotelesEditados(updatedHotels);
  await updateHotelsInDB(updatedHotels);
  setOpenAddHotelDialog(false);
};


 const handleDeleteHotel = (cityIndex, hotelIndex) => {
  const updatedHotels = [...hotelesEditados];
  const city = updatedHotels[cityIndex];
  
  // Eliminar el hotel de la ciudad
  city.hoteles.splice(hotelIndex, 1);

  // Si la ciudad tiene ahora 0 hoteles, preguntar si eliminarla
  if (city.hoteles.length === 0) {
    const confirmCityRemoval = window.confirm(
      `No quedan hoteles en ${city.ciudad}. ¿Eliminar esta ciudad también?`
    );
    if (confirmCityRemoval) {
      // Eliminar la ciudad completa
      updatedHotels.splice(cityIndex, 1);
    }
  }

  // Actualizar el estado con los hoteles modificados
  setHotelesEditados(updatedHotels);
  updateHotelsInDB(updatedHotels); // Actualiza la base de datos
};



  
  

  return (
    <Box className="tour-container">
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#5B2C7C' }}>Detalles del Tour</Typography>

      {/* Galería de Fotos (Carrusel con contenedor limitado a 800px) */}
      <Box sx={{ mb: 5, maxWidth: '700px', maxHeight: '500px', margin: '20px auto', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
  <Slider {...settings}>
    {galleryUrls && Array.isArray(galleryUrls) ? (
      galleryUrls.map((foto, index) => (
        <div key={index} style={{ textAlign: 'center', position: 'relative' }}> {/* Agregar position: 'relative' al contenedor */}
          <Card className="tour-image-card">
            <img
              src={foto.urlCompleta}
              alt={`Foto ${index + 1}`}
              className="carousel-image"
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
            />
            {/* IconButton para eliminar */}
            <IconButton
              sx={{
                position: 'absolute',
                top: '10px', // Ajustar según sea necesario
                right: '10px', // Ajustar según sea necesario
                backgroundColor: '#fff',
                borderRadius: '50%',
                padding: '5px',
                zIndex: 1, // Asegurarse de que esté por encima de la imagen
              }}
              onClick={() => manejarEliminarFoto(foto.urlCompleta)}
            >
              <FaTrash color="red" />
            </IconButton>
          </Card>
          {/* Botón para seleccionar como principal */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSelectMainImage(foto.urlCompleta)} // Usar la URL de la foto seleccionada
            sx={{
              marginTop: '40px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '200px',
              textAlign: 'center',
            }}
          >
            Seleccionar como principal
          </Button>
        </div>
      ))
    ) : (
      <div>No hay fotos disponibles</div>
    )}
  </Slider>
</Box>






      {/* Arrastrar y Soltar Foto */}
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #5B2C7C',
          borderRadius: '10px',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
          marginTop: '100px',
          marginBottom: '20px',
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="body2" color="#5B2C7C">
          Arrastra y suelta imágenes aquí o haz clic para seleccionar.
        </Typography>
      </Box>

      {/* Nombre del Tour */}
      <Box sx={{ mb: 2 }} className="editable-section">
        <Typography variant="h6"><strong>Nombre del Tour:</strong></Typography>
        <TextField
          fullWidth
          value={tourEdit?.nombre_tour}
          onChange={(e) => manejarCambio('nombre', e.target.value)}
          variant="outlined"
          size="small"
          sx={{ backgroundColor: '#f5f5f5', borderRadius: '5px' }}
        />
      </Box>

       {/* Opciones del Tour (Seleccionar más de una) */}
       <Box sx={{ mb: 3 }}>
        <Typography variant="h6"><strong>Categorías Tour:</strong></Typography>
        {opciones.map((tour) => (
           <p>{tour.opcion}</p>
          // <FormControlLabel
          //   key={tour.id_tour}
          //   control={
          //     <Checkbox
          //       value={tour.id_tour}  // Guardar el id_tour en lugar de la opción
          //       checked={selectedOptions.includes(tour.id_tour)} // Revisar si el id_tour está en el estado
          //       onChange={handleOptionChange}
          //       color="primary"
          //     />
          //   }
          //   label={tour.opcion}  // Mostrar el texto después del guion
          // />
        ))}
      </Box>

     
      {/* Itinerario */}
      <Box sx={{ mb: 2 }} className="editable-section">
        <Typography variant="h6"><strong>Itinerario:</strong></Typography>
        <ScrollArea className="h-[400px] rounded-md border p-4">
        <div className="flex flex-col gap-4">
          {sortedItinerary.map((item, index) => (
            <div key={index} className="group">
              {/* Encabezado del Dropdown */}
              <div
                onClick={() => toggleDropdown(item.day_number)}
                className="group flex items-center gap-4 p-3 bg-accent rounded-lg cursor-pointer hover:bg-accent/80 transition-all hover:shadow-md hover:translate-x-0.5 hover:-translate-y-0.5 active:bg-accent/90 active:translate-x-0 active:translate-y-0"
              >
                <div className="font-outfit font-bold text-primary">
                  Día {item.day_number}
                </div>
                <div className="flex-1 text-sm text-muted-foreground">
                  {item.titulo}
                </div>
                {openDay === item.day_number ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
                )}
              </div>

              {/* Contenido Expandible */}
              {openDay === item.day_number && (
                <div className="p-4 border border-gray-200 bg-white rounded-lg shadow-md mt-2">
                  <p className="font-medium text-sm font-jakarta">{item.descripcion}</p>
                  <div className="text-sm text-muted-foreground space-y-2 font-jakarta mt-2">
                    {(item.detalles ?? "").split("\n").map((parrafo, index) => (
                      <p key={index}>{parrafo}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      </Box>

      {/* Precio Incluye */}
      <Box sx={{ mb: 2 }} className="editable-section">
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
      </Box>

       {/* Hoteles */}
   
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6"><strong>Hoteles:</strong></Typography>
      {hotelesEditados.map((city, cityIndex) => (
  <Box key={cityIndex}>
    <Typography variant="h6">{city.ciudad}</Typography> {/* Aquí se renderiza la ciudad */}
    {city.hoteles.map((hotel, hotelIndex) => (
      <Box key={hotelIndex} sx={{ mb: 2 }}>
        <Typography variant="body1">{hotel.hotel}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StarRating 
            value={hotel.stars || 0} 
            onChange={(newRating) => handleStarChange(cityIndex, hotelIndex, newRating)} 
          />
        </Box>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FaEdit />}
          onClick={() => openEditHotelDialog(cityIndex, hotelIndex)}
        >
          Editar
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<FaTrash />}
          onClick={() => {
            handleDeleteHotel(cityIndex, hotelIndex);
            updateHotelsInDB(hotelesEditados);
          }}
          sx={{ ml: 2 }}
        >
          Eliminar
        </Button>
      </Box>
    ))}
  </Box>
))}

      {/* Botón para agregar un nuevo hotel */}
      <Button variant="contained" color="primary" onClick={openNuevoHotelDialog}>
        Agregar Hotel
      </Button>
    </Box>

<Dialog open={openAddHotelDialog} onClose={closeNuevoHotelDialog}>
  <DialogTitle>Agregar Nuevo Hotel</DialogTitle>
  <DialogContent>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Ciudad"
          value={newHotel.city}
          onChange={(e) => setNewHotel({ ...newHotel, city: e.target.value })}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Hotel"
          value={newHotel.hotel}
          onChange={(e) => setNewHotel({ ...newHotel, hotel: e.target.value })}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">Estrellas</Typography>
        <StarRating 
          value={newHotel.stars}
          onChange={(newRating) => setNewHotel({ ...newHotel, stars: newRating })}
        />
      </Grid>
    </Grid>
  </DialogContent>
  <DialogActions>
    <Button onClick={closeNuevoHotelDialog} color="primary">Cancelar</Button>
    <Button onClick={saveNuevoHotel} color="primary">Guardar</Button>
  </DialogActions>
</Dialog>




       {/* Formulario para Editar Hotel */}
   

       <Dialog open={openEditHotel} onClose={closeEditHotelDialog}>
  <DialogTitle>Editar Hotel</DialogTitle>
  <DialogContent>
    <Grid container spacing={2}>
      {/* Campo para editar el nombre de la ciudad fuera del arreglo hoteles */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Ciudad (fuera del arreglo)"
          value={hotelToEdit?.ciudad}  // Editamos el campo ciudad fuera de hoteles
          onChange={(e) => setHotelToEdit({ 
            ...hotelToEdit, 
            ciudad: e.target.value // Actualizamos el campo ciudad
          })}  
          name="ciudad"
          variant="outlined"
          size="small"
        />
      </Grid>

      {/* Campo para editar el nombre de la ciudad dentro del arreglo hoteles */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Ciudad (dentro de hotel)"
          value={hotelToEdit?.city}  // Editamos el campo city dentro de los hoteles
          onChange={(e) => setHotelToEdit({ 
            ...hotelToEdit, 
            city: e.target.value // Actualizamos el campo city
          })}  
          name="city"
          variant="outlined"
          size="small"
        />
      </Grid>

      {/* Campo para editar el nombre del hotel */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Hotel"
          value={hotelToEdit?.hotel}
          onChange={handleHotelChange}
          name="hotel"
          variant="outlined"
          size="small"
        />
      </Grid>

      {/* Campo para las estrellas */}
      <Grid item xs={12}>
        <Typography variant="body1">Estrellas</Typography>
        <StarRating 
          value={hotelToEdit?.stars || 0} 
          onChange={(newRating) => setHotelToEdit({ 
            ...hotelToEdit, 
            stars: newRating 
          })} 
        />
      </Grid>
    </Grid>
  </DialogContent>
  <DialogActions>
    <Button onClick={closeEditHotelDialog} color="primary">Cancelar</Button>
    <Button onClick={saveHotelChanges} color="primary">Guardar</Button>
  </DialogActions>
</Dialog>





      {/* Botón para Publicar el Tour */}
      <Button
        variant="contained"
        color={isPublished === 1 ? 'secondary' : 'primary'}
        sx={{ float: 'right', marginTop: '20px' }}
        onClick={manejarPublicarTour}
      >
        {isPublished === 1 ? 'Despublicar Tour' : 'Publicar Tour'}
      </Button>
 
   
    </Box>
  );
}
