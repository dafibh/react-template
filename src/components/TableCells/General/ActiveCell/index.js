// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// MD React components
import MDBox from "components/MDBase/MDBox";
import MDTypography from "components/MDBase/MDTypography";
import MDButton from "components/MDBase/MDButton";

function ActiveCell({active}) {
  let color;
  let icon;

  switch (active) {
    case "active": color = "success"; icon = "done"; break;
    default: color = "error"; icon = "close"; break;
  }

  return (
    <MDBox display="flex" alignItems="center">
      <MDBox mr={1}>
        <MDButton variant="outlined" color={color} size="small" iconOnly circular>
          <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
        </MDButton>
      </MDBox>
      <MDTypography variant="caption" fontWeight="medium" color="text" sx={{ lineHeight: 0 }}>
        {active.charAt(0).toUpperCase() + active.slice(1)}
      </MDTypography>
    </MDBox>
  );
}

// Typechecking props for the StatusCell
ActiveCell.propTypes = {
  active: PropTypes.string.isRequired,
};

export default ActiveCell;
