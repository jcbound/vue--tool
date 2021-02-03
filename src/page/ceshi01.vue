<template>
  <div class="toggle">
    <div class="app">
      <div id="example-4">
        <input id="one" v-model="picked" type="radio" value="One">
        <label for="one">One</label>
        <br>
        <input id="two" v-model="picked" type="radio" value="Two">
        <label for="two">Two</label>
        <br>
        <span>Picked: {{ picked }}</span>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
new Vue({
  el: '#example-4',
  data: {
    picked: 'wode'
  }
})
</script>
