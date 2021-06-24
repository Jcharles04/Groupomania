import React from 'react';
import fetchAuth from '../../../auth/authUtil';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

export default function Users({
    id,
    Name,
    FirstName,
    Service,
    Mail,
    Suppression,
    onModify
    }){

    let date = new Date(Suppression);
    let newDate = date.toLocaleString();

    function handleOnModify() {
        if(onModify){
            onModify();
        }
    }

    async function handleDeleteUser(e) {
        e.preventDefault();
        const uId = e.target.value;
        console.log(uId);
        const response = await fetchAuth('http://localhost:8080/user/sup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({uId : uId})
        });
        if(response.ok) {
            const json = await response.json();
            console.log(json);
            handleOnModify();
            alert('Utilisateur modifié !');
        } else {
            console.log('erreur serveur %s', response.status, response.statusText);
            alert("Erreur sur le serveur");
        }
    }

    async function handleBackUser(e) {
        e.preventDefault();
        const uId = e.target.value;
        console.log(uId);
        const response = await fetchAuth('http://localhost:8080/user/back', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({uId : uId})
        });
        if(response.ok) {
            const json = await response.json();
            console.log(json);
            handleOnModify();
            alert('Utilisateur modifié !');
        } else {
            console.log('erreur serveur %s', response.status, response.statusText);
            alert("Erreur sur le serveur");
        }
    }

    return (
        <TableRow key={id}>
            <TableCell align="center" component="th" scope="data">{id}</TableCell>
            <TableCell align="center" >{Name}</TableCell>
            <TableCell align="center">{FirstName}</TableCell>
            <TableCell align="center">{Service}</TableCell>
            <TableCell align="center">{Mail}</TableCell>
            {Suppression 
                ?<>
                    <TableCell><Button onClick={handleBackUser} variant="contained" value={id} align="center">O</Button></TableCell>
                    <TableCell align="center">{newDate}</TableCell>
                </>
                :<>
                    <TableCell><Button onClick={handleDeleteUser} variant="contained" value={id} align="center">X</Button></TableCell>
                    <TableCell align="center">/</TableCell>
                </>
             }
        </TableRow> 
        // <tr>
        //     <td>{id}</td>
        //     <td>{Name}</td>
        //     <td>{FirstName}</td>
        //     <td>{Service}</td>
        //     <td>{Mail}</td>

        //     {Suppression 
        //         ?<>
        //             <td><Button onClick={handleBackUser} value={id}>O</Button></td>
        //             <td>{newDate}</td>
        //         </>
        //         :<>
        //             <td><Button onClick={handleDeleteUser} value={id}>X</Button></td>
        //             <td>/</td>
        //         </>
        //     }
        // </tr> 
    )
}