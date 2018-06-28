import React, { Component } from "react";

class Componentify extends Component {
  getPlainTextComponent(text) {
    return <span>{text}</span>;
  }

  getCurrentMatcher(matchersKeys, text) {
    const { matchers } = this.props;

    return matchersKeys.reduce((acc, key) => {
      const matcher = Object.assign({}, matchers[key]);
      const regex = new RegExp(matcher.regex, "g");
      const match = regex.exec(text);

      if (match !== null) {
        matcher.match = match;
        const index = acc && acc.match.index;
        const currentIndex = matcher.match.index;

        if (!acc || index > currentIndex) {
          acc = matcher;
        }
      }

      return acc;
    }, null);
  }

  generateComponent(matcher) {
    const { component, props, match } = matcher;
    console.log("matcher", matcher);

    if (typeof props === "function") {
      return React.createElement(
        component,
        props(match),
        this.generateComponentList(match[1])
      );
    }

    return React.createElement(
      component,
      props,
      this.generateComponentList(match[1])
    );
  }

  generateComponentList(text) {
    const { matchers } = this.props;
    let matchersKeys = Object.keys(matchers);
    // const index = matchersKeys.indexOf(key);

    // if (matchersKeys.indexOf(key) !== -1) {
    //   matchersKeys = matchersKeys.slice(index, 1);
    // }

    // console.log("matchersKeys", matchersKeys);
    // console.log("key", key);
    // console.log("index", index);

    let str = text;
    let components = [];
    let hasMatcher =
      matchersKeys.filter(key => matchers[key].regex.exec(str)).length !== 0;

    while (hasMatcher && str !== "") {
      const currentMatcher = this.getCurrentMatcher(matchersKeys, str);

      if (!currentMatcher) {
        console.log("bye");
        break;
      }

      const matchIndex = currentMatcher.match.index;
      const textBeforeMatch = str.slice(0, matchIndex);
      const textAfterMatch = str.slice(
        matchIndex + currentMatcher.match[0].length
      );
      str = textAfterMatch;
      console.log("hey");
      components.push(
        this.getPlainTextComponent(textBeforeMatch),
        this.generateComponent(currentMatcher)
      );
    }

    if (str !== "") {
      components.push(this.getPlainTextComponent(str));
    }

    return components;
  }

  render() {
    const { text } = this.props;
    return this.generateComponentList(text, null);
  }
}

export default Componentify;
