import React from "react";
import Header from "../Components/Header";
import TypingBox from "../Components/TypingBox";
import FooterMenu from "../Components/FooterMenu";

const HomePage = () => {
	return (
		<div className='canvas'>
			<Header />
			<TypingBox />
			<FooterMenu />
		</div>
	);
};

export default HomePage;
