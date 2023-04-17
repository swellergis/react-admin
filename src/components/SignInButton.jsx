import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import Button from '@mui/material/Button';

function handleLogin(instance) {
    instance.loginPopup(loginRequest).catch(e => {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will open a popup for login
 */
const SignInButton = () => {
    const { instance } = useMsal();

    return (
      <Button
        size="medium"
        aria-label="open settings menu"
        aria-controls="button-login"
        aria-haspopup="true"
        onClick={() => handleLogin(instance)}
        color="inherit"
        sx={{ p: 1, fontWeight: 600 }}
      >
        Sign in
      </Button>
  );

}

export default SignInButton;
