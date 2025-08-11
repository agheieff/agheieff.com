export default {
  async fetch(request, env) {
    const ALLOWED_IP = '78.80.80.56';
    
    // Get the client IP from Cloudflare headers
    const clientIP = request.headers.get('CF-Connecting-IP');
    
    // Check if the IP matches
    if (clientIP !== ALLOWED_IP) {
      return new Response('Not Found', { status: 404 });
    }
    
    // If IP matches, fetch the actual page content
    const url = new URL(request.url);
    url.hostname = '4fdfb273.agheieff-com.pages.dev'; // Pages preview deployment URL
    
    return fetch(url.toString(), request);
  }
};