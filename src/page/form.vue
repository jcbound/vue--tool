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
                <el-dropdown-item v-if="scope.row.master" command="masterTaskUp">新建主任务(在上)</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.master" command="masterTaskDown">新建主任务(在下)</el-dropdown-item>
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
      console.log(key)
      console.log(row, '123132132')
    },
    // 新建任务
    createTask() { },
    // 新建主任务
    handleMainTask(row, key) {
      console.log(row, key, '7897897987987')
      // 向数组插入一行
      if (key === 'masterTaskDown') {
        this.tableData.splice(row.id, 0, {
          id: `${+row.id + 1}`,
          taskName: '下',
          taskDescription: '测试是否正常',
          isEditing: true,
          master: true,
          children: []
        })
      } else {
        if (row.id === 1) {
          this.tableData.splice(`${row.id - 1}`, 0, {
            id: `1`,
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
      }
      console.log(this.tableData)
      // 插入数据后进行排序
      function sort(tableData, key) {
        tableData.forEach((item, index) => {
          if (key === 'masterTaskDown') {
            if (`${item.id}`.startsWith('1')) {
              return false
            } else {
              console.log('555555555')
            }
          }
          if (item.id.includes('.')) {
            let str = item.id.slice(0, 1)
            item.id = `${+str + 1}${item.id.slice(1)}`
          } else {
            item.id = `${+item.id + 1}`
          }
          if (item.children && item.children.length > 0) {
            sort(item.children)
          }
        })
      }
      if (key === 'masterTaskUp') {
        let currentIndex = this.tableData.findIndex((item) => {
          return item.id === row.id
        })
        let arr = this.tableData.slice(currentIndex - 1)
        sort(arr, key)
      } else {
        let currentIndex = this.tableData.findIndex((item) => {
          return item.id === row.id
        })
        let arr = this.tableData.slice(currentIndex + 2)
        sort(arr, key)
      }
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
      let currentLevel = 0
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
              console.log(count, '各种条件测试问题')
              console.log(item.id, '删除的是多少')
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
            return item.id === row.id.slice(0, 1)
          })
          let arr = this.tableData.slice(currentIndex)
          sort2(arr)
        }

        function sort2(tableData) {
          tableData.forEach((item, index) => {
            if (!item.id.includes('.')) {
              // return false
              currentLevel = 0
            } else if (item.id.includes('.') && item.id.length >= 3) {
              if (index === 0) {
                //  currentLevel变量为每一层级父节点索引为0的id值,
                if (currentLevel) {
                  item.id = `${currentLevel}.1`
                  // }
                } else {
                  item.id = `${item.id.slice(0, item.id.length - 1)}1`
                }
              } else {
                item.id = `${tableData[index - 1].id.slice(0, tableData[index - 1].id.length - 1)}${+tableData[index - 1].id.slice(tableData[index - 1].id.length - 1) + 1}`
              }
              currentLevel = item.id
              console.log(currentLevel, '第一次')
            }
            if (item.children && item.children.length > 0) {
              sort2(item.children)
            }
          })
        }

        function sort(tableData) {
          tableData.forEach((item, index) => {
            if (`${item.id}`.startsWith('1')) {
              return false
            } else {
              if (item.id.includes('.')) {
                let str = item.id.slice(0, 1)

                // item.id = `${str - 1}.${item.id.slice(item.id.length - 1, item.id.length) - 1}`
                item.id = `${str - 1}${item.id.slice(1)}`
                // item.id = `${str - 1}${item.id.slice(1)}`
              } else {
                item.id = `${item.id - 1}`
                console.log('797987987979 ')
              }
              if (item.children && item.children.length > 0) {
                sort(item.children)
              }
            }
          })
        }
      }
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
