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

const BatchYear = () => {
	const token = Cookies.get("token");
	const navigate = useNavigate();

	const [addblogslist, setAddblogslist] = useState([]);
	const [addInstitutelist, setInstitutelist] = useState([]);
	const [isNavVisible, setIsNavVisible] = useState(false);

	const [selectedInstitutes, setSelectedInstitutes] = useState([]);

	const [isFiltered, setIsFiltered] = useState(false);

	const [filteredData, setFilteredData] = useState([]);

	const [error, setError] = useState(null);
	const [itisLoading, setItisLoading] = useState(true);
	const [batchYear, setBatchYear] = useState("");
	const [instituteName, setInstituteName] = useState("");
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
	}, []);

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

	const filterJobs = async () => {
		try {
			const responses = await Promise.all(
				selectedInstitutes.map(async (InstituteName) => {
					const response = await axios.get(
						`${apiList.individualInstituteNames}/${InstituteName}`
					);
					return response.data;
				})
			);
			const filteredData = responses.flat(); // Flatten the array of arrays
			setIsFiltered(filteredData.length > 0);
			setFilteredData(filteredData);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const [selectedInstituteId, setSelectedInstituteId] = useState("");
	const handleInstituteSelection = (e) => {
		const selectedId = e.target.value;
		setSelectedInstituteId(selectedId);
		// Other logic...
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

	const [selectedAddData, setSelectedAddData] = useState(null);

	const [selectedFile, setSelectedFile] = useState(null);

	const [isOpen, setIsOpen] = useState(true);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
		menuBtnChange();
	};

	const handleAddClick = (addInstitutelist) => {
		setSelectedAddData(addInstitutelist);
		console.log(addInstitutelist);
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
	const userData = {
		//   instituteName: instituteName,
		BatchYear: batchYear,
	};
	const onSubmitForm = (e, instituteId) => {
		e.preventDefault();
		const token = Cookies.get("token");
		if (batchYear !== "") {
			axios
				.post(`${apiList.addBatchYear}/${instituteId}`, userData, {
					headers: {
						token: token,
					},
				})
				.then((response) => {
					if (response.status === 200) {
						toast("BatchYear Added", {
							position: "top-center",
							autoClose: 3000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "colored",
							className: "custom-toast-custom",
							onClose: () => {
								// Close the Bootstrap modal using vanilla JavaScript
								const modal = document.getElementById("myModalCreate");
								if (modal) {
									// Check if the modal exists
									const modalBackdrop =
										document.querySelector(".modal-backdrop");
									modal.style.display = "none";
									if (modalBackdrop) {
										// Remove modal backdrop to avoid issues
										modalBackdrop.remove();
									}
								}
							},
						});
						setInstituteName("");
						setBatchYear("");
					}
				})
				.catch((error) => {
					console.log(error.response.data);
					toast.error("BatchYear already added", {
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
				});
		} else {
			toast.warning("Enter Required details", {
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
	const handleDelete = async (instituteid, BatchYearId) => {
		try {
			const response = await axios.delete(
				`${apiList.onselectedBatchyeardeleteinInstitutePath}/${instituteid}/${BatchYearId}`
			);
			if (response.status === 200) {
				toast.success("BatchYear deleted successfully", {
					position: "top-center",
					autoClose: 1000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
					className: "custom-toast-custom",
					onClose: () => {
						// Update the state by removing the deleted batch
						const updatedData = filteredData.map((blog) => {
							if (blog._id === instituteid) {
								const updatedBatchYears = blog.InstituteBatchYear.filter(
									(batch) => batch._id !== BatchYearId
								);
								return {
									...blog,
									InstituteBatchYear: updatedBatchYears,
								};
							}
							return blog;
						});

						setFilteredData(updatedData);
					},
				});

				fetchblogs();
			} else {
				console.log(response.data);
				setError("An error occurred while deleting the institute.");
			}
		} catch (error) {
			console.error(error);
			setError("An error occurred while deleting the institute.");
		}
	};

	const [deleteid, setDeleteid] = useState("");
	const [instituteId, setInstituteId] = useState("");

	console.log(deleteid);
	const idpassingfordelete = (blog) => {
		setDeleteid(blog._id);
		setInstituteId(blog.instituteId);
	};
	const [chapterListUpdate, setChapterListUpdate] = useState({});
	const handleEditInputChange = (value, name) => {
		console.log(value, name);
		setChapterListUpdate({
			...chapterListUpdate,
			[name]: value,
		});
	};
	const GotohandleViewClick = (data) => {
		let Updatedfields = {
			BatchYear: data.BATCHYEAR,
			id: data._id,
			instituteId: data.instituteId,
		};
		delete data["ACTION"];
		setChapterListUpdate(Updatedfields);
		// setUpdateModalOpen(true);
	};

	const onSubmitUpdatedForm = (instituteId, BatchYearId, e) => {
		e.preventDefault();
		console.log(chapterListUpdate);
		axios
			.put(
				`${apiList.updateBatchYear}/${instituteId}/${BatchYearId}`,
				chapterListUpdate
			)
			.then((response) => {
				if (response.status === 200) {
					toast("BatchYear Updated successfully", {
						position: "top-center",
						autoClose: 1000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
						className: "custom-toast-custom",
						onClose: () => {
							// Update the state with the updated batch
							const updatedData = filteredData.map((blog) => {
								if (blog._id === instituteId) {
									const updatedBatchYears = blog.InstituteBatchYear.map(
										(batch) => {
											if (batch._id === BatchYearId) {
												return {
													...batch,
													BatchYear: chapterListUpdate.BatchYear,
												};
											}
											return batch;
										}
									);
									return {
										...blog,
										InstituteBatchYear: updatedBatchYears,
									};
								}
								return blog;
							});

							setFilteredData(updatedData);
						},
					});
					setTimeout(function () {}, 3000);
					setBatchYear("");
				}
			})
			.catch((error) => {
				console.log(error);
				toast("Chapter already Updated", {
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
			});
	};
	const columns = [
		{ field: "SNO", headerName: "S.No", width: 250 },
		{ field: "BATCHYEAR", headerName: "Batch Year", width: 330 },
		{ field: "BATCHS", headerName: "Batch", width: 330 },
		{
			field: "ACTION",
			headerName: "Action",
			width: 550,
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
			<i
				className="fa-solid fa-pencil pencile"
				data-bs-toggle="modal"
				data-bs-target="#myModalView"
				onClick={() => {
					GotohandleViewClick(blog);
				}}
			></i>
			<i
				className="fa-solid fa-trash delete mb-1"
				data-toggle="modal"
				data-target="#myModalDelete"
				onClick={() => idpassingfordelete(blog)}
			></i>
		</div>
	);

	var cnt = 0;
	const rows = filteredData.flatMap((blog) =>
		(blog?.InstituteBatchYear || []).map((each, index) => ({
			id: ++cnt, // Add this line to include a unique id for each row
			SNO: cnt,
			BATCHYEAR: each.BatchYear,
			BATCHS: each.InsituteBatch.length,
			_id: each._id,
			instituteId: blog._id,
			ACTION: renderActionButtons(blog),
		}))
	);

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
								<i
									className="fa-solid fa-bars bars d-lg-block d-none"
									onClick={toggleSidebar}
								></i>
								<div class="">
									<div className="">
										<div className="row">
											<div className="col-md-12 text-center">
												<h3 className=" " style={{ color: "#16c3ea" }}>
													Filter Batch Years{" "}
												</h3>
											</div>
											<div className="col-md-3 ">
												<select
													name=""
													id=""
													className=" form-control"
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
											<div className="col-md-1">
												<button
													className="btn float-right"
													style={{ backgroundColor: "#16c3ea", color: "#000" }}
													onClick={filterJobs}
												>
													Search
												</button>
											</div>
											<div className="col-md-4 "></div>

											<div className="col-md-4 text-end">
												<button
													className="float-right btn"
													style={{
														backgroundColor: "#16c3ea",
														color: "#000",
														fontWeight: "500",
													}}
													data-toggle="modal"
													data-target="#myModalCreate"
													onClick={() => handleAddClick(addInstitutelist)}
												>
													{" "}
													<i class="fa-solid fa-plus"></i> Create Batch Year
												</button>
												<div className="modal" id="myModalCreate">
													<div className="modal-dialog modal-lg">
														<div className="modal-content">
															<div className="modal-header">
																<h4 className="modal-title">
																	Create Batch Year
																</h4>
																<button
																	type="button"
																	className="close"
																	data-dismiss="modal"
																	style={{
																		marginTop: "-35px",
																		marginRight: "-40px",
																		backgroundColor: "#fff",
																		borderRadius: "100%",
																		padding: "6px 12px 6px 12px",
																		height: "40px",
																		// fontSize: "20px",
																	}}
																>
																	&times;
																</button>
															</div>
															<div className="modal-body Tabs">
																<>
																	<div className="">
																		<form className="tab-content">
																			<div className="row mb-2">
																				<div className="col-md-5">
																					<div className="mb-1">
																						<label
																							style={{ fontWeight: "600" }}
																						>
																							Institute{" "}
																							<sup className="star">*</sup>
																						</label>
																						<div>
																							<select
																								style={{ padding: "5px" }}
																								className="w-100 select_item form-control"
																								onChange={
																									handleInstituteSelection
																								}
																							>
																								<option
																									className="hidden"
																									value=""
																								>
																									Select Institute Name
																								</option>
																								{selectedAddData?.map(
																									(institute) => (
																										<>
																											<option
																												className="name_item"
																												key={institute.id} // Use a unique key for each option
																												data-value={
																													institute.InstituteName
																												}
																												value={institute._id}
																											>
																												{
																													institute.InstituteName
																												}
																											</option>
																										</>
																									)
																								)}
																							</select>
																						</div>
																					</div>
																				</div>
																				<div className="col-md-5">
																					<label style={{ fontWeight: "600" }}>
																						Batch Year{" "}
																						<sup className="star">*</sup>
																					</label>
																					<input
																						type="text"
																						className="form-control"
																						placeholder="YYYY"
																						value={batchYear}
																						onChange={(e) =>
																							setBatchYear(e.target.value)
																						}
																					/>
																				</div>
																				<div className="col-md-2 mt-4">
																					<button
																						className="btn btn-light mt-2"
																						style={{
																							backgroundColor: "#16c3ea",
																							color: "#000",
																						}}
																						onClick={(e) =>
																							onSubmitForm(
																								e,
																								selectedInstituteId
																							)
																						}
																					>
																						Submit
																					</button>
																				</div>
																			</div>
																		</form>
																	</div>
																</>
																<div className="modal-footer">
																	<button
																		type="button"
																		className="btn btn-light"
																		data-dismiss="modal"
																		style={{
																			backgroundColor: "#981a96",
																			color: "white",
																		}}
																	>
																		Close
																	</button>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div class="modal" id="myModalView">
													<div class="modal-dialog">
														<div class="modal-content">
															<div class="modal-header">
																<h4 class="modal-title">Update BatchYear</h4>

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
																<form>
																	<label
																		style={{ float: "left", fontWeight: "600" }}
																	>
																		BatchYear
																	</label>
																	<input
																		style={{ padding: "5px" }}
																		name="BatchYear"
																		value={chapterListUpdate.BatchYear || ""}
																		className="form-control"
																		onChange={(e) =>
																			handleEditInputChange(
																				e.target.value,
																				"BatchYear"
																			)
																		}
																	/>
																	<div className="modal-footer">
																		<button
																			type="button"
																			className="btn "
																			data-bs-dismiss="modal"
																			style={{ backgroundColor: "#16c3ea" }}
																			onClick={(e) =>
																				onSubmitUpdatedForm(
																					chapterListUpdate?.instituteId,
																					chapterListUpdate?.id,
																					e
																				)
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
											</div>
										</div>
										<br />

										{isFiltered ? (
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
										) : (
											<div>
												<h6 className="text-center">No Data Found</h6>
											</div>
										)}
									</div>
								</div>
							</div>
						)}

						<div class="modal" id="myModalDelete">
							<div class="modal-dialog">
								<div class="modal-content">
									<div class="modal-header">
										<h4 class="modal-title">Delete BatchYear</h4>
										<button
											type="button"
											class="close"
											data-dismiss="modal"
											style={{
												marginTop: "-35px",
												marginRight: "-40px",
												backgroundColor: "#fff",
												borderRadius: "100%",
												padding: "6px 12px 6px 12px",
												height: "40px",
												// fontSize: "20px",
											}}
										>
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
											Would you like to delete BatchYear ?{" "}
										</p>
									</div>
									<div class="modal-footer d-flex justify-content-end">
										<button
											type="button"
											class="btn_yes "
											data-dismiss="modal"
											onClick={() => handleDelete(instituteId, deleteid)}
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

export default BatchYear;
