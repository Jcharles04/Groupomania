import {React, useState} from 'react'; 
import { useStyles } from '../UseStyles';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import CardHead from "./cardComponent/CardHeader";
import CardBody from "./cardComponent/cardBody/CardBody";
import CardFooter from "./cardComponent/CardFooter";
import CardReplies from "./cardComponent/CardReplies";


export default function CardComponant({
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
    Reload,
    DeleteCom,
    level = 0,
    
    }) {
        
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    /* -------------------------------------------------------------------------- */
    /*                            Logic pre Material UI                           */
    /* -------------------------------------------------------------------------- */

    const [editing, setEditing] = useState(false);


    function handleReload(json){
        if(Reload)(
            Reload(json)
        )
        setEditing(false);
    };

    function handleDeleteCom(cId) {
        if(DeleteCom) (
            DeleteCom(cId)
        )
    };

    function handleShow() {
        setEditing(!editing);
    };

    return (
        <Card className={`${classes.root}  ${"wrapper card level-"+level}`}  key={id} id={'comment-'+id} >
            <div className={classes.MainCard}>
                <CardHead id={id} checkedByAdmin={checkedByAdmin} CreationDate={CreationDate} ReplyTo_id={ReplyTo_id} FirstName={FirstName} Service={Service} User_id={User_id} onModify={handleReload} onModClicked={handleShow} onDeleteCom={handleDeleteCom}/>
                <CardBody id={id} Text={Text} ImgUrl={ImgUrl} editing={editing} ReplyTo_id={ReplyTo_id} onModify={handleReload} level={level}/>
                <CardFooter aria-expanded={expanded} myLike={myLike} likes={likes} id={id} ReplyTo_id={ReplyTo_id} nbOfResponse={nbOfResponse} replies={replies} onReply={handleExpandClick} onModify={handleReload}  setResponse={handleExpandClick}/>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardReplies 
                    key={id}
                    id={id}
                    checkedByAdmin={checkedByAdmin}
                    CreationDate={CreationDate}
                    FirstName={FirstName}
                    likes={likes}
                    myLike={myLike}
                    replies={replies}
                    ReplyTo_id={ReplyTo_id}
                    Service={Service}
                    Text={Text}
                    User_id={User_id}
                    onModify={handleReload}
                    onDeleteCom={handleDeleteCom}
                />
            </Collapse>
        </Card>
    );
}
