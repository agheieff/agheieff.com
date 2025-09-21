# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a wedding website for Arkadiy and Naomi, hosted at agheieff.com via Cloudflare Pages. The site features an elegant, no-JavaScript design with a focus on typography and animation using pure CSS.

## Architecture

### Directory Structure
- `/` - Root redirect page that forwards to `/svatba`
- `/svatba/` - Main Czech wedding page
- `/svatba/ru/` - Russian language version
- `/svatba/assets/` - Static assets (CSS, fonts, photos)
- `/workers/` - Cloudflare Workers scripts (dev access control)
- `wrangler.toml` - Cloudflare Workers configuration
- `.gitignore` - Configured to only track specific file types

### Key Features
1. **Animated Circle Logo**: CSS-based rotating text animation with individual character timing
2. **Multilingual Support**: Czech (primary) and Russian versions
3. **No JavaScript**: Pure CSS and HTML implementation
4. **Custom Typography**: EB Garamond font family with multiple weights

## Cloudflare Pages Configuration

The site is deployed to Cloudflare Pages:
- **Project Name**: agheieff-com
- **Custom Domain**: agheieff.com
- **Pages Domain**: agheieff-com.pages.dev
- **Git Integration**: Yes (connected to GitHub repo agheieff/agheieff.com)

## Development Commands

### Local Development
Since this is a static site with no build process:
```bash
# View locally (any static server will work)
python3 -m http.server 8000
# or
npx http-server
```

### Deployment
Cloudflare Pages automatically deploys on git push:
- Push to `main` → deploys to agheieff.com
- Push to `dev` → deploys to dev.agheieff.com (with IP protection)

Manual deployment (if needed):
```bash
# Deploy to Cloudflare Pages
wrangler pages deploy . --project-name=agheieff-com

# View deployment logs
wrangler pages deployment tail

# List all deployments
wrangler pages deployment list --project-name=agheieff-com
```

## CSS Architecture

The site uses CSS custom properties extensively for theming and responsive design:
- **Color Scheme**: Burgundy (#801010) navigation with light backgrounds
- **Responsive Units**: Uses `max()`, `calc()`, and viewport units
- **Animation System**: CSS animations for rotating text and menu transitions
- **Font Loading**: WOFF2 fonts with specific feature settings

### Important CSS Variables
- `--nav-color`: Primary burgundy color
- `--side-menu-animation-time`: 0.35s for smooth transitions
- `--line-animation-time`: 1.5s for decorative lines
- `--content-width`: 800px max content width

## Key Implementation Details

### Rotating Text Animation
Each character in the circle has a calculated `--d` CSS variable for rotation timing. The calculation appears to be done in `rotation_calc.ods` spreadsheet.

### Language Switching
Simple href-based switching between `/svatba` and `/svatba/ru` with a language toggle in the navigation.

### Mobile Responsiveness
- Burger menu for mobile navigation
- Media queries at 500px and 918px breakpoints
- Viewport-relative sizing for key elements

## Development Environment

### Branch Strategy
- `main` branch: Production (agheieff.com)
- `dev` branch: Development (dev.agheieff.com)

### dev.agheieff.com Setup
The dev subdomain is protected by IP-based access control using a Cloudflare Worker:
- Only accessible from IP: 78.80.80.56
- Returns 404 for all other IPs
- Worker code in `/workers/dev-access-control.js`
- Configured in `wrangler.toml`

To deploy changes to the worker:
```bash
wrangler deploy --env production
```

### Updating IP Access
When your IP changes, update the worker:
1. Edit `/workers/dev-access-control.js` with new IP
2. Deploy: `wrangler deploy --env production`
3. Commit and push changes to keep git in sync

## Important Notes

- The author explicitly states "I don't like JavaScript" - NO JavaScript should be used
- The site prioritizes elegance and typography over complex functionality
- Photos are already optimized and stored in `/svatba/assets/photos/`
- The wedding date was October 12, 2024
- don't read the full index.html file, it has over 4500 lines, just do head or tail or whatever every time you need to read it