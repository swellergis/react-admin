import { Box, Icon, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useIsAuthenticated } from "@azure/msal-react";
import useUser from '../../hooks/useUser';
import SignOutButton from "../../components/SignOutButton";
import SignInButton from "../../components/SignInButton";

const Topbar2 = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const isAuthenticated = useIsAuthenticated();
    const { user } = useUser();
  
    return (
        <Box display="flex" justifyContent="space-between" p={2} backgroundColor={colors.primary[900]}>
            {/* SEARCH BAR */}
            <Box></Box>

            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>

                <div id="login-btn" className="hover:text-gray-200">
                    {isAuthenticated && (
                        <SignOutButton user={user} />
                    )}
                    {!isAuthenticated && (
                        <SignInButton />
                    )}
                </div>
            </Box>
        </Box>
    );
}

export default Topbar2;
