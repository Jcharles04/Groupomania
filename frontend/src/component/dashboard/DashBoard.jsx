import {React, useState} from 'react'; 
import Header from './Header';
import Wall from './Wall';
import Admin from '../dashboard/admin/Admin';

// import fetchAuth from '../../auth/authUtil';

export default function DashBoard() {

    
    const [isAdmin, setIsAdmin] = useState(false);

    function handleAdmin() {
        if(isAdmin === false){
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }

    // const ImLog = async () => {
    //     try{
    //         fetchAuth('http://localhost:8080/user/ImLog', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type':'application/json'
    //             },
    //             body: JSON.stringify()
    //         })
    //             if(ImLog.ok) {
    //                 console.log(ImLog)
    //             } else {
    //                 alert("Vous ne vous êtes pas connecté correctement");
    //                     sessionStorage.clear();
    //                     window.location.reload();
    //             }
    //     } catch (error) {
    //         alert(error);
    //         console.log(error);
    //     }
    // }

    // useEffect(()=>{
    //      ImLog()
    // },[])
    

    return (
        <div>
            <Header onAdmin={handleAdmin}/>
            {isAdmin  ? <Admin/> 
                    : <Wall/>
            }  
        </div>
    )
}