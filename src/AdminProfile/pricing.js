import React from "react";
import Sidebar from "../Sidebar";
import { useState, useRef, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import apiList from "../liberary/apiList";
import { ToastContainer, toast } from "react-toastify";

const Pricing = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [loading, setLoading] = useState(true);
	const [assessmentCategories, setAssessmentCategories] = useState([]);
	const [categoryDetails, setCategoryDetails] = useState([]);
	const [assessmentPractice, setAssessmentPractice] = useState('');
	const [accessPeriod, setAccessPeriod] = useState('');

	


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
	const fetchCardData = async () => {
		try {
		  const response = await axios.get(
			`${apiList.categories}`
		  );
		  setAssessmentCategories(response.data);
		  console.log(response.data)
		} catch (e) {
		  console.log("Error in Getting the Videos Folder", e);
		}
	  };
	useEffect(() => {
		fetchCardData();
	  }, []);

	const columns = [
		{ field: "SNO", headerName: "S.NO", width: 100,  },
		{
			field: "Category",
			headerName: "Category",
			width: 120,
		
		},
		{
			field: "AccessPeriod",
			headerName: "AccessPeriod",
			width: 120,
		
		},
		{
			field: "AssessmentPractice",
			headerName: "AssessmentPractice(Rupees)",
			width: 200,
			
		},
		{
			field: "AssessmentPracticeLMS",
			headerName: "AssessmentPracticeLMS",
			width: 220,
			
		},
		{
			field: "AssessmentPracticeInstitution",
			headerName: "AssessmentPracticeInstitution",
			width: 240,
		
		},
		{
			field: "AssessmentPracticeLMSInstitution",
			headerName: "AssessmentPracticeLMSInstitution",
			width: 240,
		
		},
		{
			field: "ACTION",
			headerName: "Action",
			width: 623,

			renderCell: (params) => renderActionButtons(params.row),
		},
	];
	const onUpdateCategory = (categoryId) => {
			const updatedData = {
				assessmentPractice:assessmentPractice,
				accessPeriod:accessPeriod
			};

			axios
				.put(`${apiList.Pricingcategories}/${categoryId}`, updatedData)
				.then((response) => {
					if (response && response.data) {
						toast("Pricing Updated Successfully", {
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
						fetchCardData()
					} else {
						console.error("Invalid response or data:", response);
					}
				})
				.catch((error) => {
					console.error(
						"Error updating category:",
						error.response ? error.response.data : error.message
					);
				});
		
	};
	const headerColumns = columns.map((col) => ({
		field: col.field,
		headerName: col.headerName,
		width: col.width,
		renderCell: col.renderCell,
	}));

	const renderActionButtons = (category) => (
		<div>
			<button
			data-toggle="modal"
			data-target="#myModal1"
			type="button"
				className=" btn-dark"
				style={{
					borderRadius: "4px",
					padding: "5px",
					marginRight: "5px",
					border: "none",
				}}
			onClick={() => setCategoryDetails({categoryname:category.Category,categoryId:category._id,categoryprice:category.AssessmentPractice})}
			 >Pricing</button>
		</div>
	);
	let rows = [];
	if (assessmentCategories && assessmentCategories.length <= 0) {
		rows = [
		  {
			  id: 1,
			SNO: 'No Data',
		  },
		];
	  } else {
		 rows = assessmentCategories.map((category, index) => ({
		id: index + 1, // Add this line to include a unique id for each row
		SNO: index + 1,
		Category: category.name,
		AccessPeriod:category.accessPeriod,
		ACCESSTYPE: category.accesstype,
		AssessmentPractice:category.assessmentPractice ||"0",
		AssessmentPracticeLMS:"0",
		AssessmentPracticeInstitution:"0",
		AssessmentPracticeLMSInstitution:"0",
		ASSESSMENT: category?.Assessment.length,
		_id: category._id,
		ACTION: renderActionButtons(category),
	}));
	  }
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
							<ToastContainer/>
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

								<h4 className="text-center" style={{color: "rgb(22, 195, 234)"}}>Pricing Details</h4>
								<div className="mt-4" style={{ height: "auto", width: "100%" }}>
									<DataGrid
										rows={rows}
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
					<div class="modal" id="myModal1">
												<div class="modal-dialog">
													<div class="modal-content">
														<div class="modal-header">
															<h4 class="modal-title">Update Pricing</h4>
															<button
																type="button"
																class="close"
																data-dismiss="modal"
															>
																&times;
															</button>
														</div>

														<div
															class="modal-body"
															style={{ textAlign: "start" }}
														>
															<label
																style={{ fontWeight: "600" }}
																className="text-start"
															>
																Category{" "}
															</label>
															<input
																className="form-control"
																value={categoryDetails.categoryname}
															/>
															{/* <label
																className="mt-2"
																style={{ fontWeight: "600" }}
															>
																AccessPeriod{" "}
															</label>
															<input
																className="form-control"
																value={AccessPeriod}
																onChange={(e) => setAccessPeriod(e.target.value)}
															/> */}
															<div>
																<label
																	className="mt-2"
																	style={{ fontWeight: "600" }}
																>
																	Access Period
																</label>
																<select
																	className="p-1 form-control"
																	value={accessPeriod}
																	onChange={(e) =>
																		setAccessPeriod(e.target.value)
																	}
																>
																	<option value="" hidden>
																		Access Type
																	</option>
																	<option value="3 Months">3Months</option>
																	<option value="6 Months">6Months</option>
																	<option value="9 Months">9Months</option>
																</select>
															</div>
															<div>
																<label
																	className="mt-2"
																	style={{ fontWeight: "600" }}
																>
																	Price
																</label>
																<input
																	type="number"
																	className="p-1 form-control"
																	value={"" || assessmentPractice}
																	onChange={(e) => setAssessmentPractice(e.target.value)}
																/>
															</div>
															 
															{/* <div>
																<label
																	className="mt-2"
																	style={{ fontWeight: "600" }}
																>
																	Access Plan
																</label>
																<select
																	className="p-1 form-control"
																	value={accessplan}
																	onChange={(e) =>
																		setaccessplan(e.target.value)
																	}
																>
																	<option value="" hidden>
																		Access Plan
																	</option>
																	<option value="Free">Free</option>
																	<option value="Retails">Retails</option>
																</select>
															</div>
															<div>
																<label
																	className="mt-2"
																	style={{ fontWeight: "600" }}
																>
																	Display
																</label>
																<select
																	className="p-1 form-control"
																	value={display}
																	onChange={(e) => setdisplay(e.target.value)}
																>
																	<option value="" hidden>
																		status
																	</option>
																	<option value="YES">YES</option>
																	<option value="NO">NO</option>
																</select>
															</div>  */}
														</div>
														<div class="modal-footer">
															<button
																type="button"
																class="btn btn-danger"
																data-dismiss="modal"
																onClick={()=>onUpdateCategory(categoryDetails.categoryId)}
																style={{backgroundColor:"#16c3ea", color:"#000"}}
															>
																update
															</button>
														</div>
													</div>
												</div>
											</div>
				</div>
			</div>
		</div>
	);
};

export default Pricing;
