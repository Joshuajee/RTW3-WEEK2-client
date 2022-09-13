import React, { useState } from 'react';
import { 
  Button, TextField, Dialog, 
  DialogActions, FormControl, Grid, 
  DialogContent, DialogTitle 
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { Close } from '@mui/icons-material';
import styles from '../styles/Home.module.css'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function Modal(props) {

  const { open, setOpen, isBig, buyCoffee, buyBigCoffee } = props
  const [name, setName] = useState('');
	const [message, setMessage] = useState('');

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

          <Button 
            //sx={}
            //onClick={isBig ? buyBigCoffee : buyCoffee}
            variant="contained">
            { 
              isBig ? 
                "Buy Me Big coffee for 0.005 ETH" 
                  : 
                "Buy Me coffee for 0.001 ETH" 
            } 
          </Button>
                
        </FormControl>
              
      </Grid>

    </DialogContent>

  </Dialog>
  )
}
