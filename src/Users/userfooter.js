import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from '../All Images/SkillHubLogoDark2.gif'

function UserFooter() {
	useEffect(() => {
		// Scroll to the top of the page when the component mounts
		window.scrollTo(0, 0);
	}, []);

	let navigate = useNavigate();

	const gotoabout = () => {
		navigate("/User/About-us");
	};

	const gotoService = () => {
		navigate("/User/services");
	};
	const gotoTerms = () => {
		navigate("/User/terms-condition");
	};
	const gotocontact = () => {
		navigate("/User/contact");
	};

	return (
		<div className="footer_item" style={{ color: "#fff" }}>
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-3 col-md-6 col-12 p-0">
						<div className="mt-4 text-center">
							<img
								
								src={logo}
								className="img-fluiddark"
								alt="img"
								style={{ height: "80px",width:"283px", borderRadius: "10px" }}
							/>
						</div>
						
					</div>
					<div className="col-lg-3 col-md-6 col-12">
						<div className="mt-4">
							<h3>Company</h3>
							<div className="mt-4">
								<h6 onClick={gotoabout} className="footer_about mb-3">
									{" "}
									<i class="fa-solid fa-chevron-right mr-3"></i> About Us
								</h6>
								<h6 onClick={gotoService} className="footer_about mb-3">
									{" "}
									<i class="fa-solid fa-chevron-right mr-3"></i> Services
								</h6>
								<h6 onClick={gotoTerms} className="footer_about mb-3">
									{" "}
									<i class="fa-solid fa-chevron-right mr-3"></i> Terms and
									Conditions
								</h6>
								<h6 onClick={gotocontact} className="footer_about">
									{" "}
									<i class="fa-solid fa-chevron-right mr-3"></i> Contact Us
								</h6>
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-12">
						<div className="mt-4 usefull">
							<h3>Usefull Links</h3>
							<div className="mt-4">
								<h6 className="footer_about" onClick={()=>navigate("/subscriptionnote")}>
									{" "}
									<i class="fa-solid fa-chevron-right mr-3 mb-3"></i>{" "}
									Assessments
								</h6>
								<h6 className="footer_about" onClick={()=>navigate("/subscriptionnote")}>
									{" "}
									<i class="fa-solid fa-chevron-right mr-3"></i> Courses
								</h6>
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-12 ">
					<div className=" mt-3">
							<p>Leading Assesment Provided in India</p>
						</div>
						<div className=" mb-4">
							<i class="fa-brands fa-facebook-f social_icon facebook"></i>
							<i class="fa-brands fa-instagram social_icon insta"></i>
							<i class="fa-brands fa-x-twitter social_icon twitter"></i>
							<i class="fa-brands fa-linkedin-in social_icon linkedin"></i>
						</div>
						<div className="mt-4">
							<p>
								<i class="fa-regular fa-copyright"></i> 2024 Perfex
							</p>
							<p>A Product of Perfex Education PVT LTD</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserFooter;