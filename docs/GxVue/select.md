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
    change: function () {
        var that = this;
        alert(that.value);
    }
});
```

## 属性&事件&方法
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

### data 下拉数据
>类型：
`Array`

>默认：
`[{ ID: "-1", NAME: "请选择" }]`

>说明：
数组对象，下拉框正常下拉值。
```js
//除了在创建实例时赋值，还可以在创建后直接给对象赋值。
select.data=[{ ID: "1", NAME: "CoderGx" }];
```

### valueField value字段
>类型：
`String/Function`

>默认：
`ID`

>说明：
为String类型时，下拉框的value直接取data对应的属性。
为Function类型时，下拉框的value可以通过方法生成。对fixedItems和data合并后的数组进行遍历。
```js
//除了在创建实例时赋值，还可以在创建后直接给对象赋值。
//直接获取data属性
select.valueField="ID";
//通过方法生成
select.valueField=function (data) {
    return data.NAME + "-" + data.NAME;
};
```

### textField text字段
>类型：
`String/Function`

>默认：
`ID`

>说明：
为String类型时，下拉框的text直接取data对应的属性。
为Function类型时，下拉框的text可以通过方法生成。对fixedItems和data合并后的数组进行遍历。
```js
//除了在创建实例时赋值，还可以在创建后直接给对象赋值。
//直接获取data属性
select.textField="ID";
//通过方法生成
select.textField=function (data) {
    return data.NAME + "-" + data.NAME;
};
```

### change 下拉框值改变事件
>类型：
`Function`

>默认：
`function(){}`

>说明：
下拉框值改变时触发，通常用来联动或者提示。
```js
//除了在创建实例时赋值，还可以在创建后直接给对象赋值。
select.change=function(){
    //这里的this指向的是select实例
    var that=this;
    alert(that.value);
};
```

### text 下拉框text
>类型：
`String`

>默认：
`无默认`

>说明：
实时获取下拉框的text。目前只有get属性。
```js
var selectedText=select.text;
```

### value 下拉框value
>类型：
`String`

>默认：
`无默认`

>说明：
实时获取下拉框的value。并且可以直接设置下拉框选中某个选项。
```js
//get
var selectedValue=select.value;
//set
//对应valueField的值
select.value="-1";
```

### appendChildTo(el) 挂载到元素结尾
>传入：
`String el`元素id

>返回：
无返回

>说明：
将此实例挂载到对应元素结尾。

```html
<div id="selectList"></div>
<script>
    selectOne.appendChildTo("selectList");
    selectTwo.appendChildTo("selectList");
</script>
```

### getSelectedData() 获取选中的data对象
>传入：
无传入

>返回：
`Object`选中的data对象

>说明：
获取选中的data对象。
```js
var selected=select.getSelectedData();
alert(selected.ID);
```