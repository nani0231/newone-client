import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Input, message } from "antd";
import axios from "axios";
import Sidebar from "../Sidebar";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import apiList from "../liberary/apiList";
import { ToastContainer, toast } from "react-toastify";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";

const Access = () => {
	const { state } = useLocation();
	const [selectedInstitute, setSelectedInstitute] = useState(null);
	const [isOpen, setIsOpen] = useState(true);
	const [addblogslist, setAddblogslist] = useState([]);
	const [selectedInstitutes, setSelectedInstitutes] = useState([]);
	const [selectedBatchYear, setSelectedBatchYear] = useState([]);
	const [selectedBatchyearvalue, setselectedBatchyearvalue] = useState([]);
	const [selectedBatch, setSelectedBatch] = useState([]);
	const [isFiltered, setIsFiltered] = useState(false);
	const [addInstitutelist, setInstitutelist] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [dropdownsOpen, setDropdownsOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const { CategoryTitle, CategoryId } = state || {};
	const [categoriesAccessData, setCategoriesAccessData] = useState([]);
	const [individualInstitute, setIndividualInstitute] = useState({
		SelectBatch: "", // Initialize with an empty string
	});
	const [isModalVisible, setIsModalVisible] = useState(false);
	// const [deleteId, setDeleteId] = useState(null);
	const [selectBatch, setSelectBatch] = useState("");
	const [worksheetLoading, setWorksheetLoading] = useState(true);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
		menuBtnChange();
	};

	useEffect(() => {
		fetchblogs();
		InstituteDetails();
		fetchData();
	}, []);

	const fetchData = async () => {
		const api = `${apiList.allpractices}`;
		try {
			const response = await axios.get(api, {});
			setCategoriesAccessData(response.data.data);
			console.log(response.data);
			setWorksheetLoading(false);
		} catch (error) {
			console.error("Error fetch blogs:", error);
			setWorksheetLoading(false);
		}
	};

	const InstituteDetails = async () => {
		const api = `${apiList.allAddInstitutes}`;

		try {
			const response = await axios.get(api);
			setInstitutelist(response.data);
			setWorksheetLoading(false);
		} catch (error) {
			console.error("Error fetching institutes:", error);
		}
	};

	const fetchblogs = async () => {
		const api = `${apiList.allAddInstitutes}`;

		try {
			const response = await axios.get(api);
			// setAddblogslist(response.data);
			console.log("Fetched Blogs:", response.data);
		} catch (error) {
			console.error("Error fetching blogs:", error);
		}
	};

	const filterJobs = async () => {
		try {
			const responses = await Promise.all(
				selectedInstitutes.map(async (instituteName) => {
					const response = await axios.get(
						`${apiList.individualInstituteNames}/${instituteName}`
					);
					return response.data;
				})
			);
			const filteredData = responses.flat();

			const finalFilteredData = filteredData.filter(
				(institute) =>
					selectedBatchYear.includes(institute.BatchYear) &&
					selectedBatch.includes(institute.SelectBatch)
			);

			setIsFiltered(finalFilteredData.length > 0);
			setAddblogslist(finalFilteredData);
			setDropdownsOpen(false);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const onsubmitform = async () => {
		try {
			const userData = {
				InstituteName: selectedInstitute,
				BatchYear: selectedBatchyearvalue,
				Batch: selectedBatch,
				Access: "on",
			};
			console.log(userData);
			const response = await axios.post(
				`${apiList.PracticecategorywiseAccess}/${CategoryId}`,
				userData
			);

			if (response.status === 200) {
				// Display a success message with custom styles
				toast("Access Updated Successfully", {
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
				// Reset edit mode and fetch the updated data
				setEditMode(false);
				InstituteDetails();
				setSelectBatch();
				fetchblogs();
			}
		} catch (error) {
			console.error(error);
			message.error(
				`An error occurred while updating the institute: ${error.message}`
			);
		}
	};

	const [deleteId, setDeleteId] = useState(null);

	const handleCheckboxChange = (e) => {
		const value = e.target.value;
		setSelectedInstitute(value);
	};

	const handleBatchYearChange = (e) => {
		const value = e.target.value;
		setselectedBatchyearvalue(value);
		if (selectedBatchYear.includes(value)) {
			setSelectedBatchYear(selectedBatchYear.filter((item) => item !== value));
		} else {
			setSelectedBatchYear([...selectedBatchYear, value]);
		}
		console.log(value);
		filterJobs();
	};

	const handleBatchChange = (e) => {
		const value = e.target.value;
		if (selectedBatch.includes(value)) {
			setSelectedBatch(selectedBatch.filter((item) => item !== value));
		} else {
			setSelectedBatch([...selectedBatch, value]);
		}
		console.log(value);
		filterJobs();
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

	const handleUpdate = async () => {
		try {
			const userData = { SelectBatch: selectBatch };

			if (!selectedInstitute || !selectedInstitute._id) {
				console.error("Invalid selected institute ID");
				return;
			}
			const token =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjUyZDE0ZWNlNWNkYmUzZTg5OTEyMGYwIiwiaWF0IjoxNzAyMjczNTAwLCJleHAiOjE3MzgyNzM1MDB9.stY4HqrhzdqZdxdSlnWbybzY0h1SNFedu0TRu-ua_5E";
			// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjUyZDE1NGRlNWNkYmUzZTg5OTEyMGY0IiwiaWF0IjoxNzAzNjQ3ODU3LCJleHAiOjE3Mzk2NDc4NTd9.jlZpBoiaBWTcve-bn93zfwMoU4uwweJ2xcSrTtJ1iKU'; // Replace with your actual JWT token
			//  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjUyZDE1NGRlNWNkYmUzZTg5OTEyMGY0IiwiaWF0IjoxNzAzODI0MDk4LCJleHAiOjE3Mzk4MjQwOTh9.DI2ZWrebo1EZen0_oZeNm1nzlkeooBl9V4gD-hkn-G0'
			const response = await axios.put(
				`${apiList.UpdateInstitute}/${selectedInstitute._id}`,
				userData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 200) {
				message.success("Update Successful");
				setEditMode(false);
				// fetchblogs();
				await fetchblogs();
				InstituteDetails();
			}
		} catch (error) {
			console.error(error);
			message.error(
				"An error occurred while updating the institute: ${error.message}"
			);
		}
	};
	const columns = [
		{ field: "SNO", headerName: "S.No", width: 120 },
		{ field: "InstituteName", headerName: "InstituteName", width: 250 },
		{ field: "BatchYear", headerName: "BatchYear", width: 250 },
		{ field: "Batch", headerName: "Batch", width: 250 },
		{
			field: "ACTION",
			headerName: "Actions",
			width: 570,
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
				className="fa-solid fa-pencil pencile"
				onClick={() => {
					setEditMode(true);
					setSelectedInstitute(blog);
					setSelectBatch(blog.SelectBatch);
				}}
			></i>
			<i
				className="fa-solid fa-trash delete mb-1"
				data-toggle="modal"
				data-target="#myModalDelete"
				onClick={() => setDeleteId(blog._id)}
			></i>
		</div>
	);

	var cnt = 0;
	const rows = categoriesAccessData.flatMap((blog) =>
		(blog?.AccessDetails || []).flatMap((each, instituteIndex) => ({
			id: ++cnt, // Add this line to include a unique id for each row
			SNO: cnt,
			InstituteName: each.InstituteName,
			BatchYear: each.BatchYear,
			Batch: each.Batch,
			_id: blog._id,
			ACTION: renderActionButtons(blog),
		}))
	);

	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					{isOpen && (
						<div className="col-12 col-lg-3 col-md-12 sectioncard121">
							<Sidebar />
							<ToastContainer />
						</div>
					)}
					<div
						className={`my-3 col-12 col-md-${isOpen ? 12 : 10} col-lg-${
							isOpen ? 9 : 12
						}`}
					>
						{worksheetLoading ? (
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
							<div className="d-lg-block">
								<i
									className="fa-solid fa-bars bars d-lg-block d-none"
									onClick={toggleSidebar}
								></i>

								<div className="card-item1">
									<div className="row">
										<Modal
											title="Edit Batch"
											open={editMode}
											onOk={handleUpdate}
											okText="Update"
											cancelButtonProps={{
												style: { backgroundColor: "red", color: "white" },
											}}
											okButtonProps={{
												style: { backgroundColor: "#16c3ea", color: "#000" },
											}}
											onCancel={() => setEditMode(false)}
										>
											<Input
												type="text"
												placeholder="Enter Batch"
												value={selectBatch}
												onChange={(e) => setSelectBatch(e.target.value)}
											/>
										</Modal>
									</div>
									<div className="card-item p-4">
										<div className="row">
											<div className="col-md-12 text-center mb-4">
												<h4>{CategoryTitle} Categories Access</h4>
											</div>
											<div className="col-md-12 text-end">
												<div style={{ marginLeft: "auto" }} className="m-2">
													<div className="row">
														<div className="col-md-3 d-flex flex-column align-items-start">
															<h6 style={{ fontWeight: "500" }}>
																Select Institutions
															</h6>
															<select
																name=""
																id=""
																className="form-control"
																onChange={handleCheckboxChange}
															>
																<option value="Select Institutions">
																	Select Institutions
																</option>
																{addInstitutelist.map((institute) => (
																	<option
																		key={institute.id}
																		value={institute.InstituteName}
																	>
																		{institute.InstituteName}
																	</option>
																))}
															</select>
														</div>

														<div className="col-md-3 d-flex flex-column align-items-start">
															<h6 className="" style={{ fontWeight: "500" }}>
																Select Batch Year
															</h6>
															<select
																name=""
																id=""
																className="form-control"
																onChange={handleBatchYearChange}
															>
																<option value="Select Batch Year">
																	Select Batch Year
																</option>
																{addInstitutelist.map((institute) =>
																	institute.InstituteBatchYear.map((year) => (
																		<option
																			key={year.id}
																			value={year.BatchYear}
																		>
																			{year.BatchYear}
																		</option>
																	))
																)}
															</select>
														</div>

														<div className="col-md-3 d-flex flex-column align-items-start">
															<h6 style={{ fontWeight: "500" }}>
																Select Batch
															</h6>
															<select
																name=""
																id=""
																className="form-control"
																onChange={handleBatchChange}
															>
																<option value="Select Batch">
																	Select Batch
																</option>
																{addInstitutelist.map((institute) =>
																	institute.InstituteBatchYear.map((year) =>
																		year.InsituteBatch.map((each) => (
																			<option key={each.id} value={each.Batch}>
																				{each.Batch}
																			</option>
																		))
																	)
																)}
															</select>
														</div>
														<div className="mt-4 col-md-3 text-center flex-column d-flex align-items-start">
															<button
																className="btn btn-light mt-1"
																onClick={onsubmitform}
																style={{
																	backgroundColor: "#16c3ea",
																	color: "#000",
																}}
															>
																Submit
															</button>
														</div>
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

export default Access;
