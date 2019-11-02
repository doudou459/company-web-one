import Vue from 'vue'
import Vuex from 'vuex'
import dataModel from'./js/dataModel'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   companyName:'超维鱼软件',
   fullheight:document.documentElement.clientHeight,
   fullwidth:document.documentElement.clientWidth,
   pcFooter:false,
   mFooter:false,
   pcTop:false,
   maiHeight:document.documentElement.clientHeight,
   myDatas:[]
  },
  mutations: {
  setMainHeight:function(){
    if(this.state.pcTop){
      this.state.maiHeight-=120 
    }else{
      this.state.maiHeight-=60 
    }
    if(this.state.pcFooter||this.state.mFooter){
      this.state.maiHeight-=60
    }

  },
  showFooter:function(){
    if(this.state.fullwidth>767){
     this.state.pcFooter=true;
     this.state.pcTop=true;
    }else{
    this.state.mFooter=true;
  }
  },
  setMyDatas:function(){
    let data =[{"ID":1,"name":"jack","year":2019},{"ID":2,"name":"nick","year":2019},{"ID":3,"name":"lucy","year":2019},{"ID":4,"name":"tom","year":2019}];
    let idName = "ID"
    this.state.myDatas = new dataModel(JSON.stringify(data),idName);
  }
  
  },
  actions: {

  },
})
