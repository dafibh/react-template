import Grid from "@mui/material/Grid2";
import { useEffect, useMemo, useState } from "react";
import { getAppCalendar } from "util/APIHelper";
import EventCalendar from "components/MDComponents/Calendar";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import Media from "./components/Media/Media";
import Socials from "./components/Socials/Socials";
import Pricing from "./components/Pricing/Pricing";
import MDBox from "components/MDBase/MDBox";
import MDTypography from "components/MDBase/MDTypography";
import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import MDButton from "components/MDBase/MDButton";
import ResetPassword from "./components/Authentication/ResetPassword";
import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";
import DefaultNavbar from "components/MDComponents/Navbars/DefaultNavbar";

import pageRoutes from "page.routes";
import PageLayout from "components/MDComponents/LayoutContainers/PageLayout";
import DraggableDashboard from "./components/DraggableDashboard";

function getSteps() {
  return ["1. Product Info", "2. Media", "3. Social", "4. Pricing"];
}
function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <ProductInfo />;
    case 1:
      return <Media />;
    case 2:
      return <Socials />;
    case 3:
      return <Pricing />;
    default:
      return null;
  }
}

function ComponentsExample() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);
  const [calendarEventsData, setCalendarEventsData] = useState([]);

  useEffect(() => {
    const runAsync = async () => {
      const calendarEventsDataResponse = await getAppCalendar();
      setCalendarEventsData(calendarEventsDataResponse.data.message);
    };
    runAsync();
  }, []);

  return (
    <PageLayout>
      <DefaultNavbar
        routes={pageRoutes}
        // action={{
        //   type: "external",
        //   route: "/",
        //   label: "home",
        // }}
        transparent={false}
        light/>
      <Grid p={6} mt={10} container justifyContent="center" spacing={3}>
        <Grid size={12}>
          <DraggableDashboard />
        </Grid>

        <Grid size={12} sx={{ height: "max-content" }}>
          {useMemo(
            () => (
              <EventCalendar
                initialView="dayGridMonth"
                initialDate="2021-08-10"
                events={calendarEventsData}
                selectable
                editable
              />
            ),
            [calendarEventsData]
          )}
        </Grid>
        <Grid size={{xs:12, lg:8}}>
          <MDBox mt={6} mb={8} textAlign="center">
            <MDBox mb={1}>
              <MDTypography variant="h3" fontWeight="bold">
                Add New Product
              </MDTypography>
            </MDBox>
            <MDTypography variant="h5" fontWeight="regular" color="secondary">
              This information will describe more about the product.
            </MDTypography>
          </MDBox>
          <Card>
            <MDBox mt={-3} mb={3} mx={2}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </MDBox>
            <MDBox p={2}>
              <MDBox>
                {getStepContent(activeStep)}
                <MDBox mt={3} width="100%" display="flex" justifyContent="space-between">
                  {activeStep === 0 ? (
                    <MDBox />
                  ) : (
                    <MDButton variant="gradient" color="light" onClick={handleBack}>
                      back
                    </MDButton>
                  )}
                  <MDButton
                    variant="gradient"
                    color="dark"
                    onClick={!isLastStep ? handleNext : undefined}
                  >
                    {isLastStep ? "send" : "next"}
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>

        <Grid size={12}>
          <MDBox my={3}>
            <Grid container spacing={3}>
              <Grid size={{xs:12, lg:4}}>
                <SignIn />
              </Grid>
              <Grid size={{xs:12, lg:4}}>
                <SignUp />
              </Grid>
              <Grid size={{xs:12, lg:4}}>
                <ResetPassword />
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
    </PageLayout>
  )
}

export default ComponentsExample;