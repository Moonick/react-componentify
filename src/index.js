// @flow

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Componentify from "./Componentify";
import ErrorBoundary from "./ErrorBoundary";
import registerServiceWorker from "./registerServiceWorker";
import { LINK_REGEX, BOLD_REGEX, ITALIC_REGEX, BR_REGEX } from "./regexes";

const MyComponent = ({ children }) => {
  return <span style={{ fontStyle: "italic" }}>{children}</span>;
};

ReactDOM.render(
  <ErrorBoundary>
    <Componentify
      text={"this is my *hey _name_ https://google.com[google] is* John"}
      matchers={{
        bold: {
          regex: BOLD_REGEX,
          component: "span",
          props: {
            style: { fontWeight: "900" }
          },
          innerText: matches => matches[1]
        },
        italic: {
          regex: ITALIC_REGEX,
          component: MyComponent,
          props: ([_, text]) => {
            return {
              text: text
            };
          },
          innerText: matches => matches[2] || matches[1]
        },
        link: {
          regex: LINK_REGEX,
          component: "a",
          props: ([_, url]) => {
            return { href: url, targer: "_blank" };
          },
          innerText: matches => matches[2] || matches[1]
        }
      }}
    />
  </ErrorBoundary>,
  document.getElementById("root")
);
registerServiceWorker();
