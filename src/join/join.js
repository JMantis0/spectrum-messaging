import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './join.css';

const Join = ( ) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heaader">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)}></input>  </div>
                <div><input placeholder="Room" className="joinInput" type="text" onChange={(event) => setRoom(event.target.value)}></input>  </div>
                <Link conClick={event => (!name || !room) ? event.preventDefault() : null)} to={'/chat?name=${name}&room=${room}'}>
                    <button className="button" type='submit'>Sign In</button>
                </Link>
            </div>
        </div>
    )
};

export default Join;