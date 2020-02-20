import Vue from 'vue'
import Vuex from 'vuex'
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
   imgHeight:200,
   carouselHeight:600,
   buttonText:[
    {
       label:'首页',
       router:'/'
    },
    {
       label:'主营业务',
       router:'/business'
    },
    {
       label:'在线体验',
       router:'/case'
    },
    {
       label:'联系方式',
       router:'/contact'
    }
   ]
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
    if(this.state.fullwidth>1024){
     this.state.pcFooter=true;
     this.state.pcTop=true;
    }else{
    this.state.mFooter=true;
  }
  },  
  setImgHeight:function(){
    if(this.state.fullwidth>1024){
      this.state.carouselHeight=600;
      this.state.imgHeight=270;
    }else{
      this.state.carouselHeight=parseInt(240*this.state.fullwidth/375); 
      this.state.imgHeight=parseInt(200*this.state.fullwidth/375);
    }
  }
  },

})
