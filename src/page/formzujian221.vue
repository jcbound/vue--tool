<template>
  <el-form ref="form" v-bind="computedConfig" :rules="rules" :model="data">
    <el-row>
      <el-col v-for="(item, index) in computedItems" :key="getItemKey(item, index)" :md="item.md" :sm="item.sm">
        <el-form-item :label="item.label + ':'" :prop="item.prop">
          <render-content v-if="item.labelRender" slot="label" :render="item.labelRender" :data="item" />
          <slot :name="item.slot" v-bind="{ item }">
            <component :is="item.component" v-if="item.component" :ref="item.ref || `cp-${item.prop}`" v-model="data[item.prop]" :data="data" v-bind="item.props" v-on="item.listeners" />
            <span v-else>{{ data[item.prop] }}</span>
          </slot>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
const defaultConfig = {
  labelWidth: '120px'
}
// 表单字段格式化
const RenderContent = {
  props: {
    render: Function,
    formatter: Function, // 格式化数据
    data: Object,
    prop: String
  },
  render(h) {
    if (this.render) {
      return this.render(h, this.data)
    }
    let value = this.data[this.prop]
    if (this.formatter) {
      value = this.formatter(value, this.data)
    }
    return <span>{value}</span>
  }
}
// element UI 组件
const alias = {
  input: {
    component: 'el-input',
    props: {}
  },
  textarea: {
    component: 'el-input',
    props: {
      type: 'textarea'
    }
  },
  radio: {
    component: 'el-radio',
    props: {}
  },
  label: {
    component: 'render-content',
    props: {}
  },
  select: {
    component: 'el-select',
    props: {}
  },
  datePicker: {
    component: 'el-date-picker',
    props: {
      style: {
        width: '100%'
      },
      'value-format': 'timestamp'
    }
  }
}

export default {
  components: {
    RenderContent
  },
  props: {
    formConfig: Object,
    formItems: Array,
    data: Object
  },
  computed: {
    // 计算属性
    computedConfig() {
      return {
        ...defaultConfig,
        ...this.formConfig
      }
    },

    // 计算每一项
    computedItems() {
      const itemResult = []
      for (const item of this.formItems) {
        // 剩余参数语法允许我们将一个不定数量的参数表示为一个数组。theArgs
        let { component, showIf, prop, props, ...theArgs } = item
        if (typeof showIf === 'function' && !showIf(this.data)) {
          continue
        }
        if (typeof props === 'function') {
          props = props(this.data)
        }
        if (component === 'label') {
          props = {
            ...props,
            data: this.data,
            prop
          }
        }
        if (alias[component]) {
          props = {
            ...alias[component].props,
            ...props
          }
          component = alias[component].component
        }
        itemResult.push({
          component,
          prop,
          props,
          ...theArgs
        })
      }
      return itemResult
    },
    rules() {
      let rules = this.computedItems.reduce((total, item) => {
        if (item.rules) {
          let rules = item.rules
          if (typeof rules === 'function') {
            rules = rules(this.data)
          }
          total[item.prop] = rules
        }
        return total
      }, {})
      return rules
    }
  },
  methods: {
    getItemKey(item, index) {
      return `${item.prop}-${index}`
    },
    validate() {
      return new Promise((resolve) => {
        this.$refs.form.validate(resolve)
      })
    },
    clearValidate(props) {
      // 清空校验
      this.$refs.form.clearValidate(props)
    }
  }
}
</script>
