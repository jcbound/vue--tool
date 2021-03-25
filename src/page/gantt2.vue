<!--
 * @Author       : jcbound
 * @Date         : 2021-03-23 21:34:57
 * @LastEditors  : jcbound
 * @LastEditTime : 2021-03-25 13:52:46
 * @Description  : 我添加了修改
 * @FilePath     : \vuetest\src\page\gantt2.vue
-->
<template>
  <!-- <div class="container"> -->
  <Gantt class="left-container" :tasks="tasks" :columns="columns" />
  <!-- </div> -->
</template>

<script>
import Gantt from './ganttComponent.vue'

export default {
  name: 'App',
  components: { Gantt },
  data() {
    return {
      tasks: {
        data:
        [
          {
            'id': 1, // 父节点id
            'open': true, // 是否展开
            'text': '父节点', // 父节点名字
            'start_date': '2020-04-01 00:00:00', // 必须要字段 task 开始时间
            'duration': 30 // 必须要字段，标识task时长
          },
          {
            'start_date': '2020-04-09 00:00:00',
            'cap_actl_end': '2020-04-21 00:00:00',
            'cap_actl_start': '2020-04-01 00:00:00',
            'cap_id': 11,
            'cap_plan_end': '2020-04-21 23:59:59',
            'cap_plan_start': '2020-04-01 00:00:00',
            'cap_status': '完成',
            'duration': 21, // 必须要字段，标识task时长
            'issue_product_id': 14027,
            'parent': 1, // 父节点识别字段
            'product_name': 'AMS',
            'progress': 0, // task进度
            // 'start_date': '2020-04-01 00:00:00', // 必须要字段 task 开始时间
            'text': '广告数据报告' // 必须要字段 task名字
          },
          {
            'id': 2, // 父节点id
            'open': true, // 是否展开
            'text': '父节点', // 父节点名字
            'start_date': '2020-04-01 00:00:00', // 必须要字段 task 开始时间
            'duration': 60 // 必须要字段，标识task时长
          },
          {
            'cap_actl_end': '2020-04-21 00:00:00',
            'cap_actl_start': '2020-04-01 00:00:00',
            'cap_id': 20,
            'cap_plan_end': '2020-04-21 23:59:59',
            'cap_plan_start': '2020-04-01 00:00:00',
            'cap_status': '完成',
            'duration': 21, // 必须要字段，标识task时长
            'issue_product_id': 14027,
            'parent': 2, // 父节点识别字段
            'product_name': 'AMS',
            'progress': 0, // task进度
            'start_date': '2020-04-01 00:00:00', // 必须要字段 task 开始时间
            'text': '广告数据报告' // 必须要字段 task名字
          }
        ]
      }
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.container {
  /* height: 100%; */
  height: 800px;
  width: 100%;
}
.left-container {

}
</style>
