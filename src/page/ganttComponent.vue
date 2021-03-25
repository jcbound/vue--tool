<!--
 * @Author       : jcbound
 * @Date         : 2021-03-23 21:40:54
 * @LastEditors  : jcbound
 * @LastEditTime : 2021-03-25 13:51:07
 * @Description  : 我添加了修改
 * @FilePath     : \vuetest\src\page\ganttComponent.vue
-->
<template>
  <div>
    <div class="tool-operation">
      <span>时间刻度缩放&nbsp;&nbsp;</span><el-slider v-model="value3" :step="10" :show-tooltip="false" style="width:100px" @change="handleChange" @input="handleInput" />
      <el-switch v-model="value1" class="operation-switch" active-text="自适应刻度" inactive-text="时间默认刻度" @change="toggleMode($event)" />
    </div>
    <div class="gantt_control" />
    <div ref="gantt" class="gantt-style" />
  </div>
</template>

<script>
import { gantt } from 'dhtmlx-gantt'
var cachedSettings = {}
var zoomConfig = {
  levels: [
    // hours
    {
      name: 'hour',
      scale_height: 27,
      scales: [
        { unit: 'day', step: 1, format: '%d %M' },
        { unit: 'hour', step: 1, format: '%H:%i' }
      ]
    },
    // days
    {
      name: 'day',
      scale_height: 27,
      scales: [
        { unit: 'day', step: 1, format: '%d %M' }
      ]
    },
    // weeks
    {
      name: 'week',
      scale_height: 50,
      scales: [
        {
          unit: 'week', step: 1, format: function (date) {
            var dateToStr = gantt.date.date_to_str('%d %M')
            var endDate = gantt.date.add(date, -6, 'day')
            var weekNum = gantt.date.date_to_str('%W')(date)
            return '#' + weekNum + ', ' + dateToStr(date) + ' - ' + dateToStr(endDate)
          }
        },
        { unit: 'day', step: 1, format: '%j %D' }
      ]
    },
    // months
    {
      name: 'month',
      scale_height: 50,
      scales: [
        { unit: 'month', step: 1, format: '%F, %Y' },
        {
          unit: 'week', step: 1, format: function (date) {
            var dateToStr = gantt.date.date_to_str('%d %M')
            var endDate = gantt.date.add(gantt.date.add(date, 1, 'week'), -1, 'day')
            return dateToStr(date) + ' - ' + dateToStr(endDate)
          }
        }
      ]
    },
    // quarters
    {
      name: 'quarter',
      height: 50,
      scales: [
        {
          unit: 'quarter', step: 3, format: function (date) {
            var dateToStr = gantt.date.date_to_str('%M %y')
            var endDate = gantt.date.add(gantt.date.add(date, 3, 'month'), -1, 'day')
            return dateToStr(date) + ' - ' + dateToStr(endDate)
          }
        },
        { unit: 'month', step: 1, format: '%M' }
      ]
    },
    // years
    {
      name: 'year',
      scale_height: 50,
      scales: [
        {
          unit: 'year', step: 5, format: function (date) {
            var dateToStr = gantt.date.date_to_str('%Y')
            var endDate = gantt.date.add(gantt.date.add(date, 5, 'year'), -1, 'day')
            return dateToStr(date) + ' - ' + dateToStr(endDate)
          }
        }
      ]
    },
    // decades
    {
      name: 'year',
      scale_height: 50,
      scales: [
        {
          unit: 'year', step: 100, format: function (date) {
            var dateToStr = gantt.date.date_to_str('%Y')
            var endDate = gantt.date.add(gantt.date.add(date, 100, 'year'), -1, 'day')
            return dateToStr(date) + ' - ' + dateToStr(endDate)
          }
        },
        {
          unit: 'year', step: 10, format: function (date) {
            var dateToStr = gantt.date.date_to_str('%Y')
            var endDate = gantt.date.add(gantt.date.add(date, 10, 'year'), -1, 'day')
            return dateToStr(date) + ' - ' + dateToStr(endDate)
          }
        }
      ]
    }
  ],
  element: function () {
    return gantt.$root.querySelector('.gantt_task')
  }
}
export default {
  name: 'Gantt',
  props: {
    tasks: {
      type: Object,
      default() {
        return { data: [], links: [] }
      }
    }
  },
  data() {
    return {
      value1: '',
      value3: 40,
      currentValue: 0
    }
  },
  mounted: function () {
    gantt.config.xml_date = '%Y-%m-%d'// 日期字符串转为date对象
    gantt.config.scale_height = 30 * 2 // 缩放高度
    gantt.i18n.setLocale('cn') // 国际化
    gantt.config.readonly = true // 只读模式
    // gantt.config.date_scale = '%Y-%m-%d' // 设置x轴的日期格式
    gantt.plugins({
      tooltip: true// 启用 tooltip 插件

    })
    gantt.templates.tooltip_text = (start, end, task) => { // hover tooltip提示框信息
      return `
      <div style="line-height:20px">
      <b style="color:#777777">计划开始时间:</b>&nbsp;&nbsp;${gantt.templates.tooltip_date_format(task.start_date)}</span></br>
      <b style="color:#777777">计划结束时间:</b>&nbsp;&nbsp;${gantt.templates.tooltip_date_format(task.start_date)}</br>
      <b style="color:#777777">实际开始时间:</b>&nbsp;&nbsp;${gantt.templates.tooltip_date_format(task.start_date)}</br>
      <b style="color:#777777">实际结束时间:</b>&nbsp;&nbsp;${gantt.templates.tooltip_date_format(task.start_date)}</br>
      <div>
      
      
      `
    }
    // gantt.config.scales = [
    //   { unit: 'year', step: 1, format: '%Y' },
    //   { unit: 'month', step: 1, format: '%M' }
    // ]
    gantt.config.columns = [// 当前表格列配置
      {
        name: 'text',
        tree: true,
        width: '*',
        align: 'left',
        label: '产品/能力名称',
        resize: true
      },
      { name: 'start_date', align: 'center', width: 80, resize: true },
      {
        name: 'cap_plan_end',
        align: 'center',
        label: '结束时间',
        width: 80,
        resize: true,
        template: function (task) { return task.cap_plan_end ? task.cap_plan_end.substring(0, 10) : '' }
      }
    ]
    // 网格列自动调整为列的宽度
    gantt.config.autofit = true
    gantt.config.grid_width = 500
    gantt.config.fit_tasks = true // 自动扩展时间刻度，以适应任务块

    gantt.config.layout = {// 表格初始布局
      css: 'gantt_container',
      rows: [
        { view: 'scrollbar', id: 'scroller', scroll: 'x' }, // horizontal //垂直滚动条
        {
          cols: [
            { view: 'grid', id: 'grid', scrollX: 'scrollHor', scrollY: 'scrollVer' },
            { resizer: true, width: 1 },
            { view: 'timeline', id: 'timeline', scrollX: 'scrollHor', scrollY: 'scrollVer' },
            { view: 'scrollbar', scroll: 'y', id: 'scrollVer' }
          ]
        },
        { view: 'scrollbar', scroll: 'x', id: 'scrollHor', height: 20 }// 水平滚动条
      ]
    }
    gantt.ext.zoom.init(zoomConfig)

    gantt.ext.zoom.setLevel('day')

    gantt.$zoomToFit = false
    gantt.init(this.$refs.gantt)
    gantt.parse(this.$props.tasks)
    this.zoom_out()
  },
  methods: {
    // 时间刻度自适应/默认值切换
    toggleMode(toggle) {
      gantt.$zoomToFit = !gantt.$zoomToFit
      if (gantt.$zoomToFit) {
        this.saveConfig()
        this.zoomToFit()
      } else {
        this.restoreConfig()
        gantt.render()
      }
    },

    saveConfig() {
      var config = gantt.config
      cachedSettings = {}
      cachedSettings.scales = config.scales
      cachedSettings.start_date = config.start_date
      cachedSettings.end_date = config.end_date
      cachedSettings.scroll_position = gantt.getScrollState()
    },

    restoreConfig() {
      this.applyConfig(cachedSettings)
    },

    applyConfig(config, dates) {
      gantt.config.scales = config.scales
      var lowest_scale = config.scales.reverse()[0]

      if (dates && dates.start_date && dates.end_date) {
        gantt.config.start_date = gantt.date.add(dates.start_date, -1, lowest_scale.unit)
        gantt.config.end_date = gantt.date.add(gantt.date[lowest_scale.unit + '_start'](dates.end_date), 2, lowest_scale.unit)
      } else {
        gantt.config.start_date = gantt.config.end_date = null
      }

      // restore the previous scroll position
      if (config.scroll_position) {
        setTimeout(function () {
          gantt.scrollTo(config.scroll_position.x, config.scroll_position.y)
        }, 4)
      }
    },
    // 时间刻度自适应
    zoomToFit() {
      var project = gantt.getSubtaskDates()
      var areaWidth = gantt.$task.offsetWidth
      var scaleConfigs = zoomConfig.levels

      for (var i = 0; i < scaleConfigs.length; i++) {
        var columnCount = this.getUnitsBetween(project.start_date, project.end_date, scaleConfigs[i].scales[scaleConfigs[i].scales.length - 1].unit, scaleConfigs[i].scales[0].step)
        if ((columnCount + 2) * gantt.config.min_column_width <= areaWidth) {
          break
        }
      }

      if (i == scaleConfigs.length) {
        i--
      }

      gantt.ext.zoom.setLevel(scaleConfigs[i].name)
      this.applyConfig(scaleConfigs[i], project)
    },

    // get number of columns in timeline
    getUnitsBetween(from, to, unit, step) {
      var start = new Date(from)
      var end = new Date(to)
      var units = 0
      while (start.valueOf() < end.valueOf()) {
        units++
        start = gantt.date.add(start, step, unit)
      }
      return units
    },
    // 时间刻度缩小
    zoom_in() {
      gantt.ext.zoom.zoomIn()
      gantt.$zoomToFit = false
      // document.querySelector('.zoom_toggle').textContent = 'Zoom to Fit'
    },
    // 时间刻度放大
    zoom_out() {
      gantt.ext.zoom.zoomOut()
      gantt.$zoomToFit = false
      // document.querySelector('.zoom_toggle').textContent = 'Zoom to Fit'
    },
    // 鼠标拖动改变时间轴
    handleInput(value) {
      console.log(value, '222')
      if (value > this.currentValue) {
        console.log('第一次')
        this.currentValue = value
        this.zoom_out()
      } else {
        console.log('第二次')
        this.zoom_in()
        this.currentValue = value
      }
    },
    // 切换自适应和默认值
    handleSwitchChange(value) {
      this.toggleMode()
    }

  }
}
</script>

<style>
@import '~dhtmlx-gantt/codebase/dhtmlxgantt.css';
.gantt-style {
  width: 100%;
  height: calc(100vh - 150px);
  position: relative;
}
.tool-operation {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
}
.operation-switch{
    margin-left:20px;
  }
</style>
