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
    `${SERVICES.FOOTBALL_PLAYERS_API}`,
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
    const players = await axios.get(`${SERVICES.FOOTBALL_PLAYERS_API}`)
    commit('SET_PLAYERS', players.data)
  },
  async getCountries ({commit}) {
    const countries = await axios.get(SERVICES.COUNTRIES_LIST)
    commit('SET_COUNTRIES', countries.data)
  },
  async editPlayer ({commit}, playerData) {
    const response = await axios.put(
    `${SERVICES.FOOTBALL_PLAYERS_API}/${playerData.id}`,
    {
      name: playerData.name,
      position: playerData.position,
      overall: playerData.overall,
      nationality: playerData.nationality,
      club: playerData.club
    }
    )
    
    const {data} = response
   
    if (data.success) {
      return true
    }
    return false
  },
  async findPlayer ({commit, state}, id) {
    let player = state.players.find(({_id}) => _id === id)
    
    if (!player) {
      try {
        const {data} = await axios.get(`${SERVICES.FOOTBALL_PLAYERS_API}/${id}`)
        if (data._id) {
          player = data
        }
      } catch {
        return false
      }
    }
    return player
  },
  async getFlag ({commit}, country) {
    const flag = await axios.get(
    `${SERVICES.COUNTRIES_FLAGS}/${country}/shiny/64.png`
    )
    return flag
  }
}
