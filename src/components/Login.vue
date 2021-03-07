<template>
  <v-card>
    <v-toolbar dark color="info">
      <v-btn icon dark @click="close()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title> Login and Start Shopping! </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-container fluid>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          name="email"
          label="E-mail"
          id="email"
          :rules="emailRules"
          required
          append-icon="mdi-email"
        ></v-text-field>
        <v-text-field
          name="password"
          label="Password"
          id="password"
          v-model="password"
          :rules="passwordRules"
          hint="At least 6 characters"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          counter
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <div class="text-sm-center">
          <v-btn color="info" :disabled="!valid" @click="submit">
            Login
            <v-icon right dark>mdi-lock-open</v-icon>
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "login",
  data: () => ({
    valid: true,
    email: "youremail@domain.com",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        /^([a-z0-9.-]+)([a-z0-9]+)([@])([a-z0-9]+)([.])([a-z0-9.]+)([a-z0-9]+)$/.test(
          v
        ) || "E-mail must be valid",
    ],
    showPassword: false,
    password: "",
    passwordRules: [
      (v) => !!v || "Password required",
      (v) => (v && v.length >= 6) || "Min 6 characters",
    ],
  }),
  computed: {
    ...mapGetters({
      user: "Auth/user",
    }),
  },
  methods: {
    ...mapActions({
      setAlert: "Alert/set",
      setAuth: "Auth/set",
    }),
    submit: function () {
      if (this.$refs.form.validate()) {
        let formData = new FormData();
        formData.append("email", this.email);
        formData.append("password", this.password);
        this.axios("api/login", {
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((response) => {
            let { data } = response.data;
            this.setAuth(data);
            if (this.user.id > 0) {
              this.setAlert({
                status: true,
                color: "success",
                text: "Login success",
              });
              this.close();
            } else {
              this.setAlert({
                status: true,
                color: "error",
                text: "Login failed",
              });
            }
          })
          .catch((error) => {
            let responses = error.response;
            this.setAlert({
              status: true,
              text: responses.data.message,
              color: "error",
            });
          });
      }
    },
    close: function () {
      this.$emit("closed", false);
    },
  },
};
</script>