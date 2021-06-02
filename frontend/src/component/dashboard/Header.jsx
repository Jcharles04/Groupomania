import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import fetchAuth from '../../auth/authUtil';


/* -------------------------------------------------------------------------- */
/*                              Style Material Ui                             */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'flex',
    },
    hello: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
        display: 'block',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',  
    },
    sectionDesktop: {
        display: 'flex',
    }
}));

export default function Header({onAdmin}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const name = sessionStorage.getItem('name');
	const admin = sessionStorage.getItem('admin');
    let toggleAdmin = null;
    if (admin !== '1') {
		toggleAdmin = false;
	} else {
		toggleAdmin = true;
	}

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
 
    };


    const menuId = 'primary-search-account-menu';
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
        {toggleAdmin
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
        <div className={classes.grow}>
        <AppBar position="static">
            <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
                Groupomania
            </Typography>
            <div className={classes.grow} />
            <Typography className={classes.hello} variant="h6" noWrap>
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