import React, { useState } from "react";
import UserFooter from "./userfooter";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserNavbar from "./Usernavbar";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import NavbarUser from "./navbaruser";

const About = () => {
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
			<div className="about_banner">
				<div className="about">
					<div className="">About Us</div>
				</div>
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-2 col-md-1"></div>
						<div className="col-lg-8 col-md-10">
							<div className=" ">
								<h3 className="text-center mt-4">Skillhub</h3>

								<p className="text-justify">
									Skillhub, an esteemed Indian EduTech firm headquartered in
									Hyderabad, stands as the nation's foremost Platform as a
									Service (PaaS) and E-Learning platform. Instacks, initially
									devised in 2017 as an Assessment platform catering to
									competition test preparation, has significantly broadened its
									reach across India. Boasting a substantial user base, it
									exceeds 1,00,000 subscribers, hosts 53,000 active users,
									serves 623B clients, and collaborates with 7 prestigious
									institutes, marking a remarkable impact in the educational
									landscape. The company's commitment to excellence continues to
									shape the future of education in the country.
								</p>

								<h3 className="text-center our">Our Vision</h3>
								<p className="text-justify">
									Driven by a vision to transform lives, we aim to seamlessly
									integrate disruptive technologies into daily existence for a
									better world. Our mission is to empower clients and
									stakeholders in realizing their visions, striving to become a
									global technology leader. We aspire to redefine everyday life
									through the widespread integration of Artificial Intelligence,
									Blockchain, and Cybersecurity, ensuring impactful
									advancements. With a strategic focus on Commerce, Finance, and
									Government, we strive to create positive change on a global
									scale. Our commitment lies in consistently pushing boundaries
									to elevate the human experience through innovative and
									transformative technology solutions.
								</p>
							</div>
							<section className="my-4">
								<h3 className="text-center mb-3 our">Our clients</h3>
								<Slider
									className="your-carousel-class text-center"
									slidesToShow={5}
									infinite={true}
									autoplay={true} // Enable autoplay
									autoplaySpeed={2000} // Set the autoplay speed in milliseconds (e.g., 3000ms or 3 seconds)
									classNameActive="active"
									responsive={[
										{
											breakpoint: 768, // medium screen breakpoint
											settings: {
												slidesToShow: 3,
											},
										},
										{
											breakpoint: 678, // small screen breakpoint
											settings: {
												slidesToShow: 2,
											},
										},
										{
											breakpoint: 400, // small screen breakpoint
											settings: {
												slidesToShow: 1,
											},
										},
									]} // This is the equivalent of addClassActive in Owl Carousel
								>
									<div className="service_item">
										<div>
											<img
												src="../Images/tcs.png"
												alt="img"
												className="img-fluid card_img "
											/>
										</div>
									</div>

									<div className="service_item">
										<div>
											<img
												src="../Images/wipro.png"
												alt="img"
												className="img-fluid card_img"
											/>
										</div>
									</div>

									<div className="service_item">
										<div>
											<img
												src="../Images/accenture.png"
												alt="img"
												className="img-fluid card_img"
											/>
										</div>
									</div>

									<div className="service_item">
										<div>
											<img
												src="../Images/google.png"
												alt="img"
												className="img-fluid card_img"
											/>
										</div>
									</div>

									<div className="service_item">
										<div>
											<img
												src="../Images/dell.png"
												alt="img"
												className="img-fluid card_img"
											/>
										</div>
									</div>

									<div className="service_item">
										<div>
											<img
												src="../Images/infosys.png"
												alt="img"
												className="img-fluid card_img"
											/>
										</div>
									</div>

									<div className="service_item">
										<div>
											<img
												src="../Images/amazon1.png"
												alt="img"
												className="img-fluid card_img"
											/>
										</div>
									</div>

									<div className="service_item">
										<div>
											<img
												src="../Images/epam.png"
												alt="img"
												className="img-fluid card_img"
											/>
										</div>
									</div>

									<div className="service_item">
										<div>
											<img
												src="../Images/hcl.png"
												alt="img"
												className="img-fluid card_img"
											/>
										</div>
									</div>

									<div className="service_item">
										<div>
											<img
												src="../Images/cognizant.png"
												alt="img"
												className="img-fluid card_img"
											/>
										</div>
									</div>

									<div className="service_item">
										<div>
											<img
												src="../Images/cap.png"
												alt="img"
												className="img-fluid card_img"
											/>
										</div>
									</div>

									<div className="service_item">
										<div>
											<img
												src="../Images/micro.png"
												alt="img"
												className="img-fluid card_img"
											/>
										</div>
									</div>
								</Slider>
							</section>
						</div>
						<div className="col-lg-2 col-md-1"></div>
					</div>
				</div>
			</div>

			<div>
				<UserFooter />
			</div>
		</div>
	);
};

export default About;
