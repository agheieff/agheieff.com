# Deployment Procedure

## Standard Deployment Flow

1. **Make changes** to files in the repository
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin dev
   ```

3. **Cloudflare Pages** automatically builds and deploys from GitHub
4. **Check deployment status**:
   ```bash
   wrangler pages deployment list --project-name=agheieff-com
   ```

5. **Update worker** with the latest deployment ID:
   - Find the latest deployment ID from the list above
   - Edit `workers/dev-access-control.js` line 15
   - Update the `url.hostname` to match the new deployment ID

6. **Deploy the updated worker**:
   ```bash
   wrangler deploy --env production
   ```

## Worker Configuration

The worker (`workers/dev-access-control.js`) controls access to `dev.agheieff.com` and must point to the correct Pages deployment URL.

**Format**: `https://{deployment-id}.agheieff-com.pages.dev`

## Common Issues

- **404 errors**: Worker points to wrong/non-existent deployment ID
- **Build failures**: Check Cloudflare Pages dashboard for build logs
- **Worker not updating**: Ensure `wrangler deploy --env production` completes successfully

## Notes

- The worker only allows access from IP: `78.80.80.56`
- Production site (`agheieff.com`) deploys from `main` branch
- Development site (`dev.agheieff.com`) deploys from `dev` branch