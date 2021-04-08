<template>
  <div>
    <v-subheader>Histori Belanja</v-subheader>
    <v-card>
      <v-simple-table>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>
              Invoice: {{ item.invoice_number }}
              <div class="info--text title">
                Rp. {{ item.total_bill.toLocaleString("id-ID") }}
              </div>
              <small
                >date: {{ item.updated_at }}. courier:
                {{ item.courier_service }}</small
              >
            </td>
            <td>{{ item.status }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    items: [],
  }),
  computed: {
    ...mapGetters({
      user: "Auth/user",
    }),
  },
  methods: {
    ...mapActions({
      setAlert: "Alert/set",
    }),
  },
  mounted: async function () {
    try {
      let getOrder = await this.axios("/api/myorder", {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${this.user.api_token}`,
        },
      });
      if (getOrder.status === 200) {
        let { data } = getOrder.data;
        this.items = data;
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
};
</script>

<style>
</style>