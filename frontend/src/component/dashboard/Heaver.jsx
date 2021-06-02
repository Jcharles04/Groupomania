import React from 'react';
import fetchAuth from '../../auth/authUtil';


export default function Header({onAdmin}) {

	const name = sessionStorage.getItem('name');
	const admin = sessionStorage.getItem('admin');

	let toggleAdmin = null;
	if (admin !== '1') {
		toggleAdmin = false;
	} else {
		toggleAdmin = true;
	}

	
	function handleDeco(e) {
        e.preventDefault();
		sessionStorage.clear();
		window.location.reload();
    } 

	async function handleAdmin(e) {
		e.preventDefault();
		const response = await fetchAuth('http://localhost:8080/user/ImAdmin', {
			method: 'POST',
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify()
		})
		if(response.ok) {
			console.log(response);
			onAdmin();
		} else {
			alert("Vous n'êtes pas autorisés à resté sur cette page");
				sessionStorage.removeItem('admin');
				window.location.reload();
		}
	}

	async function handleSupAccount (e) {
		if (window.confirm("Vous voulez vraiment supprimer votre compte ?") ) {
			e.preventDefault();
			const response = await fetchAuth('http://localhost:8080/user/del', {
				method: 'POST',
				headers: {
					'Content-Type':'application/json'
				},
				body: JSON.stringify()
			})
				if(response.ok) {
					console.log(response);
					alert('Suppression effectuée');
					sessionStorage.clear();
					window.location.reload();
				} else {
					console.log('erreur serveur %s', response.status, response.statusText);
					alert("Une erreur s'est produite");
				}
		} else {
			return;
		}
	}

    return (
        <header>
				<h2>Groupomania</h2>
				<h3>Hello, {name}</h3>
				<button id='button'><i className="fas fa-user-alt"></i></button>
				<div id='toggle'>
					<ul>
						{toggleAdmin
							?<li><button onClick={handleAdmin} className='link'>admins</button></li>	
							:null
						}
						<li><button onClick={handleDeco}>Déconnexion</button></li>
						<li><button onClick={handleSupAccount} className='link'>Supprimer votre compte</button></li>
					</ul>
				</div>
		</header>
    )
}