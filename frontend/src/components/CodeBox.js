import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function CodeBox({ roomId }) {

    // TODO add socket for this room

    return (
        <Box>
            <TextField
                id="outlined-multiline-static"
                multiline
                rows={25}
                fullWidth
                variant="filled"
                placeholder={`Code for room ${roomId ? roomId: '?'}`}
                font="Consolas"
                InputProps={{ style: { fontFamily: "Consolas" } }}        
            />
        </Box>
    );
}

export default CodeBox;
