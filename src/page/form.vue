<template>
  <div class="dialog-content">
    <!-- <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="100px">
        <el-form-item label="模板名称" prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="模板说明" prop="field102">
          <el-input v-model="formData.field102" type="textarea" placeholder="请输入多行文本" :autosize="{minRows: 2, maxRows: 3}" />
        </el-form-item>
        <div class="template-table-top">
          <span class="template-table-title">模板明细</span>
        </div>
      </el-form> -->
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
        // }, {
        //   id: 2,
        //   date: '2016-05-04',
        //   taskName: '王小虎',
        //   taskDescription: '上海市普陀区金沙江路 1517 弄',
        //   isEditing: false
        // }, {
        //   id: 3,
        //   date: '2016-05-01',
        //   taskName: '王小虎',
        //   taskDescription: '上海市普陀区金沙江路 1519 弄',
        //   isEditing: false,
        //   children: [{
        //     id: 31,
        //     date: '2016-05-01',
        //     taskName: '王小虎',
        //     taskDescription: '上海市普陀区金沙江路 1519 弄',
        //     isEditing: false
        //   }, {
        //     id: 32,
        //     date: '2016-05-01',
        //     taskName: '王小虎',
        //     taskDescription: '上海市普陀区金沙江路 1519 弄'
        //   }]
        // }, {
        //   id: 4,
        //   date: '2016-05-03',
        //   taskName: '王小虎',
        //   taskDescription: '上海市普陀区金沙江路 1516 弄',
        //   isEditing: false
        // }
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

      // this.tableData.splice(index + 1, 0, { id: `${+item.id + 1}`, taskName: '1-19测试', taskDescription: '测试是否正常', isEditing: true, master: true, children: [] })
      // this.tableData.forEach((item, index) => {
      //   console.log(item.id, '888888')
      //   if (item.id === row.id) {
      //     console.log(item.id, '777')
      //     if (key === 'masterTaskDown') {
      //       console.log('是否执行了')
      //       this.tableData.splice(index + 1, 0, { id: `${+item.id + 1}`, taskName: '1-19测试', taskDescription: '测试是否正常', isEditing: true, master: true, children: [] })
      //     } else {
      //       if (row.id === '1') {
      //         console.log('999999999,是否是1')
      //         this.tableData.splice(index, 0, { id: `1`, taskName: '1-19测试为啥不行呢', taskDescription: '测试是否正常', isEditing: true, master: true, children: [] })
      //       } else {
      //         this.tableData.splice(index, 0, { id: `${+item.id - 1}`, taskName: '1-20测试', taskDescription: '测试是否正常', isEditing: true, master: true, children: [] })
      //       }
      //     }
      //   }
      // })
      console.log(this.tableData)
      // 插入数据后进行排序
      // let arr = this.tableData.slice(1)
      // let arr1 = this.tableData.slice(this.tableData.length - 1, this.tableData.length)
      // let id = `${this.tableData[this.tableData.length - 1].id}`
      // function sort(array) {
      //   array.forEach(item => {
      //     item.id = `${+id + 1}`
      //     if (item.children && item.children.length > 0) {
      //       sort(item.chileren)
      //     }
      //   })
      // }
      // sort(arr1)
      function sort(tableData, key) {
        tableData.forEach((item, index) => {
          if (key === 'masterTaskDown') {
            if (`${item.id}`.startsWith('1')) {
              return false
            } else {
              console.log('555555555')
            }
          }
          // if ((`${item.id}`).startsWith('1')) {
          //   return false
          // } else {
          if (item.id.includes('.')) {
            let str = item.id.slice(0, 1)
            item.id = `${+str + 1}${item.id.slice(1)}`
          } else {
            item.id = `${+item.id + 1}`
          }
          if (item.children && item.children.length > 0) {
            sort(item.children)
          }
          // }
        })
      }
      // function sort1(tableData) {
      //   tableData.forEach((item, index) => {
      //     if (item.id.includes('.')) {
      //       let str = item.id.slice(0, 1)
      //       item.id = `${+str + 1}${item.id.slice(1)}`
      //     } else {
      //       item.id = `${+item.id + 1}`
      //     }
      //     if (item.children && item.children.length > 0) {
      //       sort1(item.children)
      //     }
      //   })
      // }
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
        console.log(this, '456')
        console.log(this.tableData, '7777777')
        // 递归找出删除行row.id与tableData的子项id相等的删除
        // function removeCurrentRow(tableData) {
        //   for (let index = 0; index < tableData.length; index++) {
        //     if (tableData[index].id === row.id) {
        //       tableData.splice(index, 1)
        //       return
        //     } else {
        //       if (tableData[index].children && tableData[index].children.length > 0) {
        //         removeCurrentRow(tableData[index].children)
        //       }
        //     }
        //   }
        // }
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
          console.log('44444444444444')
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
          console.log(arr, '55555555555')

          sort2(arr)
        }

        function sort2(tableData) {
          tableData.forEach((item, index) => {
            if (!item.id.includes('.')) {
              console.log('是否执行了')
            } else if (item.id.includes('.') && item.id.length === 3) {
              console.log('是否执行了1')
              if (index === 0) {
                item.id = `${item.id.slice(0, item.id.length - 1)}1`
                console.log('是否执行了2')
              } else {
                item.id = `${item.id.slice(0, item.id.length - 1)}${+tableData[index - 1].id.slice(
                  tableData[index - 1].id.length - 1,
                  tableData[index - 1].id.length
                ) + 1
                }`
                console.log('是否执行了3')
              }
              currentLevel = item.id
              console.log(currentLevel, '第一次')
            } else {
              if (index === 0) {
                item.id = `${currentLevel}.1`
                console.log('是否执行了4')
              } else {
                console.log(currentLevel, '不是2')
                item.id = `${item.id.slice(0, item.id.length - 1)}${+tableData[index - 1].id.slice(
                  tableData[index - 1].id.length - 1,
                  tableData[index - 1].id.length
                ) + 1
                }`
                console.log(item.id, '是否执行了5')
              }
              currentLevel = item.id
              console.log(currentLevel, '第二次')
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
