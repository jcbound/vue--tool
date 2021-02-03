<template>
  <el-form :size="size" inline :label-width="labelWidth">
    <el-form-item
      v-for="item in searchForm"
      :key="item.prop"
      :label="item.label"
    >
      <!-- 输入框 -->
      <el-input
        v-if="item.type === 'Input'"
        v-model="searchData[item.prop]"
        clearable
        :size="size"
        :placeholder="item.placeholder"
        :style="{ width: item.width }"
      />
      <!-- 下拉框 -->
      <el-select
        v-if="item.type === 'Select'"
        v-model="searchData[item.prop]"
        clearable
        :placeholder="item.placeholder"
        :style="{ width: item.width }"
        :size="size"
        @change="item.change(searchData[item.prop])"
      >
        <el-option
          v-for="op in item.options"
          :key="op.value"
          :label="op.label"
          :value="op.value"
        />
      </el-select>
      <!-- 单选 -->
      <el-radio-group
        v-if="item.type === 'Radio'"
        v-model="searchData[item.prop]"
      >
        <el-radio v-for="ra in item.radios" :key="ra.value" :label="ra.value">{{
          ra.label
        }}</el-radio>
      </el-radio-group>
      <!-- 单选按钮 -->
      <el-radio-group
        v-if="item.type === 'RadioButton'"
        v-model="searchData[item.prop]"
        @change="item.change && item.change(searchData[item.prop])"
      >
        <el-radio-button
          v-for="ra in item.radios"
          :key="ra.value"
          :label="ra.value"
        >{{ ra.label }}</el-radio-button>
      </el-radio-group>
      <!-- 复选框 -->
      <el-checkbox-group
        v-if="item.type === 'Checkbox'"
        v-model="searchData[item.prop]"
        :style="{ width: item.width }"
      >
        <el-checkbox
          v-for="ch in item.checkboxs"
          :key="ch.value"
          :label="ch.value"
        >{{ ch.label }}</el-checkbox>
      </el-checkbox-group>
      <!-- 日期 -->
      <el-date-picker
        v-if="item.type === 'Date'"
        v-model="searchData[item.prop]"
        :placeholder="item.placeholder"
      />
      <!-- 时间 -->
      <el-time-select
        v-if="item.type === 'Time'"
        v-model="searchData[item.prop]"
        type=""
      />
      <!-- 日期时间 -->
      <el-date-picker
        v-if="item.type === 'DateTime'"
        v-model="searchData[item.prop]"
        type="datetime"
        :disabled="item.disable && item.disable(searchData[item.prop])"
      />
      <!-- 滑块 -->
      <!-- <el-slider v-if="item.type==='Slider'" v-model="searchData[item.prop]"></el-slider> -->
      <!-- 开关 -->
      <el-switch
        v-if="item.type === 'Switch'"
        v-model="searchData[item.prop]"
      />
      <!-- 搜索search -->
      <div v-if="item.type === 'searchInput'">
        <el-input
          v-model="input3"
          placeholder="请输入内容"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" />
        </el-input>
        <button>更多</button>
      </div>
    </el-form-item>
    <!-- <div style="display: inline-block" v-if='isHandle'>
            <el-form-item v-for='item in searchHandle' :key="item.label">
                <el-button :type="item.type" :size="item.size || size" @click='item.handle()'>{{item.label}}</el-button>
            </el-form-item>
        </div> -->
  </el-form>
  <el-form v-if="isHandle" inline>
    <el-form-item v-for="item in searchHandle" :key="item.label">
      <el-button
        :type="item.type"
        :size="item.size || size"
        @click="item.handle()"
      >{{ item.label }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    isHandle: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    size: {
      type: String,
      default: 'medium'
    },
    searchForm: {
      type: Array,
      default: () => []
    },
    searchHandle: {
      type: Array,
      default: () => []
    },
    searchData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  }
}
</script>
