// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import MDTypography from "components/MDBase/MDTypography";

function MeterSerialNumberCell({ endpoint, meterSerialNumber, unClickable }) {
  const navigate = useNavigate();
  const onClick = () => {
    if (!unClickable) {
      navigate(`/meter/details?endpoint=${endpoint}`)
    }
  }

  return (
    <Tooltip title={endpoint}>
      <MDTypography
        color={unClickable?"text":"info"}
        variant="body"
        onClick={onClick}
        sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'pre-line',
          WebkitLineClamp: 2, // Set the number of lines to display
          width: '12rem',
          cursor: !(unClickable)?"pointer":null
        }}
      >
        {meterSerialNumber}
      </MDTypography>
    </Tooltip>
  );
}

// Setting default value for the props of CustomerCell
MeterSerialNumberCell.defaultProps = {
  meterSerialNumber: "",
  unClickable: false
};

// Typechecking props for the CustomerCell
MeterSerialNumberCell.propTypes = {
  endpoint: PropTypes.string.isRequired,
  meterSerialNumber: PropTypes.string,
  unClickable: PropTypes.bool
};

export default MeterSerialNumberCell;
