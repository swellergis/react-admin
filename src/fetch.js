/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { protectedResources } from "./authConfig";
import { msalInstance } from "./index";

const getToken = async (scopes) => {
    const account = msalInstance.getActiveAccount();

    if (!account) {
        throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
    }

    const response = await msalInstance.acquireTokenSilent({
        account: account,
        scopes: scopes
    });

    return response.accessToken;
}

export const getTasks = async () => {
    const accessToken = await getToken(protectedResources.apiTodoList.scopes);

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(protectedResources.apiTodoList.todoListEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const getTask = async (id) => {
    const accessToken = await getToken(protectedResources.apiTodoList.scopes);

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(protectedResources.apiTodoList.todoListEndpoint + `/${id}`, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const postTask = async (task) => {
    const accessToken = await getToken(protectedResources.apiTodoList.scopes);

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append('Content-Type', 'application/json');

    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(task)
    };

    return fetch(protectedResources.apiTodoList.todoListEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const deleteTask = async (id) => {
    const accessToken = await getToken(protectedResources.apiTodoList.scopes);

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "DELETE",
        headers: headers
    };

    return fetch(protectedResources.apiTodoList.todoListEndpoint + `/${id}`, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const editTask = async (id, task) => {
    const accessToken = await getToken(protectedResources.apiTodoList.scopes);

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append('Content-Type', 'application/json');

    const options = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(task)
    };

    return fetch(protectedResources.apiTodoList.todoListEndpoint + `/${id}`, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const getAllTasks = async () => {
    const accessToken = await getToken(protectedResources.apiTodoList.scopes);

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers,
    };

    return fetch(protectedResources.apiTodoList.dashboardEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const getGroups = async () => { 
    const accessToken = await getToken(protectedResources.apiGraph.scopes);

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(protectedResources.apiGraph.endpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const getNextPage = async (nextPage) => {
    const accessToken = await getToken(protectedResources.apiGraph.scopes);

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(nextPage, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}
