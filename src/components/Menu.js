import React, { PureComponent } from "react";
import { Menu } from "antd";

const { SubMenu } = Menu;

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
            style,
            menus
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