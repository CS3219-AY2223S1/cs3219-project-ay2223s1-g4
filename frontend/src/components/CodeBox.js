import "quill/dist/quill.snow.css";
import Quill from 'quill';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

function CodeBox({ roomId, socket }) {
    const [ quill, setQuill ] = useState();
    const saveDocumentIntervalsMs = 3 * 1000;

    useEffect(() => {
        if (socket == null || quill == null) {
            return;
        }
        socket.once("load-code", document => {
            quill.setText(document);
            quill.enable();
        });

        socket.emit("get-code", roomId);
    }, [socket, quill, roomId]);

    useEffect(() => {
        if (socket == null || quill == null) {
            return;
        }
    
        const interval = setInterval(() => {
            socket.emit("save-code", roomId, quill.getContents().ops[0].insert);
        }, saveDocumentIntervalsMs);
    
        return () => {
            clearInterval(interval)
        };
    }, [socket, quill, roomId, saveDocumentIntervalsMs]);
    
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
        q.disable();
        setQuill(q);
    }, []);

    return (
        <Box style={{ marginTop: 10, marginBottom: 10, overflowY: 'auto', height: 400 }}>
            <div id="code-box" class="code" style={{ fontSize: 14 }}></div>
        </Box>
    );
}

export default CodeBox;
