import React from 'react';

import Account from './component/log/Account';
import useToken from './component/token/Token';
import DashBoard from './component/dashboard/DashBoard';

import './style.css';

export default function App() {

    const {token, setToken } = useToken();

    console.log("Read token: ", token);
    return (
        token ? <DashBoard/> : <Account onAccountLoggedIn={handleAccountLoggedIn}/>
    )

    function handleAccountLoggedIn(token) {
        console.log("Logged in with token", token);
        setToken(token);
    }
}


