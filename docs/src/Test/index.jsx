import React, { PureComponent } from "react";
import { Route } from "react-router-dom";

export default class Component extends PureComponent {

    render() {
        const { routes } = this.props;
        return (
            <div>
                <div>this is test</div>
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
            </div>
        );
    }
}