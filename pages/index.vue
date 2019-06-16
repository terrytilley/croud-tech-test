<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="blue" dark>
          <v-toolbar-title>Users</v-toolbar-title>
        </v-toolbar>
        <v-list two-line>
          <template v-for="user in users">
            <v-list-tile :key="user.id" :to="`/users/${user.id}`">
              <v-list-tile-content>
                <v-list-tile-title v-text="user.name"></v-list-tile-title>
                <v-list-tile-sub-title
                  v-text="user.email"
                ></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    users() {
      return this.$store.state.users
    }
  },
  async created() {
    const users = this.$store.state.users

    if (!users.length > 0) {
      await this.getUsers()
    }
  },
  methods: {
    ...mapActions(['getUsers'])
  }
}
</script>
