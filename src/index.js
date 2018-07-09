import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Componentify from "./Componentify";
import ErrorBoundary from "./ErrorBoundary";
import registerServiceWorker from "./registerServiceWorker";

const LINK_REGEXP = /(https?:\/\/[\w.]+)(?:\[(.+)\])?/;
const BOLD_REGEXP = /\*([\w\d\s\_\.\:\/\/]+)\*/;
const ITALIC_REGEXP = /\_([\w\d\s\*\.\:\/\/]+)\_/;
const HELLO_REGEX = /hello/;
const BR_REGEX = /<br\/>/;

const MyComponent = ({ children }) => {
  return <span style={{ fontStyle: "italic" }}>{children}</span>;
};

ReactDOM.render(
  <ErrorBoundary>
    <Componentify
      text="*hey _hello_* hi this _is the *key*_ <br/> hey https://google.com[google] hih"
      matchers={{
        bold: {
          regex: BOLD_REGEXP,
          component: "span",
          props: {
            style: { fontWeight: "900" }
          },
          innerText: matches => matches[1]
        },
        link: {
          regex: LINK_REGEXP,
          component: "a",
          props: ([_, url]) => {
            return { href: url, targer: "_blank" };
          },
          innerText: matches => matches[2] || matches[1]
        },
        italic: {
          regex: ITALIC_REGEXP,
          component: MyComponent,
          props: ([_, text]) => {
            return {
              text: text
            };
          },
          innerText: matches => matches[2] || matches[1]
        },
        hello: {
          regex: HELLO_REGEX,
          component: "span",
          props: {
            style: { color: "red" }
          },
          innerText: "bye"
        },
        br: {
          regex: BR_REGEX,
          component: "br"
        }
      }}
    />
  </ErrorBoundary>,
  document.getElementById("root")
);
registerServiceWorker();
