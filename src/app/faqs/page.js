'use client';
import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Plus, Minus } from "lucide-react";
import { Phone, MessageCircle } from "lucide-react";

export default function Faqs() {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    { question: "¿Quiénes somos?", answer: "En ST Travel, somos una agencia de viajes digital especializada en ofrecer experiencias únicas e inolvidables en destinos como Europa, Asia, Medio Oriente y África. Nuestra misión es que vivas el viaje de tus sueños de una forma fácil y segura." },
    { question: "¿Por qué elegir ST Travel para mi viaje?", answer: "Con 25 años de experiencia nos especializamos en ofrecer servicios de viaje personalizados y diseñados para que disfrutes de un viaje sin preocupaciones. Desde el primer contacto hasta el regreso a casa, estamos a tu lado para asegurarnos de que cada detalle sea perfecto." },
    { question: "¿Cómo funcionan los tours de ST Travel?", answer: "Nuestros tours con salidas garantizadas están diseñados para ofrecerte una experiencia completa y única del destino, incluyendo: Alojamiento, Traslados, Actividades, Guías expertos en habla hispana. Solo necesitas elegir tu destino nosotros nos encargamos del resto." },
    { question: "¿Cuáles son sus servicios?", answer: (
        <ul className="list-disc pl-5">
          <li>Tours Guiados: Están diseñados para quienes buscan una experiencia de viaje fácil y segura, sin preocuparse por la planificación. Con salidas garantizadas tendrás todo organizado: desde el alojamiento en hoteles seleccionados hasta traslados, visitas y guía experto en español. Perfecto para quienes prefieren disfrutar de cada destino con total comodidad y confianza.</li>
          <li>Viajes a la medida: Te permite crear un itinerario completamente personalizado, adaptado a tus intereses y preferencias. Desde la elección de destinos hasta actividades especiales, nuestras asesoras te acompañaran para diseñarte un viaje único.</li>
          <li>Viajes Exclusivos: Para una experiencia realmente única nuestros viajes exclusivos incluyen todo lo que necesitas para un viaje excepcional. Hospedaje en los mejores hoteles del mundo, Vehículos de lujo para traslados privados y servicio personalizado desde el momento en que llegas al aeropuerto. Vive lo mejor en lujo y comodidad, diseñado solo para ti.</li>
        </ul>
      ) },
    { question: "¿Cuáles son los destinos disponibles?", answer: "Europa, Asia, Medio Oriente y África. Puedes explorar todos nuestros destinos en la sección principal." },
    { question: "¿Cómo puedo reservar mi tour?", answer: "Realizar tu reserva con ST Travel es muy fácil. Solo tienes que hacer clic en el botón ´´Reservar ahora´´ y serás redirigido a WhatsApp donde una de nuestras asesoras de viaje te guiara en todo el proceso para asegurar que tu experiencia sea perfecta." },
    { question: "¿Cómo puedo contactar con ST Travel si tengo preguntas?", answer: "Puedes comunicarte con nosotros fácilmente en la sección de contacto, por WhatsApp y nuestras líneas telefónicas. Contamos con un equipo dedicado para responder todas tus dudas." },
    { question: "¿Qué tan flexible es el método de Pago?", answer: (
        <>
          <p>Puedes pagar nuestros servicios a través de:</p>
          <ul className="list-disc pl-5">
            <li>Transferencia</li>
            <li>Depósito bancario</li>
            <li>Tarjeta de crédito (VISA, MasterCard, American Express)</li>
          </ul>
          <p className="mt-2">Separas tu viaje con el 25% considerando que 45 días antes de tu salida debe estar liquidado el total.</p>
        </>
      ) }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm}/>
      <main className="min-h-screen p-6 bg-white flex flex-col items-center">
        <h2 className="text-center text-2xl font-semibold mb-6 mt-10">Servicio al Cliente</h2>
        <div className="flex flex-row justify-center gap-4 mb-10">
          <a href="tel:+528124766541" className="flex items-center bg-[#2d0a44] text-white rounded-lg p-4 w-full md:w-72 cursor-pointer border-2 border-transparent hover:border-blue-400 transition">
            <Phone size={24} />
            <div className="ml-3">
              <p className="text-sm font-semibold">Teléfono</p>
              <p className="text-xs">81 2476 6541</p>
            </div>
          </a>
          <a href="https://wa.me/528125692214" target="_blank" rel="noopener noreferrer" className="flex items-center bg-[#2d0a44] text-white rounded-lg p-4 w-full md:w-72 cursor-pointer border-2 border-transparent hover:border-blue-400 transition">
            <MessageCircle size={24} />
            <div className="ml-3">
              <p className="text-sm font-semibold">WhatsApp</p>
              <p className="text-xs">528125692214</p>
            </div>
          </a>
        </div>

        <h2 className="text-3xl font-bold mb-6 mt-7">PREGUNTAS FRECUENTES</h2>
        <div className="w-full max-w-2xl">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-2">
              <button
                className={`w-full flex justify-between items-center p-4 rounded-lg text-white text-left bg-[#2d0a44] transition`}
                onClick={() => toggleFaq(index)}
              >
                <span className="font-semibold">{faq.question}</span>
                {openFaq === index ? <Minus size={20} /> : <Plus size={20} />}
              </button>
              {openFaq === index && (
                <div className="p-4 bg-gray-100 text-gray-700 text-sm rounded-b-lg border border-[#2d0a44]">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        
      </main>
      <section className="container mx-auto px-4 py-12 bg-white">
      <div className="relative rounded-xl overflow-hidden mt-10 mb-16">
          <img 
            src="/otro_itinerario_medida.jpg" 
            alt="Vista panorámica de destino turístico"
            className="w-full h-96 md:h-96 object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Listo para tus mejores experiencias?</h2>
            <p className="text-white text-lg max-w-2xl">
              Habla con un asesor y te ayudamos a encontrar el tipo de viaje perfecto
              según tu estilo, tu presupuesto y tus ganas de conocer el mundo.
            </p>
          </div>
        </div>
      </section> 
      <Footer />
    </>
  );
}
