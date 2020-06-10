import React, { PureComponent } from "react";
import markdown from "@docs/GxVue/select.md";
import ReactMarkdown from "react-markdown";
import 'github-markdown-css';

export default class Component extends PureComponent {

    render() {
        const { routes } = this.props;
        return (
            <ReactMarkdown source={markdown} className="markdown-body" />
        );
    }
}