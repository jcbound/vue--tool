<!--
 * @Author: jcbound
 * @Date: 2021-01-30 14:34:56
 * @LastEditors: jcbound
 * @LastEditTime: 2021-02-03 22:54:00
 * @Description: 我添加了修改
 * @FilePath: \vuetest\src\page\jiandanceshi.vue
-->
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
