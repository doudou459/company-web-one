<template>
  <div id="app">
<el-container >
  <el-header class="el-header-pc" v-if='this.$store.state.pcTop' >
          <pcTopBtn v-if='this.$store.state.pcTop' ></pcTopBtn>     
  </el-header>
  <el-header class="el-header-m" v-if='this.$store.state.mFooter' >
      {{this.$store.state.companyName}}
  </el-header>
  <el-main  v-bind:style='{"height":this.$store.state.maiHeight+"px"}'>
   <div class='myContant' v-bind:style='{"min-height":this.$store.state.maiHeight+"px"}'>
     <router-view></router-view>
   </div>
  </el-main>
  <el-footer class='pcFooter' v-if='this.$store.state.pcFooter'>

  </el-footer>
  <el-footer class='mFooter' v-else-if='this.$store.state.mFooter'>
   <mfooterBtn></mfooterBtn>
  </el-footer>
</el-container>

  </div>
</template>
<script>

import mfooterBtn from './components/mFooterBtnIcoText'
import pcTopBtn from './components/pcTopBtn'
export default{
  name:'app',
  data:function(){
    return{

    }
    
  },
  components:{
    mfooterBtn,
    pcTopBtn
  },
  created(){
      this.$store.commit('showFooter');
      this.$store.commit('setMainHeight');
      this.$store.commit("setMyDatas");
    }
}
</script>
<style scoped lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  .el-header-pc {
   padding: 0px;
   height: 120px!important;
  }
  .pcFooter{
    background-color: rgb(56, 56, 56);
    color: rgb(250, 250, 250);
    text-align: center;
    font-size: 20px;
    line-height: 60px; 
  }
    .el-header-m{
    background-color: rgb(56, 56, 56);
    color: rgb(250, 250, 250);
    text-align: center;
    font-size: 20px;
    line-height: 60px; 
  }
  .mFooter{
    background-color:#ffffff;
    color: #c5c5c5;
    text-align: center;
    font-size: 20px;
    padding:0px !important;
  }
   .el-main{
     overflow-x: hidden !important;
     overflow-y: auto !important;
     padding:0px !important;
   }
   .myContant{
     width:100%;
     max-width:1000px;
     margin-left:auto;
     margin-right:auto;
   }
.el-container{
  background-color:rgb(232, 232, 232);
}


</style>
