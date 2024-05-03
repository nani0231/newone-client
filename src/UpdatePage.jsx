import { FaBars } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";
import sideimage from "./All Images/Logo133.jpeg";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import siva from "../src/All Images/Siva Image.jpeg";
import Sidebar from "./Sidebar";
import apiList from "./liberary/apiList";

const UpdatePage = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [individualInstitute, setIndividualInstitute] = useState({
		InstituteName: "",
		HeadName: "",
		PrimaryEmail: "",
		PrimaryContactNumber: "",
		SecondaryEmail: "",
		SecondaryContactNumber: "",
		Address: "",
		City: "",
		InstituteCode: "",
		InstituteType: "",
		AxiosPlans: "",
		Password: "",
	});

	// const changeMessage = (e) => {
	//   const { name, value } = e.target;
	//   setIndividualInstitute((prevIndividualInstitute) => ({
	//     ...prevIndividualInstitute,
	//     [name]: value,
	//   }));
	// };
	const onChangeInstituteName = (e) => {
		const newValue = e.target.value;
		setIndividualInstitute((prevData) => ({
			...prevData,
			InstituteName: newValue,
		}));
	};

	const onSubmitForm = (e) => {
		e.preventDefault();

		const UserData = {
			InstituteName: individualInstitute.InstituteName,
			HeadName: individualInstitute.HeadName,
			PrimaryEmail: individualInstitute.PrimaryEmail,
			PrimaryContactNumber: individualInstitute.PrimaryContactNumber,
			SecondaryEmail: individualInstitute.SecondaryEmail,
			SecondaryContactNumber: individualInstitute.SecondaryContactNumber,
			Address: individualInstitute.Address,
			City: individualInstitute.City,
			InstituteCode: individualInstitute.InstituteCode,
			InstituteType: individualInstitute.InstituteType,
			AxiosPlans: individualInstitute.AxiosPlans,
			Password: individualInstitute.Password,
		};

		axios
			.put(`${apiList.UpdateInstitute}/${id}`, UserData)
			.then((response) => {
				console.log(response.data);
				if (response.status === 200) {
					toast.success("Update Successful", {
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
					setTimeout(function () {
						navigate("/AdminDashboard");
					}, 3000);
				}
			})
			.catch((error) => {
				console.error(error);
				setError("An error occurred while updating the institute.");
				console.log(error.message);
			});
	};

	useEffect(() => {
		const fetchData = async () => {
			console.log(id);
			try {
				const response = await axios.get(
					`${apiList.individualInstitute}/${id}`
				); // Replace with your API endpoint
				setIndividualInstitute(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

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
	const [isInstitutionsOpen1, setIsInstitutionsOpen1] = useState(true);

	const toggleInstitutions1 = () => {
		setIsInstitutionsOpen1(!isInstitutionsOpen1);
	};
	const [isInstitutionsOpen2, setIsInstitutionsOpen2] = useState(true);

	const toggleInstitutions2 = () => {
		setIsInstitutionsOpen2(!isInstitutionsOpen2);
	};

	return (
		<div>
			<ToastContainer />
			<div className="container-fluid">
				<div className="row">
					{isOpen && (
						<div className=" col-12 col-lg-3  col-md-12 sectioncard121">
							
						</div>
					)}

					<div
						className={`my-3 col-12 col-md-12 col-lg-12
						}`}
					>
						{/* <i
							className="fa-solid fa-bars bars d-lg-block d-none"
							onClick={toggleSidebar}
						></i> */}
						{loading ? (
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
											<div className="col-md-12 text-center">
												<h4 className="">Edit Institute</h4>
											</div>
											
											
											<form action="" onSubmit={onSubmitForm}>
												<div className="row">
													<div className="col-12 col-md-6 mt-2">
														<label className="headingAdd">
															Institute Name :
														</label>
														<br />

														<input
															type="text"
															id="instituteName"
															className="form-control"
															placeholder="Enter Institute Name"
															value={individualInstitute.InstituteName}
															onChange={onChangeInstituteName}
														/>
													</div>

													<div className="col-12 col-md-6 mt-2">
														<label className="headingAdd">Head Name :</label>
														<br />
														<input
															type="text"
															className="form-control"
															placeholder="Enter Head Name"
															value={individualInstitute.HeadName}
															onChange={(e) =>
																setIndividualInstitute({
																	...individualInstitute,
																	HeadName: e.target.value,
																})
															}
														/>
													</div>

													<div className="col-12 col-md-6 mt-2">
														<label className="headingAdd">
															Primary Email :
														</label>
														<br />
														<input
															type="text"
															className="form-control"
															placeholder="Enter Primary Email"
															value={individualInstitute.PrimaryEmail}
															onChange={(e) =>
																setIndividualInstitute({
																	...individualInstitute,
																	PrimaryEmail: e.target.value,
																})
															}
														/>
													</div>
													<div className="col-12 col-md-6 mt-2">
														<label className="headingAdd">
															Primary Contact Number :
														</label>
														<br />
														<input
															type="text"
															className="form-control"
															placeholder="Enter Primary Contact Number"
															value={individualInstitute.PrimaryContactNumber}
															onChange={(e) =>
																setIndividualInstitute({
																	...individualInstitute,
																	PrimaryContactNumber: e.target.value,
																})
															}
														/>
													</div>

													<div className="col-12 col-md-6 mt-2">
														<label className="headingAdd">
															Secondary Email :
														</label>
														<br />
														<input
															type="text"
															className="form-control"
															placeholder="Enter Secondary Email"
															value={individualInstitute.SecondaryEmail}
															onChange={(e) =>
																setIndividualInstitute({
																	...individualInstitute,
																	SecondaryEmail: e.target.value,
																})
															}
														/>
													</div>
													<div className="col-12 col-md-6 mt-2 ">
														<label className="headingAdd">
															Secondary Contact Number :
														</label>
														<br />
														<input
															type="text"
															className="form-control"
															placeholder="Enter Secondary Contact Number"
															value={individualInstitute.SecondaryContactNumber}
															onChange={(e) =>
																setIndividualInstitute({
																	...individualInstitute,
																	SecondaryContactNumber: e.target.value,
																})
															}
														/>
													</div>

													<div className="col-12 col-md-6 mt-2">
														<label className="headingAdd">Address :</label>
														<br />
														<input
															type="text"
															className="form-control"
															placeholder="Enter Address"
															value={individualInstitute.Address}
															onChange={(e) =>
																setIndividualInstitute({
																	...individualInstitute,
																	Address: e.target.value,
																})
															}
														/>
													</div>

													<div className="col-12 col-md-6 mt-2">
														<label className="headingAdd">City Name :</label>
														<br />
														<input
															type="text"
															className="form-control"
															placeholder="Enter City Name"
															value={individualInstitute.City}
															onChange={(e) =>
																setIndividualInstitute({
																	...individualInstitute,
																	City: e.target.value,
																})
															}
														/>
													</div>

													<div className="col-12 col-md-6 mt-2">
														<label className="headingAdd">
															Institute Code :
														</label>
														<br />
														<input
															type="text"
															className="form-control"
															placeholder="Enter Institute Code"
															value={individualInstitute.InstituteCode}
															onChange={(e) =>
																setIndividualInstitute({
																	...individualInstitute,
																	InstituteCode: e.target.value,
																})
															}
														/>
													</div>

													<div className="col-12 col-md-6 mt-2">
														<label className="headingAdd">
															Institute Type :
														</label>
														<br />
														<select
															className="w-100 form-control"
															value={individualInstitute.InstituteType}
															onChange={(e) =>
																setIndividualInstitute({
																	...individualInstitute,
																	InstituteType: e.target.value,
																})
															}
														>
															<option>School</option>
															<option>Collage</option>
															<option>University</option>
															<option>Education Society</option>
															<option>Training Institute</option>
															<option>NGOs</option>
														</select>
													</div>

													<div className="col-12 col-md-6 mt-2">
														<label className="headingAdd">Access Plans :</label>

														<select
															className="w-100 form-control"
															value={individualInstitute.AxiosPlans}
															onChange={(e) =>
																setIndividualInstitute({
																	...individualInstitute,
																	AxiosPlans: e.target.value,
																})
															}
														>
															<option>Exam Practice</option>
															<option>LMS</option>
															<option>Mock Interview</option>
															<option>Previous papers</option>
														</select>
													</div>
													<div className="col-12 col-md-6 mt-2">
														<label className="headingAdd">Password :</label>
														<br />
														<input
															type="text"
															className="form-control"
															placeholder="Enter Password"
															value={individualInstitute.Password}
															onChange={(e) =>
																setIndividualInstitute({
																	...individualInstitute,
																	Password: e.target.value,
																})
															}
														/>
													</div>
												</div>
												{/* Add other form fields here */}
												<div className="modal-footer mt-3">
													<button
														type="submit"
														className="btn"
														style={{
															backgroundColor: "#16c3ea",
															color: "#000",
														}}
													>
														Update
													</button>
													<div className="">
												<Link to="/SuperHomePage">
													<button
														type="button"
														className="btn btn-dark float-right"
													>
														Back
													</button>
												</Link>
											</div>
												</div>
												<p>{error}</p>
											</form>
										</div>
									</div>
								) : (
									<p>Data not found</p>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdatePage;
