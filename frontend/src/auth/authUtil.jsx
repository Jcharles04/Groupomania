export default function fetchAuth(url, options) {
    return fetch(url, updateOptions(options));
};

function updateOptions(options) {
    const update =  {...options} ;
    if (localStorage.access_token) {
        update.headers = {
            ...update.headers,
            Authorization: `Bearer ${localStorage.access_token}`,
        };
    }
    return update;
};