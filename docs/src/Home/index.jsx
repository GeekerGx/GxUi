import React, { PureComponent } from "react";
import { Layout } from '@gxui';

export default class Component extends PureComponent {

    render() {
        return (
            <Layout row>
                <Layout style={{
                    width: "150px"
                }} >
                    这里是左侧菜单
                </Layout>
                <Layout>
                    这里右侧内容
                </Layout>
            </Layout>
        );
    }
}