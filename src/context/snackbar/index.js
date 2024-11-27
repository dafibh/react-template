import { createContext, useContext, useMemo, useReducer } from "react";
import PropTypes from "prop-types";
const SnackBar = createContext();
SnackBar.displayName = "Snackbar";

function reducer(state, action) {
  switch (action.type) {
    case "CONTENT": {
      return { ...state, content: action.value };
    }
    case "OPEN": {
      return { ...state, open: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function SBControllerProvider({ children }) {
  const initialState = {
    content: {
      color:"error",
      icon: "warning",
      title: "Error",
      content: "Error Content",
      dateTime: ""
    },
    open: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  return <SnackBar.Provider value={value}>{children}</SnackBar.Provider>;
}

function useSBController() {
  const context = useContext(SnackBar);

  if (!context) {
    throw new Error(
      "useSBController should be used inside the SBControllerProvider."
    );
  }

  return context;
}

SBControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const setSBContent = (dispatch, value) => dispatch({ type: "CONTENT", value });
const setSBOpen = (dispatch, value) => dispatch({ type: "OPEN", value });


export {
  SBControllerProvider,
  useSBController,
  setSBOpen,
  setSBContent
};
