// @flow

import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Componentify from "./Componentify";
import { LINK_REGEX, BOLD_REGEX, ITALIC_REGEX, BR_REGEX } from "./regexes";

const MyComponent = ({ children }) => {
  return <span style={{ fontStyle: "italic" }}>{children}</span>;
};

describe("<Componentify />", () => {
  describe("without nesting", () => {
    it("renders plain text", () => {
      const div = document.createElement("div");

      ReactDOM.render(<Componentify text={"plain text"} />, div);
      expect(div.innerHTML).toContain("plain text");
      ReactDOM.unmountComponentAtNode(div);
    });

    it("renders text with bold words", () => {
      const tree = renderer
        .create(
          <Componentify
            text={"this is bold *text* and *more* text"}
            matchers={{
              bold: {
                regex: BOLD_REGEX,
                component: "span",
                props: {
                  style: { fontWeight: "900" }
                },
                innerText: matches => matches[1]
              }
            }}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders text with italic words", () => {
      const tree = renderer
        .create(
          <Componentify
            text={"this is italic _text_ more text"}
            matchers={{
              italic: {
                regex: ITALIC_REGEX,
                component: "span",
                props: {
                  style: { fontStyle: "italic" }
                },
                innerText: matches => matches[1]
              }
            }}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    describe("text with link", () => {
      it("renders text with link with name", () => {
        const tree = renderer
          .create(
            <Componentify
              text={"this is https://google.com[google] link"}
              matchers={{
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
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it("renders text with link without name", () => {
        const tree = renderer
          .create(
            <Componentify
              text={"this is https://google.com link"}
              matchers={{
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
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    it("renders text with <br /> tag", () => {
      const tree = renderer
        .create(
          <Componentify
            text={"this is <br/> link"}
            matchers={{
              br: {
                regex: BR_REGEX,
                component: "br"
              }
            }}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders text with replaced words", () => {
      const tree = renderer
        .create(
          <Componentify
            text={"My name is John"}
            matchers={{
              replace: {
                regex: /John/,
                component: "span",
                innerText: "Snow"
              }
            }}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("with nesting", () => {
    it("renders text with bold and italic words", () => {
      const tree = renderer
        .create(
          <Componentify
            text={"this is my *bold and _italic_* text"}
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
                component: "span",
                props: {
                  style: { fontStyle: "italic" }
                },
                innerText: matches => matches[1]
              }
            }}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders text with bold link", () => {
      const tree = renderer
        .create(
          <Componentify
            text={"this is my bold *https://google.com* link"}
            matchers={{
              bold: {
                regex: BOLD_REGEX,
                component: "span",
                props: {
                  style: { fontWeight: "900" }
                },
                innerText: matches => matches[1]
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
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("with custom component", () => {
    it("renders text with italic", () => {
      const tree = renderer
        .create(
          <Componentify
            text={"this is my italic _text_"}
            matchers={{
              italic: {
                regex: ITALIC_REGEX,
                component: MyComponent,
                props: ([_, text]) => {
                  return {
                    text: text
                  };
                },
                innerText: matches => matches[2] || matches[1]
              }
            }}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
