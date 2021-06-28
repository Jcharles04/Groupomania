import React, {useState} from 'react';
import { useStyles } from '../UseStyles';
import fetchAuth from '../../auth/authUtil';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';



export default function PostCard({onAddCom}){
    const [text, setText] = useState('');
    const [file, setFile] = useState('');
    const [img, setImg] = useState(true);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('text', text);
            formData.append('image', file);
            console.log(formData);
            console.log(text);
            const response = await fetchAuth('http://localhost:8080/com/', {
                method: 'POST',
                body: formData
            });
            if(response.ok) {
                const json = await response.json();
                console.log(json);
                setFile('');
                setText('');
                onAddCom();
            } else {
                console.log('erreur serveur %s', response.status, response.statusText);
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
        setImg(true);
        setLoading(false);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Grid container >
                        <Grid item>
                            <div className={classes.image}>
                                <img className="previewImg" alt="" src="" hidden={img} style={{width: 180}}/>
                            </div>
                        </Grid>
                        <Grid item xs={11} sm container justify="space-around">
                            <Grid item xs={1} className={classes.invisible}>
                            </Grid>
                            <Grid item xs container direction="column" spacing={1}>
                                <Grid item xs={9}>
                                    <Typography gutterBottom variant="subtitle1">
                                        <label htmlFor="text"></label>
                                        <Input fullWidth multiline rows={4} type="text" id="text" className="text" name='text'  minLength="0" maxLength="250" size="25" placeholder="Racontez nous votre journée..." value={text} onChange={e => setText(e.target.value)}/>
                                    </Typography>
                                </Grid>
                            </Grid>
                    
                            <Grid item xs={1} container direction="column"  justify="space-around" >
                                <Button forhtml="file" variant="contained" color='primary' component="label" title='fileButton' name="Ajouter fichier"><AttachFileIcon/>
                                    <input hidden type="file" name="file"  className='upload'  accept="image/*" 
                                        onChange={(event) => {
                                            setFile(event.target.files[0]);
                                            let preview = event.target.form.querySelector('.previewImg');
                                            preview.src = URL.createObjectURL(event.target.files[0]);
                                            preview.onload = () => {
                                                URL.revokeObjectURL(preview.src)
                                            }
                                            preview.hidden = setImg(false)
                                        }}
                                    />
                                </Button>
                                <Button type="submit" id="submit" className='button' value="Envoyer" variant="contained" title='sendButton' color="primary" disabled={loading}><SendIcon/></Button>
                            </Grid>
                            <Grid item xs={1} className={classes.invisible}>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
}     
