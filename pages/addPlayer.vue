<template>
  <ValidationObserver ref="observer" v-slot="{ validate, reset }" data-app>
    <form>
      <ValidationProvider
        v-slot="{ errors }"
        name="Name"
        rules="required|max:10"
      >
        <v-text-field
          v-model="name"
          :counter="10"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" name="Position" rules="required">
        <v-select
          v-model="position"
          :items="positions"
          :error-messages="errors"
          label="Position"
          data-vv-name="select"
          required
        ></v-select>
      </ValidationProvider>
      <ValidationProvider
        v-slot="{ errors }"
        name="Overall"
        rules="required|max_value:100|min_value:1"
      >
        <v-text-field
          v-model="overall"
          :error-messages="errors"
          type="number"
          label="Overall"
          required
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider
        v-slot="{ errors }"
        name="Nationality"
        rules="required"
      >
        <v-select
          v-model="nationality"
          :items="countries"
          item-text="name"
          item-value="alpha2code"
          :error-messages="errors"
          label="Nationality"
          data-vv-name="select"
          required
        ></v-select>
      </ValidationProvider>
      <v-text-field v-model="club" label="Club"></v-text-field>
      <v-btn class="mr-4" @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </ValidationObserver>
</template>
<script>
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from 'vee-validate'
import { required, max_value, min_value, max } from 'vee-validate/dist/rules'
import { mapGetters, mapActions } from 'vuex'
setInteractionMode('eager')
extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters'
})

extend('max_value', {
  ...max_value,
  message: '{_field_} must lower than {max}'
})

extend('min_value', {
  ...min_value,
  message: '{_field_} must higher than {min}'
})
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    name: '',
    position: null,
    positions: [
      'AC',
      'SS',
      'LW',
      'RW',
      'AMF',
      'CMD',
      'DMF',
      'CB',
      'LB',
      'RB',
      'GK'
    ],
    overall: null,
    nationality: null,
    club: ''
  }),
  computed: {
    ...mapGetters({
      countries: 'db/countries'
    })
  },
  mounted() {
    this.getCountries()
  },
  methods: {
    ...mapActions({
      getCountries: 'db/getCountries',
      createPlayer: 'db/createPlayer'
    }),
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.createPlayer({
          name: this.name,
          position: this.position,
          overall: this.overall,
          nationality: this.nationality,
          club: this.club
        })
      }
    },
    clear() {
      this.name = ''
      this.position = null
      this.overall = ''
      this.nationality = null
      this.club = ''
      this.$refs.observer.reset()
    }
  }
}
</script>
<style></style>
