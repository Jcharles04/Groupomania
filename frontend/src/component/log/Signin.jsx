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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Signin({onSwitch}) {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [service, setService] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
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
                alert('Compte créé');
                window.location.reload();
                //return; //Quit function to avoid changing state when <Login> isn't shown anymore
            } else {
                console.log('erreur serveur %s', response.status, response.statusText);
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
        setLoading(false);
    }

    function handleonClick() {
        onSwitch();
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Inscription
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="Prénom"
                            autoFocus
                            value={firstname} 
                            onChange={e => setFirstname(e.target.value)}
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Nom"
                            name="lastName"
                            autoComplete="lname"
                            value={name} 
                            onChange={e => setName(e.target.value)}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="Service"
                            label="Service"
                            type="text"
                            id="text"
                            autoComplete="current-service"
                            value={service} 
                            onChange={e => setService(e.target.value)}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Adresse Mail"
                            name="email"
                            autoComplete="email"
                            value={mail} 
                            onChange={e => setMail(e.target.value)}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
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
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={loading}
                    >
                        Inscrivez-vous
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                        <Button onClick={handleonClick} variant="body2">
                            Déjà un compte ? Connectez-vous
                        </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}