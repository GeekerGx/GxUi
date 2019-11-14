# Base

## API

|#|名称|参数类型|返回内容|说明|
|--|--|--|--|--|
|[addGetSetFun(obj, key, getFun, setFun)](#addGetSetFun)|向对象添加GetSet属性|`Object obj`需要添加的对象<br>`String key`需要添加的属性名称<br>`Function getFun`Get方法<br>`Function setFun`Set方法<br>|无|向对象添加GetSet属性|
|[arrPush(arr, obj)](#arrPush)|合并数组|`Array arr`数组<br>`Array\|Object obj`数组或对象|`Array`合并后的数组|如果obj为对象则往arr中插入一条数据<br>如果为数组则追加到arr之后|
||

### <span id="addGetSetFun">addGetSetFun(obj, key, getFun, setFun) 添加Get Set属性</span>

>传入：
>>`Object obj`需要添加的对象  
>>`String key`需要添加的属性名称  
>>`Function getFun`Get方法  
>>`Function setFun`Set方法  
>
>返回：
>>无
>
>说明：
>>向对象添加GetSet属性
>  
```js
var obj={_name:"Gx"};//obj={_name:"Gx"}
Gx.base.addGetSetFun(obj,"name",function(){
    return this._name;
},function(val){
    this._name=val;
});//obj={name:(...),_name:"Gx"}
console.log("通过name获取到_name的值",obj.name);//"Gx"
obj.name="GxNew";
console.log("通过name给_name赋值",obj._name);//GxNew
```

### <span id="arrPush">arrPush(arr, obj) 合并数组</span>

>传入：
>>`Array arr`数组  
>>`Array|Object obj`数组或对象
>
>返回：
>>`Array`合并后的数组
>
>说明：
>>如果obj为对象则往arr中插入一条数据  
>>如果为数组则追加到arr之后
>  
```js
var obj={_name:"Gx"};//obj={_name:"Gx"}
Gx.base.addGetSetFun(obj,"name",function(){
    return this._name;
},function(val){
    this._name=val;
});//obj={name:(...),_name:"Gx"}
console.log("通过name获取到_name的值",obj.name);//"Gx"
obj.name="GxNew";
console.log("通过name给_name赋值",obj._name);//GxNew
```
