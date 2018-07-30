import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Componentify from "./Componentify";
import ErrorBoundary from "./ErrorBoundary";
import registerServiceWorker from "./registerServiceWorker";
import { boldConverter, italicConverter, linkConverter } from "./converters";

ReactDOM.render(
  <ErrorBoundary>
    <Componentify
      text={"This is my *_link_ https://google.com[google]* and it's awesome"}
      converters={[boldConverter, italicConverter, linkConverter]}
    />
  </ErrorBoundary>,
  document.getElementById("root")
);
registerServiceWorker();
