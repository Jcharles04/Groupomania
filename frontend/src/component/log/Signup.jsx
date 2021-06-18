import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../UseStyles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


/* -------------------------------------------------------------------------- */
/*                              Style Material Ui                             */
/* -------------------------------------------------------------------------- */


export default function Signup({onSwitch}) {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [service, setService] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8080/user/signup', {
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
                setError('Mail déjà utilisé ou Mot de passe incorrect (8 à 15 caractères, au moins 1 chiffre, au moins 1 caractère spécial)');
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
        setLoading(false);
    };

    function handleonClick() {
        onSwitch();
    };

    return (
        <Container component="main" maxWidth="sm" >
            <CssBaseline />
            <div className={classes.bg}>

                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h4">
                    Inscription
                </Typography>
                <Typography component="h5" variant="h6" color="secondary">
                    {error}
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
                        <Grid item xs={12} >
                            <FormControl variant="outlined" className={classes.formControl} required>
                                <InputLabel htmlFor="outlined-age-native-simple" >Service</InputLabel>
                                <Select
                                    native
                                    value={service}
                                    onChange={e => setService(e.target.value)}
                                    label="Service"
                                    inputProps={{
                                        name: 'Service',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >
                                <option aria-label="None" value="" />
                                <option value="Commercial">Commercial</option>
                                <option value="Comptabilité">Comptabilité</option>
                                <option value="Communication">Communication</option>
                                <option value="Ressources Humaines">Ressources Humaines</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Adresse Mail Professionnelle"
                                name="email"
                                autoComplete="email"
                                value={mail} 
                                onChange={e => setMail(e.target.value)}
                            />
                            <FormHelperText>Votre Email doit être unique</FormHelperText>
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
                            <FormHelperText>8 à 15 caractères, 1 chiffre, 1 caractère spécial</FormHelperText>
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
                            <Button onClick={handleonClick}>
                                {"Déjà un compte ? Connectez-vous"}
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            </div>
        </Container>
    );
}