<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line>
          <template v-for="user in users">
            <v-list-tile :key="user.id">
              <v-list-tile-content>
                <v-list-tile-title v-text="user.name"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import users from '~/apollo/queries/users'

export default {
  apollo: {
    users: {
      prefetch: true,
      query: users
    }
  }
}
</script>
