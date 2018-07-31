export const LINK_REGEX = new RegExp(
  "(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?(?:\\[(.+)\\])?"
);
export const BOLD_REGEX = new RegExp("\\*([\\w\\d\\s\\:\\/\\.\\[\\]]+)\\*");
export const ITALIC_REGEX = new RegExp("\\_([\\w\\d\\s\\:\\/\\.\\[\\]]+)\\_");
export const BR_REGEX = new RegExp("<br\\/>");
