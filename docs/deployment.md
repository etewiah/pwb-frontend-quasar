# Deployment

## Production (Netlify)
When deploying to Netlify, the application will automatically generate the necessary redirect rules to proxy API requests to your backend.

You can configure the backend URL in two ways:
1.  **Environment Variable**: Set `BACKEND_URL` in your Netlify site settings. This takes precedence.
2.  **Config File**: If `BACKEND_URL` is not set, the build script will look for `app-config.json` (if you committed it, which is not recommended for secrets) or fall back to `app-config.template.json`.

## Heroku
This application includes a `server.js` file to serve the static assets and a `Procfile` for Heroku deployment.

1.  Click the "Deploy to Heroku" button in the README.
2.  Or, using the Heroku CLI:
    ```bash
    heroku create
    git push heroku main
    ```

## Fly.io
This application includes a `Dockerfile` which makes it easy to deploy to Fly.io.

1.  Install `flyctl`.
2.  Run `fly launch` in the project directory.
3.  Follow the prompts to configure and deploy your app.
