<template>
  <div>
    <v-card :to="'/category/' + category.slug" v-if="category.slug">
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
    <v-container grid-list-lg fluid v-if="books">
      <v-subheader> All Books </v-subheader>
      <v-layout wrap row>
        <v-flex v-for="book in books" :key="`book-` + book.id" 
          xs6
          lg3
          md3>
          <BookItem :book="book"/>
        </v-flex>
      </v-layout>
    </v-container>
    <template>
      <div class="text-center">
        <v-pagination
        color="info"
          v-model="page"
          @input="go"
          :length="lengthPage"
          :total-visible="5"
        ></v-pagination>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data: () => ({
    category: {},
    books: [],
    page: 0,
    lengthPage: 0,
  }),
  components : {
    BookItem : ()=> import('../components/BookItem')
  },
  created: function () {
    this.go();
  },
  methods: {
    go: function () {
      let { slug } = this.$route.params;
      let url = "/api/categories/slug/" + slug;
      url = url + "?page=" + this.page;
      url = encodeURI(url);
      this.axios
        .get(url)
        .then((response) => {
          let { data } = response.data;
          let category = data;
          this.category = category;
          this.books = category.books.data;
          this.page = category.books.current_page;
          this.lengthPage = category.books.last_page;
        })
        .catch((error) => {
          let { responses } = error;
          console.log(responses);
        });
    },
  },
};
</script>