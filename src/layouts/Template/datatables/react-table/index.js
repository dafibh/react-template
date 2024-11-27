import DashboardNavbar from "components/MDComponents/Navbars/DashboardNavbar";
import DashboardLayout from "components/MDComponents/LayoutContainers/DashboardLayout";
import Card from "@mui/material/Card";
import DataTable from "components/MDComponents/Tables/DataTable";
import MDBox from "components/MDBase/MDBox";
import { useEffect, useState } from "react";
import { getAppDatatable } from "util/APIHelper";

function ReactTableExample() {
  const [dataTableData, setDataTableData] = useState({
    columns: [],
    rows: [],
  });

  useEffect(() => {
    const runAsync = async () => {
      const dataTableDataResponse = await getAppDatatable();
      setDataTableData(dataTableDataResponse.data.message);
    };
    runAsync();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <DataTable table={dataTableData} canSearch />
        </Card>
      </MDBox>
    </DashboardLayout>
  )
}

export default ReactTableExample;