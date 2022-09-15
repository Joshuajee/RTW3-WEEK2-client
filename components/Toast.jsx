import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function Toast(props) {

  const { message, open, setOpen } = props

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar 
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open} 
      autoHideDuration={6000} 
      onClose={handleClose}>
      
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>

    </Snackbar>
  );
}
