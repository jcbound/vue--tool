<template>
  <div id="example-4">
   <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
    <br />
    <input type="radio" id="two" value="Two" v-model="picked" />
    <label for="two">Two</label>
    <br />
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
  name: "slider",
  data() {
    return {
        picked:'wodeshouji'
    };
  }
};
</script>