<template>
    <div>
        <!--<nav-->
        <!--aria-label="main navigation"-->
        <!--class="navbar header has-shadow is-primary"-->
        <!--role="navigation"-->
        <!--&gt;-->
        <!--<div class="navbar-brand">-->
        <!--<a-->
        <!--class="navbar-item"-->
        <!--href="/"-->
        <!--&gt;-->
        <!--Football Players Editor-->
        <!--</a>-->
        <!--</div>-->
        <!--<div class="nav-bar-menu">-->
        <!--<div class="nav-bar-item">-->
        <!--<b-select-->
        <!--:value="selectedLang"-->
        <!--expanded-->
        <!--icon="flag-variant"-->
        <!--:placeholder="$t('forms.language')"-->
        <!--v-model="selectedLang"-->
        <!--@input="changeLang()"-->
        <!--&gt;-->
        <!--<option-->
        <!--:key="lang"-->
        <!--:value="lang"-->
        <!--v-for="lang in getLangs()">-->
        <!--{{ lang }}-->
        <!--</option>-->
        <!--</b-select>-->


        <!--</div>-->
        <!--</div>-->


        <!--</nav>-->

        <b-navbar class="has-shadow is-primary">
            <template slot="brand">
                <b-navbar-item :to="{ path: '/' }" tag="router-link">
                    Football Players Editor
                </b-navbar-item>
            </template>
            <template slot="end">
                <b-dropdown v-model="selectedLang" aria-role="list">
                    <button class="button is-primary" slot="trigger" type="button">
                        <b-icon icon="flag-variant"></b-icon>
                        {{selectedLang ? selectedLang : $t('forms.language')}}
                        <b-icon icon="menu-down"></b-icon>
                    </button>

                    <b-dropdown-item :key="lang"
                                     :value="lang"
                                     aria-role="listitem"
                                     @click="changeLang()"
                                     v-for="lang in getLangs()">
                        {{ lang }}
                    </b-dropdown-item>
                </b-dropdown>
            </template>
        </b-navbar>
        <section class="main-content columns">
            <aside class="column is-2 section">
                <p class="menu-label is-hidden-touch">
                    General
                </p>
                <ul class="menu-list">
                    <li
                            :key="key"
                            v-for="(item, key) of items"
                    >
                        <nuxt-link
                                :to="item.to"
                                exact-active-class="is-active"
                        >
                            <b-icon :icon="item.icon"/>
                            {{ item.title }}
                        </nuxt-link>
                    </li>
                </ul>
            </aside>

            <div class="container column is-10">
                <nuxt/>
            </div>
        </section>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        selectedLang: null
      }
    },
    computed: {
      items () {
        return [
          {
            title: 'Home',
            icon: 'home',
            to: {name: 'index'}
          },
          {
            title: this.$t('links.allPlayers'),
            icon: 'account-group',
            to: {name: 'playersList'}
          },
          {
            title: this.$t('links.addPlayer'),
            icon: 'account-plus-outline',
            to: {name: 'players-id'}
          }
        ]
      }
    },
    methods: {
      getLangs () {
        return this.$getAvailableLangs();
      },
      changeLang () {
        this.$setLocale(this.selectedLang)
      }
    }
  }
</script>
