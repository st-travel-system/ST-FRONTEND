import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { CalendarRange, Hotel, Map, Plane, Shield } from "lucide-react";

import { DOMAIN_FRONT } from "../../../env";

export default function CustomItinerary() {
  // const navigate = useNavigate();

  return (
    <div className="bg-accent py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-left mb-8">
              <h3 className="text-4xl font-outfit font-bold mb-4">Haz match con tu estilo de viaje.</h3>
              <p className="text-lg text-gray-600 mb-8">
                En ST Travel diseñamos tres tipos de servicio para diferentes estilos de viaje. Tú eliges como vivir tu próxima aventura.
              </p>
            </div>

            <div className="space-y-6">
              <ul className="space-y-4" style={{marginBottom:'70px'}}>
                <li className="flex items-center gap-3">
                  <Map className="text-primary w-6 h-6 shrink-0" />
                  <div>
                    <span className="font-bold text-xl">Tours o circuitos</span>
                    <p className="text-gray-500 mt-2">Para los que quieren un viaje guiado, listo y sin complicaciones</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <CalendarRange className="text-primary w-6 h-6 shrink-0" />
                  <div>
                    <span className="font-bold text-xl">Viajes a la medida</span>
                    <p className="text-gray-500 mt-2">Para los que quieren una experiencia personalizada.</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Plane className="text-primary w-6 h-6 shrink-0" />
                  <div>
                    <span className="font-bold text-xl">Viajes de lujo</span>
                    <p className="text-gray-500 mt-2">Para los que quieren exclusividad y servicios de alta gama.</p>
                  </div>
                </li>
              </ul>

              <div className="mt-14 text-center">
              <a 
  className="w-96 px-24 sm:px-48 py-4 bg-[rgb(45,10,68)] text-white text-xl font-medium rounded-lg hover:bg-[rgb(65,20,88)] transition"
  href={DOMAIN_FRONT+'itinerario-medida'}
>
  Ver servicios
</a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop" 
                alt="París, Francia" 
                className="w-full h-[500px] object-cover"  // Ajusta el tamaño
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
