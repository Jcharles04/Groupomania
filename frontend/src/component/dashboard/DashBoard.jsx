import {React, useState, useEffect} from 'react'; 
import Header from './Header';
import Wall from './Wall';
import Admin from '../dashboard/admin/Admin';

import fetchAuth from '../../auth/authUtil';

export default function DashBoard() {

    
    const [isAdmin, setIsAdmin] = useState(false);
    const [log, setLog] = useState(false)

    function handleAdmin() {
        if(isAdmin === false){
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }

    useEffect(()=>{
        const ImLog = async () => {
            try{
                const response = await fetchAuth('http://localhost:8080/user/ImLog', {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify()
                })
                    if(response.ok) {
                        setLog(true)
                    } else {
                        alert("Vous ne vous êtes pas connecté correctement");
                            sessionStorage.clear();
                            window.location.reload();
                    }
            } catch (error) {
                alert(error);
                console.log(error);
            }
        };
    ImLog()
    }, [])
    

    return (
        <div disabled={!log}>
            <Header onAdmin={handleAdmin}/>
            {isAdmin  ? <Admin/> 
                    : <Wall/>
            }  
        </div>
    )
}
