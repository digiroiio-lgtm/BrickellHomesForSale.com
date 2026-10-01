import { buildingBySlug, buildings } from '@/lib/buildings';
import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Brickell building guide';
export const size = ogSize;
export const contentType = ogContentType;
export function generateStaticParams() { return buildings.map(b => ({ slug: b.slug })); }

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = buildingBySlug[slug];
  return ogImage({ eyebrow: b ? `Building guide / ${b.area}` : 'Building guide', title: b ? `${b.name}: Brickell building guide` : 'Brickell building guide', note: 'Source-linked facts and buyer questions • No listings or prices' });
}
