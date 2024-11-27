// MD React base styles
import colors from "assets/theme-dark/base/colors";

// MD React helper functions
import rgba from "assets/theme-dark/functions/rgba";
import pxToRem from "assets/theme-dark/functions/pxToRem";

const { background, transparent, text } = colors;

const pickersLayout = {
  styleOverrides: {
    root: {
      backgroundColor: background.card,
      borderRadius: "1rem",
      color: text.main,
    },
    actionBar: {
      padding:'22rem'
    },
  },
};

export default pickersLayout;
