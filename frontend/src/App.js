import React from 'react';

import Account from './component/log/Account';
import useToken from './component/token/Token';
import DashBoard from './component/dashboard/DashBoard';
import { useStyles } from './component/UseStyles';
import './style.css';

export default function App() {

    const classes = useStyles();
    const {token, setToken } = useToken();


    let display;
    if (token) {
        display = <DashBoard/>;
    } else {
        display = <Account onAccountLoggedIn={handleAccountLoggedIn}/>;
    };

    return (
        <div className={classes.main}>
            {display}
        </div>
    );

    function handleAccountLoggedIn(token) {
        setToken(token);
    };
}


