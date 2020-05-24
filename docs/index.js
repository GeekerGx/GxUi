import React from "react";
import ReactDOM from "react-dom";
import GxUi from '@src';

if (!document.getElementById("root")) {
    const div = document.createElement("div");
    div.id = 'root';
    document.body.appendChild(div);
}
let root = document.getElementById("root");
ReactDOM.hydrate(
    <div>123</div>,
    root
);



console.log(GxUi);

export default GxUi;