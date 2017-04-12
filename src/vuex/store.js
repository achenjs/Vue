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
    if (obj) {
      var path = obj.path
      var parameter = obj.parameter
      var len = Object.keys(parameter).length
      var str = ''
      for (let i in parameter) {
        if (parameter[i] === '' || parameter[i] === undefined) {
          delete parameter[i]
        } else {
          str += '&' + i + '=' + parameter[i]
        }
      }
      state.changeUrl = str.replace('&', '?')
    }
  }
}

const actions = {
  increment (context, obj) {
    context.commit('urlInfo', obj)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
