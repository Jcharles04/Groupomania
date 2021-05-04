import fetchAuth from '../../auth/authUtil';
import React from 'react';
import {useState, useEffect} from 'react';
import '../../style.css';

export default function Card() {

    const [data, setData] = useState([])

    function getAllComs() {
        fetchAuth('http://localhost:8080/com/')
            .then(function(response){
                console.log(response)
                return response.json();
            })
            .then(function(myJson) {
                console.log(myJson);
                setData(myJson)
            })
            .catch(error => {                                                  
                alert('Error API!');
                console.log(error);
            });
    }

    useEffect(()=>{
        getAllComs()
      },[])
    
    function handleChange(e) {
        e.preventDefault();
        const comId = e.target.form.cId.value;
        console.log(comId);
        fetchAuth('http://localhost:8080/com/')
            .then(function(response){
                console.log(response)
                return response.json();
            })
            .catch(error => {                                                  
                alert('Error API!');
                console.log(error);
            })
    }
    

    function handleDelete(e) {
        e.preventDefault();
    }

    function handleLike(e) {
        e.preventDefault();
    }

    function handleResponse(e) {
        e.preventDefault();
    }

    return (
        <div className="container">
            {
                {data} && data.length>0 && data.map((item)=> 
                    <div className="card" key={item.id} id={'comment-' + item.id}>
                        <form className="cardDetails">
                            <input type='hidden' name='cId' value={item.id} />
                            <p>{item.User_id}</p><p>{item.DateCreation}</p>
                            <button onClick={handleChange}>Mod</button>
                            <button onClick={handleDelete}>X</button>
                            <img src={item.ImgUrl} alt='ahah'></img>
                            <p>{item.Text}</p> <p>{item.Like}</p>
                            <button onClick={handleLike}>L</button>
                            <button onClick={handleResponse}>Rép</button>
                        </form>
                    </div>
                )
            }
        </div>
    );
}
