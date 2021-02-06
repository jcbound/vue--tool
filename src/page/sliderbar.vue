<!--
 * @Author: jcbound
 * @Date: 2021-01-30 14:34:56
 * @LastEditors: jcbound
 * @LastEditTime: 2021-02-03 23:40:55
 * @Description: 我添加了修改
 * @FilePath: \vuetest\src\page\sliderbar.vue
-->
<template>
  <div id="leftnav1">
    <div class="left">{{ value }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      master: ''
    }
  }
}
</script>
<style>
#leftnav1>.left{
	margin-top: 200px;
    width: 100px;
    height: 100px;
    background-color: #003399;
    color: #9966FF
}
</style>
<script>
export default {
  name: 'LeftNav',
  data: function() {
    return {
      message: 1,
      value: 2

    }
  }

}
</script>
