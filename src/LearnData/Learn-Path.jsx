import React from "react";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import sideimage from "../All Images/Logo133.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import siva from "../All Images/Siva Image.jpeg";
import Sidebar from "../Sidebar";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import apiList from "../liberary/apiList";
import Cookies from "js-cookie";

const LearnPath = () => {
	const token = Cookies.get("token");
	const navigate = useNavigate();
	const [addblogslist, setAddblogslist] = useState([]);
	const [addblogslist1, setAddblogslist1] = useState([]);
	const [isNavVisible, setIsNavVisible] = useState(false);
	const [showInstitutionsOptions, setShowInstitutionsOptions] = useState(false);
	const [institutetypeCounts, setInstitutetypeCounts] = useState({});
	const [searchQuery, setSearchQuery] = useState("");
	const [worksheetLoading, setWorksheetLoading] = useState(true);
	const [filteredData, setFilteredData] = useState(addblogslist);
	console.log(addblogslist);
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
		fetchblogs1();
		if (token == undefined) {
			navigate("/");
		}
	}, []);

	const fetchblogs1 = async () => {
		const api = `${apiList.DisplayAllVideos}`;
		const authToken =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk"; // Replace with your actual authentication token

		try {
			const response = await axios.get(api, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});

			const data = response.data;
			setAddblogslist1(data);
			setWorksheetLoading(false);
			const institutetypeCounts = {};
			data.forEach((item) => {
				const VideofolderName = item.VideofolderName;
				if (institutetypeCounts[VideofolderName]) {
					institutetypeCounts[VideofolderName] += 1;
				} else {
					institutetypeCounts[VideofolderName] = 1;
				}
			});

			setInstitutetypeCounts(institutetypeCounts);
		} catch (error) {
			console.error("Error fetching blogs:", error);
			setWorksheetLoading(false);
		}
	};

	console.log(institutetypeCounts);

	const fetchblogs = async () => {
		const api = `${apiList.allAddVideosData}`;
		const token = Cookies.get("token");
		try {
			const response = await axios.get(
				api
				// {
				//   headers: {
				//     token: token,
				//   },
				// },
			);
			setAddblogslist(response.data);
			setWorksheetLoading(false);
		} catch (error) {
			console.error("Error fetching blogs:", error);
			setWorksheetLoading(false);
		}
	};

	const handleSearch = () => {
		let filtered;

		filtered = addblogslist;

		if (searchQuery) {
			filtered = filtered.filter((folder) =>
				folder.VideofolderName.toLowerCase().includes(searchQuery.toLowerCase())
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

		let filtered;

		filtered = addblogslist;

		if (term) {
			filtered = filtered.filter((blog) =>
				blog.VideofolderName.toLowerCase().includes(term.toLowerCase())
			);
		}

		setFilteredData(filtered.length ? filtered : []);
	};
	const [VideofolderName, setVideofolderName] = useState("");

	const [data1, setdata1] = useState([]);

	const AddVideosDetails = {
		VideofolderName: VideofolderName,
	};
	console.log(AddVideosDetails);

	const onSubmitForm = (e) => {
		e.preventDefault();
		const token = Cookies.get("token");
		if (VideofolderName !== "") {
			const AddVideosDetails = {
				VideofolderName: VideofolderName,
			};
			console.log(AddVideosDetails);
			axios
				.post(
					`${apiList.AddVideoPath}`,
					AddVideosDetails
					// {
					//   headers: {
					//     token: token,
					//   },
					// },
				)

				.then((response) => {
					setdata1(response.data);
					console.log(response.data);
					if (response.status === 200) {
						toast("Video Folder Created Successfully", {
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
						setVideofolderName("");
						setTimeout(function () {}, 3000);
						fetchblogs();
					}
				})
				.catch((error) => {
					if (error.response && error.response.status === 400) {
						toast("Video path with the same name already exists", {
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
						setError("An error occured while creating FolderPath.");
					}
				});
		} else {
			toast.warning("Enter the Required Details");
		}
	};

	const onSubmitUpdatedForm = (e) => {
		e.preventDefault();
		const token = Cookies.get("token");
		const AddVideosDetails = {
			VideofolderName: selectedVideopath,
		};
		console.log(AddVideosDetails);
		const nonemptyuserData = Object.fromEntries(
			Object.entries(AddVideosDetails).filter(([key, value]) => value !== "")
		);
		axios
			.put(
				`${apiList.UpdateVideosDetails}/${selectedvideopathId}`,
				nonemptyuserData,
				{
					// headers: {
					//   token: token,
					// },
				}
			)
			.then((response) => {
				if (response.status === 200) {
					toast("VideoFolder Updated successfully", {
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
			})
			.catch((error) => {
				console.log(error.response.data);
				toast("Institute already Updated", {
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

	const GotohandleDeleteClick = async (id) => {
		const token = Cookies.get("token");
		try {
			console.log("Deleting institute with ID:", id);
			const response = await axios.delete(`${apiList.deleteVideo}/${id}`, {
				// headers: {
				//   token: token,
				// },
			});
			if (response.status === 200) {
				toast("Deleted Folder Successfully", {
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
	const [isInstitutionsOpen, setIsInstitutionsOpen] = useState(false);

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
	const [selectedVideopath, setSelectedVideopath] = useState(null);
	const [selectedvideopathId, setSelectedvideopathId] = useState(null);
	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

	const GotohandleEditClick = (blog) => {
		let Updatedfields = { Name: blog.VideofolderName, videofolderid: blog._id };
		delete blog["ACTION"];
		setSelectedVideopath(blog.Videofoldername);
		setSelectedvideopathId(blog._id);
		setUpdateModalOpen(true);
	};
	console.log(selectedVideopath);

	const [deleteid, setDeleteid] = useState("");

	const idpassingfordelete = (id) => {
		setDeleteid(id);
	};

	const columns = [
		{ field: "SNO", headerName: "S.No", width: 120 },
		{ field: "ID", headerName: "ID", width: 220 },
		{ field: "Videofoldername", headerName: "Folder Name", width: 280 },
		{ field: "Videos", headerName: "Videos", width: 260 },
		{
			field: "ACTION",
			headerName: "Actions",
			width: 577,

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
				onClick={() =>
					navigate("/VideoPage", { state: { videopathId: blog._id } })
				}
				class="fa-regular fa-eye "
				style={{
					backgroundColor: "#d6dadd",
					padding: "6px",
					borderRadius: "4px",
					marginRight: "5px",
					fontSize: "18px",
					cursor: "pointer",
					color: "#050505",
				}}
			></i>
			<i
				className="fa-solid fa-pencil pencile"
				data-bs-toggle="modal"
				data-bs-target="#myModalEdit"
				onClick={() => GotohandleEditClick(blog)}
			></i>

			<i
				className="fa-solid fa-trash delete "
				data-toggle="modal"
				data-target="#myModalDelete"
				onClick={() => idpassingfordelete(blog._id)}
			></i>
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
		rows = filteredData.map((blog, index) => ({
			id: index + 1, // Add this line to include a unique id for each row
			SNO: index + 1,
			ID: index + 1,
			Videofoldername: blog.VideofolderName,
			Videos: blog.videoFile?.length,
			ACTION: renderActionButtons(blog),
			_id: blog._id,
		}));
	}

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
						{worksheetLoading ? (
							<div
								colSpan="4"
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
						) : (
							<div className=" d-lg-block">
								<i
									className="fa-solid fa-bars bars d-lg-block d-none"
									onClick={toggleSidebar}
								></i>
								<div className="">
									<div className="row">
										<div className="col-md-12 text-center">
											<h3 style={{ color: "#16c3ea" }} className="">
												Video Details
											</h3>
										</div>

										<div className="col-md-4 d-flex">
											<label className="mr-2 mt-1">Search: </label>
											<input
												type="text"
												className="form-control"
												value={searchQuery}
												placeholder="Search by folder name"
												onChange={handleInputChange}
											/>
										</div>
										<div className="col-md-4"></div>

										<div className="col-md-4 text-end">
											<button
												type="button"
												data-bs-toggle="modal"
												data-bs-target="#myModal23"
												className="float-right btn"
												style={{
													backgroundColor: "#16c3ea",
													color: "#000",
													fontWeight: "500",
												}}
											>
												+ Add Folder
											</button>
										</div>
										<div className="modal" id="myModal23">
											<div class="modal-dialog ">
												<div class="modal-content">
													{/* <!-- Modal Header --> */}
													<div class="modal-header">
														<h4 class="modal-title">Add Video Folder</h4>
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

													{/* <!-- Modal body --> */}
													<div class="modal-body">
														<form action="" onSubmit={(e) => onSubmitForm(e)}>
															<div className="row">
																<div className="col-lg-12 col-md-12">
																	<div className="mb-1">
																		<label className="headingAdd">
																			Folder Name <sup className="star">*</sup>
																		</label>
																		<input
																			type="text"
																			className="form-control"
																			placeholder="Enter Head Name"
																			onChange={(e) =>
																				setVideofolderName(e.target.value)
																			}
																			value={VideofolderName}
																		/>
																	</div>
																</div>
															</div>
															<hr />
															<div class=" mt-3">
																<button
																	type="submit"
																	class="btn text-start"
																	style={{
																		backgroundColor: "#16c3ea",
																		color: "#000",
																	}}
																	data-bs-dismiss="modal1"
																>
																	Create
																</button>
															</div>
														</form>
													</div>

													{/* <!-- Modal footer --> */}
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
										id="myModalEdit"
										// style={{ display: isUpdateModalOpen ? "block" : "none" }}
									>
										<div class="modal-dialog">
											<div class="modal-content">
												<div class="modal-header">
													<h4 class="modal-title">Update VideoFolder</h4>
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
														<label style={{ float: "left", fontWeight: "600" }}>
															Folder Name<sup className="star">*</sup>
														</label>
														<input
															type="text"
															className="form-control"
															placeholder="Name"
															value={VideofolderName || selectedVideopath}
															onChange={(e) =>
																setSelectedVideopath(e.target.value)
															}
														/>
													</div>
												</div>
												<div class="modal-footer">
													<button
														type="button"
														class="btn btn-danger"
														onClick={(e) => onSubmitUpdatedForm(e)}
														style={{
															backgroundColor: "#16c3ea",
															color: "#000",
														}}
													>
														Submit
													</button>
												</div>
											</div>
										</div>
									</div>

									<div class="modal" id="myModalDelete">
										<div class="modal-dialog">
											<div class="modal-content">
												<div class="modal-header">
													<h4 class="modal-title">Delete Folder</h4>
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
														Would you like to delete Folder ?{" "}
													</p>
												</div>
												<div class="modal-footer d-flex justify-content-end">
													<button
														type="button"
														class="btn_yes "
														data-dismiss="modal"
														onClick={() => GotohandleDeleteClick(deleteid)}
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
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LearnPath;
