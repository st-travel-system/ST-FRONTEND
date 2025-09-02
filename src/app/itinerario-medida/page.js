'use client';

import React, { useState } from 'react';
import { Plane, Hotel, CalendarCheck, ShieldCheck, MessageCircle, MapPin, Globe } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TipoViajero() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Número de WhatsApp para los botones de "Hablar con un asesor"
  const phoneNumber = "528125692214"; // Reemplázalo con el número correcto
  const message = encodeURIComponent("Hola, saber más sobre las experiencias de ST Travel Shop. ¿Podrían brindarme más información?");
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} />
      <main className="min-h-screen bg-gray-50">
        {/* Sección "¿Qué tipo de viajero eres?" */}
        <section className="container mx-auto px-4 py-12 mt-28">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">¿Qué tipo de viajero eres?</h1>
          <p className="text-lg text-gray-600 mb-8">
            En ST Travel diseñamos tres tipos de servicio para diferentes estilos de viaje. Tú eliges cómo vivir tu próxima aventura:
          </p>

          {/* Tarjetas de tipos de viajero */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tarjeta 1: Tours o circuitos */}
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col h-full">
              <h2 className="text-xl font-bold text-center mb-2">Tours o circuitos</h2>
              <p className="text-sm text-gray-600 text-center mb-6">
                Para los que quieren todo listo sin complicarse
              </p>

              <div className="mb-6">
                <p className="text-sm text-gray-700 mb-3">
                  Tours grupales a Europa, Asia y otros destinos top, con itinerarios probados, salidas fijas y excelente relación calidad-precio.
                </p>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2 text-gray-700">Incluye:</h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-700">• Itinerarios armados y probados</li>
                    <li className="text-sm text-gray-700">• Transporte, hospedaje y actividades principales</li>
                    <li className="text-sm text-gray-700">• Asistencia previa y durante el viaje</li>
                    <li className="text-sm text-gray-700">• Opciones de pago accesibles</li>
                  </ul>
                </div>

                <div className="mt-4">
                <h3 className="font-semibold mb-2 text-gray-700">Ideal para:</h3>
                  <p className="text-sm text-gray-700">
                    Primerizos, grupos de amigos, parejas, familias o viajeros prácticos.
                  </p>
                </div>

                <p className="text-sm text-gray-700 mt-4">
                  Consulta próximas salidas y aparta tu lugar desde WhatsApp
                </p>
              </div>

              <a 
    href={whatsappURL}
    target="_blank" 
    rel="noopener noreferrer" 
    className="block w-full py-3 bg-purple-900 text-white text-center rounded-lg hover:bg-purple-800 transition mt-auto"
  >
    Hablar con un asesor
  </a>
</div>

            {/* Tarjeta 2: Viajes a la medida */}
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col h-full">
              <h2 className="text-xl font-bold text-center mb-2">Viajes a la medida</h2>
              <p className="text-sm text-gray-600 text-center mb-6">
                Para los que quieren un viaje a su medida
              </p>

              <div className="mb-6">
                <p className="text-sm text-gray-700 mb-3">
                  Tú decides: fechas, destinos, duración, presupuesto. Nosotros lo hacemos realidad.
                </p>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2 text-gray-700">Incluye:</h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-700">• Asesoría 1:1 con expertos</li>
                    <li className="text-sm text-gray-700">• Diseño a la medida del itinerario</li>
                    <li className="text-sm text-gray-700">• Selección de hospedaje y actividades personalizadas</li>
                    <li className="text-sm text-gray-700">• Atención continua por WhatsApp</li>
                  </ul>
                </div>

                <div className="mt-4">
                <h3 className="font-semibold mb-2 text-gray-700">Ideal para:</h3>
                  <p className="text-sm text-gray-700">
                    Parejas, lunamieleros, celebraciones especiales, viajeros independientes.
                  </p>
                </div>

                <p className="text-sm text-gray-700 mt-4">
                  Agenda una sesión con tu asesor y empieza a diseñar tu viaje hoy
                </p>
              </div>

              <a 
               href={whatsappURL}
               target="_blank" 
               rel="noopener noreferrer" 
               className="block w-full py-3 bg-purple-900 text-white text-center rounded-lg hover:bg-purple-800 transition mt-auto"
             >
               Hablar con un asesor
             </a>
           </div>
 
            {/* Tarjeta 3: Viajes de lujo */}
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col h-full">
              <h2 className="text-xl font-bold text-center mb-2">Viajes de lujo</h2>
              <p className="text-sm text-gray-600 text-center mb-6">
                Para los que quieren lo mejor, sin límites
              </p>

              <div className="mb-6">
                <p className="text-sm text-gray-700 mb-3">
                  Para los que quieren lo mejor, sin límites
                  <br/>
                  <br/>
                  Experiencias de alto nivel, alojamientos premium y detalles exclusivos en cada paso del viaje.
                </p>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2 text-gray-700">Incluye:</h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-700">• Alojamientos 5 estrellas superior Deluxe y experiencias únicas</li>
                    <li className="text-sm text-gray-700">• Traslados privados y concierge</li>
                    <li className="text-sm text-gray-700">• Itinerarios de autor o diseño personalizado</li>
                    <li className="text-sm text-gray-700">• Tours y actividades privados</li>
                  </ul>
                </div>

                <div className="mt-4">
                <h3 className="font-semibold mb-2 text-gray-700">Ideal para:</h3>
                  <p className="text-sm text-gray-700">
                    Viajeros exigentes y amantes de la exclusividad.
                  </p>
                </div>

                <p className="text-sm text-gray-700 mt-4">
                  Conoce nuestras experiencias de lujo y déjate consentir desde el inicio
                </p>
              </div>

            <a 
             href={whatsappURL}
             target="_blank" 
             rel="noopener noreferrer" 
             className="block w-full py-3 bg-purple-900 text-white text-center rounded-lg hover:bg-purple-800 transition mt-auto"
           >
             Hablar con un asesor
           </a>
          </div>
         </div>
         <div className="relative rounded-xl overflow-hidden mt-20 mb-16">
          <img 
            src="/otro_itinerario_medida.jpg" 
            alt="Vista panorámica de destino turístico"
            className="w-full h-96 md:h-96 object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿No sabes cuál es el mejor para ti?</h2>
            <p className="text-white text-lg max-w-2xl">
              Habla con un asesor y te ayudamos a encontrar el tipo de viaje perfecto
              según tu estilo, tu presupuesto y tus ganas de conocer el mundo.
            </p>
          </div>
        </div>
        </section>
      </main>
      <Footer />
    </>
  );
}