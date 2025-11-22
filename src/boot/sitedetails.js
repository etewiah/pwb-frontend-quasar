import { boot } from 'quasar/wrappers'
import { sitedetailsProvider } from 'src/composables/sitedetails-provider.js'

export default boot(({ app }) => {
  app.provide('sitedetailsProvider', sitedetailsProvider)
})
