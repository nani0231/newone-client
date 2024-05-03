import React from "react";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import logo from "../All Images/pab bottom-logo (1).jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import sideimage from "../All Images/Logo133.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import apiList from "../liberary/apiList";
import Cookies from "js-cookie";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const SuperHomePage = () => {
	const token = Cookies.get("token");
	const navigate = useNavigate();
	const [addblogslist, setAddblogslist] = useState([]);
	const [addblogslist1, setAddblogslist1] = useState([]);
	const [isNavVisible, setIsNavVisible] = useState(false);
	const [showInstitutionsOptions, setShowInstitutionsOptions] = useState(false);
	const [institutetypeCounts, setInstitutetypeCounts] = useState({});
	const [itisLoading, setItisLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState(addblogslist);
	const handleLogout = () => {
		Cookies.remove("token");
		navigate("/");
	};

	const toggleNav = () => {
		setIsNavVisible(!isNavVisible);
	};
	useEffect(() => {
		fetchblogs();
		fetchblogs1();
		if (token == undefined) {
			navigate("/");
		}
	}, []);

	const fetchblogs1 = async () => {
		const api = `${apiList.allUsersData}`;
		const authToken = "YOUR_AUTH_TOKEN_HERE"; // Replace with your actual authentication token

		try {
			const response = await axios.get(api, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});

			const data = response.data;
			setAddblogslist1(data);
			setItisLoading(false);

			const institutetypeCounts = {};
			data.forEach((item) => {
				const institutetype = item.InstituteType;
				if (institutetypeCounts[institutetype]) {
					institutetypeCounts[institutetype] += 1;
				} else {
					institutetypeCounts[institutetype] = 1;
				}
			});

			setInstitutetypeCounts(institutetypeCounts);
			setItisLoading(false);
		} catch (error) {
			console.error("Error fetching blogs:", error);
		}
	};
	console.log(institutetypeCounts);
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
	//Add Institute

	const [InstituteName, setInstituteName] = useState("");
	const [HeadName, setHeadName] = useState("");
	const [PrimaryEmail, setPrimaryEmail] = useState("");
	const [PrimaryContactNumber, setPrimaryContactNumber] = useState("");
	const [SecondaryEmail, setSecondaryEmail] = useState("");
	const [SecondaryContactNumber, setSecondaryContactNumber] = useState("");
	const [Address, setAddress] = useState("");
	const [City, setCity] = useState("");
	const [InstituteCode, setInstituteCode] = useState("");
	const [InstituteType, setInstituteType] = useState("");
	const [AxiosPlans, setAxiosPlans] = useState("");
	const [Password, setPassword] = useState("");

	const [data1, setdata1] = useState([]);
	console.log(InstituteName);
	const AddInstitute = {
		InstituteName: InstituteName,
		HeadName: HeadName,
		PrimaryEmail: PrimaryEmail,
		PrimaryContactNumber: PrimaryContactNumber,
		SecondaryEmail: SecondaryEmail,
		SecondaryContactNumber: SecondaryContactNumber,
		Address: Address,
		City: City,
		InstituteCode: InstituteCode,
		InstituteType: InstituteType,
		AxiosPlans: AxiosPlans,
		Password: Password,
	};
	console.log(InstituteName);
	const onSubmitForm = (e) => {
		e.preventDefault();
		if (
			InstituteName &&
			HeadName &&
			PrimaryEmail &&
			PrimaryContactNumber &&
			SecondaryEmail &&
			SecondaryContactNumber &&
			Address &&
			City &&
			InstituteCode &&
			InstituteType &&
			AxiosPlans &&
			Password !== ""
		) {
			const headers = {
				token:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk",
			};
			axios
				.post(`${apiList.AddInstitute}`, AddInstitute, {
					headers,
				})
				.then((response) => {
					setdata1(response.data);

					console.log(response.data);
					if (response.status === 200) {
						toast("Institute Added Successfully", {
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
						setTimeout(function () {}, 3000);
						fetchblogs();
					} else if (response.status === 400) {
						toast("Institute Already Registered with Same Email", {
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
					console.log(error.message);
				});
		} else {
			toast("Enter the Required Details", {
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
	};
	console.log(data1);

	const handleDelete = async (id) => {
		try {
			if (!id) {
				setError("Invalid ID provided for deletion.");
				return;
			}
			console.log("Deleting institute with ID:", id);
			const response = await axios.delete(`${apiList.deleteInstitute}/${id}`);
			if (response.status === 200) {
				toast("Success: Institute deleted", {
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

				fetchblogs();

				// Update your state or fetch updated data as needed
				// For example, if addblogslist is updated from the server, you can update it here.

				const updatedListLength = addblogslist.length - 1;
				console.log("Updated list length:", updatedListLength);
			} else {
				console.log(response.data);
				alert("Error: " + response.data);
				setError("An error occurred while deleting the institute.");
			}
		} catch (error) {
			console.error(error);
			setError("An error occurred while deleting the institute.");
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

	const handleSearch = () => {
		let filtered = addblogslist;
		if (searchQuery) {
			filtered = filtered.filter((blog) =>
				blog.InstituteName.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		setFilteredData(filtered);
	};
	useEffect(() => {
		handleSearch();
	}, [addblogslist]);

	const handleInputChange = (e) => {
		const term = e.target.value;
		setSearchQuery(term);

		let filtered = addblogslist;
		if (term) {
			filtered = filtered.filter((blog) =>
				blog.InstituteName.toLowerCase().includes(term.toLowerCase())
			);
		}

		setFilteredData(filtered);
	};
	const [deleteid, setDeleteid] = useState("");
	const idpassingfordelete = (id) => {
		setDeleteid(id);
	};
	const columns = [
		{ field: "SNO", headerName: "S.No", width: 90 },
		{ field: "NAME", headerName: "Name", width: 190 },
		{ field: "EMAIL", headerName: "Email", width: 220 },
		{ field: "HEAD", headerName: "Head", width: 150 },
		{ field: "USERCOUNT", headerName: "Usercount", width: 150 },
		{ field: "CODE", headerName: "Code", width: 150 },

		{
			field: "ACTION",
			headerName: "Actions",
			width: 560,
			renderCell: (params) => renderActionButtons(params.row),
		},
	];

	const headerColumns = columns.map((col) => ({
		field: col.field,
		headerName: col.headerName,
		width: col.width,
		renderCell: col.renderCell,
	}));

	const renderActionButtons = (blog) => (
		<div>
			<Link to={`/ShowData1/${blog._id}`}>
				<i
					class="fa-regular fa-eye "
					style={{
						backgroundColor: "#d6dadd",
						padding: "6px",
						borderRadius: "4px",
						marginRight: "5px",
						fontSize: "18px",
						cursor:"pointer",
						color:"#050505"
						
					}}
				></i>
			</Link>

			<Link to={`/UpdatePage/${blog._id}`}>
				<i className="fa-solid fa-pencil pencile"></i>
			</Link>
			<i
				className="fa-solid fa-trash delete "
				data-toggle="modal"
				data-target="#myModalDelete"
				onClick={() => idpassingfordelete(blog._id)}
			></i>
		</div>
	);
	let rows = [];

	if (filteredData.length > 0) {
		rows = filteredData.map((blog, index) => ({
			id: index + 1,
			SNO: index + 1,
			NAME: blog.InstituteName,
			EMAIL: blog.PrimaryEmail,
			HEAD: blog.HeadName,
			USERCOUNT: blog.InstituteBatchYear.flatMap(
				(batchYear) => batchYear.InsituteBatch
			).reduce((count, batch) => count + batch.InstituteUsersList.length, 0),
			CODE: blog.InstituteCode,
			description: blog.Description,
			_id: blog._id,
			TOTALQUESTION: blog.chapter?.map(
				(each) =>
					each.MCQ.length + each.codingbasic.length + each.paragMCQ.length
			)[0],
			ACTION: renderActionButtons(blog),
		}));
	} else {
		rows = [
			{
				id: 1,
				SNO: "No Data",
			},
		];
	}

	const [contactNumberError, setContactNumberError] = useState("");
	const handleContactNumberChange = (e) => {
		const value = e.target.value;
		const isValidContactNumber = /^[6-9]\d{9}$/.test(value);

		if (!isValidContactNumber) {
			setContactNumberError(
				"Please enter a valid 10-digit contact number starting with 6, 7, 8, or 9"
			);
		} else {
			setContactNumberError("");
		}

		setPrimaryContactNumber(value);
	};
	const [contactNumberError1, setContactNumberError1] = useState("");
	const handleContactNumberChange1 = (e) => {
		const value = e.target.value;
		const isValidContactNumber = /^[6-9]\d{9}$/.test(value);

		if (!isValidContactNumber) {
			setContactNumberError1(
				"Please enter a valid 10-digit contact number starting with 6, 7, 8, or 9"
			);
		} else {
			setContactNumberError1("");
		}

		setSecondaryContactNumber(value);
	};
	const [passwordError, setPasswordError] = useState("");

	const handlePasswordChange = (e) => {
		const value = e.target.value;
		const isValidPassword =
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
				value
			);
		if (!isValidPassword) {
			setPasswordError(
				"Password must be at least 8 characters long and include at least one letter, one number, and one special character."
			);
		} else {
			setPasswordError("");
		}

		setPassword(value);
	};

	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					{isOpen && (
						<div className=" col-12 col-lg-3 col-md-12 sectioncard121">
							{/* <Sidebar /> */}
							<ToastContainer />
						</div>
					)}
					<div
						className={`my-3 col-12 col-md-12 col-lg-12 py-5`}
					>
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
							<div className=" d-lg-block">
								{/* <i
									className="fa-solid fa-bars bars d-lg-block d-xl-block  d-none"
									onClick={toggleSidebar}
								></i> */}
								
										<div className="row">
                                            
                                        <div className="col-md-12 text-right mb-2">
                                            <h3>Welcome Admin</h3>
                                            <button className="btn btn-dark"  onClick={handleLogout}>Logout</button>
											</div>
											<div className="col-md-12 text-center">
												<h3 className="" style={{ color: "#16c3ea" }}>
													Institutions
												</h3>
											</div>
                                           
											<div className="col-md-4 d-flex text-start mt-2">
												<p className="mt-1 mr-2">Search: </p>
												<div className=" w-100 text-start ">
													<input
														type="text"
														className="form-control w-100"
														// value={searchQuery}
														placeholder="Search by Name"
														onChange={(e) => handleInputChange(e)}
													/>
												</div>
											</div>

											<div className="col-md-5"></div>

											<div className="col-md-3 text-end">
												<button
													style={{
														backgroundColor: "#16c3ea",
														color: "#000",
														fontWeight: "500",
													}}
													type=""
													className="btn btn-light"
													data-bs-toggle="modal"
													data-bs-target="#myModal23"
												>
													+Add Institution
												</button>
											</div>
											<div className="modal" id="myModal23">
												<div className="modal-dialog modal-lg">
													<div className="modal-content">
														<div className="modal-header text-center">
															<h4 className="modal-title text-center">
																Add Institute
															</h4>
															<button
																type="button"
																className="btn-close"
																data-bs-dismiss="modal"
																style={{
																	marginTop: "-35px",
																	marginRight: "-40px",
																	backgroundColor: "#fff",
																	borderRadius: "100%",
																}}
															></button>
														</div>
														<div className="modal-body">
															<>
																<div className="week_item1"></div>
																<form>
																	<div className="admin_header "></div>
																	<div className="adimn_dashnbord "></div>
																	<div className="row">
																		<div className="col-lg-6 col-md-6">
																			<div className="mb-1">
																				<label style={{ fontWeight: "600" }}>
																					Institute Name
																					<sup className="star">*</sup>
																				</label>
																				<input
																					type="text"
																					className="form-control"
																					placeholder="Enter Employee Name"
																					value={InstituteName}
																					onChange={(e) =>
																						setInstituteName(e.target.value)
																					}
																				/>
																			</div>
																		</div>
																		<div className="col-lg-6 col-md-6">
																			<div className="mb-1">
																				<label style={{ fontWeight: "600" }}>
																					Head Name<sup className="star">*</sup>
																				</label>
																				<input
																					type="text"
																					className="form-control"
																					placeholder="Enter Head Name"
																					value={HeadName}
																					onChange={(e) =>
																						setHeadName(e.target.value)
																					}
																				/>
																			</div>
																		</div>
																	</div>
																	<div className="row">
																		<div className="col-lg-6 col-md-6 mt-2">
																			<div className="mb-1">
																				<label style={{ fontWeight: "600" }}>
																					Primary Email{" "}
																					<sup className="star">*</sup>
																				</label>
																				<input
																					type="Primary Email"
																					className="form-control"
																					placeholder="Enter Employee Primary Email"
																					value={PrimaryEmail}
																					onChange={(e) =>
																						setPrimaryEmail(e.target.value)
																					}
																				/>
																			</div>
																		</div>
																		<div className="col-lg-6 col-md-6 mt-2">
																			{/* <div className="mb-1">
											<label><b>Primary Contact Number </b><sup className="star">*</sup></label>
											<input
											type="primaryContactNumber"
											className="form-control"
											placeholder="Primary Contact Number"
											value={PrimaryContactNumber}
											onChange={(e) => setPrimaryContactNumber(e.target.value)}
											/>
										</div> */}
																			<div className="mb-1">
																				<label style={{ fontWeight: "600" }}>
																					Primary Contact Number
																					<sup className="star">*</sup>
																				</label>
																				<input
																					type="text"
																					className={`form-control ${
																						contactNumberError
																							? "is-invalid"
																							: ""
																					}`}
																					placeholder="Primary Contact Number"
																					value={PrimaryContactNumber}
																					onChange={handleContactNumberChange}
																				/>
																				{contactNumberError && (
																					<div className="invalid-feedback">
																						{contactNumberError}
																					</div>
																				)}
																			</div>
																		</div>
																	</div>
																	<div className="row">
																		<div className="col-lg-6 col-md-6 mt-2">
																			<div className="mb-1">
																				<label style={{ fontWeight: "600" }}>
																					Secondary Email{" "}
																					<sup className="star">*</sup>
																				</label>
																				<input
																					type="Secondary Email "
																					className="form-control"
																					placeholder="Employee secondaryEmail Number"
																					value={SecondaryEmail}
																					onChange={(e) =>
																						setSecondaryEmail(e.target.value)
																					}
																				/>
																			</div>
																		</div>
																		<div className="col-lg-6 col-md-6 mt-2">
																			<div className="mb-1">
																				<label style={{ fontWeight: "600" }}>
																					Secondary Contact Number{" "}
																					<sup className="star">*</sup>
																				</label>
																				<input
																					type="text"
																					className={`form-control ${
																						contactNumberError1
																							? "is-invalid"
																							: ""
																					}`}
																					placeholder="Enter Your secondaryContactNumber"
																					value={SecondaryContactNumber}
																					onChange={handleContactNumberChange1}
																				/>
																				{contactNumberError1 && (
																					<div className="invalid-feedback">
																						{contactNumberError1}
																					</div>
																				)}
																			</div>
																		</div>
																	</div>
																	<div className="row">
																		<div className="col-lg-6 col-md-6 mt-2">
																			<div className="mb-1">
																				<label style={{ fontWeight: "600" }}>
																					Address <sup className="star">*</sup>
																				</label>
																				<input
																					type="text"
																					className="form-control"
																					placeholder="Enter Your Address"
																					value={Address}
																					onChange={(e) =>
																						setAddress(e.target.value)
																					}
																				/>
																			</div>
																		</div>
																		<div className="col-lg-6 col-md-6 mt-2">
																			<div className="mb-1">
																				<label style={{ fontWeight: "600" }}>
																					City Name{" "}
																					<sup className="star">*</sup>
																				</label>
																				<input
																					type="text"
																					className="form-control"
																					placeholder="Enter Your City Name"
																					value={City}
																					onChange={(e) =>
																						setCity(e.target.value)
																					}
																				/>
																			</div>
																		</div>
																		<div className="col-lg-6 col-md-6 mt-2">
																			<div className="mb-1">
																				<label style={{ fontWeight: "600" }}>
																					Institute Code{" "}
																					<sup className="star">*</sup>
																				</label>
																				<input
																					type="text"
																					className="form-control"
																					placeholder="Enter Your Institute Code"
																					value={InstituteCode}
																					onChange={(e) =>
																						setInstituteCode(e.target.value)
																					}
																				/>
																			</div>
																		</div>
																		<div className="col-lg-6 col-md-6 mt-2">
																			<div className="mb-1">
																				<label style={{ fontWeight: "600" }}>
																					Institute Type{" "}
																					<sup className="star">*</sup>
																				</label>
																				<select
																					name=""
																					id=""
																					onChange={(e) =>
																						setInstituteType(e.target.value)
																					}
																					value={InstituteType}
																					className="w-100 form-control"
																				>
																					<option
																						value="School"
																						onChange={(e) =>
																							setInstituteType(e.target.value)
																						}
																					>
																						School
																					</option>
																					<option
																						value="Collage"
																						onChange={(e) =>
																							setInstituteType(e.target.value)
																						}
																					>
																						Collage
																					</option>
																					<option
																						value="University"
																						onChange={(e) =>
																							setInstituteType(e.target.value)
																						}
																					>
																						University
																					</option>
																					<option
																						value="Education Society"
																						onChange={(e) =>
																							setInstituteType(e.target.value)
																						}
																					>
																						Education Society
																					</option>
																					<option
																						value="Training Institute"
																						onChange={(e) =>
																							setInstituteType(e.target.value)
																						}
																					>
																						Training Institute
																					</option>
																					<option
																						value="NGOs"
																						onChange={(e) =>
																							setInstituteType(e.target.value)
																						}
																					>
																						NGOs
																					</option>
																				</select>
																			</div>
																		</div>
																		<div className="col-md-6 col-lg-6 mt-2">
																			<div className="mb-1">
																				<label style={{ fontWeight: "600" }}>
																					Access Plans{" "}
																					<sup className="star">*</sup>
																				</label>

																				<select
																					name=""
																					id=""
																					onChange={(e) =>
																						setAxiosPlans(e.target.value)
																					}
																					value={AxiosPlans}
																					className="w-100 form-control"
																				>
																					<option
																						value="Exam Practice"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						Exam Practice
																					</option>
																					<option
																						value="LMS"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						LMS
																					</option>
																					<option
																						value="Mock Interview"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						Mock Interview
																					</option>
																					<option
																						value="Previous papers"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						Previous papers
																					</option>
																				</select>
																			</div>
																		</div>
																		<div className="col-lg-6 col-md-6 mt-2">
																			{/* <div className="mb-1">
                                        <label><b>Password</b> <sup className="star">*</sup></label>
                                        <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter Employee Password"
                                        value={Password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        />
                                      </div> */}
																			<div className="mb-1">
																				<label style={{ fontWeight: "600" }}>
																					Password
																					<sup className="star">*</sup>
																				</label>
																				<input
																					type="password"
																					className={`form-control ${
																						passwordError ? "is-invalid" : ""
																					}`}
																					placeholder="Enter Employee Password"
																					value={Password}
																					onChange={handlePasswordChange}
																				/>
																				{passwordError && (
																					<div className="invalid-feedback">
																						{passwordError}
																					</div>
																				)}
																			</div>
																		</div>
																	</div>
																	<div className="employement_button my-3 text-center">
																		<button
																			type="submit"
																			className=""
																			style={{
																				backgroundColor: "#16c3ea",
																				color: "#000",
																				padding: "7px",
																				borderRadius: "6px",
																				border: "none",
																			}}
																			onClick={onSubmitForm}
																		>
																			Add Institute
																		</button>
																	</div>
																</form>
															</>
														</div>
														<div className="modal-footer">
															{/* <button
                              type="button"
                              className="table_button1"
                              data-dismiss="modal"
                              style={{ backgroundColor: "rgb(169, 98, 98)", color: "white" }}
                            >
                              Close
                            </button> */}
														</div>
													</div>
												</div>
											</div>
										</div>

										<div
											className="mt-4"
											style={{ height: "auto", width: "100%" }}
										>
											<DataGrid
												rows={rows}
												columns={headerColumns}
												initialState={{
													pagination: {
														paginationModel: { page: 0, pageSize: 5 },
													},
												}}
												pageSizeOptions={[5, 10]}
											/>
										</div>
									
							</div>
						)}

						<div class="modal" id="myModalDelete">
							<div class="modal-dialog">
								<div class="modal-content">
									<div class="modal-header">
										<h4 class="modal-title">Delete Institute</h4>
										<button type="button" class="close" data-dismiss="modal">
											&times;
										</button>
									</div>
									<div class="modal-body" style={{ textAlign: "start" }}>
										<p
											style={{
												fontSize: "18px",
												fontWeight: "500",
											}}
										>
											Would you like to delete Institute ?{" "}
										</p>
									</div>
									<div class="modal-footer d-flex justify-content-end">
										<button
											type="button"
											class="btn_yes "
											data-dismiss="modal"
											onClick={() => handleDelete(deleteid)}
										>
											Yes
										</button>
										<button type="button" class="btn_no" data-dismiss="modal">
											No
										</button>
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

export default SuperHomePage;
