import React from "react";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminHome = () => {
	const [contentIndex, setContentIndex] = useState(0);
	const [itisLoading, setItisLoading] = useState(true);
	let navigate = useNavigate("");

	const contentAlternatives = ["Courses", "Assessments"];

	useEffect(() => {
		const intervalId = setInterval(() => {
			setContentIndex(
				(prevIndex) => (prevIndex + 1) % contentAlternatives.length
			);
			setItisLoading(false);
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	const [isOpen, setIsOpen] = useState(true);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
		menuBtnChange();
	};
	const menuBtnChange = () => {
		const sidebar = document.querySelector(".sidebar");
		const closeBtn = document.querySelector("#btn");
		const searchBtn = document.querySelector(".bx-search");

		if (sidebar?.classList.contains("open")) {
			closeBtn?.classList.replace("bx-menu", "bx-menu-alt-right");
		} else {
			closeBtn?.classList.replace("bx-menu-alt-right", "bx-menu");
		}
	};

	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					{isOpen && (
						<div className=" col-12 col-lg-3 col-md-12 sectioncard121">
							<Sidebar />
						</div>
					)}
					<div
						className={`my-3 col-12 col-md-${isOpen ? 12 : 9} col-lg-${
							isOpen ? 9 : 12
						}`}
					>
						<i
							className="fa-solid fa-bars bars d-lg-block d-xl-block  d-none"
							onClick={toggleSidebar}
						></i>
						{itisLoading ? (
							<>
								<div
									className="d-flex flex-row justify-content-center align-items-center"
									style={{ height: "100vh" }}
								>
									<div className="loader loader1">
										<div>
											<div>
												<div>
													<div>
														<div>
															<div></div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>
						) : (
							<div>
								<section className="mt-2">
									<div className="background_gif1">
										<div className="row p-3 my-4">
											<div className="col-md-6 my-auto">
												<div className=" text-white">
													<h1 className="banner_heading1">
														Hello{" "}
														<span
															className="changed_content"
															style={{ color: "#16c3ea" }}
														>
															{contentAlternatives[contentIndex]}
														</span>
													</h1>
													<p>
														Intaractive Courses, Top notch Assessments High
														yeild QBank and best can have at Once click away
													</p>
													<div>
														<button
															className="get_btn mb-3"
															onClick={() => navigate("/signupUserData")}
															style={{
																backgroundColor: "#16c3ea",
																color: "#000",
															}}
														>
															Login To Explore...
														</button>
													</div>
												</div>
											</div>

											<div className="col-md-6 text-center">
												<div>
													<img
														src="https://img.freepik.com/free-vector/programmer-concept-illustration_114360-2417.jpg?w=740&t=st=1707452537~exp=1707453137~hmac=44488c90bbc1f6d510528f21ffb4ea9e733f90322dbe94babf75842664c4846c"
														alt="img"
														className="img-fluid payment_img "
													/>
												</div>
											</div>
										</div>
									</div>
								</section>

								<section className="">
									<div className="container-section mt-4 text-center">
										<div className="row ">
											<div className="col-md-6 m-auto ">
												<h4 className="text-center mb-4">
													Get a Choice of your Assessment Pack{" "}
												</h4>
												<div>
													<div className="row ">
														<div className="col-lg-6 col-md-12 mb-3">
															<div className="card p-2">
																<div>
																	<span className="text-dark ">
																		Design by Subject Experts
																	</span>
																</div>
															</div>
														</div>
														<div className="col-lg-6 col-md-12 mb-3">
															<div className="card p-2">
																<div>
																	<span className="text-dark">
																		Lattest sylabus and pattern
																	</span>
																</div>
															</div>
														</div>
													</div>
													<div className="row ">
														<div className="col-lg-6 col-md-12 mb-3">
															<div className="card p-2">
																<div>
																	<span className="text-dark">
																		Detailed solution with analysis
																	</span>
																</div>
															</div>
														</div>
														<div className="col-lg-6 col-md-12 mb-3">
															<div className="card p-2">
																<div>
																	<span className="text-dark">
																		Subject wise assessments
																	</span>
																</div>
															</div>
														</div>
													</div>
													<div className="row ">
														<div className="col-lg-6 col-md-12 mb-3">
															<div className="card p-2">
																<div>
																	<span className="text-dark">
																		Topic wise model Questions
																	</span>
																</div>
															</div>
														</div>
														<div className="col-lg-6 col-md-12 mb-3">
															<div className="card p-2">
																<div>
																	<span className="text-dark">
																		Live test with real time Experience
																	</span>
																</div>
															</div>
														</div>
													</div>
													<div className="text-end">
														<button
															className="get_btn1"
															style={{
																backgroundColor: "#16c3ea",
																color: "#000",
															}}
														>
															200+ Test are Waiting for you...
														</button>
													</div>
												</div>
											</div>
											<div className="col-md-6 text-center">
												<div>
													<img
														src="https://img.freepik.com/free-vector/pair-programming-concept-illustration_114360-2170.jpg?w=740&t=st=1707452889~exp=1707453489~hmac=d193ecc2ab339ef5ab35ae237268d1c519ac3ff13be5a4323b64998dc8e70561"
														alt="img"
														className="bussines_item img-fluid"
													/>
												</div>
											</div>
										</div>
									</div>
								</section>

								<section className="">
									<div className="mt-4 text-center">
										<div className="row">
											<div className="col-lg-6 col-md-12  d-md-block d-none">
												<div>
													<img
														src="https://img.freepik.com/free-vector/javascript-frameworks-concept-illustration_114360-752.jpg?ga=GA1.1.858548410.1688366189&semt=ais"
														alt="img"
														className="img-fluid payment_img "
													/>
												</div>
											</div>
											<div className="col-lg-6 col-md-12">
												<h4 className="text-center">
													Now it's easy to Upskill yourself
												</h4>
												<div className="row">
													<div className="col-lg-4 col-md-4 col-sm-4 col-6  mt-3">
														<div className="service_item">
															<div>
																<img
																	src="../Images/c-sharp.png"
																	alt="img"
																	className="img-fluid card_img"
																/>
															</div>
														</div>
													</div>
													<div className="col-lg-4 col-md-4 col-sm-4 col-6  mt-3">
														<div className="service_item">
															<div>
																<img
																	src="../Images/python.png"
																	alt="img"
																	className="img-fluid card_img"
																/>
															</div>
														</div>
													</div>
													<div className="col-lg-4 col-md-4 col-sm-4 col-6  mt-3">
														<div className="service_item">
															<div>
																<img
																	src="../Images/java.png"
																	alt="img"
																	className="img-fluid card_img"
																/>
															</div>
														</div>
													</div>
													<div className="col-lg-4 col-md-4 col-sm-4 col-6  mt-3">
														<div className="service_item">
															<div>
																<img
																	src="../Images/amazon.png"
																	alt="img"
																	className="img-fluid card_img"
																/>
															</div>
														</div>
													</div>
													<div className="col-lg-4 col-md-4 col-sm-4 col-6  mt-3">
														<div className="service_item">
															<div>
																<img
																	src="../Images/mysql.png"
																	alt="img"
																	className="img-fluid card_img"
																/>
															</div>
														</div>
													</div>
													<div className="col-lg-4 col-md-4 col-sm-4 col-6  mt-3">
														<div className="service_item">
															<div>
																<img
																	src="../Images/microsoft.png"
																	alt="img"
																	className="img-fluid card_img"
																/>
															</div>
														</div>
													</div>
													<div className="col-lg-4 col-md-4 col-sm-4 col-6  mt-3">
														<div className="service_item">
															<div>
																<img
																	src="../Images/js.png"
																	alt="img"
																	className="img-fluid card_img"
																/>
															</div>
														</div>
													</div>
													<div className="col-lg-4 col-md-4 col-sm-4 col-6  mt-3">
														<div className="service_item">
															<div>
																<img
																	src="../Images/github-sign.png"
																	alt="img"
																	className="img-fluid card_img"
																/>
															</div>
														</div>
													</div>
													<div className="col-lg-4 col-md-4 col-sm-4 col-6  mt-3">
														<div className="service_item">
															<div>
																<img
																	src="../Images/react.png"
																	alt="img"
																	className="img-fluid card_img"
																/>
															</div>
														</div>
													</div>
													<div className="col-lg-4 col-md-4 col-sm-4 col-6  mt-3">
														<div className="service_item">
															<div>
																<img
																	src="../Images/node-js.png"
																	alt="img"
																	className="img-fluid card_img"
																/>
															</div>
														</div>
													</div>
													<div className="col-lg-6 col-md-12 text-center my-auto ">
														<div className="mt-3">
															<button
																className="get_btn1"
																style={{
																	backgroundColor: "#16c3ea",
																	color: "#000",
																}}
															>
																Explore our 1-Academy Courses
															</button>
														</div>
													</div>
												</div>
											</div>
											<div className="col-lg-6 col-md-12 d-md-none d-sm-block ">
												<div>
													<img
														src="https://img.freepik.com/free-vector/javascript-frameworks-concept-illustration_114360-752.jpg?ga=GA1.1.858548410.1688366189&semt=ais"
														alt="img"
														className="img-fluid payment_img "
													/>
												</div>
											</div>
										</div>
									</div>
								</section>

								<section className="">
									<div className=" mt-4 text-center">
										<div className="row">
											<div className="col-md-3">
												<div className="card detail_card p-2  mt-3 w-100">
													<span className="">Detailed Learning path</span>
												</div>
											</div>
											<div className="col-md-3">
												<div className="card detail_card p-2  mt-3 w-100">
													<span className="">Focus Approach</span>
												</div>
											</div>
											<div className="col-md-3">
												<div className="card detail_card p-2  mt-3 w-100">
													<span className="">Experts Content Partner</span>
												</div>
											</div>
											<div className="col-md-3">
												<div className="card detail_card p-2  mt-3 w-100">
													<span className="">Best Quality course</span>
												</div>
											</div>
										</div>
									</div>
								</section>

								<section className="">
									<div className="container-section mt-4">
										<div className="row m-0">
											<div className="col-lg-6 col-md-12 text-center">
												<h4 className="text-center mt-4">
													Let's Code With Fun
												</h4>
												<div>
													<img
														src="https://img.freepik.com/free-vector/binary-code-concept-illustration_114360-6908.jpg?w=740&t=st=1707452658~exp=1707453258~hmac=b29ce6093593f50e1b6848817b94a98679b92f74798a7f4dc0a7106cee48ea6a"
														alt="img"
														className="bussines_item img-fluid"
													/>
												</div>
											</div>
											<div className="col-lg-6 col-md-12 m-auto ">
												<h5 className=" mb-4">
													Be the Programmer as you aspire to be.
												</h5>
												<div className="">
													<button className="content_btn mt-3">
														Algorithms
													</button>
													<button className="content_btn mt-3">
														Data Structure
													</button>
													<button className="content_btn mt-3">
														Dynamic Programming
													</button>
													<button className="content_btn mt-3">
														Linked List
													</button>
													<button className="content_btn mt-3">Graphs</button>
													<button className="content_btn mt-3">
														Binery Trees
													</button>
													<button className="content_btn mt-3">Arrey</button>
													<button className="content_btn mt-3">
														Algorithms
													</button>
													<button className="content_btn mt-3">Pointers</button>
													<button className="content_btn mt-3">
														Recurssion
													</button>
												</div>
												<p className="mt-3">
													The Best place to enhance your programming skills,
													Explore and practice for the Technical and Coding
													Interviews.
												</p>
											</div>
										</div>
									</div>
								</section>

								<section className="">
									<div className="container-section mt-4">
										<div className="row m-0">
											<div className="col-lg-6 col-md-12 m-auto ">
												<h5 className=" mb-4">
													Train and get placed in one of your dream companies.
												</h5>

												<p className="mt-3">
													Our Instructors helps you to upskill at market cutting
													edge technologies and programming.
												</p>
												<ul className="pl-3">
													<li>Customized syllabus</li>
													<li>One 2 One live classes</li>
													<li>
														At your feasible timming on weekdays / weekends
													</li>
													<li>Dedicated Query resolution instructor</li>
													<li>Job Assistance</li>
												</ul>
												<div className="text-center">
													<button
														className="get_btn1"
														style={{
															backgroundColor: "#16c3ea",
															color: "#000",
														}}
													>
														Contact Us
													</button>
												</div>
											</div>
											<div className="col-lg-6 col-md-12 text-center">
												<div>
													<img
														src="https://img.freepik.com/free-vector/software-integration-concept-illustration_114360-7447.jpg?ga=GA1.1.858548410.1688366189&semt=ais"
														alt="img"
														className="bussines_item img-fluid"
													/>
												</div>
											</div>
										</div>
									</div>
								</section>

								<section className="mt-4">
									<div className="row">
										<div className="col-md-12">
											<h4 className="text-center">
												We are equipped with 12 Compilers
											</h4>
											<div className="row text-center">
												<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
													<div className="service_item">
														<div>
															<img
																src="../Images/c-sharp.png"
																alt="img"
																className="img-fluid card_img"
															/>
														</div>
													</div>
												</div>
												<div className="col-lg-2 col-md-3 col-sm-4 col-6   mt-3">
													<div className="service_item">
														<div>
															<img
																src="../Images/python.png"
																alt="img"
																className="img-fluid card_img"
															/>
														</div>
													</div>
												</div>
												<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
													<div className="service_item">
														<div>
															<img
																src="../Images/java.png"
																alt="img"
																className="img-fluid card_img"
															/>
														</div>
													</div>
												</div>
												<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
													<div className="service_item">
														<div>
															<img
																src="../Images/amazon.png"
																alt="img"
																className="img-fluid card_img"
															/>
														</div>
													</div>
												</div>
												<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
													<div className="service_item">
														<div>
															<img
																src="../Images/mysql.png"
																alt="img"
																className="img-fluid card_img"
															/>
														</div>
													</div>
												</div>
												<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
													<div className="service_item">
														<div>
															<img
																src="../Images/microsoft.png"
																alt="img"
																className="img-fluid card_img"
															/>
														</div>
													</div>
												</div>
												<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
													<div className="service_item">
														<div>
															<img
																src="../Images/js.png"
																alt="img"
																className="img-fluid card_img"
															/>
														</div>
													</div>
												</div>
												<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
													<div className="service_item">
														<div>
															<img
																src="../Images/github-sign.png"
																alt="img"
																className="img-fluid card_img"
															/>
														</div>
													</div>
												</div>
												<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
													<div className="service_item">
														<div>
															<img
																src="../Images/react.png"
																alt="img"
																className="img-fluid card_img"
															/>
														</div>
													</div>
												</div>
												<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
													<div className="service_item">
														<div>
															<img
																src="../Images/node-js.png"
																alt="img"
																className="img-fluid card_img"
															/>
														</div>
													</div>
												</div>
												<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
													<div className="service_item">
														<div>
															<img
																src="../Images/typescript.png"
																alt="img"
																className="img-fluid card_img"
															/>
														</div>
													</div>
												</div>
												<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
													<div className="service_item">
														<div>
															<img
																src="../Images/php.png"
																alt="img"
																className="img-fluid card_img"
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</section>

								<section className="">
									<div className="container-section mt-5">
										<h4 className="text-center ">
											Digitalize your Trainning Recruitment with our cloud
											solution.
										</h4>
										<div className="row">
											<div className="col-lg-6 col-md-12 m-auto ">
												<p className="mt-3">
													The only online EdTech SaaS based cloud Platform
													equipped with all the features to build your own LMS
													platform with No-Code
												</p>
												<div className="">
													<button className="content_btn mt-3">
														Schedule Assessment
													</button>
													<button className="content_btn mt-3">
														Host Hackthons
													</button>
													<button className="content_btn mt-3">LMS</button>
													<button className="content_btn mt-3">Course</button>
													<button className="content_btn mt-3">
														Manage Question Bank
													</button>
													<button className="content_btn mt-3">
														Intelligence Reports
													</button>
													<button className="content_btn mt-3">
														In Depth Analytics{" "}
													</button>
													<button className="content_btn mt-3">
														User Management
													</button>
													<button className="content_btn mt-3">
														Institution Management
													</button>
													<button className="content_btn mt-3">
														Plug and Play Data
													</button>
												</div>

												<div className="text-center mt-3">
													<button
														className="get_btn"
														style={{
															backgroundColor: "#16c3ea",
															color: "#000",
														}}
													>
														Contact Sale
													</button>
												</div>
											</div>
											<div className="col-lg-6 col-md-12 text-center">
												<div>
													<img
														src="https://img.freepik.com/free-vector/gradient-intranet-illustration_23-2149368727.jpg?w=826&t=st=1704368307~exp=1704368907~hmac=c93de891e24053eb9a36e13dbb36b1d9b54c94105133fed9bab437b6c65c71b0"
														alt="img"
														className="bussines_item img-fluid"
													/>
												</div>
											</div>
										</div>
									</div>
								</section>

								<section className="">
									<div className="mt-4">
										<h4 className="text-center">
											Our <span style={{ color: "#16c3ea" }}>Aspirants</span>{" "}
											placed in 30+ sector leading companies
										</h4>
										<div className="row text-center">
											<div className="col-lg-2 col-md-3 col-sm-4 col-6 mt-3">
												<div className="service_item">
													<div>
														<img
															src="../Images/tcs.png"
															alt="img"
															className="img-fluid card_img"
														/>
													</div>
												</div>
											</div>
											<div className="col-lg-2 col-md-3 col-sm-4 col-6 mt-3">
												<div className="service_item">
													<div>
														<img
															src="../Images/wipro.png"
															alt="img"
															className="img-fluid card_img"
														/>
													</div>
												</div>
											</div>
											<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
												<div className="service_item">
													<div>
														<img
															src="../Images/accenture.png"
															alt="img"
															className="img-fluid card_img"
														/>
													</div>
												</div>
											</div>
											<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
												<div className="service_item">
													<div>
														<img
															src="../Images/google.png"
															alt="img"
															className="img-fluid card_img"
														/>
													</div>
												</div>
											</div>
											<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
												<div className="service_item">
													<div>
														<img
															src="../Images/dell.png"
															alt="img"
															className="img-fluid card_img"
														/>
													</div>
												</div>
											</div>
											<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
												<div className="service_item">
													<div>
														<img
															src="../Images/infosys.png"
															alt="img"
															className="img-fluid card_img"
														/>
													</div>
												</div>
											</div>
											<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
												<div className="service_item">
													<div>
														<img
															src="../Images/amazon1.png"
															alt="img"
															className="img-fluid card_img"
														/>
													</div>
												</div>
											</div>
											<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
												<div className="service_item">
													<div>
														<img
															src="../Images/epam.png"
															alt="img"
															className="img-fluid card_img"
														/>
													</div>
												</div>
											</div>
											<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
												<div className="service_item">
													<div>
														<img
															src="../Images/hcl.png"
															alt="img"
															className="img-fluid card_img"
														/>
													</div>
												</div>
											</div>
											<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
												<div className="service_item">
													<div>
														<img
															src="../Images/cognizant.png"
															alt="img"
															className="img-fluid card_img"
														/>
													</div>
												</div>
											</div>
											<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
												<div className="service_item">
													<div>
														<img
															src="../Images/cap.png"
															alt="img"
															className="img-fluid card_img"
														/>
													</div>
												</div>
											</div>
											<div className="col-lg-2 col-md-3 col-sm-4 col-6  mt-3">
												<div className="service_item">
													<div>
														<img
															src="../Images/micro.png"
															alt="img"
															className="img-fluid card_img"
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</section>

								<section className="">
									<div className="text-center mt-4">
										<h4>Our users Love Us</h4>
										<p>
											Don't take just our word for it. Over the years, we've
											gotten some great positive from our happy users. Below are
											just few
										</p>

										<Slider
											className="your-carousel-class"
											slidesToShow={2}
											infinite={true}
											autoplay={true} // Enable autoplay
											autoplaySpeed={3000} // Set the autoplay speed in milliseconds (e.g., 3000ms or 3 seconds)
											classNameActive="active"
											responsive={[
												{
													breakpoint: 768, // medium screen breakpoint
													settings: {
														slidesToShow: 2,
													},
												},
												{
													breakpoint: 678, // small screen breakpoint
													settings: {
														slidesToShow: 1,
													},
												},
											]} // This is the equivalent of addClassActive in Owl Carousel
										>
											{/* Your carousel items go here */}
											<div className="text-center mt-4">
												<div className="d-flex justify-content-center">
													<img
														src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?ga=GA1.1.858548410.1688366189&semt=sph"
														className="img-fluid card_img1"
													/>
												</div>
												<p className="pr-2">
													Google is a multinational technology company known for
													its search engine, providing quick and accurate
													results. Founded in 1998, it has expanded into various
													services, including advertising, cloud computing, and
													software development.
												</p>
												<p className="name_item" style={{ color: "#16c3ea" }}>
													{" "}
													- Kishan
												</p>
											</div>
											<div className="text-center mt-4">
												<div className="d-flex justify-content-center">
													<img
														src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?ga=GA1.1.858548410.1688366189&semt=sph"
														className="img-fluid card_img1"
													/>
												</div>
												<p className="pr-2">
													Wipro is a global IT consulting and services company
													headquartered in India. Established in 1945, it offers
													a range of technology solutions, including software
													development, infrastructure management, and
													cost-effective services worldwide.
												</p>
												<p className="name_item" style={{ color: "#16c3ea" }}>
													{" "}
													- Sunil
												</p>
											</div>
											<div className="text-center mt-4">
												<div className="d-flex justify-content-center">
													<img
														src="https://img.freepik.com/premium-vector/young-man-avatar-character_24877-9475.jpg?ga=GA1.1.858548410.1688366189&semt=sph"
														className="img-fluid card_img1"
													/>
												</div>
												<p className="pr-2">
													Microsoft, founded in 1975 by Bill Gates and Paul
													Allen, is a global technology giant. Renowned for its
													operating system, Windows, influencing diverse aspects
													of technology worldwide.
												</p>
												<p className="name_item" style={{ color: "#16c3ea" }}>
													{" "}
													- Deepak
												</p>
											</div>
											<div className="text-center mt-4">
												<div className="d-flex justify-content-center">
													<img
														src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg?w=740&t=st=1704433588~exp=1704434188~hmac=0a66797e1e9a4963514e01d6debc3db0758f572e7d008d3adceff03f3b6947a8"
														className="img-fluid card_img1"
													/>
												</div>
												<p className="pr-2">
													Google is a multinational technology company known for
													its search engine, providing quick and accurate
													results. Founded in 1998, it has expanded into various
													services, including advertising, cloud computing, and
													software development.
												</p>
												<p className="name_item" style={{ color: "#16c3ea" }}>
													{" "}
													- Jay
												</p>
											</div>
											<div className="text-center mt-4">
												<div className="d-flex justify-content-center">
													<img
														src="https://img.freepik.com/free-vector/head-man_1308-33466.jpg?ga=GA1.1.858548410.1688366189&semt=sph"
														className="img-fluid card_img1"
													/>
												</div>
												<p className="pr-2">
													Google is a multinational technology company known for
													its search engine, providing quick and accurate
													results. Founded in 1998, it has expanded into various
													services, including advertising, cloud computing, and
													software development. Google's mission is to organize
													the world's information and make it universally
													accessible and useful.
												</p>
												<p className="name_item" style={{ color: "#16c3ea" }}>
													{" "}
													- Devaratha
												</p>
											</div>
											{/* Add more items as needed */}
										</Slider>
									</div>
								</section>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminHome;
