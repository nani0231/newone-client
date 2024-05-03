import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Table, Pagination } from "react-bootstrap";
import Sidebar from "../Sidebar";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import $ from "jquery
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

const PracticeAccess = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [itisLoading, setItisLoading] = useState(true);
	const mountedRef = useRef(true);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
		menuBtnChange();
	};

	let navigate = useNavigate();

	const GotoDetails = () => {
		navigate("/assementaccess");
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
	const columns = [
		{ field: "SNO", headerName: "S.No", width: 150 },
		{ field: "Institution", headerName: "Institution", width: 240 },
		{ field: "BatchYear", headerName: "BatchYear", width: 260 },
		{ field: "Batch", headerName: "Batch", width: 260 },
		{
			field: "ACCESS",
			headerName: "Access",
			width: 547,
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
      <i className="fa-solid fa-check check"></i>
												
		</div>
	);
const addblogslist=[
	{
		Institution:"Govt" ,
		BatchYear:"2022",
		Batch:"N-30"
	}
]
	const rows = addblogslist.map((blog, index) => ({
		id: index + 1, // Add this line to include a unique id for each row
		SNO: index + 1,
		Institution: blog.Institution,
		BatchYear: blog.BatchYear,
		Batch: blog.Batch,
		_id:blog._id,
		ACTION: renderActionButtons(blog),
	}));
	useEffect(() => {
		const timer = setTimeout(() => {
			setItisLoading(false);
		}, 1000); // Simulating a 2-second loading delay
		return () => clearTimeout(timer);
	}, []);

	return (
		<div>
			<ToastContainer />
			<div className="container-fluid">
				<div className="row">
					{isOpen && (
						<div className=" col-12 col-lg-3 col-md-12 sectioncard121">
							<Sidebar />
						</div>
					)}
					<div
						className={`my-3 col-12 col-md-${isOpen ? 12 : 10} col-lg-${
							isOpen ? 9 : 12
						}`}
					>
						
						<div>
							<i
								className="fa-solid fa-bars bars  d-lg-block d-none"
								onClick={toggleSidebar}
							></i>
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
						

						<div className=" ">
							<div class="">
								<div className="card-item p-4">
									<div className="col-md-12 text-center">
										<h4>Access</h4>										
									</div>
									<div className="mt-4" style={{ height: "auto", width: "100%" }}>
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
						</div>
						)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PracticeAccess;
