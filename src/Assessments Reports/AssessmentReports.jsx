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
import { NavLink } from "react-router-dom";

const Assementview = () => {
	useEffect(() => {
		fetchblogs1();
	}, []);
	const [Open, setOpen] = useState(true);
	const [blogslist, setBlogslist] = useState([]);
	let navigate = useNavigate("");
	const fetchblogs1 = async () => {
		const api = `${apiList.categories}`;
		try {
			const response = await axios.get(api, {});
			// const data = response.data;
			setBlogslist(response.data);
			setFilteredData(response.data);
			console.log(response.data);
			setWorksheetLoading(false);
		} catch (error) {
			console.error("Error fetch blogs:", error);
			setWorksheetLoading(false);
		}
	};
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState([]);
	const handleInputChange = (e) => {
		const term = e.target.value;
		
		let filtered;

		filtered = blogslist;

		if (term) {
			filtered = filtered.filter((blog) =>
				blog.name.toLowerCase().includes(term.toLowerCase())
			);
		}
		setFilteredData(filtered.length ? filtered : []);
	};
	const [worksheetLoading, setWorksheetLoading] = useState(true);
	console.log("data1");
	const [Error, setError] = useState("");

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

	const columns = [
		{ field: "SNO", headerName: "S.No", width: 150 },
		{ field: "CATEGORY", headerName: "Category", width: 270 },
		{ field: "ASSESSMENTNAME", headerName: "Assessment Name", width: 260 },
		// { field: "PASSWORD", headerName: "Password", width: 170 },
		// { field: "QUESTION", headerName: "Question", width: 170 },
		{ field: "Attempts", headerName: "Attempts", width: 233 },

		{
			field: "ACTION",
			headerName: "Actions",
			width: 543,
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
			{filteredData && filteredData.length <= 0 ? (<div></div>):(
			<NavLink to={`/assessmentView/${blog._id}/${blog.AssessmentId}`} style={{ color: "black" }}>
			<i
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
			</NavLink>
			)}
		</div>
	);
	var cnt = 0
	let rows = [];
	if (filteredData && filteredData.length <= 0) {
		rows = [
		  {
			  id: 1,
			SNO: 'No Data',
		  },
		];
	  } else {
	rows = filteredData.flatMap((blog) => {
		return (blog?.Assessment || []).map((each) => ({
			id: ++cnt,
			SNO: cnt,
			CATEGORY: blog.name,
			ASSESSMENTNAME: each.assessmentname, 
			PASSWORD: each.assessmentpassword,
			Attempts:"0",
			QUESTION: each.Questions ? each.Questions.length : 0,		
			_id: blog?._id,
			AssessmentId:each?._id,
			ACTION: renderActionButtons(blog),
		  }));
		});
	}
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
											<div className="col-md-12 text-center">
												<h3 className="my-3" style={{color:"#16c3ea"}}>Assessment Reports</h3>
											</div>
											<div className="col-md-4 float-left"></div>
											<div className="col-md-4"></div>
											
											<div className="col-md-4 d-flex">
											<label className="mr-2 mt-1">Search: </label>

												<input
													type="text"
													className="form-control"
													placeholder="Search by name"
													onChange={(e) => handleInputChange(e)}
												/>
											</div>
										</div>

										<div
											style={{ height: "auto", width: "100%", marginTop: "2%" }}
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
	);
};
export default Assementview;
