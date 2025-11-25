<template>
  <div>
    <q-card class="listings-summary-card">
      <q-card-section horizontal>
        <q-responsive
          class="col"
          :ratio="16 / 9"
          style="max-width: 100%; min-height: 30vh"
        >
          <q-carousel animated v-model="slideModel" arrows infinite>
            <q-carousel-slide
              v-for="image in carouselSlides"
              :name="image.src"
              :key="image.src"
              :img-src="image.src"
            >
              <q-scroll-area class="fit"> </q-scroll-area>
            </q-carousel-slide>
          </q-carousel>
        </q-responsive>
        <!-- <q-img class="" :ratio="16 / 9" :src="summaryImageUrl" /> -->
      </q-card-section>

      <q-separator />
      <div class="q-pa-md">
        <q-card class="my-card pwb-listing-card" flat bordered>
          <div class="row no-wrap">
            <div class="col-12">
              <q-img
                :src="summaryImageUrl"
                :ratio="16 / 9"
                class="cursor-pointer pwb-listing-card-image"
                @click="clickedListing"
              >
                <div class="absolute-bottom text-subtitle2 text-center">
                  {{ currentListing.title }}
                </div>
              </q-img>
            </div>
          </div>
          <q-card-section class="pwb-listing-card-details">
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6 cursor-pointer" @click="clickedListing">
                  <ConvertableCurrencyDisplay
                    :currency="currentListing.currency"
                    :amountCents="priceInCents"
                    class="property-price"
                  ></ConvertableCurrencyDisplay>
                </div>
              </div>
            </div>
            <div class="row items-center no-wrap q-mt-sm">
              <div class="col-6 property-bedrooms">
                <q-icon name="bed" /> {{ currentListing.countBedrooms }}
              </div>
              <div class="col-6 property-bathrooms">
                <q-icon name="bathtub" /> {{ currentListing.countBathrooms }}
              </div>
            </div>
            <div class="row items-center no-wrap q-mt-sm">
              <div class="col-6 property-area" v-if="currentListing.constructedArea">
                <q-icon name="aspect_ratio" /> {{ currentListing.constructedArea }} m²
              </div>
              <div class="col-6 property-garages" v-if="currentListing.countGarages">
                <q-icon name="garage" /> {{ currentListing.countGarages }}
              </div>
            </div>
            <div class="row items-center no-wrap q-mt-sm" v-if="currentListing.reference">
              <div class="col-12 property-reference">
                Ref: {{ currentListing.reference }}
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat color="primary" label="View" @click="clickedListing" />
          </q-card-actions>
        </q-card>
      </div>
    </q-card>
  </div>
</template>
<script>
import ConvertableCurrencyDisplay from "components/widgets/ConvertableCurrencyDisplay.vue"
export default {
  components: {
    ConvertableCurrencyDisplay,
  },
  props: {
    saleOrRental: {
      type: String,
      default: "sale",
    },
    currentListing: {
      type: Object,
      default() {
        return {}
      },
    },
    // currentListingContainer: {
    //   type: Object,
    //   default() {
    //     return {}
    //   },
    // },
  },
  data: () => ({
    // cardExpansionState: false,
    slideModel: 1,
  }),
  methods: {
    startExpandDetails(event) {
      if (event) {
        event.preventDefault()
      }
    },
    stopExpandDetails(event) {
      if (event) {
        event.preventDefault()
      }
    },
    clickedListing() {
      this.$router.push(this.currentListingRoute)
    },
  },
  watch: {
    carouselSlides: {
      deep: true,
      immediate: true,
      handler: function (newVal) {
        // needed to set initial image
        if (newVal[0]) {
          this.slideModel = newVal[0].src
        }
      },
    },
  },
  computed: {
    carouselSlides() {
      var carouselSlides = []
      var picsColl = this.currentListing.propPhotos || []
      picsColl.forEach(function (picObject, index) {
        let imageUrl = picObject.image
        if (imageUrl[0] === "/") {
          // imageUrl = `${dataApiBase}${picObject.image_details.url}`
        }
        carouselSlides.push({
          thumb: imageUrl,
          src: imageUrl,
          alt_text: "",
        })
      })
      return carouselSlides
    },
    // featuresChecklist() {
    //   return (
    //     this.currentListingContainer.item.checklist_values_for_features || {}
    //   )
    // },
    summaryImageUrl() {
      return this.currentListing.preview_url
    },
    priceInCents() {
      if (this.saleOrRental === "rental") {
        return this.currentListing.priceRentalMonthlyCurrentCents
      } else {
        return this.currentListing.priceSaleCurrentCents
      }
    },
    currentListingRoute() {
      let listingSlug = this.currentListing.id || "1"
      let routeName = "rForSaleListing"
      if (this.saleOrRental === "rental") {
        routeName = "rForRentListing"
      }
      return {
        name: routeName,
        params: {
          listingSlug: listingSlug,
          // listings_grouping: "for-sale",
        },
      }
    },
  },
  mounted: function () {},
}
</script>
<style></style>
