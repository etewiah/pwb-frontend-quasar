# Deployment

## Production (Netlify)
When deploying to Netlify, the application will automatically generate the necessary redirect rules to proxy API requests to your backend.

You can configure the backend URL in two ways:
1.  **Environment Variable**: Set `BACKEND_URL` in your Netlify site settings. This takes precedence.
2.  **Config File**: If `BACKEND_URL` is not set, the build script will look for `app-config.json` (if you committed it, which is not recommended for secrets) or fall back to `app-config.template.json`.
