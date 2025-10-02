import TextField from "@mui/material/TextField";
import { Box, Button, useTheme } from "@mui/material";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { Bounce, toast } from "react-toastify";

const LoginForm = ({handleClose}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { theme } = useTheme();

	// validation also used toast
	const handelSubmit = () => {
		if (!email || !password) {
			// alert("fill all details");
			toast.warning("fill all details", {
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
			.signInWithEmailAndPassword(email, password)
			.then((res) => {
				// alert("logged in");
				toast.success("logged in", {
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
				// alert("invalid credential");
				toast.error("invalid credential", {
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
				InputLabelProps={{
					style: { color: "white" },
				}}
				inputProps={{
					style: { color: "white" },
				}}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<TextField
				variant='outlined'
				type='password'
				label='Enter Password'
				InputLabelProps={{
					style: { color: "white" },
				}}
				inputProps={{
					style: { color: "white" },
				}}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button variant='contained' size='large' onClick={handelSubmit}>
				Login
			</Button>
		</Box>
	);
};

export default LoginForm;
