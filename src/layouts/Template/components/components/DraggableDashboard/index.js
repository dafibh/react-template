import MDBox from "components/MDBase/MDBox";
import GridLayout from "react-grid-layout";
import { useEffect, useRef, useState } from "react";
import {v4 as uuidv4} from "uuid";
import MDButton from "components/MDBase/MDButton";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import { setDashboardEdit, setDashboardLayout, useDashboardController } from "context/dashboard";
import Grid from "@mui/material/Grid2";
import EditRegion from "./EditRegion";

/** Required CSS */
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

function DraggableDashboard() {
  const [dashboardController, dashboardDispatch] = useDashboardController();
  const { layout, edit} = dashboardController;
  const [controlledLayout, setControlledLayout] = useState(layout);

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  /** Pass the toRefresh to a component that needs manual refresh */
  const [toRefresh, setToRefresh] = useState(uuidv4());

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
      setDashboardEdit(dashboardDispatch, false);
    };
  }, []);

  const onLayoutChange = (layout) => {
    setControlledLayout(layout)
    setDashboardLayout(dashboardDispatch, layout);
    setToRefresh(uuidv4())
    if (edit) {
      /** Optional: store the layout in storage */
      // postDashboardLayout(user.email, JSON.stringify(layout))
    }
  };

  /** Function to set the minimum and maximum size of the components when resizing */
  const onResize = (layout, oldLayoutItem, layoutItem, placeholder) => {
    // Setting min/max width/height functions
    const minH = (lI, pI, val) => { if (lI.h < val && pI.h < val) { lI.h = val; pI.h = val } }
    const maxH = (lI, pI, val) => { if (lI.h > val && pI.h > val) { lI.h = val; pI.h = val } }
    const minW = (lI, pI, val) => { if (lI.w < val && pI.w < val) { lI.w = val; pI.w = val } }
    const maxW = (lI, pI, val) => { if (lI.w > val && pI.w > val) { lI.w = val; pI.w = val } }


    const id = layoutItem.i;

    if (id === "item1") {
      maxH(layoutItem, placeholder, 4)
      minH(layoutItem, placeholder, 3)
      maxW(layoutItem, placeholder, 6)
      minW(layoutItem, placeholder, 2)
    }
  };

  /** Function to decide what component to render based on ID */
  const processWidgets = (id) => {
    const tempStyle = {height:"100%", alignItems:"center", justifyContent:"center", p:1}
    switch (id) {
      case "item1": return (<Card sx={tempStyle}>Widget 1</Card>);
      case "item2": return (<Card sx={tempStyle}>Widget 2</Card>);
      case "item3": return (<Card sx={tempStyle}>Widget 3</Card>);
      default: return <Card sx={tempStyle}>New Widget</Card>
    }
  };

  /**
   * This useEffect is for delay between context update and actual widget update.
   * This is due to wrong widget sizing when adding widget.
   * */
  useEffect(() => {
    setTimeout(()=>{setControlledLayout(layout)}, 150)
  }, [dashboardController.layout.length, dashboardController.reset]);

  /**
   * "Wrapper" of a component to render "delete" button.
   */
  const [actionButtonHovered, setActionButtonHovered] = useState(false);
  const renderHoverableBox = (item) => {
    return (
      <MDBox
        key={item.i}
      >
        {edit && (
          <MDButton
            onMouseEnter={() => setActionButtonHovered(true)}
            onMouseLeave={() => setActionButtonHovered(false)}
            onClick={()=>{
              setActionButtonHovered(false)
              setControlledLayout(prev => prev.filter(obj => obj.i !== item.i))
            }}
            color="dark"
            size="small"
            sx={{
              position: "absolute",
              top: "-0.5rem",
              right: "0.25rem",
              zIndex: 1,
            }}
            iconOnly
            circular
          >
            <Icon>close</Icon>
          </MDButton>
        )}
        {processWidgets(item.i)}
      </MDBox>
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <EditRegion />
      </Grid>
      <Grid size={12}>
        <MDBox ref={containerRef}>
          <GridLayout
            className="layout"
            layout={controlledLayout}
            cols={12}
            rowHeight={100}
            width={containerWidth}
            onLayoutChange={onLayoutChange}
            onResize={onResize}
            isDraggable={edit && !actionButtonHovered}
            isResizable={edit}
          >
            {controlledLayout.map((item) => renderHoverableBox(item))}
          </GridLayout>
        </MDBox>
      </Grid>
    </Grid>
  );
}

export default DraggableDashboard;