import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Brickell Homes For Sale: independent buyer guides for Brickell, Miami';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: 'Brickell / Miami / Florida', title: 'Brickell homes for sale: independent buyer guides' });
}
