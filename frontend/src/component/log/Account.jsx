import {useState} from 'react';
import Login from './Login';
import Signup from './Signup';

export default function Account ({onAccountLoggedIn}) {
    
    const [page, setPage] = useState('Login');

    let content = null;
    if (page === 'Login') {
        content = <Login onLoggedIn={handleLoggedIn} onSwitch={onSwitch}/>
    } else {
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
