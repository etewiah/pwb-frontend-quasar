<template>
  <q-page>
  <div class="q-ma-md">
    <div class="row">
      <div class="col-12">
        <ViewContainer :currentListing="currentListing"></ViewContainer>
      </div>
    </div>
  </div>
  </q-page>
</template>
<script>
import ViewContainer from "components/listings/ViewContainer.vue"
import { defineComponent, ref, watch } from "vue"
import { useRoute } from "vue-router"
import axios from "axios"

export default defineComponent({
  name: "ListingView",
  components: {
    ViewContainer,
  },
  computed: {
    currentListing() {
      let currentListing = {}
      if (this.error) {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: this.error.message,
          icon: "report_problem",
        })
      } else {
        currentListing = this.listingData || {}
      }
      return currentListing
    },
  },
  setup() {
    const route = useRoute()
    let listingSlug = route.params.listingSlug
    const publicLocale = ref(route.params.publicLocale)
    
    const loading = ref(false)
    const error = ref(null)
    const listingData = ref(null)

    const fetchProperty = async (locale) => {
      // if (!locale) return
      loading.value = true
      error.value = null
      try {
        const response = await axios.get(`/api_public/v1/properties/${listingSlug}`, {
          params: { locale }
        })
        
        // Transform snake_case API response to camelCase
        const prop = response.data
        listingData.value = {
          id: prop.id,
          title: prop.title,
          description: prop.description,
          reference: prop.reference,
          countBedrooms: prop.count_bedrooms,
          countBathrooms: prop.count_bathrooms,
          countGarages: prop.count_garages,
          constructedArea: prop.constructed_area,
          plotArea: prop.plot_area,
          priceSaleCurrentCents: prop.price_sale_current_cents,
          priceRentalMonthlyCurrentCents: prop.price_rental_monthly_current_cents,
          currency: prop.currency || prop.price_sale_current_currency,
          propTypeKey: prop.prop_type_key,
          forSale: prop.for_sale,
          forRentLongTerm: prop.for_rent_long_term,
          forRentShortTerm: prop.for_rent_short_term,
          propPhotos: prop.prop_photos || [],
          extrasForDisplay: prop.extras_for_display || [],
          latitude: prop.latitude,
          longitude: prop.longitude,
        }
      } catch (err) {
        error.value = err
        console.error("Error fetching property:", err)
      } finally {
        loading.value = false
      }
    }

    watch(
      () => route.params.publicLocale,
      (newLocale) => {
        publicLocale.value = newLocale
        fetchProperty(newLocale)
      },
      { immediate: true }
    )

    return {
      loading,
      listingData,
      error,
    }
  },
})
</script>
