import {React, useEffect, useState , useCallback } from 'react';
import fetchAuth from '../../../auth/authUtil';
import Button from '@material-ui/core/Button';

export default function DeleteComs() {

    const [data, setData] = useState([]);
    const [comId, setComId] = useState([]);
    let idList = comId;

    const getOldComs =  useCallback(() => {
        try {
            fetchAuth('http://localhost:8080/com/old')
                .then(function(response){
                    console.log(response)
                    return response.json();
                })
                .then(function(myJson) {
                    console.log(myJson);
                    setData(myJson);
                    myJson.forEach(raw => idList.push(raw.id));
                    setComId(idList);
                })
                .catch(error => {                                                  
                    alert('Error API!');
                    console.log(error);
                });
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }, [idList]);

    useEffect(()=>{
        getOldComs()
    }, [getOldComs]);

    async function handleClick(e) {
        e.preventDefault();
        try {
            const response = await fetchAuth('http://localhost:8080/com/delOld', {
                method: 'POST',
                body: JSON.stringify(comId), 
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(response.ok) {
                const json = await response.json();
                console.log(json);
                alert('Commentaires supprimés définitivement !');
            } else {
                console.log('erreur serveur %s', response.status, response.statusText);
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }
    


    return (
        <div className='container'>
            <div> {data.length} commentaires sont isolés et attendent d'être supprimé</div>
            <Button onClick={handleClick} variant="contained">Supprimer définitivement</Button>
        </div>
    )
}