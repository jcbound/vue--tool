<!-- <template>
  <div> -->
<!--     <div class="tem-flex">
        <div class="tem-list" v-for="item in len">弹性布局</div>
        <div class="list" v-for="item in (rowNum-len%rowNum)" v-if="len%rowNum > 0"></div>
    </div>
    <div>
        <el-table :data="tablePlanData" style="width: 100%">
            <el-table-column prop="bookname" label="书名" width="200">
                <template slot-scope="scope">
                    <template v-if="isShow">
                        <el-input v-model="scope.row.bookname" placeholder="书名"></el-input>
                    </template>
                    <span v-else>{{ scope.row.bookname }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="bookvolume" label="册数" width="200">
                <template slot-scope="scope">
                    <template v-if="isShow">
                        <el-input v-model="scope.row.bookvolume" placeholder="册数"></el-input>
                    </template>
                    <span v-else>{{ scope.row.bookvolume}}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="primary" @click="add">增加</el-button>
    </div> -->
   <!--  <tableC

    >

    </tableC> -->

  <!--   </div>
</template> -->

<template>
  <div>
    <p>shopInfo</p>
    <div class="company">
      <p><el-button type="primary" @click="addCompany">添加公司</el-button></p>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        border
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          type="index"
          width="55"
        />
        <el-table-column
          label="公司名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" placeholder="请输入公司名称" />
          </template>
        </el-table-column>
        <el-table-column
          label="注册时间"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.date"
              type="date"
              placeholder="选择日期"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="注册资金"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.amount" placeholder="请输入注册资金" @blur="InputNumber(scope.row, 'amount')" />
          </template>
        </el-table-column>
        <el-table-column
          label="注册文件"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-upload
              class="upload-demo"
              :action="action"
              :data="uploadData"
              :on-preview="handlePreview"

              :on-remove="function(file,fileList){return handleRemove(file,fileList,scope.$index)}"
              :on-success="function(res,file,fileList){return handleSuccess(res,file,fileList,scope.$index)}"
              multiple
              :limit="1"
              :file-list="fileList[scope.$index]"
            >
              <el-button v-if="!scope.row.file" size="small" type="text">上传文件</el-button>
            </el-upload>
            <span class="delete" @click="deleteCompany(scope.$index)"><img src="/static/images/close.png" alt=""></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped>
  .company {
    padding: 30px;
    text-align: left;
  }
  .delete {
    position: absolute;
    top: 25px;
    right: 10px;
  }
  td .el-upload-list__item {
    margin-top: -25px;
  }
</style>
<script>
// import host from 'rootPath/config/host' // host文件
// import apiPath from 'rootPath/config/api.json' // api文件

export default {
  name: 'ShopInfo',

  data () {
    return {
      tableData3: [],
      selectedTable: [],
      fileList: [[]],
      // action: `${host.apiUrl}${apiPath.common.qiniuupload}`,
      action: ``,
      uploadData: { userId: 1304, pathName: 'company' }
    }
  },

  created () {
    this.setTable()
  },

  methods: {
    setTable () {
      this.tableData3 = [{
        name: '',
        date: '',
        amount: null,
        file: ''
      }]
    },

    // 添加公司
    addCompany () {
      this.tableData3.push({
        name: '',
        date: '',
        amount: null,
        file: ''
      })
      this.fileList.push([])
    },

    // 删除公司
    deleteCompany (i) {
      this.tableData3.splice(i, 1)
      // 删除的时候要把fileList清除,否则页面已上传的文件不会被清空
      this.fileList.splice(i, 1)
      console.log(this.fileList)
    },

    // 过滤输入的金额
    InputNumber (row, property) {
      row[property] = this.limitInputPointNumber(row[property])
    },

    // 限制只能输入数字(可以输入两位小数)
    limitInputPointNumber (val) {
      if (val === 0 || val === '0' || val === '') {
        return ''
      } else {
        let value = null
        value = String(val).replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
        value = value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
        value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
        value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
        return value
      }
    },

    // 预览图片
    handlePreview (file) {

    },

    // 删除图片
    handleRemove (file, fileList, index) {
      this.tableData3[index].file = ''
    },

    // 图片上传
    handleSuccess (res, file, fileList, index) {
      if (res.code) {
        this.tableData3[index].file = res.data.url
      }
      // 上传之后,把返回的fileList赋值给对应组件的fileList
      this.fileList[index] = fileList
    }
  }
}
</script>
