import React, { PureComponent } from "react";
import { Menu } from "antd";

const { SubMenu } = Menu;

const menus = [
    {
        key: "7",
        text: "Option 7",
    },
    {
        key: "sub2",
        text: "Navigation Two",
        menus: [
            {
                key: "5",
                text: "Option 5",
            },
            {
                key: "6",
                text: "Option 6",
            },
            {
                key: "sub3",
                text: "Submenu",
                menus: [
                    {
                        key: "8",
                        text: "Option 8",
                    },
                ]
            }
        ]
    }
];

const renderMenu = (menus) => {
    return menus.map((menu) => {
        if (menu.menus) {
            return <SubMenu key={menu.key} title={menu.text}>{renderMenu(menu.menus)}</SubMenu>;
        } else {
            return <Menu.Item key={menu.key}>{menu.text}</Menu.Item>;
        }
    });
};

/**
 * 布局
 * @param {ReactNode} children 子对象
 */
export default class Component extends PureComponent {

    render() {
        const {
            onClick = () => { },
            style
        } = this.props;
        return (
            <Menu
                onClick={onClick}
                style={style}
                mode="inline"
            >
                {renderMenu(menus)}
            </Menu>
        );
    }
}