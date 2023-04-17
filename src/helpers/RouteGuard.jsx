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
                        <div className="container">
                            <h4 className="not-found">You are not authorized for this content.</h4>
                        </div>
                }
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <div className="container">
                    <Typography 
                        align="center" 
                        variant="h4" 
                        color="silver" 
                        gutterBottom
                    >
                        You need to sign in to access this content.
                    </Typography>
                </div>
            </UnauthenticatedTemplate>
        </React.Fragment>
    );

};

export default RouteGuard;
