import colors from "../../base/colors";
import borders from "../../base/borders";

const { background, transparent, text } = colors;
const { borderRadius } = borders;

const listSubheader = {
  styleOverrides: {
    root: {
      color: text.main + " !important",
      backgroundColor: background.default + " !important",
      borderRadius: borderRadius.lg,

    },
  },
};

export default listSubheader;
