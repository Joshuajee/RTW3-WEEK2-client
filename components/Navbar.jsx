import React, { useEffect, useState } from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Grid, AppBar, Toolbar, Typography, useMediaQuery, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { truncateAddress } from '../utils/utils';


const Navbar = ({connectWallet, currentAccount}) => {


  return (
    <React.Fragment>
      <AppBar sx={{ background:  "rgba(255,255,255,0)"}}>
        <Toolbar>
          <Grid container>

            <Grid item xs={6}>

              <Typography sx={{color: "#FFF", fontWeight: 700}} variant="h4" component="div">
                Buy Coffee
              </Typography>

            </Grid>

            <Grid item xs={6}>

              <Grid container justifyContent={"flex-end"}>

                <Button variant={"contained"} onClick={connectWallet}> 
                  {currentAccount ? truncateAddress(currentAccount) : "Connect Wallet" }  </Button>

              </Grid>

            </Grid>

          </Grid>

        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Navbar