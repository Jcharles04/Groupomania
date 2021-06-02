import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import fetchAuth from '../../auth/authUtil';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';
import {useState} from 'react';



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1200,
        margin:'0 auto 25px auto'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    image: {
        width: 200,
        height: 150,
    },
    img: {
        margin: 'auto',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    post: {
        height: 'auto',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
}));

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
                alert('Commentaire envoyé !');
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
    }

  return (
 
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Grid container  >
                        <Grid item>
                            <div className={classes.image}>
                                    <img className="previewImg" alt="" src="" hidden={img} style={{width: 180}}/>
                            </div>
                        </Grid>
                        <Grid item xs={10} sm container justify="space-around">
                            <Grid item xs container direction="column" spacing={1}>
                                <Grid item xs={9}>
                                    <Typography gutterBottom variant="subtitle1">
                                    <label htmlFor="text"></label>
                                    <Input fullWidth multiline rows={4} type="text" id="text" className="text" name='text'  minLength="0" maxLength="250" size="25" placeholder="Racontez nous votre journée..." value={text} onChange={e => setText(e.target.value)}/>
                                    </Typography>
                                </Grid>
                            </Grid>
                    
                            <Grid item xs={1} container direction="column"  justify="space-around" >
                                <Button forhtml="file" variant="contained" component="label"><AttachFileIcon/>
                                    <input hidden type="file" name="file" className='upload'  accept="image/*" 
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
                                <Button type="submit" id="submit" className='button' value="Envoyer" variant="contained" disabled={loading}><SendIcon/></Button>
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
