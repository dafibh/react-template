// MD React base styles
import borders from "assets/theme-dark/base/borders";

// MD React helper functions
import pxToRem from "assets/theme-dark/functions/pxToRem";

const { borderRadius } = borders;

const tableHead = {
  styleOverrides: {
    root: {
      // display: "block", // why? this breaks material-react-table or basically most tables
      padding: `${pxToRem(16)} ${pxToRem(16)} 0  ${pxToRem(16)}`,
    },
  },
};

export default tableHead;
