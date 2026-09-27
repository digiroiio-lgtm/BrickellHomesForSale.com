'use client';

import { event } from './Analytics';

export function TrackLink({href,kind,children}:{href:string;kind:'whatsapp_click'|'email_click';children:React.ReactNode}) {
  return <a href={href} onClick={()=>event(kind,{landing_page:window.location.pathname})}>{children}</a>;
}
