import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  changeUrl: ''
}

const getters = {
  changeUrl: state => {
    return state.changeUrl
  }
}

const mutations = {
  urlInfo (state, obj) {
    console.log(obj)
    if (obj) {
      let path = obj.path
      let parameter = obj.parameter
      let len = Object.keys(parameter).length
      var str = ''
      for (let i in parameter) {
        if (parameter[i] === '') {
          delete parameter[i]
        } else {
          str += '&' + parameter[i] + '=' + parameter[i]
        }
      }
      str = str.replace('&', '?')
      this.changeUrl = str
    }
  }
}

const actions = {
  urlInfo ({ commit }) {
    commit('urlInfo')
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
