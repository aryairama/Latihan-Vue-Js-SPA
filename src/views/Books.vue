<template>
  <div>
    <v-container grid-list-lg fluid>
      <v-subheader> All Books </v-subheader>
      <v-layout wrap>
        <v-flex v-for="book in books" :key="`book-` + book.id" xs6 lg3 md3>
          <v-card :to="'/book/' + book.slug">
            <v-img :src="getImage('/books/' + book.cover)" class="white--text">
              <v-card-title
                class="fill-height align-end"
                v-text="book.title"
              ></v-card-title>
            </v-img>
          </v-card>
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
    books: [],
    page: 1,
    lengthPage: 0,
  }),
  created() {
    this.go();
  },
  methods: {
    go() {
      let url = "api/books?page=" + this.page;
      this.axios
        .get(url)
        .then((response) => {
          let { data } = response.data;
          let { meta } = response.data;
          this.books = data;
          // jumlah halaman di dapat dari meta endpoint books
          this.lengthPage = meta.last_page;
          this.page = meta.current_page;
        })
        .catch((error) => {
          let { responses } = error;
          console.log(responses);
        });
    },
  },
};
</script>