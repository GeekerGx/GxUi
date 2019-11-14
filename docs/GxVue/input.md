# input 输入框

## 使用

>html部分  

```html
<div id="input"></div>
```

>js部分  

```js
var input = Gx.ui.createInput("input", {
    type: "number",
    prompt: "777",
    onChange: function () {
        alert(this.value);
    },
    onValidation: function (val) {
        if (val > 3) {
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
|[root](#root)|vue对象|`Object`|无法形容|获取Vue实例对象，可直接操作。|
|[width](#width)|宽度|`String`|`200px`|下拉框宽度。|
|[display](#display)|显隐状态|`Boolean`|`True`|显隐状态，如果为false则下拉框隐藏。|
||
|[isMicrometer](#isMicrometer)|是否千分符|`Boolean`|`false`|显示货币千分符。|
|[prompt](#prompt)|预期值提示信息|`String`|`''`|可描述输入字段预期值的提示信息。|
|[text](#text)|输入框显示值|`String`|获取value属性值|可描述输入字段预期值的提示信息。此字段无法赋值！！！|
|[type](#type)|输入框类型|`String`|`text`|输入框类型目前支持`[textarea,number,text,password]`|

### 方法

|#|名称|参数类型|返回内容|说明|
|--|--|--|--|--|
|[appendChildTo(el)](#appendChildTo)|挂载到元素结尾|`String el`元素id|无|将此实例挂载到对应元素结尾。|
|[hide()](#hide)|隐藏控件|无|无|隐藏控件，实为将display属性设置为false。|
|[show()](#show)|显示控件|无|无|显示控件，实为将display属性设置为true。|
||

### 事件

|#|名称|参数类型|返回内容|说明|
|--|--|--|--|--|
||
|[onBlur](#onBlur)|失焦事件|无|无|输入框失去焦点后触发的事件。|
|[onChange](#onChange)|改变事件|无|无|输入框内容发生改变后触发的事件。|
|[onFocus](#onFocus)|获焦事件|无|无|输入框获得焦点后触发的事件。|
|[onValidation(val)](#onValidation)|验证事件|`String val`|`Boolean`类型|失焦后继续验证如果验证通过则正常，否则提示问题。|

### <span id="isMicrometer">isMicrometer 是否千分符</span>

>类型：`Boolean`  
>默认：`false`  
>说明：显示货币千分符。  

```js
//除了在创建实例时赋值，还可以在创建后直接给对象赋值。
input.isMicrometer=true;
```

### <span id="onBlur">onBlur 失焦事件</span>

>参数类型：无  
>默认：`function(){}`  
>说明：输入框失去焦点后触发的事件。  

```js
//除了在创建实例时赋值，还可以在创建后直接给对象赋值。
input.onBlur=function(){
    //这里的this指向的是select实例
    var that=this;
    alert(that.value);
};
```

### <span id="onChange">onChange 改变事件</span>

>参数类型：无  
>默认：`function(){}`  
>说明：输入框内容发生改变后触发的事件。  

```js
//除了在创建实例时赋值，还可以在创建后直接给对象赋值。
input.onChange=function(){
    //这里的this指向的是select实例
    var that=this;
    alert(that.value);
};
```

### <span id="onFocus">onFocus 获焦事件</span>

>参数类型：无  
>默认：`function(){}`  
>说明：输入框获得焦点后触发的事件。  

```js
//除了在创建实例时赋值，还可以在创建后直接给对象赋值。
input.onFocus=function(){
    //这里的this指向的是select实例
    var that=this;
    alert(that.value);
};
```

### <span id="prompt">prompt 预期值提示信息</span>

>参数类型：`String`  
>默认：`''`  
>说明：可描述输入字段预期值的提示信息。  

```js
//除了在创建实例时赋值，还可以在创建后直接给对象赋值。
input.prompt='请输入数字';
```

### <span id="text">text 输入框显示值</span>

>参数类型：`String`  
>默认：获取value属性值  
>说明：可描述输入字段预期值的提示信息。此字段无法赋值！！！  

```js
//为方便数字型千分符的拓展。
//请勿对该属性赋值，会报错！
```

### <span id="type">type 输入框类型</span>

>参数类型：`String`  
>默认：`text`  
>说明：输入框类型目前支持`[textarea,number,text,password]`  

```js
//虽然可以在创建实例后进行修改但是不推荐。
//因为修改后value值还是原来的值
input.type='textarea';
```

### <span id="onValidation">onValidation(val) 验证事件</span>

>参数类型：`String val`  
>默认：`function (val) { return true; }`  
>说明：失焦后继续验证如果验证通过则正常，否则提示问题。  

```js
//除了在创建实例时赋值，还可以在创建后直接给对象赋值。
input.onValidation=function (val) {
    if (val > 3) {
        alert("不能大于3!");
        return false;
    }
    return true;
}
```
