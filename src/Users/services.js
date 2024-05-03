import React from "react";
import UserFooter from "./userfooter";
import NavbarUser from "./navbaruser";
import UserNavbar from "./Usernavbar";
import Cookies from 'js-cookie';
import { useState , useEffect } from "react";

const Service = () => {
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
				<div className="services">
					<div className="">Services</div>
				</div>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-1"></div>
						<div className="col-md-10">
							<div className=" my-4">
								<div className="row">
									<h6 className="text-center mt-3">
										Service is the backbone of excellence. Our dedicated team
										delivers unparalleled quality, ensuring customer
										satisfaction. Trust us for reliable solutions and an
										exceptional experience every time.
									</h6>
									<div className="col-lg-6 col-xl-4 mt-5">
										<div className="card12 text-center">
											<div className="" style={{ marginBottom: "-20px" }}>
												<img
													src="../Images/web-programming.png"
													alt="img"
													className="img-fluid card_img2 "
												/>
											</div>
											<div className="mb-3">
												<h4>Mobile Development</h4>
											</div>
											<div>
												<p className="text-justify text_service">
													Mobile development transforms ideas into powerful
													apps. Our expert team crafts innovative solutions,
													ensuring seamless user experiences. From concept to
													code, we deliver cutting-edge mobile applications that
													redefine connectivity.
												</p>
											</div>
										</div>
									</div>
									<div className="col-lg-6 col-xl-4 mt-5">
										<div className="card12 text-center">
											<div className="" style={{ marginBottom: "-20px" }}>
												<img
													src="../Images/layers.png"
													alt="img"
													className="img-fluid card_img2 "
												/>
											</div>
											<div className="mb-3">
												<h4>Mobility Services</h4>
											</div>
											<div>
												<p className="text-justify text_service">
													Revolutionize your journey with our comprehensive
													mobility services. From seamless transportation
													solutions to innovative vehicle technologies, we
													empower your mobility needs, ensuring efficiency,
													comfort, and convenience at every turn.
												</p>
											</div>
										</div>
									</div>
									<div className="col-lg-6 col-xl-4 mt-5">
										<div className="card12 text-center">
											<div className="" style={{ marginBottom: "-20px" }}>
												<img
													src="../Images/desktop-monitor.png"
													alt="img"
													className="img-fluid card_img2 "
												/>
											</div>
											<div className="mb-3">
												<h4>Graphic Design</h4>
											</div>
											<div>
												<p className="text-justify text_service">
													Graphic design blends creativity and precision to
													visually communicate ideas. Our skilled designers
													craft compelling visuals, transforming concepts into
													impactful designs that captivate and communicate
													effectively across various mediums.
												</p>
											</div>
										</div>
									</div>
									<div className="col-lg-6 col-xl-4 mt-5">
										<div className="card12 text-center">
											<div className="" style={{ marginBottom: "-20px" }}>
												<img
													src="../Images/cubes.png"
													alt="img"
													className="img-fluid card_img2 "
												/>
											</div>
											<div className="mb-3">
												<h4>Product Design</h4>
											</div>
											<div>
												<p className="text-justify text_service">
													Product design is the art of creating functional and
													visually appealing products. Our innovative approach
													blends form and function, delivering solutions that
													enhance user experience and surpass expectations.
												</p>
											</div>
										</div>
									</div>
									<div className="col-lg-6 col-xl-4 mt-5">
										<div className="card12 text-center">
											<div className="" style={{ marginBottom: "-20px" }}>
												<img
													src="../Images/world-wide-web.png"
													alt="img"
													className="img-fluid card_img2 "
												/>
											</div>
											<div className="mb-3">
												<h4>Web Development</h4>
											</div>
											<div>
												<p className="text-justify text_service">
													Web development transforms ideas into interactive
													experiences. Our skilled team crafts seamless
													websites, utilizing cutting-edge technologies to
													enhance functionality, design, and user engagement.
													Elevate your online presence with us.
												</p>
											</div>
										</div>
									</div>
									<div className="col-lg-6 col-xl-4 mt-5">
										<div className="card12 text-center">
											<div className="" style={{ marginBottom: "-20px" }}>
												<img
													src="../Images/cloud.png"
													alt="img"
													className="img-fluid card_img2 "
												/>
											</div>
											<div className="mb-3">
												<h4>Cloud Development</h4>
											</div>
											<div>
												<p className="text-justify text_service">
													Cloud development transforms businesses with scalable,
													secure, and accessible solutions. Harness the power of
													cloud technology for seamless collaboration, rapid
													innovation, and efficient resource utilization in your
													projects.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-1"></div>
					</div>
				</div>
			</div>

			<div>
				<UserFooter />
			</div>
		</div>
	);
};

export default Service;
