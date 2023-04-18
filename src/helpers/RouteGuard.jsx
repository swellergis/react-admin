import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import React, { useState, useEffect } from 'react';
import useUser from '../hooks/useUser';
import Typography from '@mui/material/Typography';

export const RouteGuard = ({ Component, ...props }) => {

    const { user } = useUser();
  
    const [isAuthorized, setIsAuthorized] = useState(false);

    const onLoad = async () => {
        if (user) {
            const { name, groups } = user;
            let intersection = props.requiredGroups.filter(requiredGroup => groups.includes(requiredGroup));
            if (intersection.length > 0) {
                // user is authorized to access content
                console.debug(name + " is authorized for this content");
                setIsAuthorized(true);
            } else {
                // user is not authorized
                console.debug(name + " is NOT authorized for this content");
                setIsAuthorized(false);
            }
        } else {
            // user is not logged in
            setIsAuthorized(false);
        }
    }

    useEffect(() => {
        onLoad();
    }, [user, props.requiredGroups]);

    return (
        <React.Fragment>
            <AuthenticatedTemplate>
                {
                    isAuthorized
                        ?
                        <Component />
                        :
                        <div className="container" align="center">
                            <h1 className="not-found">Unauthorized!</h1>
                        </div>
                }
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <div className="container">
                    <Typography 
                        mt="10px"
                        align="center" 
                        variant="h2" 
                        color="silver" 
                    >
                        You need to sign in to access this content.
                    </Typography>
                </div>
            </UnauthenticatedTemplate>
        </React.Fragment>
    );

};

export default RouteGuard;
