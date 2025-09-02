import { MetadataRoute } from 'next'
 
// Esta es una función de ejemplo para obtener los tours.
// Deberías reemplazarla con tu propia lógica para obtener datos.
async function getAllTours(): Promise<{ id: string; updatedAt: string }[]> {
  // Ejemplo: Llama a tu API para obtener todos los tours
  // const res = await fetch('https://.../tours')
  // const tours = await res.json()
  // return tours.map(tour => ({ id: tour.slug, updatedAt: tour.updated_at }))

  // Datos de ejemplo
  return [
    { id: 'tour-ejemplo-1', updatedAt: new Date().toISOString() },
    { id: 'tour-ejemplo-2', updatedAt: new Date().toISOString() },
  ]
}

// Esta es una función de ejemplo para obtener las categorías.
async function getAllCategories(): Promise<{ slug: string; updatedAt: string }[]> {
  // Ejemplo: Llama a tu API para obtener todas las categorías
  // const res = await fetch('https://.../categories')
  // const categories = await res.json()
  // return categories.map(category => ({ slug: category.slug, updatedAt: category.updated_at }))
  
  // Datos de ejemplo
  return [
    { slug: 'europa', updatedAt: new Date().toISOString() },
    { slug: 'medio-oriente', updatedAt: new Date().toISOString() },
    { slug: 'paris', updatedAt: new Date().toISOString() },
    { slug: 'italia', updatedAt: new Date().toISOString() },
    { slug: 'suiza', updatedAt: new Date().toISOString() },
    { slug: 'mas-solicitados', updatedAt: new Date().toISOString() },
    { slug: 'tendencia-2025', updatedAt: new Date().toISOString() },
    { slug: 'londres', updatedAt: new Date().toISOString() },
    { slug: 'madrid', updatedAt: new Date().toISOString() },
    { slug: 'amsterdam', updatedAt: new Date().toISOString() },
    { slug: 'ciudades-imperiales', updatedAt: new Date().toISOString() },
    { slug: 'noruega', updatedAt: new Date().toISOString() },
    { slug: 'finlandia', updatedAt: new Date().toISOString() },
    { slug: 'asia', updatedAt: new Date().toISOString() },
    { slug: 'africa', updatedAt: new Date().toISOString() },
    { slug: 'nordicos', updatedAt: new Date().toISOString() },
    { slug: 'belgica', updatedAt: new Date().toISOString() },
    { slug: 'croacia', updatedAt: new Date().toISOString() },
    { slug: 'los-balcanes', updatedAt: new Date().toISOString() },
    { slug: 'gran-bretana', updatedAt: new Date().toISOString() },
    { slug: 'grecia', updatedAt: new Date().toISOString() },
    { slug: 'egipto', updatedAt: new Date().toISOString() },
    { slug: 'marruecos', updatedAt: new Date().toISOString() },
    { slug: 'dubai', updatedAt: new Date().toISOString() },
    { slug: 'turquia', updatedAt: new Date().toISOString() },
    { slug: 'safaris', updatedAt: new Date().toISOString() },
    { slug: 'experiencias-desierto', updatedAt: new Date().toISOString() },
    { slug: 'playas', updatedAt: new Date().toISOString() },
    { slug: 'arte-y-cultura', updatedAt: new Date().toISOString() },
    { slug: 'camino-santiago', updatedAt: new Date().toISOString() },
  ]
}
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = 'https://www.sttravelshop.com';

  // Obtener todos los tours y categorías
  const tours = await getAllTours();
  const categories = await getAllCategories();

  const tourUrls = tours.map(tour => ({
    url: `${siteUrl}/tour/${tour.id}`,
    lastModified: new Date(tour.updatedAt),
  }));

  const categoryUrls = categories.map(category => ({
    url: `${siteUrl}/tours/${category.slug}`,
    lastModified: new Date(category.updatedAt),
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/faqs`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/itinerario-medida`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date(),
    },
    ...tourUrls,
    ...categoryUrls,
  ]
}
