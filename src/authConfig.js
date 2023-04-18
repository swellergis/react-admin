import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    auth: {
        clientId: "f7209766-0fb0-4606-90c7-ecadc73c1f88", // This is the ONLY mandatory field that you need to supply.
        authority: "https://login.microsoftonline.com/b85f5d16-0266-43ca-8c5c-ccb8d6a51d61", // Defaults to "https://login.microsoftonline.com/common"
        redirectUri: "/", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

/**
* Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
* https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
*/
export const protectedResources = {
// apiTodoList: {
//     todoListEndpoint: "http://localhost:5000/api/todolist",
//     dashboardEndpoint: "http://localhost:5000/api/dashboard",
//     scopes: ["Enter_the_Web_Api_Scope_here"],
// },
apiGraph: {
    endpoint: "https://graph.microsoft.com/v1.0/me/memberOf",
    scopes: ["User.Read", "GroupMember.Read.All"],
}
}

/**
* Scopes you add here will be prompted for user consent during sign-in.
* By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
* For more information about OIDC scopes, visit: 
* https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
*/
export const loginRequest = {
// scopes: [...protectedResources.apiTodoList.scopes, ...protectedResources.apiGraph.scopes]
scopes: [...protectedResources.apiGraph.scopes]
};

export const securityGroups = {
GroupOne: "7c2f7c60-c943-4e84-bca7-e9cdd6a47aff",
GroupTwo: "ce8b8882-8eaf-4a27-88f2-6ef8e5e30ae8",
GroupAdminUser: "0cc37408-6077-4be9-943e-fbcdf27f833d",
GroupStandardUser: "4a3a04ec-18a3-4f8c-8777-cf0bd871593c"
}
