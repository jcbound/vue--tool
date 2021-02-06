<!--
 * @Author: jcbound
 * @Date: 2021-01-30 14:34:56
 * @LastEditors: jcbound
 * @LastEditTime: 2021-02-03 22:57:04
 * @Description: 我添加了修改
 * @FilePath: \vuetest\src\page\routeceshi.vue
-->
<template>
  <div>
    <h1>主页</h1>

    <div class="router">
      <span>嵌套路由的展示 {{ this.$route.query }}</span>
      <router-link to="/routeceshi/ceshi01">测试01</router-link>&nbsp;
      <router-link to="/routeceshi/ceshi02">测试02</router-link>
      <!-- <span @click="routerTo">ceshi02</span> -->
      <el-button @click="routerTo">测试02</el-button>
      <router-view />
    </div>
  </div>
</template>
<style scoped>
.router {
  width: 500px;
  height: 500px;
  background-color: darkcyan;
}
</style>
<script>
export default {
  data() {
    return {
      params: ''
    }
  },
  methods: {
    routerTo() {
      this.$router.push({
        path: '/routeceshi/ceshi02',
        query: {
          project: '7894564646'
        }
      },)
    }
  }
}
</script>
