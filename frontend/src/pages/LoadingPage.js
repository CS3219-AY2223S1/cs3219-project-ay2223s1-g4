import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Countdown from 'react-countdown';

function LoadingPage() {
    return (
        <Box>
            <Typography>Loading match 30s</Typography>
            <Countdown
                date={Date.now() + 30 * 1000}
            >
                <Typography>Match not found :(</Typography>
            </Countdown>
        </Box>
    );
}

export default LoadingPage;
