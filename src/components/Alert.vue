<template>
  <v-snackbar v-model="alert" multi-line top :color="color">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" dark text v-bind="attrs" @click="close()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "alert",
  computed: {
    ...mapGetters({
      status: "Alert/status",
      color: "Alert/color",
      text: "Alert/text",
    }),
    alert: {
      get: function () {
        return this.status;
      },
      set: function (value) {
        this.setAlert({
          status: value,
          type: "success",
          text: "test",
        });
      },
    },
  },
  methods: {
    ...mapActions({
      setAlert: "Alert/set",
    }),
    close: function () {
      this.setAlert({
        status: false,
      });
    },
  },
};
</script>