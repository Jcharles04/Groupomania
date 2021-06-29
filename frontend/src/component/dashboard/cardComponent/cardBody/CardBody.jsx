import {React, useState , useRef, useEffect} from 'react';
import CardBodyShow from './CardBodyShow';
import { useStyles } from '../../../UseStyles';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


export default function CardBody({id, Text, ImgUrl, editing, onModify, ReplyTo_id, level}) {
    const classes = useStyles();
    const [myText, setMyText] = useState(Text);
    const toggleMod = editing ? true : false; 
    const inputEl = useRef(null);
    const [mod, setMod] = useState(true);

    const configureImage = img => {
        if(ImgUrl !== ''){
            return 'http://localhost:8080/images/' + img
        }
    }

    useEffect(() => {
        if(editing) {
            inputEl.current.focus();
            setMod(true)
        }
    }, [editing]);

    const [img, setImg] = useState(configureImage(ImgUrl))
    
    function handleOnModifyCom(json){
        if (onModify) {
            onModify(json);
        }
    }
    
    function handleImageChange(data) {
        setMod(false)
        let newData = URL.createObjectURL(data);
        setImg(newData);
    }

    function revokeUrl(src) {
        if (src.startsWith('blob:')) {
            console.log("revoking", src);
            URL.revokeObjectURL(src);
        }
    }

    const showImage = ImgUrl && !level;
    const showNoImage = editing && !ImgUrl && !level;

    return (
        <>
            <>
                {showImage 
                    ?<CardMedia className={classes.media} image={img} atl="preview" onLoad={e => revokeUrl(e.target.src)}/>
                    :null
                }
                {showNoImage 
                    ?<CardMedia className={classes.media} hidden={mod} image={img} atl="preview" onLoad={e => revokeUrl(e.target.src)}/>
                    :null
                }
                {editing || Text 
                    ?<CardContent><Typography contentEditable={editing} suppressContentEditableWarning={editing} ref={inputEl} onBlur={e => setMyText(e.target.innerText)}>{myText}</Typography></CardContent>
                    :null
                }  
            </>
            <>
                {toggleMod 
                    ?<CardBodyShow id={id} Text={myText} ImgUrl={ImgUrl} ReplyTo_id={ReplyTo_id} onModifyCom={handleOnModifyCom} onImageChanged={handleImageChange}/>
                    : null
                }
            </>
        </>
    )
}