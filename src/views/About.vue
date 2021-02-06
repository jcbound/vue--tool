<template>
  <div>
    <el-button type="primary" @click="clearSelected">清除选中状态</el-button>
    <!-- <el-table
      :data="tableData"
      tooltip-effect="dark"
      v-loading="loading"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :row-key="getKey"
      ref="multipleTable"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true">
      </el-table-column>
      <el-table-column prop="date" label="日期" width="120"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="id" label="id" show-overflow-tooltip>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >隐藏</el-checkbox
          >
        </template>
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.checked"
            @change="handleCheckOneChange"
            >隐藏</el-checkbox
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="0"
      :page-sizes="[5, 10]"
      :page-size="0"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination> -->
    <el-table ref="multipleTable" v-loading="loading" :data="testTableData" border tooltip-effect="dark" :span-method="mergeColumnMethod" style="width: 100%">
      <el-table-column prop="state" label="日期" width="120" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="level" label="级别" width="120" />
      <el-table-column prop="date" label="日期" width="120" />
      <el-table-column prop="age" label="年龄" width="120" />
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      tableData: [
        {
          name: '李时珍',
          sex: '男'
          // checked: false,
        },
        {
          name: '花木兰',
          sex: '女'
          // checked: false,
        }
      ],
      testTableData: [
        {
          state: 'approved',
          name: '小李',
          level: '地区经理',
          date: '2017-11-28',
          age: '30'
        },
        {
          state: 'approved',
          name: '小明',
          level: '部门经理',
          date: '2017-11-28',
          age: '30'
        },
        {
          state: 'approved',
          name: '小王',
          level: '部门经理',
          date: '2017-11-28',
          age: '31'
        },
        {
          state: 'waiting',
          name: '小赵',
          level: '部门经理',
          date: '2017-11-28',
          age: '32'
        },
        {
          state: 'waiting',
          name: '小朱',
          level: '部门经理',
          date: '2017-11-28',
          age: '33'
        },
        {
          state: 'waiting',
          name: '小马',
          level: '部门经理',
          date: '2017-11-28',
          age: '35'
        },
        {
          state: 'init',
          name: '小吴',
          level: '大区部门经理',
          date: '2017-11-28',
          age: '36'
        }
      ],
      selectedData: [],
      total: null,
      checkAll: false,
      listQuery: {
        pageSize: 5,
        pageNum: 1
      },
      isIndeterminate: false,
      mergeData: { 0: 3, 1: 0, 2: 0, 3: 3, 4: 0, 5: 0, 6: 1 },
      mergeDatas: [3, 0, 0, 3, 0, 0, 1],
      currentIndex: null,
      rowSpanArr: []
    }
  },
  created() {
    this.getList()
    this.getCeshiList()
  },
  methods: {
    getKey(row) {
      return row.id
    },
    getList() {
      this.loading = true
      this.$axios
        .get('https://yapi.baidu.com/mock/13985/test/list', {
          params: this.listQuery
        })
        .then((res) => {
          this.loading = false
          this.total = res.data.data.total
          this.tableData = res.data.data.list
          // this.selectedData.forEach((list) => {
          //   this.tableData.forEach((item) => {
          //     if (list.id === item.id) {
          //       this.$nextTick(() => {
          // this.$refs.multipleTable.toggleRowSelection(row, true);
          //     });
          //   }
          // });
          // });
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 测试合并问题
    getCeshiList() {
      this.rowSpanArr = []
      this.testTableData.forEach((item, index) => {
        if (index == 0) {
          this.rowSpanArr.push(1)
          this.currentIndex = 0
        } else {
          if (
            this.testTableData[index].state ==
            this.testTableData[index - 1].state // 前一行与后一行数据的state进行对比，
          ) {
            this.rowSpanArr[this.currentIndex] += 1 // 符合条件的值进行累加，，
            this.rowSpanArr.push(0)
            // this.testTableData[index].state = this.testTableData[
            //   index - 1
            // ].state;
          } else {
            this.rowSpanArr.push(1)
            this.currentIndex = index
          }
        }
      })
    },
    // 复选框选择
    handleSelectionChange(selection) {
      this.selectedData = selection
    },
    // 清楚选中状态
    clearSelected() {
      this.selectedData = []
      this.$refs.multipleTable.clearSelection()
    },
    // 复选框全选
    handleCheckAllChange(val) {
      this.tableData.forEach((item) => {
        // item.checked = val;
        this.$set(item, 'checked', val)
        console.log(val, '回家了')
      })
      console.log(this.tableData, '789456')
    },
    // checkbox多选
    handleCheckOneChange(val) {
      console.info('check one change is ', val)
      let totalCount = this.tableData.length
      let someStatusCount = 0
      this.tableData.forEach((item) => {
        if (item.checked === val) {
          someStatusCount++
        }
      })
      console.log(someStatusCount)
      this.checkAll = totalCount === someStatusCount ? val : !val
      this.isIndeterminate =
        someStatusCount > 0 && someStatusCount < totalCount
    },
    // 合并列
    mergeColumnMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        row = this.rowSpanArr[rowIndex]
        return {
          rowspan: row,
          colspan: 1
        }
        // if (row.state==='approved') {
        // return {
        //   rowspan: 3,
        //   colspan: 1,
        // };
        // } else {
        //   return {
        //     rowspan: 0,
        //     colspan: 0,
        //   };
        // }
      }
    },
    // 分页
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    }
  }
}
</script>
<style lang="scss">
</style>
