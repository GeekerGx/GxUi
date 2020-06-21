import React, { PureComponent } from "react";
import { Menu } from "antd";

const { SubMenu } = Menu;

const renderMenu = (menus) => {
    return menus.map((menu) => {
        if (menu.menus) {
            return <SubMenu key={menu.key} title={menu.text}>{renderMenu(menu.menus)}</SubMenu>;
        } else {
            return <Menu.Item {...menu} key={menu.key} href={menu.href}>{menu.text}</Menu.Item>;
        }
    });
};

/**
 * 布局
 * @param {function({ item, key, keyPath, domEvent })} onClick 点击 MenuItem 调用此函数
 * 
 */
export default class Component extends PureComponent {

    baseOnClick = ({ item, key, keyPath, domEvent }) => {
        const { onClick = () => { } } = this.props;
        onClick({
            ...item.props,
            href: item.props.href,
            key,
            keyPath,
        });
    }

    render = () => {
        const {
            style,
            menus
        } = this.props;
        return (
            <Menu
                onClick={this.baseOnClick}
                style={style}
                mode="inline"
            >
                {renderMenu(menus)}
            </Menu>
        );
    }
}