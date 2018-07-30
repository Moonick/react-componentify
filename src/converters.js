import { LINK_REGEX, BOLD_REGEX, ITALIC_REGEX, BR_REGEX } from "./regexes";

export const boldConverter = {
  regex: BOLD_REGEX,
  component: "span",
  props: {
    style: { fontWeight: "900" }
  },
  innerText: matches => matches[1]
};

export const italicConverter = {
  regex: ITALIC_REGEX,
  component: "span",
  props: {
    style: { fontStyle: "italic" }
  },
  innerText: matches => matches[1]
};

export const linkConverter = {
  regex: LINK_REGEX,
  component: "a",
  props: ([_, url]) => {
    return { href: url, targer: "_blank" };
  },
  innerText: matches => matches[2] || matches[1]
};

export const brTagConverter = {
  regex: BR_REGEX,
  component: "br"
};
