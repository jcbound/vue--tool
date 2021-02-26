// 将原有的代码改为这样
<template>
  <div id="tui-image-editor" />
</template>
<script>
import 'tui-image-editor/dist/tui-image-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css'
const ImageEditor = require('tui-image-editor')
const locale_zh = {
  // override default English locale to your custom
  Crop: '裁剪',
  DeleteAll: '全部删除',
  Delete: '删除',
  Undo: '撤销',
  Redo: '反撤销',
  Reset: '重置',
  Flip: '镜像',
  Rotate: '旋转',
  Draw: '画',
  Shape: '形状标注',
  Icon: '图标标注',
  Text: '文字标注',
  Mask: '遮罩',
  Filter: '滤镜',
  Bold: '加粗',
  Italic: '斜体',
  Underline: '下划线'
  // Left: '左对齐',
  // Center: '居中',
  // Right: '右对齐',
  // Color: '颜色',
  // 'Text size': '字体大小',
  // Custom: '自定义',
  // Square: '正方形',
  // Apply: '应用',
  // Cancel: '取消',
  // 'Flip X': 'X 轴',
  // 'Flip Y': 'Y 轴',
  // Range: '区间',
  // Stroke: '描边',
  // Fill: '填充',
  // Circle: '圆',
  // Triangle: '三角',
  // Rectangle: '矩形',
  // Free: '曲线',
  // Straight: '直线',
  // Arrow: '箭头',
  // 'Arrow-2': '箭头2',
  // 'Arrow-3': '箭头3',
  // 'Star-1': '星星1',
  // 'Star-2': '星星2',
  // Polygon: '多边形',
  // Location: '定位',
  // Heart: '心形',
  // Bubble: '气泡',
  // 'Custom icon': '自定义图标',
  // 'Load Mask Image': '加载蒙层图片',
  // Grayscale: '灰度',
  // Blur: '模糊',
  // Sharpen: '锐化',
  // Emboss: '浮雕',
  // 'Remove White': '除去白色',
  // Distance: '距离',
  // Brightness: '亮度',
  // Noise: '噪音',
  // 'Color Filter': '彩色滤镜',
  // Sepia: '棕色',
  // Sepia2: '棕色2',
  // Invert: '负片',
  // Pixelate: '像素化',
  // Threshold: '阈值',
  // Tint: '色调',
  // Multiply: '正片叠底',
  // Blend: '混合色'
  // etc...
}
export default {
  data() {
    return {
      instance: null
    }
  },
  mounted() {
    this.instance = new ImageEditor(
      document.querySelector('#tui-image-editor'),
      {
        includeUI: {
          loadImage: {
            path: 'img/icons/ceshi.jpg',
            name: 'image'
          },
          menu: ['shape', 'draw', 'text', 'rotate'],
          initMenu: 'draw',
          menuBarPosition: 'bottom',
          locale: locale_zh // 本地化语言为中文
        },
        cssMaxWidth: 700,
        cssMaxHeight: 500,
        selectionStyle: {
          cornerSize: 20,
          rotatingPointOffset: 70
        }
      }
    )
  }
}
</script>
