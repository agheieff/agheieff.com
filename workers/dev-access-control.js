export default {
  async fetch(request, env) {
    const ALLOWED_IP = '78.80.80.228';
    
    // Get the client IP from Cloudflare headers
    const clientIP = request.headers.get('CF-Connecting-IP');
    
    // Check if the IP matches
    if (clientIP !== ALLOWED_IP) {
      return new Response('Not Found', { status: 404 });
    }
    
    // If IP matches, fetch the actual page content
    const url = new URL(request.url);
    url.hostname = '26d65a79.agheieff-com.pages.dev'; // Pages preview deployment URL
    
    // Ensure proper path handling for directory routes
    let path = url.pathname;
    if (path === '/svatba') {
        path = '/svatba/';
    } else if (path === '/svatba/foto') {
        path = '/svatba/foto/';
    }
    url.pathname = path;
    
    return fetch(url.toString(), request);
  }
};