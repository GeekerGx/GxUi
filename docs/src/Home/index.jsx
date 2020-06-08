import React, { PureComponent } from "react";
import { Layout, Menu } from '@gxui';

export default class Component extends PureComponent {

    render() {
        return (
            <Layout row>
                <Layout
                    style={{
                        width: "250px"
                    }}
                >
                    <Menu
                    />
                </Layout>
                <Layout main>
                    这里右侧内容
                </Layout>
            </Layout>
        );
    }
}