<template>
  <div class="toggle">
    <div class="app">
      <div id="example-4">
        <input type="radio" id="one" value="One" v-model="picked" />
        <label for="one">One</label>
        <br />
        <input type="radio" id="two" value="Two" v-model="picked" />
        <label for="two">Two</label>
        <br />
        <span>Picked: {{ picked }}</span>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
new Vue({
  el: "#example-4",
  data: {
    picked: "wode"
  }
});
</script>