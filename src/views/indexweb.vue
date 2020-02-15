<template>
<div>
  <el-carousel indicator-position="none"  :height='this.$store.state.pcTop?"500px":"240px"'>
    <el-carousel-item v-for="item in getCarouselImg(carousel_img.datas)" :key="item.ID">
      <el-image
       style="width: 100%; height: 100%"
      :src="getDownloadUrl(item.url)"
      fit="fill"></el-image>
    </el-carousel-item>
  </el-carousel> 
  <div v-if="this.$store.state.pcFooter" class="indexPicDiv">
 <el-row :gutter="30"   class="imgRowPC">
  <el-col :span="8" v-for="item in index_img.datas" :key="item.ID"  >
                <el-image
       style="width: 100%; height: 100%"
      :src="getDownloadUrl(item.url)"
      fit="fill" class="imgItemPC"></el-image>
  </el-col>
</el-row> 
  </div>
 <el-row v-else-if="this.$store.state.mFooter"  class="imgRow" >
  <el-col :span="24" v-for="item in index_img.datas" :key="item.ID" >
           <el-image
       style="width: 100%; height: 100%"
      :src="getDownloadUrl(item.url)"
      fit="fill" class="imgItem"></el-image>
  </el-col>
</el-row> 
</div> 
</template>
<script>
export default{
  name:'index',
  data:function(){
    return{
      carousel_img:new this.$dataModel(["ID","showType","title","url"],"ID"),
      index_img:new this.$dataModel(["ID","title","url"],"ID")
    }
  },
created(){
    let me = this;
    this.$ajax
      .get("/service/getCarouselImgs")
      .then(function(res) {
        if (res.data && res.data.length > 0) {
          me.carousel_img.loadData(res.data);
        }
      })
      .catch(function(error) {
        me.$message({
          showClose: true,
          message: error,
          type: "error"
        });
      });
          this.$ajax
      .get("/service/getIndexImgs")
      .then(function(res) {
        if (res.data && res.data.length > 0) {
          me.index_img.loadData(res.data);
        }
      })
      .catch(function(error) {
        me.$message({
          showClose: true,
          message: error,
          type: "error"
        });
      });
},
methods:{
  getDownloadUrl:function(name){
    return "/service/downloadImg?fileName="+name;
  },
  getCarouselImg:function(datas){
    if(this.$store.state.mFooter){
      return datas.filter(value=>value.showType=="m")
    }else{
      return datas.filter(value=>value.showType=="pc")
    }
  }
}
}
</script>

<style scoped lang="less">
.imgRow{
margin-top:15px;
padding:8px;
}
.imgRowPC{
margin-top:15px;
padding:15px 30px 15px 30px;
}
.imgItemPC{
  border-radius: 15px;
}
.imgItemPC:active{
  box-shadow: 0px 0px 5px 5px rgb(20, 20, 20,0.5);
}
.imgItemPC:hover{
  box-shadow: 0px 0px 5px 5px rgba(20, 20, 20,0.5);
}
.imgItem{
    border-radius: 8px;
}
.el-col-24{
  margin-top:5px;
  margin-bottom: 5px;
}
.indexPicDiv{
  margin-left:15%;
  margin-right: 15%;
}


</style>