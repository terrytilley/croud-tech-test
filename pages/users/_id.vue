<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <template v-if="user">
        <v-card v-if="edit">
          <v-toolbar color="blue" dark>
            <v-toolbar-title>Edit User</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="edit = !edit">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list two-line>
            <v-form v-if="edit">
              <v-list-tile>
                <v-text-field
                  v-model="name"
                  label="Name"
                  required
                ></v-text-field>
              </v-list-tile>
              <v-list-tile>
                <v-text-field
                  v-model="email"
                  label="Email"
                  required
                ></v-text-field>
              </v-list-tile>
              <v-list-tile>
                <v-text-field
                  v-model="companyName"
                  label="Company Name"
                  required
                ></v-text-field>
              </v-list-tile>

              <v-list-tile>
                <v-btn
                  color="blue"
                  @click="
                    updateUser({
                      id: $route.params.id,
                      user: { name: user.name }
                    })
                    submit()
                  "
                  >submit</v-btn
                >
              </v-list-tile>
            </v-form>
          </v-list>
        </v-card>

        <v-card v-else>
          <v-img
            src="https://cdn.vuetifyjs.com/images/lists/ali.png"
            height="300px"
          >
            <v-layout column fill-height>
              <v-card-title>
                <v-spacer></v-spacer>
                <v-btn dark icon class="mr-3" @click="edit = !edit">
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-card-title>

              <v-spacer></v-spacer>

              <v-card-title class="white--text pl-5 pt-5">
                <div class="display-1 pl-5 pt-5">{{ user.name }}</div>
              </v-card-title>
            </v-layout>
          </v-img>

          <v-list two-line>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="white">perm_identity</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ user.id }}</v-list-tile-title>
                <v-list-tile-sub-title>User ID</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider inset></v-divider>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="white">email</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ user.email }}</v-list-tile-title>
                <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider inset></v-divider>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="white">work</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ user.company.name }}</v-list-tile-title>
                <v-list-tile-sub-title>Company</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    edit: false
  }),
  computed: {
    user() {
      return this.$store.state.users.find(
        ({ id }) => id === this.$route.params.id
      )
    },
    name: {
      get() {
        return this.$store.state.users.find(
          ({ id }) => id === this.$route.params.id
        ).name
      },
      set(name) {
        const users = this.$store.state.users
        const index = users.findIndex(({ id }) => id === this.$route.params.id)
        users[index] = { ...users[index], name }
        this.$store.commit('updateUsers', users)
      }
    },
    email: {
      get() {
        return this.$store.state.users.find(
          ({ id }) => id === this.$route.params.id
        ).email
      },
      set(email) {
        const users = this.$store.state.users
        const index = users.findIndex(({ id }) => id === this.$route.params.id)
        users[index] = { ...users[index], email }
        this.$store.commit('updateUsers', users)
      }
    },
    companyName: {
      get() {
        return this.$store.state.users.find(
          ({ id }) => id === this.$route.params.id
        ).company.name
      },
      set(name) {
        const users = this.$store.state.users
        const index = users.findIndex(({ id }) => id === this.$route.params.id)
        users[index] = { ...users[index], company: { name } }
        this.$store.commit('updateUsers', users)
      }
    }
  },
  async created() {
    const users = this.$store.state.users

    if (!users.length > 0) {
      await this.getUsers()
    }
  },
  methods: {
    ...mapActions(['getUsers', 'updateUser']),
    submit() {
      this.edit = !this.edit
    }
  }
}
</script>
