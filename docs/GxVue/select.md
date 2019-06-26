# Select 下拉框
## 使用
>html部分  

```html
<div id="select"></div>
```
>js部分  
```js
var select = Gx.ui.createSelect("select", {
    fixedItems: [{ ID: "-1", NAME: "请选择" }],
    data: [{ ID: "0", NAME: "CoderGx" }],
    valueField: "ID",
    textField: function (data) {
        return data.ID + "-" + data.NAME;
    },
    onChange: function () {
        var that = this;
        alert(that.value);
    }
});
```
## API
### 属性
|#|名称|类型|默认值|说明|
|--|--|--|--|--|
|[root](#root)|vue对象|`Object`|无法形容|获取Vue实例对象，可直接操作。|
|[width](#width)|宽度|`String`|`200px`|下拉框宽度。|
|[display](#display)|显隐状态|`Boolean`|`True`|显隐状态，如果为false则下拉框隐藏。|
||
|[valueField](#valueField)|value字段|`String/Function`|`ID`|为String类型时，下拉框的value直接取data对应的属性。<br/>为Function类型时，下拉框的value可以通过方法生成。对fixedItems和data合并后的数组进行遍历。|
|[textField](#textField)|text字段|`String/Function`|`ID`|为String类型时，下拉框的text直接取data对应的属性。<br/>为Function类型时，下拉框的text可以通过方法生成。对fixedItems和data合并后的数组进行遍历。|
|[data](#data)|下拉数据|`Array`|`[{ ID: "-1", NAME: "请选择" }]`|数组对象，下拉框正常下拉值。|
|[text](#text)|下拉框text|`String`|`Null`|实时获取下拉框的text。目前只有get属性。|
|[value](#value)|下拉框value|`String`|`Null`|实时获取下拉框的value。并且可以直接设置下拉框选中某个选项。|
|[fixedItems](#fixedItems)|下拉固定项|`Array`|`[]`|数组对象，下拉框始终会有该数组内的下拉值。|
|[checked](#checked)|验证状态|`Boolean`|`True`|验证状态，如果为false则下拉框为红色。|
|[disabled](#disabled)|禁用状态|`Boolean`|`False`|禁用状态，如果为true则下拉框变为禁用状态。|

### 方法
|#|名称|参数类型|返回内容|说明|
|--|--|--|--|--|
|[appendChildTo(el)](#appendChildTo)|挂载到元素结尾|`String el`元素id|无|将此实例挂载到对应元素结尾。|
|[hide()](#hide)|隐藏控件|无|无|隐藏控件，实为将display属性设置为false。|
|[show()](#show)|显示控件|无|无|显示控件，实为将display属性设置为true。|
||
|[getSelectedData()](#getSelectedData)|获取选中的data对象|无|`Object`选中的data对象|获取选中的data对象。|

### 事件
|#|名称|参数类型|返回内容|说明|
|--|--|--|--|--|
||
|[onChange](#onChange)|下拉框值改变事件|无|无|下拉框值改变时触发，通常用来联动或者提示。|

### <span id="valueField">valueField value字段</span>
>类型：`String/Function`  
>默认：`ID`  
>说明：为String类型时，下拉框的value直接取data对应的属性。<br/>为Function类型时，下拉框的value可以通过方法生成。对fixedItems和data合并后的数组进行遍历。  
```js
//除了在创建实例时赋值，还可以在创建后直接给对象赋值。
//直接获取data属性
select.valueField="ID";
//通过方法生成
select.valueField=function (data) {
    return data.NAME + "-" + data.NAME;
};
```
### <span id="textField">textField text字段</span>
>类型：`String/Function`  
>默认：`ID`  
>说明：为String类型时，下拉框的text直接取data对应的属性。<br/>为Function类型时，下拉框的text可以通过方法生成。对fixedItems和data合并后的数组进行遍历。  
```js
//除了在创建实例时赋值，还可以在创建后直接给对象赋值。
//直接获取data属性
select.textField="ID";
//通过方法生成
select.textField=function (data) {
    return data.NAME + "-" + data.NAME;
};
```
### <span id="data">data 下拉数据</span>
>类型：`Array`  
>默认：`[{ ID: "-1", NAME: "请选择" }]`  
>说明：数组对象，下拉框正常下拉值。  
```js
//除了在创建实例时赋值，还可以在创建后直接给对象赋值。
select.data=[{ ID: "1", NAME: "CoderGx" }];
```
### <span id="text">text 下拉框text</span>
>类型：`String`  
>默认：`Null`  
>说明：实时获取下拉框的text。目前只有get属性。  
```js
var selectedText=select.text;
```
### <span id="value">value 下拉框value</span>
>类型：`String`  
>默认：`Null`  
>说明：实时获取下拉框的value。并且可以直接设置下拉框选中某个选项。  
```js
//get
var selectedValue=select.value;
//set
//对应valueField的值
select.value="-1";
```
### <span id="fixedItems">fixedItems 下拉固定项</span>
>类型：`Array`  
>默认：`[]`  
>说明：数组对象，下拉框始终会有该数组内的下拉值。  
```js
//除了在创建实例时赋值，还可以在创建后直接给对象赋值。
select.fixedItems=[{ ID: "-1", NAME: "请选择" }];
```
### <span id="checked">checked 验证状态</span>
>类型：`Boolean`  
>默认：`True`  
>说明：验证状态，如果为false则下拉框为红色。  
```js
//可直接给对象赋值。
select.checked=false;
```
### <span id="disabled">disabled 禁用状态</span>
>类型：`Boolean`  
>默认：`False`  
>说明：禁用状态，如果为true则下拉框变为禁用状态。  
```js
//可直接给对象赋值。
select.disabled=true;
```
### <span id="getSelectedData">getSelectedData() 获取选中的data对象</span>
>传入：无传入  
>返回：`Object`选中的data对象  
>说明：获取选中的data对象。  
```js
var selected=select.getSelectedData();
alert(selected.ID);
```
### <span id="onChange">onChange 下拉框值改变事件</span>
>参数类型：无  
>默认：`function(){}`  
>说明：下拉框值改变时触发，通常用来联动或者提示。  
```js
//除了在创建实例时赋值，还可以在创建后直接给对象赋值。
select.onChange=function(){
    //这里的this指向的是select实例
    var that=this;
    alert(that.value);
};
```