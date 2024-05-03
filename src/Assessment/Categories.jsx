import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Sidebar from "../Sidebar";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import apiList from "../liberary/apiList";

const Categories = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [itisLoading, setItisLoading] = useState(true);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const [isOpen, setIsOpen] = useState(true);
	const mountedRef = useRef(true);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
		menuBtnChange();
	};

	let navigate = useNavigate();

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

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		axios
			.get(`${apiList.categories}`)
			.then((response) => {
				console.log("Response Status:", response.status);
				console.log("Response Data:", response.data);

				if (response && response.data) {
					setCategories(response.data);
					setItisLoading(false);
				} else {
					console.error("Invalid response or data:", response);
				}
			})
			.catch((error) => {
				console.error("Error fetching categories:", error.response.data);
			});
	};

	const columns = [
		{ field: "SNO", headerName: "S.No", width: 230 },
		{ field: "NAME", headerName: "Name", width: 350 },
		{ field: "ASSESSMENT", headerName: "Assessment", width: 350 },
		{
			field: "ACTION",
			headerName: "Action",
			width: 527,
			renderCell: (params) => renderActionButtons(params.row),
		},
	];

	const headerColumns = columns.map((col) => ({
		field: col.field,
		headerName: col.headerName,
		width: col.width,
		renderCell: col.renderCell,
	}));

	const renderActionButtons = (category) => (
		<div>
			<button
				className=" btn-dark"
				style={{
					borderRadius: "4px",
					padding: "5px",
					marginRight: "5px",
					border: "none",
				}}
				onClick={() =>
					navigate(`/Assessmentaccess`, {
						state: { CategoryTitle: category.NAME, CategoryId: category._id },
					})
				}
			>
				Access
			</button>
		</div>
	);
	var cnt = 0;
	const rows = categories.map((category, index) => ({
		id: ++cnt,
		SNO: cnt,
		NAME: category.name,
		ASSESSMENT: category.Assessment.length,
		_id: category._id,
		ACTION: renderActionButtons(category),
	}));

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
						className={`my-3 col-12 col-md-${isOpen ? 12 : 10} col-lg-${
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
							<div>
								<i
									className="fa-solid fa-bars bars  d-lg-block d-none"
									onClick={toggleSidebar}
								></i>

								<div className="">
									<div class="row mb-3">
										<div className="col-md-12 text-center">
											<h3 className="" style={{color:"#16c3ea"}}>Access</h3>
										</div>

										<div className="col-md-4"></div>
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
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Categories;
