import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

// Search, answer and training crawlers are welcome: the content is meant to be cited. Only the form endpoint is closed.
const aiCrawlers = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'Meta-ExternalAgent', 'cohere-ai', 'CCBot', 'Amazonbot', 'DuckAssistBot'
];

export default function robots():MetadataRoute.Robots{
  return {
    rules:[
      {userAgent:'*',allow:'/',disallow:'/api/'},
      {userAgent:aiCrawlers,allow:'/',disallow:'/api/'}
    ],
    sitemap:`${site.origin}/sitemap.xml`
  };
}
