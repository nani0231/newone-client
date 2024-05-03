import React from "react";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
// import logo from "../src/All Images/pab bottom-logo (1).jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import sideimage from "../All Images/Logo133.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import siva from "../All Images/Siva Image.jpeg";
import { useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import Cookies from "js-cookie";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import apiList from "../liberary/apiList";

const Content = () => {
	const { id, topicId } = useParams();
	const token = Cookies.get("token");
	const navigate = useNavigate();
	const [addblogslist, setAddblogslist] = useState([]);
	const [addblogslist1, setAddblogslist1] = useState([]);
	const [isNavVisible, setIsNavVisible] = useState(false);
	const [showInstitutionsOptions, setShowInstitutionsOptions] = useState(false);
	const [institutetypeCounts, setInstitutetypeCounts] = useState({});

	const [individualInstitute, setIndividualInstitute] = useState([]);
	const [individualInstitute1, setIndividualInstitute1] = useState("");
	console.log(individualInstitute1);
	const [loading, setLoading] = useState(true);

	const [error, setError] = useState(null);
	useEffect(() => {
		fetchData();
	}, []);
	useEffect(() => {
		fetchDatatopic();
		fetchData1();
		fetchData();
		setcontentTime(new Date().toLocaleString());
		if (token == undefined) {
			navigate("/");
		}
	}, []);

	const fetchDatatopic = async () => {
		console.log(id);
		try {
			const response = await axios.get(`${apiList.getTopic}/${id}`);
			setIndividualInstitute1(response.data);

			setLoading(false);
		} catch (error) {
			console.error("Error fetching data:", error);
			setLoading(false);
		}
	};
	console.log(individualInstitute1);
	const fetchData1 = async () => {
		console.log(id);
		try {
			const response = await axios.get(`${apiList.getTopic}/${id}/${topicId}`);
			setIndividualInstitute1(response.data);
			setTopicName(response.data.topicName);
			console.log(response.data.topicName);

			setLoading(false);
		} catch (error) {
			console.error("Error fetching data:", error);
			setLoading(false);
		}
	};

	const fetchData = async () => {
		try {
			const response = await axios.get(
				// `${apiList.getAllContents}/${id}/${topicId}/${id}`
				`${apiList.getcontentsdetails}/${id}/${topicId}`
			);
			setIndividualInstitute(response.data);
			setFilteredData(response.data);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching data:", error);
			setLoading(false);
		}
	};

	// fetchData();

	console.log(individualInstitute);
	console.log(individualInstitute1);

	//Add Institute
	const [topicName, setTopicName] = useState("");
	const [contentTitle, setcontentTitle] = useState("");
	const [contentdes, setcontentdes] = useState("");
	const [contentimg, setcontentimg] = useState("");
	const [publish, setpublish] = useState("");
	const [contentTime, setcontentTime] = useState("");
	const [_id, set_id] = useState(id || "");
	console.log(topicName);

	const [data1, setdata1] = useState([]);
	if (!contentTime) {
		setcontentTime(new Date().toLocaleString());
	}

	const AddTopicDetails = {
		topicName: topicName,
		contentTitle: contentTitle,
		contentdes: contentdes,
		contentimg: contentimg,
		publish: publish,
		contentTime: contentTime,
		_id: _id,
	};
	console.log(AddTopicDetails);

	const onSubmitForm = (e) => {
		e.preventDefault();
		if (
			topicName &&
			contentTitle &&
			contentdes &&
			contentimg &&
			publish &&
			contentTime &&
			_id !== ""
		) {
			const headers = {
				token:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk",
			};

			const AddContentDetails = {
				topicName: topicName,
				contentTitle: contentTitle,
				contentdes: contentdes,
				contentimg: contentimg,
				publish: publish,
				contentTime: contentTime,
			};

			axios
				.post(
					`${apiList.addContentOfTopicsinlearningpath}/${id}`,
					AddContentDetails,
					{
						headers,
					}
				)
				.then((response) => {
					setdata1(response.data);

					console.log(response.data);
					if (response.status === 200) {
						toast("Content Add Successfully", {
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
							navigate(`/Content/${id}/${topicId}/${id}`);
						}, 3000);
					}
					fetchData();
				})
				.catch((error) => {
					console.log(error.message);
				});
		} else {
			toast("Enter the Required Details", {
				position: "top-center",
				autoClose: 3000,
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
	const handleDelete = async (contentTitle) => {
		try {
			if (!contentTitle) {
				setError("Invalid content title provided for deletion.");
				return;
			}

			const response = await axios.delete(
				`${apiList.onselectedContentinTopicinLearningPath}/${id}/${topicId}/${contentTitle}`
			);

			if (response.status === 200) {
				toast("Delete Successfully", {
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
				fetchData();
			} else {
				console.log(response.data);
				toast("Topic name already exists", {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
					className: "custom-toast-custom",
				});
				setError("An error occurred while deleting the content.");
			}
		} catch (error) {
			console.error(error);
			setError("An error occurred while deleting the content.");
		}
	};

	console.log(contentTitle);
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

	console.log(contentTitle);
	const [filteredData, setFilteredData] = useState(addblogslist);

	const handleInputChange = (e) => {
		const term = e.target.value;

		let filtered = individualInstitute;
		if (term) {
			filtered = filtered.filter((blog) =>
				blog.contentTitle.toLowerCase().includes(term.toLowerCase())
			);
		}

		setFilteredData(filtered.length ? filtered : []);
	};
	const [deleteid, setDeleteid] = useState("");

	const idpassingfordelete = (id) => {
		setDeleteid(id);
	};
	const columns = [
		{ field: "SNO", headerName: "S.No", width: 140 },
		{ field: "TITLE", headerName: "Title", width: 220 },
		{ field: "DISPLAY", headerName: "Display", width: 260 },
		{ field: "LASTUPDATE", headerName: "LastUpdate", width: 290 },
		{
			field: "ACTION",
			headerName: "Actions",
			width: 552,
			renderCell: (params) => renderActionButtons(params?.row),
		},
	];

	const headerColumns = columns.map((col) => ({
		field: col.field,
		headerName: col.headerName,
		width: col.width,
		renderCell: col.renderCell,
	}));

	const renderActionButtons = (content) => (
		<div>
			{filteredData.length ? (
				<>
					<Link to={`/ContentUpdate/${id}/${topicId}/${content.TITLE}`}>
						<i className="fa-solid fa-pencil pencile"></i>
					</Link>
					<i
						className="fa-solid fa-trash delete"
						data-toggle="modal"
						data-target="#myModalDelete"
						onClick={() => idpassingfordelete(content.TITLE)}
					></i>
				</>
			) : (
				<div></div>
			)}
		</div>
	);
	let rows = [];
	if (filteredData && filteredData.length <= 0) {
		rows = [
			{
				id: 1,
				SNO: "No Data",
			},
		];
	} else {
		rows = filteredData?.map((content, index) => {
			// Calculate time difference
			const storedTime = new Date(content.contentTime);
			console.log(storedTime);
			const currentTime = new Date();
			const timeDifferenceInSeconds = Math.floor(
				(currentTime - storedTime) / 1000
			);

			// Display different messages based on the time difference
			let timeDisplay;
			if (timeDifferenceInSeconds < 60) {
				timeDisplay = "Just now";
			} else {
				const minutesDifference = Math.floor(timeDifferenceInSeconds / 60);
				if (minutesDifference < 60) {
					timeDisplay = `${minutesDifference} minute${
						minutesDifference > 1 ? "s" : ""
					} ago`;
				} else {
					const hoursDifference = Math.floor(minutesDifference / 60);
					timeDisplay = `${hoursDifference} hour${
						hoursDifference > 1 ? "s" : ""
					} ago`;
				}
			}

			return {
				id: index + 1, // Add this line to include a unique id for each row
				SNO: index + 1,
				TITLE: content.contentTitle,
				CONTENTTYPE: content.PrimaryEmail,
				DISPLAY: "Text",
				LASTUPDATE: timeDisplay,
				ACTION: renderActionButtons(content),
			};
		});
	}

	// Corporate Office
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
							<div className=" ">
								<i
									className="fa-solid fa-bars bars d-lg-block d-none"
									onClick={toggleSidebar}
								></i>
								<div class="">
									<div className="row">
										<div className="col-md-12 text-center">
											{individualInstitute1 && (
												<h3 style={{ color: "#16c3ea" }}>
													Topic: {individualInstitute1.topicName}
												</h3>
											)}
										</div>

										<div className="col-md-4 d-flex">
											<label className="mr-2 mt-1">Search: </label>
											<input
												type="text"
												className="form-control"
												//   value={searchQuery}
												placeholder="Search by name"
												onChange={handleInputChange}
											/>
										</div>
										<div className="col-md-6"></div>

										<div className="col-md-2">
											<button
												type="button"
												class="year"
												style={{ backgroundColor: "#16c3ea", color: "#000" }}
											>
												+ Add Content
											</button>
											<div className="content-options text-end">
												<p
													className="m-0"
													type="button"
													data-bs-toggle="modal"
													data-bs-target="#myModal"
												>
													<i className="fa-solid fa-t"></i> Text Content
												</p>

												<p className="m-0">
													<i className="fa-solid fa-video"></i> Video Content
												</p>
												<p className="m-0">
													<i className="fa-solid fa-file"></i> Assessment
												</p>
											</div>
											<div class="modal mx-5" id="myModal">
												<div class="modal-dialog modal-md">
													<div class="modal-content">
														<div class="modal-header">
															<h4 class="modal-title">Add Content</h4>
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

														<form action="">
															<div className="col-12 col-md-12 p-2">
																<div class="">
																	<div>
																		<div className="batch_card p-3">
																			<div>
																				<p style={{ fontWeight: "600" }}>
																					Text Content Title{" "}
																					<sup className="star">*</sup>
																				</p>
																				<input
																					type="text"
																					className="form-control"
																					onChange={(e) =>
																						setcontentTitle(e.target.value)
																					}
																					value={contentTitle}
																				/>
																			</div>
																		</div>

																		<div className="batch_card p-3">
																			<div>
																				<p style={{ fontWeight: "600" }}>
																					Content <sup className="star">*</sup>
																				</p>
																				{/* <input type="text" className="form-control"/> */}
																				<textarea
																					className="form-control"
																					rows={4}
																					onChange={(e) =>
																						setcontentdes(e.target.value)
																					}
																					value={contentdes}
																				></textarea>
																			</div>
																		</div>

																		<div className="mt-3 batch_card p-3">
																			<p
																				className=" p-2"
																				style={{ fontWeight: "600" }}
																			>
																				Insert Image{" "}
																				<sup className="star">*</sup>
																			</p>
																			<input
																				type="file"
																				style={{
																					border: "1px solid #dee2e6",
																				}}
																				className="p-2 w-100"
																				onChange={(e) =>
																					setcontentimg(e.target.value)
																				}
																				value={contentimg}
																			/>
																		</div>
																		<div className="batch_card p-3">
																			<p style={{ fontWeight: "600" }}>
																				Publish <sup className="star">*</sup>
																			</p>
																			<select
																				className="p-1 form-control"
																				onChange={(e) =>
																					setpublish(e.target.value)
																				}
																			>
																				<option value="" hidden>
																					--Select Publish --
																				</option>
																				<option value="Yes">Yes</option>
																				<option value="No">No</option>
																			</select>
																		</div>

																		<div className=" mx-3 p-2">
																			<button
																				className="create_btn"
																				onClick={onSubmitForm}
																				data-bs-dismiss="modal"
																				style={{
																					backgroundColor: "#16c3ea",
																					color: "#000",
																				}}
																			>
																				Create
																			</button>
																		</div>
																	</div>
																</div>
															</div>
														</form>
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

										<div class="modal" id="myModalDelete">
											<div class="modal-dialog">
												<div class="modal-content">
													<div class="modal-header">
														<h4 class="modal-title">Delete Content</h4>
														<button
															type="button"
															class="close"
															data-dismiss="modal"
														>
															&times;
														</button>
													</div>
													<div
														class="modal-body"
														style={{ textAlign: "start" }}
													>
														<p
															style={{
																fontSize: "18px",
																fontWeight: "500",
															}}
														>
															Would you like to delete Content ?{" "}
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
														<button
															type="button"
															class="btn_no"
															data-dismiss="modal"
														>
															No
														</button>
													</div>
												</div>
											</div>
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

export default Content;
