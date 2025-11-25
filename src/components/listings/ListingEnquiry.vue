<template>
  <q-card class="listing-enq-card full-height">
    <q-card-section>
      <div>
        <h4
          class="sm:text-2xl font-medium title-font text-gray-900 q-pb-md text-center"
        >
          {{ localiseProvider.$ft("requestPropertyInfo") }}
        </h4>
      </div>
      <q-form @submit="onSubmitEnquiry" @reset="onReset" class="q-gutter-md">
        <template
          v-for="field in propertyEnquiryShortFields"
          :key="field.fieldName"
        >
          <div class="listing-enq-field">
            <q-input
              v-if="field.inputType !== 'textarea'"
              class="listing-enq-field-input"
              outlined
              v-model="enquiryContent.contact[field.fieldName]"
              :label="localiseProvider.$ft(field.labelTextTKey)"
              lazy-rules
              :rules="field.validationRules"
            />
            <q-input
              v-else
              class="listing-enq-field-input"
              outlined
              type="textarea"
              v-model="enquiryContent.contact[field.fieldName]"
              :label="localiseProvider.$ft(field.labelTextTKey)"
              lazy-rules
              :rules="field.validationRules"
              :rows="4"
            />
          </div>
        </template>
        <div class="q-mt-lg">
          <q-btn
            :label="localiseProvider.$ft('send')"
            type="submit"
            color="primary"
          />
        </div>
        <div class="listing-form-results">
          <div class="w-full flex flex-col flex-grow flex-shrink pl-4">
            <div class="h-full ma-0 pa-0 v-card v-sheet theme--light">
              <div style="color: red">
                <div v-if="propertyEnquiryErrors.length">
                  <div>Sorry, there has been an error.</div>
                  <template v-for="error in propertyEnquiryErrors" :key="error">
                    <div>
                      {{ error }}
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
import axios from "axios"
import { ref } from "vue"

export default {
  inject: ["localiseProvider"],
  setup() {
    const acceptTerms = ref(false)
    return {
      acceptTerms,
      onReset() {
        acceptTerms.value = false
      },
    }
  },
  methods: {
    onSubmitEnquiry() {
      let propertyId = this.currentListing.id
      let contact = this.enquiryContent.contact
      propertyId = propertyId.toString() || ""
      
      // Construct payload for REST API
      const payload = {
        listing_enquiry: {
          property_id: propertyId,
          ...contact
        }
      }

      axios.post('/api_public/v1/enquiries', payload)
        .then((response) => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Thank you for your enquiry",
          })
          // Reset form or handle success state
        })
        .catch((error) => {
          console.error(error)
          let errorMessage = "An error occurred"
          if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error
          }
          this.propertyEnquiryErrors.push(errorMessage)
        })
    },
  },
  props: {
    currentListing: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      propertyEnquiryErrors: [],
      formValid: false,
      propertyEnquiryShortFields: [
        {
          labelTextTKey: "name",
          fieldName: "name",
          inputType: "text",
          validationRules: [(v) => !!v || "Name is required"],
        },
        {
          labelTextTKey: "email",
          fieldName: "email",
          inputType: "text",
          required: true,
          validationRules: [
            (v) => !!v || "E-mail is required",
            (v) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              "E-mail must be valid",
          ],
        },
        {
          labelTextTKey: "tel",
          fieldName: "tel",
          inputType: "text",
          validationRules: [],
        },
        {
          labelTextTKey: "message",
          fieldName: "message",
          inputType: "textarea",
          validationRules: [],
        },
      ],
      enquiryContent: {
        contact: {
          pref_lang: "",
          ask_type: "",
          name: "",
        },
      },
    }
  },
}
</script>
<style></style>
