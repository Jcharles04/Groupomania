import React from 'react';

//import {useState} from 'react';


export default function Header() {

	const name = localStorage.getItem('name');
	
	function handleDeco(e) {
        e.preventDefault();
		localStorage.clear();
		window.location.reload();
    } 

    return (
        <header>
				<h2>Groupomania</h2>
				<h3>Hello, {name}</h3>
				<button id='button'><i className="fas fa-user-alt"></i></button>
				<div id='toggle'>
					<ul>
						<li>
							<a href='./mod/mod.php' className='link'>admins</a>
                        </li>	
						<li><button onClick={handleDeco}>Déconnexion</button></li>
						<li><a href='./log/deleteUser.php' className='link'>Supprimer votre compte</a></li>
					</ul>
				</div>
		</header>
    )
}