<template>
  <el-carousel indicator-position="none" :height='this.$store.state.pcTop?"500px":"300px"'>
    <el-carousel-item v-for="item in pictures.datas" :key="item.ID">
      <img v-bind:src="item.jsonData.src">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
import dataModel from'../js/dataModel';
import chaoweifish from'../assets/超维鱼.png';
export default{
  name:'m',
  data:function(){
    return{
      pictures:new dataModel([{"ID":1,src:chaoweifish},{"ID":2,src:chaoweifish},{"ID":3,src:chaoweifish},{"ID":4,src:chaoweifish}])
    }
  },
created(){
  console.log(this.pictures);
}
}
</script>

<style scoped lang="less">

  

</style>