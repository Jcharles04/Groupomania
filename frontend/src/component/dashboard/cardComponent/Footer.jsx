import {React, useState} from 'react';
import fetchAuth from '../../../auth/authUtil';

export default function Footer({myLike, likes, id, ReplyTo_id, onModify, setResponse}) {

    const user = sessionStorage.id;
    const [loading, setLoading] = useState(false);

    const handleLike = async (e) => {
        e.preventDefault();
        setLoading(true);
        const cId = e.target.comId.value;
        const like = e.target.likeValue.value;
        const formData = new FormData();
        formData.append('user', user);
        formData.append('cId', cId);
        formData.append('like', like);
        try {
            const response = await fetchAuth('http://localhost:8080/com/like', {
                method: 'POST',
                body: formData
            });
            if(response.ok) {
                const json = await response.json();
                console.log(json);
                onModify(json);
                console.log('Like pris en compte');
            } else {
                console.log('erreur serveur %s', response.status, response.statusText);
                alert("Erreur sur le serveur");
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
        setLoading(false);
    }

    function handleReplies(e) {
        e.preventDefault();
        setResponse();
    }

    return (
        <div className='footer'>
            {myLike
                ?<form className='like twelve' onSubmit={handleLike}>
                    <input id="comId" name="comId" type="hidden" value={id}/>
                    <input id="likeValue" name="likeValue" type="hidden" value="1"/>
                    <button className='button submitDisLike' disabled={loading} type='submit' value='Vous avez liké'>J'ai liké</button>
                </form>
                
                :<form className='like twelve' onSubmit={handleLike}>
                    <input id="comId" name="comId" type="hidden" value={id}/>
                    <input id="likeValue" name="likeValue" type="hidden" value="0"/>
                    <button  className='button submitLike' type='submit' value={likes}>J'aime</button>
                </form>
            }

            {!ReplyTo_id
                ?<button onClick={handleReplies} className='toggle response thirteen'><i className="fas fa-reply"></i>Rep</button>
                : null
            }   
        </div>      
    ) 
}