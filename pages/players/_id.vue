<template>
    <section class="player-details">
        <b-field :label="$t('forms.name')">
            <b-input icon="card-account-details"
                     :placeholder="$t('forms.name')"
                     required
                     type="text"
                     v-model="name"
                     validation-message="Name is required"
            >
            </b-input>
        </b-field>
        <b-field :label="$t('forms.position')">
            <b-select
                    expanded
                    icon="badge-account"
                    :placeholder="$t('forms.position')"
                    required
                    v-model="position"
            >
                <option
                        :key="pos"
                        :value="pos"
                        v-for="pos in positions">
                    {{ pos }}
                </option>
            </b-select>
        </b-field>
        <b-field :label="$t('forms.nationality')">
            <b-select
                    :value="nationality"
                    expanded
                    icon="flag-variant"
                    :placeholder="$t('forms.nationality')"
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
        <b-field :label="$t('forms.club')">
            <b-input icon="soccer"
                     :placeholder="$t('forms.club')"
                     type="text"
                     v-model="club"
            >
            </b-input>
        </b-field>
        <b-field :label="$t('forms.overall')">
            <b-numberinput
                    max="100"
                    min="1"
                    :placeholder="$t('forms.overall')"
                    v-model="overall"></b-numberinput>
        </b-field>
        <div class="buttons">
            <b-button
                    :disabled="!isValid"
                    :loading="isLoading"
                    @click="submit()"
                    type="is-success">{{ this.mode ==='create' ? this.$t('links.create') : this.$t('links.save')}}
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
        position: null,
        overall: 0,
        nationality: null,
        club: '',
        isLoading: false,
        mode: 'create'
      }
    },
    computed: {
      ...mapGetters({
        players: 'db/players',
        countries: 'db/countries'
      }),
      isValid () {
        return this.name && this.position && this.nationality && this.overall > 0 && this.overall <= 100;
      }
    },
    async mounted () {
      if (this.id) {
        const player = await this.findPlayer(this.id)
        if (player) {
          this.mode = 'edit'
          this.name = player.name
          this.position = player.position
          this.overall = player.overall
          this.nationality = player.nationality
          this.club = player.club
        } else {
          this.$buefy.notification.open({
            duration: 5000,
            message: `The player id doesn't exist`,
            type: 'is-danger',
            hasIcon: true
          })
        }

      }
      await this.getCountries()
    },
    methods: {
      ...mapActions({
        getCountries: 'db/getCountries',
        createPlayer: 'db/createPlayer',
        editPlayer: 'db/editPlayer',
        findPlayer: 'db/findPlayer'
      }),
      clearFields () {
        this.name = ''
        this.position = null
        this.overall = 0
        this.nationality = null
        this.club = ''
      },
      async submit () {
        let message
        let result
        let type = 'is-success'

        if (this.isValid) {
          this.isLoading = true
          const dataPlayer = {
            id: this.id,
            name: this.name,
            position: this.position,
            overall: this.overall,
            nationality: this.nationality,
            club: this.club
          }

          if (this.mode === 'create') {
            message = 'Player created!'
            result = await this.createPlayer(dataPlayer)
          } else {
            message = 'Player edited!'
            result = await this.editPlayer(dataPlayer)
          }

          if (!result) {
            message = 'Something went wrong, please try again later'
            type = 'is-danger'
          }

          if (result && this.mode === 'create')
          {
            this.clearFields()
          }

          this.$buefy.notification.open({
            message: message,
            type: type
          })
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
