import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function DifficultySelector() {

    const difficulties = ['Easy', 'Medium', 'Hard'];

    const loadRoom = (difficulty) => {
        // load 30s and attempt to link
        alert(`${difficulty} selected`);
    };

    // const showRetry = () => {
    //     // show that timeout and give user option to retry or select other difficulty
    // };

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
