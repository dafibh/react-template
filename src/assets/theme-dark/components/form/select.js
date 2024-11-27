// MD React base styles
import colors from "assets/theme-dark/base/colors";

// MD React helper functions
import pxToRem from "assets/theme-dark/functions/pxToRem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const { transparent, text, background } = colors;

const select = {
  defaultProps: {
    // IconComponent: (props) => <ExpandMoreIcon fontSize="medium" />, // Set the default icon component with inherit size
    IconComponent: ExpandMoreIcon, // Set the default icon component with inherit size
  },
  styleOverrides: {
    select: {
      alignItems: "center",
      padding: `10 ${pxToRem(12)} !important`,

      "& .Mui-selected": {
        backgroundColor: transparent.main,
      },
      ".MuiChip-root": {
        backgroundColor: background.card,
      },
      ".MuiChip-label": {
        color: text.main,
      },
    },

    selectMenu: {
      background: "none",
      height: "none",
      minHeight: "none",
      overflow: "unset",
    },

    icon: {
      // display: "none",
      color: text.main,
      fontSize: "medium !important",
    },
    root: {
      ".MuiSvgIcon-root": {
        color: text.main,
      },
    },
  },
};

export default select;
