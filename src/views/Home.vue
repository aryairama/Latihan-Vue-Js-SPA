<template>
  <div>
    <!-- template categries -->
    <v-container grid-list-lg fluid>
      <div class="text-right">
        <v-btn small text to="/categories" class="blue--text">
          All Categories <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <v-layout wrap row>
        <v-flex
          v-for="(category, index) in categories"
          :key="`category-` + category.id"
          xs6
          lg3
          md3
        >
          <v-card :key="index" :to="'/category/' + category.slug">
            <v-img :src="getImage(('/categories/'+category.image))" class="white--text">
              <v-card-title
                class="fill-height align-end"
                v-text="category.name"
              ></v-card-title>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- template books -->
    <v-container class="mt-2" grid-list-lg fluid>
      <div class="text-right">
        <v-btn small text to="/books" class="blue--text">
          All Books <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <v-layout wrap>
        <v-flex
          v-for="book in books"
          :key="`book-` + book.id"
          xs6
          lg3
          md3
        >
          <BookItem :book="book"/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// // @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data: () => ({
    categories: [],
    books: [],
  }),
  components : {
    BookItem : ()=> import('../components/BookItem')
  },
  created : function(){
    this.axios.get('/api/categories/random/4')
    .then(response => {
      let {data}  = response.data
      this.categories = data
    }).catch(error => {
      let {response} = error
      console.log(response);
    })
    this.axios.get('/api/books/top/8')
    .then(response => {
      let {data}  = response.data
      this.books = data
    }).catch(error => {
      let {response} = error
      console.log(response);
    })
  },
};
</script>
