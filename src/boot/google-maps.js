import { boot } from 'quasar/wrappers'
import VueGoogleMaps from '@fawmi/vue-google-maps'

export default boot(({ app }) => {
  app.use(VueGoogleMaps, {
    load: {
      key: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with actual key found or env var
    },
  })
})
