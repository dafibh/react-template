// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import MDTypography from "components/MDBase/MDTypography";

function DescriptionCell({description}) {
  return (
    <MDTypography
      sx={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'pre-line',
        WebkitLineClamp: 3, // Set the number of lines to display
        maxWidth: '20rem',
      }}
      id="modal-modal-description"
      variant="body"
      color="text"
    >
      {description}
    </MDTypography>
  );
}

// Typechecking props for the StatusCell
DescriptionCell.propTypes = {
  description: PropTypes.string.isRequired,
};

export default DescriptionCell;
