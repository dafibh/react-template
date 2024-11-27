// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import MDTypography from "components/MDBase/MDTypography";

function LinkCell({ href, text, tooltip, unClickable, ...rest }) {
  const navigate = useNavigate();
  const onClick = () => {
    if (!unClickable) {
      navigate(href)
    }
  }

  return (
    <Tooltip title={(tooltip!=="")?tooltip:text}>
      <MDTypography
        color={unClickable?"text":"info"}
        variant="body"
        onClick={onClick}
        sx={{
          cursor: !(unClickable)?"pointer":null
        }}
        {...rest}
      >
        {text}
      </MDTypography>
    </Tooltip>
  );
}

// Setting default value for the props of CustomerCell
LinkCell.defaultProps = {
  href: "/",
  tooltip: "",
  unClickable: false
};

// Typechecking props for the CustomerCell
LinkCell.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  tooltip: PropTypes.string,
  unClickable: PropTypes.bool
};

export default LinkCell;
