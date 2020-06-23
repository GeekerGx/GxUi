import React, { PureComponent } from "react";
import { Menu } from "antd";

const { SubMenu } = Menu;

const renderMenu = (menus) => {
    return menus.map((menu, index) => {
        if (menu.menus) {
            if (menu.group) {
                return <Menu.ItemGroup key={menu.key} title={menu.text}>{renderMenu(menu.menus)}</Menu.ItemGroup>;
            }
            return <SubMenu key={menu.key} title={menu.text}>{renderMenu(menu.menus)}</SubMenu>;
        } else {
            if (menu.key) {
                return <Menu.Item {...menu} key={menu.key} href={menu.href}>{menu.text}</Menu.Item>;
            }
            return <Menu.Divider key={`divider_${index}`} />
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