
import PropTypes from "prop-types";
import { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

function DeleteButton({ onClick, isDeleting, onUnmount }) {
  useEffect(() => {
    return () => {
      onUnmount()
    };
  }, []);

  return (
    <MenuItem onClick={onClick}>
      <Icon sx={{marginRight:2}} color="error" fontSize="small">{isDeleting ? "check" : "delete"}</Icon>
      {isDeleting ? "Confirm" : "Delete"}
    </MenuItem>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  onUnmount: PropTypes.func.isRequired
};

export default DeleteButton;
