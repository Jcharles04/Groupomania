import {useState} from 'react';

export default function Signin() {

    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [service, setService] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/user/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, firstname: firstname, service: service, mail: mail, password: password})
        });
        if (response.ok){
            const json = await response.json();
            console.log(json);
            alert('Compte créé')
        } else {
            console.log('erreur serveur %s', response.status, response.statusText);
        }
    }

    return (

        <div id="main">
            <div className='login'>
                <form className='form' onSubmit={handleSubmit}>
                    <h1>Inscription</h1>
                    

                        <div className="messages">
                            <p className="error"></p>
                        </div>

                    <div className='login-box'>
                        <label><b>Nom : </b></label>
                        <input type="text" placeholder="Entrez votre nom" name="name" value={name} onChange={e => setName(e.target.value)} required/>
                    </div>   
                    <div className='login-box'>
                        <label><b>Prénom : </b></label>
                            <input type="text" placeholder="Entrez votre prénom" name="firstname" value={firstname} onChange={e => setFirstname(e.target.value)} required/>
                    </div>        
                    <div className='login-box'>
                        <label><b>Service : </b></label>
                        <input type="text" placeholder="Votre service (ex: compta...)" name="serv" value={service} onChange={e => setService(e.target.value)} required/>
                    </div>   
                    <div className='login-box'>
                        <label><b>Adresse Mail : </b></label>
                        <input type="email" placeholder="Entrez votre email" name ='mail' value={mail} onChange={e => setMail(e.target.value)} required/>
                    </div>    
                    <div className='login-box'>    
                        <label><b>Mot de passe : </b></label>
                        <input type="password" placeholder="Entrez le mot de passe" name="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                    </div>
                    <div className='login-box'>
                        <input type="submit" id='submit' value='Envoyer'/>
                    </div>
                    <div className='login-box'>
                        <a href="./login.php">Déjà un compte ?</a>
                    </div>
                </form>
            </div>
        </div>
    )
    
}