import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Componentify from "./Componentify";
import registerServiceWorker from "./registerServiceWorker";

const MyComponent = ({ text }) => {
  return <span style={{ fontStyle: "italic" }}>{text}</span>;
};

ReactDOM.render(
  <Componentify
    text="*haha bold1 _italic_* is *this _love_*"
    matchers={{
      bold: {
        regex: /\*([\w\d\s]+)\*/,
        component: "span",
        props: {
          style: { fontWeight: "900" }
        }
      },
      link: {
        regex: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/,
        component: "a",
        props: ([_, url]) => {
          return { href: url, targer: "_blank" };
        }
      },
      italic: {
        regex: /\_([\w\d]+)\_/,
        component: MyComponent,
        props: ([_, text]) => {
          return {
            text: text
          };
        }
      }
    }}
  />,
  document.getElementById("root")
);
registerServiceWorker();
