// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Configuración de redirecciones
  async redirects() {
    return [
      // Redirección de la antigua página de contacto a la nueva página de FAQ
      {
        source: '/contacto',
        destination: '/faqs',
        permanent: true, // 308 redirección permanente
      },
      
      // Redirección de la antigua página nosotros a la nueva página de FAQ
      {
        source: '/nosotros',
        destination: '/faqs',
        permanent: true, // 308 redirección permanente
      },
      
      // Redirección de tours3 a la página de inicio
      {
        source: '/tours3',
        destination: '/',
        permanent: true, // 308 redirección permanente
      },
      
      // Redirección de servicios a itinerario-medida
      {
        source: '/servicios',
        destination: '/itinerario-medida',
        permanent: true, // 308 redirección permanente
      },
      
      // Puedes añadir más redirecciones específicas aquí
    ];
  },
};

module.exports = nextConfig;
