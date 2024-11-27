import {
  setDashboardEdit,
  setDashboardLayout,
  setReset,
  useDashboardController,
} from "context/dashboard";
import MDBox from "components/MDBase/MDBox";
import Tooltip from "@mui/material/Tooltip";
import MDButton from "components/MDBase/MDButton";
import Icon from "@mui/material/Icon";
import {v4 as uuidv4} from "uuid";

function EditRegion() {
  const [dashboardController, dashboardDispatch] = useDashboardController();
  const { layout, edit } = dashboardController;

  const handleReset = async () => {
    setReset(dashboardDispatch, uuidv4())
    setDashboardLayout(dashboardDispatch, [
      {w:6, h:4, x:3, y:0, i:"item1"},
      {w:1, h:1, x:1, y:3, i:"item2"},
      {w:1, h:1, x:2, y:3, i:"item3"},
    ],);
  }

  const handleAddWidget = (item) => {
    const layoutArr = structuredClone(layout)

    layoutArr.push({w: item.w, h: item.h, x: 0,y: Infinity,i: uuidv4()})
    setDashboardLayout(dashboardDispatch, layoutArr)
  }

  return (
    <MDBox sx={{display:"flex", justifyContent:"flex-end"}}>
      {
        (edit &&
          <>
            <Tooltip title="Reset Widgets">
              <MDButton
                color="secondary"
                variant="outlined"
                onClick={handleReset}
                iconOnly
                sx={({palette: { text }}) => ({ color: text.main, marginRight: "1.5rem" })}
              >
                <Icon>restore</Icon>
              </MDButton>
            </Tooltip>
          </>
        )
      }
      {
        (edit &&
          <>
            <Tooltip title="Add Widgets">
              <MDButton
                color="secondary"
                variant="outlined"
                onClick={()=>{
                  handleAddWidget({ w:1, h:1})
                }}
                iconOnly
                sx={({palette: { text }}) => ({ color: text.main, marginRight: "1.5rem" })}
              >
                <Icon>add</Icon>
              </MDButton>
            </Tooltip>
          </>
        )
      }
      <Tooltip title={(edit)?"Save Changes": "Edit Dashboard"}>
        <MDButton
          color="secondary"
          variant="outlined"
          onClick={()=>{
            setDashboardEdit(dashboardDispatch, !edit)
          }}
          iconOnly
          sx={({palette: { text }}) => ({ color: text.main, marginRight: "1.5rem" })}
        >
          <Icon>{(edit)?"check":"edit"}</Icon>
        </MDButton>
      </Tooltip>
    </MDBox>
  );
}

export default EditRegion;