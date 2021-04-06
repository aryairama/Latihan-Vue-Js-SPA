<template>
  <div>
    <v-subheader>Shipping Address</v-subheader>
    <div>
      <v-card>
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
    <v-subheader>Your Shopping Cart</v-subheader>
    <div v-if="countCart > 0">
      <v-card>
        <v-list three-line v-if="countCart > 0">
          <template v-for="(item, index) in carts">
            <v-list-item :key="'cart' + index">
              <v-list-item-avatar>
                <v-img :src="getImage('/books/' + item.cover)"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle>
                  Rp. {{ item.price.toLocaleString("id-ID") }} ({{
                    item.weight
                  }}kg)
                  <span style="margin-left: 50px"> x{{ item.quantity }} </span>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
        <v-container>
          <v-card-actions>
            Subtotal
            <v-spacer></v-spacer>
            Rp. {{ totalPrice.toLocaleString("id-ID") }}
          </v-card-actions>
        </v-container>
      </v-card>
    </div>
    <v-subheader>Courier</v-subheader>
    <div>
      <v-card>
        <v-container>
          <v-select
            :items="couriers"
            v-model="courier"
            label="Courier"
            @change="getServices()"
            item-text="text"
            item-value="id"
            persistent-hint
            single-line
          ></v-select>
          <v-select
            :items="services"
            v-model="service"
            label="Courier Service"
            v-if="courier"
            @change="calculateBill()"
            item-text="resume"
            item-value="service"
            persistent-hint
            single-line
          ></v-select>
          <v-card-actions>
            Subtotal
            <v-spacer></v-spacer>Rp. {{ shippingCost.toLocaleString("id-ID") }}
          </v-card-actions>
        </v-container>
      </v-card>
    </div>
    <!--  -->
    <v-subheader>Total</v-subheader>
    <div>
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs6 text-center>
              Total Bill ({{ totalQuantity }}items)
              <div class="title">{{ totalBill.toLocaleString("id-ID") }}</div>
            </v-flex>
            <v-flex xs6>
              <v-btn color="info" @click="dialogConfirm = true">
                <v-icon>mdi-cash</v-icon>&nbsp;Pay
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>
    <!-- Modal konfirm pay -->
    <template>
      <v-dialog v-model="dialogConfirm" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Confirmation!</v-card-title>
          <v-card-text
            >If You continue, transaction will be processed</v-card-text
          >
          <v-card-actions>
            <v-btn color="error" @click="cancel">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="pay">Continue</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    dialogConfirm: false,
    name: "",
    address: "",
    phone: "",
    province_id: 0,
    city_id: 0,
    courier: "",
    couriers: [],
    service: "",
    services: [],
    shippingCost: 0,
    totalBill: 0,
  }),
  computed: {
    ...mapGetters({
      user: "Auth/user",
      provinces: "Region/provinces",
      cities: "Region/cities",
      carts: "Cart/carts",
      countCart: "Cart/count",
      totalPrice: "Cart/totalPrice",
      totalQuantity: "Cart/totalQuantity",
      totalWeight: "Cart/totalWeight",
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
      setCart: "Cart/set",
      setPayment: "setPayment",
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
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.user.api_token}`,
          },
        });
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
    getServices: async function () {
      let courier = this.courier;
      let encodedCart = JSON.stringify(this.carts);
      let formData = new FormData();
      formData.append("courier", courier);
      formData.append("carts", encodedCart);
      try {
        let requestServices = await this.axios("/api/services", {
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.user.api_token}`,
          },
        });
        let { data } = requestServices.data;
        if (requestServices.status != "error") {
          this.services = data.services;
          this.setCart(data.safe_carts);
        }
        this.setAlert({
          status: true,
          text: requestServices.data.message,
          color: requestServices.data.status,
        });
      } catch (error) {
        let response = error.response;
        this.setAlert({
          status: true,
          text: response.data.message,
          color: "error",
        });
      }
    },
    calculateBill: function () {
      let selectedService = this.services.find((service) => {
        return service.service == this.service;
      });
      this.shippingCost = selectedService.cost;
      this.totalBill = parseInt(this.totalPrice) + parseInt(this.shippingCost);
    },
    cancel: function () {
      this.dialogConfirm = false;
    },
    pay: async function () {
      this.dialogConfirm = false;
      let courier = this.courier;
      let service = this.service;
      let safeCarts = JSON.stringify(this.carts);
      let formData = new FormData();
      formData.append("courier", courier);
      formData.append("service", service);
      formData.append("carts", safeCarts);
      try {
        let sendPay = await this.axios("/api/payment", {
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.user.api_token}`,
          },
        });
        let { data } = sendPay;
        if (sendPay.status === 200) {
          this.setPayment(data.data);
          this.setCart([]);
          this.$router.push({ path: "/payment" });
        }
        this.setAlert({
          status: true,
          text: data.message,
          color: data.status,
        });
      } catch (error) {
        let { data } = error.response;
        this.setAlert({
          status: true,
          text: data.message,
          color: data.status,
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
    //courier
    if (this.couriers.length === 0) {
      let getCouriers = await this.axios("/api/couriers", {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${this.user.api_token}`,
        },
      });
      this.couriers = getCouriers.data.data;
    }
  },
};
</script>

<style>
</style>