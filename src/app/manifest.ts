import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: 'Brickell Homes',
    description: site.description,
    start_url: '/',
    display: 'browser',
    background_color: '#f7f5ee',
    theme_color: '#16333a',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }, { src: '/apple-icon', sizes: '180x180', type: 'image/png' }]
  };
}
