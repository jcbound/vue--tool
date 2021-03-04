<template>
  <div class="datatable">
    <div v-if="headTurn" class="header">
      <!-- <img src="~@/assets/images/meet/meetBack.png" class="back" @click="goBack"> -->
    </div>
    <el-table :row-style="{background:'#4247BD',color:'rgba(254,254,254,1)',height: '70px' }" :header-cell-style="tableHeaderCellStyle" :cell-style="tableCellStyle" :data="tableData" style="width: 100%" @cell-dblclick="celledit">
      <el-table-column prop="icon" width="20">
        <!-- 利用 index 设置小方块的颜色显示  -->
        <template slot-scope="scope">
          <div :class="(scope.row.index)%2!=0? 'activestyle' :'orangestyle'">{{ scope.icon }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="index" label="排名" min-width="10%">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" ref="index" v-model="scope.row.index" style="width: 100%" @blur="scope.row.edit = false" />
          <span v-else>{{ scope.row.index }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="会议名称" min-width="20%">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="code" min-width="5%" label="编号">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="view" min-width="10%" label="浏览量">
        <template slot-scope="scope">
          <span>{{ scope.row.view }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="paperNum" label="投稿数" min-width="5%">
        <template slot-scope="scope">
          <span>{{ scope.row.paperNum }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="registerNum" label="报名数" min-width="10%">
        <template slot-scope="scope">
          <el-input v-if="scope.row.registerNum.edit" ref="registerNum" v-model="scope.row.registerNum.value" style="width: 100%" @blur="changeData(scope.row)" />
          <span v-else>{{ scope.row.registerNum }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="10%" prop="kpi" label="KPI">
        <template slot-scope="scope">
          <el-input v-if="scope.row.kpi.edit" ref="kpi" v-model="scope.row.kpi.value" style="width: 100%" @blur="changeData($event,scope.row,column)" />
          <!-- <span v-else-if="scope.row.kpi.value==0" class="set">设置目标</span> -->
          <span v-else>{{ scope.row.kpi }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalFee" min-width="10%" label="收入情况">
        <template slot-scope="scope">
          <span>{{ scope.row.totalFee }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="type" class="pagination">
      <el-pagination layout="total,prev, pager, next,sizes,jumper" :total="total" :current-page.sync="pageNum" :page-size.sync="pageSize" :page-sizes="[10, 30, 50, 100]" background @current-change="getListHand" @size-change="getListHand" />
    </div>
  </div>
</template>
<script>
// import { getpaper, setUpMeeting } from '@/api/board'
// import PageMixins from '@/mixins/PageMixins'
// import ChangeFormValue from '@/mixins/ChangeFormVaule'
export default {
  // mixins: [ChangeFormValue],
  props: {
    type: {
      type: Number,
      require: true
    },
    headTurn: {
      type: Boolean
    }
  },
  data() {
    return {
      tableData: [], // table数据,
      data: '',
      currentColumnName: ''
    }
  },
  created() {
    this.getListHand()
  },
  methods: {
    goBack() {
      this.$emit('closeMain')
    },
    tableCellStyle() {
      return 'border-color:#2A2C64;border:14px solid #252D55;border-style:none none solid  none; '
    },
    // 修改 table header cell的背景色
    tableHeaderCellStyle() {
      return 'border-color: #252D55; color: #C6D0FA;background:#252D55; height:22px;font-size:16px; font-family:PingFangSC-Medium,PingFangSC;font-weight:500;line-height:22px;'
    },
    async getListHand(search) {
      // if (this.type === 2) {
      //   let params = {
      //     page: this.pageNum,
      //     pageSize: this.pageSize
      //   }
      //   this.data = await getpaper(params)
      // } else {
      //   let params = {
      //     page: this.pageNum,
      //     pageSize: this.pageSize
      //   }
      //   params = {
      //     ...params,
      //     ...search
      //   }
      // if (this.isSearch) {
      //   params = {
      //     ...params,
      //     ...search
      //   }
      // } else {
      //   params = {
      //     ...params,
      //     ...this.oldSearchForm
      //   }
      // }
      //   this.data = await getpaper(params)
      // }

      this.tableData = [{ index: 1, name: 'xiaoming', view: 'ceshi', kpi: '', registerNum: '' }]
      // this.total = +(this.data.data.data.total)
      this.tableData.forEach((item, index) => {
        // item.index = index + 1
        for (let i in item) {
          item[i] = {
            value: item[i],
            edit: false
          }
        }
      })
      console.log(this.tableData, '6666')
    },
    celledit(row, column) {
      if (row[column.property]) {
        this.currentColumnName = column.property
        row[column.property].edit = true
        console.log(column.property, '12314')
        setTimeout(() => {
          this.$refs[column.property].focus()
        }, 20)
      }
    },
    async changeData(event, value, column) {
      console.log(event, value, this.currentColumnName, column, '12314')
      // const reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g
      // if (!reg.test(value.kpi.value)) {
      //   return this.$message.error('只能输入数字')
      // } else if (value.kpi.value > 1000000000) {
      //   return this.$message.error('输入数字过大')
      // }
      // let params = {
      //   feeKpi: value.kpi.value,
      //   meetingId: value.id.value,
      //   paperKpi: 0,
      //   registerKpi: 0,
      //   viewKpi: 0,
      //   type: 1
      // }
      // let { data } = await setUpMeeting(params)
      // if (data.code == 0) {
      // this.$message.success('设置成功');
      // value.kpi.edit = false
      value[this.currentColumnName].edit = false
      // }
    }
  }
}
</script>
<style scoped>
.datatable {
}
.header {
  padding-top: 10px;
  margin-left: 10px;
}
.datatable >>> .el-table td,
.datatable >>> .el-table th {
  text-align: center;
}
.datatable >>> tr {
  box-shadow: 0px 2px 7px 1px rgba(1, 1, 1, 0.05);
  border-radius: 5px;
  margin-bottom: 10px !important;
}
.el-table__body tr:hover > td {
  background-color: darkred !important;
}

.el-table__body tr.current-row > td {
  background-color: darkred !important;
}
.el-table__row > td {
  border: none;
}
.datatable >>> .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #4247bd;
}
.el-table::before {
  height: 0px;
}
/*table 表格左边小方块*/
.activestyle {
  width: 6px;
  height: 29px;
  background: rgba(103, 226, 235, 1);
  margin-left: -10px;
}
/*table 表格左边小方块*/
.orangestyle {
  width: 6px;
  height: 29px;
  background: rgba(237, 120, 55, 1);
  margin-left: -10px;
}
.set {
  width: 72px;
  height: 25px;
  font-size: 18px;
  font-family: PingFangTC-Medium, PingFangTC;
  font-weight: 500;
  color: rgba(103, 226, 235, 1);
  line-height: 25px;
}
/*element统一样式修改*/
.pagination >>> .el-pager li {
  border-radius: 50% !important;
}
.pagination {
  margin-top: 20px;
  text-align: center;
  margin-bottom: 20px;
}
element统一样式修改 .pagination >>> .el-pager li {
  border-radius: 50% !important;
}
.pagination {
  margin-top: 20px;
  text-align: center;
  margin-bottom: 20px;
}
/*element统一样式修改*/
.pagination >>> .el-pager li {
  border-radius: 50% !important;
}
.datatable >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #2a2c64;
  color: #fff;
}
.datatable /deep/ .el-pagination__total {
  color: white;
}
.datatable /deep/ .el-pagination__jump {
  color: white;
}
</style>
