import {React, useState , useRef, useEffect} from 'react';
import MainShow from './MainShow';

export default function Main({id, Text, ImgUrl, editing, onModify, ReplyTo_id, level}) {

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
        console.log(data);
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
        <div className='main'>
            <div className='visible'>
                {showImage 
                    ?<div className='img'><img  id='img' src={img} alt="preview" onLoad={e => revokeUrl(e.target.src)}/></div>
                    :null
                }
                {showNoImage
                    ?<div className='img' hidden={mod}><img  id='img' src={img} alt="preview" onLoad={e => revokeUrl(e.target.src)} /></div>
                    :null
                }
                {editing || Text 
                    ?<div className='text' contentEditable={editing} suppressContentEditableWarning={editing} ref={inputEl} onBlur={e => setMyText(e.target.innerText)}>{myText}</div>
                    : null
                }
            </div>

            {toggleMod 
                ?<MainShow id={id} Text={myText} ImgUrl={ImgUrl} ReplyTo_id={ReplyTo_id} onModifyCom={handleOnModifyCom} onImageChanged={handleImageChange}/>
                : null
            }
        </div>
    )
}
