import { boot } from 'quasar/wrappers'
import { localiseProvider } from 'src/composables/localise-provider.js'

export default boot(({ app }) => {
  app.provide('localiseProvider', localiseProvider)
})
