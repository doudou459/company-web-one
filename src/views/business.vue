<template>
  <div>
    <div class="mainBody" v-bind:style="{'height':this.$store.state.maiHeight+'px'}">
      <div :class="{cardBody:this.$store.state.pcFooter,cardBodym:this.$store.state.mFooter}">
         <h1 v-if="showDips"  style="position: absolute;margin: auto;top: 50%;left: 50%;transform: translate(-50%, -50%);"     >敬请期待···</h1>
        <div v-if="this.$store.state.pcFooter" class="indexPicDiv">
          <el-row :gutter="30" class="imgRowPC">
            <el-col :span="8" v-for="item in producesData.datas" :key="item.ID"  class="pcCol">
              <el-image
                :src="getDownloadUrl(item.pictureUrl)"
                 :style="{'height':imgHeight+'px'}"
                fit="fill"
                class="imgItemPC"
                @click="showDrawer(item.detail)"
              ></el-image>
            </el-col>
          </el-row>
        </div>
        <el-row v-else-if="this.$store.state.mFooter" class="imgRow">
          <el-col :span="24" v-for="item in producesData.datas" :key="item.ID">
            <el-image
              :src="getDownloadUrl(item.pictureUrl)"
               :style="{'height':imgHeight+'px'}"
              fit="fill"
              class="imgItem"
              @click="showDrawer(item.detail)"
            ></el-image>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-drawer
      direction="ltr"
      :visible.sync="drawer"
      :with-header="false"
      :show-close="true"
      :size="drawerSize"
      :destroy-on-close="true"
      :append-to-body="true"
    >
      <div
        v-html="produceDetail"
        class="detailDiv"
        :class="{topMargin40:this.$store.state.pcFooter}"
        v-bind:style="{'height':this.$store.state.maiHeight+'px'}"
      ></div>
      <div class="imgzoom_pack">
        <div class="imgzoom_x">X</div>
        <div class="imgzoom_img">
          <img />
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import scale from "../assets/scale";
export default {
  data: function() {
    return {
      producesData: new this.$dataModel(
        ["ID", "title", "pictureUrl", "detail"],
        "ID"
      ),
      drawer: false,
      produceDetail: "",
      drawerSize: this.$store.state.mFooter ? "100%" : "36%",
      imgHeight:this.$store.state.imgHeight,
      showDips:true
    };
  },
  methods: {
    getDownloadUrl: function(name) {
      return "/service/downloadImg?fileName=" + name;
    },
    showDrawer: function(detail) {
      this.produceDetail = detail;
      this.drawer = true;
      setTimeout(function() {
        scale.ImagesZoom.init({
          elem: ".listImg"
        });
      }, 1000);
    }
  },
  created() {
    let me = this;
    this.$ajax
      .get("/service/getProduces")
      .then(function(res) {
        if (res.data && res.data.length > 0) {
          me.producesData.loadData(res.data);
          me.showDips=false;
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
};
</script>
<style lang="less" scoped>
@import "../assets/scale.css";
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
  overflow: auto;
}
.cardBodym {
  width: 90%;
  height: 90%;
  box-shadow: 0px 0px 5px 5px rgb(20, 20, 20, 0.5);
  position: absolute;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  overflow: auto;
}
.mainBody {
  position: relative;
}
.imgRow {
  padding: 8px;
}
.imgRowPC {
  margin-top: 15px;
  padding: 15px 30px 15px 30px;
}
.imgItemPC {
  border-radius: 15px;
  width: 100%;
}
.imgItemPC:active {
  box-shadow: 0px 0px 5px 5px rgb(20, 20, 20, 0.5);
}
.imgItemPC:hover {
  box-shadow: 0px 0px 5px 5px rgba(20, 20, 20, 0.5);
}
.imgItem {
  border-radius: 8px;
  width: 100%;
}
.indexPicDiv {
  margin-left: 15px;
  margin-right: 15px;
}
.detailDiv {
  margin-left: 3px;
  margin-right: 3px;
  padding-left: 10px;
  padding-right: 15px;
  overflow: auto;
  border-top-style: inset;
  border-top-color: aliceblue;
  border-top-width: thin;
}
.topMargin40 {
  margin-top: 40px;
}
.pcCol{
  margin-bottom: 10px;
}
</style>
