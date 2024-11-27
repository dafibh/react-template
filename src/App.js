import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// MD React components
import MDBox from "components/MDBase/MDBox";

// MD React examples
import Sidenav from "components/MDComponents/Sidenav";
import Configurator from "components/MDComponents/Configurator";

// MD React themes
import theme from "assets/theme";

// MD React Dark Mode themes
import themeDark from "assets/theme-dark";

// MD React routes
import routes from "routes";

// MD React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context/md";

// Images
import brandWhite from "./assets/images/logo.png";
import brandDark from "./assets/images/logo-dark.png";
import ProtectedRoutes from "./model/ProtectedRoutes";

// KEY
import { v4 as uuidv4 } from "uuid";
import WebSocketService from "model/WebSocketService";
import MDSnackbar from "components/MDBase/MDSnackbar";
import {setSBOpen, useSBController} from "context/snackbar";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode
  } = controller;
  const [sb_controller, sb_dispatch] = useSBController();
  const { open, content } = sb_controller
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    WebSocketService.connect();
    return () => {
      WebSocketService.disconnect();
    };
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.auth) {
        return (
          <Route key={uuidv4()} element={<ProtectedRoutes/>}>
            <Route exact path={route.route} element={route.component} key={route.key} />
          </Route>
        );
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  const handleCloseSB = () => setSBOpen(sb_dispatch, false);

  const renderSB = (
    <MDSnackbar
      color={content.color}
      icon={content.icon}
      title={content.title}
      content={content.content}
      dateTime={content.dateTime}
      open={open}
      onClose={handleCloseSB}
      close={handleCloseSB}
      minWidth="100%"
    />
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName={process.env.REACT_APP_NAME}
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/cards" />} />
      </Routes>
      {renderSB}
    </ThemeProvider>
  );
}
