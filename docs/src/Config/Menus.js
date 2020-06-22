import Home from '../Home';
import MarkedShow from '../MarkedShow';

export default {
    Home: [
        {
            key: "Home",
            text: "介绍",
            href: "/",
        },
        {
            key: "Components",
            text: "组件",
            group: true,
            menus: [
                {},
                {
                    key: "Button",
                    text: "Button 按钮",
                    href: "/Components/Button",
                },
                {
                    key: "Input",
                    text: "Input 输入框",
                    href: "/Components/Input",
                },
                {
                    key: "select",
                    text: "select 下拉框",
                    href: "/Components/select",
                },
            ]
        },
        {
            key: "Helper",
            text: "类库",
            group: true,
            menus: [
                {},
                {
                    key: "Base",
                    text: "Base 基础",
                    href: "/Helper/Base",
                },
            ]
        },
    ]
};