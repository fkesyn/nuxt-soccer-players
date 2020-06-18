<template>
  <v-container id="player-card">
    <v-card>
      <!--<v-img class="white&#45;&#45;text" height="200px" :src="getFlag(country)" />-->
      <v-card-title>
        <div>
          <span class="player-name">{{ name }}</span
          ><br />
        </div>
      </v-card-title>
      <v-tabs
        slider-color="#6FBFB4"
        height="35"
        left
        active-class="active-class"
      >
        <v-tab class="tabs" href="#club">
          Club
        </v-tab>
        <v-tab class="tabs" href="#personal">
          Personal
        </v-tab>
        <v-tabs-items>
          <v-tab-item value="personal">
            <v-card-text>
              Cenas
            </v-card-text>
          </v-tab-item>
          <v-tab-item value="club">
            <v-card flat>
              <v-card-text>
                Teste
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'PlayerCard',
  props: {
    name: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: ''
    },
    country: {
      type: String,
      default: ''
    },
    club: {
      type: String,
      default: ''
    },
    overall: {
      type: Number,
      default: null
    }
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions({
      getFlag: 'db/getFlag'
    })
  }
}
</script>
<style scoped>
.player-card {
  border-radius: 5px;
}
.player-name {
  font-size: 15px;
  font-weight: bold;
}
.tabs {
  text-transform: none;
}
.active-class {
  font-weight: bold;
  color: #6fbfb4;
}
</style>
