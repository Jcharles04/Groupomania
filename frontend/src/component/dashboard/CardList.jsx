import fetchAuth from '../../auth/authUtil';
import React, { useCallback } from 'react';
import {useState, useEffect} from 'react';
import CardComponant from './Card';


export default function CardList({ reloadPage}) {

    const [data, setData] = useState([]);
    const reload = reloadPage ? true : false;
    const [isFetching, setIsFetching] = useState(false);
    const [newComs, setNewComs] = useState(true);

    /* -------------------------------------------------------------------------- */
    /*                                GET ALL COMS                                */
    /* -------------------------------------------------------------------------- */
    
    function getAllComs() {
        try {
            fetchAuth('http://localhost:8080/com/')
                .then(function(response){
                    console.log(response)
                    return response.json();
                })
                .then(function(myJson) {
                    console.log(myJson);
                    setData(myJson)
                    setNewComs(true)
                })
                .catch(error => {                                                  
                    alert('Error API!');
                    console.log(error);
                });
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }

    useEffect(()=>{
        getAllComs()
    },[reload]);


    /* -------------------------------------------------------------------------- */
    /*                               Change One Item                              */
    /* -------------------------------------------------------------------------- */

    
    function handleReloadCom(json){
        let newCom = json[0];
        const comIndex = data.findIndex(com => com.id === newCom.id);
        const dataCopy  = [...data];
        dataCopy[comIndex] = newCom;
        setData(dataCopy)
        
    }

    function handleDeleteCom(cId){
        console.log(cId);
        cId = parseInt(cId);
        const comIndex = data.findIndex(com => com.id === cId);
        console.log(comIndex);
        const dataCopy  = [...data];
        dataCopy.splice(comIndex, 1);
        setData(dataCopy);
    }



    /* -------------------------------------------------------------------------- */
    /*                               FETCH MORE COMS                              */
    /* -------------------------------------------------------------------------- */


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setIsFetching(newComs);
    }

    const fetchMoreComs = useCallback(() => {
        try {
            if(newComs === true) {
                let container = document.getElementById('container');
                let lastCom = container.lastChild;
                let result = lastCom.id;
                let id = result.slice(8);
                fetchAuth('http://localhost:8080/com/moreCom/' + id)
                    .then(function(response){
                        console.log(response)
                        return response.json();
                    })
                    .then(function(myJson) {
                        console.log(myJson);
                        if(myJson.length > 0) {
                            const newData = [...data, ...myJson]
                            setData(newData);
                        } else {
                            setNewComs(false);
                        }
                    })
                    .catch(error => {                                                  
                        alert('Error API!');
                        console.log(error);
                    });
            } 
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }, [data, newComs]);

    useEffect(() => {
        if (!isFetching) return;
        fetchMoreComs();
        setIsFetching(false);
    }, [isFetching, fetchMoreComs]);

    return (
        <div className='container' id='container' style={{justifyContent:'center'}}>
            {
                {data} && data.length>0 && data.map(({
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
                    User_id
                    })=>
                    
                    <CardComponant 
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
                        Reload={handleReloadCom}
                        DeleteCom={handleDeleteCom}
                    />
                )
            }
        </div>
    );
}
