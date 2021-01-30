<template>
    <el-form :label-width="labelWidth">
        <el-row style="width:1200px;border:1px solid red">
            <el-col v-for="item in elData" :span="item.span">
                <el-form-item :label="item.label + ':'" :prop="item.prop">
                    <!--  <div>wodedhiaohdfoiaho</div> -->
                    <!--  <template slot-scope="scope"> -->
                    <el-input clearable v-if="item.type==='Input'" v-model="searchData[item.prop]" :placeholder="item.placeholder"></el-input>
                   <!--  <el-select clearable v-if="item.type==='Select'" :placeholder="item.placeholder" v-model="searchData[item.prop]" :style="{width: item.width}" @change="item.change(searchData[item.prop])" style="width:100%">
                        <el-option v-for="op in item.options" :label="op.label" :value="op.value" :key="op.value"></el-option>
                    </el-select> -->
                     <el-select clearable v-if="item.type==='Select'"  v-model="searchData[item.prop]"  style="width:50%">
                        <el-option v-for="op in item.options" :label="op.label" :value="op.value" :key="op.value"></el-option>
                    </el-select>
                     <el-date-picker v-if="item.type==='Date'" :placeholder="item.placeholder" v-model="searchData[item.prop]"style="width:100%"> </el-date-picker>
                    <!--  </template> -->
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
        },
        labelWidth:{
            type:String,
            default:""
        }
    }
}
</script>