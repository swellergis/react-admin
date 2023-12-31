import { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar2";
import Sidebar from "./scenes/global/Sidebar2";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import FormSimple from "./scenes/form-simple";
import Calendar from "./scenes/calendar";
import FAQ from "./scenes/faq";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Line from "./scenes/line";
import Geography from "./scenes/geography";
import HomePage from "./scenes/home";
import RouteGuard from "./helpers/RouteGuard";
import { securityGroups } from "./authConfig";
import useUser from './hooks/useUser';
import RequestStatus from "./scenes/request-status";

const App = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { user, isLoading } = useUser();
  const [username, setUsername] = useState("unknown");

  useEffect(() => {
    const fetchData = async () => {
        const newUsername = user ? user.name : "unknown";
        setUsername(newUsername);
    };

    fetchData();
  }, [user]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route 
                exact
                path="/admin" 
                element={
                  <RouteGuard
                    requiredGroups={[securityGroups.GroupOne, securityGroups.GroupAdminUser, securityGroups.GroupStandardUser]}
                    Component={Dashboard}
                  />
                }
              />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts user={{"name":username}} />} />
              <Route path="/status" element={<RequestStatus user={{"name":username}} />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<FormSimple user={{"name":username}} />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
