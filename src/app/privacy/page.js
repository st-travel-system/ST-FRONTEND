'use client';
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Privacy() {
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm}/>
      <main className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-purple-900">AVISO DE PRIVACIDAD</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6">
              En cumplimiento con lo establecido en los artículos 15 y 16 de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (en adelante, la "Ley") SASCA TUR S.A. DE C.V (en adelante, la "Responsable" o "SASCA TUR") con domicilio en Calle José Vasconcelos Ote 345, Piso 22 int 2222 Colonia Santa Engracia, San Pedro Garza García, Nuevo León, le informa que el presente Aviso de Privacidad (en adelante, el "Aviso") está dirigido a los usuarios del sitio web de SASCA TUR (en adelante "Usuario" o "Usuarios.").
            </p>

            <p className="mb-6">
              El presente documento busca informar a los Usuarios de Sasca Tur (en adelante, el "Responsable"), sobre la utilización y tratamiento de la información personal (en adelante, "Datos Personales") que se recopile o genere a través de las visitas al la Plataforma o Sitio Web así como de los Datos Personales que el Usuario entregue y/o suministre de manera voluntaria a SASCA TUR.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-900">I. Definiciones</h2>
            <p className="mb-4">Los términos que aparezcan con la primera letra en mayúscula dentro del presente documento tendrán los siguientes significados:</p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2"><strong>Aviso:</strong> El presente aviso de privacidad, ya sea expedido en documento físico, electrónico o en cualquier otro formato generado por el Responsable.</li>
              <li className="mb-2"><strong>Cookies:</strong> Archivo de datos que se almacena en el disco duro del equipo de cómputo o del dispositivo de comunicaciones electrónicas del Usuario.</li>
              <li className="mb-2"><strong>Datos Personales:</strong> Cualquier información concerniente a una persona física identificada o identificable.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-900">II. Responsable del tratamiento de sus datos personales</h2>
            <p className="mb-6">
              SASCA TUR S.A. DE C.V ("SASCA TUR), con domicilio en Calle José Vasconcelos Ote 345, Piso 22 int 2222 Colonia Santa Engracia, San Pedro Garza García, Nuevo León, en términos de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su Reglamento.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-900">III. Datos Personales recabados</h2>
            <p className="mb-4">Los datos personales que podrá recabar SASCA TUR son, sin limitarse, los siguientes:</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3 text-purple-800">a) Datos Generales:</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Nombre completo</li>
              <li>Edad</li>
              <li>Sexo</li>
              <li>Estado Civil</li>
              <li>Identificación oficial</li>
              <li>Teléfono fijo y/o celular</li>
              <li>Dirección de correo electrónico</li>
              <li>Domicilio</li>
              <li>RFC</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-900">IV. Limitación al uso o divulgación de sus Datos Personales</h2>
            <p className="mb-6">
              El Titular puede indicar al Sasca Tur que desea limitar el uso o el tratamiento de sus Datos Personales. Para ello, el Titular deberá enviar una solicitud a contacto@sttravelshop.com.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-900">V. Finalidades Originarias de sus Datos Personales</h2>
            <ul className="list-decimal pl-6 mb-6">
              <li className="mb-2">Para poder brindarle los servicios de compra y venta de productos.</li>
              <li className="mb-2">Para comunicarnos con el Titular.</li>
              <li className="mb-2">Para realizar el cobro de nuestros servicios.</li>
              <li className="mb-2">Para evaluar la calidad del servicio.</li>
              <li className="mb-2">Para dar cumplimiento a obligaciones contraídas con nuestros clientes.</li>
            </ul>

            <div className="mt-12 p-6 bg-purple-50 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-purple-900">Contacto</h2>
              <p className="mb-2"><strong>Domicilio:</strong> Calle José Vasconcelos Ote 345, Piso 22 int 2222 Colonia Santa Engracia, San Pedro Garza García, Nuevo León.</p>
              <p className="mb-2"><strong>Correo electrónico:</strong> contacto@sttravelshop.com</p>
              <p className="mb-2"><strong>Teléfono:</strong> +52-8125120170</p>
              <p className="mt-4 text-sm text-gray-600">Fecha de actualización: 10 de Noviembre de 2021</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
