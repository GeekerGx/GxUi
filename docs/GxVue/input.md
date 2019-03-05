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
|[root](#root)|vue对象|`Object`|无法形容|获取Vue实例对象，可直接操作。|
|[width](#width)|宽度|`String`|`200px`|下拉框宽度。|
|[display](#display)|显隐状态|`Boolean`|`True`|显隐状态，如果为false则下拉框隐藏。|
||

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
