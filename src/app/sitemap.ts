import { MetadataRoute } from 'next';
import { siteUrl } from '@/config/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  return [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/contacto`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Agregar más URLs aquí cuando tengas más páginas
    // {
    //   url: `${siteUrl}/productos`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly',
    //   priority: 0.9,
    // },
    // {
    //   url: `${siteUrl}/nosotros`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly',
    //   priority: 0.7,
    // },
  ];
}
