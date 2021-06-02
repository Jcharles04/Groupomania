import {React, useState} from "react";
import fetchAuth from '../../../auth/authUtil';

export default function Head({id, checkedByAdmin, CreationDate, FirstName, Service, User_id, onModClicked, onDeleteCom}) {

    const admin = sessionStorage.admin === '1';
    let user = sessionStorage.id;
    user = parseInt(user);
    const isMyCom = (user === User_id);
    const notVerify = checkedByAdmin === null;
    const [loading, setLoading] = useState(false);

    let date = new Date(CreationDate);
    let newDate = date.toLocaleString();

    function handleClick(e) {
        e.preventDefault();
        onModClicked(e);
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
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
                onDeleteCom(cId);
            } else {
                console.log('erreur serveur %s', response.status, response.statusText);
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
        setLoading(false)
    }

    return (
            <div className='head'>

                <div className='zero'>
                        <div className='ProfilPicture'></div>
                </div>

                <div className='one'>
                    <div className='name'>{FirstName}</div>
                    <div className='date'>Le {newDate}</div>
                </div>

                <div className='two'>
                    <div className='service'>Service :</div>
                    <div className='descService '>{Service}</div>
                </div>

                <div className='three'>
                    {isMyCom 
                        ?<button className='button' onClick={handleClick} value='Modifier' disabled={loading}><i className="fas fa-ellipsis-h">Mod</i></button>
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
    )
}