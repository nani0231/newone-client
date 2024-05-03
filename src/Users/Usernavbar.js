import React,{ useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../All Images/navbar_logo.jpg';
function UserNavbar() {
	let navigate = useNavigate();

	const gotohome = () => {
		navigate("/");
	};
	const GotoSignupPAge = () => {
		navigate("/SuperLogin")
	}
	const [selectedLogin, setSelectedLogin] = useState('');
	const loginTypeRoutes = {
		candidate: '/userlogindetails',
		partner: '/InstituteLogin',
		SuperAdmin : '/SuperLogin'
	  };
	
	  const handleLoginChange = (e) => {
		const selectedValue = e.target.value;
		setSelectedLogin(selectedValue);
	
		// Navigate to the corresponding page based on the selected login type
		const route = loginTypeRoutes[selectedValue];
		if (route) {
		  navigate(route);
		}
	  };

	return (
		<div>
			<nav
				className="navbar navbar-expand-lg navbar-light nav_item py-2 fixed-top"
				style={{ padding: "0 20px" ,height:"85px"}}
			>
				<div className="navbar-brand my-auto">
					<img
						// src="../Images/skillhub1.png"
						src={logo}
						alt="img"
						className="img-fluidlight"
						// style={{ height: "35px", borderRadius: "7px", cursor: "pointer" }}
						style={{ height: "70px",width:"250px", borderRadius: "7px", cursor: "pointer" }}

						onClick={gotohome}
					/>
				</div>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
					style={{ color: "#fff" }}
				>
					<span
						className="navbar-toggler-icon"
						style={{ color: "#fff" }}
					></span>
				</button>

				<div className="collapse navbar-collapse " id="navbarNav">
					<div className="navbar-nav ml-auto text-center">
						<NavLink to="/Subscriptionnote" className=" my-3  employement_item ">
							{" "}
							Assessments
						</NavLink>{" "}
						<NavLink to="/Subscriptionnote" className=" my-3  employement_item ">
							Courses
						</NavLink>{" "}
						<NavLink to="/CompailerCode" className="employement_item my-3 ">
							Code
						</NavLink>
						<NavLink to="/Subscriptionnote" className="employement_item my-3  ">
							{" "}
							Practice
						</NavLink>
						<NavLink to="/Packs" className="employement_item my-3  ">
							{" "}
							Packs
						</NavLink>
						<NavLink to="/UserBlogs" className="employement_item my-3 ">
							{" "}
							Blogs
						</NavLink>
						{/* <NavLink to="/Subscriptionnote" className="employement_item my-3 ">
							Dashboard{" "}
						</NavLink> */}
					</div>

					<div className="text-center">
						<button className="logout_button"onClick={GotoSignupPAge}>Log In</button>
						{/* <select className="logout_button" id="loginType" onChange={handleLoginChange} value={selectedLogin}>
							<option value="Log In as">Log In as</option>
							<option value="candidate" >Candidate</option>
							<option value="partner">Admin</option>
							<option value="SuperAdmin">SuperAdmin</option>
						</select> */}
					</div>
				</div>
			</nav>
		</div>
	);
}

export default UserNavbar;
