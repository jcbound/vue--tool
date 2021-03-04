<template>
  <div>

    <vxe-table
      ref="xTable"
      border
      show-overflow
      class="vxe-table-element"
      height="600"
      :data="tableData"
      :edit-rules="validRules"
      highlight-current-row
      :edit-config="{trigger: 'dblclick', mode: 'row', showStatus: true,autoClear:onEdit}"
      @cell-dblclick="dbclickFun"
      @edit-closed="saveFun"
    >
      <vxe-table-column type="index" width="80">
        <template v-slot:header="{ column }">
          <span>序号</span>
          <i class="el-icon-question" />
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="name"
        title="ElInput"
        min-width="140"
        :edit-render="{type: 'default'}"
      >
        <template v-slot:edit="scope">
          <el-input v-model="scope.row.name" @input="$refs.xTable.updateStatus(scope)" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="age" title="ElInputNumber" :edit-render="{type: 'default'}">
        <template v-slot:header="{ column }">
          <span>{{ column.title }}</span>
          <i class="el-icon-warning" />
        </template>
        <template v-slot:edit="{ row }">
          <el-input-number v-model="row.age" :max="35" :min="18" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="sex" title="ElSelect" width="140" :edit-render="{type: 'default'}">
        <template v-slot:edit="scope">
          <el-select v-model="scope.row.sex" @change="sexupda(scope)">
            <!--可以使用change事件进行属性间的控制-->
            <el-option
              v-for="item in sexList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
        <template v-slot="{ row }">{{ getSelectLabel(row.sex) }}</template>
      </vxe-table-column>
      <vxe-table-column field="date" title="ElDatePicker123" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <el-date-picker
            v-model="row.date"
            type="date"
            format="yyyy/MM/dd"
            @change="dateupda(scope)"
          />
        </template>
        <!-- <template v-slot="{ row }">{{ formatDate(row.date, 'yyyy/MM/dd') }}</template> -->
      </vxe-table-column>
      <vxe-table-column field="date1" title="ElDatePicker" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <el-date-picker v-model="row.date1" type="datetime" format="yyyy-MM-dd HH:mm:ss" />
        </template>
        <template v-slot="{ row }">{{ formatDate(row.date1, 'yyyy-MM-dd HH:mm:ss') }}</template>
      </vxe-table-column>
      <vxe-table-column field="date2" title="ElTimePicker" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <el-time-select
            v-model="row.date2"
            :picker-options="{start: '08:30', step: '00:15', end: '18:30'}"
          />
        </template>
      </vxe-table-column>
      <vxe-table-column field="rate" title="ElRate" :edit-render="{type: 'visible'}">
        <template v-slot:edit="{ row }">
          <el-rate v-model="row.rate" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="describe" title="描述" :edit-render="{type: 'default'}">
        <template v-slot:edit="scope">
          <el-input v-model="scope.row.describe" @input="$refs.xTable.updateStatus(scope)" />
        </template>
      </vxe-table-column>
      <vxe-table-column label="操作" width="100">
        <template v-slot="scope">
          <el-button size="mini" type="danger" @click="removeEvent(scope.row)">删除</el-button>
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
</template>
<script>

export default {
  data() {
    // 自定义校验方法
    const validatePass = (rule, value, callback) => {
      if (value == '' || value == null) {
        callback(new Error('good'))
      } else {
        callback()
      }
    }
    return {
      onedit: false,
      onEdit: false,
      regionList: [],
      tableData: [{ name: 'xiaoli', sex: '女', date: '' }],
      sexList: [{ value: '0', label: '男' }, { value: '1', label: '女' }],
      // 验证和正常表单一样
      validRules: {
        name: [
          { required: true, message: 'app.body.valid.rName' },
          { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
        ],
        sex: [{ required: true, message: '性别必须填写' }],
        describe: [
          {
            validator: validatePass // 自定义校验方法
          }
        ]
      }
    }
  },
  methods: {
    // 新增数据
    insertEvent(row) {
      let record = {
        sex: '1',
        date: new Date(),
        date1: new Date(),
        name: 'new',
        describe: 'GOOD'
      }
      this.$refs.xTable.insertAt(record, row)
      // .then(({ row }) => this.$refs.xTable.setActiveCell(row, "sex"));--------------------------设置行处于编辑状态（设定焦点所在）
    },
    // 单元格双击事件
    dbclickFun(cell) {
      this.onedit = false
    },
    // 保存数据
    saveFun() {
      this.onEdit = false
      // var nowdata = this.$refs.xTable.getCurrentRow()
      if (nowdata != null) {
        // 走保存
        alert(nowdata)
      }
    },
    // 下拉框改变
    sexupda(scopevalue) {
      scopevalue.row.describe = '改了改了'
      // this.onedit=true;
      this.$refs.xTable.updateStatus(scopevalue)
    },
    // 时间框改变
    dateupda(scopevalue) {
      // this.onedit=true;
    },
    // 格式化时间类型
    formatDate(value, format) {
      if (value != null && value != '') {
        return this.$utils.dateToString(value, format)
      }
    },
    // 下拉框回显内容
    getSelectLabel(value) {
      let result = ''
      if (value == '1') {
        result = '女'
      } else {
        result = '男'
      }
      return result
    },
    removeEvent(row) {
      if (row.id) {
        MessageBox.confirm('确定删除该数据?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$refs.xTable.remove(row)
          })
          .catch(e => e)
      } else {
        this.$refs.xTable.remove(row)
      }
    }
  }
}
</script>
