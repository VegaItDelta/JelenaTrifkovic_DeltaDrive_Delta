export const postRequest = async (url: string, body: string) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body,
    });

    if (!response.ok) {
        console.error("error", response);
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
}

export const postRequestWithCredentials = async (accessToken: string, url: string, body: string) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'x-access-token': accessToken,
            "Content-Type": "application/json",
        },
        body,
    });

    if (!response.ok) {
        console.error("error", response);
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
}

export const getRequestWithCredentials = async (accessToken: string, url: string, queryParams?: string) => {
    return fetch(url + (queryParams || ''), {
        headers: {
            'x-access-token': accessToken,
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
}