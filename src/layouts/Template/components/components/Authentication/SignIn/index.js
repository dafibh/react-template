import Card from "@mui/material/Card";
import MDBox from "components/MDBase/MDBox";
import MDTypography from "components/MDBase/MDTypography";
import Grid from "@mui/material/Grid2";
import MuiLink from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import MDInput from "components/MDBase/MDInput";
import Switch from "@mui/material/Switch";
import MDButton from "components/MDBase/MDButton";
import { Link } from "react-router-dom";
import { useState } from "react";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  return (
    <Card>
      <MDBox
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
        mx={2}
        mt={-3}
        p={2}
        mb={1}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Sign in
        </MDTypography>
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
          <Grid size={{xs:2}}>
            <MDTypography component={MuiLink} href="#" variant="body1" color="white">
              <FacebookIcon color="inherit" />
            </MDTypography>
          </Grid>
          <Grid size={{xs:2}}>
            <MDTypography component={MuiLink} href="#" variant="body1" color="white">
              <GitHubIcon color="inherit" />
            </MDTypography>
          </Grid>
          <Grid size={{xs:2}}>
            <MDTypography component={MuiLink} href="#" variant="body1" color="white">
              <GoogleIcon color="inherit" />
            </MDTypography>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
          <MDBox mb={2}>
            <MDInput type="email" label="Email" fullWidth />
          </MDBox>
          <MDBox mb={2}>
            <MDInput type="password" label="Password" fullWidth />
          </MDBox>
          <MDBox display="flex" alignItems="center" ml={-1}>
            <Switch checked={rememberMe} onChange={handleSetRememberMe} />
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="text"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
            >
              &nbsp;&nbsp;Remember me
            </MDTypography>
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton variant="gradient" color="info" fullWidth>
              sign in
            </MDButton>
          </MDBox>
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              Don&apos;t have an account?{" "}
              <MDTypography
                component={Link}
                to="/authentication/sign-up/cover"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Sign up
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  )
}

export default SignIn