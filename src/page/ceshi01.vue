<!--
 * @Author: jcbound
 * @Date: 2021-01-30 14:34:56
 * @LastEditors  : jcbound
 * @LastEditTime : 2021-03-03 15:32:18
 * @Description: 我添加了修改
 * @FilePath     : \vuetest\src\page\ceshi01.vue
-->
<template>
  <div class="toggle">

    <div class="app">
      <el-table
        :data="tableList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @cell-dblclick="tableEdit"
      >
        <el-table-column label="车辆类型" align="center">
          <template slot-scope="scope">{{ scope.row.type }}</template>
        </el-table-column>
        <el-table-column label="车架号" align="center">
          <template slot-scope="scope">{{ scope.row.frameNumber }}</template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>
<style>
</style>
<script>
new Vue({
  el: '#example-4',
  data: {
    picked: 'wode',
    tableList: []
  }
})
</script>
