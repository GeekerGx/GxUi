import React, { PureComponent } from "react";
import myMarked from "marked";
import 'github-markdown-css';
import prismjs from 'prismjs';
import GxUi from '@gxui';

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
    constructor(props) {
        super(props);
        this.state = {
            markdown: '',//文本
        };
    }
    componentDidMount = () => {
        this.renderMarkDown();
    }
    componentDidUpdate = (prevProps, prevState, snapshot) => {
        this.renderMarkDown(prevProps.match.url);
    }
    renderMarkDown = (prevUrl) => {
        const { url, params: { type, mdName } } = this.props.match;
        if (prevUrl == url) {
            return;
        }
        const mdUrl = type && mdName ? `${type}/${mdName}.md` : "README.md";
        GxUi.AjaxHelper.get(mdUrl).then(result => {
            this.setState({
                markdown: result
            }, () => {
                if (this.markdownBody) {
                    //添加行号
                    var codeList = this.markdownBody.getElementsByTagName("code");
                    for (var i = 0; i < codeList.length; i++) {
                        var item = codeList[i];
                        item.parentElement.classList.add("line-numbers");
                    }
                }
                prismjs.highlightAll();
            });
        });
    }
    render = () => {
        var markdownHtml = myMarked(this.state.markdown || '');
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