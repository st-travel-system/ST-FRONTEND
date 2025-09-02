import { Instagram,MapPin, Phone, Clock } from "lucide-react";
import { FaWhatsapp,FaTiktok } from "react-icons/fa";
import Link from 'next/link';
import { FaFacebook } from "react-icons/fa";


export default function Footer() {
  return (
    <>
    <footer className="bg-primary text-white py-12 px-4 rounded-lg mb-8" style={{width:'97%',margin:'0 auto'}}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Section */}
          <div>
            <h3 className="font-outfit text-xl font-semibold mb-4">Contáctanos</h3>
            <div className="space-y-3 text-sm">
              <a href="https://wa.me/528125692214" className="flex items-center gap-2 hover:text-secondary">
                <FaWhatsapp size={20} />
                WhatsApp Mex
              </a>
              <a href="https://wa.me/19563393445" className="flex items-center gap-2 hover:text-secondary">
                <FaWhatsapp size={20} />
                WhatsApp USA
              </a>
              <a href="tel:8124746641" className="flex items-center gap-2 hover:text-secondary">
                <Phone size={20} />
                5281 2474 6641
              </a>
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <div className="flex flex-col">
                  <span>Lunes a Viernes</span>
                  <span>de 10hrs a 19hrs (GMT-5)</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <img src="/mexico.svg" alt="Ubicación" width={'20px'} className="flex-shrink-0 h-5" />
                <div className="flex flex-col">
                  <span>San Pedro Garza García, N.L., México</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <img src="/eeuu.svg" alt="Ubicación" className="mt-2 flex-shrink-0 h-5"/>
                <div className="flex flex-col">
                  <span className="mt-2">Florida, Estados Unidos</span>
                </div>
              </div>

            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-outfit text-xl font-semibold mb-4">Formas de pago</h3>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2">
                <img src="/lovable-uploads/3e6e789d-4ff7-4652-a914-54d0279d1e87.png" alt="Payment Methods" className="h-8" />
              </div>
              <p>Transferencia bancaria</p>
              <div className="space-y-1">
                <p className="font-semibold">Cuentas oficiales:</p>
                <p>SASCA TUR S.A de C.V en México</p>
                <p>ST TRAVEL SASCATUR LLC en USA</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          {/* <div>
            <h3 className="font-outfit text-xl font-semibold mb-4">¡SÍGUENOS!</h3>
            <div className="flex gap-4">
              <a href="https://wa.me/8124746641" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full p-2 hover:bg-secondary transition-colors">
                <Phone size={24} className="text-primary" />
              </a>
              <a href="https://www.tiktok.com/@sttravelshop" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full p-2 hover:bg-secondary transition-colors">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/sttravelshop" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full p-2 hover:bg-secondary transition-colors">
                <Instagram size={24} className="text-primary" />
              </a>
            </div>
          </div> */}

          {/* Certifications */}
          <div>
            <h3 className="font-outfit text-xl font-semibold mb-4">Certificados y avalados por:</h3>
            <img src="/lovable-uploads/60a7ef3d-1234-46f1-88e4-e4b320296998.png" alt="SECTUR Logo" className="h-16" />
          </div>
        </div>
    </div>
    </footer>
     <div className="mt-8 mb-10 text-center bg-primary text-white py-8 px-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center" style={{width:'97%',margin:'0 auto',marginTop:'20px'}}>
       {/* Redes sociales - arriba en móvil, derecha en desktop */}
       <div className="flex justify-center gap-4 mb-4 md:mb-0 md:order-2">
         <a href="https://www.instagram.com/sttravelshop" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full p-2 hover:bg-secondary transition-colors">
           <Instagram size={24} className="text-primary" />
         </a>
         <a href="https://www.tiktok.com/@sttravelshop" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full p-2 hover:bg-secondary transition-colors">
           <FaTiktok size={24} className="text-primary" />
         </a>
         <a href="https://www.facebook.com/sttravelshop/" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full p-2 hover:bg-secondary transition-colors">
           <FaFacebook size={24} className="text-primary" />
         </a>
       </div>
       {/* Texto legal */}
       <p className="text-white text-sm md:order-1 md:text-left text-center">
         2025 ST Travel Shop.<br className="block md:hidden" />
         <Link href="/privacy" className="text-white hover:text-secondary">
           Aviso de privacidad
         </Link>{" "}
         &{" "}
         <Link href="/terms" className="text-white hover:text-secondary">
           Términos y Condiciones
         </Link>
       </p>
     </div>
   </>
  );
};
