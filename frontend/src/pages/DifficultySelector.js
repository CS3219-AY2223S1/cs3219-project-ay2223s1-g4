import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { URL_MATCHING_MATCH_SVC } from '../configs';

function DifficultySelector() {

    const difficulties = ['Easy', 'Medium', 'Hard'];

    let navigateTo = useNavigate();
    let id = 0; // TODO

    const loadRoom = (difficulty) => {
        id++;
        axios.post(URL_MATCHING_MATCH_SVC, {
                difficulty: difficulty.toUpperCase(),
                user: {
                    sub: id
                } // TODO
            })
            .then((res) => {
                console.log(res);
                navigateTo('../loading', {
                    state: {matchid: res.data.matchId}
                });
            })
            .catch((err) => {
                console.log(err);
                alert('Opps... Something went wrong! Please try again.');
            });
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography
                display="flex"
                alignItems="center"
                justifyContent="center"
                variant="h3"
                sx={{ m: "1rem" }}
            >
                Select your difficulty
            </Typography>
        <Grid 
            sx={{ flexGrow: 1 }} 
            container 
            display="flex"
            spacing={2}
        >
            <Grid item xs={12}>
            <Grid
                container
                direction="column"
                display="flex"
                alignItems="center"
                spacing={2}
            >
            {difficulties.map((value) => (
                <Grid key={value} item>
                <Button 
                    onClick={() => loadRoom(value)}
                >
                <Paper
                    sx={{
                        height: 50,
                        width: 200,
                        backgroundColor: 'white',
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        verticalAlign: "middle"
                    }}
                >
                    <Typography variant="h6">{value}</Typography>
                </Paper>
                </Button>
                </Grid>
            ))}
            </Grid>
            </Grid>
        </Grid>
        </Box>
    );
}

export default DifficultySelector;
