import React from "react";
import UserFooter from "./userfooter";
import NavbarUser from "./navbaruser";
import UserNavbar from "./Usernavbar";
import Cookies from 'js-cookie';
import { useState , useEffect } from "react";

const Contact = () => {
	const [navbarSetting, setNavbarSetting] = useState(null);

	useEffect(() => {
	  const token = Cookies.get("token");
  
	  if (token) {
		setNavbarSetting(<NavbarUser/>);
	  } else {
		setNavbarSetting(<UserNavbar />);
	  }
	}, []);
	return (
		<div>
			{navbarSetting}
			<div className="User_contact py-4">
				<div className="container-fluid">
					<h1>Contact</h1>
					<h5 style={{color:"#fff"}}>We will be available for you at</h5>
					<div className="row  ">
						<div className="col-lg-1 d-lg-block d-md-none"></div>
						<div className="col-lg-10 col-md-12 my-auto">
							<div className="row my-4">
								<div className="col-md-6 text-center d-lg-block d-md-block d-none">
									<div>
										<img
											src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?w=740&t=st=1707986226~exp=1707986826~hmac=b234c92ec989dafd775a56fe713ab0f764ad774c319ee18ae85082646ac4fcae"
											alt="img"
											className="img-fluid payment_img mb-3 "
										/>
									</div>
								</div>
								<div className="col-md-6 my-auto">
									<div className=" ">
										<div className="contact_us">
											<p
												className="m-1"
												style={{ fontSize: "20px", fontWeight: "500" }}
											>
												{" "}
												<i className="fa-solid fa-phone mr-2"></i> Call Us
											</p>
											<p>+91 8987676545</p>
										</div>
										<div className="contact_us">
											<p
												className="m-1"
												style={{ fontSize: "20px", fontWeight: "500" }}
											>
												{" "}
												<i class="fa-solid fa-envelope mr-2"></i> Mail Us
											</p>
											<p>Support@skillhub.in</p>
										</div>
										<div className="contact_us">
											<p
												className="m-1"
												style={{ fontSize: "20px", fontWeight: "500" }}
											>
												Communication Address
											</p>
											<p>
												3rd Floor, Akshaya Arcade, Plot no.5, Amar society,
												Madhapur, Hyderabad, Telangana 500033.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-1 d-lg-block d-md-none"></div>
					</div>
				</div>
			</div>
			<UserFooter />
		</div>
	);
};

export default Contact;
