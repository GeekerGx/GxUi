import React, { PureComponent } from "react";
import "./Layout.less";

/**
 * 布局
 * @param {ReactNode} children 子对象
 */
export default class Component extends PureComponent {

    render() {
        const {
            children,
            style,
            row = false,
            main = false,
        } = this.props;
        return (
            <div
                className={[
                    "gx-layout",
                    "gx-layout-" + (row ? "row" : "column"),
                    main ? "gx-layout-main" : null,
                ].join(" ")}
                style={{
                    ...style
                }}
            >
                {children}
            </div>
        );
    }
}