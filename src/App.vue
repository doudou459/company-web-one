<template>
  <div id="app">
    <el-container>
      <el-header class="el-header-pc" v-if="this.$store.state.pcTop">
        <pcTopBtn v-bind:buttonText="this.$store.state.buttonText" v-if="this.$store.state.pcTop"></pcTopBtn>
      </el-header>
      <el-header
        class="el-header-m"
        v-if="this.$store.state.mFooter"
      >{{this.$store.state.companyName}}</el-header>
      <el-main v-bind:style="{'height':this.$store.state.maiHeight+'px'}">
        <div class="myContant" v-bind:style="{'min-height':this.$store.state.maiHeight+'px'}">
          <router-view></router-view>
        </div>
      </el-main>
      <el-footer class="pcFooter" v-if="this.$store.state.pcFooter">
        <div style="width:500px;margin:0 auto; padding:0;">
          <a
            target="_blank"
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51068102510797"
            style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"
          >
            <img src="./assets/ba.png" style="float:left;" />
            <p
              style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;"
            >川公网安备 51068102510797号 蜀ICP备16029429号</p>
          </a>
        </div>
      </el-footer>
      <el-footer class="mFooter" v-else-if="this.$store.state.mFooter">
        <mfooterBtn v-bind:buttonText="this.$store.state.buttonText"></mfooterBtn>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import mfooterBtn from "./components/mFooterBtnIcoText";
import pcTopBtn from "./components/pcTopBtn";
export default {
  name: "app",
  data: function() {
    return {};
  },
  components: {
    mfooterBtn,
    pcTopBtn
  },
  created() {
    this.$store.commit("showFooter");
    this.$store.commit("setMainHeight");
    this.$store.commit("setImgHeight");
  }
};
</script>
<style scoped lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-header-pc {
  padding: 0px;
  height: 120px !important;
}
.pcFooter {
  background-color: rgb(56, 56, 56);
  color: rgb(250, 250, 250);
  text-align: center;
  font-size: 20px;
  line-height: 60px;
}
.el-header-m {
  background-color: rgb(56, 56, 56);
  color: rgb(250, 250, 250);
  text-align: center;
  font-size: 20px;
  line-height: 60px;
}
.mFooter {
  background-color: #ffffff;
  color: #c5c5c5;
  text-align: center;
  font-size: 20px;
  padding: 0px !important;
}
.el-main {
  overflow-x: hidden !important;
  overflow-y: auto !important;
  padding: 0px !important;
}
.myContant {
  width: 100%;
}
.el-container {
  background-color: rgb(232, 232, 232);
}

</style>
