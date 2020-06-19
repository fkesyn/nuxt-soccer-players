<template>
    <div>
        <nuxt-link to="/players">Players</nuxt-link>
        <b-table :columns="headers"
                 :data="players"
                 :loading="isLoading"
                 :selected.sync="selected"
                 focusable>
            <template slot="empty">
                <section class="section" v-if="!isLoading">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                    icon="emoticon-sad"
                                    size="is-large">
                            </b-icon>
                        </p>
                        <p>Nothing here.</p>
                    </div>
                </section>
            </template>
        </b-table>
    </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'PlayersView',
    data () {
      return {
        selected: null,
        isLoading: false
      }
    },
    computed: {
      ...mapGetters({
        players: 'db/players',
        headers: 'db/headers'
      })
    },
    async mounted () {
      this.isLoading = true;
      await this.getPlayers()
      this.isLoading = false;
    },
    methods: {
      ...mapActions({
        getPlayers: 'db/getPlayers'
      })
    }
  }
</script>
