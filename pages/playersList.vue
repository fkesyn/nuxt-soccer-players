<template>
    <section>
        <b-input class="search"
                 icon="account-search"
                 :placeholder="$t('forms.search')"
                 type="search"
                 v-model="search">
        </b-input>

        <b-table :data="filterPlayers()"
                 :loading="isLoading"
                 class="players-list"
        >
            <template slot-scope="props">
                <b-table-column :label="$t('forms.name')" field="name">
                    {{ props.row.name }}
                </b-table-column>
                <b-table-column :label="$t('forms.position')" field="position">
                    {{ props.row.position }}
                </b-table-column>
                <b-table-column :label="$t('forms.nationality')" field="nationality">
                    {{ props.row.nationality }}
                </b-table-column>
                <b-table-column :label="$t('forms.club')" field="club">
                    {{ props.row.club }}
                </b-table-column>
                <b-table-column field="actions" label="Actions">
                    <div class="buttons">
                        <b-button :to="{ name: 'players-id', params: { id: props.row._id }}"
                                  icon-left="comment-edit"
                                  tag="router-link"
                                  type="is-link">
                            {{ $t('links.edit') }}
                        </b-button>
                        <b-button @click="openDeleteDialog(props.row._id)"
                                  icon-left="delete" type="is-danger">
                            {{ $t('links.delete') }}
                        </b-button>
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
                        <p>{{ $t('validation.nothing')}}</p>
                    </div>
                </section>
            </template>
        </b-table>
    </section>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'PlayersView',
    data () {
      return {
        search: '',
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
        getPlayers: 'db/getPlayers',
        deletePlayer: 'db/deletePlayer'
      }),
      filterPlayers () {
        return Object.values(this.players).filter(player => {
          return player.name.toLowerCase().includes(this.search.toLowerCase())
        })
      },
      openDeleteDialog (id) {
        this.$buefy.dialog.confirm({
          title: this.$t('validation.deletingPlayer'),
          message: this.$t('validation.deleteWarningMessage'),
          confirmText: this.$t('validation.deletePlayer'),
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.delete(id)
        })
      },
      async delete (id) {
        let message = this.$t('validation.playerDeleted')
        let type = 'is-success'
        const result = await this.deletePlayer(id)

        if (!result) {
          message = this.$t('validation.somethingWrong')
          type = 'is-danger'
        }

        this.$buefy.notification.open({
          message: message,
          type: type
        })
      }
    }
  }
</script>
<style>
    .search {
        width: 80%;
        margin: 20px auto 1px;
    }

    .players-list {
        padding: 30px;
    }
</style>
