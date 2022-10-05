import "quill/dist/quill.snow.css"
import Quill from 'quill';
import Box from '@mui/material/Box';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { URI_COLLAB_SVC } from '../configs';

function CodeBox({ roomId }) {
    const [ socket, setSocket ] = useState();
    const [ quill, setQuill ] = useState();

    useEffect(() => {
        const s = io(URI_COLLAB_SVC);
        s.emit('join-room', `room-${roomId}`);
        setSocket(s);
        return () => {
            s.disconnect();
        };
    }, [roomId]);
    
    useEffect(() => {
        if (socket == null || quill == null) {
            return;
        }
        const handler = delta => {
            quill.updateContents(delta);
        }
        socket.on('receive-code', handler);
        return () => {
            socket.off('receive-code', handler);
        };
    }, [socket, quill]);
    
    useEffect(() => {
        if (socket == null || quill == null) {
            return;
        }
        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') {
                return;
            }
            socket.emit('send-code', delta, `room-${roomId}`);
        }
        quill.on('text-change', handler);
        return () => {
            quill.off('text-change', handler);
        };
    }, [socket, quill, roomId]);

    useEffect(() => {
        const q = new Quill('#code-box', {
            modules: {
                toolbar: false
            },
            theme: 'snow'
        });
        q.enable();
        setQuill(q);
    }, []);

    return (
        <Box style={{ marginTop: 10, marginBottom: 10, overflowY: 'auto', height: 400 }}>
            <div id="code-box" style={{ fontFamily: 'Consolas', fontSize: 14 }}></div>
        </Box>
    );
}

export default CodeBox;
