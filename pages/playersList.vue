<template>
  <v-container id="players">
    <v-text-field
      v-model="search"
      append-icon="search"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table :headers="headers" :items="players" :search="search">
      <template v-slot:items="props">
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.description }}</td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          No result found for "{{ search }}"
        </v-alert>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'PlayersView',
  data() {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      players: 'db/players',
      headers: 'db/headers'
    })
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
