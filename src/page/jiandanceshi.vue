<template>
  <div id="app">
    <h2>123456</h2>
    <router-link to="/jiandanceshi/foo">/user/foo</router-link>|
    <router-link to="/jiandanceshi/foo/profile">/user/foo/profile</router-link>|
    <router-link to="/jiandanceshi/posts">/user/foo/posts</router-link>|
    <search-form
      size="medium"
      label-width="60px"
      :search-data="searchData"
      :search-form="searchForm"
    />
  </div>
</template>
<script>
import { searchFormdata } from '@/components/test'
import SearchForm from '@/page/component1'
export default {
  components: {
    SearchForm
  },
  data() {
    return {
      searchData: {
        name: null,
        age: null,
        sex: null,
        date: '',
        interst: []
      },
      age: [
        { label: '十二', value: '12' },
        { label: '十一', value: '11' }
      ],
      searchForm: searchFormdata
    }
  },
  created() {
    this.sendData()
  },
  methods: {
    sendData() {
      this.$axios
        .get(
          '/mockapi.eolinker.com/cuKf4eM11133b446bff9b77bbd4e6f139a687903dcf6559/vuex/ceshi'
        )
        .then(function (response) {
          console.log(response)
        })
    }
  }
}
</script>
