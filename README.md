# Quasar App (pwb-frontend-quasar)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/etewiah/pwb-frontend-quasar)

A Quasar Project

## Configuration

This application allows you to configure the backend URL without changing the source code.

### Local Development
1.  Copy `app-config.template.json` to `app-config.json`.
2.  Edit `app-config.json` and set your `backendUrl`.
    ```json
    {
      "backendUrl": "http://localhost:3000"
    }
    ```
3.  `app-config.json` is ignored by git, so your local settings won't be committed.

### Production (Netlify)
When deploying to Netlify, the application will automatically generate the necessary redirect rules to proxy API requests to your backend.

You can configure the backend URL in two ways:
1.  **Environment Variable**: Set `BACKEND_URL` in your Netlify site settings. This takes precedence.
2.  **Config File**: If `BACKEND_URL` is not set, the build script will look for `app-config.json` (if you committed it, which is not recommended for secrets) or fall back to `app-config.template.json`.

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
