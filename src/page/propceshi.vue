<!--
 * @Author: jcbound
 * @Date: 2021-01-30 14:34:56
 * @LastEditors: jcbound
 * @LastEditTime: 2021-02-03 22:56:56
 * @Description: 我添加了修改
 * @FilePath: \vuetest\src\page\propceshi.vue
-->
<template>
  <div id="leftnav2">
    <div class="right1" @click="showlarge(ceshi)">{{ value }}-{{ post.title }}-{{ post.id }}<strong>Error!</strong>
      <slot>Something bad happened.</slot></div>
  </div>
</template>
<style>

#leftnav2>.right1 {
    float: right;
    width: 500px;
    height: 100px;
    background-color: #669999;
    color: #9966FF
}
</style>
<script>
export default {
  name: 'PropCeshi',
  props: ['post'],
  data: function() {
    return {
      message: 1,
      value: 0,
      ceshi: 10

    }
  },
  methods: {
    showlarge(ceshi) { this.$emit('enlargetext', ceshi) }
  }
}
</script>
