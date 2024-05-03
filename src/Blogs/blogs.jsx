import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Audio } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import apiList from "../liberary/apiList";

function Blogs1() {
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
	const [selectedSubject, setSelectedSubject] = useState(null);
	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
	console.log(selectedSubject);
	const GotohandleViewClick = (data) => {
		setSelectedSubject(data);
		setUpdateModalOpen(true);
	};

	const [isToggled, setToggled] = useState(true);

	const handleToggle = () => {
		setToggled(!isToggled);
	};
	useEffect(() => {
		fetchblogs1();
	}, []);

	const [blogslist, setBlogslist] = useState([]);

	console.log(blogslist);

	const fetchblogs1 = async () => {
		const api = `${apiList.allBlogs}`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setBlogslist(response.data);
			setFilteredData(response.data);
			setWorksheetLoading(false);
		} catch (error) {
			console.error("Error fetch blogs:", error);
			setWorksheetLoading(false);
		}
	};
	const [worksheetLoading, setWorksheetLoading] = useState(true);

	const handleDelete = async (id) => {
		try {
			if (!id) {
				toast("Invalid ID provided for delete");
				return;
			}
			console.log("Deleting subject with ID", id);
			const response = await axios.delete(`${apiList.deleteblog}/${id}`);
			if (response.status === 200) {
				toast("Blog Delete Successfully", {
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
				toast("An error occured while deleting subject.");
			}
		} catch (error) {
			toast("An error occured while deleting the subject.");
		}
	};
	const [filteredData, setFilteredData] = useState([]);

	const handleInputChange = (e) => {
		const term = e.target.value;

		let filtered;
		filtered = blogslist;

		if (term) {
			filtered = filtered.filter((blog) =>
				blog.Title.toLowerCase().includes(term.toLowerCase())
			);
		}

		setFilteredData(filtered.length ? filtered : []);
	};
	const columns = [
		{ field: "SNO", headerName: "S.No", width: 170 },
		{ field: "TITLE", headerName: "Title", width: 250 },
		{ field: "AUTHOR", headerName: "Author", width: 250 },
		{ field: "TAGS", headerName: "Tags", width: 250 },
		{
			field: "ACTION",
			headerName: "Actions",
			width: 537,
			renderCell: (params) => renderActionButtons(params.row),
		},
	];

	const headerColumns = columns.map((col) => ({
		field: col.field,
		headerName: col.headerName,
		width: col.width,
		renderCell: col.renderCell,
	}));

	// const renderActionButtons = (blog) => (
	//     <div>
	//         <button
	//             type="button"
	//             className="btn btn-danger mx-1"
	//             data-bs-toggle="modal"
	//             data-bs-target="#myModalView"
	//             onClick={() => GotohandleViewClick(blog)}
	//         >
	//             <i
	//                 className="fas fa-pencil-alt"
	//                 onClick={() => setUpdateModalOpen(false)}
	//                 style={{ color: "white" }}
	//             ></i>
	//         </button>

	//         <button
	//             type="button"
	//             className="btn btn-dark mx-1"

	//         >
	//             <i className="fas fa-trash" style={{ color: "white" }}></i>
	//         </button>
	//     </div>
	// );
	const renderActionButtons = (blog) => (
		<div>
			{filteredData && filteredData.length <= 0 ? (<div></div>):(
			<>
			<Link to={`/blogsEdit/${blog._id}`}>
				<i className="fa-solid fa-pencil pencile"></i>
			</Link>
			<i
				className="fa-solid fa-trash delete mb-1"
				onClick={() => handleDelete(blog._id)}
			></i>
			</>
			)}
		</div>
	);
	let rows = [];
	if (filteredData && filteredData.length <= 0) {
		rows = [
		  {
			  id: 1,
			SNO: 'No Data',
		  },
		];
	  } else {
	rows = filteredData.map((blog, index) => ({
		id: index + 1, // Add this line to include a unique id for each row
		SNO: index + 1,
		TITLE: blog.Title,
		AUTHOR: blog.Author,
		TAGS: blog.Tags,
		_id: blog._id,
		ACTION: renderActionButtons(blog),
	}));
}

	return (
		<div>
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
								<div className=" ">
									<div className=" d-lg-block">
										<i
											className="fa-solid fa-bars bars d-lg-block d-none"
											onClick={toggleSidebar}
										></i>
										<div className="">
											<div class="row">
												<div className="col-md-12">
													<h3
														className="text-center"
														style={{ color: "#16c3ea" }}
													>
														Blogs
													</h3>
												</div>

												<div className="col-md-4 d-flex">
													<label className="mr-2 mt-1">Search: </label>
													<input
														type="text"
														className="form-control"
														//   value={searchQuery}
														placeholder="Search by Title"
														onChange={handleInputChange}
													/>
												</div>
												<div className="col-md-4"></div>
												<div className="col-md-4 text-left mb-3">
													<Link to="/Blogsadd">
														<button
															type="button"
															class="btn "
															className="float-right btn"
															style={{
																backgroundColor: "#16c3ea",
																color: "#000",
																fontWeight: "600",
															}}
														>
															+ Create Blogs
														</button>
													</Link>
												</div>
												<div className="col-md-4"></div>
												
											</div>

											<div style={{ height: "auto", width: "100%" }}>
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
												style={{
													display: isUpdateModalOpen ? "block" : "none",
												}}
											></div>
										</div>
										<></>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Blogs1;
