// MD React base styles
import colors from "assets/theme-dark/base/colors";

const { info, text } = colors;

const pickersDay = {
  styleOverrides: {
    root: {
      color: text.main, // Default text color for days
      '&.Mui-selected': {
        backgroundColor: info.main, // Background color of selected day
        '&:hover': {
          backgroundColor: info.focus
        },
      },
      '&.MuiPickersDay-today': {
        borderColor: info.main
      },
      '&:hover': {
        backgroundColor: info.focus
      },
    },
  },
};

export default pickersDay;
