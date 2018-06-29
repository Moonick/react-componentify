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
    const { component, match, innerText } = matcher;
    let { props } = matcher;

    if (typeof props === "function") {
      props = props(match);
    }
    console.log(match);
    return React.createElement(
      component,
      props,
      this.generateComponentList(innerText(match), match[0])
    );
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
