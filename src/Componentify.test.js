import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Componentify from "./Componentify";

const LINK_REGEX = /(https?:\/\/[\w.]+)(?:\[(.+)\])?/;
const BOLD_REGEX = /\*(.+)\*/;
const ITALIC_REGEX = /_(.+)_/;
const SWAP_REGEX = /John/;
const BR_REGEX = /<br\/>/;

describe("<Componentify />", () => {
  describe("without nesting", () => {
    it("renders plain text", () => {
      const div = document.createElement("div");

      ReactDOM.render(<Componentify text={"plain text"} />, div);
      expect(div.innerHTML).toContain("plain text");
      ReactDOM.unmountComponentAtNode(div);
    });

    it("renders text with bold words", () => {
      const div = document.createElement("div");

      ReactDOM.render(
        <Componentify
          text={"this is bold *text*"}
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
        />,
        div
      );

      ReactDOM.unmountComponentAtNode(div);
    });

    it("renders text with bold words", () => {
      const tree = renderer
        .create(
          <Componentify
            text={"this is bold *text*"}
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
            text={"this is italic _text_"}
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
            text={"this is <br /> link"}
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

    it("renders text with swap words", () => {
      const tree = renderer
        .create(
          <Componentify
            text={"this is my name John"}
            matchers={{
              swap: {
                regex: SWAP_REGEX,
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
            text={"this is my name *bold and _italic_* text"}
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
  });
});
