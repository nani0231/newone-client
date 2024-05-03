import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import "react-toastify/dist/ReactToastify.css";
import { Audio } from "react-loader-spinner";
import { Modal, Input, message } from "antd";
import axios from "axios";
import Sidebar from "../Sidebar";
import "./Assement.css";
import { useLocation } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";
import apiList from "../liberary/apiList";
import Blogsadd from "../Blogs/blogsadd";

const AssignedAssessmentaccess = () => {
	const { state } = useLocation();
	const [selectedInstitute, setSelectedInstitute] = useState(null);
	const [isOpen, setIsOpen] = useState(true);
	const [addblogslist, setAddblogslist] = useState([]);
	const [selectedInstitutes, setSelectedInstitutes] = useState([]);
	const [selectedBatchYear, setSelectedBatchYear] = useState([]);
	const [selectedBatch, setSelectedBatch] = useState([]);
	const [isFiltered, setIsFiltered] = useState(false);
	const [addInstitutelist, setInstitutelist] = useState([]);
	const [editMode, setEditMode] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { Option } = Select;
	const { CategoryTitle } = state || {};
	const [individualInstitute, setIndividualInstitute] = useState({
		BatchYear: "", // Initialize with an empty string
	});
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [deleteId, setDeleteId] = useState(null);
	const [SelectBatch, setSelectBatch] = useState("");

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
		const fetchData = async () => {
			// Simulating data fetching delay
			setTimeout(() => {
				setIsLoading(false);
			}, 2000);
		};

		fetchData();
	}, []);

	useEffect(() => {
		fetchblogs();
		InstituteDetails();
	}, []);

	const InstituteDetails = async () => {
		const api = `${apiList.allAddInstitutes}`;

		try {
			const response = await axios.get(api);
			setInstitutelist(response.data);
		} catch (error) {
			console.error("Error fetching institutes:", error);
		}
	};

	const fetchblogs = async () => {
		const api = `${apiList.allAddInstitutes}`;

		try {
			const response = await axios.get(api);
			setAddblogslist(response.data);
			console.log("Fetched Blogs:", response.data);
		} catch (error) {
			console.error("Error fetching blogs:", error);
		}
	};

	const filterJobs = () => {
		console.log("Selected Institutes:", selectedInstitutes);
		console.log("Selected Batch Years:", selectedBatchYear);
		console.log("Selected Batches:", selectedBatch);

		const filteredInstitutes = addblogslist.filter(
			(institute) =>
				selectedInstitutes.includes(institute.InstituteName) &&
				selectedBatchYear.includes(institute.BatchYear) &&
				selectedBatch.includes(institute.SelectBatch)
		);

		setIsFiltered(filteredInstitutes.length > 0);
		setAddblogslist(filteredInstitutes);

		console.log("Number of filtered jobs:", filteredInstitutes);
	};

	const handleCheckboxChange = (e) => {
		const value = e.target.value;
		if (selectedInstitutes.includes(value)) {
			setSelectedInstitutes(
				selectedInstitutes.filter((item) => item !== value)
			);
		} else {
			setSelectedInstitutes([...selectedInstitutes, value]);
		}
		console.log(value);
	};

	const handleBatchYearChange = (e) => {
		const value = e.target.value;
		if (selectedBatchYear.includes(value)) {
			setSelectedBatchYear(selectedBatchYear.filter((item) => item !== value));
		} else {
			setSelectedBatchYear([...selectedBatchYear, value]);
		}
		console.log(value);
	};

	// const handleBatchChange = (e) => {
	//   const value = e.target.value;
	//   if (selectedBatch.includes(value)) {
	//     setSelectedBatch(selectedBatch.filter((item) => item !== value));
	//   } else {
	//     setSelectedBatch([...selectedBatch, value]);
	//   }
	//   console.log(value);
	// };

	const handleBatchChange = (value) => {
		// 'value' here represents the selected value from the Select component
		setSelectedBatch(value);
		console.log(value);
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
			const userData = { SelectBatch: SelectBatch };
			const response = await axios.put(
				`${apiList.UpdateInstitute}/${selectedInstitute._id}`,
				userData
			);

			if (response.status === 200) {
				// Display a success message with custom styles
				message.success({
					content: "Update Successful",
					// style: {
					//   width: '150px', // Set the desired width
					//   height: '120px', // Set the desired height
					//   alignContent:"center",
					//   marginLeft:600,
					//   alignItems:"center",
					//   justifyContent:"center",

					// },
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

	const handleDelete = async (id) => {
		try {
			const response = await axios.delete(`${apiList.deleteInstitute}/${id}`);

			if (response.status === 200) {
				message.success("Delete Successful");
				fetchblogs();
				InstituteDetails();
			}
		} catch (error) {
			console.error(error);
			message.error(
				`An error occurred while deleting the institute: ${error.message}`
			);
		}
	};
	const columns = [
		{ field: "SNO", headerName: "S.No", width: 90 },
		{ field: "InstituteName", headerName: "InstituteName", width: 190 },
		{ field: "BatchYear", headerName: "BatchYear", width: 190 },
		{ field: "Batch", headerName: "Batch", width: 160 },
		{
			field: "ACTION",
			headerName: "Action",
			width: 280,
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
			{/* <i className="fa-solid fa-pencil pencile"
					 onClick={() => {
            setEditMode(true);
            setSelectedInstitute(blog);
            setSelectBatch(
              blog.SelectBatch
            ); // Populate the form with the current Batch Year
          }}>			
				</i>           */}
			<i
				className="fa-solid fa-trash delete mb-1"
				data-toggle="modal"
				data-target="#myModalDelete"
				onClick={() => setDeleteId(blog._id)}
			></i>
		</div>
	);
	var cnt = 0;
	console.log(addblogslist);
	const rows = addblogslist.flatMap((blog) =>
		(blog?.InstituteBatchYear || []).flatMap((each) =>
			each.InsituteBatch.map((batch) => ({
				id: ++cnt, // Add this line to include a unique id for each row
				SNO: cnt,
				InstituteName: blog.InstituteName,
				BatchYear: each.BatchYear,
				Batch: batch.Batch,
				_id: blog._id,
				ACTION: renderActionButtons(blog),
			}))
		)
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

								<div className="card-item p-4">
									<div className="row">
										<Modal
											title="Edit Batch "
											visible={editMode}
											onOk={handleUpdate}
											okText="Update"
											cancelButtonProps={{
												style: { backgroundColor: "red", color: "white" },
											}}
											okButtonProps={{
												style: { backgroundColor: "green", color: "white" },
											}}
											onCancel={() => setEditMode(false)}
										>
											<Input
												type="text"
												placeholder="Enter Batch Year"
												value={SelectBatch}
												onChange={(e) => setSelectBatch(e.target.value)}
											/>
										</Modal>
										<Modal
											title="Delete Institute"
											visible={!!deleteId}
											okText="YES"
											onOk={() => handleDelete(deleteId)}
											onCancel={() => setDeleteId(null)}
										>
											<p>Are you sure you want to delete this institute?</p>
										</Modal>
									</div>
									<div className="row">
										<div className="col-md-12 mb-1 text-center">
											<h4>{CategoryTitle} Category Access</h4>
										</div>
										<div className="col-md-3">
											<label>Select Institutions</label>
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
										<div className="col-md-3">
											<label>Select Batch Year</label>
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
													institute?.InstituteBatchYear.map((batchyear) => (
														<option
															key={batchyear.id}
															value={batchyear.BatchYear}
														>
															{batchyear.BatchYear}
														</option>
													))
												)}
											</select>
										</div>
										<div className="col-md-3">
											<label>Select Batch</label>
											<Select
												defaultValue="Select Batch"
												style={{ width: 270, height: "37px" }}
												onChange={handleBatchChange}
												mode="multiple"
												allowClear
											>
												{addInstitutelist.map((institute) =>
													institute.InstituteBatchYear.map((batchyear) =>
														batchyear.InsituteBatch.map((each) => (
															<Option key={each.id} value={each.Batch}>
																{each.Batch}
															</Option>
														))
													)
												)}
											</Select>
										</div>
										<div className="col-md-3 mt-4">
											<button
												className="btn btn-light mt-2 ml-5"
												onClick={filterJobs}
												style={{
													backgroundColor: "#a5059d",
													color: "white",
												}}
											>
												Search
											</button>
										</div>
									</div>

									<div className="mt-3">
										<div className="">
											<h5>Access Table</h5>
										</div>
										<div className="">
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
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AssignedAssessmentaccess;
