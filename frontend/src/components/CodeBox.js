import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function CodeBox() {
    return (
        <Box>
            <TextField
                id="outlined-multiline-static"
                multiline
                rows={25}
                fullWidth
                variant="filled"
                placeholder="Code here"
                font="Consolas"
                InputProps={{ style: { fontFamily: "Consolas" } }}        
            />
        </Box>
    );
}

export default CodeBox;
