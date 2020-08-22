import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ( ) => {
    const [name, setName] = useState('';
    const [room, setRoom] = useState('');
    const endPoint = 'localhost:5000';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        socket = io(endPoint);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [endPoint, location.search]);
    return (
        <h1>Chat</h1>
    )
};

export default Chat;