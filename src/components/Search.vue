<template>
  <v-card>
    <v-toolbar dark color="info">
      <v-btn icon dark @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-text-field
        hide-details
        append-icon="mdi-microphone"
        flat
        label="Search"
        prepend-inner-icon="mdi-magnify"
        v-model="keyword"
        @input="doSearch"
      ></v-text-field>
    </v-toolbar>
    <v-card-text>
      <v-subheader v-if="keyword.length > 0">
        Result search "{{ keyword }}"
      </v-subheader>
      <v-alert :value="books.length == 0 && keyword.length > 0" color="warning">
        Sorry, but no results were found.
      </v-alert>
      <!-- Hasil pencarian ditampilkan di sini -->
      <v-container fluid grid-list-lg>
        <v-layout wrap>
          <v-flex v-for="book in books" :key="`book-` + book.id" xs6 lg3 md3>
            <BookItem :book="book"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name : 'search',
  components : {
    BookItem : ()=> import('./BookItem')
  },
  data : ()=>({
    keyword : '',
    books : []
  }),
  methods : {
    doSearch: function(){
      let keyword = this.keyword
      if(keyword.length>0){
        this.axios.get('api/books/search/'+keyword)
          .then(response => {
            let {data} = response.data
            this.books = data
          })
          .catch(error => {
            let {response} = error
            console.log(response);
          })
      } else {
        this.books = []
      }
    },
    close : function(){
      // this.$emit('closed',false)
      this.$store.dispatch('Search/dialog',false)
    }
  }
};
</script>