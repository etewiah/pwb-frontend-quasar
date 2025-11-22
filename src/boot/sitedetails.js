import { reactive, readonly } from 'vue'
import { boot } from 'quasar/wrappers'

const state = reactive({
  locale: "en",
  topNavLinkItems: [],
  footerNavLinkItems: [],
  agency: {
    phoneNumberPrimary: "123-456-7890",
    emailPrimary: "info@example.com",
    displayName: "My Real Estate Agency"
  },
  supportedLocales: ["en", "es"]
})

function setTopNavItems(publicLocale, topNavLinks) {
  // Mock implementation or adaptation of original logic
  state.topNavLinkItems = topNavLinks.map(link => ({
    ...link,
    route: { name: link.routeName, params: { publicLocale } }
  }))
}

// Initialize with some default data
state.topNavLinkItems = [
  { id: 1, linkTitle: "Home", route: { name: "rForSaleSearch" } }, // Temporary route
  { id: 2, linkTitle: "Buy", route: { name: "rForSaleSearch" } },
  { id: 3, linkTitle: "Rent", route: { name: "rForSaleSearch" } }, // Temporary route
]

export const sitedetailsProvider = readonly({
  state,
  setTopNavItems
})

export default boot(({ app }) => {
  app.provide('sitedetailsProvider', sitedetailsProvider)
})
