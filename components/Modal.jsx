import React, { useState } from 'react';
import { 
  Button, TextField, Dialog, 
  DialogActions, FormControl, Grid, 
  DialogContent, DialogTitle 
} from '@mui/material';
import Slide from '@mui/material/Slide';
import {  LoadingButton } from '@mui/lab';
import { Close } from '@mui/icons-material';
import styles from '../styles/Home.module.css'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function Modal(props) {

  const { open, setOpen, isBig, buyCoffee, buyBigCoffee, message, name, setMessage, setName } = props

  const [loading, setLoading] = React.useState(false)

  const handleClose = () => {
    setOpen(false);
  };

  

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      >

      <DialogActions>
        <Button onClick={handleClose}> <Close /> </Button>
      </DialogActions>

      <DialogTitle sx={{color: "#000"}}>
        { isBig ? "Buy Me Big Coffee" : "Buy Me Coffee" }
      </DialogTitle>

      <DialogContent className={styles.modal}>

        <Grid item container>
                
          <FormControl>
  
            <TextField
              label={"Name"}
              value={name}     
              className={styles.textInput}
              onChange={(e) => setName(e.target.value)}
              />

            <TextField
              label={"Message"}
              value={message}
              className={styles.textInput}
              onChange={(e) => setMessage(e.target.value)}
              multiline
              rows={6}
              />

          <LoadingButton
            className={styles.submitBtn}
            onClick={() => isBig ? buyBigCoffee(setLoading) : buyCoffee(setLoading)}
            loading={loading}
            loadingIndicator={"Buying Coffee, Please Wait..."}
            variant="contained">
            { 
              isBig ? 
                "Buy Me Big coffee for 0.003 ETH" 
                  : 
                "Buy Me coffee for 0.001 ETH" 
            } 
          </LoadingButton>
                
        </FormControl>
              
      </Grid>

    </DialogContent>

  </Dialog>
  )
}
