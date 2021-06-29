import { React, useState, useRef } from 'react';
import { useStyles } from '../UseStyles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import fetchAuth from '../../auth/authUtil';
import icon from '../../assets/groupomaniaIcon.png';

export default function Header({onAdmin}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const name = sessionStorage.getItem('name');
	const isAdmin = sessionStorage.getItem('admin');
    const inputEl = useRef(null);

    let toggleIsAdmin = null;
    if (isAdmin !== '1') {
		toggleIsAdmin = false;
	} else {
		toggleIsAdmin = true;
	};

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        inputEl.current.focus();
        setAnchorEl(event.currentTarget); 
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRefresh = () => {
        window.location.reload()
    };

    const menuId = ('primary-search-account-menu') ;
    const renderMenu = (
        <Menu 
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        >
            {toggleIsAdmin
                ?<MenuItem onClick={handleAdmin}>Admin</MenuItem>
                :null
            }
            <MenuItem onClick={handleDeco}>Déconnexion</MenuItem>
            <MenuItem onClick={handleSupAccount}>Supprimer le compte</MenuItem>
        </Menu>
    );
    
    /* -------------------------------------------------------------------------- */
    /*                            Logic pre-Material UI                           */
    /* -------------------------------------------------------------------------- */

	
	function handleDeco(e) {
        e.preventDefault();
		sessionStorage.clear();
		window.location.reload();
    };

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
			onAdmin();
		} else {
			alert("Vous n'êtes pas autorisés à resté sur cette page");
				sessionStorage.removeItem('admin');
				window.location.reload();
		};
	};

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
		};
	};


    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Button onClick={handleRefresh} variant="contained" color="primary" disableElevation>
                        <img className={classes.logo} src={icon} alt="Logo" />
                        {/* <Typography className={classes.title} variant="h5" noWrap>
                            Groupomania
                        </Typography> */}
                    </Button> 
                    <div className={classes.grow}/>
                    <Typography className={classes.hello} variant="h5" noWrap>
                        Bonjour {name}
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                        ref={inputEl}
                        >
                        <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}