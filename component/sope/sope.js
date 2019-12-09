Component({
  data:{
    toggle:'',
    maskActive:''
  },
  properties:{
    scopeWritePhotosAlbum:{
      type:Boolean,
      value:false
    }
  },
  observers:{
    scopeWritePhotosAlbum:function(e){
      console.log(e)
      e ? this.setData({ toggle: "bottom:0%;", maskActive: 'maskActive' }) : this.setData({ toggle: '', maskActive:'' });
    }
  },
  methods:{
    configqx(){
      this.triggerEvent("configqx", !this.data.scopeWritePhotosAlbum);
    },
    stopPageScroll() { return }
  }
})