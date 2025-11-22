<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <div
        class="row q-toolbar pwb-header-top-bar"
        style="min-height: 10px; border-bottom: 1px solid white"
      >
        <div class="col-12">
          <div class="aa-header-area max-ctr">
            <div class="row">
              <div class="col-6 col-sm-6 col-xs-6 pwb-header-left">
                <div class="aa-header-left">
                  <div class="aa-telephone-no float-left">
                    <q-icon
                      class="q-pb-xs q-pr-xs"
                      color="white"
                      name="phone"
                    />
                    <div class="q-pt-xs" style="display: inline-flex">
                      {{ sitedetailsProvider.state.agency.phoneNumberPrimary }}
                    </div>
                  </div>
                  <div class="aa-email hidden-xs float-left">
                    <q-icon
                      class="q-pb-xs q-pr-xs q-pl-md"
                      color="white"
                      name="email"
                    />
                    <div class="q-pt-xs" style="display: inline-flex">
                      {{ sitedetailsProvider.state.agency.emailPrimary }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-sm-6 col-xs-6 pwb-header-right">
                <div class="aa-header-right">
                  <div class="contenedor_idiomas" style="">
                    <ul class="idiomas">
                      <router-link
                        v-for="langNav in langNavs"
                        :key="langNav.shortLocale"
                        active-class="selected"
                        :to="langNav.route"
                        custom
                        v-slot="{ href, navigate, isActive, isExactActive }"
                      >
                        <li
                          :class="[
                            isActive && 'selected',
                            isExactActive && 'router-link-exact-active',
                          ]"
                        >
                          <a
                            :class="langNav.shortLocale"
                            :href="href"
                            @click="navigate"
                          ></a>
                        </li>
                      </router-link>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <q-toolbar class="max-ctr">
        <q-toolbar-title>
          <strong>{{ sitedetailsProvider.state.agency.displayName }}</strong>
        </q-toolbar-title>
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
        </div>
        <q-tabs shrink>
          <q-route-tab
            v-for="topNavLink in topNavLinks"
            :key="topNavLink.id"
            :to="topNavLink.route"
            :label="topNavLink.linkTitle"
            :exact="true"
          />
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container class="bg-grey-2">
      <q-page class="max-ctr">
        <router-view :key="$route.fullPath" />
      </q-page>
    </q-page-container>
    <PwbFooter></PwbFooter>
  </q-layout>
</template>
<script>
import { defineComponent, ref, watch } from "vue"
import { useRoute } from "vue-router"
import axios from "axios"
import PwbFooter from "components/widgets/PwbFooter.vue"

export default defineComponent({
  name: "PublicLayout",
  inject: ["localiseProvider", "sitedetailsProvider"],
  components: { PwbFooter },
  setup() {
    const route = useRoute()
    const publicLocale = ref(route.params.publicLocale)
    const loading = ref(false)
    const error = ref(null)

    return {
      publicLocale,
      loading,
      error,
      route
    }
  },
  computed: {
    langNavs() {
      let supportedLocales =
        this.sitedetailsProvider.state.supportedLocales || []
      let langNavs = []
      supportedLocales.forEach((supportedLocale) => {
        let shortLocale = supportedLocale.split("-")[0]
        langNavs.push({
          shortLocale: shortLocale,
          route: {
            params: {
              publicLocale: shortLocale,
            },
          },
        })
      })
      return langNavs
    },
    topNavLinks() {
      return this.sitedetailsProvider.state.topNavLinkItems
    },
  },
  watch: {
    'route.params.publicLocale': {
      handler(newLocale) {
        if (newLocale) {
          this.fetchData(newLocale)
        }
      },
      immediate: true
    }
  },
  methods: {
    async fetchData(locale) {
      if (!locale) return
      this.loading = true
      this.error = null
      try {
        const [siteDetailsRes, translationsRes] = await Promise.all([
          axios.get('/api_public/v1/site_details', { params: { locale } }),
          axios.get('/api_public/v1/translations', { params: { locale } })
        ])

        const siteDetails = siteDetailsRes.data
        const translations = translationsRes.data

        this.localiseProvider.setLocaleMessages(
          translations.result,
          translations.locale
        )

        let topNavDisplayLinks = siteDetails.top_nav_display_links || []
        this.sitedetailsProvider.setTopNavItems(
          locale,
          topNavDisplayLinks
        )

        let footerDisplayLinks = siteDetails.footer_display_links || []
        this.sitedetailsProvider.setFooterNavItems(
          locale,
          footerDisplayLinks
        )

        this.sitedetailsProvider.setAgency(
          siteDetails.agency,
          siteDetails.supported_locales
        )

      } catch (err) {
        this.error = err
        console.error("Error fetching data:", err)
      } finally {
        this.loading = false
      }
    }
  }
})
</script>
