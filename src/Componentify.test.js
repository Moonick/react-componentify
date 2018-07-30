import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Componentify from "./Componentify";
import { ITALIC_REGEX } from "./regexes";
import {
  boldConverter,
  italicConverter,
  linkConverter,
  brTagConverter
} from "./converters";

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
            text={"Тhis is bold *text* and *more* text"}
            converters={[boldConverter]}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders text with italic words", () => {
      const tree = renderer
        .create(
          <Componentify
            text={"Тhis is italic _text_ more text"}
            converters={[italicConverter]}
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
              text={"Тhis is https://google.com[google] link"}
              converters={[linkConverter]}
            />
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it("renders text with link without name", () => {
        const tree = renderer
          .create(
            <Componentify
              text={"Тhis is https://google.com link"}
              converters={[linkConverter]}
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
            text={"Тhis is line one<br/>This is line two"}
            converters={[brTagConverter]}
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
            converters={[
              {
                regex: /John/,
                component: "span",
                innerText: "Snow"
              }
            ]}
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
            text={"Тhis is my *bold and _italic_* text"}
            converters={[boldConverter, italicConverter]}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders text with bold link", () => {
      const tree = renderer
        .create(
          <Componentify
            text={"Тhis is my bold *https://google.com* link"}
            converters={[boldConverter, linkConverter]}
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
            text={"Тhis is my italic _text_"}
            converters={[
              {
                regex: ITALIC_REGEX,
                component: MyComponent,
                props: ([_, text]) => {
                  return {
                    text: text
                  };
                },
                innerText: matches => matches[2] || matches[1]
              }
            ]}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
