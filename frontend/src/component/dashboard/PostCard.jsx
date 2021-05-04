import React from 'react';
import {useState} from 'react';
import fetchAuth from '../../auth/authUtil';
import '../../style.css';


export default function PostCard(){

    const [text, setText] = useState('');
    const [file, setFile] = useState('');
    const [img, setImg] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            alert('Commentaire envoyé !')
        } else {
            console.log('erreur serveur %s', response.status, response.statusText);
        }
        setImg(true);
    }

    return (
        <section>
				<div id="postCard">
					<form onSubmit={handleSubmit} encType="multipart/form-data">
						<label htmlFor="text">Exprimez-vous !</label>
						<input type="text" id="text" className="text" name='text'  minLength="0" maxLength="250" size="25" placeholder="Racontez nous votre journée..." value={text} onChange={e => setText(e.target.value)}/>
						<label htmlFor="file">Une image à partager?</label>
						<input type="file" name="file" className='upload'  accept="image/*" 
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
						<img className="previewImg"  src="" hidden={img} alt='preview'/>
						<button type="submit" id="submit" className='button' value="Envoyer">Envoyez</button>
					</form>
				</div>
		</section>
    )
}

