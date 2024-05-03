import React from "react";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import sideimage from "../All Images/Logo133.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import siva from "../All Images/Siva Image.jpeg";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import apiList from "../liberary/apiList";
import Cookies from "js-cookie";
import { Audio } from "react-loader-spinner";
import AWS, { config } from "aws-sdk";

import awsConfig from "../keys123/AWS";

AWS.config.update({
	accessKeyId: awsConfig.accessKeyId,
	secretAccessKey: awsConfig.secreteAccessKey,
	region: awsConfig.region,
});

const VideoPage = () => {
	const { state } = useLocation();
	const { VideofolderName } = useParams();
	const token = Cookies.get("token");
	const navigate = useNavigate();
	const [addblogslist, setAddblogslist] = useState([]);
	const [addblogslist1, setAddblogslist1] = useState([]);
	const [isNavVisible, setIsNavVisible] = useState(false);
	const [showInstitutionsOptions, setShowInstitutionsOptions] = useState(false);
	const [institutetypeCounts, setInstitutetypeCounts] = useState({});
	const [error, setError] = useState(null);
	const [addInstitutelist, setInstitutelist] = useState([]);
	const { videopathId } = state || {};
	const [videofileListUpdate, setVideofileListUpdate] = useState({});
	const [searchQuery, setSearchQuery] = useState("");
	const [worksheetLoading, setWorksheetLoading] = useState(true);
	const [selectedOption, setSelectedOption] = useState("");
	const [filteredData, setFilteredData] = useState(addblogslist);

	const handleEditInputChange = (value, name) => {
		console.log(value, name);
		setVideofileListUpdate({
			...videofileListUpdate,
			[name]: value,
		});
	};
	const handleLogout = () => {
		Cookies.remove("token");
		navigate("/");
	};

	const toggleNav = () => {
		setIsNavVisible(!isNavVisible);
	};
	useEffect(() => {
		// VideoFoldersDatas();
		fetchData();
		if (token == undefined) {
			navigate("/");
		}
	}, []);

	const fetchData = async () => {
		const token = Cookies.get("token");
		console.log(VideofolderName);
		try {
			const response = await axios.get(
				`${apiList.DisplayAllVideos}/${videopathId}`,
				{
					// headers: {
					//   token: token,
					// },
				}
			); // Replace with your API endpoint
			setAddblogslist(response.data?.allVideos?.videoFile);
			setVideoFoldername(response.data?.allVideos?.VideofolderName);
			setWorksheetLoading(false);
			// console.log(response.data)
		} catch (error) {
			console.error("Error fetching data:", error);
			setWorksheetLoading(false);
		}
	};
	const filteredVideos = addblogslist.filter((folder) => {
		const videotitleNameMatches = folder.VideoTitleName.toLowerCase().includes(
			searchQuery.toLowerCase()
		);
		return videotitleNameMatches;
	});
	const handleSearch = () => {
		let filtered;
		if (selectedOption && selectedOption !== "0") {
			filtered = addblogslist.slice(0, parseInt(selectedOption, 10));
		} else {
			filtered = addblogslist;
		}

		if (searchQuery) {
			filtered = filtered.filter((folder) =>
				folder.VideoTitleName.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		setFilteredData(filtered);
	};
	useEffect(() => {
		handleSearch();
	}, [selectedOption, addblogslist]);

	const handleInputChange = (e) => {
		const term = e.target.value;
		setSearchQuery(term);

		let filtered;
		if (selectedOption && selectedOption !== "0") {
			filtered = addblogslist.slice(0, parseInt(selectedOption, 10));
		} else {
			filtered = addblogslist;
		}

		if (term) {
			filtered = filtered.filter((blog) =>
				blog.VideoTitleName.toLowerCase().includes(term.toLowerCase())
			);
		}

		setFilteredData(filtered);
	};
	const [videoFoldername, setVideoFoldername] = useState("");
	const [VideoTitleName, setVideoTitleName] = useState("");
	const [SourceName, setSourceName] = useState("");
	const [Video1, setVideo1] = useState("");
	const [selectedVideo, setSelectedVideo] = useState("");
	const [selectedVideofile, setSelectedVideofile] = useState({});
	const [uploadedVideoUrl, setUploadedVideoUrl] = useState("");

	const [data1, setdata1] = useState([]);

	const AddVideosDetails = {
		VideofolderName: VideofolderName,
		VideoTitleName: VideoTitleName,
		SourceName: SourceName,
		Video1: uploadedVideoUrl,
		// Video1: Video1,
	};
	console.log(uploadedVideoUrl);
	console.log(AddVideosDetails);

	const s3 = new AWS.S3();

	const uploadVideoToS3 = async () => {
		if (Video1 && Video1.name) {
			const currentTimestamp = new Date().getTime();
			const fileExtension = Video1.name.split(".").pop();

			const params = {
				Bucket: awsConfig.bucket,
				Key: `AddVideofiles/${currentTimestamp}.${fileExtension}`,
				Body: Video1,
				ContentType: Video1.type,
			};

			try {
				console.log("Start uploading to S3:", params);

				const uploadResult = await s3.upload(params).promise();
				console.log("Uploaded to S3:", uploadResult);

				const videoUrl = `https://your-s3-bucket-url/${currentTimestamp}.${fileExtension}`;
				setUploadedVideoUrl(uploadResult.Location);
				console.log("Video URL:", videoUrl);
				console.log("Video uploaded successfully:", videoUrl);
			} catch (error) {
				console.error(
					"Error uploading video to S3:",
					error.message,
					error.stack
				);
			} finally {
				const videoInput = document.getElementById("videoInput");
				if (videoInput) {
					videoInput.value = "";
				}
			}
		}
	};

	useEffect(() => {
		uploadVideoToS3();
	}, [Video1]);

	console.log("Video1 state after upload:", Video1);
	console.log("Uploaded to S3:", uploadedVideoUrl);

	const onSubmitForm = (e) => {
		console.log(Video1, "youtube url");
		console.log(uploadedVideoUrl, "aws url");

		e.preventDefault();
		const token = Cookies.get("token");

		if (VideoTitleName !== "") {
			let youtubeUrl = Video1;

			// if (SourceName === "Youtube") {
			//   // Handle YouTube source
			//   videoUrl = Video1; // Assuming Video1 contains YouTube URL
			// } else if (SourceName === "UploadVideo") {
			//   // Handle Update source
			//   videoUrl = uploadedVideoUrl; // Assuming uploadedVideoUrl is the updated video URL
			// } else {
			//   // Handle other sources if needed
			//   videoUrl = Video1;
			// }
			console.log(youtubeUrl);

			const AddVideosDetails = {
				VideoTitleName: VideoTitleName,
				SourceName: SourceName,
				Video1: SourceName === " Youtube" ? youtubeUrl : uploadedVideoUrl,
			};

			console.log(AddVideosDetails, "final object");

			axios
				.post(`${apiList.AddVideoFilesData}/${videopathId}`, AddVideosDetails)
				.then((response) => {
					setdata1(response.data);
					console.log(response.data);
					if (response.status === 200) {
						toast("Video File Created Successfully", {
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
						setVideoTitleName("");
						setVideo1("");
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
					}
				});
		} else {
			toast.warning("Enter the Required Details");
		}
	};

	console.log(data1);

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
	const [sourceopen, setSourceopen] = useState(false);
	const OpenSourceCode = () => {
		setSourceopen(!sourceopen);
	};
	const handleCloseSourceModal = () => {
		setSourceopen(false);
	};
	const [isInstitutionsOpen1, setIsInstitutionsOpen1] = useState(true);

	const toggleInstitutions1 = () => {
		setIsInstitutionsOpen1(!isInstitutionsOpen1);
	};
	const [isInstitutionsOpen2, setIsInstitutionsOpen2] = useState(true);

	const toggleInstitutions2 = () => {
		setIsInstitutionsOpen2(!isInstitutionsOpen2);
	};
	const GotohandleDeleteClick = async (id) => {
		const token = Cookies.get("token");
		try {
			console.log("Deleting institute with ID:", id);
			const response = await axios.delete(
				`${apiList.deleteVideofiles}/${videopathId}/${id}`,
				{
					// headers: {
					//   token: token,
					// },
				}
			);
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
				fetchData();

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
	const onSubmitUpdatedForm = (id, e) => {
		e.preventDefault();
		const token = Cookies.get("token");
		console.log(videofileListUpdate);
		axios
			.put(
				`${apiList.UpdateVideofileDetails}/${videopathId}/${id}`,
				videofileListUpdate,
				{
					// headers: {
					//   token: token,
					// },
				}
			)
			.then((response) => {
				if (response.status === 200) {
					toast("VideoFile Updated successfully", {
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
				console.log(error.response.data);
				toast.error("Institute already Updated");
			});
	};
	const GotohandleEditClick = (data) => {
		delete data["ACTION"];
		let Updatedfields = {
			VideoTitle: data.VideoTitle,
			videofile: data.videofile,
			videofileId: data._id,
		};
		setSelectedVideofile(Updatedfields);
		setVideofileListUpdate(Updatedfields);
	};
	console.log(selectedVideofile);

	const GotohandleViewClick = (data) => {
		setSelectedVideo(data.videofile);
	};

	const [deleteid, setDeleteid] = useState("");

	const idpassingfordelete = (id) => {
		setDeleteid(id);
	};
	const columns = [
		{ field: "SNO", headerName: "S.No", width: 120 },
		{ field: "Videofoldername", headerName: "Folder Name", width: 250 },
		{ field: "VideoTitle", headerName: "Video Title", width: 300 },

		{ field: "SOURCE", headerName: "Source", width: 250 },
		{
			field: "ACTION",
			headerName: "Actions",
			width: 200,
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
				class="fa-solid fa-play content_btn1"
				data-bs-toggle="modal"
				data-bs-target="#myModalView"
				onClick={() => GotohandleViewClick(blog)}
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
	console.log(addblogslist);
	let rows = [];
	if (filteredData && filteredData.length === 0) {
		rows = [
			{
				id: 1,
				SNO: "",
				Videofoldername: "No Videos Found",
				VideoTitle: "",
				SOURCE: "",
				ACTION: "",
				// You may modify this based on your requirements
			},
		];
	} else {
		rows = filteredData.map((blog, index) => ({
			id: index + 1, // Add this line to include a unique id for each row
			SNO: index + 1,
			Videofoldername: videoFoldername,
			VideoTitle: blog.VideoTitleName,
			SOURCE: blog.SourceName,
			ACTION: renderActionButtons(blog),
			_id: blog._id,
			videofile: blog.Video1,
		}));
	}
	const [isModalOpen, setIsModalOpen] = useState(true);
	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedVideo("");
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			console.log("Selected File:", file);
			setVideo1(file);
		} else {
			console.error("No file selected");
		}
	};
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
									className="fa-solid fa-bars bars  d-lg-block d-none"
									onClick={toggleSidebar}
								></i>

								<div className="">
									<div className="row">
										<div className="col-md-12 text-center">
											<h3 className="" style={{ color: "#16c3ea" }}>
												Add Video
											</h3>
										</div>

										<div className="col-md-4 d-flex">
											<label className="mr-2 mt-1">Search: </label>
											<input
												type="text"
												className="form-control"
												value={searchQuery}
												placeholder="Search by video title"
												onChange={handleInputChange}
											/>
										</div>
										<div className="col-md-6"></div>
										<div className="col-md-2 text-center">
											<button
												type="button"
												className="year"
												style={{
													backgroundColor: "#16c3ea",
													color: "#000",
													fontWeight: "500",
												}}
											>
												+ Add Video
											</button>{" "}
											<div className="content-options text-start">
												<p
													className="p-0 my-1"
													type="button"
													data-bs-toggle="modal"
													data-bs-target="#myModalUpload"
													onClick={(e) => {
														setSourceName(e.target.textContent);
														console.log(e.target.textContent);
													}}
												>
													<i class="fa-solid fa-video"></i> UploadVideo
												</p>
												<p
													className="p-0 my-1"
													type="button"
													data-bs-toggle="modal"
													data-bs-target="#myModal23"
													onClick={(e) => {
														setSourceName(e.target.textContent);
														handleCloseSourceModal(e); // Use textContent instead of value
														console.log(e.target.textContent); // Print to console
													}}
													style={{ color: "#ff0000" }}
												>
													<i class="fa-brands fa-youtube"></i> Youtube
												</p>
												<p
													className="p-0 my-1"
													type="button"
													data-bs-toggle="modal"
													data-bs-target="#myModal23"
													onClick={(e) => {
														setSourceName(e.target.textContent); // Use textContent instead of value
														console.log(e.target.textContent); // Print to console
													}}
													style={{ color: "#101010" }}
												>
													<i class="fa-solid fa-video"></i> Vimeo
												</p>
											</div>
											<div class="modal" id="myModal23">
												<div class="modal-dialog ">
													<div class="modal-content">
														{/* <!-- Modal Header --> */}
														<div class="modal-header">
															<h4 class="modal-title">Add Vieo Folder</h4>
															<button
																type="button"
																class="btn-close"
																data-bs-dismiss="modal"
																// onClick={OpenSourceCode}
																onClick={handleCloseSourceModal}
															></button>
														</div>

														{/* <!-- Modal body --> */}
														<div class="modal-body">
															<form action="" onSubmit={(e) => onSubmitForm(e)}>
																<div className="col-12 col-md-12">
																	<label
																		className="headingAdd"
																		style={{ float: "left" }}
																	>
																		Video Title :
																	</label>
																	<input
																		type="text"
																		className="form-control"
																		placeholder="Enter Folder Name"
																		onChange={(e) =>
																			setVideoTitleName(e.target.value)
																		}
																		value={VideoTitleName}
																	/>
																</div>
																<div className="col-12 col-md-12">
																	<label
																		className="headingAdd float-left"
																		style={{ float: "left" }}
																	>
																		Video Link:
																	</label>
																	<input
																		type="text"
																		className="form-control"
																		placeholder="Enter Video Link"
																		onChange={(e) => setVideo1(e.target.value)}
																		value={Video1}
																	/>
																</div>
																<hr />
																<div class=" mt-3">
																	<button
																		type="submit"
																		class="btn text-start"
																		style={{
																			backgroundColor: "#a5059d",
																			color: "white",
																		}}
																		data-bs-dismiss="modal1"
																		onClick={handleCloseSourceModal}
																	>
																		Add Video
																	</button>
																</div>
															</form>
														</div>

														{/* <!-- Modal footer --> */}
													</div>
												</div>
											</div>
											<div class="modal" id="myModalUpload">
												<div class="modal-dialog ">
													<div class="modal-content">
														{/* <!-- Modal Header --> */}
														<div class="modal-header">
															<h4 class="modal-title">Add Video Folder</h4>
															<button
																type="button"
																class="btn-close"
																data-bs-dismiss="modal"
																// onClick={OpenSourceCode}
																onClick={handleCloseSourceModal}
															></button>
														</div>

														{/* <!-- Modal body --> */}
														<div class="modal-body">
															<form action="" onSubmit={(e) => onSubmitForm(e)}>
																<div className="col-12 col-md-12">
																	<label
																		className="headingAdd"
																		style={{ float: "left" }}
																	>
																		Video Title :
																	</label>
																	<input
																		type="text"
																		className="form-control"
																		placeholder="Enter Folder Name"
																		onChange={(e) =>
																			setVideoTitleName(e.target.value)
																		}
																		value={VideoTitleName}
																	/>
																</div>
																<div className="col-12 col-md-12">
																	<label
																		className="headingAdd float-left"
																		style={{ float: "left" }}
																	>
																		Video Link1234:
																	</label>
																	<input
																		id="videoInput"
																		type="file"
																		className="form-control"
																		accept="video/*" // Limit file selection to video files
																		onChange={handleFileChange}
																	/>
																</div>
																{/* {uploadedVideoUrl && (
                                  <video width="320" height="240" controls>
                                    <source
                                      src={uploadedVideoUrl}
                                      type={Video1.type}
                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                )} */}
																<hr />
																<div class=" mt-3">
																	<button
																		type="submit"
																		class="btn text-start"
																		style={{
																			backgroundColor: "#a5059d",
																			color: "white",
																		}}
																		data-bs-dismiss="modal1"
																		onClick={handleCloseSourceModal}
																	>
																		Add Video
																	</button>
																</div>
															</form>
														</div>

														{/* <!-- Modal footer --> */}
													</div>
												</div>
											</div>
											<div class="modal" id="myModalEdit">
												<div class="modal-dialog ">
													<div class="modal-content">
														{/* <!-- Modal Header --> */}
														<div class="modal-header">
															<h4 class="modal-title">Update Video File</h4>
															<button
																type="button"
																class="btn-close"
																data-bs-dismiss="modal"
															></button>
														</div>

														{/* <!-- Modal body --> */}
														<div class="modal-body">
															<form
																action=""
																onSubmit={(e) =>
																	onSubmitUpdatedForm(
																		selectedVideofile?.videofileId,
																		e
																	)
																}
															>
																<div className="col-12 col-md-12">
																	<label
																		className="headingAdd"
																		style={{ float: "left" }}
																	>
																		Video Title :
																	</label>
																	<input
																		type="text"
																		className="form-control"
																		name="VideoTitle"
																		placeholder="Enter Folder Name"
																		onChange={(e) =>
																			handleEditInputChange(
																				e.target.value,
																				"VideoTitle"
																			)
																		}
																		value={
																			videofileListUpdate?.VideoTitle || ""
																		}
																	/>
																</div>
																<div className="col-12 col-md-12">
																	<label
																		className="headingAdd float-left"
																		style={{ float: "left" }}
																	>
																		Video Link:
																	</label>
																	<input
																		type="text"
																		name="videofile"
																		className="form-control"
																		placeholder="Enter Video Link"
																		onChange={(e) =>
																			handleEditInputChange(
																				e.target.value,
																				"videofile"
																			)
																		}
																		value={videofileListUpdate?.videofile || ""}
																	/>
																</div>
																<hr />
																<div class=" mt-3">
																	<button
																		type="submit"
																		class="btn text-start"
																		style={{
																			backgroundColor: "#a5059d",
																			color: "white",
																		}}
																		data-bs-dismiss="modal1"
																	>
																		Update Video
																	</button>
																</div>
															</form>
														</div>

														{/* <!-- Modal footer --> */}
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
									<div class="modal" id="myModalView">
										<div class="modal-dialog modal-lg">
											<div class="modal-content">
												<div class="modal-header">
													<button
														type="button"
														class="btn-close"
														data-bs-dismiss="modal"
														onClick={handleCloseModal}
													></button>
												</div>
												{selectedVideo ? (
													<ReactPlayer
														url={selectedVideo}
														playing={isModalOpen}
														controls
														width="100%"
														height="500px"
													/>
												) : (
													<div className="m-5 text-center">
														<h4>No videos Found</h4>
													</div>
												)}
											</div>
										</div>
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
												<div class="modal-body" style={{ textAlign: "start" }}>
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

export default VideoPage;
