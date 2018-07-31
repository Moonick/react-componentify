import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Componentify, {
  boldConverter,
  italicConverter,
  linkConverter
} from "./Componentify";
import ErrorBoundary from "./ErrorBoundary";
import registerServiceWorker from "./registerServiceWorker";

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
