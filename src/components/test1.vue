<template>
    <el-form ref="form" v-bind="computedConfig" :rules="rules" :model="data">
        <el-row>
            <el-col v-for="(item, index) in elData"  :span="item.span">
                <el-form-item :label="item.label + ':'" :prop="item.prop">
                    <el-input clearable v-if="item.type==='Input'" :type="item.subType" v-model="searchData[item.prop]"  :placeholder="item.placeholder" :style="{width: item.width}"></el-input>
                    <el-select clearable v-if="item.type==='Select'" :placeholder="item.placeholder" v-model="searchData[item.prop]" :style="{width: item.width}"  @change="item.change(searchData[item.prop])">
                        <el-option v-for="op in item.options" :label="op.label" :value="op.value" :key="op.value"></el-option>
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
            default: () =>[]
        },
        searchData: {
            type: Object,
            default: () => {}
        }
    }
}
</script>