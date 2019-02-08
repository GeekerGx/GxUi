# Select 下拉框

## 使用
>html部分
```html
<div id="input"></div>
```

>js部分
```js
var input = Gx.ui.createInput("input", {
    type: "number",
    placeholder: "777",
    change: function () {
        alert(this.value);
    },
    validation: function (value) {
        if (value > 3) {
            alert("不能大于3!");
            return false;
        }
        return true;
    }
});
```

## API

### 属性
|#|名称|类型|默认值|说明|
|--|--|--|--|--|
|[fixedItems](#fixedItems)|下拉固定项|`Array`|`[]`|数组对象，下拉框始终会有该数组内的下拉值。|
|[data](#data)|下拉数据|`Array`|`[{ ID: "-1", NAME: "请选择" }]`|数组对象，下拉框正常下拉值。|
|[valueField](#valueField)|value字段|`String/Function`|`ID`|为String类型时，下拉框的value直接取data对应的属性。<br/>为Function类型时，下拉框的value可以通过方法生成。对fixedItems和data合并后的数组进行遍历。|
|[textField](#textField)|text字段|`String/Function`|`ID`|为String类型时，下拉框的text直接取data对应的属性。<br/>为Function类型时，下拉框的text可以通过方法生成。对fixedItems和data合并后的数组进行遍历。|
|[text](#text)|下拉框text|`String`|`Null`|实时获取下拉框的text。目前只有get属性。|
|[value](#value)|下拉框value|`String`|`Null`|实时获取下拉框的value。并且可以直接设置下拉框选中某个选项。|

### 事件
|#|名称|参数类型|返回内容|说明|
|--|--|--|--|--|
|[change](#change)|下拉框值改变事件|无|无|下拉框值改变时触发，通常用来联动或者提示。|

### 方法
|#|名称|参数类型|返回内容|说明|
|--|--|--|--|--|
|[appendChildTo(el)](#appendChildTo)|挂载到元素结尾|`String el`元素id|无|将此实例挂载到对应元素结尾。|
|[getSelectedData()](#getSelectedData)|获取选中的data对象|无|`Object`选中的data对象|获取选中的data对象。|

### fixedItems 下拉固定项
>类型：
`Array`

>默认：
`[]`

>说明：
数组对象，下拉框始终会有该数组内的下拉值。
```js
//除了在创建实例时赋值，还可以在创建后直接给对象赋值。
select.fixedItems=[{ ID: "-1", NAME: "请选择" }];
```
