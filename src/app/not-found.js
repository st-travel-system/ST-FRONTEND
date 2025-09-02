'use client';

import React, { useState } from 'react';
import { SearchX, Home, ArrowLeft } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from 'next/link';

export default function NotFound() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Número de WhatsApp para el botón de contacto
  const phoneNumber = "528125692214"; 
  const message = encodeURIComponent("Hola, estoy tratando de encontrar información en su sitio pero no encontré lo que buscaba. ¿Podrían ayudarme?");
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} />
      <main className="min-h-screen bg-gray-50">
        {/* Sección de página no encontrada */}
        <section className="container mx-auto px-4 py-12 mt-28">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="bg-purple-100 p-4 rounded-full mb-6">
              <SearchX size={64} className="text-purple-900" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Página no encontrada</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              Lo sentimos, la página que estás buscando no existe o ha sido trasladada a otra ubicación.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl w-full mb-12">
              <Link href="/" className="flex items-center justify-center gap-2 py-3 px-6 bg-purple-900 text-white text-center rounded-lg hover:bg-purple-800 transition">
                <Home size={20} />
                Ver tours
              </Link>
              <a 
                href={whatsappURL}
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 py-3 px-6 border border-purple-900 text-purple-900 text-center rounded-lg hover:bg-purple-100 transition"
              >
                Contactar asesor
              </a>
            </div>

            {/* Sugerencias */}
            <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md mt-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">¿Qué puedes hacer ahora?</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <ArrowLeft className="text-purple-700 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">Visita nuestra <Link href="/" className="text-purple-900 hover:underline">página de inicio</Link> para explorar nuestros tours</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowLeft className="text-purple-700 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">Conoce más sobre nuestros <Link href="/itinerario-medida" className="text-purple-900 hover:underline">itinerarios a medida</Link></span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowLeft className="text-purple-700 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">Encuentra respuestas en nuestra página de <Link href="/faqs" className="text-purple-900 hover:underline">preguntas frecuentes</Link></span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden mt-20 mb-16">
            <img 
              src="/seccion_personalizada.png" 
              alt="Vista panorámica de destino turístico"
              className="w-full h-96 md:h-96 object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black bg-opacity-40">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Necesitas ayuda para encontrar algo?</h2>
              <p className="text-white text-lg max-w-2xl">
                Nuestros asesores están listos para ayudarte a encontrar el viaje perfecto según tus preferencias y presupuesto.
              </p>
              <a 
                href={whatsappURL}
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-6 py-3 px-8 bg-purple-900 text-white text-center rounded-lg hover:bg-purple-800 transition"
              >
                Hablar con un asesor ahora
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 