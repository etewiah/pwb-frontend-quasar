<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 col-md-10 col-lg-8">
        <h1 class="text-h4 q-mb-md">Contact</h1>
        <q-breadcrumbs class="text-grey q-mb-lg" active-color="primary">
          <q-breadcrumbs-el label="Home" :to="`/${$route.params.publicLocale}`" />
          <q-breadcrumbs-el label="Contact" />
        </q-breadcrumbs>

        <div class="row q-col-gutter-lg">
          <!-- Contact Form Section -->
          <div class="col-12 col-md-8">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Contact</div>
                <p>Fill in the following form to contact us:</p>
                <q-form @submit="onSubmit" class="q-gutter-md">
                  <q-input
                    outlined
                    v-model="form.name"
                    label="Name"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type your name']"
                  />
                  <q-input
                    outlined
                    v-model="form.email"
                    label="Email"
                    type="email"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type your email']"
                  />
                  <q-input
                    outlined
                    v-model="form.phone"
                    label="Telephone"
                  />
                  <q-input
                    outlined
                    v-model="form.message"
                    label="Message"
                    type="textarea"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type your message']"
                  />

                  <div>
                    <q-btn label="Send" type="submit" color="primary" />
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </div>

          <!-- Contact Information Section -->
          <div class="col-12 col-md-4">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Contact information</div>
                
                <div class="q-mb-md">
                  <div class="text-subtitle1 text-weight-bold">Example RE</div>
                  <div>9-13, Old Water Works Road Old Bridge Township , 08857</div>
                </div>

                <div class="q-mb-md">
                  <div class="text-subtitle2 text-weight-bold">Telephone</div>
                  <div>+34 672 550 305</div>
                </div>

                <div>
                  <div class="text-subtitle2 text-weight-bold">Email</div>
                  <div>contact@example.com</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'ContactPage',
  setup () {
    const $q = useQuasar()
    const form = ref({
      name: '',
      email: '',
      phone: '',
      message: ''
    })

    return {
      form,
      onSubmit () {
        // TODO: Implement actual form submission logic
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Message sent successfully (Simulation)'
        })
      }
    }
  }
})
</script>
