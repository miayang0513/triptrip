import axios from '../../utils/axios'
import siteApis from '@/utils/apis/site'
import trip from '@/store/modules/trip.js'

const state = {
  isLogin: localStorage.getItem('isLogin') || false,
  expiration: new Date(localStorage.getItem('expiration')) || false,
  /** ***********/
  _id: 1,
  username: 'MiaYang',
  introduction: "Hello I'm Mia",
  avatar: '',
  owningTrips: [], // [ObjectId]
  collectingTrips: [], // [ObjectId]
  collectingSites: [], // [ObjectId]
  ratingTrips: [
    {
      id: 1, // ObjectId
      rating: Number
    }
  ]
}

const getters = {
  getIsLogin (state) {
    return state.isLogin
  },
  getCollectingSites (state) {
    return state.collectingSites
  },
  getCollectingTrips (state) {
    return state.collectingTrips
  },
  getAccountId (state) {
    return state._id
  },
  getTripRating (state) {
    return function (tripId) {
      const trip = state.ratingTrips.filter(trip => trip.id === tripId)[0]
      return trip ? trip.userRating : 0
    }
  }
}

const mutations = {
  SET_user (state, data) {
    Object.keys(data).forEach(key => {
      state[key] = data[key]
    })
  },
  SET_login (state) {
    localStorage.setItem('expiration', new Date(Date.now() + 1000 * 3600 * 24))
    localStorage.setItem('isLogin', true)
    state.isLogin = true
  },
  SET_logout (state) {
    state.isLogin = false
    localStorage.setItem('isLogin', false)
    alert('logout')
  },
  TOGGLE_collectedSite (state, placeId) {
    if (state.collectingSites.includes(placeId)) {
      state.collectingSites = state.collectingSites.filter(siteId => siteId !== placeId)
    } else {
      state.collectingSites.push(placeId)
    }
  },
  TOGGLE_collectedTrip (state, tripId) {
    if (state.collectingTrips.includes(tripId)) {
      state.collectingTrips = state.collectingTrips.filter(id => id !== tripId)
    } else {
      state.collectingTrips.push(tripId)
    }
  },
  SET_avatar (state, avatar) {
    state.avatar = avatar
  },
  RATE_trip (state, params) {
    state.ratingTrips.push(params)
  }
}

const actions = {
  async signup ({ commit }, params) {
    try {
      const { data } = await axios('/signup', {
        method: 'post',
        data: params
      })
      commit('SET_user', data)
      commit('SET_login')
    } catch (error) {
      console.log(error)
    }
  },
  async signin ({ commit }, params) {
    try {
      const { data } = await axios('/signin', {
        method: 'post',
        data: params
      })
      commit('SET_user', data)
      commit('SET_login')
    } catch (error) {
      throw error
    }
  },
  async getUser ({ commit }) {
    try {
      const { data } = await axios('/users', {
        method: 'get'
      })
      commit('SET_user', data)
      commit('SET_login')
    } catch (error) {
      commit('SET_logout')
      console.log(error)
    }
  },
  async editProfile ({ commit }, formData) {
    try {
      await axios('/users', {
        method: 'patch',
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 0,
        data: formData
      })
    } catch (error) {
      console.log(error)
    }
  },
  async toggleCollectedSite ({ commit }, placeId) {
    try {
      commit('TOGGLE_collectedSite', placeId)
      await siteApis.toggleCollectedSite(placeId)
    } catch (error) {
      console.log(error)
    }
  },
  async toggleCollectedTrip ({ commit }, tripId) {
    try {
      commit('TOGGLE_collectedTrip', tripId)
      await trip.actions.toggleCollectedTrip(trip.state, tripId)
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
