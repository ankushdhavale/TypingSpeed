import React, { useEffect } from "react";
import Graph from "./Graph";
import { auth, db } from "../firebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const Stats = ({
	wpm,
	accuracy,
	correctChars,
	incorrectChars,
	missedChars,
	extraChars,
	graphData,
}) => {
	let timeSet = new Set();
	const newGraph = graphData.filter((i) => {
		if (!timeSet.has(i[0])) {
			timeSet.add(i[0]);
			return i;
		}
	});
	const navigate = useNavigate();
	const pushDataToDb = () => {

		if (isNaN(accuracy)) {
			alert("Invalid test");
			return;
		}
		const resultRef = db.collection('Results');
		const { uid } = auth.currentUser;
		resultRef.add({
			wpm:wpm,
			accuracy: accuracy,
			timeStamp: new Date(),
			characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
			userId:uid
		}).then((res) => {
			// alert("Data Saved To Db");
			toast.success("Data Saved To Db", {
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
		}).catch((err) => {
			// alert("not data saved to db : ", err)
			toast.warning("not data saved to db", {
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
	}

	const handelRestart = () => {
		window.location.reload(); 
	}

	console.log("accuracy",accuracy);
	
	useEffect(() => {
		if (auth.currentUser) {
			pushDataToDb();
		}
		else{
			// alert("login to save result")
			toast.warning("login to save result", {
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
		}
	}, [])
	
	return (
		<div className='stats-box'>
			<NavLink className='homeBtn' onClick={handelRestart} to={'/'}>Restart</NavLink>
			<div className='left-stats'>
				<div className='title'>WPM</div>
				<div className='subtitle'>{wpm}</div>
				<div className='title'>Accuracy</div>
				<div className='subtitle'>{accuracy}%</div>
				<div className='title'>Characters</div>
				<div className='subtitle'>
					{correctChars}/{incorrectChars}/{missedChars}/{extraChars}
				</div>
			</div>
			<div className='right-stats'>
				{/* graph will go here */}
				<Graph graphData={newGraph} />
			</div>
		</div>
	);
};

export default Stats;
