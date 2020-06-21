import React, { PureComponent } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Routes from './Routes';
import Menus from './Menus';

const Router = HashRouter;

export default class Component extends PureComponent {

    render() {
        return (
            <Router>
                <Switch>
                    {Routes.map(({ path, component: Component, routes = [] }, index) => {
                        return (
                            <Route
                                key={index}
                                path={path}
                                render={(props) => {
                                    return <Component {...{
                                        ...props,
                                        routes,
                                        menus:Menus
                                    }} />
                                }}
                                exact={routes.length == 0}
                            />
                        );
                    })}
                </Switch>
            </Router>
        );
    }
}
