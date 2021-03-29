<template>
  <div>
    <v-subheader>Shipping Address</v-subheader>
    <div>
      <v-card flat>
        <v-container>
          <v-form ref="form" lazy-validation>
            <v-text-field
              label="Name"
              v-model="name"
              required
              append-icon="mdi-user"
            >
            </v-text-field>
            <v-textarea
              label="Address"
              v-model="address"
              required
              auto-growrows="3"
            >
            </v-textarea>
            <v-text-field
              label="Phone"
              v-model="phone"
              required
              append-icon="mdi-phone"
            >
            </v-text-field>
            <v-select
              v-model="province_id"
              :items="provinces"
              item-text="province"
              item-value="id"
              label="Province"
              persistent-hint
              single-line
            >
            </v-select>
            <v-select
              v-model="city_id"
              v-if="province_id > 0"
              :items="citiesByProvince"
              item-text="city"
              item-value="id"
              label="City"
              persistent-hint
              single-line
            >
            </v-select>
          </v-form>
          <v-card-actions>
            <v-btn color="info" dark @click="saveShipping()">
              <v-icon>mdi-content-save</v-icon> &nbsp;Save
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    name: "",
    address: "",
    phone: "",
    province_id: 0,
    city_id: 0,
  }),
  computed: {
    ...mapGetters({
      user: "Auth/user",
      provinces: "Region/provinces",
      cities: "Region/cities",
    }),
    citiesByProvince: function () {
      let province_id = this.province_id;
      return this.cities.filter((city) => {
        if (city.province_id === province_id) return city;
      });
    },
  },
  methods: {
    ...mapActions({
      setAlert: "Alert/set",
      setAuth: "Auth/set",
      setProvinces: "Region/setProvinces",
      setCities: "Region/setCities",
    }),
    saveShipping: async function () {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("address", this.address);
      formData.append("phone", this.phone);
      formData.append("province_id", this.province_id);
      formData.append("city_id", this.city_id);
      try {
        let sendSaveShipping = await this.axios("api/shipping", {
          method: 'POST',
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization" : `Bearer ${this.user.api_token}`,
          },
        })
        if (sendSaveShipping.status === 200) {
          let { data } = sendSaveShipping;
          this.setAuth(data.data);
          this.setAlert({
            status: true,
            text: data.message,
            color: "success",
          });
        }
      } catch (error) {
        let { data } = error.response;
        this.setAlert({
          status: true,
          text: data.message,
          color: "error",
        });
      }
    },
  },
  created: async function () {
    this.name = this.user.name;
    this.address = this.user.address;
    this.phone = this.user.phone;
    this.city_id = this.user.city_id;
    this.province_id = this.user.province_id;
    if (this.provinces && this.provinces.length === 0) {
      //get data provinsi
      try {
        let getProvinces = await this.axios.get("/api/provinces");
        let { data } = getProvinces.data;
        this.setProvinces(data);
      } catch (error) {
        console.log(error);
      }
      //get data kota
      try {
        let getCities = await this.axios.get("/api/cities");
        let { data } = getCities.data;
        this.setCities(data);
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>

<style>
</style>