
export const state = () => ({
    status : '',
    user : {
      userId : -1,
      token : ''
    }
  })
  
 export const mutations = {

    SET_STATUS : function(state, updatedStatus) {
      state.status = updatedStatus
    },

    LOG_USER: function(state, user) {
      state.user = user
    }
}

export const actions = {

  //fonction création de compte :
  register : function ({commit}, userInfos) {
    return new Promise ((resolve, reject) => {
    this.$axios.$post('/auth/signup', userInfos)
      .then(function(res) {
        commit('SET_STATUS', 'created')
        resolve(res)
      })
      .catch(function(err) {
        commit('SET_STATUS', 'create_error')
        reject(err)
      });
    })
  }, 

  //fonction de login
  login : function ({commit}, userInfos) {
    commit('SET_STATUS', 'loading')
    return new Promise ((resolve, reject) => {
    this.$axios.$post('/auth/login', userInfos)
      .then(function(res) {
        commit('SET_STATUS', '')
        commit('LOG_USER', res.data)

        resolve(res)
      })
      .catch(function(err) {
        commit('setStatus', 'login_error')
        reject(err)
      });
    })
  }

}