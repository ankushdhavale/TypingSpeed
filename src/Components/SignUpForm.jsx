import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { Bounce, toast } from "react-toastify";

const SignUpForm = ({ handleClose }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [conformPassword, setConformedPassword] = useState("");
	// validation also used toast
	const handelSubmit = () => {
		if (!email || !password || !conformPassword) {
			// alert("fill all details");
			toast.error("fill all details", {
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
			return;
		}
		if (password !== conformPassword) {
			// alert("password not write correct");
			toast.error("password not write correct", {
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
			return;
		}
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((res) => {
				// alert("User is created");
				toast.success("User is created", {
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
			.catch((err) => {
				// alert("not able to create user,try again");
				toast.error("not able to create user,try again", {
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
			});
	};

	return (
		<Box
			p={3}
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "10px",
				border: "2px solid red",
				color: "white",
			}}
		>
			<TextField
				variant='outlined'
				type='email'
				label='Enter Email'
				onChange={(e) => setEmail(e.target.value)}
				InputLabelProps={{
					style: { color: "white" },
				}}
				inputProps={{
					style: { color: "white" },
				}}
			/>
			<TextField
				variant='outlined'
				type='password'
				label='Enter Password'
				onChange={(e) => setPassword(e.target.value)}
				InputLabelProps={{
					style: { color: "white" },
				}}
				inputProps={{
					style: { color: "white" },
				}}
			/>
			<TextField
				variant='outlined'
				type='password'
				label='Enter Conform Password'
				onChange={(e) => setConformedPassword(e.target.value)}
				InputLabelProps={{
					style: { color: "white" },
				}}
				inputProps={{
					style: { color: "white" },
				}}
			/>
			<Button variant='contained' size='large' onClick={handelSubmit}>
				SignUp
			</Button>
		</Box>
	);
};

export default SignUpForm;
