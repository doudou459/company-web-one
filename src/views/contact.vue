<template>
  <div class="contact">
   <div v-html="contactData" class="contactBody" :style="{'height':this.$store.state.maiHeight+'px'}" >
   
   </div>
  </div>
</template>
<script>
export default {
  data:function(){
    return{
      contactData:""
    }
  },
      created(){
    let me = this;
    this.$ajax
      .get("/service/getContact")
      .then(function(res) {
        if (res.data && res.data.length > 0) {
         me.contactData=res.data
        }
      })
      .catch(function(error) {
        me.$message({
          showClose: true,
          message: error,
          type: "error"
        });
      });
         
    }
}
</script>
<style lang="less" scoped>
.contact{
  position: relative;
}
.contactBody{
  width: 100%;
  max-width: 600px;
  position:absolute;
  margin: auto;
  left: 50%;
  transform: translateX(-50%);
  background-color: aliceblue;
  overflow: auto;
  padding:0px 10px 0px 10px;
}
</style>
