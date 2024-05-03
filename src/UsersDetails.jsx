import React from "react";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import logo from "../src/All Images/pab bottom-logo (1).jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import sideimage from "./All Images/Logo133.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import siva from "../src/All Images/Siva Image.jpeg";
import Sidebar from "./Sidebar";
import apiList from "./liberary/apiList";
import Cookies from "js-cookie";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const UsersDetails = () => {
	const token = Cookies.get("token");
	const navigate = useNavigate();
	const [addblogslist, setAddblogslist] = useState([]);
	const [addInstitutelist, setInstitutelist] = useState([]);
	const [isNavVisible, setIsNavVisible] = useState(false);
	const [showInstitutionsOptions, setShowInstitutionsOptions] = useState(false);
	const [selectedInstitutes, setSelectedInstitutes] = useState([]);
	const [selectedBatchYear, setSelectedBatchYear] = useState([]);
	const [selectedBatch, setSelectedBatch] = useState([]);
	const [isFiltered, setIsFiltered] = useState(false);
	const [showSingleUserForm, setShowSingleUserForm] = useState(true);
	const [showMultipleUserForm, setShowMultipleUserForm] = useState(false);
	const [itisLoading, setItisLoading] = useState(true);

	const handleSingleUserButtonClick = () => {
		setShowSingleUserForm(true);
		setShowMultipleUserForm(false);
	};

	const handleMultipleUserButtonClick = () => {
		setShowSingleUserForm(false);
		setShowMultipleUserForm(true);
	};

	const [error, setError] = useState(null);
	const handleLogout = () => {
		Cookies.remove("token");
		navigate("/");
	};

	const toggleNav = () => {
		setIsNavVisible(!isNavVisible);
	};
	useEffect(() => {
		fetchblogs();
		InstituteDetails();
		if (token == undefined) {
			navigate("/");
		}
	}, [selectedInstitutes]);

	const InstituteDetails = async () => {
		// const api = `${apiList.allAddInstitutes}`;
		const userEmail = localStorage.getItem("UserEmail")
		const api = `${apiList.ParticularInstitute}/${userEmail}`;
		const authToken =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk";
		try {
			const response = await axios.get(api, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			setInstitutelist([response.data]);
			setItisLoading(false);
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
			setAddblogslist(response.data);
			setItisLoading(false);
		} catch (error) {
			console.error("Error fetching blogs:", error);
		}
	};
	const [filteredData, setFilteredData] = useState([]);

	const filterJobs = () => {
		const filteredInstitutes = [
			addInstitutelist.find((institute) =>
				institute.InstituteBatchYear.find((batches) =>
					batches.InsituteBatch.find((batch) => batch._id === selectedBatchId)
				)
			),
		];
		setIsFiltered(filteredInstitutes.length > 0);
		setAddblogslist(filteredInstitutes);
		console.log("Search Data ", filteredInstitutes);
		// Print the count of filtered jobs to the console
		console.log("Number of filtered jobs:", filteredInstitutes.length);
	};

	const handleCheckboxChange = (e) => {
		const value = e.target.value;
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
		if (selectedBatchYear.includes(value)) {
			setSelectedBatchYear(selectedBatchYear.filter((item) => item !== value));
		} else {
			setSelectedBatchYear([...selectedBatchYear, value]);
		}
	};

	const handleBatchChange = (e) => {
		const value = e.target.value;
		if (selectedBatch.includes(value)) {
			setSelectedBatch(selectedBatch.filter((item) => item !== value));
		} else {
			setSelectedBatch([...selectedBatch, value]);
		}
	};

	const [Regdid, setRegdid] = useState("");
	const [FirstName, setFirstName] = useState("");
	const [LastName, setLastName] = useState("");
	const [userEmail, setuserEmail] = useState("");
	const [userNumber, setuserNumber] = useState("");
	const [BatchYear, setBatchYear] = useState("");
	const [SelectBatch, setSelectBatch] = useState("");
	const [InstituteType, setInstituteType] = useState("");
	const [AxiosPlans, setAxiosPlans] = useState("");
	const [Password, setPassword] = useState("");
	const [ExpiryDate, setExpiryDate] = useState("");

	const [data1, setdata1] = useState([]);
	const AddInstitute = {
		Regdid: Regdid,
		FirstName: FirstName,
		LastName: LastName,
		userEmail: userEmail,
		userNumber: userNumber,
		AccessPlans: AxiosPlans,
		Password: Password,
		ExpiryDate: ExpiryDate,
	};
	console.log(AddInstitute);
	const onSubmitForm = async (e) => {
		e.preventDefault();
		if (Regdid && FirstName && userEmail && Password !== "") {
			try {
				const response = await axios.post(
					`${apiList.AddUsers}/${selectedInstituteId}/${selectedBatchYearId}/${selectedBatchId}`,
					AddInstitute
				);
				setdata1(response.data);
				console.log(response.data);
				if (response.status === 200) {
					toast.success("User added Successfull", {
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
				}
			} catch (error) {
				// Handle error and display appropriate notifications
				console.log(error);
			}
		} else {
			toast("please fill in all fields", {
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

	console.log(FirstName);
	//By-Batch
	const AddInstitute1 = {
		AccessPlans: AxiosPlans,
		Access: "on",
	};
	console.log(FirstName);
	const onSubmitForm1 = (e) => {
		e.preventDefault();
		// if (
		//   BatchYear &&
		//   SelectBatch &&
		//   InstituteType &&
		//   AxiosPlans !== ""
		// ) {
		const headers = {
			token:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk",
		};
		axios
			.post(
				`${apiList.ByBatchData}/${selectedInstituteId}/${selectedBatchYearId}/${selectedBatchId}`,
				AddInstitute1,
				{
					headers,
				}
			)
			.then((response) => {
				setdata1(response.data);

				console.log(response.data);
				if (response.status === 200) {
					toast.success("Access Updated Successfully", {
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
					setAxiosPlans("");
					setTimeout(function () {}, 3000);
					fetchblogs();
				}
			})
			.catch((error) => {
				console.log(error.message);
			});
		// } else {
		//   toast.success("Enter the Required Details", {
		//     position: "top-center",
		//     autoClose: 1000,
		//     hideProgressBar: false,
		//     closeOnClick: true,
		//     pauseOnHover: true,
		//     draggable: true,
		//     progress: undefined,
		//     theme: "colored",
		//     className: "custom-toast-custom",
		//   });
	};
	console.log(data1);

	const [aboveData, setaboveData] = useState("");
	const [institutionpara, setinstitutionpara] = useState("");
	const [state1, setState1] = useState("");
	console.log(state1);
	//By-LIst
	const AddInstitute2 = {
		aboveData: aboveData,
		institutionpara: institutionpara,
		InstituteType: InstituteType,
		AccessPlans: AxiosPlans,
	};
	console.log(FirstName);
	const onSubmitForm2 = (e) => {
		e.preventDefault();
		if (aboveData && institutionpara && InstituteType && AxiosPlans !== "") {
			const headers = {
				token:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk",
			};
			axios
				.post(`${apiList.ByListData}/${selectedInstituteId}`, AddInstitute2, {
					headers,
				})
				.then((response) => {
					setdata1(response.data);

					console.log(response.data);
					if (response.status === 200) {
						toast.success("saved Data Successfull", {
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
						setAxiosPlans("");
						setTimeout(function () {}, 3000);
						fetchblogs();
					}
				})
				.catch((error) => {
					console.log(error.message);
				});
		} else {
			toast.success("Enter the Required Details", {
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
	const [selectedFile, setSelectedFile] = useState(null);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setSelectedFile(file);
	};

	const handleDownloadFormat = () => {
		// Check if a file is selected
		if (selectedFile) {
			// Implement your file download logic here
			// For example, you can create a download link and trigger a click event
			const downloadLink = document.createElement("a");
			downloadLink.href = URL.createObjectURL(selectedFile);
			downloadLink.download = "Institute.xlsx"; // Specify the desired file name
			downloadLink.click();
		} else {
			toast.success("Please select a file before downloading the format.", {
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
	const [contactNumberError, setContactNumberError] = useState("");

	const handleMobileNumber = (e) => {
		const value = e.target.value;

		// Validate that the input starts with a number between 6 and 9 and has a total length of 10
		const isValidContactNumber = /^[6-9]\d{9}$/.test(value);

		if (!isValidContactNumber) {
			setContactNumberError(
				"Please enter a valid 10-digit contact number starting with 6, 7, 8, or 9"
			);
		} else {
			setContactNumberError("");
		}

		setuserNumber(value);
	};

	const [passwordError, setPasswordError] = useState("");

	const handlePasswordChange = (e) => {
		const value = e.target.value;

		// Validate the password - Now includes at least one special character
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

	const columns = [
		{ field: "SNO", headerName: "S.No", width: 70 },
		{ field: "NAME", headerName: "Name", width: 180 },
		{ field: "EMAIL", headerName: "Email", width: 200 },
		{ field: "REGNO", headerName: "RegNo", width: 150 },
		{ field: "MOBILE", headerName: "MobileNo", width: 150 },
		{ field: "STATUS", headerName: "Status", width: 123 },
		{ field: "EXPIRY", headerName: "ExpiredDate", width: 130 },
		{
			field: "ACTION",
			headerName: "Action",
			width: 460,

			renderCell: (params) => renderActionButtons(params.row),
		},
	];

	const headerColumns = columns.map((col) => ({
		field: col.field,
		headerName: col.headerName,
		width: col.width,
		renderCell: col.renderCell,
	}));
	const [handle, sethandle] = useState([]);
	console.log(handle);
	const renderActionButtons = (blog) => (
		<div>
			<i
				onClick={() =>
					navigate("/ShowData", {
						state: {
							instituteName: blog.instituteName,
							batchYear: blog.batchYear,
							batch: blog.batch,
							instituteId: blog.instituteId,
							batchyearId: blog.batchyearId,
							batchId: blog.batchId,
							userId: blog._id,
						},
					})
				}
				className="fa-regular fa-eye "
				style={{
					backgroundColor: "#d6dadd",
					padding: "6px",
					borderRadius: "4px",
					marginRight: "5px",
					fontSize: "18px",
					cursor:"pointer",
					color:"#050505"
				}}
			>
				
			</i>
		</div>
	);
	let rows = [];
	var cnt = 0;

	if (isFiltered) {
		rows =
			addblogslist?.flatMap((institute, instituteIndex) =>
				institute?.InstituteBatchYear?.flatMap((batchYear) =>
					batchYear?.InsituteBatch?.flatMap((batch) =>
						batch?.InstituteUsersList?.map((user, userIndex) => ({
							id: ++cnt,
							SNO: cnt,
							NAME: `${user?.FirstName} ${user?.LastName}`,
							EMAIL: user?.userEmail,
							REGNO: user?.Regdid,
							MOBILE: user?.userNumber,
							STATUS: "Active",
							EXPIRY: user?.ExpiryDate,
							_id: user?._id,
							instituteId: institute._id,
							batchyearId: batchYear._id,
							batchId: batch._id,
							instituteName: institute.InstituteName,
							batchYear: batchYear.BatchYear,
							batch: batch.Batch,
							ACTION: renderActionButtons(institute),
						}))
					)
				)
			) ?? [];
	} else {
		rows = addInstitutelist.flatMap((institute, instituteIndex) =>
			institute.InstituteBatchYear.flatMap((batchYear) =>
				batchYear.InsituteBatch.flatMap((batch) =>
					batch.InstituteUsersList.map((user, userIndex) => ({
						id: ++cnt,
						SNO: cnt,
						NAME: `${user.FirstName} ${user.LastName}`,
						EMAIL: user.userEmail,
						REGNO: user.Regdid,
						MOBILE: user.userNumber,
						STATUS: "Active",
						EXPIRY: user.ExpiryDate,
						_id: user._id,
						instituteId: institute._id,
						batchyearId: batchYear._id,
						batchId: batch._id,
						instituteName: institute.InstituteName,
						batchYear: batchYear.BatchYear,
						batch: batch.Batch,
						ACTION: renderActionButtons(institute),
					}))
				)
			)
		);
	}

	const [selectedInstituteId, setSelectedInstituteId] = useState("");
	const [selectedBatchYearId, setSelectedBatchYearId] = useState("");
	const [selectedBatchId, setSelectedBatchId] = useState("");
	const [filteredInstitutionData, setFilteredInstitutionData] = useState([]);
	const [filteredBatchYearData, setFilteredBatchYearData] = useState([]);

	console.log(addInstitutelist);
	const handleInstituteSelection = (e) => {
		setFilteredInstitutionData([]);
		setFilteredBatchYearData([]);

		setSelectedInstituteId(
			e.target.options[e.target.selectedIndex].getAttribute("value")
		);
		const selectedId = e.target.value;
		const result = addInstitutelist?.find((item) => item?._id === selectedId);

		console.log("Filtered Data 1:", result?.InstituteBatchYear);
		setTimeout(() => {
			setFilteredInstitutionData(result?.InstituteBatchYear || []);
		}, 10);
		setSelectedBatchYearId("");
		setSelectedBatchId("");
	};
	const handleBatchYearSelection = (e) => {
		setFilteredBatchYearData([]);
		setSelectedBatchYearId(
			e.target.options[e.target.selectedIndex].getAttribute("value")
		);
		const selectedById = e.target.value;
		const result2 = filteredInstitutionData?.find(
			(item) => item?._id === selectedById
		);
		console.log("Filtered Data 2:", result2);
		setFilteredBatchYearData(result2?.InsituteBatch || []);
		setSelectedBatchId("");
	};
	const handleBatchSelection = (e) => {
		setSelectedBatchId(
			e.target.options[e.target.selectedIndex].getAttribute("value")
		);
	};
	return (
		<div>
			<div className="container-fluid ">
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
							<div className="d-lg-block">
								<i
									className="fa-solid fa-bars bars  d-lg-block d-none"
									onClick={toggleSidebar}
								></i>
								<div class="">
									<div className="">
										<div className="row">
											<div className="col-md-12 text-center">
												<h3 className="" style={{color:"#16c3ea"}}>Users</h3>
											</div>
											
											<div className="col-md-8"></div>
											<div className="col-md-2 text-right">
												<button
													style={{
														backgroundColor: "#16c3ea",
														color: "#000",
														fontWeight: "500",
													}}
													className="float-right btn btn-light"
													data-bs-toggle="modal"
													data-bs-target="#myModal23"
												>
													+ Add Users
												</button>
												<div class="modal" id="myModal23">
													<div class="modal-dialog ">
														<div class="modal-content text-start">
															{/* <!-- Modal Header --> */}
															<div class="modal-header">
																<div className="d-flex flex-row">
																	<button
																		style={{
																			border: "none",
																			borderRadius: "6px",
																		}}
																		className={`p-1 m-2 ${
																			showSingleUserForm ? "bg-primary" : ""
																		}`}
																		onClick={handleSingleUserButtonClick}
																	>
																		Single User
																	</button>
																	<button
																		style={{
																			border: "none",
																			borderRadius: "6px",
																		}}
																		className={`p-1 m-2 ${
																			showMultipleUserForm ? "bg-primary" : ""
																		}`}
																		onClick={handleMultipleUserButtonClick}
																	>
																		Multiple User
																	</button>
																</div>
																<button
																	type="button"
																	class="btn-close"
																	data-bs-dismiss="modal"
																	style={{
																		marginTop: "-35px",
																		marginRight: "-40px",
																		backgroundColor: "#fff",
																		borderRadius: "100%",
																		// padding: "6px 12px 6px 12px",
																		// height: "40px",
																		// fontSize: "20px",
																	}}
																></button>
															</div>

															{showSingleUserForm && (
																<div class="modal-body">
																	<form action="" onSubmit={onSubmitForm}>
																		<div className="row">
																			<div className="col-12 col-md-4 ">
																				<label className="headingAdd">
																					Institution{" "}
																					<sup className="star">*</sup>
																				</label>
																				<div className="">
																					<select
																						name=""
																						id=""
																						className="p-2 form-control"
																						onChange={handleInstituteSelection}
																					>
																						<option value="SelectInstitutions">
																							Select Institutions
																						</option>
																						{addInstitutelist.map(
																							(institute) => (
																								<option
																									key={institute.id}
																									value={institute._id}
																								>
																									{institute.InstituteName}
																								</option>
																							)
																						)}
																					</select>
																				</div>
																			</div>
																			<div className="col-12 col-md-4 ">
																				<label className="headingAdd">
																					Batch Year{" "}
																					<sup className="star">*</sup>
																				</label>

																				<div className=" ">
																					<select
																						name=""
																						id=""
																						className=" p-2 form-control"
																						onChange={handleBatchYearSelection}
																					>
																						<option value="">
																							Select Batch Year
																						</option>
																						{filteredInstitutionData?.map(
																							(year) => (
																								<option value={year._id}>
																									{year.BatchYear}
																								</option>
																							)
																						)}
																					</select>
																				</div>
																			</div>
																			<div className="col-12 col-md-4 ">
																				<label className="headingAdd">
																					Batch <sup className="star">*</sup>
																				</label>

																				<div className="">
																					<select
																						name=""
																						id=""
																						className="p-2 form-control"
																						onChange={handleBatchSelection}
																					>
																						<option value="Select Batch">
																							Select Batch
																						</option>
																						{/* {addInstitutelist.map(
                                                    ((institute) => (
                                                      institute?.InstituteBatchYear?.map((year)=>year?.InsituteBatch?.map((each)=>
                                                      <option
                                                        key={year.id}
                                                        value={
                                                          each._id
                                                        }
                                                      >
                                                        {each.Batch}
                                                      </option>
                                                    )
                                                    ))))} */}
																						{filteredBatchYearData?.map(
																							(each) => (
																								<option
																									key={each.id}
																									value={each._id}
																								>
																									{each.Batch}
																								</option>
																							)
																						)}
																					</select>
																				</div>
																			</div>
																		</div>
																		<br />
																		<div className="row">
																			<div className="col-12 col-md-6">
																				<label className="headingAdd">
																					First Name{" "}
																					<sup className="star">*</sup>
																				</label>
																				<br />
																				<input
																					type="text"
																					className="form-control"
																					placeholder="Enter  First Name "
																					onChange={(e) =>
																						setFirstName(e.target.value)
																					}
																					value={FirstName}
																				/>
																			</div>
																			<div className="col-12 col-md-6">
																				<label className="headingAdd">
																					Last Name{" "}
																					<sup className="star">*</sup>
																				</label>
																				<br />
																				<input
																					type="text"
																					className="form-control"
																					placeholder="Enter Last Name"
																					onChange={(e) =>
																						setLastName(e.target.value)
																					}
																					value={LastName}
																				/>
																			</div>
																			<br />
																			<div className="col-12 col-md-12 mt-1">
																				<label className="headingAdd">
																					Email <sup className="star">*</sup>
																				</label>
																				<br />
																				<input
																					type="text"
																					className="form-control"
																					placeholder="Enter Email"
																					onChange={(e) =>
																						setuserEmail(e.target.value)
																					}
																					value={userEmail}
																				/>
																			</div>
																			<br />
																			<div className="col-12 col-md-6 mt-1">
																				<label className="headingAdd">
																					Regd Id <sup className="star">*</sup>
																				</label>
																				<br />
																				<input
																					type="text"
																					className="form-control"
																					placeholder="Enter Regd Id/Hallticket No"
																					onChange={(e) =>
																						setRegdid(e.target.value)
																					}
																					value={Regdid}
																				/>
																			</div>
																			<div className="col-12 col-md-6 mt-1">
																				<label className="headingAdd">
																					Mobile No{" "}
																					<sup className="star">*</sup>
																				</label>
																				<br />
																				<input
																					type="text"
																					className={`form-control ${
																						contactNumberError
																							? "is-invalid"
																							: ""
																					}`}
																					placeholder="Enter Mobile No"
																					onChange={handleMobileNumber}
																					value={userNumber}
																				/>
																				{contactNumberError && (
																					<div className="invalid-feedback">
																						{contactNumberError}
																					</div>
																				)}
																			</div>
																			<br />
																			<div className="col-12 col-md-6 mt-1">
																				<label className="headingAdd">
																					Password <sup className="star">*</sup>
																				</label>
																				<br />
																				<input
																					type="text"
																					className={`form-control ${
																						passwordError ? "is-invalid" : ""
																					}`}
																					placeholder="Enter Password"
																					onChange={handlePasswordChange}
																					value={Password}
																				/>
																				{passwordError && (
																					<div className="invalid-feedback">
																						{passwordError}
																					</div>
																				)}
																			</div>
																			<div className="col-12 col-md-6 mt-1">
																				<label className="headingAdd">
																					Access Period{" "}
																					<sup className="star">*</sup>
																				</label>
																				<br />

																				<select
																					name=""
																					id=""
																					onChange={(e) =>
																						setAxiosPlans(e.target.value)
																					}
																					value={AxiosPlans}
																					className="form-control"
																				>
																					<option value="3 Months">
																						Select Access Period
																					</option>
																					<option
																						value="Exam Practice1"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						3 Months
																					</option>
																					<option
																						value="6 Months"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						6 Months
																					</option>
																					<option
																						value="9 Months"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						9 Months
																					</option>
																					<option
																						value="12 Months"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						12 Months
																					</option>
																				</select>
																			</div>
																			<div className="col-12 col-md-6">
																				<label className="headingAdd mt-3">
																					Expired Date{" "}
																					<sup className="star">*</sup>
																				</label>
																				<br />
																				<input
																					type="Date"
																					className="form-control"
																					placeholder="Enter Expired Date"
																					onChange={(e) =>
																						setExpiryDate(e.target.value)
																					}
																					value={ExpiryDate}
																				/>
																			</div>

																			<div class="modal-footer mt-3">
																				<button
																					type="submit"
																					class="btn adduserdata"
																					data-bs-dismiss="modal"
																					style={{
																						backgroundColor: "#16c3ea",
																						color: "#000",
																					}}
																				>
																					Add Users
																				</button>
																			</div>
																		</div>
																	</form>
																</div>
															)}

															{showMultipleUserForm && (
																<div class="modal-body">
																	<div className="d-flex justify-content-between">
																		<h5>Upload Users</h5>
																		<div className=" text-end">
																			<button
																				className="bg-warning  text-white"
																				style={{
																					border: "none",
																					borderRadius: "6px",
																					padding: "7px 20px",
																				}}
																				onClick={handleDownloadFormat}
																			>
																				<i
																					class="fa-solid fa-download"
																					style={{ color: "white" }}
																				></i>{" "}
																				Download Format
																			</button>
																		</div>
																	</div>
																	<form action="" onSubmit={onSubmitForm}>
																		<div className="row">
																			<div className="col-12 col-md-4 ">
																				<label className="headingAdd">
																					Institution{" "}
																					<sup className="star">*</sup>
																				</label>

																				<div className="">
																					<select
																						name=""
																						id=""
																						className="p-2 form-control"
																						onChange={(e) =>
																							setInstituteType(e.target.value)
																						}
																					>
																						<option value="SelectInstitutions">
																							Select Institutions
																						</option>
																						{addInstitutelist.map(
																							(institute) => (
																								<option
																									key={institute.id}
																									value={
																										institute.InstituteName
																									}
																								>
																									{institute.InstituteName}
																								</option>
																							)
																						)}
																					</select>
																				</div>
																			</div>
																			<div className="col-12 col-md-4 ">
																				<label className="headingAdd">
																					Batch Year{" "}
																					<sup className="star">*</sup>
																				</label>

																				<div className=" ">
																					<select
																						name=""
																						id=""
																						className="form-control"
																						onChange={handleBatchYearSelection}
																					>
																						<option value="">
																							Select Batch Year
																						</option>
																						{filteredInstitutionData?.map(
																							(year) => (
																								<option value={year._id}>
																									{year.BatchYear}
																								</option>
																							)
																						)}
																					</select>
																				</div>
																			</div>
																			<div className="col-12 col-md-4 ">
																				<label className="headingAdd">
																					Batch <sup className="star">*</sup>
																				</label>

																				<div className="">
																					<select
																						name=""
																						id=""
																						className="form-control"
																						onChange={handleBatchSelection}
																					>
																						<option value="Select Batch">
																							Select Batch
																						</option>
																						{filteredBatchYearData?.map(
																							(each) => (
																								<option
																									key={each.id}
																									value={each._id}
																								>
																									{each.Batch}
																								</option>
																							)
																						)}
																					</select>
																				</div>
																			</div>
																		</div>
																		<br />
																		<div className="row">
																			<div className="col-12 col-md-6 mt-2">
																				<label className="headingAdd">
																					Access Period{" "}
																					<sup className="star">*</sup>
																				</label>
																				<br />

																				<select
																					name=""
																					id=""
																					onChange={(e) =>
																						setAxiosPlans(e.target.value)
																					}
																					value={AxiosPlans}
																					className="form-control"
																				>
																					<option value="3 Months">
																						Select Access Period
																					</option>
																					<option
																						value="Exam Practice"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						3 Months
																					</option>
																					<option
																						value="6 Months"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						6 Months
																					</option>
																					<option
																						value="9 Months"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						9 Months
																					</option>
																					<option
																						value="12 Months"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						12 Months
																					</option>
																				</select>
																			</div>
																			<div className="col-12 col-md-6 mt-2">
																				<label className="headingAdd">
																					Users File{" "}
																					<sup className="star">*</sup>
																				</label>
																				<br />
																				<input
																					type="file"
																					className="form-control"
																					style={{
																						border: "1px solid black",
																					}}
																					placeholder="Enter Password"
																					onChange={handleFileChange}
																					accept=".xls, .xlsx" // Limit file selection to Excel files
																				/>
																			</div>
																		</div>

																		<div class="modal-footer mt-5">
																			<button
																				type="submit"
																				class="btn adduserdata"
																				data-bs-dismiss="modal"
																				style={{
																					backgroundColor: "#16c3ea",
																					color: "#000",
																				}}
																			>
																				Add Users
																			</button>
																		</div>
																	</form>
																</div>
															)}

															{/* <!-- Modal footer --> */}
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-2">
												<button
													className="btn btn-dark"
													type="button"
													data-bs-toggle="modal"
													data-bs-target="#myModal2"
												>
													{" "}
													<i class="fa-solid fa-plus"></i> Extend Users
												</button>

												<div class="modal" id="myModal2">
													<div class="modal-dialog ">
														<div class="modal-content">
															{/* <!-- Modal Header --> */}
															<div class="modal-header">
																<div className="d-flex flex-row">
																	<button
																		style={{
																			border: "none",
																			borderRadius: "6px",
																		}}
																		className={`p-1 m-2 ${
																			showSingleUserForm ? "bg-primary" : ""
																		}`}
																		onClick={handleSingleUserButtonClick}
																	>
																		By Batch
																	</button>
																	<button
																		style={{
																			border: "none",
																			borderRadius: "6px",
																		}}
																		className={`p-1 m-2 ${
																			showMultipleUserForm ? "bg-primary" : ""
																		}`}
																		onClick={handleMultipleUserButtonClick}
																	>
																		By List
																	</button>
																</div>
																<button
																	type="button"
																	class="btn-close"
																	data-bs-dismiss="modal"
																	style={{
																		marginTop: "-35px",
																		marginRight: "-40px",
																		backgroundColor: "#fff",
																		borderRadius: "100%",
																		// padding: "6px 12px 6px 12px",
																		// height: "40px",
																		// fontSize: "20px",
																	}}
																></button>
															</div>

															{showSingleUserForm && (
																<div class="modal-body text-start">
																	<form action="" onSubmit={onSubmitForm1}>
																		<div className="row">
																			<div className="col-12 col-md-4 ">
																				<label className="headingAdd">
																					Institution :
																				</label>

																				<div className="">
																					<select
																						name=""
																						id=""
																						className="p-2 form-control"
																						onChange={handleInstituteSelection}
																					>
																						<option value="SelectInstitutions">
																							Select Institutions
																						</option>
																						{addInstitutelist.map(
																							(institute) => (
																								<option
																									key={institute.id}
																									value={institute._id}
																								>
																									{institute.InstituteName}
																								</option>
																							)
																						)}
																					</select>
																				</div>
																			</div>
																			<div className="col-12 col-md-4 ">
																				<label className="headingAdd">
																					Batch Year :
																				</label>

																				<div className=" ">
																					<select
																						name=""
																						id=""
																						className=" p-2 form-control"
																						onChange={handleBatchYearSelection}
																					>
																						<option value="">
																							Select Batch Year
																						</option>
																						{filteredInstitutionData?.map(
																							(year) => (
																								<option
																									// key={year.id}
																									value={year._id}
																								>
																									{year.BatchYear}
																								</option>
																							)
																						)}
																					</select>
																				</div>
																			</div>
																			<div className="col-12 col-md-4 ">
																				<label className="headingAdd">
																					Batch :
																				</label>

																				<div className="">
																					<select
																						name=""
																						id=""
																						className="p-2 form-control"
																						onChange={handleBatchSelection}
																					>
																						<option value="Select Batch">
																							Select Batch
																						</option>
																						{filteredBatchYearData?.map(
																							(each) => (
																								<option
																									key={each.id}
																									value={each._id}
																								>
																									{each.Batch}
																								</option>
																							)
																						)}
																					</select>
																				</div>
																			</div>

																			<br />

																			<div className="col-md-6  mt-2">
																				<label className="headingAdd">
																					Access Period :
																				</label>
																				<br />

																				<select
																					name=""
																					id=""
																					onChange={(e) =>
																						setAxiosPlans(e.target.value)
																					}
																					value={AxiosPlans}
																					className="form-control"
																				>
																					<option value="Exam Practice">
																						Select Access Period
																					</option>
																					<option
																						value="3 Months"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						3 Months
																					</option>
																					<option
																						value="6 Months"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						6 Months
																					</option>
																					<option
																						value="9 Months"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						9 Months
																					</option>
																					<option
																						value="12 Months"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						12 Months
																					</option>
																				</select>
																			</div>
																		</div>
																		<div className="col-12 col-md-12">
																			<div
																				class="modal-footer1 mt-3"
																				style={{ textAlign: "center" }}
																			>
																				<button
																					type="submit"
																					className="adduserdata"
																					data-bs-dismiss="modal"
																					style={{
																						backgroundColor: "#16c3ea",
																						color: "#000",
																					}}
																				>
																					Extend Users
																				</button>
																				<p
																					className=" mt-2"
																					style={{
																						color: "orange",

																						fontSize: "13px",
																					}}
																				>
																					Note:Extending Users Access is a
																					irreverible action. Please Continue
																					with care
																				</p>
																			</div>
																		</div>
																	</form>
																</div>
															)}

															{showMultipleUserForm && (
																<div class="modal-body text-start">
																	<form action="" onSubmit={onSubmitForm2}>
																		<div className="row">
																			<div className="col-md-6 ">
																				<label className="headingAdd">
																					Institution :
																				</label>

																				<div className="">
																					<select
																						name=""
																						id=""
																						className="p-2 form-control"
																						onChange={(e) =>
																							setInstituteType(e.target.value)
																						}
																					>
																						<option value="SelectInstitutions">
																							Select Institutions
																						</option>
																						{addInstitutelist.map(
																							(institute) => (
																								<option
																									key={institute.id}
																									value={
																										institute.InstituteName
																									}
																								>
																									{institute.InstituteName}
																								</option>
																							)
																						)}
																					</select>
																				</div>
																			</div>

																			<div className="col-md-6 ">
																				<label className="headingAdd">
																					Access Period :
																				</label>
																				<br />

																				<select
																					name=""
																					id=""
																					onChange={(e) =>
																						setAxiosPlans(e.target.value)
																					}
																					value={AxiosPlans}
																					className="form-control "
																				>
																					<option value="Exam Practice">
																						Select Access Period
																					</option>
																					<option
																						value="3 Months"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						3 Months
																					</option>
																					<option
																						value="6 Months"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						6 Months
																					</option>
																					<option
																						value="9 Months"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						9 Months
																					</option>
																					<option
																						value="12 Months"
																						onChange={(e) =>
																							setAxiosPlans(e.target.value)
																						}
																					>
																						12 Months
																					</option>
																				</select>
																			</div>

																			<br />
																			<div className="col-12 col-md-12 mt-1">
																				<label className="headingAdd">
																					Institution :
																				</label>
																				<br />
																				<textarea
																					className="form-control p-3"
																					name=""
																					id=""
																					rows="5"
																					placeholder="Please all users seperated with :"
																					onChange={(e) =>
																						setinstitutionpara(e.target.value)
																					}
																					value={institutionpara}
																				></textarea>
																			</div>

																			<div className="col-md-12">
																				<label className="headingAdd">
																					is the above data :
																				</label>
																				<br />
																				<div className="row">
																					<div className="col-md-6">
																						<input
																							type="radio"
																							id="html"
																							onChange={(e) =>
																								setaboveData(e.target.value)
																							}
																							value="Emails?"
																							name="aboveData"
																						/>

																						<label
																							for="html"
																							value="Emails?"
																							className="mx-3"
																						>
																							Emails?
																						</label>
																						<br />
																					</div>
																					<div className="col-md-6">
																						<input
																							type="radio"
																							id="html"
																							className="mx-3 shadow"
																							name="aboveData"
																							onChange={(e) =>
																								setaboveData(e.target.value)
																							}
																							value=" Hallticket/Regd,Numbers"
																						/>
																						<label
																							value="Hallticket/Regd,Numbers,"
																							for="html"
																						>
																							Hallticket/Regd, Numbers
																						</label>
																						{/* <p for="html" className="mx-5">
                                            Numbers,
                                          </p> */}
																						<br />
																					</div>
																				</div>
																			</div>
																		</div>
																		<div className="col-12 col-md-12">
																			<div
																				class="modal-footer1 mt-3"
																				style={{ textAlign: "center" }}
																			>
																				<button
																					type="submit"
																					class="adduserdata"
																					data-bs-dismiss="modal"
																					style={{
																						backgroundColor: "#16c3ea",
																						color: "#000",
																					}}
																				>
																					Extend Users
																				</button>
																				<p
																					className=" mt-2"
																					style={{
																						color: "orange",
																						fontSize: "13px",
																					}}
																				>
																					Note:Extending Users Access is a
																					irreverible action. Please Continue
																					with care
																				</p>
																			</div>
																		</div>
																	</form>
																</div>
															)}

															{/* <!-- Modal footer --> */}
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="row mt-5">
											<div className="col-md-4">
											<label className="" style={{ fontWeight: "600" }}>
													Institutions
												</label>
												<select
													name=""
													id=""
													className="form-control"
													onChange={handleInstituteSelection}
												>
													<option value="Select Institutions">
														Select Institutions
													</option>
													{addInstitutelist.map((institute) => (
														<option key={institute.id} value={institute._id}>
															{institute.InstituteName}
														</option>
													))}
												</select>
												
											</div>

											<div className="col-md-4">
											<label className="" style={{ fontWeight: "600" }}>
													Batch Year
												</label>
												<select
													name=""
													id=""
													className="form-control"
													onChange={handleBatchYearSelection}
												>
													<option value="">Select Batch Year</option>

													{filteredInstitutionData?.map((year) => (
														<option value={year._id}>{year.BatchYear}</option>
													))}
												</select>
												
											</div>

											{/* Batch filter */}
											<div className="col-md-4">
											<label className="" style={{ fontWeight: "600" }}>
													Batch
												</label>
												<select
													name=""
													id=""
													className="form-control"
													onChange={handleBatchSelection}
												>
													<option value="Select Batch">Select Batch</option>
													{filteredBatchYearData?.map((each) => (
														<option key={each.id} value={each._id}>
															{each.Batch}
														</option>
													))}
												</select>
												
											</div>
											<div className="col-md-4"></div>
											<div className="col-md-4 mt-3  text-center">
											<button
													className="btn btn-light w-25"
													style={{ backgroundColor: "#16c3ea", color: "#000" , fontWeight:"500"}}
													onClick={filterJobs}
												>
													Search
												</button>
											</div>
											<div className="col-md-4"></div>

											
										</div>
										<br />

										<div
											className="mt-2"
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
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UsersDetails;
