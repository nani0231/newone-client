import { FaBars } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import siva from "../src/All Images/Siva Image.jpeg";
import sideimage from "./All Images/Logo133.jpeg";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import apiList from "./liberary/apiList";
import Cookies from "js-cookie";

const ShowData = () => {
	const token = Cookies.get("token");
	let navigate = useNavigate();
	const { state } = useLocation();
	const {
		instituteName,
		batchYear,
		batch,
		instituteId,
		batchyearId,
		batchId,
		userId,
	} = state || {};
	// const [individualInstitute, setIndividualInstitute] = useState([]);
	const [showInstitutionsOptions, setShowInstitutionsOptions] = useState(false);

	const [loading, setLoading] = useState(true);
	const [itisLoading, setItisLoading] = useState(true);
	const [error, setError] = useState(null);
	const handleLogout = () => {
		Cookies.remove("token");
		navigate("/");
	};

	const [individualInstitute, setIndividualInstitute] = useState({
		Password: "",
		Regdid: "",
		FirstName: "",
		LastName: "",
		userEmail: "",
		userNumber: "",
		AccessPlans: "",
		Password: "",
		ExpiryDate: "",
	});

	const onChangePasssword = (e) => {
		const newValue = e.target.value;
		setIndividualInstitute((prevData) => ({
			...prevData,
			Password: newValue,
		}));
	};
	const onChangeField = (e, fieldName) => {
		const newValue = e.target.value;
		setIndividualInstitute((prevData) => ({
			...prevData,
			[fieldName]: newValue,
		}));
	};

	const onSubmitPassword = (e) => {
		e.preventDefault();

		const UserData = {
			Password: individualInstitute.Password,
		};

		axios
			.put(
				`${apiList.UpdateUserPassword}/${instituteId}/${batchyearId}/${batchId}/${userId}`,
				UserData
			)
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
				}
			})
			.catch((error) => {
				console.error(error);
				setError("An error occurred while updating the institute.");
				console.log(error.message);
			});
	};
	const onSubmitUpdatedForm = (e) => {
		e.preventDefault();
		const newDetails = { ...individualInstitute };

		axios
			.put(
				`${apiList.updateUserdetails}/${instituteId}/${batchyearId}/${batchId}/${userId}`,
				{ newDetails }
			)
			.then((response) => {
				console.log(response.data);
				if (response.status === 200) {
					toast.success("Updated UserDetails Successfull", {
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
				}
			})
			.catch((error) => {
				console.error(error);
				// Handle error appropriately
			});
	};

	useEffect(() => {
		const fetchData = async () => {
			console.log(userId);
			try {
				const response = await axios.get(
					`${apiList.GetUserdetailseperatly}/${instituteId}/${batchyearId}/${batchId}/${userId}`
				); // Replace with your API endpoint
				setIndividualInstitute(response.data.user);
				console.log(response.data.user);
				setLoading(false);
				setItisLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
		if (token == undefined) {
			navigate("/");
		}
	}, [userId]);

	const [isNavVisible, setIsNavVisible] = useState(false);

	const toggleNav = () => {
		setIsNavVisible(!isNavVisible);
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
	const [isInstitutionsOpen, setIsInstitutionsOpen] = useState(true);

	const toggleInstitutions = () => {
		setIsInstitutionsOpen(!isInstitutionsOpen);
	};
	const [isInstitutionsOpen1, setIsInstitutionsOpen1] = useState(false);

	const toggleInstitutions1 = () => {
		setIsInstitutionsOpen1(!isInstitutionsOpen1);
	};
	const [isInstitutionsOpen2, setIsInstitutionsOpen2] = useState(true);

	const toggleInstitutions2 = () => {
		setIsInstitutionsOpen2(!isInstitutionsOpen2);
	};

	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					{isOpen && (
						<div className=" col-12 col-lg-3 col-md-12 sectioncard121">
							<Sidebar />
							<ToastContainer />
						</div>
					)}
					<div
						className={`my-3 col-12 col-md-${isOpen ? 12 : 9} col-lg-${
							isOpen ? 9 : 12
						}`}
						style={{ height: "100vh", overflowY: "scroll" }}
					>
						<div className=" ">
							<i
								className="fa-solid fa-bars bars d-lg-block d-none"
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
									{loading ? (
										<p>Loading...</p>
									) : individualInstitute ? (
										<div className="">
											<div className="row">
												<div className=" col-12 col-md-12 ">
													<div className="card mb-3  p-2 ">
														<div className="row ">
															<div className="col-md-8">
																
																<div className="">
																	<div className="d-flex ml-3">
																		<span class="material-symbols-outlined">
																			mail
																		</span>
																		<p className="mx-2" style={{fontWeight:"500"}}>
																			{individualInstitute.userEmail}
																		</p>
																	</div>

																	<div className=" pl-3 ">
																		<h6>
																			Institution:
																			<span className="mx-2  ">
																				{instituteName}
																			</span>
																		</h6>
																		<h6>
																			BatchYear:
																			<span className="mx-2  ">
																				{batchYear}
																			</span>
																		</h6>
																		<h6>
																			Batch:
																			<span className="mx-2  ">{batch}</span>
																		</h6>
																		<h6>
																			Hallticket No:
																			<span className="mx-2  ">
																				{individualInstitute.Regdid}
																			</span>
																		</h6>
																		<h6>
																			Status:
																			<span className="mx-2 ">Active</span>
																		</h6>
																		<h6>
																			Expiration Date:{" "}
																			<span className="mx-2  ">
																				{individualInstitute.ExpiryDate}
																			</span>
																		</h6>
																	</div>
																</div>
															</div>
															<div className="col-lg-4">
																<div>
																<button
																	className="mt-4  text-white"
																	style={{
																		border: "none",
																		borderRadius: "7px",
																		backgroundColor: "#16c3ea",
																		padding: "7px",
																	}}
																	data-bs-toggle="modal"
																	data-bs-target="#myModaledit"
																>
																	<i class="fa-solid fa-pencil"></i> Edit
																</button>
																</div>
																
																<div>
																<button
																	className="mt-4 text-white"
																	style={{
																		border: "none",
																		borderRadius: "7px",
																		padding: "7px",
																		backgroundColor:"#910a8f"
																	}}
																	data-bs-toggle="modal"
																	data-bs-target="#myModalPassword"
																>
																	Change Password
																</button>
																</div>
																
																<div class="modal" id="myModalPassword">
																	<div class="modal-dialog">
																		<div class="modal-content">
																			<div class="modal-header">
																				<h4 class="modal-title">
																					Update Password
																				</h4>
																				<button
																					type="button"
																					class="btn-close"
																					data-bs-dismiss="modal"
																					style={{
																						marginTop: "-35px",
																						marginRight: "-40px",
																						backgroundColor: "#fff",
																						borderRadius: "100%",
																					}}
																				></button>
																			</div>
																			<div class="modal-body">
																				<div className="mb-1">
																					<label style={{ float: "left" }}>
																						Password
																						<sup className="star">*</sup>
																					</label>
																					<input
																						type="text"
																						className="form-control"
																						placeholder="Password"
																						value={
																							individualInstitute?.Password
																						}
																						onChange={onChangePasssword}
																					/>
																				</div>
																			</div>

																			<div class="modal-footer">
																				<button
																					type="button"
																					class="btn "
																					style={{backgroundColor:"#16c3ea", color:"#000"}}
																					onClick={(e) => onSubmitPassword(e)}
																				>
																					Submit
																				</button>
																			</div>
																		</div>
																	</div>
																</div>
																<div class="modal" id="myModaledit">
																	<div class="modal-dialog">
																		<div class="modal-content">
																			<div class="modal-header">
																				<h4 class="modal-title">
																					Update UserDetails
																				</h4>
																				<button
																					type="button"
																					class="btn-close"
																					data-bs-dismiss="modal"
																					style={{
																						marginTop: "-35px",
																						marginRight: "-40px",
																						backgroundColor: "#fff",
																						borderRadius: "100%",
																					}}
																				></button>
																			</div>
																			<div class="modal-body">
																				<form action="">
																					<div className="row">
																						<div className="col-12 col-md-6">
																							<label className="headingAdd">
																								First Name :
																							</label>
																							<br />
																							<input
																								type="text"
																								className="form-control"
																								placeholder="Enter  First Name "
																								onChange={(e) =>
																									onChangeField(e, "FirstName")
																								}
																								value={
																									individualInstitute.FirstName
																								}
																							/>
																						</div>
																						<div className="col-12 col-md-6">
																							<label className="headingAdd">
																								Last Name :
																							</label>
																							<br />
																							<input
																								type="text"
																								className="form-control"
																								placeholder="Enter Last Name"
																								onChange={(e) =>
																									onChangeField(e, "LastName")
																								}
																								value={
																									individualInstitute.LastName
																								}
																							/>
																						</div>
																						<br />
																						<div className="col-12 col-md-12 mt-1">
																							<label className="headingAdd">
																								Email :
																							</label>
																							<br />
																							<input
																								type="text"
																								className="form-control"
																								placeholder="Enter Email"
																								onChange={(e) =>
																									onChangeField(e, "userEmail")
																								}
																								value={
																									individualInstitute.userEmail
																								}
																							/>
																						</div>
																						<br />
																						<div className="col-12 col-md-6 mt-1">
																							<label className="headingAdd">
																								Regd Id :
																							</label>
																							<br />
																							<input
																								type="text"
																								className="form-control"
																								placeholder="Enter Regd Id/Hallticket No"
																								onChange={(e) =>
																									onChangeField(e, "Regdid")
																								}
																								value={
																									individualInstitute.Regdid
																								}
																							/>
																						</div>
																						<div className="col-12 col-md-6 mt-1">
																							<label className="headingAdd">
																								Mobile No :
																							</label>
																							<br />
																							<input
																								type="text"
																								className={`form-control`}
																								placeholder="Enter Mobile No"
																								onChange={(e) =>
																									onChangeField(e, "userNumber")
																								}
																								value={
																									individualInstitute.userNumber
																								}
																							/>
																						</div>
																						<br />
																						<div className="col-12 col-md-6 mt-1">
																							<label className="headingAdd">
																								Password :
																							</label>
																							<br />
																							<input
																								type="text"
																								className={`form-control`}
																								placeholder="Enter Password"
																								onChange={(e) =>
																									onChangeField(e, "Password")
																								}
																								value={
																									individualInstitute.Password
																								}
																							/>
																						</div>
																						<div className="col-12 col-md-6 mt-1">
																							<label className="headingAdd">
																								Access Period :
																							</label>
																							<br />

																							<select
																								name=""
																								id=""
																								onChange={(e) =>
																									onChangeField(
																										e,
																										"AccessPlans"
																									)
																								}
																								value={
																									individualInstitute.AccessPlans
																								}
																								className="form-control"
																							>
																								<option value="3 Months">
																									Select Access Period
																								</option>
																								<option
																									value="Exam Practice1"
																									onChange={(e) =>
																										onChangeField(
																											e,
																											"AccessPlans"
																										)
																									}
																								>
																									3 Months
																								</option>
																								<option
																									value="6 Months"
																									onChange={(e) =>
																										onChangeField(
																											e,
																											"AccessPlans"
																										)
																									}
																								>
																									6 Months
																								</option>
																								<option
																									value="9 Months"
																									onChange={(e) =>
																										onChangeField(
																											e,
																											"AccessPlans"
																										)
																									}
																								>
																									9 Months
																								</option>
																								<option
																									value="12 Months"
																									onChange={(e) =>
																										onChangeField(
																											e,
																											"AccessPlans"
																										)
																									}
																								>
																									12 Months
																								</option>
																							</select>
																						</div>
																						<div className="col-12 col-md-6">
																							<label className="headingAdd mt-3">
																								Expired Date :
																							</label>
																							<br />
																							<input
																								type="Date"
																								className="form-control"
																								placeholder="Enter Expired Date"
																								onChange={(e) =>
																									onChangeField(e, "ExpiryDate")
																								}
																								value={
																									individualInstitute.ExpiryDate
																								}
																							/>
																						</div>
																					</div>
																					<div class="modal-footer">
																						<button
																							type="button"
																							class="btn btn-danger"
																							style={{backgroundColor:"#16c3ea", color:"#000"}}
																							onClick={(e) =>
																								onSubmitUpdatedForm(e)
																							}
																						>
																							Submit
																						</button>
																					</div>
																				</form>
																			</div>
																		</div>
																	</div>
																</div>
																<div>
																	<button
																		className="mt-4  bg-dark text-white"
																		style={{
																			border: "none",
																			borderRadius: "7px",
																			padding: "7px",
																		}}
																		onClick={() => navigate("/UsersDetails")}
																	>
																		Back
																	</button>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-12 col-md-3 mt-2">
													<div
														className="w-100 p-3 cardassessment"
														style={{
															border: "1px solid black",
															borderRadius: "10px",
														}}
													>
														<h6>Assessment Activity</h6>
														<h6>Completed: 0/14</h6>
														<h6>Yet to Start: 14/14</h6>
													</div>
												</div>
												<div className="col-12 col-md-3 mt-2">
													<div
														className="card p-3 cardassessment "
														style={{
															border: "1px solid black",
															borderRadius: "10px",
														}}
													>
														<h6>Course Activity</h6>
														<h6>InProgress: 2/6</h6>
														<h6>Yet to Start: 4/6</h6>
													</div>
												</div>
												<div className="col-12 col-md-3 mt-2">
													<div
														className="card p-3 cardassessment"
														style={{
															border: "1px solid black",
															borderRadius: "10px",
														}}
													>
														<h6>Practice Activity</h6>
														<h6>Completed: 1/44</h6>
														<h6>Yot to Start: 41/44</h6>
													</div>
												</div>
												<div className=" col-12 col-md-3 pt-2  ">
													<div
														className="secondcard text-dark p-3"
														style={{ height: "auto" }}
													>
														<h6>Your Overall Accuracy</h6>

														<label for="customRange" class=" ">
															50%
														</label>
														<br />

														<input type="range" id="customRange"></input>
													</div>
												</div>
											</div>
											<div className="row mt-3">
												<div className="col-12 col-md-6">
													<div
														className=" cardassessment1   "
														style={{
															border: "1px solid black",
															// borderRadius: "2px",
														}}
													>
														<h6
															className=" bg-white p-3"
															style={{ borderRadius: "8px" }}
														>
															MCQ: Subject Level Accuracy
														</h6>
													</div>
												</div>
												<div className="col-12 col-md-6">
													<div
														className=" cardassessment12   "
														style={{
															border: "1px solid black",
															// borderRadius: "2px",
														}}
													>
														<h6
															className=" bg-white p-3"
															style={{ borderRadius: "8px" }}
														>
															Coding: Programming Wise Accuracy
														</h6>
													</div>
												</div>
											</div>
										</div>
									) : (
										<p>Data not found</p>
									)}
								</div>
							)}
						</div>
					</div>

					{/* {individualInstitute.map((code) => (
               
              ))} */}
				</div>
			</div>
		</div>
	);
};

export default ShowData;
