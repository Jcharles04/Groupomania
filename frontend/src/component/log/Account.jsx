import {useState} from 'react';
import Login from './Login';
import Signup from './Signup';

export default function Account ({onAccountLoggedIn}) {
    
    const [page, setPage] = useState('Login');

    let content = null;
    console.log("Choose Login/signup");
    if (page === 'Login') {
        console.log("Chose Login");
        content = <Login onLoggedIn={handleLoggedIn} onSwitch={onSwitch}/>
    } else {
        console.log("Chose Signup");
        content = <Signup onSwitch={onSwitch}/>
    };

    function handleLoggedIn(token) {
        if (onAccountLoggedIn) {
            onAccountLoggedIn(token);
        }
    };

    function onSwitch() {
        if(page === 'Login'){
            setPage('Signup');
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
