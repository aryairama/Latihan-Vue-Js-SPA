<template>
  <v-app>
    <v-app-bar app color="info" dark extended v-if="isHome">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ nameApp }}</v-toolbar-title>
      <!-- pemisah -->
      <v-spacer></v-spacer>
      <v-btn icon @click="setDialogComponent('cart')">
        <v-badge color="orange" overlap>
          <template v-slot:badge v-if="countCart > 0">
            <span>{{ countCart }}</span>
          </template>
          <v-icon large>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
      <v-text-field
        color="info"
        name="search"
        label="search"
        id="search"
        slot="extension"
        hide-details
        append-icon="mdi-microphone"
        flat
        prepend-inner-icon="mdi-magnify"
        solo-inverted
        @click="setDialogComponent('search')"
      ></v-text-field>
    </v-app-bar>
    <v-app-bar app color="info" dark v-else>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="setDialogComponent('cart')">
        <v-badge color="orange" overlap>
          <template v-slot:badge v-if="countCart > 0">
            <span>{{ countCart }}</span>
          </template>
          <v-icon large>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    <!--  -->
    <!-- sidebar -->
    <v-card>
      <v-navigation-drawer app v-model="drawer">
        <v-list-item v-if="!guest">
          <v-list-item-avatar>
            <v-img :src="getImage('/users/'+user.avatar)"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <div class="pa-2" v-if="guest">
          <v-btn block color="success" @click="setDialogComponent('login')">
            <v-icon>mdi-lock</v-icon>
            Login
          </v-btn>
          <v-btn block color="info" class="mt-1" @click="setDialogComponent('register')">
            <v-icon>mdi-account</v-icon>
            Register
          </v-btn>
        </div>

        <v-divider></v-divider>

        <v-list shaped>
          <v-list-item
            v-for="(item, index) of menus"
            :key="index"
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon left>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template v-slot:append v-if="!guest">
          <div class="pa-2">
            <v-btn block color="red" dark @click="logout()">
              <v-icon left>mdi-lock</v-icon>
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </v-card>
    <!-- end sidebar -->
    <v-main>
      <!-- alert -->
      <alert />
      <keep-alive>
        <v-dialog
          persistent
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialogbottom-transition"
        >
          <component :is="currentComponent" @closed="setDialogStatus($event)"></component>
        </v-dialog>
      </keep-alive>

      <!-- search -->
      <v-container fluid>
        <v-slide-y-transition>
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-main>
    <v-card>
      <v-footer absolute app>
        <v-card-text class="text-center">
          &copy; {{ new Date().getFullYear() }} - <strong>{{ nameApp }}</strong>
        </v-card-text>
      </v-footer>
    </v-card>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Alert: () => import("./components/Alert"),
    Search: () => import("./components/Search"),
    Login: () => import("./components/Login"),
    Register: () => import("./components/Register"),
    Cart : () => import("./components/Cart")
  },
  data: () => ({
    drawer: false,
    menus: [
      { title: "Home", icon: "mdi-home", route: "/" },
      { title: "About", icon: "mdi-account", route: "/about" },
    ],
    // guest: true,
    //dialog:false
  }),
  computed: {
    dialog: {
      set:function(value){
        this.setDialogStatus(value)
      },
      get:function(){
        return this.dialogStatus
      }
    },
    nameApp: function () {
      return process.env.VUE_APP_NAME;
    },
    isHome: function () {
      return this.$route.path === "/";
    },
    ...mapGetters({
      countCart: "Cart/count",
      guest: "Auth/guest",
      user: "Auth/user",
      dialogStatus: "Dialog/status",
      currentComponent: "Dialog/component",
    }),
  },
  methods: {
    ...mapActions({
      setDialogStatus: "Dialog/setStatus",
      setDialogComponent: "Dialog/setComponent",
      setAuth: "Auth/set",
      setAlert: "Alert/set",
    }),
    logout : async function(){
      try {
        let logout = await this.axios('api/logout',{
          method : 'POST',
          headers : {
            "Content-Type": "multipart/form-data",
            "Authorization" : `Bearer ${this.user.api_token}`
          }
        })
        if(logout.status === 200){
          this.setAuth({})
          this.setAlert({
            status : true,
            color: logout.data.status,
            text: logout.data.message
          })
        }
      } catch (error) {
        this.setAlert({
          status : true,
          color : 'error',
          text : error.response.data.message
        })
      }
    }
  },
};
</script>
