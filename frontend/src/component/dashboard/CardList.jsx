import fetchAuth from '../../auth/authUtil';
import React from 'react';
import {useState, useEffect} from 'react';
import '../../style.css';
import Card from './Card';

export default function CardList() {

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
    
    
    

    return (
        <div className="container">
            {
                {data} && data.length>0 && data.map(({id,
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
                    User_id})=>
                    
                    <Card 
                        key={id}
                        id={id}
                        checkedByAdmin={checkedByAdmin}
                        CreationDate={CreationDate}
                        FirstName={FirstName}
                        ImgUrl={ImgUrl}
                        likes={likes}
                        myLike={myLike}
                        nbOfResponse={nbOfResponse}
                        replies={replies}
                        ReplyTo_id={ReplyTo_id}
                        Service={Service}
                        Text={Text}
                        User_id={User_id}
                    />
                )
            }
        </div>
    );
}
