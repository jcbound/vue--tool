<template>
  <div id="table01">
    111111
    <div class="TestWorld">
      <el-button @click="savemodify">保存</el-button>
      <el-button @click="addLine">添加行数</el-button>
      <el-table :data="modifyData" style="width: 100%">
        <el-table-column prop="bookname" label="书名">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.bookname" class="edit-input" placeholder="书名" />
            </template>
            <span v-else>{{ scope.row.bookname }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bookvolume" label="册数">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.bookvolume" class="edit-input" placeholder="册数" />
            </template>
            <span v-else>{{ scope.row.bookvolume }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bookbuyer" label="购买者">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.bookbuyer" class="edit-input" placeholder="购买者" />
            </template>
            <span v-else>{{ scope.row.bookbuyer }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bookborrower" label="借阅者">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.bookborrower" class="edit-input" fasdf placeholder="借阅者" />
            </template>
            <span v-else>{{ scope.row.bookborrower }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bookbuytime" label="购买日期">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-date-picker v-model="scope.row.bookbuytime" type="date" value-format="yyyy-MM-dd" placeholder="购买日期" />
            </template>
            <span v-else>{{ scope.row.bookbuytime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="editing" label="操作">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.editing" v-model="scope.$index" type="danger" icon="el-icon-delete" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button v-else v-model="scope.$index" type="danger" icon="el-icon-delete" @click="handleCancle(scope.$index, scope.row)">取消
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modifyData: [
        {
          bookname: '普通高等教育物联网工程专业规划用书：物联网技术概论',
          bookbuytime: '2016-05-04',
          bookbuyer: '李晓月',
          bookborrower: '王小虎',
          bookvolume: '1',
          editing: true
        },
        {
          bookname: '区块链革命：比特币底层技术如何改变货币、商业和世界',
          bookbuytime: '2016-05-04',
          bookbuyer: '李晓月',
          bookborrower: '李小虎',
          bookvolume: '1'
          //   editing: false,
        },
        {
          bookname: '大家一起学配色：数学色彩设计全能书',
          bookbuytime: '2017-12-04',
          bookbuyer: '张晓月',
          bookborrower: '王而虎',
          bookvolume: '1'
          //   editing: false,
        }
      ],
      prevValue: {}
    }
  },
  created() { },
  methods: {
    addLine() {
      // 添加行数
      var newValue = {
        bookname: '',
        bookbuytime: '',
        bookbuyer: '',
        bookborrower: '',
        bookvolume: '',
        editing: true
      }
      // 添加新的行数
      this.modifyData.push(newValue)
    },
    handleDelete(index) {
      // 删除行数
      this.tableData.splice(index, 1)
    },
    save() {
      // 这部分应该是保存提交你添加的内容
      console.log(JSON.stringify(this.tableData))
    },
    handleEdit(index, row) {
      // 编辑
      //   row.editing = true;
      this.$set(row, 'editing', true)
      console.log(row)
      // console.log(index)row.editing = true;
      this.prevValue = JSON.parse(JSON.stringify(row))
    },
    handleCancle(index, row) {
      // 取消
      row.editing = false
      // let prevContent = this.prevValue.bookname;
      // this.$set(row, "bookname", prevContent);
    },
    savemodify() {
      console.log(JSON.stringify(this.modifyData))
    }
  }
}
</script>
