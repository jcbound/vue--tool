<template>
  <div>
    <el-table :data="tableAllData" style="width: 100%" :max-height="maxHeight">
      <el-table-column type="index" label="序号" width="180"> </el-table-column>
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNum"
      :page-sizes="[20, 30, 40]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: 50,
      maxHeight: 350,
      tableData: new Array(50).fill({
        date: "1",
        name: "xiaoling",
        address: "浙江杭州",
      }),
      listQuery: {
        pageSize: 20,
        pageNum: 1,
      },
    };
  },
  computed: {
    tableAllData() {
      return this.tableData.slice(
        (this.listQuery.pageNum - 1) * this.listQuery.pageSize,
        this.listQuery.pageNum * this.listQuery.pageSize
      );
    },
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
    },
  },
};
</script>
<style lang="less">
</style>