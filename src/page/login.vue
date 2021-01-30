<template>
  <div class="process-style">
    <ul>
      <li>进度11</li>
      <li>进度12</li>
      <li>进度13</li>
      <li>进度14</li>
      <li>进度15</li>
      <li>进度16</li>
    </ul>
  </div>
</template>
<style lang="scss">
.process-style ul {
  display: flex;
  li {
    list-style: none;
    padding: 0px 20px;
    line-height: 40px;
    flex-basis: 25%;
    background: #2fafa5;
    color: #fff;
    display: flex;
    // justify-content: space-between;
    border: 1px solid red;
  }
}
.process-style li:after {
  content: "";
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 20px solid #66c18c;
  position: absolute;
  right: -20px;
  top: 0;
  z-index: 10;
}
.process-style li:before {
  content: "";
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 20px solid #fff;
  position: absolute;
  left: 0px;
  top: 0;
}
</style>
