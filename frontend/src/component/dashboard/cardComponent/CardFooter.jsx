import {React, useState} from 'react';
import fetchAuth from '../../../auth/authUtil';
import { useStyles } from '../../UseStyles';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Badge from '@material-ui/core/Badge';
import ForumIcon from '@material-ui/icons/Forum';



export default function CardFooter({myLike, likes, id, ReplyTo_id, setResponse, onModify, onReply, nbOfResponse}) {

    const classes = useStyles();
    const user = sessionStorage.id;
    const [loading, setLoading] = useState(false);

    const handleLike = async (e) => {
        e.preventDefault();
        setLoading(true);
        const cId = e.target.comId.value;
        const like = e.target.likeValue.value;
        const formData = new FormData();
        if(ReplyTo_id){
            formData.append('parent_id', ReplyTo_id)
        }
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
                onModify(json);
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

    const handleReply = () => {
        onReply()
        setResponse();
    };

    return (
        <CardActions disableSpacing>
            {myLike
                ?<form className='like twelve' onSubmit={handleLike}>
                    <input id="comId" name="comId" type="hidden" value={id}/>
                    <input id="likeValue" name="likeValue" type="hidden" value="1"/>
                    <IconButton color="secondary" aria-label="add to favorites" disabled={loading} type='submit' value='Vous avez liké'>
                    <Badge badgeContent={likes} color="primary"><FavoriteIcon /></Badge>
                    </IconButton>
                </form>
                
                :<form className='like twelve' onSubmit={handleLike}>
                    <input id="comId" name="comId" type="hidden" value={id}/>
                    <input id="likeValue" name="likeValue" type="hidden" value="0"/>
                    <IconButton aria-label="add to favorites" disabled={loading} className='button submitLike' type='submit' value={likes}>
                    <Badge badgeContent={likes} color="primary"><FavoriteIcon /></Badge>
                    </IconButton>
                </form>
            }
            {!ReplyTo_id
                ?<IconButton onClick={handleReply}
                className={classes.right}
                aria-label="Réponses"
                >
                <Badge badgeContent={nbOfResponse} color="primary"><ForumIcon/></Badge>
                </IconButton>
                : null
            } 
        </CardActions>
    ); 
}

