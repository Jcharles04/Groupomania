import React from 'react';

import Account from './component/log/Account';
import useToken from './component/token/Token';
import DashBoard from './component/dashboard/DashBoard';

//import './style.css';

export default function App() {

    const {token, setToken } = useToken();

    console.log("Read token: ", token);
    let display;
    if (token) {
        console.log('Chose DashBoard');
        display = <DashBoard/>;
    } else {
        console.log('Chose Account');
        display = <Account onAccountLoggedIn={handleAccountLoggedIn}/>;
    }
    return (
        <>
            {display}
        </>
    )

    function handleAccountLoggedIn(token) {
        console.log("Logged in with token", token);
        setToken(token);
    }
}


