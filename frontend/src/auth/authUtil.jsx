export default function fetchAuth(url, options) {
    return fetch(url, updateOptions(options));
};

function updateOptions(options) {
    const update =  {...options} ;
    if (sessionStorage.access_token) {
        update.headers = {
            ...update.headers,
            Authorization: `Bearer ${sessionStorage.access_token}`,
        };
    }
    return update;
};