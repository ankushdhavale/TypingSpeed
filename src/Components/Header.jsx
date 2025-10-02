import React from "react";
import AccountCircle from "./AccountCircle";
const Header = () => {
	return (
		<div className='header'>
			<div className='logo'>Hytype.</div>
			<div className='user-icons'>
				<AccountCircle />
			</div>
		</div>
	);
};

export default Header;
