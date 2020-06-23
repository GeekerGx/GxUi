import React from "react";
import ReactDOM from "react-dom";
import Root from './Config/Root';

if (!document.getElementById("root")) {
    const div = document.createElement("div");
    div.id = 'root';
    div.style.width = "100%";
    div.style.height = "100%";
    document.body.appendChild(div);
}
let root = document.getElementById("root");

const rederMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
rederMethod(
    <Root />,
    root
);

export * from '@gxui';