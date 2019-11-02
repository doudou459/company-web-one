<template>
   <el-menu 
  :default-active="this.$route.path"
  class="mButton"
  mode="horizontal"
  background-color="#545c64"
  text-color="#fff"
  router
  active-text-color="#ffd04b" 
  >
  <el-menu-item  v-for="item in buttonText" v-bind:key="item.router"  style='flex: 1;' v-bind:index="item.router" >{{item.label}}</el-menu-item>
</el-menu>
</template>
<script>

export default{
  name:'mfooterButton-text',
  data:function(){
    return{
     buttonText:[
      {
         label:'name1',
         router:'/'
      },
            {
         label:'name2',
         router:'/a'
      },
            {
         label:'name3',
         router:'/b'
      }
     ]
    }
  }
}
</script>
<style scoped lang="less">
   .mButton{
    display:flex;
    align-items:center;
    justify-content:center;
   }
.el-menu-item{
  border-bottom:0px !important;
}



</style>
