// @mui material components
import Card from "@mui/material/Card";

// MD React components
import MDBox from "components/MDBase/MDBox";
import MDTypography from "components/MDBase/MDTypography";
import MDBadge from "components/MDBase/MDBadge";

function Steps() {
  return (
    <Card>
      <MDBox p={3}>
        <MDTypography variant="body2" color="text">
          Steps
        </MDTypography>
        <MDBox mt={2} mb={1} lineHeight={0}>
          <MDTypography variant="h3" fontWeight="bold">
            11.4K
          </MDTypography>
        </MDBox>
        <MDBadge variant="contained" color="success" badgeContent="+4.3%" container />
      </MDBox>
    </Card>
  );
}

export default Steps;
