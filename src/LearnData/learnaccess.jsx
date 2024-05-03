import React from "react";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import apiList from "../liberary/apiList";

const UsersDetails = () => {
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	const [addblogslist, setAddblogslist] = useState([]);
	const [addInstitutelist, setInstitutelist] = useState([]);
	const [isNavVisible, setIsNavVisible] = useState(false);
	const [showInstitutionsOptions, setShowInstitutionsOptions] = useState(false);
	const [selectedInstitutes, setSelectedInstitutes] = useState([]);
	const [selectedBatchYear, setSelectedBatchYear] = useState([]);
	const [selectedBatch, setSelectedBatch] = useState([]);
	const [isFiltered, setIsFiltered] = useState(false);

	const [error, setError] = useState(null);
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/");
	};

	const toggleNav = () => {
		setIsNavVisible(!isNavVisible);
	};

	const [originalData, setOriginalData] = useState([]);

	useEffect(() => {
		fetchblogs();
		InstituteDetails();
		if (token == undefined) {
			navigate("/");
		}
	}, []); // Removed selectedInstitutes from dependencies

	const InstituteDetails = async () => {
		const api = `${apiList.allAddInstitutes}`;
		const authToken =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk";
		try {
			const response = await axios.get(api, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			setInstitutelist(response.data);
		} catch (error) {
			console.error("Error fetching blogs:", error);
		}
	};

	const fetchblogs = async () => {
		const api = `${apiList.allUsersData}`;
		const authToken =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk";
		try {
			const response = await axios.get(api, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			console.log(response.data);
			setAddblogslist(response.data);
			setOriginalData(response.data); // Store original data
		} catch (error) {
			console.error("Error fetching blogs:", error);
		}
	};

	const filterJobs = () => {
		const filteredInstitutes = originalData.filter(
		  (institute) =>
			selectedInstitutes.includes(institute.InstituteType) &&
			selectedBatchYear.includes(institute.BatchYear) &&
			selectedBatch.includes(institute.SelectBatch)
		);
	
		setIsFiltered(filteredInstitutes.length > 0);
		setAddblogslist(filteredInstitutes);
	
		// Print the count of filtered jobs to the console
		console.log("Number of filtered jobs:", filteredInstitutes.length);
	  };

	const handleCheckboxChange = (e) => {
		const value = e.target.value;
		console.log(e.target.value);
		console.log(selectedInstitutes);
		filterJobs();
		if (selectedInstitutes.includes(value)) {
			setSelectedInstitutes(
				selectedInstitutes.filter((item) => item !== value)
			);
		} else {
			setSelectedInstitutes([...selectedInstitutes, value]);
		}
	};
	

	const handleBatchYearChange = (e) => {
		const value = e.target.value;
		filterJobs();
		if (selectedBatchYear.includes(value)) {
			setSelectedBatchYear(selectedBatchYear.filter((item) => item !== value));
		} else {
			setSelectedBatchYear([...selectedBatchYear, value]);
		}
	};

	const handleBatchChange = (e) => {
		const value = e.target.value;
		filterJobs();
		if (selectedBatch.includes(value)) {
			setSelectedBatch(selectedBatch.filter((item) => item !== value));
		} else {
			setSelectedBatch([...selectedBatch, value]);
		}
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
			<div className="container-fluid ">
				<div className="row">
					<div className="">
						<div className="row">
							{isOpen && (
								<div className=" col-12 col-lg-3 col-md-12 sectioncard121">
									<Sidebar />
								</div>
							)}
							<div
								className={`my-3 col-12 col-md-${isOpen ? 12 : 10} col-lg-${
									isOpen ? 9 : 12
								}`}
							>
								<div className="d-lg-block">
									<i
										className="fa-solid fa-bars bars  d-lg-block d-none"
										onClick={toggleSidebar}
									></i>
									<div class="">
										<div className="card section-31 shadow p-2">
											<div className="row">
												<div className="col-md-12">
													<p>Learning Path Access</p>
												</div>
												<div className="col-md-12 text-end">
													<div style={{ marginLeft: "auto" }} class="m-2">
														<div className="row">
															<div className="p-2 col-md-3">
																<select
																	name=""
																	id=""
																	className="form-control"
																	onChange={handleCheckboxChange}
																>
																	<option value="Select Institutions">
																		Select Institutions
																	</option>
																	{addInstitutelist.map((institute) => (
																		<option
																			key={institute.id}
																			value={institute.InstituteName}
																		>
																			{institute.InstituteName}
																		</option>
																	))}
																</select>
															</div>

															<div className="p-2 col-md-3">
																<select
																	name=""
																	id=""
																	className="form-control"
																	onChange={handleBatchYearChange}
																>
																	<option value="Select Batch Year">
																		Select Batch Year
																	</option>
																	{addInstitutelist.map((institute) => (
																		<option
																			key={institute.id}
																			value={institute.BatchYear}
																		>
																			{institute.BatchYear}
																		</option>
																	))}
																</select>
															</div>

															{/* Batch filter */}
															<div className="p-2 col-md-6">
																<select
																	name=""
																	id=""
																	className="form-control"
																	onChange={handleBatchChange}
																>
																	<option value="Select Batch">
																		Select Batch
																	</option>
																	{addInstitutelist.map((institute) => (
																		<option
																			key={institute.id}
																			value={institute.SelectBatch}
																		>
																			{institute.SelectBatch}
																		</option>
																	))}
																</select>
															</div>
														</div>

														<div className="p-2 text-center">
															<button
																className="p-2 selectbtn112"
																style={{
																	backgroundColor: "#16c3ea",
																	border: "none",
																	color:"#000"
																}}
																onClick={filterJobs}
															>
																Search
															</button>
														</div>
														<br />

														<div className="">
															<div className="col-lg-12">
																<div className="table-responsive">
																	<table className="table table-bordered text-center">
																		<thead>
																			<tr>
																				<th
																					style={{
																						fontWeight: "500",
																						color: "#fff",
																						backgroundColor: "#333333",
																					}}
																				>
																					S NO
																				</th>
																				<th
																					style={{
																						fontWeight: "500",
																						color: "#fff",
																						backgroundColor: "#333333",
																					}}
																				>
																					Institution Name
																				</th>
																				<th
																					style={{
																						fontWeight: "500",
																						color: "#fff",
																						backgroundColor: "#333333",
																					}}
																				>
																					Batch Year
																				</th>
																				<th
																					style={{
																						fontWeight: "500",
																						color: "#fff",
																						backgroundColor: "#333333",
																					}}
																				>
																					Batch
																				</th>
																				<th
																					style={{
																						fontWeight: "500",
																						color: "#fff",
																						backgroundColor: "#333333",
																					}}
																				>
																					Access
																				</th>
																			</tr>
																		</thead>

																		<tbody>
																			{isFiltered ? (
																				addblogslist.map((item, index) => (
																					<tr key={index}>
																						<td>{index + 1}</td>
																						<td>{item.InstituteType}</td>
																						<td>{item.BatchYear}</td>
																						<td>{item.SelectBatch}</td>
																						<td>
																							<i className="fa-solid fa-check check"></i>
																						</td>
																					</tr>
																				))
																			) : (
																				<div>
																					{/* Display a "No Data" message when no data is found */}
																					No Data Found
																				</div>
																			)}
																		</tbody>
																	</table>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UsersDetails;
