import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { GoClock } from "react-icons/go";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Audio } from "react-loader-spinner";
import apiList from "../liberary/apiList";
import axios from "axios";
import "./Assessment.css";
function Assessment() {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
		menuBtnChange();
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
					setIsLoading(false);
				} else {
					console.error("Invalid response or data:", response);
				}
			})
			.catch((error) => {
				console.error("Error fetching categories:", error.response.data);
			});
	};

	const menuBtnChange = () => {
		const sidebar = document.querySelector(".sidebar");
		const closeBtn = document.querySelector("#btn");

		if (sidebar?.classList.contains("open")) {
			closeBtn?.classList.replace("bx-menu", "bx-menu-alt-right");
		} else {
			closeBtn?.classList.replace("bx-menu-alt-right", "bx-menu");
		}
	};

	const columns = [
		{ field: "SNO", headerName: "S.NO", width: 159 },
		{ field: "Catagories", headerName: "Catagories", width: 280 },
		{ field: "Assessment", headerName: "Assessment", width: 280 },
		{ field: "Attempts", headerName: "Attempts", width: 240 },
		{
			field: "Action",
			headerName: "Action",
			width: 503,
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
			<span
				className="material-symbols-outlined mx-1"
				style={{
					backgroundColor: "#981a96",
					padding: "3px",
					borderRadius: "5px",
					color: "#fff",
					cursor: "pointer",
				}}
				onClick={() =>
					navigate(`/View`, {
						state: {
							CategoryTitle: category.Catagories,
							CategoryId: category._id,
							AssessmentId:category.AssessmentId,
						},
					})
				}
			>
				timer
			</span>
		</div>
	);

	// const rows = categories.map((category, index) => ({
	//   id: index + 1,
	//   SNO: index + 1,
	//   Catagories: category.name,
	//   Assessment: category.Assessment.map((assessment) => assessment.assessmentname).join(', '),
	//   Attempts:category?.Questions?.length || 0,
	//   _id: category._id,
	//   ACTION: renderActionButtons(category),
	// }));
	var cnt = 0;
	const rows = categories.flatMap((category, index) =>
		category.Assessment.map((assessment) => ({
			id: ++cnt, // Use a unique identifier for the key
			SNO: cnt,
			Catagories: category.name,
			Assessment: assessment.assessmentname,
			// Assessment: category.Assessment.map((assessment) => assessment.assessmentname).join(', '),
			Attempts: assessment.Questions.length,
			_id: category._id,
			AssessmentId:assessment._id,
			ACTION: renderActionButtons(category),
		}))
	);

	return (
		<>
			<div className="container-fluid">
				<div className="row">
					{isOpen && (
						<div className="col-12 col-lg-3 col-md-12 sectioncard121">
							<Sidebar />
						</div>
					)}
					<div
						className={`my-3 col-12 col-md-${isOpen ? 12 : 10} col-lg-${
							isOpen ? 9 : 12
						}`}
					>
						{isLoading ? (
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
						) : (
							<div className="d-lg-block">
								<i
									className="fa-solid fa-bars bars d-lg-block d-none"
									onClick={toggleSidebar}
								></i>
								<div className="">
									<div className="row">
										<div className="col-md-12 mb-3 text-center">
											<h3 className="" style={{color:"#16c3ea"}}>Access</h3>
										</div>

										{isLoading ? (
											// Show loader while data is fetching
											<div
												className="d-flex justify-content-center align-items-center"
												style={{ height: "100vh" }}
											>
												<Audio
													type="ThreeDots"
													color="#6a2a69"
													height={50}
													width={50}
												/>
											</div>
										) : (
											// Show content when data is loaded
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
										)}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default Assessment;
