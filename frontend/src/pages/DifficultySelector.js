import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";
import { URL_MATCHING_MATCH_SVC } from '../configs';

function DifficultySelector() {

    const { user, isAuthenticated, isLoading } = useAuth0();

    let navigateTo = useNavigate();

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    const difficulties = ['Easy', 'Medium', 'Hard'];

    const loadRoom = (difficulty) => {
        axios.post(URL_MATCHING_MATCH_SVC, {
                difficulty: difficulty.toUpperCase(),
                user: {
                    sub: user.sub
                }
            })
            .then((res) => {
                console.log(res);
                navigateTo(`../loading/${res.data.matchId}`);
            })
            .catch((err) => {
                console.log(err);
                alert('Opps... Something went wrong! Please try again.');
            });
    };

    return (
        isAuthenticated && (<Box sx={{ width: '100%' }}>
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
        </Box>)
    );
}

export default DifficultySelector;
