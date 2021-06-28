import {React, useState} from "react";
import fetchAuth from '../../../auth/authUtil';
import { useStyles } from '../../UseStyles';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ListItemText } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import WarningIcon from '@material-ui/icons/Warning';
import BuildIcon from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';




export default function CardHead({id, checkedByAdmin, ReplyTo_id, CreationDate, FirstName, Service, User_id, delU, onModClicked, onModify, onDeleteCom}) {

    const admin = sessionStorage.admin === '1';
    let user = sessionStorage.id;
    user = parseInt(user);
    const isMyCom = (user === User_id);
    const userState = (delU != null) ? "Utilisateur supprimé" : FirstName;
    
    const notVerify = checkedByAdmin === null;
    const [loading, setLoading] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const isMenuOpen = Boolean(anchorEl);

    let date = new Date(CreationDate);
    let newDate = date.toLocaleString();

    function handleClick(e) {
        e.preventDefault();
        onModClicked(e);
        handleMenuClose();
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const cId = e.target.comId.value;
            const formData = new FormData();
            if(ReplyTo_id){
                formData.append('parent_id', ReplyTo_id)
            }
            formData.append('user', user);
            formData.append('cId', cId);
            const response = await fetchAuth('http://localhost:8080/com/del', {
                method: 'POST',
                body: formData
            });
            if(response.ok) {
                const json = await response.json();
                console.log(json);
                if(ReplyTo_id) {
                    onModify(json);
                } else {
                    onDeleteCom(cId);
                }
                
            } else {
                console.log('erreur serveur %s', response.status, response.statusText);
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
        setLoading(false);
        handleMenuClose();
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {isMyCom 
                    ?<Button disabled={loading} onClick={handleClick} value='Modifier'><BuildIcon/></Button>    
                    : null
            }
            {isMyCom || admin 
                    ? <form className='del' onSubmit={handleDelete}>
                            <input id="comId" name="comId" type="hidden" value={id}/>
                            <input id="UserId" name="UserId" type="hidden" value={User_id}/>
                            <Button type='submit'><DeleteIcon/></Button>
                        </form>
                    : null
            }
            
        </Menu>
    );


    return (
        <Grid container
        direction="row"
        alignItems="center"
        justify="space-between"
        >   
            <Grid item xs={2}>
                <CardHeader 
                    avatar={
                        <Avatar aria-label="Profil picture" className={classes.avatar}></Avatar>
                    }
                    
                    title= {userState}
                    subheader={newDate}
                />
            </Grid>
            <Grid item xs>
            </Grid>
            <Grid item xs className={classes.serv}>
                <ListItemText
                    primary="Service :" secondary= {Service}
                />
            </Grid>
            {admin && notVerify
                ?<Grid item xs  className={classes.serv} ><WarningIcon/></Grid>
                : null
            }
            <Grid item xs>
                <CardHeader
                    action={
                            <IconButton aria-label="settings" 
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleMenuOpen}>
                                <MoreVertIcon />
                            </IconButton>
                    }
                />
                {renderMenu}
            </Grid>
        </Grid>
    );
}

