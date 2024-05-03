import React from "react";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Sidebar from "../Sidebar";
import Cookies from "js-cookie";
import apiList from "../liberary/apiList";

const Learn = () => {
	const token = Cookies.get("token");
	const navigate = useNavigate();
	const [addblogslist, setAddblogslist] = useState([]);
	const [isNavVisible, setIsNavVisible] = useState(false);
	const [selectedOption, setSelectedOption] = useState("");
	const [error, setError] = useState(null);
	const [isOpen, setIsOpen] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredData, setFilteredData] = useState(addblogslist);
	const [itisLoading, setItisLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			await fetchblogs();
		};

		fetchData();

		if (token === undefined) {
			navigate("/");
		}
	}, [token]);

	useEffect(() => {
		handleSearch();
	}, [selectedOption, addblogslist]);

	const fetchblogs = async () => {
		const api = `${apiList.alllearningpathsDetails}`;
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

	const handleDelete = async (id) => {
		try {
			if (!id) {
				setError("Invalid ID provided for deletion.");
				return;
			}

			console.log("Deleting learning path with ID:", id);

			const response = await axios.delete(
				`${apiList.onselectedLearningPath}/${id}`
			);

			if (response.status === 200) {
				toast("Learn Path deleted successfully", {
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
			} else {
				console.log(response.data);
				alert("Error: " + response.data);
				setError("An error occurred while deleting the learning path.");
			}
		} catch (error) {
			console.error(error);
			setError("An error occurred while deleting the learning path.");
		}
	};

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
		menuBtnChange();
	};

	const menuBtnChange = () => {
		const sidebar = document.querySelector(".sidebar");

		if (sidebar) {
			const closeBtn = document.querySelector("#btn");
			const searchBtn = document.querySelector(".bx-search");

			if (sidebar.classList.contains("open")) {
				closeBtn?.classList.replace("bx-menu", "bx-menu-alt-right");
			} else {
				closeBtn?.classList.replace("bx-menu-alt-right", "bx-menu");
			}
		} else {
			console.error("Sidebar element not found");
		}
	};

	const handleSearch = () => {
		let filtered;
		if (selectedOption && selectedOption !== "0") {
			filtered = addblogslist.slice(0, parseInt(selectedOption, 10));
		} else {
			filtered = addblogslist;
		}

		if (searchTerm) {
			filtered = filtered.filter((blog) =>
				blog.learningPathTitle.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		setFilteredData(filtered);
	};

	const handleInputChange = (e) => {
		const term = e.target.value;
		setSearchTerm(term);

		let filtered;
		if (selectedOption && selectedOption !== "0") {
			filtered = addblogslist.slice(0, parseInt(selectedOption, 10));
		} else {
			filtered = addblogslist;
		}

		if (term) {
			filtered = filtered.filter((blog) =>
				blog.learningPathTitle.toLowerCase().includes(term.toLowerCase())
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
		{ field: "NAME", headerName: "Name", width: 150 },
		{ field: "TOPICS", headerName: "Topics", width: 130 },
		{ field: "LASTUPDATE", headerName: "Last Update", width: 150 },
		{
			field: "PUBLISH",
			headerName: "Publish",
			width: 180,
			renderCell: () => (
				<div class="form-check form-switch text-center">
					<input class="form-check-input" type="checkbox" role="switch" />
				</div>
			),
		},
		{ field: "SUBCRIPTION", headerName: "Subscription", width: 170 },
		{
			field: "ACTION",
			headerName: "Action",
			width: 592,
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
			{filteredData.length ? (
				<>
					<Link to={`/topic/${blog._id}`}>
						<i class="fa-solid fa-bullseye topic_btn "></i>
					</Link>
					<Link to={`/LearnPathAccess/${blog._id}`}>
						<i className="fa-regular fa-file file  "></i>
					</Link>
					<Link to={`/LearnUpdate/${blog._id}`}>
						<i className="fa-solid fa-pencil pencile"></i>
					</Link>
					<i
						className="fa-solid fa-trash delete "
						data-toggle="modal"
						data-target="#myModalDelete"
						onClick={() => idpassingfordelete(blog._id)}
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
				SUBJECTNAME: "",
				CHAPTERTAG: "",
				CHAPTERNAME: "",
				TOTALQUESTION: "",
				ACTION: "", // You may modify this based on your requirements
			},
		];
	} else {
		rows = filteredData.map((blog, index) => {
			const storedTime = new Date(blog.CurrentTime);
			const currentTime = new Date();
			const timeDifference = currentTime - storedTime;
			const hours = Math.floor(timeDifference / (1000 * 60 * 60));
			const minutes = Math.floor(
				(timeDifference % (1000 * 60 * 60)) / (1000 * 60)
			);

			let timeDisplay;
			if (minutes < 1) {
				timeDisplay = "Just now";
			} else if (minutes < 60) {
				timeDisplay = `${minutes} ${minutes === 1 ? "min" : "min"} ago`;
			} else {
				timeDisplay = `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
			}

			return {
				id: index + 1,
				SNO: index + 1,
				NAME: blog.learningPathTitle,
				TOPICS: blog.topics.length,
				LASTUPDATE: timeDisplay, // Use the formatted time difference here
				CurrentTime: blog.CurrentTime,
				SUBCRIPTION: blog.subscription,
				description: blog.Description,
				_id: blog._id,
				TOTALQUESTION: blog.chapter?.map(
					(each) =>
						each.MCQ.length + each.codingbasic.length + each.paragMCQ.length
				)[0],
				ACTION: renderActionButtons(blog),
			};
		});
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
								{/* Client */}
								<div className="">
									<div className="row">
										<div className="col-md-12 text-center">
											<h3 className="" style={{ color: "#16c3ea" }}>
												Learning Path
											</h3>
										</div>

										<div className="col-md-4 d-flex">
											<label className="mr-2 mt-1">Search: </label>
											<input
												type="text"
												className="form-control"
												value={searchTerm}
												placeholder="Search by name"
												onChange={handleInputChange}
											/>
										</div>
										<div className="col-md-4"></div>
										<div className="col-md-4 text-right">
											<div>
												<Link to="/learning">
													<button
														className="year"
														style={{
															fontWeight: "500",
															backgroundColor: "#16c3ea",
															color: "#000",
														}}
													>
														+ Add Learning Path
													</button>
												</Link>
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
									</div>{" "}
								</div>

								<div class="modal" id="myModalDelete">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<h4 class="modal-title">Delete LearningPath</h4>
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
													Would you like to delete LearningPath ?{" "}
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

export default Learn;
