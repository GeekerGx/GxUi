# Select 下拉框

## 使用

html部分

```html
<div id="input"></div>
```

js部分
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
