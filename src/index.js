import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Componentify from "./Componentify";
import registerServiceWorker from "./registerServiceWorker";

//const LINK_REGEXP = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}(\[\w+\])/;
const LINK_REGEXP = /(https?:\/\/[\w.]+)(?:\[(.+)\])?/;
const BOLD_REGEXP = /\*(.+)\*/;
const ITALIC_REGEXP = /_(.+)_/;
const HELLO_REGEX = /(hello)\[(bye)\]/;

const MyComponent = ({ children }) => {
  return <span style={{ fontStyle: "italic" }}>{children}</span>;
};

ReactDOM.render(
  <Componentify
    text="hello[bye] https://www.google.com[Google]"
    matchers={{
      bold: {
        regex: BOLD_REGEXP,
        component: "span",
        props: {
          style: { fontWeight: "900" }
        },
        innerText: matches => matches[2] || matches[1]
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
        innerText: matches => matches[2] || matches[1]
      }
    }}
  />,
  document.getElementById("root")
);
registerServiceWorker();
