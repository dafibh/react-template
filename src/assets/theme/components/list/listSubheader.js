import colors from "../../base/colors";
import borders from "../../base/borders";

const { secondary, transparent, white } = colors;
const { borderRadius } = borders;

const listSubheader = {
  styleOverrides: {
    root: {
      color: white.main + " !important",
      backgroundColor: secondary.focus + " !important",
      borderRadius: borderRadius.lg,

    },
  },
};

export default listSubheader;
