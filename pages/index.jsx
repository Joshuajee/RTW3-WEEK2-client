import abi from '../utils/BuyMeACoffee.json';
import { ethers } from 'ethers';
import Head from 'next/head';
import Image from 'next/image';
import {
	Grid,
	Typography,
	Container,
	Button
} from '@mui/material';
import React, { memo, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import Memos from '../components/Memos';
import styles from '../styles/Home.module.css';
import Footer from '../components/Footer';
import Toast from '../components/Toast';


// Contract Address & ABI
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT;
const contractABI = abi.abi;


export default function Home() {

	// Component state
	const [currentAccount, setCurrentAccount] = useState(null);
	const [memos, setMemos] = useState([]);
	const [name, setName] = useState(null);
	const [message, setMessage] = useState(null);
  
	const [open, setOpen] = useState(false);
	const [isBig, setIsBig] = useState(false);

	const [toast, setToast] = useState(false);
	const [toastMsg, setToastMsg] = useState(false);


	// Wallet connection logic
	const isWalletConnected = async () => {
		try {

			const { ethereum } = window;

			const accounts = await ethereum.request({ method: 'eth_accounts' });

			if (accounts.length > 0) {
				const account = accounts[0];
        		setCurrentAccount(account);
				console.log('wallet is connected! ' + account);
			} else {
				console.log('make sure MetaMask is connected');
			}

		} catch (error) {
			console.error('error: ', error);
		}
	};

	const connectWallet = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				setToast(true)
				setToastMsg('Please install MetaMask on your browser')
			}

			const accounts = await ethereum.request({
				method: 'eth_requestAccounts'
			});

			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.error(error);
		}
	};

	const buyCoffee = async (setLoading) => {

		setLoading(true)

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


				const coffeeTxn = await buyMeACoffee.buyCoffee(
					name ? name : 'anon',
					message ? message : 'Enjoy your coffee!',
					{ value: ethers.utils.parseEther('0.001') }
				);

				await coffeeTxn.wait();

				// Clear the form fields.
				setName('');
				setMessage('');
				setLoading(false)
				setOpen(false)
			}
			
		} catch (error) {
			console.error(error);
			setLoading(false)
		}
	};


	const buyBigCoffee = async (setLoading) => {

		setLoading(true)

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

				const coffeeTxn = await buyMeACoffee.buyBigCoffee(
					name ? name : 'anon',
					message ? message : 'Enjoy your coffee!',
					{ value: ethers.utils.parseEther('0.003') }
				);

				await coffeeTxn.wait();

				// Clear the form fields.
				setName('');
				setMessage('');
				setLoading(false)
				setOpen(false)
			}

			
		} catch (error) {
			console.error(error);
			setLoading(false)
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

				const memos = await buyMeACoffee.getMemos();

				setMemos(memos);
			} else {
				console.warning('Metamask is not connected');
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		let buyMeACoffee;
		isWalletConnected();
		getMemos();

		// Create an event handler function for when someone sends
		// us a new memo.
		const onNewMemo = (from, timestamp, name, message) => {
			setMemos(prevState => [
				{
					address: from,
					timestamp: timestamp,
					message,
					name
				},
				...prevState
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const buy = async (big = false) => {
	
		if (!currentAccount) return await connectWallet()
	
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
						sx={{ height: '50em' }}
						alignContent={'center'}
						justifyContent={'center'}
						className={styles.hero}
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

						
												Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
												eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
												ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
												aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
												in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
												Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
												deserunt mollit anim id est laborum.
										
										</Grid>
										
										<Grid item sm={6}>
					
											<Button
												onClick={() => buy(false)}
												sx={{height: "4em", width: "100%"}} 
												variant="contained">Buy Me Coffee</Button>
										
										</Grid>
						
									<Grid item sm={6}>
										
										<Button 
											onClick={() => buy(true)}
											sx={{height: "4em", width: "100%"}} 
											variant="contained" color="success">
											Buy Me Big Coffee
										</Button>
									
									</Grid>

								</Grid>
				
							</Grid>
				
				
						</Grid>
							
					</Grid>

					<Grid item md={6} sm={12} className={styles.cup}>

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

		<Toast open={toast} setOpen={setToast} message={toastMsg} />

		<Memos memos={memos} />

		<Footer />

		<Modal 
        	open={open} isBig={isBig} setOpen={setOpen}
        	buyCoffee={buyCoffee} buyBigCoffee={buyBigCoffee}
			message={message} name={name} setMessage={setMessage} 
			setName={setName}  />  
		
    </div>
	);
}
