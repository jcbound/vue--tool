<!--
 * @Author: jcbound
 * @Date: 2021-01-30 14:34:56
 * @LastEditors: jcbound
 * @LastEditTime: 2021-02-03 23:09:56
 * @Description: 我添加了修改
 * @FilePath: \vuetest\src\page\table.vue
-->
<template>
  <div>
    <el-table :data="tableAllData" style="width: 100%" :max-height="maxHeight">
      <el-table-column type="index" label="序号" width="180" />
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="address" label="地址" />
    </el-table>
    <el-pagination
      :current-page="listQuery.pageNum"
      :page-sizes="[20, 30, 40]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: 50,
      maxHeight: 350,
      tableData: new Array(50).fill({
        date: '1',
        name: 'xiaoling',
        address: '浙江杭州'
      }),
      listQuery: {
        pageSize: 20,
        pageNum: 1
      }
    }
  },
  computed: {
    tableAllData() {
      return this.tableData.slice(
        (this.listQuery.pageNum - 1) * this.listQuery.pageSize,
        this.listQuery.pageNum * this.listQuery.pageSize
      )
    }
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageSize = val
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
    }
  }
}
</script>
<style lang="less">
</style>
