import CodeBox from "../components/CodeBox";
import QuestionBox from "../components/QuestionBox";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function RoomPage() {
    const otherPersonDetails = {
        name: "test"
    };

    return (
        <Box>
            <Typography>Now coding with {otherPersonDetails.name}</Typography>
            <QuestionBox difficulty={"Easy"} />
            <CodeBox/>
            <Button variant="contained">End Session</Button>
        </Box>
    );
}

export default RoomPage;
