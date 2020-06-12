import React, { PureComponent } from "react";
import { Route } from "react-router-dom";
import { Layout, Menu } from '@gxui';

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

export default class Component extends PureComponent {

    render() {
        const { routes } = this.props;
        return (
            <Layout row>
                <Layout
                    style={{
                        width: "250px"
                    }}
                >
                    <Menu
                        menus={menus}
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