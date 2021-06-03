import {React, useState} from 'react';
import CardComponant from '../Card';
import { useStyles } from '../UseStyles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import fetchAuth from '../../../auth/authUtil';
import CardContent from '@material-ui/core/CardContent';
import SendIcon from '@material-ui/icons/Send';


export default function CardReplies({
    id,
    replies,
    ReplyTo_id,
    onModify,
    onDeleteCom,
    level = +1
    }){

    const classes = useStyles();
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
                onModify(json);
                setReply('');
            } else {
                console.log('erreur serveur %s', response.status, response.statusText);
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
        setLoading(false);
    }

    const handleReload = function(json) {
        if (onModify)
            onModify(json);
    }

    const handleDeleteCom = function(cId) {
        if (onDeleteCom)
            onDeleteCom(cId);
    }

    return(
        <CardContent>
            {!ReplyTo_id
                ?<div>
                    <form onSubmit={handleResponse} encType="multipart/form-data">
                        <Input name="reply" className={classes.reply}  minLength="0" maxLength="250" size="25" placeholder="Envie de réagir ?" value={reply} onChange={e => setReply(e.target.value)} required/>
                        <input id="comId" name="comId" type="hidden" value={id}/>
                        <Button type="submit" id="submit" className='button' value="Envoyer" variant="contained" color='primary' disabled={loading}><SendIcon/></Button>
                    </form>
                </div>
                :null
            }   
            <div style={{margin:'0 0 0 100px'}} >
                {replies
                    ?<div className="replies" >
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
                            <CardComponant
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
                                level = {level}
                                Reload={handleReload}
                                DeleteCom= {handleDeleteCom}
                            />
                            ))}
                    </div>
                    :null
                }   
            </div>               
        </CardContent>
    )
}