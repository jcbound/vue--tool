<template>
  <div id="example-4">
    <input id="one" v-model="picked" type="radio" value="One">
    <label for="one">One</label>
    <br>
    <input id="two" v-model="picked" type="radio" value="Two">
    <label for="two">Two</label>
    <br>
    <span>Picked: {{ picked }}</span>
  </div>
</template>
<style>
.slider {
  width: 30%;
  height: 200px;
  background-color: #336666;
  float: left;
}
.slider > ul {
  list-style: none;
  color: white;
}
</style>
<script>

export default {
  name: 'Slider',
  data() {
    return {
      picked: 'wodeshouji'
    }
  }
}
</script>
