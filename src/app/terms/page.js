'use client';
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Terms() {
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm}/>
      <main className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-purple-900">TÉRMINOS Y CONDICIONES</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6">
              Este contrato describe los términos y condiciones generales (los "Términos y Condiciones") aplicables al uso de los servicios ofrecidos por SASCA TUR S.A. DE C.V, así como sus empresas filiales y subsidiarias (los "Servicios") dentro del sitio https://sttravelshop.com (el "Sitio"). Cualquier persona que desee acceder y/o usar el Sitio o los servicios podrá hacerlo sujetándose a los Términos y Condiciones, junto con todas las demás políticas y principios que rigen SASCA TUR S.A. DE C.V., sus empresas filiales y subsidiarias ("Sasca Tur").
            </p>

            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <p className="font-semibold text-purple-900">
                Cualquier persona que no acepte estos términos y condiciones generales, los cuales tienen un carácter obligatorio y vinculante, deberá abstenerse de utilizar el sitio y/o los servicios.
              </p>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-900">I. DEFINICIONES</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2"><strong>Aplicaciones:</strong> Programas y/o herramientas de cómputo propiedad de Sasca Tur y/o de algún tercero que esté debidamente legitimado para ejercer derechos respecto a tales programas y/o herramientas.</li>
              <li className="mb-2"><strong>Contrato:</strong> El presente contrato de Términos y Condiciones.</li>
              <li className="mb-2"><strong>Contenidos:</strong> Es cualquier tipo de textos, fotografías, gráficos, imágenes, iconos, tecnología, software, links y demás contenidos audiovisuales.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-900">II. OBJETO</h2>
            <p className="mb-6">
              Por medio del presente Sitio, se otorga a los Usuarios las facilidades que se requieren para que éstos tengan acceso y puedan utilizar aquellas Aplicaciones y Contenidos disponibles en el mismo y tener acceso a información con respecto los servicios de agencia de viajes que presta Sasca Tur.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-900">III. SUJETOS DE LOS PRESENTES TÉRMINOS</h2>
            <p className="mb-6">
              Sasca Tur por medio de su página web, https://sttravelshop.com informa que la adquisición de bienes a través de la tienda en línea del Sitio Web se encuentra reservada para mayores de dieciocho (18) años en pleno ejercicio de su capacidad legal.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-900">IV. CONDICIONES ESPECÍFICAS DE USO DE LOS SERVICIOS</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-800">Políticas importantes:</h3>
              <ul className="list-disc pl-6">
                <li className="mb-3"><strong>Reembolsos:</strong> Una vez confirmada la compra, no se aceptan solicitudes de reembolsos.</li>
                <li className="mb-3"><strong>Cancelaciones:</strong> En caso de una cancelación por parte del proveedor debido a razones de fuerza mayor, la Aventura será reprogramada en la fecha próxima disponible.</li>
                <li className="mb-3"><strong>Promociones:</strong> Las promociones y descuentos no podrán aplicarse de manera acumulable para las reservaciones.</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-900">XV. CUENTA BANCARIA</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="mb-4">Los pagos realizados por los Usuarios deberán realizarse única y exclusivamente a través de transferencias electrónicas o depósitos bancarios a la siguiente cuenta:</p>
              <ul className="list-none">
                <li><strong>Banco:</strong> BANORTE</li>
                <li><strong>Titular:</strong> SASCA TUR SA DE CV</li>
                <li><strong>Número de Cuenta:</strong> 0683571765</li>
                <li><strong>CLABE:</strong> 072580006835717654</li>
                <li><strong>Dirección:</strong> Calle José Vasconcelos Ote 345, Piso 22 int 2222 Colonia Santa Engracia, San Pedro Garza García, Nuevo León.</li>
              </ul>
            </div>

            <div className="mt-12 p-6 bg-purple-50 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-purple-900">Contacto para Reclamaciones</h2>
              <p className="mb-2">Para cualquier queja o reclamación, puede contactarnos a:</p>
              <p className="mb-2"><strong>Correo electrónico:</strong> contacto@sttravelshop.com</p>
              <p className="mb-2"><strong>Teléfono:</strong> +52-8125120170</p>
              <p className="mt-4 text-sm text-gray-600">Última actualización: 10 de Noviembre de 2021</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
