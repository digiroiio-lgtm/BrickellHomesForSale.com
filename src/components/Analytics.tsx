'use client';

import Script from 'next/script';

declare global { interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[])=>void } }

export function event(name: string, params?: Record<string,string>) {
  if (typeof window !== 'undefined' && window.gtag) window.gtag('event',name,params ?? {});
}

export function Analytics() {
  const id = 'G-KRJFRNMYM5';
  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
    <Script id="ga4-config" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}');`}</Script>
  </>;
}
