import React from "react";
import axios from "axios";
import apiList from "../liberary/apiList";
import "./userblogs.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Typography from "@mui/material/Typography";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import UserNavbar from "./Usernavbar";
import NavbarUser from "./navbaruser";
import UserFooter from "./userfooter";
import Cookies from "js-cookie";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
function Userdashbord() {
	const navigate = useNavigate();
	const email = Cookies.get("email");
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const PrettoSlider = styled(Slider)({
		color: "#52af77",
		height: 8,
		width: 145,
		"& .MuiSlider-track": {
			border: "none",
		},
		"& .MuiSlider-thumb": {
			height: 24,
			width: 24,
			backgroundColor: "#fff",
			border: "2px solid currentColor",
			"&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
				boxShadow: "inherit",
			},
			"&::before": {
				display: "none",
			},
		},
		"& .MuiSlider-valueLabel": {
			lineHeight: 1.2,
			fontSize: 12,
			background: "unset",
			padding: 0,
			width: 32,
			height: 32,
			borderRadius: "50% 50% 50% 0",
			backgroundColor: "#52af77",
			transformOrigin: "bottom left",
			transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
			"&::before": { display: "none" },
			"&.MuiSlider-valueLabelOpen": {
				transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
			},
			"& > *": {
				transform: "rotate(45deg)",
			},
		},
	});
	const PrettoSlider1 = styled(Slider)({
		color: "#52af77",
		height: 8,
		width: 120,
		"& .MuiSlider-track": {
			border: "none",
		},
		"& .MuiSlider-thumb": {
			height: 24,
			width: 24,
			backgroundColor: "#fff",
			border: "2px solid currentColor",
			"&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
				boxShadow: "inherit",
			},
			"&::before": {
				display: "none",
			},
		},
		"& .MuiSlider-valueLabel": {
			lineHeight: 1.2,
			fontSize: 12,
			background: "unset",
			padding: 0,
			width: 32,
			height: 32,
			borderRadius: "50% 50% 50% 0",
			backgroundColor: "#52af77",
			transformOrigin: "bottom left",
			transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
			"&::before": { display: "none" },
			"&.MuiSlider-valueLabelOpen": {
				transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
			},
			"& > *": {
				transform: "rotate(45deg)",
			},
		},
	});
	const [userdata, setuserdata] = useState([]);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [showAllCards, setShowAllCards] = useState(true);

	const fetchCompanyDetails1 = async () => {
		try {
			const response = await axios.get(`${apiList.user}/${email}`);
			setuserdata(response.data.userDetails);
			setShowAllCards(false)
		} catch (error) {
			console.error("Error fetching Company Details:", error);
			// Handle errors here
		}
	};

	useEffect(() => {
		fetchCompanyDetails1();
	}, [email]);
	console.log(userdata);

	const onSubmitPassword = (e) => {
		e.preventDefault();
		const userData = {
			password: newPassword,
		};

		axios
			.put(`${apiList.UpdatedashbordUserPassword}/${email}`, userData)
			.then((response) => {
				console.log(response.data);
				if (response.status === 200) {
					toast.success("Update Password Successful", {
						position: "top-center",
						autoClose: 1000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
						className: "custom-toast-custom",
					});

					fetchCompanyDetails1();

					setTimeout(function () {}, 3000);
				}
			})
			.catch((error) => {
				console.error(error);
				setError("An error occurred while updating the institute.");
				console.log(error.message);
			});
	};

	const fetchsubjectsData = async () => {
		const api = `${apiList.getbasic}`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			// setAllsubjectsData(response.data);
		} catch (error) {
			console.error("Error fetch blogs:", error);
		}
	};
	const gotologout = () => {
		Cookies.remove("token");
		Cookies.remove("email");
		navigate("/");
	};
	const [message, setMessage] = useState([]);

	const [assessments, setAssessments] = useState([]);
	useEffect(() => {
		const apiUrl = `${apiList.getassessmentscategories}`;
		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => setAssessments(data.assessments))
			.catch((error) => console.error("Error fetching assessments:", error));
	}, []);
	console.log(assessments);

	const [cardData, setCardData] = useState([]);
	useEffect(() => {
		const api = `${apiList.alllearningpathsDetails}`;
		const fetchCardData = async () => {
			try {
				const response = await axios.get(api);
				setCardData(response.data);
			} catch (e) {
				console.log("Error in Getting the Videos Folder", e);
			}
		};
		fetchCardData();
	}, []);

	const [titles, setTitles] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${apiList.allpractices}`);
				setTitles(response.data.data);
			} catch (error) {
				console.error("Error fetching user data:", error);
				// Handle error state or setTitles([]) if needed
			}
		};
		fetchData();
	}, []);
	const [videosdata, setVideosdata] = useState([]);
	useEffect(() => {
		const fetchVideoData = async () => {
			try {
				const response = await axios.get(`${apiList.allAddVideosData}`);
				setVideosdata(response.data);
				console.log(response.data);
				setShowAllCards(false)
			} catch (error) {
				console.error("Error fetching user data:", error);
				// Handle error state or setTitles([]) if needed
			}
		};
		fetchVideoData();
	}, []);

	const [error, setError] = useState("");
	const totalAssessmentTopicsCount = assessments.reduce(
		(count, assessment) => count + assessment.Assessment.length,
		0
	);
	// const totalAssessmentQuestionsCount = assessments.reduce(
	// (count, assessment) => count + assessment.Assessment.map(each=>+(each.Questions).length),
	// 0
	// );
	const totalAssessmentQuestionsCount = assessments.reduce(
		(count, assessment) =>
			count +
			assessment.Assessment.reduce(
				(acc, each) => acc + each.Questions.length,
				0
			),
		0
	);
	const totalcoursesvideosCount = videosdata.reduce(
		(count, video) => count + video.videoFile.length,
		0
	);
	const totalPracticestopicCount = titles.reduce(
		(count, topic) => count + topic.Practicetopic?.length,
		0
	);
	const totalPracticestestsCount = titles.reduce(
		(count, topic) =>
			count +
			topic.Practicetopic.reduce(
				(topicCount, practiceTopic) =>
					topicCount +
					practiceTopic.Testtopic.reduce(
						(testCount, test) =>
							testCount +
							(test.questionListMcq ? test.questionListMcq.length : 0) +
							(test.questionListParag ? test.questionListParag.length : 0) +
							(test.questionListCoding ? test.questionListCoding.length : 0),
						0
					),
				0
			),
		0
	);

	return (
		<>
			<NavbarUser />
			{showAllCards ? (
				<div
					className="d-flex flex-row justify-content-center align-items-center"
					style={{ height: "100vh" }}
				>
					<div className="hm-spinner"></div>
				</div>
			) : (
				<div className="container mt-5 py-5">
					<div className=" mt-2 p-2 backgroundcolor1">
						<div className="row">
							{userdata.map((data, index) => (
								<>
									<div className="col-12 col-md-8">
										<h4 className="mt-3 ml-3">
											Welcome <span className="text-warning"></span>
										</h4>
										<div className="d-flex flex-row ml-3">
											<h6 className="">Email : {email} </h6>
										</div>

										<div className="row mt-3">
											<div className="col-md-4 ">
												<button
													type="button"
													className="reportedbutton ml-3  mt-1"
												>
													Reported Issues
												</button>
											</div>
											<div className="col-md-4">
												<button
													type="button"
													onClick={handleOpen}
													class="changebtn  mt-1"
												>
													Change Password
												</button>
											</div>

											<div className="">
												<Modal
													keepMounted
													open={open}
													onClose={handleClose}
													aria-labelledby="keep-mounted-modal-title"
													aria-describedby="keep-mounted-modal-description"
												>
													<Box className="umadevi11">
														<Typography
															id="keep-mounted-modal-title"
															className="title1"
															variant="h5"
															component="h1"
															style={{ color: "#16c3ea" }}
														>
															Change Password?
															<IconButton
																		aria-label="close"
																		onClick={handleClose}
																		className="Close_icon2"
																	>
																		<CloseIcon />
																	</IconButton>
														</Typography>
														<Typography
															id="keep-mounted-modal-description"
															sx={{ mt: 2 }}
														>
															<ToastContainer />
															<>
																<form
																	className="mt-4"
																	onSubmit={onSubmitPassword}
																>
																	<label>Old Password</label>
																	<br />
																	<input
																		type="text"
																		className="form-control"
																		placeholder="Old Password"
																		value={data.InstituteUsersList.Password}
																		disabled
																	/>
																	<br />
																	<label>New Password</label>
																	<br />
																	<input
																		type="text"
																		className="form-control"
																		placeholder="New Password"
																		value={newPassword}
																		onChange={(e) =>
																			setNewPassword(e.target.value)
																		}
																	/>
																	<br />
																	<button
																		className="resume w-100"
																		type="submit"
																	>
																		Change Password
																	</button>
																	{error && <p>{error}</p>}
																</form>
															</>
														</Typography>
													</Box>
												</Modal>
												<style>
													{`
        .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop {
            background-color: transparent !important;
        }
    `}
												</style>
											</div>
										</div>

										{/* <br />
                                    <button className="col-6 col-md-5 tagbuttons ml-3" onClick={gotologout}>
                                        Logout
                                    </button> */}
									</div>

									<div className="detailspara1 mt-3 col-12 col-md-4">
										<h6>
											InstituteName :<span> {data.InstituteName}</span>
										</h6>
										<h6>
											Batch :<span> {data.Batch}</span>
										</h6>
										<h6>
											BatchYear :<span> {data.BatchYear}</span>
										</h6>
										<div>
											<h6 className="detailspara">
												Regdid :
												<span className="ml-1">
													{data.InstituteUsersList.Regdid}
												</span>
											</h6>
											<h6 className="detailspara">
												Date :
												<span className="ml-1">
													{data.InstituteUsersList.ExpiryDate}
												</span>
											</h6>
										</div>
									</div>
								</>
							))}
						</div>
					</div>

					<div className="row mt-3">
						<div className="col-12 col-md-3 ">
							<div className="cards">
								<h5 className="Assessmentt123">Assessment</h5>
								<div>
									<>
										<h6>Categories: {assessments.length}</h6>
										<h6>Topics: {totalAssessmentTopicsCount}</h6>
										<h6>Total Questions: {totalAssessmentQuestionsCount}</h6>
									</>
								</div>

								<div>
									<Link
										to="/Userassessments"
										style={{ textDecoration: "none" }}
									>
										<span className="ViewAssessment1">
											View Recent Assessments
										</span>
									</Link>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-3 ">
							<div className="cards">
								<h5 className="Assessmentt123">Course</h5>
								<h6>LearningPaths: {cardData.length}</h6>
								<h6>Courses: {totalcoursesvideosCount}</h6>

								<Link to="/user/coursesHome" style={{ textDecoration: "none" }}>
									{" "}
									<span className="ViewAssessment1">View Recent Courses</span>
								</Link>
							</div>
						</div>
						<div className="col-12 col-md-3 ">
							<div className="cards">
								<h5 className="Assessmentt123">Practice</h5>
								<h6>Categories: {titles.length}</h6>
								<h6>Topics: {totalPracticestopicCount}</h6>
								<h6>Total Questions: {totalPracticestestsCount}</h6>
								<Link to="/practies" style={{ textDecoration: "none" }}>
									{" "}
									<span className="ViewAssessment1 mt-4">
										View Recent Practice
									</span>
								</Link>
							</div>
						</div>
						<div className="col-12 col-md-3 ">
							<div className="cards">
								<h5 className="detailsheading mt-3">Your Overall Accuracy</h5>

								<div className="mt-4 ml-2">
									<Typography gutterBottom></Typography>
									<PrettoSlider
										valueLabelDisplay="auto"
										aria-label="pretto slider"
										defaultValue={20}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="row mt-3" id="RangeCode">
						<div className="col-12 col-md-6">
							<div className="cards1 cardassessment12">
								<div className="bg-white p-4 mcqshow">
									MCQ: Subject Level Accuracy
								</div>
								<div className="d-flex flex-column flex-md-column">
									<div className="col-12 col-md-6 mt-3">
										<div className="d-flex flex-row ">
											<h6 className="">Java_Programming_</h6>
											<span
												className="material-symbols-outlined "
												style={{ color: "#16c3ea" }}
											>
												double_arrow
											</span>
										</div>
									</div>
									<div className="col-12 col-md-6">
										<div className="">
											<Typography gutterBottom></Typography>
											<PrettoSlider1
												valueLabelDisplay="auto"
												aria-label="pretto slider"
												defaultValue={20}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-6">
							<div className="cards1 cardassessment12   ">
								<div className=" bg-white p-4 mcqshow">
									Coding: Programming Wise Accuracy
								</div>			
							</div>
						</div>
					</div>
				</div>
			)}
			<UserFooter />
		</>
	);
}

export default Userdashbord;
