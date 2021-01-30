<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.sum" @input="inputChange"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="handleClick">跳转</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        sum: null,
      },
      total: "",
    };
  },
  watch: {
    "form.sum": {
      handler(newValue, oldValue) {
        console.log("是否监听了");
      },
    },
    total(value) {
      if (value) {
        console.log(`输出加上${value}`);
      }
    },
  },
  mounted() {
    this.asyncFunction();
  },
  methods: {
    inputChange(value) {
      console.log(value, "值时多少");
      this.total = value;
      //   console.log(this.total);
    },
    onSubmit() {},
    asyncFunction() {
      setTimeout(() => {
        this.form.sum = 1000;
      }, 1000);
    },
    handleClick() {
      const { href } = this.$router.resolve({
        path: "/newWindows",
      });
      window.open(href, "_blank");
    },
  },
};
</script>
<style lang="less">
</style>