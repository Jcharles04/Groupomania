import {React, useState} from 'react'; 
import fetchAuth from '../../auth/authUtil';
 
export default function Card({
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
    User_id  }){

    const admin = localStorage.admin == 1;
    const user = localStorage.id;
    const isMyCom = (user == User_id);
    const notVerify = checkedByAdmin == null;
    const [show, setShow] = useState(false);
    const [response, setResponse] = useState(false);
    const [reply, setReply] = useState('');
    const [mod, setMod] = useState(false);
    const [file, setFile] = useState('');
    const [img, setImg] = useState(true);

    const handleMod = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('text', Text);
        formData.append('image', file);
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
        setMod(false);
    }
    

    const handleDelete = async (e) => {
        e.preventDefault();
        const cId = e.target.comId.value;
        const formData = new FormData();
        formData.append('user', user);
        formData.append('cId', cId);
        const response = await fetchAuth('http://localhost:8080/com/del', {
            method: 'POST',
            body: formData
        });
        if(response.ok) {
            const json = await response.json();
            console.log(json);
            alert('Commentaire supprimé !');
        } else {
            console.log('erreur serveur %s', response.status, response.statusText);
        }
    }

    const handleLike = async (e) => {
        e.preventDefault();
        const cId = e.target.comId.value;
        const like = e.target.likeValue.value;
        const formData = new FormData();
        formData.append('user', user);
        formData.append('cId', cId);
        formData.append('like', like);
        const response = await fetchAuth('http://localhost:8080/com/like', {
            method: 'POST',
            body: formData
        });
        if(response.ok) {
            const json = await response.json();
            console.log(json);
            alert(' !')
        } else {
            console.log('erreur serveur %s', response.status, response.statusText);
        }
    }
    

    function handleShow(e) {
        e.preventDefault();
        if(show == false){
            setShow(true);
            setMod(true);
        } else {
            setShow(false);
            setMod(false);
        }
    }

    const handleResponse = async (e) => {
        e.preventDefault();
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
            alert('Réponse envoyée !')
        } else {
            console.log('erreur serveur %s', response.status, response.statusText);
        }
    }

    function handleReplies(e) {
        e.preventDefault();
        if(response == false){
            setResponse(true);
        } else {
            setResponse(false)
        }
    }

    return(
        <div className="card level-0 wrapper" key={id} id={'comment-' +id}>
            <div className='head'>

                <div className='zero'>
                        <div className='ProfilPicture'></div>
                </div>

                <div className='one'>
                    <div className='name'>{FirstName}</div>
                    <div className='date'>{CreationDate}</div>
                </div>

                <div className='two'>
                    <div className='service'>Service :</div>
                    <div className='descService '>{Service}</div>
                </div>

                <div className='three'>
                    {isMyCom 
                        ?<form className='mod' onClick={handleShow}>
                                <input id="comId" name="comId" type="hidden" value={id}/>
                                <button className='button' type='submit' value='Modifier'><i className="fas fa-ellipsis-h">Mod</i></button>
                            </form> 
                        : null
                    }
                    

                    {isMyCom || admin 
                        ? <form className='del' onSubmit={handleDelete}>
                                <input id="comId" name="comId" type="hidden" value={id}/>
                                <input id="UserId" name="UserId" type="hidden" value={User_id}/>
                                <button className='button' type='submit' value='Delete'><i className="fas fa-trash-alt"></i>Del</button>
                            </form>
                        : null
                    }
                      
                    {admin && notVerify
                        ?<div className='check five'><i className="fas fa-flag"></i>X</div>
                        : null
                    }
                </div>
            </div>
        

            <div className='main'>
                <div className='visible'>
                    {ImgUrl 
                        ?<div className='img'>
                            <img  id='img' src={ImgUrl} alt={ImgUrl}/>
                        </div>
                        : null   
                    }

                    {Text
                        ?<div className='text' contentEditable={mod} >{Text}</div>
                        :<div className='text' contentEditable={mod} type='hidden'>{Text}</div>           
                    }
                </div>

                {show 
                    ?<form className='inVisible' onClick={handleMod}  encType="multipart/form-data">
                        <div className='buttonMod'>    
                            <div className='img-field'>   
                                {ImgUrl
                                    ?<div className='five'>
                                        <button type="submit" id="deleteImage" name="deleteImage" value="1">Supprimer image</button>
                                    </div>
                                    : null
                                } 
                            </div>	
                                <input id="deleteImage" name="deleteImage" type="hidden" value="0"/>
                                <input id="comId" name="comId" type="hidden" value={id}/>
                            <div className='six'>
                                <label forhtml="file">Changer d'image ?</label>
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
                            </div>
                            <div className='seven'>
                                <button type="submit" id="submit" className='submitMod' value="Envoyer">Valider</button>
                            </div>
                        </div>
                    </form>
                    : null
                }
            </div>


            <div className='bottom'>
                <div className='nbOfLike twelve'><i className="far fa-thumbs-up"></i>{likes}</div>
                    {replies
                            ?<button onClick={handleReplies} className='toggle nbOfResponse eleven'>
                                {nbOfResponse}
                            </button>
                            : null
                    }   
            </div>
            
            <div className='footer'>
                {myLike
                    ?<form className='like twelve' onSubmit={handleLike}>
                        <input id="comId" name="comId" type="hidden" value={id}/>
                        <input id="likeValue" name="likeValue" type="hidden" value="1"/>
                        <button className='button submitDisLike' type='submit' value='Vous avez liké'>J'ai liké</button>
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
            {response  
                ?<div className="show" type='hidden'>
                    {!ReplyTo_id
                            ?<div className='responseTo' >
                                <form onSubmit={handleResponse} encType="multipart/form-data">
                                    <input type="reply" id="reply" name="reply"  minLength="0" maxLength="250" size="25" placeholder="Envie de réagir ?" value={reply} onChange={e => setReply(e.target.value)} required/>
                                    <input id="comId" name="comId" type="hidden" value={id}/>
                                    <button type="submit" id="submit" className='button' value="Envoyer">Envoyez</button>
                                </form>
                            </div>
                            :null
                    }
                                 
                    <div className='responses card level-1'>
                            {replies
                                ?<div className="replies ">
                                    {replies.map(({
                                        id,
                                        checkedByAdmin, 
                                        CreationDate,
                                        FirstName,
                                        ImgUrl,
                                        likes,
                                        myLikes,
                                        nbOfResponse,
                                        replies,
                                        ReplyTo_id,
                                        Service,
                                        Text,
                                        User_id}) => (
                                        <Card key={id}
                                        id={id}
                                        checkedByAdmin={checkedByAdmin}
                                        CreationDate={CreationDate}
                                        FirstName={FirstName}
                                        ImgUrl={ImgUrl}
                                        likes={likes}
                                        mylikes={myLikes}
                                        nbOfResponse={nbOfResponse}
                                        replies={replies}
                                        ReplyTo_id={ReplyTo_id}
                                        Service={Service}
                                        Text={Text}
                                        User_id={User_id}
                                    
                                        />
                                        ))}
                                </div>
                                :null
                            }
                    </div>
                </div>
                :null
            }
        </div>                     
    )
}               

