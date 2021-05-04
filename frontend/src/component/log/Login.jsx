import {useState} from 'react';


export default function Login({onLoggedIn}) {

    const [mail, setMail] = useState ('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({mail: mail, password: password})
        })
            if(response.ok) {
                console.log(response)
                const json = await response.json();        
                console.log(json);
                if (json?.access_token && onLoggedIn) {
                    onLoggedIn(json?.access_token);
                    localStorage.setItem('name', json?.name);
                    localStorage.setItem('id', json?.userId);

                } else {
                    console.warn("onLoggedIn: %s, token: %s", onLoggedIn, json?.access_token);
                }
            } else {
                console.log('erreur serveur %s', response.status, response.statusText);
            }
    }

    return (

        <div id="main">
            <div className='login'>
                <form className='form' onSubmit={handleSubmit}>
                    <h1>Connexion</h1>
                
                    <div className="messages">
                        <p className="error"></p>
                    </div>
                    
                    <div className='login-box'>
                        <label><b>Adresse Mail : </b></label>
                        <input type="email" placeholder="Entrez votre email" name="email" value={mail} onChange={e => setMail(e.target.value)} required/>
                    </div>

                    <div className='login-box'>
                        <label><b>Mot de passe : </b></label>
                        <input type="password" placeholder="Entrez le mot de passe" name="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                    </div>

                    <input type="submit"  id='submit' value='Envoyer'/>
                    <div className='link'>
                        <a href="index.html">Pas encore de compte ?</a>
                    </div>
                </form>
            </div>
        </div>
    
    )
}