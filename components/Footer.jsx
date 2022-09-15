import * as React from 'react';
import { Container, List, ListItem, Divider, ListItemText, Typography, Grid, Box, useTheme } from '@mui/material';
import converter from 'hex2dec';
import styles from '../styles/Home.module.css'


const  Footer = (props) => {

  const theme = useTheme()

  const colorPrimary = theme.palette.primary.main

  return (
    <Box component={"footer"} sx={{background: colorPrimary}} className={styles.footer}>

        <Divider />
    
        <Container maxWidth="lg"  className={styles.content}>

            <Typography 
                variant='h4' 
                textAlign={"left"} 
                sx={{fontWeight: 700, 
                color: "white"}}>
                Buy Me A Coffee


            </Typography>

        </Container>

    </Box>
    )

}

export default Footer
