<template>
  <div id="leftnav2">
    <div class="right1" @click="showlarge(ceshi)">{{ value }}-{{ post.title }}-{{ post.id }}<strong>Error!</strong>
      <slot>Something bad happened.</slot></div>
  </div>
</template>
<style>
#leftnav2>.right1 {
    float: right;
    width: 500px;
    height: 100px;
    background-color: #669999;
    color: #9966FF
}
</style>
<script>
export default {
  name: 'PropCeshi',
  props: ['post'],
  data: function() {
    return {
      message: 1,
      value: 0,
      ceshi: 10

    }
  },
  methods: {
    showlarge(ceshi) { this.$emit('enlargetext', ceshi) }
  }
}
</script>
