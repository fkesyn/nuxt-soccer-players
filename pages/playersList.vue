<template>
  <v-container id="players-list">
    <v-layout row wrap>
      <v-flex lg6 sm6>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Solo"
          placeholder="Search for Player"
          solo
          class="search"
        />
      </v-flex>
      <v-flex lg2 sm2>
        <v-btn class="filter-btn" color="black" dark>
          Filter
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex v-for="player in filterPlayers" :key="player.id" xs12 sm6 md6 lg3>
        <player-card
          :name="player.name"
          :position="player.position"
          country="pt"
        ></player-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PlayerCard from '../components/PlayerCard'
export default {
  name: 'PlayersView',
  components: { PlayerCard },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      players: 'db/players',
      headers: 'db/headers'
    }),
    filterPlayers() {
      return Object.values(this.players).filter((player) => {
        return player.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  mounted() {
    this.getPlayers()
  },
  methods: {
    ...mapActions({
      getPlayers: 'db/getPlayers'
    })
  }
}
</script>
