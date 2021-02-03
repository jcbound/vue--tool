<template>
  <div class="home">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="性别" prop="sex" />
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >隐藏</el-checkbox>
        </template>
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.checked" @change="handleCheckOneChange">隐藏</el-checkbox>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style>
.activeClass {
  background-color: black;
}
</style>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      isActive: true,
      activeClass: 'active',
      errorClass: 'error',
      tableData: [
        {
          name: '李时珍',
          sex: '男',
          checked: false
        },
        {
          name: '花木兰',
          sex: '女',
          checked: true
        }
      ],
      checkAll: false,
      isIndeterminate: true
    }
  },
  methods: {
    selecable(row) {
      console.log(999990)
    },
    selectionSubChange() {
      console.log('你好你好')
    },
    selectionChange(val) {
      this.ceshiData = val
    },
    handleCheckAllChange(val) {
      console.info('check all change is ', val)
      this.isIndeterminate = false
      this.tableData.forEach(item => {
        item.checked = val
      })
    },
    handleCheckOneChange(val) {
      console.info('check one change is ', val)
      let totalCount = this.tableData.length
      let someStatusCount = 0
      this.tableData.forEach(item => {
        if (item.checked === val) {
          someStatusCount++
        }
      })
      this.checkAll = totalCount === someStatusCount ? val : !val
      this.isIndeterminate =
        someStatusCount > 0 && someStatusCount < totalCount
    },
    expandChange(row, rows) {
      this.$nextTick(function() {
        // this.ceshiData为勾选外层表格selection数组

        this.ceshiData.forEach((item, i) => {
          if (item.id === row.id) {
            // 判断展开行的id是不是与外层勾选数组中相同，如果相同，就执行row.child,即内部表格循环
            row.child.forEach((list, index) => {
              console.log('我的')
              console.log(this.$refs['subTable' + [i]], 1231231)
              this.$refs['subTable' + [i]].toggleRowSelection(list, true)
              console.log(
                this.$refs['subTable' + [i]].toggleRowSelection(list, true)
              )
            })
          }
        })
      })
    }
  }
}
</script>
