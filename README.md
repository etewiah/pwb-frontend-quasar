# Quasar App (pwb-frontend-quasar)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/etewiah/pwb-frontend-quasar)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/etewiah/pwb-frontend-quasar)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/etewiah/pwb-frontend-quasar)
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/etewiah/pwb-frontend-quasar)

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

### Production
See [Deployment Documentation](docs/deployment.md).

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
