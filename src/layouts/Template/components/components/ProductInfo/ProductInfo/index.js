import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid2";
import Autocomplete from "@mui/material/Autocomplete";

// MD React components
import MDBox from "../../../../../../components/MDBase/MDBox";
import MDTypography from "../../../../../../components/MDBase/MDTypography";
import MDEditor from "../../../../../../components/MDBase/MDEditor";
import MDInput from "../../../../../../components/MDBase/MDInput";

// NewProduct page components
import FormField from "../../FormField/FormField";

function ProductInfo() {
  return (
    <MDBox>
      <MDTypography variant="h5">Product Information</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid size={{xs:12, sm:6}}>
            <FormField type="text" label="Name" />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <FormField type="text" label="Weight" />
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid size={{xs:12, sm:6}}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Description&nbsp;&nbsp;
                <MDTypography variant="caption" color="text">
                  (optional)
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDEditor />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <MDBox mb={3}>
              <MDBox mb={2} display="inline-block">
                <MDTypography
                  component="label"
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  textTransform="capitalize"
                >
                  Category
                </MDTypography>
              </MDBox>
              <Autocomplete
                defaultValue="Clothing"
                options={["Clothing", "Electronics", "Furniture", "Others", "Real Estate"]}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
              />
            </MDBox>
            <MDBox mb={2} display="inline-block">
              <MDTypography
                component="label"
                variant="button"
                fontWeight="regular"
                color="text"
                textTransform="capitalize"
              >
                Size
              </MDTypography>
            </MDBox>
            <Autocomplete
              defaultValue="Medium"
              options={["Extra Large", "Extra Small", "Large", "Medium", "Small"]}
              renderInput={(params) => <MDInput {...params} variant="standard" />}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default ProductInfo;
