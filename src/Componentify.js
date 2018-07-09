import React, { Component } from "react";

class Componentify extends Component {
  getPlainTextComponent(text) {
    return <span>{text}</span>;
  }

  getCurrentMatcher(matchersKeys, text) {
    const { matchers } = this.props;

    return matchersKeys.reduce((currentMatcher, key) => {
      const matcher = Object.assign({}, matchers[key]);
      const regex = matcher.regex;

      if (!regex) {
        throw new Error("Invalid regex");
      }

      const currentMatch = regex.exec(text);

      if (currentMatch !== null) {
        matcher.match = currentMatch;
        const lowestIndex = currentMatcher && currentMatcher.match.index;
        const currentIndex = matcher.match.index;

        if (currentMatcher === null || currentIndex < lowestIndex) {
          currentMatcher = matcher;
        }
      }

      return currentMatcher;
    }, null);
  }

  generateComponent(matcher) {
    const { component, match } = matcher;
    let { props } = matcher;
    let { innerText } = matcher;
    let children = null;

    if (typeof props === "function") {
      props = props(match);
    }

    if (typeof innerText === "function") {
      innerText = innerText(match);
    }

    if (typeof innerText !== "undefined") {
      children = this.generateComponentList(innerText, match[0]);
    }

    return React.createElement(component, props, children);
  }

  generateComponentList(text, prevMatch) {
    const { matchers } = this.props;
    let matchersKeys = Object.keys(matchers);
    let str = text;
    let components = [];

    while (str !== "") {
      const currentMatcher = this.getCurrentMatcher(matchersKeys, str);

      if (!currentMatcher || prevMatch === currentMatcher.match[0]) {
        break;
      }

      const matchIndex = currentMatcher.match.index;
      const textBeforeMatch = str.slice(0, matchIndex);
      const textAfterMatch = str.slice(
        matchIndex + currentMatcher.match[0].length
      );
      str = textAfterMatch;

      if (textBeforeMatch !== "") {
        components.push(this.getPlainTextComponent(textBeforeMatch));
      }

      components.push(this.generateComponent(currentMatcher));
    }

    if (str !== "") {
      if (prevMatch !== "") {
        components.push(str);
      } else {
        components.push(this.getPlainTextComponent(str));
      }
    }

    return components;
  }

  render() {
    const { text, matchers } = this.props;

    if (!text) {
      throw new Error('Missing property "text"');
    }

    if (!matchers) {
      return this.getPlainTextComponent(text);
    }

    return this.generateComponentList(text, "");
  }
}

export default Componentify;
