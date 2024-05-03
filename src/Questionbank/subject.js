import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Audio } from "react-loader-spinner";
import apiList from "../liberary/apiList";
import Cookies from "js-cookie";

const QbSubject = () => {
	useEffect(() => {
		fetchblogs1();
	}, []);
	const [Open, setOpen] = useState(true);
	const [blogslist, setBlogslist] = useState([]);

	console.log(blogslist);
	let navigate = useNavigate("");
	const fetchblogs1 = async () => {
		const api = `${apiList.subjects}`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setBlogslist(response.data);
			setWorksheetLoading(false);
			setTimeout(function () {}, 3000);
		} catch (error) {
			console.error("Error fetch blogs:", error);
			setWorksheetLoading(false);
		}
	};
	const [name, setName] = useState("");
	const [Description, setDescription] = useState("");
	const [subjecttag, setSubjectTag] = useState("");
	const [data1, setData1] = useState("");
	const [worksheetLoading, setWorksheetLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState(blogslist);

	const handleSubjectTagTypeSelection = (event) => {
		setSubjectTag(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
	};

	const onSubmitForm = async (e) => {
		const token = Cookies.get("token");
		console.log(token, "token");
		e.preventDefault();
		if (name && Description && subjecttag !== "") {
			try {
				const AddSubject = {
					name: name,
					Description: Description,
					subjectTag: subjecttag,
				};
				console.log(AddSubject);
				const response = await axios.post(`${apiList.subjects}`, AddSubject, {
					headers: {
						token: token,
					},
				});
				setData1(response.data);
				console.log(response.data);
				if (response.status === 200) {
					toast("Subject Added Successfully", {
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
					fetchblogs1();
					setTimeout(function () {}, 3000);
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			toast("Please fill in all fields", {
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
	console.log("data1");
	const [Error, setError] = useState("");
	const handleDelete = async (id) => {
		try {
			if (!id) {
				setError("Invalid ID provided for delete");
				return;
			}
			console.log("Deleting subject with ID", id);
			const response = await axios.delete(`${apiList.subjet}/${id}`);
			if (response.status === 200) {
				toast("Subject Delete Successfully", {
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
				fetchblogs1();
				setTimeout(function () {}, 3000);
			} else {
				setError("An error occured while deleting subject.");
			}
		} catch (error) {
			setError("An error occured while deleting the subject.");
		}

		const created = () => {
			setOpen(!Open);
		};
	};
	const onSubmitUpdatedForm = (_id, e) => {
		const token = Cookies.get("token");
		e.preventDefault();
		const AddSubject = {
			name: name,
			description: Description,
			subjectTag: subjecttag,
		};
		const nonemptyuserData = Object.fromEntries(
			Object.entries(AddSubject).filter(([key, value]) => value !== "")
		);
		axios
			.put(`${apiList.subject}/${_id}`, nonemptyuserData, {
				headers: {
					token: token,
				},
			})
			.then((response) => {
				if (response.status === 200) {
					toast("Subject Updated successfully", {
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
					setName("");
					setDescription("");
					setSubjectTag("");
					fetchblogs1();
					setTimeout(function () {}, 3000);
				}
			})
			.catch((error) => {
				console.log(error.response.data);
				toast.error("Institute already Updated");
			});
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

	const [deleteid, setDeleteid] = useState("");

	const idpassingfordelete = (id) => {
		setDeleteid(id);
	};

	const handleSearch = () => {
		let filtered;

		filtered = blogslist;

		if (searchQuery) {
			filtered = filtered.filter((folder) =>
				folder.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		setFilteredData(filtered);
	};
	useEffect(() => {
		handleSearch();
	}, [blogslist]);

	const handleInputChange = (e) => {
		const term = e.target.value;
		setSearchQuery(term);

		let filtered;

		filtered = blogslist;

		if (term) {
			filtered = filtered.filter((blog) =>
				blog.name.toLowerCase().includes(term.toLowerCase())
			);
		}

		setFilteredData(filtered);
	};
	const columns = [
		{ field: "SNO", headerName: "S.No", width: 120 },
		{ field: "NAME", headerName: "Name", width: 220 },
		{ field: "TAG", headerName: "Tag", width: 250 },
		{ field: "CHAPTERS", headerName: "Chapter", width: 200 },
		{ field: "TOTALQUESTION", headerName: "Total Questions", width: 150 },
		{
			field: "ACTION",
			headerName: "Actions",
			width: 517,
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
			{filteredData && filteredData.length > 0 ? (
				<div>
					<i
						className="fa-solid fa-pencil pencile"
						onClick={() => GotohandleViewClick(blog)}
						data-bs-toggle="modal"
						data-bs-target="#myModalView"
					></i>
					<i
						className="fa-solid fa-trash delete "
						data-toggle="modal"
						data-target="#myModalDelete"
						onClick={() => idpassingfordelete(blog._id)}
					></i>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);

	var rows = [];
	if (filteredData && filteredData.length > 0) {
		rows = filteredData.map((blog, index) => ({
			id: index + 1, // Add this line to include a unique id for each row
			SNO: index + 1,
			NAME: blog.name,
			TAG: blog.subjectTag,
			CHAPTERS: blog.chapter.length,
			description: blog.Description,
			_id: blog._id,
			TOTALQUESTION:
				blog.chapter?.map(
					(each) =>
						each.MCQ.length + each.codingbasic.length + each.paragMCQ.length
				)[0] || "0",
			ACTION: renderActionButtons(blog),
		}));
	} else {
		rows = [
			{
				id: "",
				SNO: "NoData",
			},
		];
	}
	const [selectedSubject, setSelectedSubject] = useState(null);
	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
	console.log(selectedSubject);
	const GotohandleViewClick = (data) => {
		setSelectedSubject(data);
		setUpdateModalOpen(true);
	};
	const handleSubjectTagSelection = (event) => {
		setSubjectTag(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
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
						{worksheetLoading ? (
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
							<div className=" ">
								<div className=" d-lg-block">
									<i
										className="fa-solid fa-bars bars d-lg-block d-none"
										onClick={toggleSidebar}
									></i>
									<div className="">
										<div class="row">
											<div className="col-md-12 text-center">
												<h3 className="" style={{ color: "#16c3ea" }}>
													Subjects
												</h3>
											</div>
											

											<div className="col-md-4 d-flex">
											<label className="mt-1 mr-1" style={{fontWeight:"500"}}>Search: </label>
												<input
													type="text"
													className="form-control"
													value={searchQuery}
													placeholder="Search by Name"
													onChange={(e) => handleInputChange(e)}
												/>
											</div>
											<div className="col-md-4"></div>

											<div className="col-md-4 text-right">
												<button
													type="button "
													data-bs-toggle="modal"
													data-bs-target="#myModalCreate"
													className="float-right btn"
													style={{ backgroundColor: "#16c3ea", color: "#000", textAlign:"end" }}
												>
													+ Create Subject
												</button>
											</div>
										</div>

										<div class="modal" id="myModalCreate">
											<div class="modal-dialog">
												<div class="modal-content">
													<div class="modal-header">
														<h4 class="modal-title">Create Subject</h4>
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
														<form onSubmit={(e) => onSubmitForm(e)}>
															<div className="row">
																<div className="col-lg-6 col-md-6">
																	<div className="mb-1">
																		<label style={{ fontWeight: "600" }}>
																			Name
																			<sup className="star">*</sup>
																		</label>
																		<input
																			type="text"
																			className="form-control"
																			placeholder="Name"
																			value={name}
																			onChange={(e) => setName(e.target.value)}
																		/>
																	</div>
																</div>
																<div className="col-lg-6 col-md-6">
																	<div className="mb-1">
																		<label style={{ fontWeight: "600" }}>
																			Description
																			<sup className="star">*</sup>
																		</label>
																		<input
																			type="text"
																			className="form-control"
																			placeholder="Description"
																			value={Description}
																			onChange={(e) =>
																				setDescription(e.target.value)
																			}
																		/>
																	</div>
																</div>
																<div className="col-lg-6">
																	<label
																		className="my-3 "
																		style={{ fontWeight: "600" }}
																	>
																		SubjectTag <sup className="star">*</sup>
																	</label>
																	<select
																		value={subjecttag}
																		className="form-control mb-2"
																		// onChange={(e) => setSubjectTag(e.target.value)}
																		onChange={handleSubjectTagTypeSelection}
																	>
																		<option value="">
																			select subjects Tag
																		</option>
																		<option data-value="C-programming">
																			C-programming
																		</option>
																		<option data-value="Communication">
																			Communication
																		</option>
																		<option data-value="Data-structres">
																			Data-structures
																		</option>
																		<option data-value="Dbms">Dbms</option>
																		<option data-value="java-programming">
																			java-programming
																		</option>
																		<option data-value="others">others</option>
																		<option data-value="programming">
																			programming
																		</option>
																		<option data-value="programming Skills">
																			programming Skills
																		</option>
																	</select>
																</div>

																<div className="modal-footer">
																	<button
																		type="submit"
																		className="btn btn-danger"
																		data-bs-dismiss="modal"
																		style={{
																			backgroundColor: "#16c3ea",
																			color: "#000",
																		}}
																	>
																		Submit
																	</button>
																</div>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>

										{/* Delete */}

										<div class="modal" id="myModal234567">
											<div class="modal-dialog">
												<div class="modal-content">
													<div class="modal-header">
														<h4 class="modal-title">Delete Subject</h4>
														<button
															type="button"
															class="btn-close"
															data-bs-dismiss="modal"
														></button>
														<button
															type="button"
															class="btn-close"
															data-bs-dismiss="modal"
														></button>
													</div>

													<div class="modal-body">
														Are Sure Delete this subject
													</div>

													<div class="modal-footer">
														<p>No</p>
														<button
															type="button"
															class="btn btn-danger"
															data-bs-dismiss="modal"
														>
															Yes
														</button>
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

										<div
											class="modal"
											id="myModalView"
											style={{ display: isUpdateModalOpen ? "block" : "none" }}
										>
											<div class="modal-dialog">
												<div class="modal-content">
													<div class="modal-header">
														<h4 class="modal-title">Update Subject</h4>
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
													<div class="modal-body">
														<div className="mb-1">
															<label style={{ float: "left" }}>
																Name<sup className="star">*</sup>
															</label>
															<input
																type="text"
																className="form-control"
																placeholder="Name"
																value={name || selectedSubject?.NAME}
																onChange={(e) => setName(e.target.value)}
															/>
														</div>
														<div className="mb-1">
															<label style={{ float: "left" }}>
																Description
																<sup className="star">*</sup>
															</label>
															<input
																type="text"
																className="form-control"
																placeholder="Description"
																value={
																	Description || selectedSubject?.description
																}
																onChange={(e) => setDescription(e.target.value)}
															/>
														</div>
														<label className="mt-3 " style={{ float: "left" }}>
															SubjectTag<sup className="star">*</sup>
														</label>
														<select
															type="text"
															className="form-control"
															placeholder="...subject tag..."
															value={subjecttag || selectedSubject?.TAG}
															onChange={handleSubjectTagSelection}

															// onChange={}
														>
															<option data-value="C-programming">
																C-programming
															</option>
															<option data-value="Communication">
																Communication
															</option>
															<option data-value="Data-structres">
																Data-structures
															</option>
															<option data-value="Dbms">Dbms</option>
															<option data-value="java-programming">
																java-programming
															</option>
															<option data-value="others">others</option>
															<option data-value="programming">
																programming
															</option>
															<option data-value="programming Skills">
																programming Skills
															</option>
														</select>
														<p></p>
													</div>

													<div class="modal-footer">
														<button
															type="button"
															class="btn btn-danger"
															data-bs-dismiss="modal"
															style={{
																backgroundColor: "#16c3ea",
																color: "#000",
															}}
															onClick={(e) =>
																onSubmitUpdatedForm(selectedSubject?._id, e)
															}
														>
															Submit
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
									<></>
								</div>
							</div>
						)}

						<div class="modal" id="myModalDelete">
							<div class="modal-dialog">
								<div class="modal-content">
									<div class="modal-header">
										<h4 class="modal-title">Delete Subject</h4>
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
											Would you like to delete Subject ?{" "}
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
export default QbSubject;
