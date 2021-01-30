<template>
  <div class="progress-bar" style="margin: 20px">
    <li>
      <span>买家下单</span>
      <div class="bar-date">
        <span>下单时间</span><br />
        <span>2019-03-12 22:00:01</span>
      </div>
    </li>
    <li class="active">
      <span>买家付款</span>
      <div class="bar-date">
        <span>付款时间</span><br />
        <span>2019-03-12 22:01:01</span>
      </div>
    </li>
    <li>
      <span>发货</span>
      <div class="bar-date"></div>
    </li>
    <li>
      <span>买家确认收货</span>
      <div class="bar-date"></div>
    </li>
  </div>
</template>
<style lang="scss">
.progress-bar li {
  padding: 0px 20px;
  line-height: 40px;
  background: #50abe4;
  display: inline-block;
  color: #fff;
  position: relative;
  width: 180px;
  text-align: center;
}
.progress-bar li:after {
  content: "";
  display: block;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 20px solid #50abe4;
  position: absolute;
  right: -20px;
  top: 0;
  z-index: 10;
}
.progress-bar li:before {
  content: "";
  display: block;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 20px solid #fff;
  position: absolute;
  left: 0px;
  top: 0;
}
.progress-bar li {
  padding-left: 25px;
}
.progress-bar li:first-child {
  border-radius: 4px 0 0 4px;
}
.progress-bar li:first-child:before {
  display: none;
}
.progress-bar li.active {
  background-color: #ef72b6;
}
.progress-bar li.active:after {
  border-left-color: #ef72b6;
}
.bar-date {
  position: absolute;
  color: #000;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
}
.bar-date span {
  font-size: 12px;
  color: #999;
}
</style>e
