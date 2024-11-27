import DashboardNavbar from "components/MDComponents/Navbars/DashboardNavbar";
import DashboardLayout from "components/MDComponents/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid2";
import MainMRT from "layouts/Template/datatables/mrt/main";
import ExtraMRT from "layouts/Template/datatables/mrt/extra";

function MRTExample() {
  return (
    <DashboardLayout>
      <DashboardNavbar title="MRT" />
      <Grid container spacing={3}>
        <Grid size={12}>
          <MainMRT />
        </Grid>
        <Grid size={12}>
          <ExtraMRT />
        </Grid>
      </Grid>
    </DashboardLayout>
  )
}

export default MRTExample;