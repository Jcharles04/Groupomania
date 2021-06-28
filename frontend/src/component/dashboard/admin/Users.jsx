import React from 'react';
import fetchAuth from '../../../auth/authUtil';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import WarningIcon from '@material-ui/icons/Warning';

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
        const uId = e.currentTarget.value;
        const response = await fetchAuth('http://localhost:8080/user/sup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({uId : uId})
        });
        if(response.ok) {
            const json = await response.json();
            console.log('json :',json);
            handleOnModify();
            console.log('Utilisateur supprimé !');
        } else {
            console.log('erreur serveur %s', response.status, response.statusText);
            alert("Erreur sur le serveur");
        }
    };

    async function handleDefinitiveDelete(e){
        e.preventDefault();
        if (window.confirm( "Voulez-vous vraiment supprimer cet utilisateur")) {
            const uId = e.currentTarget.value;
            const response = await fetchAuth('http://localhost:8080/user/defsup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({uId : uId})
            });
            if(response.ok) {
                const json = await response.json();
                console.log('json :',json);
                handleOnModify();
                console.log('Utilisateur supprimé !');
            } else {
                console.log('erreur serveur %s', response.status, response.statusText);
                alert("Erreur sur le serveur");
            }
        } else {
            return;
        }
    };

    async function handleBackUser(e) {
        e.preventDefault();
        const uId = e.currentTarget.value;
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
            console.log('Utilisateur revenu !');
        } else {
            console.log('erreur serveur %s', response.status, response.statusText);
            alert("Erreur sur le serveur");
        }
    };

    return (
        <TableRow key={id}>
            <TableCell align="center" component="th" scope="data">{id}</TableCell>
            <TableCell align="center" >{Name}</TableCell>
            <TableCell align="center">{FirstName}</TableCell>
            <TableCell align="center">{Service}</TableCell>
            <TableCell align="center">{Mail}</TableCell>
            {Suppression 
                ?<>
                    <TableCell align="center"><Button onClick={handleBackUser} variant="contained" value={id} align="center">X</Button></TableCell>
                    <TableCell align="center"><Button onClick={handleDefinitiveDelete} variant="contained" value={id} align="center"><WarningIcon/></Button></TableCell>
                    <TableCell align="center">{newDate}</TableCell>
                </>
                :<>
                    <TableCell align="center"><Button onClick={handleDeleteUser} variant="contained" value={id} align="center">Oui</Button></TableCell>
                    <TableCell align="center">/</TableCell>
                    <TableCell align="center">/</TableCell>
                </>
             }
        </TableRow> 
    )
}