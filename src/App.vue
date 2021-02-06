<!--
 * @Author       : jcbound
 * @Date         : 2021-01-30 14:34:56
 * @LastEditors  : jcbound
 * @LastEditTime : 2021-02-06 17:41:16
 * @Description  : 我添加了修改
 * @FilePath     : \vuetest\src\App.vue
-->
<template>
  <div id="app">
    <div id="nav">
      <el-button type="primary" @click="handleClick">访问跳转</el-button>
      <!-- <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/test">Test</router-link>|
      <router-link to="/login" target="_blank">login</router-link>|
      <router-link to="/tree">tree</router-link>|
      <router-link to="/table">table</router-link>|
      <router-link to="/form">form</router-link>|
      <router-link to="/formceshi">form1</router-link>|
      <router-link to="/user/foo">/user/foo</router-link>|
      <router-link to="/user/foo/profile">/user/foo/profile</router-link>|
      <router-link to="/user/foo/posts">/user/foo/posts</router-link>|
      <router-link to="/jiandanceshi">jiandan</router-link>|
      <router-link to="/table01">table01</router-link>|
      <router-link to="/table02">table02</router-link>|
      <router-link to="/table03">table03</router-link>|
      <router-link to="/form4">form4</router-link>|
      <router-link to="/routeceshi">routeceshi</router-link>
      <router-link to="/form5">form5</router-link>|
      <el-button @click="handleHelp">跳转</el-button> -->
    </div>
    <!-- <rightSlider v-if="!$route.meta.keepAlive"></rightSlider> -->
    <router-view />
  </div>
</template>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
<script>
import slider from './components/slider'
import rightSlider from './components/rightSlider'
import Header from './components/header'
import Footer from './page/footer'

export default {
  name: 'App',
  components: {
    slider,
    rightSlider,
    Header,
    Footer
  },
  data() {
    return {
      isShow: true
    }
  },
  watch: {
    $route(to) {
      if (to.path != '/' && to.path != '/test') {
        this.isShow = false
      } else {
        this.isShow = true
      }
    }
  },
  methods: {
    handleHelp() {
      // const para={prject:"123465789"}
      const { href } = this.$router.resolve({
        path: `/routeceshi?project=79879494`

      })
      window.open(href, '_blank')
    },
    handleClick() {
      this.$router.push('./routeNav')
    }
  }
}
</script>
