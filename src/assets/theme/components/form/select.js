// MD React base styles
import colors from "assets/theme/base/colors";

// MD React helper functions
import pxToRem from "assets/theme/functions/pxToRem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const { transparent, text } = colors;

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
    },

    selectMenu: {
      background: "none",
      height: "none",
      minHeight: "none",
      overflow: "unset",
    },

    icon: {
      // display: "none",
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
