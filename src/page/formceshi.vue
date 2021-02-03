<template>
  <div>
    <search-form size="medium" label-width="100px" :search-data="searchData" :search-form="searchForm" :search-handle="searchHandle" />
    <el-input v-model="input" placeholder="请输入内容" />
    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
import SearchForm from '@/page/component1'
export default {
  components: {
    SearchForm
  },
  data() {
    return {
      input: '',
      searchData: [],
      searchForm: [

        // { type: 'searchInput' },
        { type: 'Input', label: '网点编号：', prop: 'name', placeholder: '请输入姓名', width: '16vw' },
        { type: 'Input', label: '网点编号：', prop: 'name', placeholder: '请输入姓名', width: '16vw' },
        { type: 'Input', label: '网点编号：', prop: 'name', placeholder: '请输入姓名', width: '16vw' },

        { type: 'Input', label: '网点编号：', prop: 'name', placeholder: '请输入姓名', width: '16vw' },
        { type: 'Input', label: '网点编号：', prop: 'name', placeholder: '请输入姓名', width: '16vw' },

        { type: 'Input', label: '网点编号：', prop: 'name', placeholder: '请输入姓名', width: '16vw' },
        { type: 'Input', label: '网点编号：', prop: 'name', placeholder: '请输入姓名', width: '16vw' },
        { type: 'Input', label: '网点编号：', prop: 'name', placeholder: '请输入姓名', width: '16vw' },
        { type: 'Input', label: '网点编号：', prop: 'name', placeholder: '请输入姓名', width: '16vw' },
        { type: 'Input', label: '网点编号：', prop: 'name', placeholder: '请输入姓名', width: '16vw' },
        { type: 'Input', label: '网点编号：', prop: 'name', placeholder: '请输入姓名', width: '16vw' }

        // { type: 'Select', label: '网点优先级', prop: 'sex', width: '', options: sexs, props: sexProps, change: row => '', placeholder: '请选择性别' },
        // { type: 'Select', label: '网点状态', prop: 'sex', width: '180px', options: sexs, props: sexProps, change: row => '', placeholder: '请选择性别' },
        // { type: 'Select', label: '网点批次', prop: 'sex', width: '180px', options: sexs, props: sexProps, change: row => '', placeholder: '请选择性别' },
        // { type: 'Select', label: '启动状态', prop: 'sex', width: '180px', options: sexs, props: sexProps, change: row => '', placeholder: '请选择性别' },
        // { type: 'Select', label: '网点阶段', prop: 'sex', width: '180px', options: sexs, props: sexProps, change: row => '', placeholder: '请选择性别' }, {
        //     type: 'RadioButton',
        //     label: '是否选择',
        //     prop: 'isRadio',
        //     radios: sexs
        // }, {
        //     type: 'Radio',
        //     label: '是否选择',
        //     prop: 'isRadio',
        //     radios: sexs
        // }

      ]
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>
