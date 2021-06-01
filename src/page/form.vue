<template>
  <div class="dialog-content">
    <el-button type="primary" @click="getTableData">打印tableData数据</el-button>
    <!-- 树形表格增删改功能 -->
    <el-table :data="tableData" class="table-content" style="margin-bottom: 20px" row-key="id" border default-expand-all :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="id" label="序号" width="180" />
      <el-table-column prop="taskName" label="任务名称" width="180">
        <template slot-scope="scope">
          <div
            v-if="
              scope.row.isEditing &&
                scope.row.taskName !== '交付启动' &&
                scope.row.taskName !== '项目验收'
            "
          >
            <el-input v-model="scope.row.taskName" placeholder="请输入内容" />
          </div>
          <span v-else>{{ scope.row.taskName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="taskDescription" label="任务描述">
        <template slot-scope="scope">
          <div v-if="scope.row.isEditing">
            <el-input v-model="scope.row.taskDescription" placeholder="请输入内容" />
          </div>
          <span v-else>{{ scope.row.taskDescription }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="100">
        <template slot-scope="scope">
          <div>
            <el-dropdown trigger="click" class="dropdown-style" @command="handleCommand($event, scope.row)">
              <span class="el-dropdown-link"> 新建 </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="masterTaskUp">新建同级任务(在上)</el-dropdown-item>
                <el-dropdown-item command="masterTaskDown">新建同级任务(在下)</el-dropdown-item>
                <el-dropdown-item command="sonTask">新建子任务</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button
              v-if="
                scope.row.taskName !== '交付启动' &&
                  scope.row.taskName !== '项目验收'
              "
              type="text"
              @click="remove(scope.row, scope.$index)"
            >删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      total: null,
      listDetailLoading: false,
      tableDeitalData: [],
      tableData: [
        {
          id: '1',
          taskName: '交付启动',
          taskDescription: '上海市普陀区金沙江路 1518 弄',
          isEditing: true,
          children: [],
          master: true
        },
        {
          id: '2',
          taskName: '项目验收',
          taskDescription: '上海市普陀区金沙江路 1518 弄',
          isEditing: true,
          children: [],
          master: true
        }
      ],
      maxTableHeight: 350,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        networkNo: ''
      },
      formData: {},
      rules: {}
    }
  },
  watch: {
    visible(value) {
      if (value) {
        console.log(value)
      }
    }
  },
  methods: {
    showDetail() {
      console.log(this.tableData)
    },
    handleCommand(key, row) {
      switch (key) {
        case 'masterTaskUp':
          this.handleMainTask(row, key)
          break
        case 'masterTaskDown':
          this.handleMainTask(row, key)
          break
        case 'sonTask':
          this.createSonTask(row)
          break
        default:
          break
      }
    },
    // 新建任务
    createTask() { },
    // 新建主任务
    handleMainTask(row, key) {
      // 子任务新建同级任务时执行函数
      let flag = false
      let newData = {
        id: `${row.id.slice(0, row.id.length - 1)}${+row.id.slice(row.id.length - 1) + 1}`,
        taskName: '子任务',
        taskDescription: '子任务测试是否正常',
        // isEditing: true,
        // master: true,
        children: []
      }
      function subInsert(tableData, location) {
        if (flag) return
        tableData.forEach((item, index) => {
          if (flag) return
          if (item.id === row.id) {
            if (location === 'before') {
              // 判断点击的是不是第一个值
              if (index === 0) {
                newData.id = row.id
              } else {
                newData.id = `${row.id.slice(0, row.id.length - 1)}${+row.id.slice(row.id.length - 1) - 1}`
              }
            }
            tableData.splice(location === 'after' ? index + 1 : index, 0, newData)
            // throw new Error('EndIterative')
            flag = true
          }
          if (item.children && item.children.length > 0) {
            subInsert(item.children, location)
          }
        })
      }
      let currentLevel = 0
      let masterId = row.id.slice(0, 1)
      let currentIndex = this.tableData.findIndex((item) => {
        return item.id === masterId
      })
      let currentIndex2 = 0
      if (`${row.id}` === '1') {
        currentIndex2 = 0
      } else {
        currentIndex2 = this.tableData.findIndex((item) => {
          return item.id === row.id
        })
      }
      // 向数组插入一行
      if (key === 'masterTaskDown') {
        // 如果点击的是子任务的新建同级任务
        if (row.id.includes('.')) {
          subInsert(this.tableData, 'after')
          let arr = this.tableData.slice(currentIndex, currentIndex + 1)
          this.sort2(arr, currentLevel)
        } else {
          // 点击主任务同级任务
          console.log(row.id)
          this.tableData.splice(row.id, 0, {
            id: `${+row.id + 1}`,
            taskName: '下',
            taskDescription: '测试是否正常',
            isEditing: true,
            master: true,
            children: []
          })
          if (!row.id.includes('.')) {
            let arr = this.tableData.slice(currentIndex2 + 2)
            sort(arr, key)
          }
        }
      } else {
        if (row.id.includes('.')) {
          subInsert(this.tableData, 'before')
          let arr = this.tableData.slice(currentIndex, currentIndex + 1)
          this.sort2(arr, currentLevel)
        } else {
          if (`${row.id}` === '1') {
            this.tableData.splice(0, 0, {
              id: `0`,
              taskName: '1上',
              taskDescription: '测试是否正常',
              isEditing: true,
              master: true,
              children: []
            })
          } else {
            this.tableData.splice(`${row.id - 1}`, 0, {
              id: `${+row.id - 1}`,
              taskName: '上',
              taskDescription: '测试是否正常',
              isEditing: true,
              master: true,
              children: []
            })
          }
          if (!row.id.includes('.')) {
            let arr = this.tableData.slice(currentIndex2)
            sort(arr, key)
          }
        }
      }
      // 插入数据后进行排序
      function sort(tableData, key) {
        tableData.forEach((item, index) => {
          if (key === 'masterTaskDown') {
            if (`${item.id}` === '1') {
              return false
            }
          }
          if (item.id.includes('.')) {
            let str = item.id.slice(0, 1)
            item.id = `${+str + 1}${item.id.slice(1)}`
          } else {
            item.id = `${+item.id + 1}`
            console.log(item.id, '7897979')
            // }
          }
          if (item.children && item.children.length > 0) {
            sort(item.children, key)
          }
        })
      }
      // 获取当前的点击行的索引

      // if (key === 'masterTaskUp') {
      //   if (!row.id.includes('.')) {
      //     let arr = this.tableData.slice(currentIndex2)
      //     sort(arr, key)
      //   }
      // } else {
      //   if (!row.id.includes('.')) {
      //     let arr = this.tableData.slice(currentIndex2 + 2)
      //     sort(arr, key)
      //   }
      // }
    },
    // 创建子任务
    createSonTask(row, index) {
      let arr = row.id.split('.')
      if (arr.length === 5) {
        this.$message.warning('最多创建5层子任务')
        return
      }
      if (row.children) {
        let arr = { taskName: '王小虎' }
        row.children.push({
          taskDescription: '子任务',
          children: [],
          isEditing: true,
          id: `${row.id}.${row.children.length + 1}`
        })
      }
    },

    // 删除
    remove(row, index) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteAndSort(row)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch((e) => {
          console.log(e)
        })
      let level = 0
      let currentLeve1 = 0
      var deleteAndSort = (row) => {
        let count = []
        function removeCurrentRow(tableData) {
          tableData.forEach((item, index) => {
            if (item.master) {
              count = 0
            }
            if (item.id === row.id) {
              tableData.splice(index, 1)
              count += 1
            } else {
              count += 1
              if (item.children && item.children.length > 0) {
                removeCurrentRow(item.children)
              }
            }
          })
        }
        removeCurrentRow(this.tableData)

        if (row.master) {
          // 判断点击的是主任务行,递归进行重新排序
          let currentIndex = this.tableData.findIndex((item) => {
            return item.id === `${+row.id - 1}`
          })
          // 取点击删除行后面的数组进行排序,前面的不受影响,不用排序
          let arr = this.tableData.slice(currentIndex + 1)
          sort(arr)
        } else {
          let currentIndex = this.tableData.findIndex((item) => {
            return item.id === row.id.slice(0, row.id.indexOf('.'))
          })
          let arr = this.tableData.slice(currentIndex)
          this.sort2(arr, currentLeve1)
        }

        function sort(tableData) {
          tableData.forEach((item, index) => {
            if (`${item.id}` === '1') {
              return false
            } else {
              if (item.id.includes('.')) {
                let str = item.id.slice(0, item.id.indexOf('.'))

                // item.id = `${str - 1}.${item.id.slice(item.id.length - 1, item.id.length) - 1}`
                item.id = `${str - 1}${item.id.slice(item.id.indexOf('.'))}`
                // item.id = `${str - 1}${item.id.slice(1)}`
              } else {
                item.id = `${item.id - 1}`
              }
              if (item.children && item.children.length > 0) {
                sort(item.children)
              }
            }
          })
        }
      }
    },
    sort2(tableData, currentLevel) {
      tableData.forEach((item, index) => {
        if (!item.id.includes('.')) {
          // return false
          currentLevel = item.id
        } else if (item.id.includes('.') && item.id.length >= 3) {
          if (index === 0) {
            console.log(currentLevel, '是多少')
            //  currentLevel变量为每一层级父节点索引为0的id值,
            if (currentLevel) {
              item.id = `${currentLevel}.1`
              console.log(item.id)
              // }
            } else {
              item.id = `${item.id.slice(0, item.id.length - 1)}1`
            }
          } else {
            item.id = `${tableData[index - 1].id.slice(0, tableData[index - 1].id.length - 1)}${+tableData[index - 1].id.slice(tableData[index - 1].id.length - 1) + 1}`
          }
          currentLevel = item.id
        }
        if (item.children && item.children.length > 0) {
          this.sort2(item.children, currentLevel)
        }
      })
    },
    // 关闭弹窗
    handleClose() {
      this.$emit('update:visible', false)
    },
    // 提交
    handleSubmit() { },
    // 分页
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    getTableData() {
      console.log(this.tableData, '99999999')
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-content {
  .template-table-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .template-table-title {
      font-weight: bold;
    }
  }
  .table-content {
    margin-bottom: 20px;
    .dropdown-style {
      margin-right: 10px;
      .el-dropdown-link {
        cursor: pointer;
        color: #1585ff;
      }
    }
  }
}
</style>
