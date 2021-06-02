import {React, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';

import fetchAuth from '../../../auth/authUtil';
import Users from './Users';
import DeleteComs from './DeleteComs';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function Zadmin() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    

    function getAllUsers() {
        try {
            fetchAuth('http://localhost:8080/user/all')
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
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }

    function moderationDate() {
        try {
            fetchAuth('http://localhost:8080/user/modDate')
                .then(function(response){
                    console.log(response)
                    return response.json();
                })
                .then(function(myJson) {
                    console.log(myJson);
                    setUser(myJson)
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
        getAllUsers()
    },[]);

    useEffect(()=>{
        moderationDate()
    },[]);

    function handleModify() {
        getAllUsers()
    }

    async function handleCheckCom(e){
        e.preventDefault();
        const response = await fetchAuth('http://localhost:8080/com/checkCom', {
            method: 'POST'
        });
        if(response.ok) {
            const json = await response.json();
            console.log(json);
            handleModify()
            alert('Commentaires validés !');
        } else {
            console.log('erreur serveur %s', response.status, response.statusText);
            alert("Erreur sur le serveur");
        }
    }

    const dateModeration = user.map((user) =>
        <div key={user.id}> {user.FirstName} {user.Name} le {user.ModerationDate}</div>
    )

    return (
        <div id='main'> 
            <CardContent className='container check'>
                <h2>Dernière vérification des messages</h2>
                <div>Faites par : {dateModeration}</div>
                <Button value="1" variant="contained" onClick={handleCheckCom}>Cliquez ici pour valider tous les commentaires</Button>
            </CardContent>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">id</TableCell>
                            <TableCell align="center">Nom</TableCell>
                            <TableCell align="center">Prénom</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Service</TableCell>
                            <TableCell align="center">Suppression</TableCell>
                            <TableCell align="center">Date Suppression</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {{data} && data.length>0 && data.map((user) => {
                            return (
                                <Users 
                                    key={user.id}
                                    id={user.id}
                                    Name={user.Name}
                                    FirstName={user.FirstName}
                                    Service={user.Service}
                                    Mail={user.Mail}
                                    Suppression={user.Suppression}
                                    onModify={user.handleModify}  
                                />
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <CardContent>
                <DeleteComs />
            </CardContent>
        </div>
    );
};

{/* <div id='main'> 
            <section className='container check'>
                <h2>Dernière vérification des messages</h2>
                <div>Faites par : {dateModeration}</div>
                <button value="1" onClick={handleCheckCom}>Cliquez ici pour valider tous les commentaires</button>
            </section>

            <section className='container '>
                <h2>Liste des utilisateurs</h2>
                <div className='array'>
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Email</th>
                                <th>Service</th>
                                <th>Suppression</th>
                                <th>Date Suppression</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                {data} && data.length>0 && data.map((user) => {
                                    return (
                                        <Users 
                                            key={user.id}
                                            id={user.id}
                                            Name={user.Name}
                                            FirstName={user.FirstName}
                                            Service={user.Service}
                                            Mail={user.Mail}
                                            Suppression={user.Suppression}
                                            onModify={user.handleModify}  
                                        />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>	
            </section>
            <DeleteComs />
        </div>
        <TableRow key={data.id}>
                    <TableCell align="center" component="th" scope="data">{data.id}</TableCell>
                    <TableCell align="center" >{data.Name}</TableCell>
                   
                    <TableCell align="center">{data.FirstName}</TableCell>
                    <TableCell align="center">{data.Mail}</TableCell>
                    <TableCell align="center">{data.Service}</TableCell>
                    <TableCell align="center">{data.SuppressionDate}</TableCell>
                    <TableCell align="center">{data.Suppression}</TableCell>
                    </TableRow>                    
    
    */}