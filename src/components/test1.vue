<!--
 * @Author: jcbound
 * @Date: 2021-01-30 14:34:56
 * @LastEditors: jcbound
 * @LastEditTime: 2021-02-03 23:02:22
 * @Description: 我添加了修改
 * @FilePath: \vuetest\src\components\test1.vue
-->
<template>
  <el-form ref="form" v-bind="computedConfig" :rules="rules" :model="data">
    <el-row>
      <el-col v-for="(item, index) in elData" :key="index" :span="item.span">
        <el-form-item :label="item.label + ':'" :prop="item.prop">
          <el-input v-if="item.type==='Input'" v-model="searchData[item.prop]" clearable :type="item.subType" :placeholder="item.placeholder" :style="{width: item.width}" />
          <el-select v-if="item.type==='Select'" v-model="searchData[item.prop]" clearable :placeholder="item.placeholder" :style="{width: item.width}" @change="item.change(searchData[item.prop])">
            <el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  props: {
    elData: {
      type: Array,
      default: () => []
    },
    searchData: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
