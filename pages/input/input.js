var that;

Page({
  
  data:{

    formData:[

      { type: "text", label: "姓名", name: "NickName", labelStyle: "", inputStyle:'', changeEven: "changeNickName" },

      { type: "text", label: "电话", name: "Phone", labelStyle: "", inputStyle: '', changeEven: "changeNickName" }

    ],

    btnlodingstatue:false
    
  },

  
  onLoad(options){

    that = this;

  },


  changeNickName(e){

    var value = e.detail.value;

    var index = e.currentTarget.dataset.index;

    var formData = that.data.formData;

    if (value == ""){

      this.setData({ 
        
        ["formData[" + index + "].labelStyle"]: "", 
        
        ["formData[" + index + "].inputStyle"]: "" 
        
      });

    }else{

      for (var item of formData) {

        item.labelStyle = ""

      }

      this.setData({ 
        
        ["formData[" + index + "].labelStyle"]: "font-size:26rpx; top:20rpx;", 
        
        ["formData[" + index + "].inputStyle"]: "top:26rpx;" 

      });

    }

  },


  formSubmit(e){

    that.setData({ btnlodingstatue: true })

    setTimeout(()=>{

      console.log(e);

      that.setData({ btnlodingstatue:false });

    },1000)

  }

})