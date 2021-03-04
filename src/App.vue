<template>
  <v-app>
    <v-app-bar app color="info" dark extended v-if="isHome">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ nameApp }}</v-toolbar-title>
      <!-- pemisah -->
      <v-spacer></v-spacer>
      <v-btn icon to="/about">
        <v-badge color="orange" overlap>
          <template v-slot:badge>
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
        @click="dialogOpen"
      ></v-text-field>
    </v-app-bar>
    <v-app-bar app color="info" dark v-else>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon to="/about">
        <v-badge color="orange" overlap>
          <template v-slot:badge>
            <span>{{ countCart }}</span>
          </template>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    <!--  -->
    <!-- sidebar -->
    <v-card>
      <v-navigation-drawer app v-model="drawer">
        <v-list-item v-if="!guest">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <div class="pa-2" v-if="guest">
          <v-btn block color="success">
            <v-icon>mdi-lock</v-icon>
            Login
          </v-btn>
          <v-btn block color="info" class="mt-1">
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
            <v-btn block color="red" dark>
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
      <Alert />
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="scaletransition">
        <search @closed="closeDialog($event)" />
      </v-dialog>
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
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    Alert: () => import("./components/Alert"),
    Search: () => import("./components/Search")
  },
  data: () => ({
    drawer: false,
    menus: [
      { title: "Home", icon: "mdi-home", route: "/" },
      { title: "About", icon: "mdi-account", route: "/about" },
    ],
    guest: true,
    //dialog:false
  }),
  computed: {
    dialog : function(){
        return this.dialog
    },
    nameApp: function () {
      return process.env.VUE_APP_NAME;
    },
    isHome: function () {
      return this.$route.path === "/";
    },
    ...mapGetters({
      countCart: "Cart/count",
      dialog: "Search/dialog"
    }),
  },
  methods : {
    closeDialog : function(value){
      this.dialog = value
    },
    dialogOpen: function(){
      // this.dialog = true
      this.$store.dispatch('Search/dialog',true)
    }
  }
};
</script>
