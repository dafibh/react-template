import { createContext, useContext, useMemo, useReducer } from "react";
import PropTypes from "prop-types";
const Dashboard = createContext();
Dashboard.displayName = "Dashboard";

function reducer(state, action) {
  switch (action.type) {
    case "EDIT": {
      return { ...state, edit: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "RESET": {
      return { ...state, reset: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function DashboardControllerProvider({ children }) {
  const initialState = {
    layout: [
      {w:6, h:4, x:3, y:0, i:"item1"},
      {w:1, h:1, x:1, y:3, i:"item2"},
      {w:1, h:1, x:2, y:3, i:"item3"},
    ],
    edit: false,
    reset: ""
  };

  const [controller, dispatch] = useReducer(reducer, initialState,);
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  return <Dashboard.Provider value={value}>{children}</Dashboard.Provider>;
}

function useDashboardController() {
  const context = useContext(Dashboard);

  if (!context) {
    throw new Error(
      "useDashboardController should be used inside the DashboardControllerProvider."
    );
  }

  return context;
}

DashboardControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const setDashboardEdit = (dispatch, value) => dispatch({ type: "EDIT", value });
const setDashboardLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setReset = (dispatch, value) => dispatch({ type: "RESET", value });


export {
  DashboardControllerProvider,
  useDashboardController,
  setDashboardEdit,
  setDashboardLayout,
  setReset
};
