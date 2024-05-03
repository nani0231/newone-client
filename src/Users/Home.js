import React from "react";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserNavbar from "./Usernavbar";
import UserFooter from "./userfooter";
import { Navigate,useNavigate } from "react-router-dom";

const UserHome = () => {
	const [contentIndex, setContentIndex] = useState(0);
	let navigate = useNavigate("");

	const contentAlternatives = ["JavaScript", "React Js", "Node Js", "MongoDB"];

	useEffect(() => {
		const intervalId = setInterval(() => {
			setContentIndex(
				(prevIndex) => (prevIndex + 1) % contentAlternatives.length
			);
		}, 2000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div>
			<div>
				<UserNavbar />
			</div>
			<div className="container-fluid">
				<section className="home_banner">
					<div className="row background_gif ">
						<div className="col-md-1"></div>
						<div className="col-md-10 my-auto">
							<div className="row my-4">
								<div className="col-md-6 my-auto">
									<div className=" text-white">
										<h1 className="banner_heading">
											Start your Preparation with Skillhub :{" "}
											<span className="changed_content">
												{contentAlternatives[contentIndex]}
											</span>
										</h1>
										<p>
											Intaractive Courses, Top notch Assessments High yeild
											QBank and best can have at Once click away
										</p>
										<div>
											<button className="get_btn mb-3"
											onClick={()=>navigate("/signupUserData")}>
												Login To Explore...
											</button>
										</div>
									</div>
								</div>

								<div className="col-md-6 text-center p-0">
									<div>
										<img
											src="https://img.freepik.com/free-vector/code-typing-concept-illustration_114360-2937.jpg?w=740&t=st=1708506478~exp=1708507078~hmac=bbc9c9647aee69365988a58a897c7eda0b57b122e89adfa32080afb3cdc03d59"
											alt="img"
											className="img-fluid payment_img "
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-1"></div>
					</div>
				</section>

				<section className="container-section mt-4 text-center">
					<div className="row mt-4">
						<div className="col-md-1"></div>
						<div className="col-md-10">
							<div className="row">
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
											<button className="get_btn1">
												200+ Test are Waiting for you...
											</button>
										</div>
									</div>
								</div>
								<div className="col-md-6 text-center">
									<div>
										<img
											src="https://img.freepik.com/free-vector/hand-coding-concept-illustration_114360-8413.jpg?t=st=1708506598~exp=1708510198~hmac=0580578d3fb04eec2828bc8b5eaba72e94a2a75dfa72ecc0428645953066163a&w=740"
											alt="img"
											className="bussines_item img-fluid"
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-1"></div>
					</div>
				</section>

				<section className="mt-4 text-center">
					<div className="row ">
						<div className="col-md-1"></div>
						<div className="col-md-10">
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
										<div className="col-lg-3 col-md-4 col-sm-4 col-6  mt-3">
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
										<div className="col-lg-3 col-md-4 col-sm-4 col-6  mt-3">
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
										<div className="col-lg-3 col-md-4 col-sm-4 col-6  mt-3">
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
										<div className="col-lg-3 col-md-4 col-sm-4 col-6  mt-3">
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
										<div className="col-lg-3 col-md-4 col-sm-4 col-6  mt-3">
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
										<div className="col-lg-3 col-md-4 col-sm-4 col-6  mt-3">
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
										<div className="col-lg-3 col-md-4 col-sm-4 col-6  mt-3">
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
										<div className="col-lg-3 col-md-4 col-sm-4 col-6  mt-3">
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
										<div className="col-lg-3 col-md-4 col-sm-4 col-6  mt-3">
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
										<div className="col-lg-3 col-md-4 col-sm-4 col-6  mt-3">
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
												<button className="get_btn1">
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
						<div className="col-md-1"></div>
					</div>
				</section>

				<section className="mt-4 text-center">
					<div className="row my-4">
						<div className="col-md-2 d-lg-block d-md-none"> </div>
						<div className="col-lg-8 col-md-12  detail_card1">
							<div className="card detail_card p-2 mr-3 mt-3">
								<span className="">Detailed Learning path</span>
							</div>
							<div className="card detail_card p-2 mr-3 mt-3">
								<span className="">Focus Approach</span>
							</div>
							<div className="card detail_card p-2 mr-3 mt-3">
								<span className="">Experts Content Partner</span>
							</div>
							<div className="card detail_card p-2 mr-3 mt-3">
								<span className="">Best Quality course</span>
							</div>
						</div>
						<div className="col-md-2 d-lg-block d-md-none"> </div>
					</div>
				</section>

				<section className="container-section mt-4">
					<div className="row mt-4">
						<div className="col-md-1"></div>
						<div className="col-md-10">
							<div className="row">
								<div className="col-lg-6 col-md-12 text-center">
									<h4 className="text-center mt-4">Let's Code With Fun</h4>
									<div>
										<img
											src="https://img.freepik.com/free-vector/programmer-concept-illustration_114360-2417.jpg?w=740&t=st=1704364116~exp=1704364716~hmac=768f118299cbafee3e1d67653e367119d0c5eb5b618db5eb9c021e5b062b69d7"
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
										<button className="content_btn mt-3">Algorithms</button>
										<button className="content_btn mt-3">Data Structure</button>
										<button className="content_btn mt-3">
											Dynamic Programming
										</button>
										<button className="content_btn mt-3">Linked List</button>
										<button className="content_btn mt-3">Graphs</button>
										<button className="content_btn mt-3">Binery Trees</button>
										<button className="content_btn mt-3">Arrey</button>
										<button className="content_btn mt-3">Algorithms</button>
										<button className="content_btn mt-3">Pointers</button>
										<button className="content_btn mt-3">Recurssion</button>
									</div>
									<p className="mt-3">
										The Best place to enhance your programming skills, Explore
										and practice for the Technical and Coding Interviews.
									</p>
								</div>
							</div>
						</div>
						<div className="col-md-1"></div>
					</div>
				</section>

				<section className="container-section mt-4">
					<div className="row mt-4">
						<div className="col-md-1"></div>
						<div className="col-md-10">
							<div className="row">
								<div className="col-lg-6 col-md-12 m-auto ">
									<h5 className=" mb-4">
										Train and get placed in one of your dream companies.
									</h5>

									<p className="mt-3">
										Our Instructors helps you to upskill at market cutting edge
										technologies and programming.
									</p>
									<ul className="pl-3">
										<li>Customized syllabus</li>
										<li>One 2 One live classes</li>
										<li>At your feasible timming on weekdays / weekends</li>
										<li>Dedicated Query resolution instructor</li>
										<li>Job Assistance</li>
									</ul>
									<div className="text-center">
										<button className="get_btn1">
											Enroll for 1:1 live classes
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
						<div className="col-md-1"></div>
					</div>
				</section>

				<section className="mt-4">
					<div className="row">
						<div className="col-md-1"></div>
						<div className="col-md-10">
							<h4 className="text-center">We are equipped with 12 Compilers</h4>
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
						<div className="col-md-1"></div>
					</div>
				</section>

				<section className="container-section mt-5">
					<h4 className="text-center ">
						Digitalize your Trainning Recruitment with our cloud solution.
					</h4>
					<div className="row ">
						<div className="col-md-1"></div>
						<div className="col-md-10 ">
							<div className="row">
								<div className="col-lg-6 col-md-12 m-auto ">
									<p className="mt-3">
										The only online EdTech SaaS based cloud Platform equipped
										with all the features to build your own LMS platform with
										No-Code
									</p>
									<div className="">
										<button className="content_btn mt-3">
											Schedule Assessment
										</button>
										<button className="content_btn mt-3">Host Hackthons</button>
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
										<button className="get_btn">Contact Sale</button>
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
						<div className="col-md-1"></div>
					</div>
				</section>

				<section className="mt-4">
					<div className="row">
						<div className="col-md-1"></div>
						<div className="col-md-10 mt-3">
							<h4 className="text-center">
								Our <span style={{ color: "#16c3ea" }}>Aspirants</span> placed
								in 30+ sector leading companies
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
						<div className="col-md-1"></div>
					</div>
				</section>

				<section className="text-center mt-4">
					<div className="row">
						<div className="col-md-1"></div>
						<div className="col-md-10">
							<h4>Our users Love Us</h4>
							<p>
								Don't take just our word for it. Over the years, we've gotten
								some great positive from our happy users. Below are just few
							</p>

							<Slider
								className="your-carousel-class"
								slidesToShow={3}
								infinite={true}
								autoplay={true} // Enable autoplay
								autoplaySpeed={2000} // Set the autoplay speed in milliseconds (e.g., 3000ms or 3 seconds)
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
									<p className="mr-2">
										Google is a multinational technology company known for its
										search engine, providing quick and accurate results. Founded
										in 1998, it has expanded into various services, including
										advertising, cloud computing, and software development.
									</p>
									<p className="name_item"> - Kishan</p>
								</div>
								<div className="text-center mt-4">
									<div className="d-flex justify-content-center">
										<img
											src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?ga=GA1.1.858548410.1688366189&semt=sph"
											className="img-fluid card_img1"
										/>
									</div>
									<p  className="mr-2">
										Wipro is a global IT consulting and services company
										headquartered in India. Established in 1945, it offers a
										range of technology solutions, including software
										development, infrastructure management, and cost-effective
										services worldwide.
									</p>
									<p className="name_item"> - Sunil</p>
								</div>
								<div className="text-center mt-4">
									<div className="d-flex justify-content-center">
										<img
											src="https://img.freepik.com/premium-vector/young-man-avatar-character_24877-9475.jpg?ga=GA1.1.858548410.1688366189&semt=sph"
											className="img-fluid card_img1"
										/>
									</div>
									<p  className="mr-2">
										Microsoft, founded in 1975 by Bill Gates and Paul Allen, is
										a global technology giant. Renowned for its operating
										system, Windows, influencing diverse aspects of technology
										worldwide.
									</p>
									<p className="name_item"> - Deepak</p>
								</div>
								<div className="text-center mt-4">
									<div className="d-flex justify-content-center">
										<img
											src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg?w=740&t=st=1704433588~exp=1704434188~hmac=0a66797e1e9a4963514e01d6debc3db0758f572e7d008d3adceff03f3b6947a8"
											className="img-fluid card_img1"
										/>
									</div>
									<p  className="mr-2">
										Google is a multinational technology company known for its
										search engine, providing quick and accurate results. Founded
										in 1998, it has expanded into various services, including
										advertising, cloud computing, and software development.
									</p>
									<p className="name_item"> - Jay</p>
								</div>
								<div className="text-center mt-4">
									<div className="d-flex justify-content-center">
										<img
											src="https://img.freepik.com/free-vector/head-man_1308-33466.jpg?ga=GA1.1.858548410.1688366189&semt=sph"
											className="img-fluid card_img1"
										/>
									</div>
									<p  className="mr-2">
										Google is a multinational technology company known for its
										search engine, providing quick and accurate results. Founded
										in 1998, it has expanded into various services, including
										advertising, cloud computing, and software development.
										Google's mission is to organize the world's information and
										make it universally accessible and useful.
									</p>
									<p className="name_item"> - Devaratha</p>
								</div>
								{/* Add more items as needed */}
							</Slider>
						</div>
						<div className="col-md-1"></div>
					</div>
				</section>
			</div>
			<div>
				<UserFooter />
			</div>
		</div>
	);
};

export default UserHome;
