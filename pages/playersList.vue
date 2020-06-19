<template>
    <div>
        <b-table class="players-list"
                 :data = "players"
                 :loading="isLoading"
                 :selected.sync="selected"
                 focusable>
            <template slot-scope="props">
                <b-table-column field="name" label="Name">
                    {{ props.row.name }}
                </b-table-column>
                <b-table-column field="position" label="Position">
                    {{ props.row.position }}
                </b-table-column>
                <b-table-column field="nationality" label="Nationality">
                    {{ props.row.nationality }}
                </b-table-column>
                <b-table-column field="club" label="Club">
                    {{ props.row.club }}
                </b-table-column>
                <b-table-column field="actions" label="Actions">
                    <div class="columns">
                        <div class="column">
                            <b-button tag="router-link"
                                      :to="{ name: 'players-id', params: { id: props.row._id }}"
                                      icon-left="comment-edit"
                                      type="is-link">
                                Edit
                            </b-button>
                        </div>
                        <div class="column">
                            <b-button type="is-danger"
                                      icon-left="delete">
                                Delete
                            </b-button>
                        </div>
                    </div>
                </b-table-column>
            </template>

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
<style>
    .players-list {
        padding: 30px;
    }
</style>
