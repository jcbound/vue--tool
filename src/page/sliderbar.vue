<template>
    <div id="leftnav1">
        <div class="left">{{value}}</div>
    </div>
</template>
<style>
#leftnav1>.left{
	margin-top: 200px;
    width: 100px;
    height: 100px;
    background-color: #003399;
    color: #9966FF	
}
</style>
<script>
export default {
    name: "leftNav",
    data: function() {
        return {
            message: 1,
            value:2

        }
    }

}
</script>