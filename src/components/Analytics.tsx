'use client';

import { useEffect } from 'react';

declare global { interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[])=>void } }

const id = 'G-KRJFRNMYM5';
const interactionEvents = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const;

export function event(name: string, params?: Record<string,string>) {
  if (typeof window !== 'undefined' && window.gtag) window.gtag('event',name,params ?? {});
}

// The gtag stub is defined immediately so events queue in dataLayer; the 170 KiB library itself loads on the first
// interaction or after a short idle delay, keeping it off the critical rendering and main-thread path.
export function Analytics() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    // gtag.js requires an Arguments object, not a rest array.
    // eslint-disable-next-line prefer-rest-params
    window.gtag = function gtag() { window.dataLayer!.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id);

    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      interactionEvents.forEach(name => window.removeEventListener(name, load));
      window.clearTimeout(timer);
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.appendChild(script);
    };
    interactionEvents.forEach(name => window.addEventListener(name, load, { once: true, passive: true }));
    const timer = window.setTimeout(load, 5000);
    return () => { interactionEvents.forEach(name => window.removeEventListener(name, load)); window.clearTimeout(timer); };
  }, []);
  return null;
}
