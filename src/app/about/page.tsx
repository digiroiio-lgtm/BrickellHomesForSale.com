import type { Metadata } from 'next';
import { metadataFor } from '@/lib/seo';
import { trust } from '@/lib/trust-content';
import { TrustPage } from '@/components/TrustPage';

export const metadata: Metadata = metadataFor('/about/',trust['about'].title,trust['about'].description);
export default function Page() { return <TrustPage slug="about"/>; }
