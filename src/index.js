import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from 'App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MaterialUIControllerProvider } from 'context/md';
import {SBControllerProvider} from "context/snackbar";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { DashboardControllerProvider } from "./context/dashboard";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <SBControllerProvider>
        <DashboardControllerProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <App />
          </LocalizationProvider>
        </DashboardControllerProvider>
      </SBControllerProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
