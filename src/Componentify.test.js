import React from "react";
import ReactDOM from "react-dom";
import Componentify from "./Componentify";

it("renders the Componentify", () => {
  const div = document.createElement("div");

  ReactDOM.render(<Componentify text={"Render me"} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
