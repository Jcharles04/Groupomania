import {React, useState} from 'react'; 
import Head from "./cardComponent/Head";
import Main from "./cardComponent/main/Main";
import Bottom from "./cardComponent/Bottom";
import Footer from "./cardComponent/Footer";
import Replies from './cardComponent/Replies';


export default function Card({
    id,
    checkedByAdmin, 
    CreationDate,
    Name,
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

    const [response, setResponse] = useState(false);
    const [editing, setEditing] = useState(false);


    function handleReload(json){
        if(Reload) (
            Reload(json)
        )
        setEditing(false);
    }

    function handleDeleteCom(cId) {
        if(DeleteCom) (
            DeleteCom(cId)
        )
    }

    function handleReplies() {
        if(response === false){
            setResponse(true);
        } else {
            setResponse(false)
        }
    }
 
    function handleShow() {
        setEditing(!editing);
    }

    // console.log('Card render', id);
    return (
        
        <div className={"wrapper card level-"+level} key={id} id={'comment-'+id}>
            <Head id={id} checkedByAdmin={checkedByAdmin} CreationDate={CreationDate} Name={Name} FirstName={FirstName} Service={Service} User_id={User_id} onModClicked={handleShow} onDeleteCom={handleDeleteCom}/>
            <Main id={id} Text={Text} ImgUrl={ImgUrl} editing={editing} ReplyTo_id={ReplyTo_id} onModify={handleReload} level={level}/>
            <Bottom likes={likes} nbOfResponse={nbOfResponse} replies={replies} response={response} setResponse={handleReplies}/>
            <Footer myLike={myLike} likes={likes} id={id} ReplyTo_id={ReplyTo_id} onModify={handleReload} response={response} setResponse={handleReplies}/>
            
            {response
                ?<Replies 
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
                    onLoad={handleReload}/>
                :null
            }
            

            </div>
        
    )
}