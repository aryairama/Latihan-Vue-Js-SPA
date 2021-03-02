<template>
  <div>
    <v-container grid-list-lg fluid>
      <v-subheader>All Category</v-subheader>
      <v-layout row wrap>
        <v-flex
          v-for="category of categories"
          :key="'category-' + category.id"
          xs6
          lg3
          md3
        >
          <v-card :to="'/category/' + category.slug">
            <v-img
              :src="getImage('/categories/' + category.image)"
              class="white--text"
            >
              <v-card-title
                class="fill-height align-end"
                v-text="category.name"
              ></v-card-title>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
      <v-pagination
        color="info"
        v-model="page"
        @input="go"
        :length="lengthPage"
        :total-visible="5"
      ></v-pagination>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    categories: [],
    page: 1,
    lengthPage: 0,
  }),
  created: function () {
    this.go();
  },
  methods: {
    go: function () {
      let url = "/api/categories?page=" + this.page;
      this.axios
        .get(url)
        .then((response) => {
          let { meta } = response.data;
          this.page = meta.current_page;
          this.lengthPage = meta.last_page;
          let { data } = response.data;
          this.categories = data;
        })
        .catch((error) => {
          let { response } = error;
          console.log(response);
        });
    },
  },
};
</script>
