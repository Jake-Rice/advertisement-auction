//allows webpack async handling
import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import "./styles.css"

import AdContainer from "./Components/AdContainer";
ReactDOM.render(<AdContainer />, document.getElementById("ethereum-ad"));
// hot reloading. It works by replacing a module of the application 
// during runtime with an updated one so that it’s available for instant use.
module.hot.accept();