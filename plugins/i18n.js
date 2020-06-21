import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app }, inject) => {
  const setLocale = (locale) => {
    app.i18n.locale = locale
    app.$cookies.set('cookie-locale', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
  }
  const getAvailableLangs = () => app.i18n.availableLocales
  // Inject $setLocale(msg) in Vue, context and store.
  inject('setLocale', setLocale)
  inject('getAvailableLangs', getAvailableLangs)
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    fallbackLocale: 'en',
    locale: app.$cookies.get('cookie-locale'),
    messages: {
      en: require('~/locales/en.json'),
      pt: require('~/locales/pt.json')
    }
  })
}
