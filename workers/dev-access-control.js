export default {
  async fetch(request, env) {
    
    // If IP matches, fetch the actual page content
    const url = new URL(request.url);
    url.hostname = '94e9a883.agheieff-com.pages.dev'; // Pages preview deployment URL
    
    // Ensure proper path handling for directory routes
    let path = url.pathname;
    if (path === '/svatba') {
        path = '/svatba/';
    } else if (path === '/svatba/foto') {
        path = '/svatba/foto/';
    }
    url.pathname = path;

    const response = await fetch(url.toString(), request);

    // If this is an HTML response and the original URL doesn't end with a slash
    // but we're serving directory content, add a base tag to fix relative paths
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
        const originalUrl = new URL(request.url);
        const originalPath = originalUrl.pathname;

        // Check if original path doesn't end with slash but we're serving directory content
        if (!originalPath.endsWith('/') && url.pathname.endsWith('/')) {
            const text = await response.text();
            // Add base tag with the correct directory path (with trailing slash)
            const basePath = originalPath + '/';
            const modifiedText = text.replace(
                '<head>',
                `<head><base href="${basePath}">`
            );

            return new Response(modifiedText, {
                status: response.status,
                headers: response.headers
            });
        }
    }

    return response;
  }
};