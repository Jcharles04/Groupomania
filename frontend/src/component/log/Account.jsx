import {useState} from 'react';
import Login from './Login';
import Signin from './Signin'

export default function Account ({onAccountLoggedIn}) {
    
    const [page, setPage] = useState('Login');

    let content = null;
    if (page === 'Login') {
        content = <Login onLoggedIn={handleLoggedIn} />
    } else {
        content = <Signin/>
    }

    return (
        <>
            <ButtonGroup currentPage={page} onClick={setPage}/> 
            {content}
        </>
    )
    
    function handleLoggedIn(token) {
        if (onAccountLoggedIn) {
            onAccountLoggedIn(token);
        }
    }
}

function ButtonGroup({onClick}) {

    return (
        <>
            <button type='button' onClick={() => onClick('Login')}>Connexion</button>
            <button type='button' onClick={() => onClick('Signin')}>Inscription</button>
        </>
    )
}