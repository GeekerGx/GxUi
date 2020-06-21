import React, { PureComponent } from "react";
import { Route } from "react-router-dom";
import { Layout, Menu } from '@gxui';

export default class Component extends PureComponent {
    render() {
        const { routes, menus: { Home: menus } } = this.props;
        return (
            <Layout row>
                <Layout
                    style={{
                        width: "250px"
                    }}
                >
                    <Menu
                        menus={menus}
                        onClick={({ item, key, keyPath, domEvent }) => {
                            console.log(item, key, keyPath, domEvent);
                        }}
                    />
                </Layout>
                <Layout main>
                    {routes.map(({ path, component: Component, routes = [] }, index) => {
                        return <Route
                            key={index}
                            path={path}
                            render={(props) => {
                                return <Component {...{
                                    ...props,
                                    routes
                                }} />
                            }}
                            exact={routes.length == 0}
                        />
                    })}
                </Layout>
            </Layout>
        );
    }
}