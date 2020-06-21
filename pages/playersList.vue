<template>
    <div>
        <b-table :data="players"
                 :loading="isLoading"
                 class="players-list"
        >
            <template slot-scope="props">
                <b-table-column field="name" :label="$t('forms.name')">
                    {{ props.row.name }}
                </b-table-column>
                <b-table-column field="position" :label="$t('forms.position')">
                    {{ props.row.position }}
                </b-table-column>
                <b-table-column field="nationality" :label="$t('forms.nationality')">
                    {{ props.row.nationality }}
                </b-table-column>
                <b-table-column field="club" :label="$t('forms.club')">
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
      openDeleteDialog(id) {
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
    .players-list {
        padding: 30px;
    }
</style>
