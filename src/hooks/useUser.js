import { useState, useEffect } from 'react';
import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated } from "@azure/msal-react";

const useUser = () => {
    const { instance } = useMsal();
    const [user, setUser] = useState(null);
    const [isOveraged, setIsOveraged] = useState(false);
    const isAuthenticated = useIsAuthenticated();

    const currentUser = {
        name: '',
        groups: [],
    };

    const onLoad = async () => {
        setUser(currentUser);

        const currentAccount = instance.getActiveAccount();
        if (currentAccount && currentAccount.username) {
            // user is logged in so we can configure user fields
            currentUser.name = currentAccount.username;

            if (currentAccount.idTokenClaims['groups']) {
                currentUser.groups = currentAccount.idTokenClaims['groups'];
            } else if (currentAccount.idTokenClaims['_claim_names'] || currentAccount.idTokenClaims['_claim_sources']) {
                window.alert('You have too many group memberships.');
                setIsOveraged(true);
            }
        } else {
            console.debug("user is not logged in");
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            onLoad();
        } else {
            // user is not logged in
            setUser(null);
        }
    }, [instance, isAuthenticated]);

    return { user };
}

export default useUser;
