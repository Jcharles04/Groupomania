import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        return localStorage.getItem('access_token');
    }

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('access_token', userToken);
        setToken(userToken)
    };

    return {
        setToken: saveToken,
        token
    }
}