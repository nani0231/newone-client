import { FaBars } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";
import sideimage from "./All Images/Logo133.jpeg";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import siva from "../src/All Images/Siva Image.jpeg";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import apiList from "./liberary/apiList";
import Cookies from "js-cookie";

const ShowData1 = () => {
	const token = Cookies.get("token");
	let navigate = useNavigate();
	const { id } = useParams();
	// const [individualInstitute, setIndividualInstitute] = useState([]);
	const [showInstitutionsOptions, setShowInstitutionsOptions] = useState(false);

	const [loading, setLoading] = useState(true);

	const [error, setError] = useState(null);
	const handleLogout = () => {
		Cookies.remove("token");
		navigate("/");
	};

	const [individualInstitute, setIndividualInstitute] = useState({
		Password: "",
	});

	const onChangeInstituteName = (e) => {
		const newValue = e.target.value;
		setIndividualInstitute((prevData) => ({
			...prevData,
			Password: newValue,
		}));
	};

	const onSubmitForm = (e) => {
		e.preventDefault();

		const UserData = {
			Password: individualInstitute.Password,
		};

		axios
			.put(`${apiList.UpdateInstitute}/${id}`, UserData)
			.then((response) => {
				console.log(response.data);
				if (response.status === 200) {
					toast("Updated Successfully", {
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
			try {
				const response = await axios.get(
					`${apiList.individualInstitute}/${id}`
				); // Replace with your API endpoint
				setIndividualInstitute(response.data);
				console.log(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
		if (token == undefined) {
			navigate("/");
		}
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
			<div className="container">
				<div className="row">
					{isOpen && (
						<div className=" col-12 col-lg-3 col-md-12 sectioncard121">
							<ToastContainer />
						</div>
					)}
					<div
						className={`my-3 col-12  col-md-12 col-lg-12
						}`}
					>
						<div className="">
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
								<div class="">
									{loading ? (
										<p>Loading...</p>
									) : individualInstitute ? (
										<div className="">
											<div className="row">
												<div className="col-12 col-md-7">
													<h3 className="my-3" style={{ color: "#16c3ea" }}>
														Profile Information
													</h3>

													<div className="">
														<div className="d-flex flex-row">
															<span class="viewsection123">
																Institute Name :{" "}
															</span>
															<p className="mx-2">
																{individualInstitute.InstituteName}
															</p>
														</div>
														<div className="d-flex flex-row">
															<span class="viewsection123">Head Name : </span>
															<p className="mx-2">
																{individualInstitute.HeadName}
															</p>
														</div>{" "}
														<div className="d-flex flex-row">
															<span class=" viewsection123">
																Primary Email :{" "}
															</span>
															<p className="mx-2">
																{individualInstitute.PrimaryEmail}
															</p>
														</div>
														<div className="d-flex flex-row">
															<span class="viewsection123 ">
																{" "}
																Primary Contact Number :{" "}
															</span>
															<p className="mx-2">
																{individualInstitute.PrimaryContactNumber}
															</p>
														</div>
														<div className="d-flex flex-row">
															<span class="viewsection123 ">
																{" "}
																Secondary Email :
															</span>
															<p className="mx-2">
																{individualInstitute.SecondaryEmail}
															</p>
														</div>
														<div className="d-flex flex-row">
															<span class=" viewsection123">
																{" "}
																Secondary Contact Number :
															</span>
															<p className="mx-2">
																{individualInstitute.SecondaryContactNumber}
															</p>
														</div>
														<div className="d-flex flex-row">
															<span class="viewsection123 "> Address :</span>
															<p className="mx-2">
																{individualInstitute.Address}
															</p>
														</div>
														<div className="d-flex flex-row">
															<span class="viewsection123 "> City Name :</span>
															<p className="mx-2">{individualInstitute.City}</p>
														</div>
														<div className="d-flex flex-row">
															<span class=" viewsection123">
																{" "}
																Institute Code :
															</span>
															<p className="mx-2">
																{individualInstitute.InstituteCode}
															</p>
														</div>
														<div className="d-flex flex-row">
															<span class="viewsection123 ">
																Institute Type :
															</span>
															<p className="mx-2">
																{individualInstitute.InstituteType}
															</p>
														</div>
														{/* <Link to="/AdminDashboard">
															<button type="button" className="btn btn-dark">
																Back
															</button>
														</Link> */}
													</div>
												</div>
												<div className="col-md-5 mt-3">
													<ToastContainer
														position="top-center"
														autoClose={5000}
														hideProgressBar={false}
														newestOnTop={false}
														closeOnClick
														rtl={false}
														pauseOnFocusLoss
														draggable
														pauseOnHover
														theme="light"
													/>
													<div className="">
														<h4 className="mb-3 ">Change Password</h4>
													</div>
													<form action="" onSubmit={onSubmitForm}>
														<h6 className="my-2">Password</h6>
														<input
															type="text"
															style={{ border: "1px solid black" }}
															className="form-control"
															placeholder="Password"
															value={individualInstitute.Password}
															onChange={onChangeInstituteName}
														/>{" "}
														<br />
														<button
															className="mt-2 p-2"
															style={{
																fontSize: "17px",
																backgroundColor: "#16c3ea",
																borderRadius: "7px",
																border: "none",
																color: "#000",
															}}
														>
															Reset
														</button>
														<button
															className="mt-2 p-2 ml-2"
															style={{
																fontSize: "17px",
																backgroundColor: "#16c3ea",
																borderRadius: "7px",
																border: "none",
																color: "#000",
															}}
															onClick={()=>navigate("/SuperHomePage")}
														>
															Back
														</button>
													</form>
												</div>
											</div>
										</div>
									) : (
										<p>Data not found</p>
									)}
									{/* {individualInstitute.map((code) => (
               
              ))} */}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShowData1;
