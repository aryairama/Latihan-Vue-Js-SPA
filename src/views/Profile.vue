<template>
  <div>
    <v-subheader>Your Profile</v-subheader>
    <v-card>
      <v-container>
        <v-simple-table>
          <tbody>
            <tr v-for="(value,key,index) in user" :key="key">
              <td>{{index}}</td>
              <td>{{key}}</td>
              <td>{{value}}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters({
      user: 'Auth/user'
    })
  }
};
</script>

<style>
</style>