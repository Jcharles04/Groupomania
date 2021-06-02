import {React , useState} from 'react';
import PostCard from './PostCardz';
import CardList from './CardList';

export default function Wall() {

    const [reloadPage, setReloadPage] = useState(false);
    
    function handleAddCom() {
        setReloadPage(!reloadPage)
    } 

    return (
        <>
            <PostCard onAddCom={handleAddCom}/>
            <CardList reloadPage={reloadPage}/> 
        </>
    )
        
}