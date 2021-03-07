<template>
  <v-card>
    <v-toolbar dark color="info">
      <v-btn icon dark @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Register!</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-container fluid>
      <v-form lazy-validation v-model="valid" ref="form">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          :counter="255"
          label="Name"
          required
          append-icon="mdi-user"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          append-icon="mdi-email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          hint="At least 6 characters"
          counter
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-checkbox
          color="info"
          v-model="checkbox"
          :rules="[(v) => !!v || 'You must agree to continue!']"
          label="Do You agree with our Privacy Policy?"
          required
        ></v-checkbox>
        <div class="text-sm-center">
          <v-btn color="accent info" :disabled="!valid" @click="submit">
            Register
            <v-icon right dark>mdi-account-plus</v-icon>
          </v-btn>
          <v-btn @click="clear">
            Reset
            <v-icon right dark>mdi-lock-reset</v-icon>
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "register",
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 255) || "Name must be less than 255 characters",
    ],
    email: "example@domain.com",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        /^([a-z0-9.-]+)([a-z0-9]+)([@])([a-z0-9]+)([.])([a-z0-9.]+)([a-z0-9]+)$/.test(
          v
        ) || "E-mail must be valid",
    ],
    showPassword: false,
    password: "123456",
    passwordRules: [
      (v) => !!v || "Password required",
      (v) => (v && v.length >= 6) || "Min 6 Characters",
    ],
    checkbox: false,
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
    submit: async function () {
      if (this.$refs.form.validate()) {
        let formData = new FormData();
        formData.append("name", this.name);
        formData.append("email", this.email);
        formData.append("password", this.password);
        try {
          let response = await this.axios("api/register", {
            method: "POST",
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if(response.status === 200){
            let {data} = response.data
            this.setAuth(data)
            this.setAlert({
              status : true,
              color : 'success',
              text : 'Register success'
            })
            this.close()
            this.clear()
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
    close: function () {
      this.$emit("closed", false);
    },
    clear: function () {
      this.$refs.form.reset();
    },
  },
};
</script>