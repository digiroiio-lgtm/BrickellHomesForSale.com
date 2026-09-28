import type { Metadata } from 'next';
import { metadataFor } from '@/lib/seo';
import { trust } from '@/lib/trust-content';
import { TrustPage } from '@/components/TrustPage';

export const metadata: Metadata = metadataFor('/editorial-standards/',trust['editorial-standards'].title,trust['editorial-standards'].description);
export default function Page() { return <TrustPage slug="editorial-standards"/>; }
