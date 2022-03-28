
export const state = () => ({

  })
  
 export const mutations = {

}

export const actions = {

  //fonction création de compte :
  register : function ({commit}, userInfos) {
    return new Promise ((resolve, reject) => {
    commit;
    this.$axios.$post('/auth/signup', userInfos)
      .then(function(res) {
        resolve(res)
      })
      .catch(function(err) {
        reject(err)
      });
    })
  }

}