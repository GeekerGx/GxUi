import React from "react";
import ReactDOM from "react-dom";
import GxUi from '@src';

if (!document.getElementById("root")) {
    const div = document.createElement("div");
    div.id = 'root';
    document.body.appendChild(div);
}
const App = () => {
    return 123;
}
let root = document.getElementById("root");
ReactDOM.hydrate(
    <App />,
    root
);



console.log(GxUi);

export default GxUi;