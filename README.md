# Quasar App (pwb-frontend-quasar)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/etewiah/pwb-frontend-quasar)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/etewiah/pwb-frontend-quasar)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/etewiah/pwb-frontend-quasar)
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/etewiah/pwb-frontend-quasar)

A Quasar Project built with Vue.js and Vite.

## Getting Started

This project is a frontend application built with the Quasar Framework. It includes a basic setup for local development and production deployments.

### Project Structure

The project is organized as follows:

- `src/`: Contains the main source code for the application.
- `src/components/`: Contains reusable Vue components.
- `src/layouts/`: Contains the main layout for the application.
- `src/pages/`: Contains the pages for the application.
- `src/router/`: Contains the Vue Router configuration.
- `src/stores/`: Contains the Pinia store for state management.
- `public/`: Contains static assets that are copied directly to the build output.
- `docs/`: Contains additional documentation for the project.

### Configuration

This application allows you to configure the backend URL without changing the source code.

#### Local Development
1.  Copy `app-config.template.json` to `app-config.json`.
2.  Edit `app-config.json` and set your `backendUrl`.
    ```json
    {
      "backendUrl": "http://localhost:3000"
    }
    ```
3.  `app-config.json` is ignored by git, so your local settings won't be committed.

#### Production
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

## Technologies Used

- [Quasar Framework](https://quasar.dev/): A Vue.js based framework for building high-performance, responsive websites, PWAs, SSR, mobile and desktop apps.
- [Vue.js](https://vuejs.org/): A progressive JavaScript framework for building user interfaces.
- [Vite](https://vitejs.dev/): A build tool that aims to provide a faster and leaner development experience for modern web projects.
- [Pinia](https://pinia.vuejs.org/): The recommended state management library for Vue.js.
- [Vue Router](https://router.vuejs.org/): The official router for Vue.js.
- [Axios](https://axios-http.com/): A promise-based HTTP client for the browser and Node.js.
- [Leaflet](https://leafletjs.com/): An open-source JavaScript library for mobile-friendly interactive maps.
- [Bootstrap](https://getbootstrap.com/): A popular CSS framework for developing responsive and mobile-first websites.

## Contribution Guidelines

We welcome contributions from the community! If you'd like to contribute to the project, please follow the guidelines in our [CONTRIBUTING.md](CONTRIBUTING.md) file.
