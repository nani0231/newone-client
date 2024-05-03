import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineFileDownload } from "react-icons/md";
import { CiFilter } from "react-icons/ci";
import { MdOutlineAutorenew } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { fontWeight } from "@mui/system";
import apiList from "../liberary/apiList";
import axios from "axios";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

function AssessmentView() {
	const [isOpen, setIsOpen] = useState(true);
	let navigate = useNavigate();
	const [worksheetLoading, setWorksheetLoading] = useState(true);
	const { selectedCategoryId, assessmentId } = useParams();
	const [testattemptuserDetails, settestattemptuserDetails] = useState([]);

	useEffect(() => {
		fetchblogs1();
	}, []);
	const fetchblogs1 = async () => {
		const api = `${apiList.UserDetailstestattempts}/${selectedCategoryId}/${assessmentId}`;
		try {
			const response = await axios.get(api, {});
			settestattemptuserDetails(response.data.assessmentDetails);
			console.log(response.data);
			setWorksheetLoading(false);
		} catch (error) {
			console.error("Error fetch blogs:", error);
			setWorksheetLoading(false);
		}
	};
	console.log(testattemptuserDetails, "testattemptuserDetails");
	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		setWorksheetLoading(false); // Set loading to false after delay
	// 	}, 1000); // Change delay as needed

	// 	return () => clearTimeout(timer);
	// }, []);

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
	const columns = [
		{ field: "SNO", headerName: "S.No", width: 90 },
		{ field: "STUDENTNAME", headerName: "Student Name", width: 160 },
		{ field: "EMAIL", headerName: "Email", width: 150 },
		{ field: "HALLTICKETNUMBER", headerName: "Hall Ticket Number", width: 150 },
		{ field: "MARKS", headerName: "Marks", width: 110 },
		{ field: "PERCENTAGE", headerName: "Percentage", width: 110 },
		{ field: "COMPLETED", headerName: "Completed", width: 130 },
		{ field: "QUALIFIED", headerName: "Qualified", width: 473 },
	];

	const headerColumns = columns.map((col) => ({
		field: col.field,
		headerName: col.headerName,
		width: col.width,
		renderCell: col.renderCell,
	}));
	let rows = [];

	const [qualifingdetails, setQualifingdetails] = useState([]);

		const renderActionButtons = (blog) => {
		//   setQualifingdetails({
		// 	COMPLETED: blog.COMPLETED,
		// 	QUALIFIED: blog.QUALIFIED
		//   });
		};
			rows = testattemptuserDetails?.map((blog, index) => ({
			id: index + 1, 
			SNO: index + 1,
			STUDENTNAME: blog?.userdetails[0].FirstName+blog.userdetails[0].LastName,
			EMAIL: blog?.userdetails[0].userEmail,
			HALLTICKETNUMBER: blog?.userdetails[0].Regdid,
			BATCHYEAR: blog?.BATCHYEAR,
			MARKS: blog?.Score,
			PERCENTAGE: ((blog?.Score/blog?.QualifingScale[0].maxmarks)*100).toFixed(2),
			COMPLETED: (blog?.Score/blog?.QualifingScale[0].maxmarks)*100 > 80 ? 'Completed' : 'Not Completed',
			QUALIFIED:(blog?.Score/blog?.QualifingScale[0].maxmarks)*100 > 80 ? 'Qualified' : 'Not Qualified',
			_id: blog?._id,
			ACTION: ()=>renderActionButtons(blog),
		}));
	
	const exportToExcel = () => {
		const dataToExport = testattemptuserDetails.map((blog, index) => ({
			SNO: index + 1,
			STUDENTNAME: blog?.userdetails[0].FirstName+blog.userdetails[0].LastName,
			EMAIL: blog?.userdetails[0].userEmail,
			HALLTICKETNUMBER: blog?.userdetails[0].Regdid,
			MARKS: blog?.Score,
			PERCENTAGE: ((blog?.Score/blog?.QualifingScale[0].maxmarks)*100).toFixed(2),
			COMPLETED: (blog?.Score/blog?.QualifingScale[0].maxmarks)*100 > 80 ? 'Completed' : 'Not Completed',
			QUALIFIED:(blog?.Score/blog?.QualifingScale[0].maxmarks)*100 > 80 ? 'Qualified' : 'Not Qualified',
					}))
		const fileType =
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
		const fileExtension = ".xlsx";

		const ws = XLSX.utils.json_to_sheet(dataToExport);
		const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, "praticipation_data" + fileExtension);
	};
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
							<div className="">
								<div className="d-lg-block">
									<i
										className="fa-solid fa-bars bars d-lg-block d-none"
										onClick={toggleSidebar}
									></i>
									<div class="">
										<div className=" text-center">
											<h3 className="mb-5" style={{color:"#16c3ea"}}>Assessments View</h3>
										</div>
										<div className="row">
											<div className="col-4  mt-2 ">
												<div className="card_item w-100 text-center">
													<p style={{ fontWeight: "600" }}>Total Attempts</p>
													<h6>{testattemptuserDetails.length}</h6>
												</div>
											</div>
											<div className="col-4 mt-2">
												<div className="w-100 card_item text-center">
													<p style={{ fontWeight: "600" }}>Completed</p>
													<h6>{qualifingdetails.COMPLETED || 0}</h6>
												</div>
											</div>
											<div className="col-4 mt-2">
												<div className="w-100 card_item text-center">
													<p style={{ fontWeight: "600" }}>In Progress</p>
													<h6>0</h6>
												</div>
											</div>
											<div className="col-4 mt-2">
												<div className="w-100 card_item text-center">
													<p style={{ fontWeight: "600" }}>Qualified</p>
													<h6>0</h6>
												</div>
											</div>
											<div className="col-4  mt-2">
												<div className="w-100 card_item text-center">
													<p style={{ fontWeight: "600" }}>Not Qualified</p>
													<h6>0</h6>
												</div>
											</div>
											<div className="col-4 mt-2">
												<div className="w-100 card_item text-center">
													<p style={{ fontWeight: "600" }}>Highest %</p>
													<h6>-</h6>
												</div>
											</div>
										</div>

										<div className="">
											<div className=" actionsView">
												<h6 className="my-3" style={{ fontWeight: "600" }}>
													Actions:
												</h6>
												<div className="actionLine"></div>
												<div className="row mb-3 ActionBtn-box">
													<div className="col-2 ActionBtn ">
														<button
															className="actionbtn1 w-100"
															style={{
																backgroundColor: "#16c3ea",
																color: "#000",
																border: "none",
																padding: "6px",
																borderRadius: "6px",
															}}
															onClick={exportToExcel}
														>
															<MdOutlineFileDownload /> Download
														</button>
													</div>
													<div className="col-3 ActionBtn">
														<button
															className="actionbtn2 w-100"
															style={{
																backgroundColor: "rgb(5 85 103)",
																color: "#fff",
																border: "none",
																padding: "6px",
																borderRadius: "6px",
															}}
														>
															<CiFilter /> Summary Report
														</button>
													</div>
													<div className="col-2 ActionBtn">
														<button
															className="actionbtn3 w-100"
															style={{
																backgroundColor: "#981a96",
																color: "#fff",
																border: "none",
																padding: "6px",
																borderRadius: "6px",
															}}
														>
															<MdOutlineAutorenew />
															Auto Submit
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div
										className="mt-2"
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
}

export default AssessmentView;
