// Prerender all routes at build time. Cloudflare serves them as static HTML
// with no Worker invocation, fastest possible delivery.
export const prerender = true;
export const trailingSlash = 'never';
