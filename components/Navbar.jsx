import React, { useEffect, useState } from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Grid, AppBar, Toolbar, Typography, useMediaQuery, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { truncateAddress } from '../utils/utils';


function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 80,
    target: window ? window() : undefined,
  });

  props.setTrigger(trigger)

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}



const Navbar = ({connectWallet, currentAccount}) => {

  const theme = useTheme()

  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))

  const [trigger, setTrigger] = useState(false)

  const colorPrimary = theme.palette.primary.main

  return (
    <React.Fragment>
      <ElevationScroll setTrigger={setTrigger} >
        <AppBar sx={{ background:  `rgba(255,255,255,${trigger? 1 : 0})`}}>
          <Toolbar>
            <Grid container>

              <Grid item xs={6}>

                <Typography sx={{color: trigger ? colorPrimary : "#FFF", fontWeight: 700}} variant={matchesSM ? "h6" : "h4"} component="div">
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
      </ElevationScroll>
    </React.Fragment>
  )
}

export default Navbar