<template>
   <el-menu 
  :default-active="this.$route.path"
  class="mButton"
  mode="horizontal"
  background-color="#545c64"
  text-color="#fff"
  router
  active-text-color="#ffd04b" >
  <el-menu-item  v-for="item in buttonText" v-bind:key="item.router"  v-bind:index="item.router" style='flex: 1;' >
    <i v-bind:class='item.ico'></i>  
    <span>{{item.label}}</span>
  </el-menu-item>
</el-menu>
</template>
<script>

export default{
  name:'mfooterButton-text',
  data:function(){
    return{
     buttonText:[
      {
         ico:'el-icon-edit',
         label:'name1',
         router:'/'
      },
            {
         ico:'el-icon-share',
         label:'name2',
         router:'/a'
      },
            {
         ico:'el-icon-delete',
         label:'name3',
         router:'/b'
      }
     ]
    }
  },

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
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  line-height: 20px !important;
  font-size: 16px !important;
}



</style>
