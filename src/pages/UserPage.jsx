import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import TableUserData from "../Components/TableUserData";
import Graph from "../Components/Graph";
import UserInfo from "../Components/UserInfo";
import { Bounce, toast } from "react-toastify";

const UserPage = () => {
	const [data, setData] = useState([]);
	const [user, loading] = useAuthState(auth);
	const [graphData, setGraphData] = useState([]);
	const [dataLoading, setDataLoading] = useState(true);
	const navigate = useNavigate();

	const fetchUserData = () => {
		const user = auth.currentUser;
		if (!user) {
			alert("No user is logged in yet");
			toast.warning("No user is logged in yet", {
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
		//fetching specific user uid...
		const uid = user?.uid;
		const resultRef = db.collection("Results");
		let tempData = [];
		let tempGraphData = [];

		resultRef
			.where("userId", "==", uid)
			.orderBy("timeStamp", "desc")
			.get()
			.then((snapshot) => {
				snapshot.docs.forEach((doc) => {
					tempData.push({ ...doc.data() });
					tempGraphData.push([
						doc.data().timeStamp.toDate().toLocaleString().split(",")[0],
						doc.data().wpm,
					]);
				});
				setData(tempData);
				setGraphData(tempGraphData.reverse());
			})
			.catch((err) => {
				console.log("Error fetching user data:", err);
			});
	};

	useEffect(() => {
		if (!loading) {
			fetchUserData();
		}

		//user not login...
		if (loading && !user) {
			navigate("/");
		}
	}, [loading]);

	if (loading || !dataLoading) {
		return (
			<div className='center-of-screen'>
				<CircularProgress size={150} />
			</div>
		);
	}

	return (
		<div className='canvas'>
			<UserInfo totalTestTaken={data.length} />
			<div className='graph-user-page'>
				<Graph graphData={graphData} type='date' />
			</div>
			<TableUserData data={data} />
		</div>
	);
};

export default UserPage;
