import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdAccountCircle } from "react-icons/md";
import { auth } from "../firebaseConfig";
import { NavLink } from "react-router-dom";
const UserInfo = ({totalTestTaken}) => {
    const [user] = useAuthState(auth);
	return (
        <div>
            <NavLink className='homeBtn' to={'/'}>Home</NavLink>
            <div className='user-profile'>
                <div className="picture">
                    <MdAccountCircle style={{ display: 'block', transform:'scale(6)',margin:'auto',marginTop:'1rem'}}/>
                </div>
                <div className="info-user">
                    <div className="email">{user.email}</div>
                    <div className="joined-at ">{user.metadata.creationTime}</div>
                </div>
                <div className='total-tests'><span>Total Test Taken : {totalTestTaken}</span></div>
            </div>
		</div>
	);
};

export default UserInfo;
