!function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}__webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{enumerable:!0,get:getter})},__webpack_require__.r=function(exports){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.t=function(value,mode){if(1&mode&&(value=__webpack_require__(value)),8&mode)return value;if(4&mode&&"object"==typeof value&&value&&value.__esModule)return value;var ns=Object.create(null);if(__webpack_require__.r(ns),Object.defineProperty(ns,"default",{enumerable:!0,value:value}),2&mode&&"string"!=typeof value)for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key]}.bind(null,key));return ns},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function(){return module.default}:function(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=24)}([function(module,exports){var nestRE=/^(attrs|props|on|nativeOn|class|style|hook)$/;function mergeFn(a,b){return function(){a&&a.apply(this,arguments),b&&b.apply(this,arguments)}}module.exports=function(objs){return objs.reduce(function(a,b){var aa,bb,key,nestedKey,temp;for(key in b)if(aa=a[key],bb=b[key],aa&&nestRE.test(key))if("class"===key&&("string"==typeof aa&&(temp=aa,a[key]=aa={},aa[temp]=!0),"string"==typeof bb&&(temp=bb,b[key]=bb={},bb[temp]=!0)),"on"===key||"nativeOn"===key||"hook"===key)for(nestedKey in bb)aa[nestedKey]=mergeFn(aa[nestedKey],bb[nestedKey]);else if(Array.isArray(aa))a[key]=aa.concat(bb);else if(Array.isArray(bb))a[key]=[aa].concat(bb);else for(nestedKey in bb)aa[nestedKey]=bb[nestedKey];else a[key]=b[key];return a},{})}},function(module,exports){window.Gx={}},function(module,exports){window,Gx.config={devFlag:!1}},function(module,exports){var param;window,jQuery,param={getSerializeParam:function(paramList){var paramObj={str:[],obj:[],fun:[]};for(i=0;i<paramList.length;i++){var item=paramList[i];if(null!=item)switch(Object.prototype.toString.call(item)){case"[object String]":paramObj.str.push(item);break;case"[object Function]":paramObj.fun.push(item);break;default:paramObj.obj.push(item)}}return paramObj},_dataStore:{_root:null},setData:function(data,ts){ts?this._dataStore["ts_"+ts]=data:this._dataStore._root=Gx.base.mergeParam(this._dataStore._root,data)},_init:function(){if(!this._dataStore._root&&window!=top&&parent.Gx){var ts=Gx.url.getParam("timeStamp"),ds=parent.Gx.param._dataStore["ts_"+ts];this._dataStore._root=Gx.base.createObject(ds)}},get dataStore(){return this._dataStore._root}},Gx.param=param},function(module,exports){var base,cloneObj;window,cloneObj=function(obj,base){var copy;if(base=base||obj,null==obj||"object"!=typeof obj)return obj;if(obj instanceof Date)return(copy=new Date).setTime(obj.getTime()),copy;if(obj instanceof Array){copy=[];for(var i=0,len=obj.length;i<len;i++)copy[i]=cloneObj(obj[i],base);return copy}if(obj instanceof HTMLDivElement)return obj;if(Gx.base.isObject(obj)){if(obj=={})return{};for(var attr in copy={},obj)obj.hasOwnProperty(attr)&&(copy[attr]=cloneObj(obj[attr],base));return copy}throw console.log(obj,base),new Error("Unable to copy obj! Its type isn't supported.")},(base={getObjType:function(obj){return Object.prototype.toString.call(obj)},isArray:function(obj){return"[object Array]"==this.getObjType(obj)},isObject:function(obj){return"[object Object]"==this.getObjType(obj)},isFunction:function(obj){return"[object Function]"==this.getObjType(obj)},isBoolean:function(obj){return"[object Boolean]"==this.getObjType(obj)},isString:function(obj){return"[object String]"==this.getObjType(obj)},isNumber:function(obj){return"[object Number]"==this.getObjType(obj)},isHtml:function(obj){return"[object HTMLDivElement]"==this.getObjType(obj)},isDate:function(obj){return"[object Date]"==this.getObjType(obj)}}).mergeParam=function(setting,newSetting){return jQuery.extend(!0,{},cloneObj(setting),cloneObj(newSetting))},base.createObject=function(obj){return this.isArray(obj)?this.mergeParam([],obj):this.mergeParam({},obj)},base.arrPush=function(arr,obj){if(!this.isArray(arr))throw new Error("对象不是数组，无法进行合并！");return arr.concat(obj)},base.getGuid=function(length,radix){var chars="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");radix=radix||chars.length;var arr=[];if(length)for(var i=0;i<length;i++)arr[i]=chars[0|Math.random()*radix];else for(arr[8]=arr[13]=arr[18]=arr[23]="-",arr[14]="4",i=0;i<36;i++)if(!arr[i]){var c=0|16*Math.random();arr[i]=chars[19==i?3&c|8:c]}return arr.join("")},base.getDefault=function(value,def){return null==value?def:value},base.objProxy=function(targetObj,targetKey,sourceObj,sourceKey,setCheckFun){this.addGetSetFun(targetObj,targetKey,function(){return sourceObj[sourceKey]},function(val){if(setCheckFun&&!setCheckFun(val))throw new Error("set时检查不通过！");sourceObj[sourceKey]=val})},base.addGetSetFun=function(obj,key,getFun,setFun){getFun=getFun||function(){return null},setFun=setFun||function(val){},Object.defineProperty(obj,key,{enumerable:!0,configurable:!0,get:getFun,set:setFun})},Gx.base=base},function(module,exports){var convert,formatMicrometer;window,convert={objToJson:function(obj){return JSON.stringify(obj)},jsonToObj:function(json){return JSON.parse(json)},toNumber:function(num,isMicrometer,precision){return num=parseFloat(num).toString(),isMicrometer&&(num=formatMicrometer(num)),num},prefixInteger:function(num,length){return(Array(length).join("0")+num).slice(-length)}},formatMicrometer=function(num){return(num+="").includes(".")||(num+="."),num.replace(/(\d)(?=(\d{3})+\.)/g,function($0,$1){return $1+","}).replace(/\.$/,"")},Gx.convert=convert},function(module,exports){var win,url;win=window,url={searchParam:{},hashParam:{},_init:function(){var that=this;this.searchParam._root=win.location.search.substr(1),this.searchParam._root.split("&").map(function(item){if(item&&-1!=item.indexOf("=")){var r=item.split("=");that.searchParam[r[0]]=unescape(r[1])}}),this.hashParam._root=win.location.hash.split("?")[1]||"",this.hashParam._root.split("&").map(function(item){if(item&&-1!=item.indexOf("=")){var r=item.split("=");that.hashParam[r[0]]=unescape(r[1])}})},getParam:function(name){return this.hashParam[name]||this.searchParam[name]||""},replace:function(url){win.location.replace(url)},addParamForObj:function(uri,obj){if(!obj)return uri;for(key in obj)uri=this.addParam(uri,key,obj[key]);return uri},addParam:function(uri,key,value){if(!value)return uri;var re=new RegExp("([?&])"+key+"=[^#]*?([?&#]|$)","gm"),separator=uri.lastIndexOf("?")>uri.lastIndexOf("#")?"&":"?";return uri.match(re)?uri.replace(re,"$1"+key+"="+value+"$2"):uri+separator+key+"="+value}},Gx.url=url},function(module,exports){var dateTime;window,dateTime={date:function(date){return Gx.base.isDate(date)||(date=new Date(date)),{_root:date,get year(){return Gx.convert.prefixInteger(this._root.getFullYear(),4)},set year(val){this._root.setFullYear(val)},get month(){return Gx.convert.prefixInteger(this._root.getMonth()+1,2)},set month(val){this._root.setMonth(val-1)},get day(){return Gx.convert.prefixInteger(this._root.getDate(),2)},set day(val){this._root.setDate(val)},get hours(){return Gx.convert.prefixInteger(this._root.getHours(),2)},set hours(val){this._root.setHours(val)},get minutes(){return Gx.convert.prefixInteger(this._root.getMinutes(),2)},set minutes(val){this._root.setMinutes(val)},get seconds(){return Gx.convert.prefixInteger(this._root.getSeconds(),2)},set seconds(val){this._root.setSeconds(val)},getDate:dateTime.getDate,getTime:dateTime.getTime,getDateTime:dateTime.getDateTime,addYear:function(num){this.year=parseInt(this.year)+num},addMonth:function(num){this.month=parseInt(this.month)+num},addDay:function(num){this.day=parseInt(this.day)+num},addHours:function(num){this.hours=parseInt(this.hours)+num},addMinutes:function(num){this.minutes=parseInt(this.minutes)+num},addSeconds:function(num){this.seconds=parseInt(this.seconds)+num},interval:function(date){return{timeStamp:this._root.getTime()-Gx.dateTime.date(date)._root.getTime(),getSeconds:function(){return this.timeStamp/1e3},getMinutes:function(){return this.getSeconds()/60},getHours:function(){return this.getMinutes()/60},getDay:function(){return this.getHours()/24},getMonth:function(){return this.getDay()/30},getYear:function(){return this.getMonth()/12}}}}},get now(){return new this.date(new Date)},getDate:function(){var that=this.now||this;return that.year+"-"+that.month+"-"+that.day},getTime:function(){var that=this.now||this;return that.hours+":"+that.minutes+":"+that.seconds},getDateTime:function(){return this.getDate()+" "+this.getTime()},getTimeStamp:function(){return(this.now||this)._root.getTime()},getTimeAgo:function(time,maxDay){maxDay=maxDay||30;var arr=[{count:864e5,msg:"天前"},{count:36e5,msg:"小时前"},{count:6e4,msg:"分钟前"}],timeStamp=this.now.interval(time).timeStamp;if(timeStamp>=arr[0].count*maxDay)return this.date(time).getDate();for(var i=0;i<arr.length;i++)if(timeStamp>arr[i].count)return(timeStamp/arr[i].count|0)+arr[i].msg;return 0<=timeStamp?"刚刚":"未来"}},Gx.dateTime=dateTime},function(module,exports){!function(){Gx.math={numToCN:function(num){return numto({num:num,lvNum:1e4,sizes:["","万","亿","兆","京"]})},numToB:function(num){return numto({num:num,lvNum:1e3,sizes:["","K","M","G","T","P","E"]})},numToC:function(num){return numto({num:num,lvNum:1024,sizes:["B","KB","MB","GB","TB","PB","EB"]})}};var numto=function(obj){var num=obj.num,lvNum=obj.lvNum,sizes=obj.sizes;if(!num)return"0"+sizes[0];var flag=0<num;flag||(num=Math.abs(num));var lv=Math.floor(Math.log(num)/Math.log(lvNum));return lv>sizes.length-1&&(lv=sizes.length-1),(flag?"":"-")+num/Math.pow(lvNum,lv)+sizes[lv]}}(window)},function(module,exports){!function(win,$){var _setting={url:"",type:"post",timeout:6e4,async:!0,cache:!1,data:{},dataType:"json",beforeSend:function(){},complete:function(){},success:function(data){},error:function(data){500!=data.status?404!=data.status?alert(data):alert("未找到页面！"):alert("服务报错："+data.responseText)}};Gx.ajax=function(url,data,success,error,async,config){var ajaxObj=Gx.base.mergeParam(_setting,config);for(var index in ajaxObj.url=url,data)Gx.base.isObject(data[index])&&(data[index]=JSON.stringify(data[index]));return ajaxObj.data=data,ajaxObj.success=function(data){0!=data.state?Gx.base.isFunction(success)&&success(data):Gx.base.isFunction(error)?error(data):alert(data.msg)},Gx.base.isBoolean(async)&&(ajaxObj.async=async),$.ajax(ajaxObj)},Gx.ajaxPost=function(url,data,success,error,async,config){return(config=config||{}).type="post",Gx.ajax(url,data,success,error,async,config)},Gx.ajaxGet=function(url,data,success,error,async,config){return(config=config||{}).type="get",Gx.ajax(url,data,success,error,async,config)};Gx.ajaxXHR=function(url,data,success,error,async,type){var xhr=function(){if(window.XMLHttpRequest)return new XMLHttpRequest;if(window.ActiveObject)return new ActiveObject("Microsoft.XMLHTTP");throw new Error("当前浏览器不支持使用Ajax")}();xhr.onreadystatechange=function(){},xhr.open(type,url,async),xhr.send(Gx.convert.objToJson(data))},Gx.ajaxWhen=function(ajaxArr,success,error){if(!Gx.base.isArray(ajaxArr)||0==ajaxArr.length)throw new Error("ajaxArr必须为数组且不能为空！");return success=Gx.base.getDefault(success,function(){}),error=Gx.base.getDefault(error,function(){}),$.when.apply($,ajaxArr).done(success).fail(error)}}(window,jQuery)},function(module,exports){var win,layerObj,_layer,layer,_setting;win=window,_layer=Gx.base.createObject(win.layer),_setting={type:0,title:!(layer={}),content:"",area:"auto",offset:"auto",closeBtn:0,shadeClose:!0,resize:!1,maxWidth:850,maxHeight:500,success:function(layero,index){},end:function(){}},window,layerObj=Gx.base.createObject(_setting),layerObj=Gx.base.mergeParam(layerObj,{type:2}),layer.openIframe=function(url,title,param,endFun,width,height){var timeStamp=Gx.dateTime.getTimeStamp(),setting={content:url=Gx.url.addParam(url,"timeStamp",timeStamp),title:title||!1,area:width?height?[width,height]:width:"auto",end:Gx.base.isFunction(endFun)?endFun:null,success:function(layero,index){width||height||_layer.iframeAuto(index)}};return Gx.param._dataStore||(Gx.param._dataStore={}),Gx.param.setData(param,timeStamp),layerObj=Gx.base.mergeParam(layerObj,setting),_layer.open(layerObj)},window.alert=function(msg){Gx.base.isObject(msg)&&(msg=Gx.convert.objToJson(msg)),_layer.msg(msg)},window.confirm=function(msg,successFun,errorFun){_layer.confirm(msg,{btn:["Yes","No"]},function(index){successFun?successFun()&&_layer.close(index):_layer.close(index)},function(index){errorFun?errorFun()&&_layer.close(index):_layer.close(index)})},Gx.layer=layer},function(module,exports){var win,devHelper,mixins,ui;win=window,devHelper={callFun:function(type){Gx.config.devFlag&&devHelper.logThis.call(this,type)},logThis:function(type){"created"==type&&console.log(type,this)}},mixins={base:{render:function(h){return null},computed:{},watch:{},methods:{appendChildTo:function(obj){switch(Gx.base.getObjType(obj)){case"[object String]":document.getElementById(obj).appendChild(this.$el);break;case"[object HTMLDivElement]":obj.appendChild(this.$el)}},show:function(){this.display=!0},hide:function(){this.display=!1},remove:function(){this.$el.remove()}},data:function(){var data=Gx.base.createObject(this.options);return{width:Gx.base.getDefault(data.width,"200px"),display:Gx.base.getDefault(data.display,!0)}},beforeCreate:function(){devHelper.callFun.call(this,"beforeCreate")},created:function(){devHelper.callFun.call(this,"created")},beforeMount:function(){devHelper.callFun.call(this,"beforeMount")},mounted:function(){devHelper.callFun.call(this,"mounted")},updated:function(){devHelper.callFun.call(this,"updated")},props:{options:{default:function(){return{}}}}}},ui={coms:{},checkSysKeepKey:function(key){if(!key)return!1;return-1<["display"].indexOf(key.toLowerCase())},getResultObj:function(optionObj,dataSetting){dataSetting&&(optionObj.data=function(){var options=Gx.base.createObject(this.options),data={};return dataSetting.map(function(item){data[item.field]=Gx.base.getDefault(options[item.field],item.value)}),data});var obj=Gx.base.mergeParam({mixins:[],components:{"gx-button":this.coms.Button,"gx-input":this.coms.Input,"gx-panel":this.coms.Panel,"gx-radio":this.coms.Radio,"gx-select":this.coms.Select,"gx-table":this.coms.Table,"gx-toolbar":this.coms.Toolbar}},optionObj);return obj.mixins=Gx.base.arrPush(obj.mixins,[mixins.base]),obj},createInstance:function(fun,options){var option=new fun({propsData:{options:options}});return option=options.el&&document.getElementById(options.el)?option.$mount("#"+options.el):option.$mount()},vmProxy:function(target,keys){return(keys=Gx.base.arrPush(keys,[{field:"appendChildTo"},{field:"show"},{field:"hide"},{field:"width"},{field:"display"},{field:"remove"}])).map(function(item){Gx.base.objProxy(target,item.field,target.root,item.field,item.setCheckFun)}),target}},win.Gx.ui=ui},function(module,exports,__webpack_require__){"use strict";!function(){var optionObj={},setting=[{field:"data",value:[{ID:"-1",NAME:"请选择"}]},{field:"valueField",value:"ID"},{field:"textField",value:"NAME"},{field:"fixedItems",value:[]},{field:"onChange",value:function(){}},{field:"disabled",value:!1},{field:"checked",value:!0}];optionObj.render=function(h){var that=this,options=[],valueF=Gx.base.isFunction(this.valueField),textF=Gx.base.isFunction(this.textField),conversion=function(item,index){var value=item[that.valueField];valueF&&(value=that.valueField(item));var text=item[that.textField];textF&&(text=that.textField(item)),options.push(h("option",{domProps:{value:value}},[text]))};return this.fixedItems.map(conversion),this.data.map(conversion),h("div",{class:[this.checked?null:"has-error"]},[h("select",{class:["form-control"],style:{width:this.width},attrs:{disabled:this.disabled?"disabled":null},on:{change:this._baseChange},ref:"select"},[options])])},optionObj.computed={text:{cache:!1,get:function(){var select=this.$refs.select;return select.options[select.selectedIndex].text}},value:{cache:!1,get:function(){return this.$refs.select.value},set:function(val){this.$refs.select.value=val}}},optionObj.methods={_baseChange:function(){this.onChange()},getSelectedData:function(){var index=this.$refs.select.selectedIndex;return Gx.base.arrPush(this.fixedItems,this.data)[index]}};var Default=Vue.extend(Gx.ui.getResultObj(optionObj,setting));Gx.ui.coms.Select=Default,Gx.ui.createSelect=function(options){var vueCom=this.createInstance(Default,options);return this.convertSelect(vueCom)},Gx.ui.convertSelect=function(vueCom){var obj=this.vmProxy({get root(){return vueCom}},setting);return obj=this.vmProxy(obj,[{field:"getSelectedData"},{field:"text"},{field:"value"}])}}(window)},function(module,exports,__webpack_require__){"use strict";!function(){var optionObj={},setting=[{field:"type",value:"text"},{field:"value",value:""},{field:"isFocus",value:!1},{field:"prompt",value:""},{field:"onValidation",value:function(val){return!0}},{field:"onChange",value:function(){}},{field:"onBlur",value:function(){}},{field:"onFocus",value:function(){}},{field:"disabled",value:!1},{field:"readonly",value:!1},{field:"isMicrometer",value:!1},{field:"precision",value:!1},{field:"isPad",value:!1},{field:"prefix",value:!1},{field:"suffix",value:!1}];optionObj.render=function(h){var input=h("input",{class:["form-control"],style:{width:this.width},attrs:{type:this.type,placeholder:this.prompt,disabled:this.disabled?"disabled":null,readonly:this.readonly?"readonly":null},on:{change:this._baseChange,blur:this._baseOnBlur,focus:this._baseOnFocus},domProps:{value:this.$data.isFocus?this.value:this.text}});switch(this.type){case"textarea":input.tag="textarea";break;case"number":input.data.attrs.type="text"}return input},optionObj.computed={text:{cache:!1,get:function(){var num=this.value;switch(this.type){case"number":num=num&&Gx.convert.toNumber(num,this.isMicrometer)}return num},set:function(val){throw new Error("请使用value属性进行赋值！")}}},optionObj.methods={_baseChange:function(){this.value=this.$el.value,this.onChange()},_baseOnBlur:function(){this.$data.isFocus=!1,this.onBlur(),this.onValidation(this.value)},_baseOnFocus:function(){this.$data.isFocus=!0,this.onFocus()}};var Default=Vue.extend(Gx.ui.getResultObj(optionObj,setting));Gx.ui.coms.Input=Default,Gx.ui.createInput=function(options){var vueCom=this.createInstance(Default,options);return this.convertInput(vueCom)},Gx.ui.convertInput=function(vueCom){var obj=this.vmProxy({get root(){return vueCom}},setting);return obj=this.vmProxy(obj,[{field:"text"}])}}(window)},function(module,exports,__webpack_require__){"use strict";!function(){var optionObj={},setting=[{field:"id",value:""},{field:"value",value:"Button"},{field:"onClick",value:function(){}},{field:"enabled",value:!0}];optionObj.render=function(h){if(this.display)return h("button",{class:["btn","btn-default"],attrs:{type:"button",disabled:!this.enabled},on:{click:this._baseClick}},[this.value])},optionObj.methods={_baseClick:function(){this.onClick()}},optionObj.computed={root:function(){return Gx.ui.convertButton(this)}};var Default=Vue.extend(Gx.ui.getResultObj(optionObj,setting));Gx.ui.coms.Button=Default,Gx.ui.createButton=function(options){var vueCom=this.createInstance(Default,options);return this.convertButton(vueCom)},Gx.ui.convertButton=function(vueCom){return this.vmProxy({get root(){return vueCom}},setting)}}(window)},function(module,exports,__webpack_require__){"use strict";!function(){var optionObj={},setting=[{field:"name",value:null},{field:"data",value:[]},{field:"multiple",value:!1}];optionObj.render=function(h){var that=this,list=[];return this.data.forEach(function(item,index){list.push(h("li",[h("input",{attrs:{type:that.multiple?"checkbox":"radio",name:that.name},domProps:{value:item.value}}),item.text]))}),h("ul",[list])},optionObj.computed={value:{cache:!1,get:function(){var list=this.$el.getElementsByTagName("input"),checkedItemList=[];for(i=0;i<list.length;i++){var item=list[i];item.checked&&checkedItemList.push(item.value)}return this.multiple?checkedItemList:checkedItemList[0]},set:function(val){var list=this.$el.getElementsByTagName("input"),arr=[];if(!this.multiple&&Gx.base.isArray(val))throw console.log("multiple:",this.multiple),console.log("value:",val),new Error("单选框不能设置多个值！");Gx.base.isArray(val)?arr=val:arr.push(val),arr.map(function(val){for(i=0;i<list.length;i++){var item=list[i];item.value==val&&(item.checked=!0)}})}}},optionObj.methods={reset:function(){var list=this.$el.getElementsByTagName("input");for(i=0;i<list.length;i++){list[i].checked=!1}}};var Default=Vue.extend(Gx.ui.getResultObj(optionObj,setting));Gx.ui.coms.CheckBox=Default,Gx.ui.createCheckBox=function(options){var vueCom=this.createInstance(Default,options);return this.convertCheckBox(vueCom)},Gx.ui.convertCheckBox=function(vueCom){var obj=this.vmProxy({get root(){return vueCom}},setting);return obj=this.vmProxy(obj,[{field:"reset"},{field:"value"}])}}(window)},function(module,exports,__webpack_require__){"use strict";!function(){var optionObj={},setting=[{field:"fixed",value:"top"},{field:"left",value:[]},{field:"center",value:[]},{field:"right",value:[]}];optionObj.render=function(h){if(this.display){var conversion=function(arr,float){if(!Gx.base.isArray(arr))throw new Error("内容不是数组！");return 0==arr.length?null:h("ul",{class:["nav","navbar-nav",float]},[function toLi(menus,isSub){var arrMenu=[];return menus.map(function(item){item.href?arrMenu.push(h("li",[h("a",{attrs:{href:item.href}},[item.text])])):item.hrefs?arrMenu.push(h("li",{class:isSub?"dropdown-submenu":"dropdown"},[h("a",{attrs:{href:"#","data-toggle":"dropdown"},class:"dropdown-toggle"},[item.text,isSub?"":h("span",{class:"caret"})]),h("ul",{class:"dropdown-menu"},[toLi(item.hrefs,!0)])])):item.text?arrMenu.push(h("li",{class:"dropdown-header"},[item.text])):"-"!=item||arrMenu.push(h("li",{class:"divider"}))}),arrMenu}(arr)])};return h("div",{class:["navbar","navbar-default","navbar-collapse","navbar-fixed-"+this.fixed]},[conversion(this.left,"navbar-left"),conversion(this.center,"navbar-center"),conversion(this.right,"navbar-right")])}};var Default=Vue.extend(Gx.ui.getResultObj(optionObj,setting));Gx.ui.coms.Default=Default,Gx.ui.createNavbar=function(options){var obj=this.createInstance(Default,options,setting);return this.convertNavbar(obj)},Gx.ui.convertNavbar=function(vueCom){return this.vmProxy({get root(){return vueCom}},setting)}}(window)},function(module,exports,__webpack_require__){"use strict";var obj,_babelHelperVueJsxMergeProps=__webpack_require__(0),_babelHelperVueJsxMergeProps2=(obj=_babelHelperVueJsxMergeProps)&&obj.__esModule?obj:{default:obj};!function(){var optionObj={},setting=[{field:"data",value:[]}];optionObj.render=function(h){return h("div",{style:{display:this.display?"":"none"}},[this.data.map(function(item){Gx.ui.checkSysKeepKey(item.id)&&(item.id=item.id+""+Gx.base.getGuid(8,16)),item.id=item.id||Gx.base.getGuid(8,16);var props={options:Gx.base.createObject(item)};return h("gx-button",(0,_babelHelperVueJsxMergeProps2.default)([{props:props},{ref:item.id}]))})])},optionObj.computed={root:function(){return Gx.ui.convertToolbar(this)}};var Default=Vue.extend(Gx.ui.getResultObj(optionObj,setting));Gx.ui.coms.Toolbar=Default,Gx.ui.createToolbar=function(options){var vueCom=this.createInstance(Default,options);return this.convertToolbar(vueCom)},Gx.ui.convertToolbar=function(vueCom){var obj=this.vmProxy({get root(){return vueCom}},setting);return Gx.base.addGetSetFun(obj,"buttons",function(){var buttons={};return obj.root.$children.map(function(item){var button=item.root;buttons[button.id]=button}),buttons},null),obj}}(window)},function(module,exports,__webpack_require__){"use strict";var obj,_babelHelperVueJsxMergeProps=__webpack_require__(0),_babelHelperVueJsxMergeProps2=(obj=_babelHelperVueJsxMergeProps)&&obj.__esModule?obj:{default:obj};!function(){var optionObj={},setting=[{field:"_tableSetting",value:{}},{field:"uniqueId",value:void 0},{field:"height",value:void 0},{field:"undefinedText",value:"-"},{field:"striped",value:!0},{field:"columns",value:[]},{field:"data",value:[]},{field:"pagination",value:!0},{field:"paginationLoop",value:!1},{field:"onlyInfoPagination",value:!1},{field:"sidePagination",value:"client"},{field:"pageNumber",value:1},{field:"pageSize",value:10},{field:"pageList",value:[10,50,100],setCheckFun:function(val){if(!Gx.base.isArray(val))throw new Error("pageList必须为数组！");return!0}},{field:"smartDisplay",value:!1},{field:"search",value:!1},{field:"showPaginationSwitch",value:!1},{field:"minimumCountColumns",value:2},{field:"clickToSelect",value:!0},{field:"singleSelect",value:!1},{field:"toolbar",value:[]},{field:"onClickRow",value:function(row,$el){}},{field:"onDblClickRow",value:function(row,$el){}},{field:"height",value:void 0},{field:"onPageChange",value:function(number,size){}}],checkUniqueId=function(){if(!this.uniqueId)throw new Error("请先设置uniqueId属性");return!0},mergeRows=function(){var that=this,data=this.getData(!0),columns=[];this._tableSetting.columns.map(function(item){item.mergeRows&&columns.push(item)});0<columns.length&&0<data.length&&!function merge(sIndex,eIndex,colIndex){for(var field=columns[colIndex].field,val=data[sIndex][field],count=1,i=sIndex;i<=eIndex;i++)i<eIndex&&data[i+1][field]==val?count++:(that.mergeCells(i-count+1,field,1,count),colIndex<columns.length-1&&merge(i-count+1,i,colIndex+1),i!=eIndex&&(val=data[i+1][field],count=1))}(0,data.length-1,0)};optionObj.watch={data:{handler:function(newVal,oldVal){this.baseCall("load",newVal)},immediate:!0}},optionObj.render=function(h){var that=this,toolbarId="toolbar_"+Gx.base.getGuid(8,16),tableSetting=Gx.base.createObject(this._data);tableSetting.columns=[],this.columns.map(function(item){var newColSetting=Gx.base.mergeParam({checkbox:!1,field:"",title:"",titleTooltip:"",halign:"center",align:"center",width:200,visible:!0,mergeRows:!1,formatter:function(value,row,index){return value}},item);item.checkbox||(newColSetting.formatter=function(value,row,index){return value=value||that.undefinedText,item.formatter?item.formatter(value,row,index):value}),tableSetting.columns.push(newColSetting)}),tableSetting.toolbar="#"+toolbarId,tableSetting.onPageChange=this.baseOnPageChange,this._tableSetting=tableSetting;var props={options:{data:this.toolbar}};return h("div",{style:{display:this.display?"":"none"}},[h("gx-toolbar",(0,_babelHelperVueJsxMergeProps2.default)([{attrs:{id:toolbarId},ref:"toolbar"},{props:props}])),h("table",{ref:"table"})])},optionObj.updated=function(){this.refreshOptions(),mergeRows.call(this)},optionObj.mounted=function(){$(this.$refs.table).bootstrapTable(this._tableSetting),mergeRows.call(this)},optionObj.methods={loadData:function(data){Gx.base.isArray(data)?this.data=data:console.warn("绑定数据不是数组！")},baseCall:function(method,parameter){if(this.$refs.table)return $(this.$refs.table).bootstrapTable(method,parameter)},refreshOptions:function(){var setting=Gx.base.createObject(this._tableSetting);return["data"].map(function(item){delete setting[item]}),this.baseCall("refreshOptions",setting)},getOptions:function(){return this.baseCall("getOptions")},getSelections:function(){return this.baseCall("getSelections")},getData:function(useCurrentPage){return this.baseCall("getData",useCurrentPage)},remove:function(field,values){this.baseCall("remove",{field:field,values:values})},removeByUniqueId:function(id){checkUniqueId.call(this)&&this.baseCall("removeByUniqueId",id)},getRowByUniqueId:function(id){if(checkUniqueId.call(this))return this.baseCall("getRowByUniqueId",id)},selectPage:function(page){this.baseCall("selectPage",page)},prevPage:function(){this.baseCall("prevPage")},nextPage:function(){this.baseCall("nextPage")},hideColumn:function(field){this.columns.map(function(item){item.field==field&&(item.visible=!1)})},showColumn:function(field){this.columns.map(function(item){item.field==field&&(item.visible=!0)})},baseOnPageChange:function(number,size){this.pageSize=size,this.onPageChange(number,size),mergeRows.call(this)},mergeCells:function(index,field,colspan,rowspan){this.baseCall("mergeCells",{index:index,field:field,colspan:colspan,rowspan:rowspan})}};var Default=Vue.extend(Gx.ui.getResultObj(optionObj,setting));Gx.ui.coms.Table=Default,Gx.ui.createTable=function(options){var vueCom=this.createInstance(Default,options);return this.convertTable(vueCom)},Gx.ui.convertTable=function(vueCom){var obj=this.vmProxy({get root(){return vueCom}},setting);return obj=this.vmProxy(obj,[{field:"loadData"},{field:"baseCall"},{field:"refreshOptions"},{field:"getOptions"},{field:"getSelections"},{field:"getData"},{field:"remove"},{field:"removeByUniqueId"},{field:"getRowByUniqueId"},{field:"selectPage"},{field:"prevPage"},{field:"nextPage"},{field:"hideColumn"},{field:"showColumn"},{field:"mergeCells"}]),Gx.base.addGetSetFun(obj,"toolbar",function(){return obj.root.$refs.toolbar.root},null),obj}}(window)},function(module,exports,__webpack_require__){"use strict";!function(){var optionObj={},setting=[];optionObj.render=function(h){if(this.display){var props={options:{value:"按钮"}};return h("div",{class:"btn-group btn-group-justified",attrs:{role:"group","aria-label":"..."}},[h("div",{class:"btn-group",attrs:{role:"group"}},[h("gx-button",{props:props})]),h("div",{class:"btn-group",attrs:{role:"group"}},[h("gx-button",{props:props})]),h("div",{class:"btn-group",attrs:{role:"group"}},[h("gx-button",{props:props})])])}};var Default=Vue.extend(Gx.ui.getResultObj(optionObj,setting));Gx.ui.coms.Default=Default,Gx.ui.createButtonGroups=function(options){var obj=this.createInstance(Default,options,setting);return this.convertButtonGroups(obj)},Gx.ui.convertButtonGroups=function(vueCom){return this.vmProxy({get root(){return vueCom}},setting)}}(window)},function(module,exports,__webpack_require__){"use strict";!function(){var optionObj={},setting=[{field:"id",value:"panel_"+Gx.base.getGuid(8,16)},{field:"active",value:!1}];optionObj.render=function(h){return h("div",{attrs:{id:this.id},class:["tab-pane","fade",this.active?"active":"",this.active?"in":""]},[this.$slots.default])};var Default=Vue.extend(Gx.ui.getResultObj(optionObj,setting));Gx.ui.coms.Panel=Default,Gx.ui.createPanel=function(options){var vueCom=this.createInstance(Default,options);return this.convertPanel(vueCom)},Gx.ui.convertPanel=function(vueCom){return this.vmProxy({get root(){return vueCom}},setting)}}(window)},function(module,exports,__webpack_require__){"use strict";!function(){var optionObj={},setting=[{field:"data",value:[]},{field:"selectIndex",value:0}];optionObj.render=function(h){var that=this;if(this.display)return this._baseRender(),h("div",{ref:"tabs"},[h("ul",{class:"nav nav-tabs"},[this.data.map(function(item,index){return h("li",{class:[index==that.selectIndex?"active":null,item.disabled?"disabled":null],style:{display:!1===item.display?"none":null}},[h("a",{class:[item.disabled?"disabled":null],attrs:{href:item.disabled?null:"#"+item.id,"data-toggle":item.disabled?null:"tab"},on:{click:function(){that._baseClick(item,index)}}},[item.title])])})]),h("div",{ref:"content",class:"tab-content"})])},optionObj.updated=function(){this._baseRender()},optionObj.mounted=function(){this._baseRender()},optionObj.methods={_baseClick:function(item,index){var isChange=this.selectIndex!=index;item.disabled||(this.selectIndex=index,isChange&&item.click&&item.click())},_baseRender:function(){if(this.display&&this.$refs.content)for(var i=0;i<this.data.length;i++)this.data[i]=Gx.base.mergeParam({id:"",title:"",click:function(){},disabled:!1,display:!0},this.data[i]),i==this.selectIndex?this.data[i].el.classList.add("active","in"):this.data[i].el.classList.remove("active","in"),this.$refs.content&&this.$refs.content.append(this.data[i].el)}};var Default=Vue.extend(Gx.ui.getResultObj(optionObj,setting));Gx.ui.coms.Tabs=Default,Gx.ui.createTabs=function(options){options.data.map(function(item){item.el=document.getElementById(item.id),item.el.classList.add("tab-pane","fade"),item.el.remove()});var vueCom=this.createInstance(Default,options);return this.convertTabs(vueCom)},Gx.ui.convertTabs=function(vueCom){return this.vmProxy({get root(){return vueCom}},setting)}}(window)},function(module,exports,__webpack_require__){"use strict";!function(){var optionObj={},setting=[];optionObj.render=function(h){if(this.display){return h("div",["这里是pane",h("gx-button",{props:{options:{value:"按钮"}}})])}};var Default=Vue.extend(Gx.ui.getResultObj(optionObj,setting));Gx.ui.coms.Default=Default,Gx.ui.createDefault=function(options){var obj=this.createInstance(Default,options,setting);return this.convertDefault(obj)},Gx.ui.convertDefault=function(vueCom){return this.vmProxy({get root(){return vueCom}},setting)}}(window)},function(module,exports,__webpack_require__){},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(1),__webpack_require__(2),__webpack_require__(3),__webpack_require__(4),__webpack_require__(5),__webpack_require__(6),__webpack_require__(7),__webpack_require__(8);Gx.url._init(),Gx.param._init();__webpack_require__(9),__webpack_require__(10),__webpack_require__(11),__webpack_require__(12),__webpack_require__(13),__webpack_require__(14),__webpack_require__(15),__webpack_require__(16),__webpack_require__(17),__webpack_require__(18),__webpack_require__(19),__webpack_require__(20),__webpack_require__(21),__webpack_require__(22),__webpack_require__(23)}]);