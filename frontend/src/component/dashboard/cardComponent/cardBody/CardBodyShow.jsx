import {React, useState} from 'react';
import fetchAuth from '../../../../auth/authUtil'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default function CardBodyShow({Text, ImgUrl, id, ReplyTo_id, onModifyCom, onImageChanged}) {

    const [file, setFile] = useState('');

    let value;
    const handleClick = () => {
        return value = 1
    }

    const handleMod = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('text', Text);
        formData.append('image', file);
        URL.revokeObjectURL(file);
        if(ReplyTo_id){
            formData.append('parent_id', ReplyTo_id)
        }
        formData.append('id', id);
        formData.append('value', value );
        console.log(formData);
        try {
            const response = await fetchAuth('http://localhost:8080/com/mod', {
                method: 'POST',
                body: formData
            });
            if(response.ok) {
                const json = await response.json();
                console.log(json);
                onModifyCom(json);
            } else {
                console.log('erreur serveur %s', response.status, response.statusText);
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }

    return (
        <div>
            <form className='inVisible' onSubmit={handleMod}  encType="multipart/form-data">
                <div className='buttonMod'>
                <Grid container direction="row" alignItems="center"  justify="space-around"> 
                    <Grid item xs={4}>   
                        <div className='img-field'>   
                            {ImgUrl
                                ?<div className='five'>
                                    <Button type="submit" id="deleteImage" name="deleteImage" onClick={handleClick} variant="contained">Supprimer image</Button>
                                </div>
                                : null
                            } 
                        </div>	
                        <input id="no-deleteImage" name="deleteImage" type="hidden" />
                        <input id="comId" name="comId" type="hidden" value={id}/>
                    </Grid>
                    {!ReplyTo_id
                        ?<Grid item xs={4}>
                            <Button forhtml="file" variant="contained" component="label">Changer d'image ?
                            <input  hidden type="file" name="file" className='upload'  accept="image/*" 
                                onChange={(event) => {
                                    setFile(event.target.files[0]);
                                    onImageChanged(event.target.files[0]);
                                }}
                            />
                            </Button>
                        </Grid>
                        
                        :null
                    }
                    <Grid item xs={4}>
                        <Button type="submit" id="submit" className='submitMod' value="Envoyer" variant="contained">Valider</Button>
                    </Grid>
                </Grid>
                </div>
            </form>
        </div>
            

    )
}