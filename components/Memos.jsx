import * as React from 'react';
import { Container, List, ListItem, Divider, ListItemText, Typography, Grid, Box, useTheme } from '@mui/material';
import converter from 'hex2dec';
import styles from '../styles/Home.module.css'


const Memos = (props) => {

  const theme = useTheme()

  const { memos } = props

  const colorPrimary = theme.palette.primary.main

  return (
    <Box sx={{background: colorPrimary}} className={styles.memoBg}>
    
      <Container maxWidth="lg">

      <Grid item container>

        <Grid item container justifyContent={"center"} sx={{margin: "2em"}}>

          <Typography variant='h4' textAlign={"center"} sx={{fontWeight: 700, weight: "100%", color: "white"}}>Memo Received</Typography>

        </Grid>

        <Grid item justifyContent={"center"} container>

          <Grid item md={6} sm={12} sx={{color: "white", height: "auto", overflowY: "auto"}}>

            {

              memos.map((value, index) => {
                const date = new Date(converter.hexToDec(value.timestamp._hex) * 1000).toUTCString()
                  return (
                      <List key={index} sx={{ width: '100%'}}>
                          <ListItem alignItems="flex-start">
                            <ListItemText
                              primary={date}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline', }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                      {value.name}
                                  </Typography>
                                      — {value.message}
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                      </List>
                  )
              })
          
            }

            </Grid>

          </Grid>

        </Grid>
      
      </Container>

    </Box>
  )

}

export default Memos
