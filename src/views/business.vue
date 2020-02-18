<template>
  <div>
    <div class="business" v-bind:style="{'height':this.$store.state.maiHeight+'px'}">
      <div class="cardBody">
        <el-row>
          <el-col v-for="item in producesData.datas" :key="item.ID" :span="8">
            <el-card shadow="hover">
              <el-image @click="showDrawer(item.detail)"
                style="width: 100%; height: 100%"
                :src="getDownloadUrl(item.pictureUrl)"
                fit="fill"
              ></el-image>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  <el-drawer
  :visible.sync="drawer"
  :with-header="false">
 <div v-html="produceDetail"></div>
</el-drawer>

  </div>
</template>
<script>
export default {
  data: function() {
    return {
      producesData: new this.$dataModel(
        ["ID", "title", "pictureUrl", "detail"],
        "ID"
      ),
      drawer:false,
      produceDetail:""
    };
  },
  methods: {
    getDownloadUrl: function(name) {
      return "/service/downloadImg?fileName=" + name;
    },
    showDrawer:function(detail){
      this.produceDetail=detail
      this.drawer=true;      
    }
  }
};
</script>
<style lang="less" scoped>
.cardBody {
  width: 75%;
  height: 80%;
  box-shadow: 0px 0px 5px 5px rgb(20, 20, 20, 0.5);
  position: absolute;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
}
.business {
  position: relative;
}
</style>
