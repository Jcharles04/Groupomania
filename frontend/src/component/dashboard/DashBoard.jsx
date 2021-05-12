import React from 'react'; 
import Header from './Header';
import PostCard from './PostCard';
import CardList from './CardList';

export default function DashBoard() {
    return (
        <div>
            <Header/>
            <PostCard/>
            <CardList/>

        </div>
    )
}