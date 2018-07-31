import Componentify from "./Componentify";
import {
  boldConverter,
  italicConverter,
  linkConverter
} from "./src/converters";
import { LINK_REGEX, BOLD_REGEX, ITALIC_REGEX, BR_REGEX } from "./src/regexes";

export default Componentify;
export { boldConverter, italicConverter, linkConverter, brTagConverter };
export { LINK_REGEX, BOLD_REGEX, ITALIC_REGEX, BR_REGEX };
