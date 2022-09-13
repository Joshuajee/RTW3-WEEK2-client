import abi from '../utils/BuyMeACoffee.json';
import { ethers } from 'ethers';
import Head from 'next/head';
import Image from 'next/image';
import {
	Grid,
	Typography,
	useMediaQuery,
	Container,
	Button
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import styles from '../styles/Home.module.css';

export default function Home() {
	// Contract Address & ABI
	const contractAddress = '0xD662a64bF5713a3369d5e4861d5437436dAeEaCe';
	const contractABI = abi.abi;

	// Component state
	const [currentAccount, setCurrentAccount] = useState('');
	const [memos, setMemos] = useState([]);
  
  const [open, setOpen] = useState(false);
  const [isBig, setIsBig] = useState(false);

	const onNameChange = event => {
		setName(event.target.value);
	};

	const onMessageChange = event => {
		setMessage(event.target.value);
	};

	// Wallet connection logic
	const isWalletConnected = async () => {
		try {
			const { ethereum } = window;

			const accounts = await ethereum.request({ method: 'eth_accounts' });
			console.log('accounts: ', accounts);

			if (accounts.length > 0) {
				const account = accounts[0];
        setCurrentAccount(account);
				console.log('wallet is connected! ' + account);
			} else {
				console.log('make sure MetaMask is connected');
			}
		} catch (error) {
			console.log('error: ', error);
		}
	};

	const connectWallet = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				console.log('please install MetaMask');
			}

			const accounts = await ethereum.request({
				method: 'eth_requestAccounts'
			});

			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
		}
	};

	const buyCoffee = async () => {
		try {
			const { ethereum } = window;

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum, 'any');
				const signer = provider.getSigner();
				const buyMeACoffee = new ethers.Contract(
					contractAddress,
					contractABI,
					signer
				);

				console.log('buying coffee..');
				const coffeeTxn = await buyMeACoffee.buyCoffee(
					name ? name : 'anon',
					message ? message : 'Enjoy your coffee!',
					{ value: ethers.utils.parseEther('0.001') }
				);

				await coffeeTxn.wait();

				console.log('mined ', coffeeTxn.hash);

				console.log('coffee purchased!');

				// Clear the form fields.
				setName('');
				setMessage('');
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Function to fetch all memos stored on-chain.
	const getMemos = async () => {
		try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const buyMeACoffee = new ethers.Contract(
					contractAddress,
					contractABI,
					signer
				);

				console.log('fetching memos from the blockchain..');
				const memos = await buyMeACoffee.getMemos();
				console.log('fetched!');
				setMemos(memos);
			} else {
				console.log('Metamask is not connected');
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		let buyMeACoffee;
		isWalletConnected();
		getMemos();

		// Create an event handler function for when someone sends
		// us a new memo.
		const onNewMemo = (from, timestamp, name, message) => {
			console.log('Memo received: ', from, timestamp, name, message);
			setMemos(prevState => [
				...prevState,
				{
					address: from,
					timestamp: new Date(timestamp * 1000),
					message,
					name
				}
			]);
		};

		const { ethereum } = window;

		// Listen for new memo events.
		if (ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum, 'any');
			const signer = provider.getSigner();
			buyMeACoffee = new ethers.Contract(contractAddress, contractABI, signer);

			buyMeACoffee.on('NewMemo', onNewMemo);
		}

		return () => {
			if (buyMeACoffee) {
				buyMeACoffee.off('NewMemo', onNewMemo);
			}
		};
	}, []);

  const buy = (big = false) => {
    setOpen(true)
    setIsBig(big)
  }

	return (
		<div className={styles.container}>
      
			<Head>
				<title>Buy Joshuajee a Coffee!</title>
				<meta name="description" content="Tipping site" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>

        <Navbar connectWallet={connectWallet} currentAccount={currentAccount} />
        
				<Container maxWidth="lg">
			
          <Grid
						container
						sx={{ height: '100vh' }}
						alignContent={'center'}
						justifyContent={'center'}
					>
					
            <Grid  item md={6} sm={12}>

              <Grid item container sx={{height: '100%'}}
                justifyContent={"center"} alignContent={"flex-end"} spacing={6}>
  
                    <Grid item container>

                      <Grid item container spacing={2}>
    
                        <Grid item sm={12} sx={{color: 'white'}}>

                          <Typography
            								variant={'h3'}
            								sx={{ color: 'white', fontWeight: 600, marginBottom: '0.4em' }}
            							  >
            								Buy Joshuajee a Coffee!
            							</Typography>
        
        
                          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                          in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                          deserunt mollit anim id est laborum."
                        
                        </Grid>
                          
                        <Grid item sm={6}>
      
                          <Button
                            onClick={buy}
                            sx={{height: "4em", width: "100%"}} 
                            variant="contained">Buy Me Coffee</Button>
                        
                        </Grid>
        
                      <Grid item sm={6}>
                        
                        <Button 
                          onClick={() => buy(true)}
                          sx={{height: "4em", width: "100%"}} 
                          variant="contained" color="success">
                          Buy Me Big Coffee</Button>
                      
                      </Grid>

                    </Grid>
      
                  </Grid>
    
                  <Grid item container>
    
                    
                      
                  </Grid>
    
                </Grid>
                
						</Grid>

						<Grid item md={6} sm={12}>

              <Grid container justifyContent={"center"} alignContent={"center"}>

                <Image src="/coffee-cup.png" 
                  width={"544px"} 
                  height={"459px"} 
                  alt="cup" />             
              
              </Grid>

						</Grid>
            
					</Grid>
          
				</Container>
        
			</main>

      {<Modal 
        open={open} isBig={isBig} 
        buyCoffee={buyCoffee} buyBigCoffee={buyCoffee}  />  
      }
		
    </div>
	);
}
