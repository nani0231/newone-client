import React from "react";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import logo from "../src/All Images/pab bottom-logo (1).jpg";
import sideimage from "./All Images/Logo133.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import siva from "../src/All Images/Siva Image.jpeg";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import apiList from "./liberary/apiList";
import Cookies from "js-cookie";

const PerfexHome = () => {
	const token = Cookies.get("token");
	const navigate = useNavigate();
	const [isNavVisible, setIsNavVisible] = useState(false);
	const [addblogslist, setAddblogslist] = useState([]);
	const [assessmentsList, setAssessmentsList] = useState([]);
	const [learninglist, setLearningList] = useState([]);
	const [questionsList, setQuestionsList] = useState([]);
	const [showInstitutionsOptions, setShowInstitutionsOptions] = useState(false);
	const [showUsersOptions, setShowUsersOptions] = useState([]);
	const [itisLoading, setItisLoading] = useState(true);

	useEffect(() => {
		fetchblogs();
		fetchblogs1();
		fetchblogs2();
		fetchblogs3();
		fetchblogs4();
		if (token === undefined) {
			navigate("/header");
		}
	}, []);

	const fetchblogs1 = async () => {
		const api = `${apiList.allAddInstitutes}`;
		const authToken =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk";
		try {
			const response = await axios.get(api, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});

			setShowUsersOptions(
				response.data.flatMap((institute) =>
					institute.InstituteBatchYear.flatMap((batchYear) =>
						batchYear.InsituteBatch.flatMap((batch) =>
							batch.InstituteUsersList.map((user) => user.userEmail)
						)
					)
				)
			);

			setItisLoading(false);
		} catch (error) {
			console.error("Error fetching blogs:", error);
		}
	};
	const fetchblogs = async () => {
		const api = `${apiList.allAddInstitutes}`;
		const authToken =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk";
		try {
			const response = await axios.get(api, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			setAddblogslist(response.data);
			setItisLoading(false);
		} catch (error) {
			console.error("Error fetching blogs:", error);
		}
	};
	const fetchblogs2 = async () => {
		const api = `${apiList.categories}`;
		try {
		  const response = await axios.get(api, {});
		  const data = response.data;
	
		  // Calculate and set the length of Assessment array for each object
		  const assessmentsLengthList = data.map((each) => each.Assessment.length);	
		  // Log the lengths and calculate the sum
		  console.log('Assessment lengths for each object:', assessmentsLengthList);
		  console.log('Sum of Assessment lengths:', assessmentsLengthList.reduce((acc, length) => acc + length, 0));
		  setAssessmentsList(assessmentsLengthList.reduce((acc, length) => acc + length, 0));

		} catch (error) {
		  console.error('Error fetching blogs:', error);
		}
	  };
	const fetchblogs3 = async () => {
		const api = `${apiList.alllearningpathsDetails}`;
		const authToken =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk";
		try {
			const response = await axios.get(api, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			setLearningList(response.data);
		} catch (error) {
			console.error("Error fetching blogs:", error);
		}
	};
	const fetchblogs4 = async () => {
		const api = `${apiList.subjects}`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			console.log(response.data)
			const SubjectsQuestionslength= response.data.flatMap((blog)=>blog.chapter)?.map((each)=>each.MCQ.length + each.codingbasic.length + each.paragMCQ.length)
			console.log('SubjectsQuestionslength :',SubjectsQuestionslength)
			console.log('Sum of SubjectsQuestionslength:', SubjectsQuestionslength.reduce((acc, length) => acc + length, 0));
			setQuestionsList(SubjectsQuestionslength.reduce((acc, length) => acc + length, 0));
		} catch (error) {
			console.error("Error fetch blogs:", error);
		}
	};

	const toggleNav = () => {
		setIsNavVisible(!isNavVisible);
	};

	const [isNavOpen, setIsNavOpen] = useState(false);

	const openNav = () => {
		setIsNavOpen(true);
	};

	const closeNav = () => {
		setIsNavOpen(false);
	};

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
	const [isInstitutionsOpen, setIsInstitutionsOpen] = useState(false);

	const toggleInstitutions = () => {
		setIsInstitutionsOpen(!isInstitutionsOpen);
	};
	const [isInstitutionsOpen1, setIsInstitutionsOpen1] = useState(true);

	const toggleInstitutions1 = () => {
		setIsInstitutionsOpen1(!isInstitutionsOpen1);
	};
	const [isInstitutionsOpen2, setIsInstitutionsOpen2] = useState(true);

	const toggleInstitutions2 = () => {
		setIsInstitutionsOpen2(!isInstitutionsOpen2);
	};
	// const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	// 		  const toggleSidebar1 = () => {
	// 			  setIsSidebarOpen(!isSidebarOpen);
	// 		  };
	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					{isOpen && (
						<div className="col-12 col-lg-3 col-md-12 sectioncard1">
							<Sidebar />
						</div>
					)}

					<div
						className={`my-3 col-12 col-md-${isOpen ? 12 : 9} col-lg-${
							isOpen ? 9 : 12
						}`}
					>
						{" "}
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
							<>
								<div className="">
									<i
										className="fa-solid fa-bars bars  d-lg-block d-none"
										onClick={toggleSidebar}
									></i>
								</div>
								<div className="mt-3">
									<div class="text-start">
										<h6 className="welcometo">Welcome back !</h6>
										<h4>Skillhub Dashboard</h4>
										<div className="row my-4">
											<div className="  col-12   col-lg-4 col-md-3  text-center mt-2">
												<div className="card_item w-100">
												<a href="/AdminDashboard">
													<div class="buttons212 m-2 text-dark">
														Institute Count
													</div>
												</a>
												<div>
													<span className="count098 mx-3 ">
														{addblogslist.length}
													</span>
												</div>
												</div>
												
											</div>

											<div className=" col-12   col-lg-4 col-md-3 text-center  mt-2">
												<div className="card_item w-100">
												<a href="/UsersDetails">
													<div class="buttons212 m-2 text-dark">Users</div>
												</a>
												<div>
													<span className="count098 mx-3 ">
														{showUsersOptions.length}
													</span>
												</div>
												</div>
												
											</div>
											<div className="text-center  col-12 col-lg-4 col-md-3 mt-2">
												<div className="card_item w-100">
												<a href="/UsersDetails">
													<div class="buttons212 m-2 text-dark">Active Users</div>
												</a>
												<div>
													<span className="count098 mx-3 ">
														{showUsersOptions.length}
													</span>
												</div>
												</div>
												
											</div>
											<div className="text-center  col-12 col-lg-4 col-md-3 mt-2">
												<div className="card_item w-100">
												<a href="/Assementview">
													<div class="buttons212 m-2 text-dark">Assessments</div>
												</a>
												<div>
													<span className="count098 mx-3 ">{assessmentsList}</span>
												</div>
												</div>
												
											</div>
											<div className="text-center  col-12 col-lg-4 col-md-3 mt-2">
												<div className="card_item w-100">
												<a href="/Learn">
													<div class="buttons212 m-2 text-dark">Courses</div>
												</a>
												<div>
													<span className="count098 mx-3 ">{learninglist.length}</span>
												</div>
												</div>
												
											</div>
											<div className=" text-center  col-12 col-lg-4 col-md-3 mt-2">
											<div className="card_item w-100">
												<a href="/QbSubject">
													<div class="buttons212 m-2 text-dark">Questions</div>
												</a>
												<div>
													<span className="count098 mx-3 ">{questionsList}</span>
												</div>
												</div>
												
											</div>
										</div>
										<div className="row card_item my-4 m-1 w-100">
											<div className=" col-12 col-lg-2 col-md-3 text-center">
												<a href="/AdminDashboard">
													<div class="buttons212 m-2 text-dark">
														Assessment Participation
													</div>
												</a>
												<div className="text-center">
													<span className="count098  ">17</span>
												</div>
											</div>

											<div className="col-12 col-lg-2 col-md-3  text-center">
												<a href="/AdminDashboard">
													<div class="buttons2121 m-2 text-dark">
														Questions Attempted
													</div>
												</a>
												<div className="text-center">
													<span className="count098  ">219</span>
												</div>
											</div>
											<div className=" col-12 col-lg-2 col-md-3 text-center">
												<a href="/AdminDashboard">
													<div class="buttons2121 m-2 text-dark">
														Coding Submissions
													</div>
												</a>
												<div className="text-center">
													<span className="count098  ">0</span>
												</div>
											</div>
											<div className=" col-12 col-lg-2 col-md-3 text-center">
												<a href="/AdminDashboard">
													<div class="buttons2121 m-2  text-dark">
														Testcases Executed
													</div>
												</a>
												<div className="text-center">
													<span className="count098  ">0</span>
												</div>
											</div>
											<div className=" col-12 col-lg-2 col-md-3 text-center">
												<a href="/AdminDashboard">
													<div class="buttons2121 m-2 text-dark">
														Courses Enrolled
													</div>
												</a>
												<div className="text-center">
													<span className="count098  ">15</span>
												</div>
											</div>
											<div className=" col-12 col-lg-2 col-md-3 text-center">
												<a href="/AdminDashboard">
													<div
														class="buttons212 m-2 text-dark"
														
													>
														RT Tests
													</div>
												</a>
												<div className="text-center">
													<span className="count098  ">17</span>
												</div>
											</div>
										</div>
										<div className=" row my-4 card_item w-100 m-1">
											<div className=" col-12 col-lg-6 col-md-6 p-2 text-center ">
												<a href="/AdminDashboard">
													<div class="buttons2121 m-2 text-dark">
														Speaking Evaluations
													</div>
												</a>
												<div className=" text-center">
													<div>
														<p className="count09812  ">0/0</p>
														<p className="count0981 ">Usage/Limit</p>
													</div>
													<div className="mx-5">
														<p className="count09812  ">RS. 0</p>
														<p className="count0981 ">Total Cost</p>
													</div>
												</div>
											</div>
											<div className=" col-12 col-lg-6 col-md-6 p-2 text-center">
												<a href="/AdminDashboard">
													<div class="buttons2121 m-2 text-dark">
														Writing Evaluations
													</div>
												</a>
												<div className="text-center">
													<div>
														<p className="count09812  ">0/0</p>
														<p className="count0981 ">Usage/Limit</p>
													</div>
													<div className="mx-5">
														<p className="count09812  ">RS. 0</p>
														<p className="count0981 ">Total Cost</p>
													</div>
												</div>
											</div>
										</div>

										{/* <a href="/">
                      <button class="buttons1 col-12 col-md-3  mx-2">
                        Users
                      </button>
                    </a> */}
										{/* <a href="/">
                      <button class="buttons1 col-12 col-md-3 mx-2  ">
                        Active Users
                      </button>
                    </a> */}
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PerfexHome;
