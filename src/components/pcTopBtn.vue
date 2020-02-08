<template>
<div>
  <div class="myContant" >
    <img class="logoImg" src="../assets/超维鱼.png">
 <div class='selectMenu'>
   <el-menu 
  :default-active="this.$route.path"
  class="mButton"
  mode="horizontal"
  background-color="rgb(56, 56, 56)"
  text-color="#fff"
  router
  active-text-color="#ffd04b" 
  >
  <el-menu-item  v-for="item in buttonText" v-bind:key="item.router"  style='flex: 1;' v-bind:index="item.router" >{{item.label}}</el-menu-item>
</el-menu>
</div>   
</div> 
</div>

</template>
<script>

export default{
  name:'mfooterButton-text',
  props:['buttonText'],
  data:function(){
    return{

    }
  }
}
</script>
<style scoped lang="less">
   .logoImg{
     width: 10%;

     float: left;
     margin-left: 15%;
   }
   .myContant{
    width:100%;
    background-color: rgb(56, 56, 56);
    height: 120px;
    }
   .mButton{
    display:flex;
    align-items:center;
    justify-content:center;
   }
   .selectMenu{
     float: right;
     max-width:600px;
     margin-right:20%;
     margin-top:30px;
   }
   .is-active{
      background-color: rgb(56, 56, 56)!important;
   }
   .el-menu-item{
    border: 0px!important;
    font-size: 20px;
   }
.el-menu-item:hover{
  background-color: rgb(56, 56, 56)!important;
}
   .el-menu{
    border: 0px!important;
   }
</style>
