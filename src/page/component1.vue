<!--
 * @Author: jcbound
 * @Date: 2021-01-30 14:34:56
 * @LastEditors: jcbound
 * @LastEditTime: 2021-02-03 23:39:09
 * @Description: 我添加了修改
 * @FilePath: \vuetest\src\page\component1.vue
-->
<template>
  <div class="main-content">
    <el-form :size="size" inline :label-width="labelWidth">
      <el-form-item v-for="item in searchForm" :key="item.prop" :label="item.label">
        <!-- 输入框 -->
        <el-input v-if="item.type === 'Input'" v-model="searchData[item.prop]" clearable :type="item.subType" :size="size" :placeholder="item.placeholder" :style="{ width: item.width }" />
        <!-- <div class="textinput-content">
                        <el-input clearable v-if="item.type==='Input'" :type="item.subType" v-model="searchData[item.prop]" :size="size" :placeholder="item.placeholder" :style="{width: item.width}"></el-input>
                    </div> -->
        <!-- 下拉框 -->
        <el-select v-if="item.type === 'Select'" v-model="searchData[item.prop]" clearable :placeholder="item.placeholder" :style="{ width: item.width }" :size="size" @change="item.change(searchData[item.prop])">
          <el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value" />
        </el-select>
        <!-- 搜索search -->
        <!-- <div v-if="item.type==='searchInput'" class="search-content">
                    <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-button>更多</el-button>
                </div> -->
        <!--   <el-radio-group v-if="item.type==='Radio'" v-model="searchData[item.prop]">
                    <el-radio v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ra.label}}</el-radio>
                </el-radio-group>
                <!-- 单选按钮 -->
        <!-- <el-radio-group v-if="item.type==='RadioButton'" v-model="searchData[item.prop]" @change="item.change && item.change(searchData[item.prop])">
                    <el-radio-button v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ra.label}}</el-radio-button>
                </el-radio-group> -->
      </el-form-item>
      <!-- <div style="display: inline-block" v-if='isHandle'>
                <el-form-item v-for='item in searchHandle' :key="item.label">
                    <el-button :type="item.type" :size="item.size || size" @click='item.handle()'>{{item.label}}</el-button>
                </el-form-item>
            </div> -->
      <!-- 单选 -->
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    isHandle: {
      type: Boolean,
      default: false
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
      default: () => { }
    }
  },
  data() {
    return {}
  }
}
</script>
<style>
.main-content {
  padding: 0 30px;
  border: 1px solid red;
}

.search-content input-with-select {
  display: inline-block;
}
</style>
