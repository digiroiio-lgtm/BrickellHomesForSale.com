'use client';

import { useRef } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { StructuredData } from '@/lib/seo';

export function HeadStructuredData({ data }: { data: Record<string, unknown> }) {
  const inserted = useRef(false);

  useServerInsertedHTML(() => {
    if (inserted.current) return null;
    inserted.current = true;
    return <StructuredData data={data} />;
  });

  return null;
}
