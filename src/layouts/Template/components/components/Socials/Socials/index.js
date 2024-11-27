// @mui material components
import Grid from "@mui/material/Grid2";

// MD React components
import MDBox from "../../../../../../components/MDBase/MDBox";
import MDTypography from "../../../../../../components/MDBase/MDTypography";

// NewProduct page components
import FormField from "../../FormField/FormField";

function Socials() {
  return (
    <MDBox>
      <MDTypography variant="h5" fontWeight="bold">
        Socials
      </MDTypography>
      <MDBox mt={2}>
        <Grid container spacing={2}>
          <Grid size={{xs:12}}>
            <FormField type="text" label="Shoppify Handle" />
          </Grid>
          <Grid size={{xs:12}}>
            <FormField type="text" label="Facebook Account" />
          </Grid>
          <Grid size={{xs:12}}>
            <FormField type="text" label="Instagram Account" />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default Socials;
