import type { Metadata } from 'next';
import Link from 'next/link';
import { metadataFor } from '@/lib/seo';

export const metadata: Metadata = metadataFor('/privacy/', 'Privacy notice', 'How Brickell condo inquiry and analytics data are handled.');

const operator = process.env.NEXT_PUBLIC_SITE_OPERATOR_NAME?.trim();
const contact = process.env.NEXT_PUBLIC_PRIVACY_CONTACT_EMAIL?.trim();
const recipient = process.env.NEXT_PUBLIC_LEAD_RECIPIENT_NAME?.trim();
const retention = process.env.NEXT_PUBLIC_LEAD_RETENTION_PERIOD?.trim();
const detailsComplete = Boolean(operator && contact && recipient && retention);

export default function Privacy() {
  return <div className="wrap page-header legal">
    <Link href="/">← Home</Link>
    <h1>Privacy notice</h1>
    <p>Last updated 27 September 2026</p>
    {!detailsComplete && <p><strong>Inquiry service is not ready:</strong> the operator, privacy contact, receiving party and retention period must be published before buyer requests can be accepted. The form cannot deliver an inquiry while this information is missing.</p>}
    <h2>Who runs this site</h2>
    <p>{operator || 'The site operator has not yet been identified for publication.'}</p>
    <h2>What an inquiry contains</h2>
    <p>The form asks for your name, email, phone or WhatsApp number, country, budget, bedrooms, property type, preferred area or building, buying timeline, cash or mortgage preference and optional message. It also sends the page you used, the guide topic, a budget category and any campaign parameters (UTM source, medium, campaign, term and content). A session may remember those campaign parameters while you browse this site. Please do not include identity documents or sensitive financial details in your message.</p>
    <h2>How an inquiry is handled</h2>
    <p>If delivery is enabled, the site sends your request over HTTPS to its configured receiver so it can be answered. The application requires that receiver to acknowledge delivery before it shows a success message; it does not maintain its own lead database. The intended receiving party is {recipient || 'not yet identified for publication'}. Until a secure destination and the identifying details on this page are configured, submissions receive an unavailable response rather than a confirmation.</p>
    <h2>Retention and your requests</h2>
    <p>{retention ? `Inquiry retention: ${retention}. ` : 'The retention period and deletion process have not yet been confirmed. '}For questions about access, correction or deletion, {contact ? <>email <a href={`mailto:${contact}`}>{contact}</a>.</> : 'a privacy contact must be published before inquiry delivery is enabled.'}</p>
    <h2>Analytics</h2>
    <p>If a Google Analytics 4 measurement ID is configured, this site loads Google Analytics and can send page and interaction events, including form start, successful form submission, availability request, email click and WhatsApp click. Do not configure analytics until the operator has reviewed the relevant consent and privacy requirements. Form inquiries and analytics events are separate from any live property inventory.</p>
  </div>;
}
