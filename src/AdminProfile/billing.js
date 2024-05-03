import React from "react";
import Sidebar from "../Sidebar";
import { useState, useRef , useEffect} from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Billing = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [loading, setLoading] = useState(true);
	const mountedRef = useRef(true);

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

	const handleEdit = (id) => {
		console.log(`Editing row with id ${id}`);
	};

	const handleDelete = (id) => {
		console.log(`Deleting row with id ${id}`);
	};

	const columns = [
		{ field: "SNO", headerName: "S.NO", width: 60, align: "center" },
		{
			field: "BillDate",
			headerName: "BillDate",
			width: 120,
		},
		{
			field: "ThreeMonths",
			headerName: "ThreeMonths",
			width: 140,
		},
		{
			field: "SixMonths",
			headerName: "SixMonths",
			width: 140,
		},
		{
			field: "Speaking",
			headerName: "Speaking",
			width: 140,
		},
		{
			field: "Writing",
			headerName: "Writing",
			width: 140,
		},
		{
			field: "TotalUser",
			headerName: "TotalUser",
			width: 140,
		},
		{
			field: "TotalCost",
			headerName: "TotalCost",
			width: 140,
		},
		{
			field: "Action",
			headerName: "Action",
			width: 490,
			renderCell: (params) => (
				<div>
					<EditIcon
						style={{ cursor: "pointer", marginRight: "8px" }}
						onClick={() => handleEdit(params.row.id)}
						className="pencile"
					/>
					<DeleteIcon
						style={{ cursor: "pointer" }}
						onClick={() => handleDelete(params.row.id)}
						className="delete"
					/>
				</div>
			),
		},
	];

	const data = [
		{
			id: 1,
			SNO: "1",
			BillDate: "01-01-2024",
			ThreeMonths: "0",
			SixMonths: "0",
			Speaking: "Task",
			Writing: "Task",
			TotalUser: "20",
			TotalCost: "$0.00",
			Action: "",
		},
		{
			id: 2,
			SNO: "2",
			BillDate: "01-01-2024",
			ThreeMonths: "0",
			SixMonths: "0",
			Speaking: "Task",
			Writing: "Task",
			TotalUser: "20",
			TotalCost: "$0.00",
			Action: "",
		},
	];

	
	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000); // Simulating a 2-second loading delay
		return () => clearTimeout(timer);
	}, []);

	return (
		<div>
			<div className="container-fluid ">
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
						<div>
							<i
								className="fa-solid fa-bars bars  d-lg-block d-none"
								onClick={toggleSidebar}
							></i>
					
						<h3 className="text-center mb-3" style={{color:"#16c3ea"}}>Billing Details</h3>
						<div className="mt-4" style={{ height: "auto", width: "100%" }}>
							<DataGrid
								rows={data}
								columns={columns}
								initialState={{
									pagination: {
										paginationModel: { page: 0, pageSize: 5 },
									},
								}}
								pageSizeOptions={[5, 10]}
							/>
						</div>
					</div>
						)}
				</div>
				</div>
			</div>
		</div>
	);
};

export default Billing;
