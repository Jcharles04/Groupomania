import {react, useState} from 'react';


export default function Lojin({onLoggedIn}) {

    const [mail, setMail] = useState ('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        console.log("Login handleSubmit");
        e.preventDefault();
        setLoading(true);
        try {
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
                    sessionStorage.setItem('name', json?.name);
                    sessionStorage.setItem('id', json?.userId);
                    if(json?.admin === 1) {
                        sessionStorage.setItem('admin', json?.admin);
                    }
                    return; //Quit function to avoid changing state when <Login> isn't shown anymore
                } else {
                    console.warn("onLoggedIn: %s, token: %s", onLoggedIn, json?.access_token);
                }
            } else {
                console.log('erreur serveur %s', response.status, response.statusText);
                alert('Utilisateur ou mot de pass faux')
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
        setLoading(false);
    }
    
    console.log("Login render");

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

                    <input type="submit"  id='submit' value='Envoyer' disabled={loading}/>
                    <div className='link'>
                        <button>Pas encore de compte ?</button>
                    </div>
                </form>
            </div>
        </div>
    
    )
}