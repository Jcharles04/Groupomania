import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


/* -------------------------------------------------------------------------- */
/*                              Style Material Ui                             */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login({onLoggedIn , onSwitch}) {
    const classes = useStyles();
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

    function handleOnClick() {
        onSwitch();
    }
    
    console.log("Login render");

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Connexion
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adresse mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={mail} 
                        onChange={e => setMail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={loading}
                        value='Envoyer'
                    >
                        Envoyer
                    </Button>
                    <Grid container>
                        <Grid item>
                        <Button onClick={handleOnClick} variant="body2">
                            {"Pas encore de compte ? Inscrivez vous"}
                        </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}