import { guideBySlug, guides } from '@/lib/content';
import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Brickell Homes For Sale buyer guide';
export const size = ogSize;
export const contentType = ogContentType;
export function generateStaticParams() { return guides.map(g => ({ slug: g.slug })); }

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug[slug];
  return ogImage({ eyebrow: g?.eyebrow ?? 'Buyer guide', title: g?.title ?? 'Brickell buyer guide' });
}
