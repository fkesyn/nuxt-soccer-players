import axios from 'axios'
import {SERVICES} from '../services'

export const state = () => ({
  players: [],
  countries: [],
  headers: [
    {field: 'name', label: 'Name'},
    {field: 'position', label: 'Position'},
    {field: 'nationality', label: 'Nationality'},
    {field: 'club', label: 'Club'},
    {field: 'overall', label: 'Overall'}
  ]
})

export const getters = {
  players: (state) => state.players,
  countries: (state) => state.countries,
  headers: (state) => state.headers
}

export const mutations = {
  SET_PLAYERS (state, players) {
    state.players = players
  },
  SET_COUNTRIES (state, countries) {
    state.countries = countries
  }
}

export const actions = {
  async createPlayer ({commit}, playerData) {
    const response = await axios.post(
    `${SERVICES.FOOTBALL_PLAYERS_API}/players`,
    {
      name: playerData.name,
      position: playerData.position,
      overall: playerData.overall,
      nationality: playerData.nationality,
      club: playerData.club
    }
    )
    
    const {data} = response
    
    if (data._id) {
      return true
    }
    return false
  },
  async getPlayers ({commit}) {
    const players = await axios.get(`${SERVICES.FOOTBALL_PLAYERS_API}/players`)
    commit('SET_PLAYERS', players.data)
  },
  async getCountries ({commit}) {
    const countries = await axios.get(SERVICES.COUNTRIES_LIST)
    commit('SET_COUNTRIES', countries.data)
  },
  async getFlag ({commit}, country) {
    const flag = await axios.get(
    `${SERVICES.COUNTRIES_FLAGS}/${country}/shiny/64.png`
    )
    return flag
  }
}
