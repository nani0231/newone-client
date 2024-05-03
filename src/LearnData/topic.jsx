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

const Topic = () => {
	const { id } = useParams();
	const token = Cookies.get("token");
	const navigate = useNavigate();
	const [individualInstitute, setIndividualInstitute] = useState([]);
	const [individualInstituteHead, setIndividualInstituteHead] = useState([]);
	const [itisLoading, setItisLoading] = useState(true);
	const [isNavVisible, setIsNavVisible] = useState(false);

	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchData();
		if (token == undefined) {
			navigate("/");
		}
		set_id(id);
		setTopicTime(new Date().toLocaleString());
	}, [id]);

	const fetchData = async () => {
		console.log(id);
		try {
			const response = await axios.get(`${apiList.getTopic}/${id}`);
			setIndividualInstitute(response.data.topics);
			setFilteredData(response.data.topics);
			setIndividualInstituteHead(response.data);
			setLoading(false);
			setItisLoading(false);
		} catch (error) {
			console.error("Error fetching data:", error);
			setLoading(false);
		}
	};
	console.log(individualInstitute);
	//Add Institute

	const [topicName, settopicName] = useState("");
	const [description, setdescription] = useState("");
	const [publish, setpublish] = useState("");
	const [TopicTime, setTopicTime] = useState("");
	const [_id, set_id] = useState("");
	const [filteredData, setFilteredData] = useState([]);

	const [data1, setdata1] = useState([]);
	if (!TopicTime) {
		setTopicTime(new Date().toLocaleString());
	}

	const AddTopicDetails = {
		topicName: topicName,
		description: description,
		publish: publish,
		TopicTime: TopicTime,
		_id: _id,
	};
	console.log(AddTopicDetails);

	const onSubmitForm = (e) => {
		e.preventDefault();
		if (topicName && description && publish && TopicTime && _id !== "") {
			const headers = {
				token:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk", // Replace with your actual token
			};

			const AddTopicsDetails = {
				topicName: topicName,
				description: description,
				publish: publish,
				TopicTime: TopicTime,
				_id: _id,
			};

			axios
				.post(`${apiList.addTopic}/${id}`, AddTopicsDetails, {
					headers,
				})
				.then((response) => {
					setdata1(response.data);

					console.log(response.data);
					if (response.status === 200) {
						toast("Topic Add  Successfully", {
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
					}
				})

				.catch((error) => {
					if (error.response && error.response.status === 400) {
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
					} else {
						console.log(error.message);
					}
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

	// const handleDelete = async (id) => {
	//   try {
	//     if (!id) {
	//       setError("Invalid ID provided for deletion.");
	//       return;
	//     }

	//     console.log("Deleting learning path with ID:", id);

	//     const response = await axios.delete(
	//       ``
	//     );

	//     if (response.status === 200) {
	//       toast.success("Learn Path deleted successfully", {
	//         position: "top-right",
	//         autoClose: 1000,
	//         hideProgressBar: false,
	//         closeOnClick: true,
	//         pauseOnHover: true,
	//         draggable: true,
	//         progress: undefined,
	//         theme: "colored",
	//       });

	//       fetchData();
	//     } else {
	//       console.log(response.data);
	//       alert("Error: " + response.data);
	//       setError("An error occurred while deleting the learning path.");
	//     }
	//   } catch (error) {
	//     console.error(error);
	//     setError("An error occurred while deleting the learning path.");
	//   }
	// };
	const handleDelete = async (topicId) => {
		try {
			if (!topicId) {
				setError("Invalid ID provided for deletion.");
				return;
			}

			console.log("Deleting topic with ID:", topicId);

			const response = await axios.delete(
				`${apiList.onselectedTopicinLearningPath}/${id}/${topicId}`
			);

			if (response.status === 200) {
				toast("Topic deleted successfully", {
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

				fetchData(); // Assuming fetchData() is a function to update your UI or fetch data again
			} else {
				console.log(response.data);
				alert("Error: " + response.data);
				setError("An error occurred while deleting the topic.");
			}
		} catch (error) {
			console.error(error);
			setError("An error occurred while deleting the topic.");
			toast("An error occurred while deleting the topic.", {
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
	const handleInputChange = (e) => {
		const term = e.target.value;
		let filtered;

		filtered = individualInstitute;

		if (term) {
			filtered = filtered.filter((blog) =>
				blog.topicName.toLowerCase().includes(term.toLowerCase())
			);
		}

		setFilteredData(filtered.length ? filtered : []);
	};

	const [deleteid, setDeleteid] = useState("");

	const idpassingfordelete = (id) => {
		setDeleteid(id);
	};
	const columns = [
		{ field: "SNO", headerName: "S.No", width: 90 },
		{ field: "TOPICS", headerName: "Topics", width: 280 },
		{ field: "LASTUPDATE", headerName: "LastUpdate", width: 280 },
		{
			field: "PUBLISH",
			headerName: "Publish",
			width: 250,
			renderCell: () => (
				<div class="form-check form-switch text-center">
					<input class="form-check-input" type="checkbox" role="switch" />
				</div>
			),
		},
		{
			field: "ACTION",
			headerName: "Action",
			width: 557,
			renderCell: (params) => renderActionButtons(params.row),
		},
	];

	const headerColumns = columns.map((col) => ({
		field: col.field,
		headerName: col.headerName,
		width: col.width,
		renderCell: col.renderCell,
	}));

	const renderActionButtons = (topic) => (
		<div>
			{filteredData.length ? (
				<>
					<Link to={`/Content/${_id}/${topic._id}/${_id}`}>
						<i class="fa-solid fa-clipboard-check  content_btn1"></i>
					</Link>
					<Link to={`/TopicUpdate/${_id}/${topic._id}`}>
						<i className="fa-solid fa-pencil pencile"></i>
					</Link>

					<i
						class="fa-solid fa-trash delete"
						data-toggle="modal"
						data-target="#myModalDelete"
						onClick={() => idpassingfordelete(topic._id)}
					></i>
				</>
			) : (
				<div></div>
			)}
		</div>
	);

	console.log(filteredData);
	let rows = [];
	if (filteredData && filteredData.length <= 0) {
		rows = [
			{
				id: 1,
				SNO: "No Data",
			},
		];
	} else {
		rows = filteredData.map((topic, index) => {
			const storedTime = new Date(topic.TopicTime);

			// Calculate the time difference in milliseconds
			const timeDifference = new Date() - storedTime;

			// Convert milliseconds to minutes and hours
			const minutes = Math.floor(timeDifference / (1000 * 60));
			const hours = Math.floor(minutes / 60);

			// Display different messages based on time difference
			let timeDisplay;
			if (minutes < 1) {
				timeDisplay = "Just now";
			} else if (minutes < 60) {
				timeDisplay = `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
			} else {
				timeDisplay = `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
			}
			return {
				id: index + 1,
				SNO: index + 1,
				TOPICS: topic.topicName,
				_id: topic._id,
				LASTUPDATE: timeDisplay,
				PUBLISH: (
					<i
						className="fa-solid fa-toggle-on"
						style={{
							fontSize: "25px",
							color: "green",
						}}
					></i>
				),
				ACTION: renderActionButtons(topic),
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
							<div className="">
								<i
									className="fa-solid fa-bars bars  d-lg-block d-none"
									onClick={toggleSidebar}
								></i>
								<div class="">
									<div className="row">
										<div className="col-md-12 text-center">
											{loading ? (
												<p>Loading...</p>
											) : individualInstitute ? (
												<h3 style={{ color: "#16c3ea" }}>
													Topic :{individualInstituteHead.learningPathTitle}
												</h3>
											) : (
												<p>Data not found</p>
											)}
										</div>

										<div className="col-md-4 d-flex">
											<label className="mr-2 mt-1">Search: </label>
											<input
												type="text"
												className="form-control"
												//   value={searchQuery}
												placeholder="Search by Topic"
												onChange={handleInputChange}
											/>
										</div>
										<div className="col-md-4"></div>
										<div className="col-md-4 text-right">
											<button
												type="button"
												class="year"
												data-bs-toggle="modal"
												data-bs-target="#myModal"
												style={{ backgroundColor: "#16c3ea", color: "#000" }}
											>
												+ Add Topic
											</button>
										</div>

										<div class="modal" id="myModal">
											<div class="modal-dialog modal-sm">
												<div class="modal-content">
													<div class="modal-header ">
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
													<h4 class="modal-title text-center">Add Topic</h4>

													<form action="">
														<div class="modal-body">
															<div className="row">
																<div
																	className="col-lg-12"
																	style={{
																		textAlign: "start",
																		fontWeight: "600",
																	}}
																>
																	<label className="text-center">
																		Topic Name <sup className="star">*</sup>
																	</label>
																	<input
																		type="text"
																		className="form-control"
																		style={{
																			border: "1px solid #dee2e6",
																		}}
																		onChange={(e) =>
																			settopicName(e.target.value)
																		}
																		value={topicName}
																	/>
																</div>
																<div
																	className="col-lg-12"
																	style={{
																		textAlign: "start",
																		fontWeight: "600",
																	}}
																>
																	<label className="my-2">
																		Description <sup className="star">*</sup>
																	</label>

																	<textarea
																		className="form-control"
																		rows={5}
																		onChange={(e) =>
																			setdescription(e.target.value)
																		}
																		value={description}
																	></textarea>
																</div>
																<div
																	className="col-lg-12"
																	style={{
																		textAlign: "start",
																		fontWeight: "600",
																	}}
																>
																	<div>
																		<p className="mt-3">
																			Publish <sup className="star">*</sup>
																		</p>
																		<select
																			className="p-1 form-control"
																			onChange={(e) =>
																				setpublish(e.target.value)
																			}
																		>
																			<option value="" hidden>
																				Select Publish
																			</option>
																			<option value="Yes">Yes</option>
																			<option value="No">No</option>
																		</select>
																	</div>
																</div>
															</div>
														</div>

														<div class="modal-footer mt-4">
															<button
																type="button"
																class="btn"
																style={{
																	backgroundColor: "#16c3ea",
																	color: "#000",
																}}
																onClick={onSubmitForm}
																data-bs-dismiss="modal"
															>
																Add Topics
															</button>
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
								</div>

								<div class="modal" id="myModalDelete">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<h4 class="modal-title">Delete Topic</h4>
												<button
													type="button"
													class="close"
													data-dismiss="modal"
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
													Would you like to delete Topic ?{" "}
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
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Topic;
