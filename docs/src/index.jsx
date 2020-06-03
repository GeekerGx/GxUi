import React from "react";
import ReactDOM from "react-dom";
import GxUi, { Button } from '@gxui';


if (!document.getElementById("root")) {
    const div = document.createElement("div");
    div.id = 'root';
    document.body.appendChild(div);
}
let root = document.getElementById("root");

const rederMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
rederMethod(
    <Button>Defa3ult</Button>,
    root
);
export default GxUi;