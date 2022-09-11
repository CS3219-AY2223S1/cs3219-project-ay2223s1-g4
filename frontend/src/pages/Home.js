import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Home() {
    return (
        <Box>
            <Typography variant="h2">Welcome to PeerPrep!</Typography>
            <Box margin={"1rem"}>
                <Typography variant="h4">About</Typography>
                <Typography margin={"1rem"}>PeerPrep is a ...</Typography>
                <Typography variant="h4">How to use</Typography>
                <Typography margin={"1rem"}>Sign up now to try out PeerPrep!</Typography>
            </Box>
        </Box>
    );
}

export default Home;
