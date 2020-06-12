import React, { PureComponent } from "react";
import myMarked from "marked";
import 'github-markdown-css';
import 'prismjs';

import markdown from "@docs/GxVue/select.md";

myMarked.setOptions({
    renderer: new myMarked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

export default class Component extends PureComponent {
    componentDidMount() {
        if (this.markdownBody) {
            //添加行号
            var codeList = this.markdownBody.getElementsByTagName("code");
            for (var i = 0; i < codeList.length; i++) {
                var item = codeList[i];
                item.parentElement.classList.add("line-numbers");
            }
        }
    }
    render() {
        var markdownHtml = myMarked(markdown);

        return (
            <div
                ref={(node) => {
                    this.markdownBody = node;
                }}
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: markdownHtml }}
            ></div>
        );
    }
}