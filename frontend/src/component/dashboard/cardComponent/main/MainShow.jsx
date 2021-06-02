import {React, useState} from 'react';
import fetchAuth from '../../../../auth/authUtil';

export default function MainShow({Text, ImgUrl, id, ReplyTo_id, onModifyCom, onImageChanged}) {

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
                alert('Modification apportée !');
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
        <form className='inVisible' onSubmit={handleMod}  encType="multipart/form-data">
            <div className='buttonMod'>    
                <div className='img-field'>   
                    {ImgUrl
                        ?<div className='five'>
                            <button type="submit" id="deleteImage" name="deleteImage" onClick={handleClick}>Supprimer image</button>
                        </div>
                        : null
                    } 
                </div>	
                    <input id="no-deleteImage" name="deleteImage" type="hidden" />
                    <input id="comId" name="comId" type="hidden" value={id}/>
                {!ReplyTo_id
                    ?<div className='six'>
                        <label forhtml="file">Changer d'image ?</label>
                        <input type="file" name="file" className='upload'  accept="image/*" 
                            onChange={(event) => {
                                setFile(event.target.files[0]);
                                onImageChanged(event.target.files[0]);
                            }}
                        /> 
                    </div>
                    :null
                }
                <div className='seven'>
                    <button type="submit" id="submit" className='submitMod' value="Envoyer">Valider</button>
                </div>
            </div>
        </form>
    )
}