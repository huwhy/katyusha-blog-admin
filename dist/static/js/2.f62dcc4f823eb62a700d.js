webpackJsonp([2],{"5aCZ":function(t,e,i){"use strict";var n=i("//Fk"),s=i.n(n),o=i("fZjL"),c=i.n(o),a={name:"editorSlideUpload",props:{color:{type:String,default:"#20a0ff"}},data:function(){return{dialogVisible:!1,listObj:{},fileList:[]}},methods:{checkAllSuccess:function(){var t=this;return c()(this.listObj).every(function(e){return t.listObj[e].hasSuccess})},handleSubmit:function(){var t=this,e=c()(this.listObj).map(function(e){return t.listObj[e]});this.checkAllSuccess()?(console.log(e),this.$emit("successCBK",e),this.listObj={},this.fileList=[],this.dialogVisible=!1):this.$message("请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！")},handleSuccess:function(t,e){var i=e.uid,n=c()(this.listObj);console.log(t,n);for(var s=0,o=n.length;s<o;s++)if(this.listObj[n[s]].uid===i)return this.listObj[n[s]].url="/file?file="+t.data,void(this.listObj[n[s]].hasSuccess=!0)},handleRemove:function(t){for(var e=t.uid,i=c()(this.listObj),n=0,s=i.length;n<s;n++)if(this.listObj[i[n]].uid===e)return void delete this.listObj[i[n]]},beforeUpload:function(t){var e=this,i=window.URL||window.webkitURL,n=t.uid;return this.listObj[n]={},new s.a(function(s,o){var c=new Image;c.src=i.createObjectURL(t),c.onload=function(){e.listObj[n]={hasSuccess:!1,uid:t.uid,width:this.width,height:this.height}},s(!0)})}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"upload-container"},[i("el-button",{style:{background:t.color,borderColor:t.color},attrs:{icon:"upload",type:"primary"},on:{click:function(e){t.dialogVisible=!0}}},[t._v("上传图片\n  ")]),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("el-upload",{staticClass:"editor-slide-upload",attrs:{action:"/api/upload",multiple:!0,"file-list":t.fileList,name:"file","show-file-list":!0,"list-type":"picture-card","on-remove":t.handleRemove,"on-success":t.handleSuccess,"before-upload":t.beforeUpload}},[i("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")])],1),t._v(" "),i("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("确 定")])],1)],1)},staticRenderFns:[]};var r={name:"tinymce",components:{editorImage:i("VU/8")(a,l,!1,function(t){i("tmwL")},"data-v-620077e8",null).exports},props:{id:{type:String},value:{type:String,default:""},toolbar:{type:Array,required:!1,default:function(){return[" removeformat undo redo | insert | styleselect | forecolor | bold italic blockquote | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent "," link image | fullscreen code | h2 p  media link"]}},menubar:{default:""},height:{type:Number,required:!1,default:360}},data:function(){return{hasChange:!1,hasInit:!1,tinymceId:this.id||"vue-tinymce-"+ +new Date}},watch:{value:function(t){var e=this;!this.hasChange&&this.hasInit&&this.$nextTick(function(){return window.tinymce.get(e.tinymceId).setContent(t)})}},mounted:function(){this.initTinymce()},activated:function(){this.initTinymce()},deactivated:function(){this.destroyTinymce()},methods:{initTinymce:function(){var t=this,e=this;window.tinymce.init({selector:"#"+this.tinymceId,height:this.height,body_class:"panel-body ",object_resizing:!1,toolbar:this.toolbar,menubar:this.menubar,plugins:"advlist,autolink,code,paste,textcolor, colorpicker,fullscreen,link,lists,media,wordcount, imagetools",end_container_on_empty_block:!0,powerpaste_word_import:"clean",code_dialog_height:450,code_dialog_width:1e3,advlist_bullet_styles:"square",advlist_number_styles:"default",imagetools_cors_hosts:["wpimg.wallstcn.com","wallstreetcn.com"],imagetools_toolbar:"watermark",default_link_target:"_blank",link_title:!1,init_instance_callback:function(i){e.value&&i.setContent(e.value),e.hasInit=!0,i.on("NodeChange Change KeyUp",function(){t.hasChange=!0,t.$emit("input",i.getContent({format:"raw"}))})}})},destroyTinymce:function(){window.tinymce.get(this.tinymceId)&&window.tinymce.get(this.tinymceId).destroy()},setContent:function(t){window.tinymce.get(this.tinymceId).setContent(t)},getContent:function(){window.tinymce.get(this.tinymceId).getContent()},imageSuccessCBK:function(t){var e=this;t.forEach(function(t){window.tinymce.get(e.tinymceId).insertContent('<img class="wscnph" src="'+t.url+'" >')})}},destroyed:function(){this.destroyTinymce()}},u={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tinymce-container editor-container"},[e("textarea",{staticClass:"tinymce-textarea",attrs:{id:this.tinymceId}}),this._v(" "),e("div",{staticClass:"editor-custom-btn-container"},[e("editorImage",{staticClass:"editor-upload-btn",attrs:{color:"#20a0ff"},on:{successCBK:this.imageSuccessCBK}})],1)])},staticRenderFns:[]};var d=i("VU/8")(r,u,!1,function(t){i("6F5m")},"data-v-2388924b",null);e.a=d.exports},"6F5m":function(t,e){},Cdx3:function(t,e,i){var n=i("sB3e"),s=i("lktj");i("uqUo")("keys",function(){return function(t){return s(n(t))}})},M8Tx:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={components:{Tinymce:i("5aCZ").a},computed:{article:function(){return this.$store.getters.article.temp}},methods:{handleSuccess:function(t){this.article.mainImg=t},onSubmit:function(){var t=this;this.$store.dispatch("ARTICLE_POST").then(function(e){t.$message.success("提交成功！"),t.removeView()})},onClose:function(){this.removeView()}},created:function(){this.$store.dispatch("ARTICLE_EDIT",1).then(function(t){})}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return null!=t.article?i("el-form",{attrs:{"label-width":"80px"}},[i("el-form-item",{attrs:{label:"标题"}},[t._v("\n    "+t._s(t.article.title)+"\n  ")]),t._v(" "),i("el-form-item",[i("div",{staticClass:"components-container"},[i("div",[i("tinymce",{attrs:{height:200},model:{value:t.article.content,callback:function(e){t.$set(t.article,"content",e)},expression:"article.content"}})],1),t._v(" "),i("div",{staticClass:"editor-content",domProps:{innerHTML:t._s(t.article.content)}})])]),t._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("提交")]),t._v(" "),i("el-button",{on:{click:t.onClose}},[t._v("取消")])],1)],1):t._e()},staticRenderFns:[]};var o=i("VU/8")(n,s,!1,function(t){i("jJuo")},"data-v-f2d5b26c",null);e.default=o.exports},fZjL:function(t,e,i){t.exports={default:i("jFbC"),__esModule:!0}},jFbC:function(t,e,i){i("Cdx3"),t.exports=i("FeBl").Object.keys},jJuo:function(t,e){},tmwL:function(t,e){},uqUo:function(t,e,i){var n=i("kM2E"),s=i("FeBl"),o=i("S82l");t.exports=function(t,e){var i=(s.Object||{})[t]||Object[t],c={};c[t]=e(i),n(n.S+n.F*o(function(){i(1)}),"Object",c)}}});
//# sourceMappingURL=2.f62dcc4f823eb62a700d.js.map