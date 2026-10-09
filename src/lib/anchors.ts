/** Stable, readable fragment id for a heading, so a section can be linked and cited directly. */
export const anchorId = (text: string): string => text.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
