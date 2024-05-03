import React from "react";
import Sidebar from "../Sidebar";
import { useState, useRef, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const Invoices = () => {
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

	const handleDownload = (id) => {
		console.log(`Downloading invoice with ID: ${id}`);
	};

	const invoiceDetails = [
		// { id: 1, item: "Item 1", quantity: 2, price: 20 },
		// { id: 2, item: "Item 2", quantity: 1, price: 30 },
		// Add more invoice details as needed
	];

	const columns = [
		// { field: "id", headerName: "ID", width: 100 },
		// { field: "item", headerName: "Item", width: 230 },
		// { field: "quantity", headerName: "Quantity", width: 250 },
		// { field: "price", headerName: "Price", width: 250 },
		// {
		// 	field: "download",
		// 	headerName: "Download",
		// 	width: 120,
		// 	renderCell: (params) => (
		// 		<button onClick={() => handleDownload(params.row.id)}>Download</button>
		// 	),
		// },
	];

	const rows = invoiceDetails.map((invoice) => ({
		// id: invoice.id,
		// item: invoice.item,
		// quantity: invoice.quantity,
		// price: invoice.price,
		// download: "",
	}));

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
						<div>
							<i
								className="fa-solid fa-bars bars  d-lg-block d-none"
								onClick={toggleSidebar}
							></i>
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
									<h3 className="text-center my-4" style={{color:"#16c3ea"}}>Invoices</h3>
									{invoiceDetails.length > 0 ? (
										<DataGrid
											rows={rows}
											columns={columns}
											pageSize={5}
											autoHeight
										/>
									) : (
										<div className="text-center">No Invoices Found</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Invoices;
