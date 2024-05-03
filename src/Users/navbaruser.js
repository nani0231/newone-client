import Cookies from "js-cookie";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../All Images/navbar_logo.jpg';

function NavbarUser() {
	let navigate = useNavigate();

	const gotohome = () => {
		navigate("/Userdashbord");
	};
	const gotologout = () => {
		Cookies.remove("token");
		navigate("/");
	};
	

	return (
		<div>
			<nav
				className="navbar navbar-expand-lg navbar-light nav_item py-2 fixed-top"
				style={{ padding: "0 20px",height:"85px"}}
			>
				<div className="navbar-brand my-auto">
					<img
						src={logo}
						alt="img"
						className="img-fluid"
						style={{ height: "70px", width:"250px",borderRadius: "7px", cursor: "pointer" }}
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

				<div className="collapse navbar-collapse  " id="navbarNav">
					<div className="navbar-nav ml-auto text-center">
						<NavLink to="/Userassessments" className=" my-3  employement_item ">
							{" "}
							Assessments
						</NavLink>{" "}
						<NavLink to="/user/coursesHome" className=" my-3  employement_item">
							Courses
						</NavLink>{" "}
						<NavLink to="/Compailer" className="employement_item my-3">
							Code
						</NavLink>
						<NavLink to="/practies" className="employement_item my-3">
							{" "}
							Practice
						</NavLink>
						{/* <NavLink to="/Packs" className="employement_item my-3">
							{" "}
							Packs
						</NavLink> */}
						<NavLink to="/Usersblogs" className="employement_item my-3">
							{" "}
							Blogs
						</NavLink>
						<NavLink to="/Userdashbord" className="employement_item my-3">
							Dashboard{" "}
						</NavLink>
					</div>

					<div className="text-center">
						<button className="logout_button" onClick={gotologout}>Logout</button>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default NavbarUser;
