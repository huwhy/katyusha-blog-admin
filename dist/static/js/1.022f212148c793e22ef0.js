webpackJsonp([1],{Libm:function(e,t){},NSFT:function(e,t){},fQBs:function(e,t,n){"use strict";var s={props:{action:{type:String,default:"/api/upload"},name:{type:String,default:"file"},img:{type:String,default:""}},data:function(){return{imageUrl:""}},methods:{handleUploadSuccess:function(e,t){this.imageUrl=e.data,this.$emit("upload-success",e.data)},beforeUpload:function(e){var t="image/jpeg"===e.type,n=e.size/1024/1024<2;return t||this.$message.error("上传头像图片只能是 JPG 格式!"),n||this.$message.error("上传头像图片大小不能超过 2MB!"),t&&n}},watch:{img:function(e,t){this.imageUrl=e}}},i={render:function(){var e=this.$createElement,t=this._self._c||e;return t("el-upload",{staticClass:"single-uploader",attrs:{action:this.action,name:this.name,"show-file-list":!1,"on-success":this.handleUploadSuccess,"before-upload":this.beforeUpload}},[this.imageUrl?t("img",{staticClass:"single-img",attrs:{src:this.imageUrl}}):t("i",{staticClass:"el-icon-plus single-uploader-icon"})])},staticRenderFns:[]};var a=n("VU/8")(s,i,!1,function(e){n("Libm")},null,null);t.a=a.exports},phcZ:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={components:{SingleUploader:n("fQBs").a},computed:{banner:function(){return this.$store.getters.banner.temp}},methods:{handleSuccess:function(e){this.banner.img=e},onSubmit:function(){var e=this;this.$store.dispatch("BANNER_POST").then(function(t){e.$message.success("提交成功！"),e.removeView()})},onClose:function(){this.removeView()}}},i={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-form",{attrs:{"label-width":"80px"}},[n("el-form-item",{attrs:{label:"链接"}},[n("el-input",{model:{value:e.banner.url,callback:function(t){e.$set(e.banner,"url",t)},expression:"banner.url"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"展示图"}},[n("SingleUploader",{on:{"upload-success":e.handleSuccess}})],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("提交")]),e._v(" "),n("el-button",{on:{click:e.onClose}},[e._v("取消")])],1)],1)},staticRenderFns:[]};var a=n("VU/8")(s,i,!1,function(e){n("NSFT")},"data-v-2cba0e26",null);t.default=a.exports}});
//# sourceMappingURL=1.022f212148c793e22ef0.js.map