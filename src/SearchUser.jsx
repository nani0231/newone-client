import React from "react";
import { useState, useEffect, useMemo } from "react";
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

const SearchOption = () => {
	const token = Cookies.get("token");
	const navigate = useNavigate();

	const [addblogslist, setAddblogslist] = useState([]);

	const [searchTerm, setSearchTerm] = useState("");

	const [isNavVisible, setIsNavVisible] = useState(false);

	const [isFiltered, setIsFiltered] = useState(false);

	const [error, setError] = useState(null);
	const [itisLoading, setItisLoading] = useState(true);
	const [filteredRows, setFilteredRows] = useState([]);
	const handleLogout = () => {
		Cookies.remove("token");
		navigate("/");
	};

	const toggleNav = () => {
		setIsNavVisible(!isNavVisible);
	};
	useEffect(() => {
		fetchblogs();
		// InstituteDetails();
		if (token == undefined) {
			navigate("/");
		}
	}, []);
	const fetchblogs = async () => {
		const api = `${apiList.allAddInstitutes}`;
		try {
			const response = await axios.get(api, {});
			setAddblogslist(response.data);
			setItisLoading(false);
		} catch (error) {
			console.error("Error fetching blogs:", error);
		}
	};
	const [dataintable, setdataintable] = useState([]);

	const handleSearch = () => {
		const filteredData = originalRows.filter((row) =>
			row.FIRSTNAME.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredRows(filteredData);
		console.log(filteredData);
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

	const columns = [
		{ field: "SNO", headerName: "S.No", width: 50 },
		{ field: "FIRSTNAME", headerName: "First Name", width: 110 },
		{ field: "LASTNAME", headerName: "Last Name", width: 110 },
		{ field: "EMAIL", headerName: "Email", width: 170 },
		{ field: "MOBILE", headerName: "Mobile No", width: 120 },
		{ field: "REGO", headerName: "Reg", width: 100 },
		{ field: "BATCHYEAR", headerName: "Batch Year", width: 110 },
		{ field: "BATCH", headerName: "Batch", width: 130 },
		{ field: "INSTITUTENAME", headerName: "Institute Name", width: 160 },
		{
			field: "ACTION",
			headerName: "Action",
			width: 450,
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
			></i>
		</div>
	);
	console.log(addblogslist);
	const originalRows = useMemo(() => {
		var cnt = 0;
		return addblogslist.flatMap((blog) =>
			blog?.InstituteBatchYear?.flatMap((batchYear) =>
				batchYear?.InsituteBatch?.flatMap((batch) =>
					batch?.InstituteUsersList?.map((user) => ({
						id: ++cnt,
						SNO: cnt,
						FIRSTNAME: user?.FirstName,
						LASTNAME: user?.LastName,
						EMAIL: user?.userEmail,
						MOBILE: user?.userNumber,
						REGO: user?.Regdid,
						BATCHYEAR: batchYear?.BatchYear,
						BATCH: batch?.Batch,
						INSTITUTENAME: blog?.InstituteName,
						_id: user?._id,
						instituteId: blog._id,
						batchyearId: batchYear._id,
						batchId: batch._id,
						instituteName: blog.InstituteName,
						batchYear: batchYear.BatchYear,
						batch: batch.Batch,
						ACTION: renderActionButtons(blog),
					}))
				)
			)
		);
	}, [addblogslist]);

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
							<div className=" d-lg-block ">
								<i
									className="fa-solid fa-bars bars d-lg-block d-none"
									onClick={toggleSidebar}
								></i>
								<div class="">
									<div className="">
										<div className="row">
											<div className="col-md-12 text-center">
												<h3 className="" style={{ color: "#16c3ea" }}>
													Download Users
												</h3>
											</div>
											<div className="col-md-3">
												<input
													type="text"
													className="form-control"
													value={searchTerm}
													placeholder="Search by Users Name"
													onChange={(e) => setSearchTerm(e.target.value)}
												/>
											</div>
											<div className="col-md-1 ">
												<button
													className="btn btn-light "
													style={{ backgroundColor: "#16c3ea", color: "#000" }}
													onClick={handleSearch}
												>
													Search
												</button>
											</div>
											<div className="col-md-4 "></div>
											<div className="col-md-4 text-end">
												<button
													className="btn btn-light"
													style={{ backgroundColor: "#16c3ea", color: "#000" }}
												>
													Download
												</button>
											</div>

											{/* <div className="col-md-2 mt-2">
                    <p className="">Search Users:</p>
                      </div> */}
										</div>
										<div
											className="mt-4"
											style={{ height: "auto", width: "100%" }}
										>
											<DataGrid
												rows={
													filteredRows.length > 0 ? filteredRows : originalRows
												}
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

export default SearchOption;
