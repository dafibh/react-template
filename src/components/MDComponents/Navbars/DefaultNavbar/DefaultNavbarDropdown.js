// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";

// MD React TS components
import MDBox from "components/MDBase/MDBox";
import MDTypography from "components/MDBase/MDTypography";

function DefaultNavbarDropdown({
                                 name,
                                 icon,
                                 children,
                                 collapseStatus,
                                 light,
                                 href,
                                 route,
                                 collapse,
                                 darkMode,
                                 ...rest
                               }) {
  const linkComponent = {
    component: "a",
    href,
    target: "_blank",
    rel: "noreferrer",
  };

  const routeComponent = {
    component: Link,
    to: route,
  };

  return (
    <>
      <MDBox
        {...rest}
        mx={1}
        p={1}
        display="flex"
        alignItems="baseline"
        color={light && darkMode ? "white" : "dark"}
        sx={{ cursor: "pointer", userSelect: "none" }}
        {...(route && routeComponent)}
        {...(href && linkComponent)}
      >
        {icon && (
          <MDTypography
            variant="body2"
            lineHeight={1}
            color="inherit"
            sx={{ alignSelf: "center", "& *": { verticalAlign: "middle" } }}
          >
            {icon}
          </MDTypography>
        )}
        <MDTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light && darkMode ? "white" : "inherit"}
          opacity={0.6}
          sx={{ fontWeight: "100%", ml: 1, mr: 0.25 }}
        >
          {name}
        </MDTypography>
        <MDTypography variant="body2" color={light && darkMode ? "white" : "dark"} ml="auto" opacity={0.9}>
          <Icon sx={{ fontWeight: "normal", verticalAlign: "middle" }} color="secondary">
            {collapse && "keyboard_arrow_down"}
          </Icon>
        </MDTypography>
      </MDBox>
      {children && (
        <Collapse in={Boolean(collapseStatus)} timeout={400} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

// Setting default values for the props of DefaultNavbarDropdown
DefaultNavbarDropdown.defaultProps = {
  icon: false,
  children: false,
  collapseStatus: false,
  light: false,
  href: "",
  route: "",
};

// Typechecking props for the DefaultNavbarDropdown
DefaultNavbarDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.node,
  children: PropTypes.node,
  collapseStatus: PropTypes.bool,
  light: PropTypes.bool,
  href: PropTypes.string,
  route: PropTypes.string,
  collapse: PropTypes.bool.isRequired,
  darkMode: PropTypes.bool.isRequired
};

export default DefaultNavbarDropdown;
