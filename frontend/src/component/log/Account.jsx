import {useState} from 'react';
import Login from './Login';
import Signin from './Signin';

export default function Account ({onAccountLoggedIn}) {
    
    const [page, setPage] = useState('Login');

    let content = null;
    console.log("Choose Login/signin");
    if (page === 'Login') {
        console.log("Chose Login");
        content = <Login onLoggedIn={handleLoggedIn} onSwitch={onSwitch}/>
    } else {
        console.log("Chose Signin");
        content = <Signin onSwitch={onSwitch}/>
    };

    function handleLoggedIn(token) {
        if (onAccountLoggedIn) {
            onAccountLoggedIn(token);
        }
    };

    function onSwitch() {
        if(page === 'Login'){
            setPage('Signin');
        } else {
            setPage('Login');
        }
    };

    return (
        <> 
            {content}
        </>
    );
}
