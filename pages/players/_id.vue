<template>
    <section class="player-details">
        <b-field label="Name">
            <b-input placeholder="Name"
                     required
                     type="text"
                     v-model="name"
                     validation-message="Name is required"
            >
            </b-input>
        </b-field>
        <b-field label="Position">
            <b-select
                    :value="position"
                    expanded
                    placeholder="Position"
                    required
                    v-model="position">
                <option
                        :key="pos"
                        :value="pos"
                        v-for="pos in positions">
                    {{ pos }}
                </option>
            </b-select>
        </b-field>
        <b-field label="Nationality">
            <b-select
                    :value="nationality"
                    expanded
                    placeholder="Nationality"
                    required
                    v-model="nationality">
                <option
                        :key="country.alpha2code"
                        :value="country.name"
                        v-for="country in countries">
                    {{ country.name }}
                </option>
            </b-select>
        </b-field>
        <b-field label="Club">
            <b-input placeholder="Club"
                     type="text"
                     v-model="club"
            >
            </b-input>
        </b-field>
        <b-field label="Overall">
            <b-numberinput
                    max="100"
                    min="1"
                    placeholder="Overall"
                    v-model="overall"></b-numberinput>
        </b-field>
        <div class="buttons">
            <b-button
                    :disabled="!isValid"
                    :loading="isLoading"
                    @click="submit()"
                    type="is-success">Create
            </b-button>
        </div>

    </section>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    data () {
      return {
        id: this.$route.params.id,
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
        name: '',
        position: '',
        overall: 0,
        nationality: '',
        club: '',
        isLoading: false
      }
    },
    computed: {
      ...mapGetters({
        countries: 'db/countries'
      }),
      isValid () {
        return this.name && this.position && this.nationality && this.overall > 0 && this.overall <= 100;
      }
    },
    mounted () {
      this.getCountries()
    },
    methods: {
      ...mapActions({
        getCountries: 'db/getCountries',
        createPlayer: 'db/createPlayer'
      }),
      clearFields () {
        this.name = ''
        this.position = ''
        this.overall = 0
        this.nationality = ''
        this.club = ''
      },
      async submit () {
        let message = 'Player created!'
        let type = 'is-success'
        if (this.isValid) {
          this.isLoading = true
          const result = await this.createPlayer({
            name: this.name,
            position: this.position,
            overall: this.overall,
            nationality: this.nationality,
            club: this.club
          })
          if (!result) {
            message = 'Something went wrong, please try again later'
            type = 'is-danger'
          }

          this.$buefy.notification.open({
            message: message,
            type: type
          })
          this.clearFields()
          this.isLoading = false
        }
      }
    }
  }
</script>
<style>
    .player-details {
        padding: 30px;
    }
</style>