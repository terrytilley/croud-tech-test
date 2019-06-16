import users from '../apollo/queries/users'
import updateUser from '../apollo/mutations/updateUser'

export const state = () => ({
  users: []
})

export const mutations = {
  updateUsers(state, users) {
    state.users = users
  }
}

export const actions = {
  async getUsers({ commit }) {
    const client = this.app.apolloProvider.defaultClient
    const { data } = await client.query({ query: users })

    commit('updateUsers', data.users)
  },
  async updateUser({ commit }, variables) {
    const client = this.app.apolloProvider.defaultClient
    const { data } = await client.mutate({ mutation: updateUser, variables })
    console.log(data)
  }
}
