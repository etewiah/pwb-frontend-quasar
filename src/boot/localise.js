import { boot } from 'quasar/wrappers'

// Mock localisation provider
const localiseProvider = {
  $ft: (key) => key.split('.').pop().replace(/_/g, ' '),
  $t: (key) => key
}

export default boot(({ app }) => {
  app.provide('localiseProvider', localiseProvider)
})
