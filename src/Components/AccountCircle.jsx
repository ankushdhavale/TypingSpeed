import React, { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useAuthState } from "react-firebase-hooks/auth";
import Modal from "@mui/material/Modal";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import { Button } from "@mui/material";
import Tab from "@mui/material/Tab";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useTheme } from "styled-components";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
const AccountCircle = () => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(0);
	const navigate = useNavigate();
	const { theme } = useTheme();

	const [user] = useAuthState(auth);

	const handleModalOpen = () => {
		if (user) {
			navigate("/user");
		} else {
			setOpen(true);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleValueChange = (e, v) => {
		setValue(v);
	};
	const googleProvider = new GoogleAuthProvider();

	const handelGoogleSignIn = () => {
		signInWithPopup(auth, googleProvider)
			.then((res) => {
				// alert("Google log in successful");
				toast.success("Google log in successful", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					transition: Bounce,
				});
				handleClose();
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const logOut = () => {
		signOut(auth)
			.then(() => {
				// alert("Logged out successfully");
				toast.success("Logged out successfully", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					transition: Bounce,
				});
			})
			.catch((error) => console.log(error));
	};

	const handelTestLoginIn = async () => {
		try {
			const userCredential = await auth.signInWithEmailAndPassword(
				"ankushdhavale7@gmail.com",
				"12345678"
			);
			// alert("Logged in successful...", userCredential)
			toast.success("Logged in successful...", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition: Bounce,
			});
			handleClose();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='user-icons'>
			<MdAccountCircle onClick={handleModalOpen} className='MdAccountCircle' />
			{user && <FiLogOut onClick={logOut} className='logout' />}
			<Modal
				open={open}
				onClose={handleClose}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div style={{ width: "400px" }}>
					<AppBar position='static' style={{ background: "transparent" }}>
						<Tabs
							value={value}
							onChange={handleValueChange}
							variant='fullWidth'
						>
							<Tab label='login' style={{ color: "white" }}></Tab>
							<Tab label='signup' style={{ color: "white" }}></Tab>
						</Tabs>
					</AppBar>
					{value === 0 && <LoginForm handleClose={handleClose} />}
					{value === 1 && <SignUpForm handleClose={handleClose} />}
					{value === 0 && (
						<Button
							className='googleBtn'
							variant='contained'
							size='large'
							onClick={handelTestLoginIn}
						>
							Login With Test
						</Button>
					)}
					{value === 0 && (
						<Button
							className='googleBtn'
							variant='contained'
							size='large'
							onClick={handelGoogleSignIn}
						>
							Login With Google
						</Button>
					)}
					{value === 1 && (
						<Button
							className='googleBtn'
							variant='contained'
							size='large'
							onClick={handelGoogleSignIn}
						>
							Sign Up With Google
						</Button>
					)}
				</div>
			</Modal>
		</div>
	);
};

export default AccountCircle;
