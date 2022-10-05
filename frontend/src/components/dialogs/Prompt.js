import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function Prompt({isOpen, message, handleYes, handleNo}) {
    return (
        <Dialog
            open={isOpen}
            onClose={handleNo}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {message}
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleNo}>No</Button>
                <Button onClick={handleYes} autoFocus>Yes</Button>
            </DialogActions>
        </Dialog>
    );
}
