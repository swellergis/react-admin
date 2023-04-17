import * as React from 'react';
import { useMsal } from "@azure/msal-react";
import Button from '@mui/material/Button';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

/**
 * Renders a button which, when selected, will open a popup for logout
 */
const SignOutButton = ({ user }) => {
    const { instance } = useMsal();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const open = Boolean(anchorElUser);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    function handleLogout(instance) {
        setAnchorElUser(null);
        instance.logoutPopup().catch(e => {
        console.error(e);
        });
    }

    return (
        <div>
            <Button
                id="settings-button"
                size="small"
                aria-controls={open ? 'settings-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpenUserMenu}
                color="inherit"
                endIcon={<PersonOutlineOutlinedIcon />}
                sx={{ p: 1, fontWeight: 600 }}
            >
                {
                user
                    ?
                    user.name
                    :
                    ""
                }
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorElUser}
                open={open}
                onClose={handleCloseUserMenu}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
            >
                <MenuItem onClick={() => handleLogout(instance)}>Logout</MenuItem>
            </Menu>
        </div>
    );
    
}

export default SignOutButton;
