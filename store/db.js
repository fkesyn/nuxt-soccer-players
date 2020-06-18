import axios from 'axios'

export const state = () => ({
  players: [],
  headers: [
    { text: 'Title', value: 'title' },
    { text: 'Description', value: 'description' }
  ]
})

export const getters = {
  players: (state) => state.players,
  headers: (state) => state.headers
}

export const mutations = {
  SET_PLAYERS(state, players) {
    state.players = players
  }
}

export const actions = {
  async getPlayers({ commit }) {
    const players = await axios.get(
      'https://node-kesyn.herokuapp.com/api/tutorials'
    )

    commit('SET_PLAYERS', players.data)
  }
}
