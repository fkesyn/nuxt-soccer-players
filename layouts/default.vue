<template>
    <div>
        <nav
                aria-label="main navigation"
                class="navbar header has-shadow is-primary"
                role="navigation"
        >
            <div class="navbar-brand">
                <a
                        class="navbar-item"
                        href="/"
                >
                    Football Players Editor
                </a>
            </div>
        </nav>

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
        items: [
          {
            title: 'Home',
            icon: 'home',
            to: {name: 'index'}
          },
          {
            title: 'All Players',
            icon: 'account-group',
            to: {name: 'playersList'}
          },
          {
            title: 'Add Player',
            icon: 'account-plus-outline',
            to: {name: 'players-id'}
          }
        ]
      }
    }
  }
</script>
