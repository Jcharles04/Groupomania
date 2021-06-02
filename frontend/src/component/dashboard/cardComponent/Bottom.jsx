import {React} from 'react';

export default function Bottom({likes, nbOfResponse, replies, setResponse}) {

    
    function handleReplies(e) {
        e.preventDefault();
        setResponse();
    }

    return (
        <div className='bottom'>
            <div className='nbOfLike twelve'>{likes} likes</div>
            {replies
                ?<button onClick={handleReplies} className='toggle nbOfResponse eleven'>
                    {nbOfResponse} commentaires
                </button>
                : null
            }   
        </div>
    )
};