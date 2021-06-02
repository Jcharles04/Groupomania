import {React, useState} from 'react';
import Card from '../Card';
import fetchAuth from '../../../auth/authUtil';

export default function Replies({
    id,
    checkedByAdmin, 
    CreationDate,
    FirstName,
    ImgUrl,
    likes,
    myLike,
    nbOfResponse,
    replies,
    ReplyTo_id,
    Service,
    Text,
    User_id,
    onLoad,
    level = +1
    }){

    const [reply, setReply] = useState('');
    const [loading, setLoading] = useState(false);

    if(replies.length === 0) {
        replies = false
    }

    const handleResponse = async (e) => {
        e.preventDefault();
        setLoading(true);        
        try {
            const formData = new FormData();
            const cId = e.target.comId.value;
            formData.append('text', reply);
            formData.append('ReplyTo_id', cId);
            const response = await fetchAuth('http://localhost:8080/com/reply', {
                method: 'POST',
                body: formData
            });
            if(response.ok) {
                const json = await response.json();
                console.log(json);
                alert('Réponse envoyée !');
                onLoad(json);
            } else {
                console.log('erreur serveur %s', response.status, response.statusText);
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
        setLoading(false);
    }

    const handleReplyChanged = () => {
        onLoad();
    }


    return(
        <div className="show" type='hidden'>
            {!ReplyTo_id
                    ?<div className='responseTo' >
                        <form onSubmit={handleResponse} encType="multipart/form-data">
                            <input type="reply" id="reply" name="reply"  minLength="0" maxLength="250" size="25" placeholder="Envie de réagir ?" value={reply} onChange={e => setReply(e.target.value)} required/>
                            <input id="comId" name="comId" type="hidden" value={id}/>
                            <button type="submit" id="submit" className='button' value="Envoyer" disabled={loading}>Envoyez</button>
                        </form>
                    </div>
                    :null
            }   
                    
            {replies
                ?<div className="replies">
                    {replies.map(({
                        id,
                        checkedByAdmin, 
                        CreationDate,
                        FirstName,
                        likes,
                        myLike,
                        ReplyTo_id,
                        Service,
                        Text,
                        User_id,
                    }) => (
                        <Card 
                            key={id}
                            id={id}
                            checkedByAdmin={checkedByAdmin}
                            CreationDate={CreationDate}
                            FirstName={FirstName}
                            likes={likes}
                            myLike={myLike}
                            ReplyTo_id={ReplyTo_id}
                            Service={Service}
                            Text={Text}
                            User_id={User_id}
                            Reload={handleReplyChanged}
                            level = {level}
                        />
                        ))}
                </div>
                :null
            }
        </div>         
    )
}