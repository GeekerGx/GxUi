const parseResponse = (response) => {
    const headers = {};
    response.headers.forEach((v, k) => {
        headers[k.toLowerCase()] = v;
    });
    const contentType = headers["content-type"];
    const contentLength = headers["content-length"];
    if (contentType.startsWith("application/json")
        && contentLength > 0) {
        return response.json();
    } else {
        return response.text();
    }
};

export const get = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(parseResponse)
            .then(data => resolve(data))
            .catch(err => reject(err));
    });
};
export const post = (url, data) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(parseResponse)
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
};
export const waitAll = (arrp) => {
    return Promise.all(arrp);
};