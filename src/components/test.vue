<template>
  <div class="main-content">
    <div class="progress-bar" style="margin: 20px">
      <ul>
        <li
          v-for="(item, index) in processData"
          :key="index"
          :class="handleAddClass(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="amount1" label="数值 1（元）"> </el-table-column>
      <el-table-column prop="amount2" label="数值 2（元）"> </el-table-column>
      <el-table-column prop="amount3" label="数值 3（元）"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
        },
      ],
      processData: [
        { label: "进度1", status: "02" },
        { label: "进度2", status: "02" },
        { label: "进度3", status: "03" },
        { label: "进度4", status: "01" },
        { label: "进度5", status: "01" },
        { label: "进度6", status: "01" },
      ],
    };
  },
  methods: {
    handleAddClass(item) {
      if (item.status === "02") {
        return "green-style";
      } else if (item.status === "03") {
        return "yellow-style";
      } else {
        return "grey-style";
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
  },
};
</script>
<style lang="scss">
.progress-bar li {
  padding: 0px 20px;
  line-height: 40px;
  background: #66c18c;
  display: inline-block;
  color: #fff;
  position: relative;
  width: 10%;
  text-align: center;
  margin-right: 5px;
  &:after {
    content: "";
    display: block;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #66c18c;
    position: absolute;
    right: -20px;
    top: 0;
    z-index: 10;
  }
  &:before {
    content: "";
    display: block;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #fff;
    position: absolute;
    left: 0px;
    top: 0;
  }
  &:first-child {
    border-radius: 4px 0 0 4px;
  }
  &:first-child:before {
    display: none;
  }
  &.green-style {
    background: darkgreen;
    &:after {
      border-left-color: darkgreen;
    }
  }
  &.yellow-style {
    background: yellowgreen;
    &:after {
      border-left-color: yellowgreen;
    }
  }
  &.grey-style {
    background: grey;
    &:after {
      border-left-color: grey;
    }
  }
}
</style>