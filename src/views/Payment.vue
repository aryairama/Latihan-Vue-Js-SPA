<template>
  <div class="payment">
    <v-subheader>Payment Information</v-subheader>
    <v-card>
      <v-container v-if="payment">
        <v-simple-table>
          <tbody>
            <tr>
              <th>Order id</th>
              <td>{{ payment.order_id }}</td>
            </tr>
            <tr>
              <th>Invoice Number</th>
              <td>{{ payment.invoice_number }}</td>
            </tr>
            <tr>
              <th>Total Bill</th>
              <td>Rp.{{ payment.total_bill.toLocaleString("id-ID") }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-container>
    </v-card>
    <v-subheader>Transfer To</v-subheader>
    <v-card>
      <v-container>
        <v-simple-table>
          <tbody>
            <tr>
              <td><img src="" alt="ini bank" /></td>
              <td>BCA KCP abc No Rek 123</td>
            </tr>
            <tr>
              <td><img src="" alt="ini bank" /></td>
              <td>BRI KCP abc No Rek 123</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-container>
    </v-card>
    <v-subheader></v-subheader>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 text-center>
            <v-btn color="info" @click="finish()">Finish</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      payment: "payment",
    }),
  },
  created: function () {
    if (this.payment == undefined) {
      this.setAlert({
        status: true,
        text: "Payment Undifined",
        color: "warning",
      });
      this.$router.push("/");
    }
  },
  methods: {
    ...mapActions({
      setAlert: "Alert/set",
      setPayment: "setPayment"
    }),
    finish: function () {
      this.setAlert({
        status: true,
        text: "Transaction done",
        color: "success",
      });
      this.setPayment([])
      this.$router.push("/");
    },
  },
};
</script>
