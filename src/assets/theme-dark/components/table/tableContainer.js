// MD React base styles
import colors from "assets/theme-dark/base/colors";
import boxShadows from "assets/theme-dark/base/boxShadows";
import borders from "assets/theme-dark/base/borders";

const { background, transparent } = colors;
const { md } = boxShadows;
const { borderRadius } = borders;

// material-react-table header row
const tableContainer = {
  styleOverrides: {
    root: {
      backgroundColor: transparent,
      // boxShadow: md,
      // borderRadius: borderRadius.xl,
    },
  },
};

export default tableContainer;
