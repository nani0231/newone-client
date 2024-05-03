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
import { ToastContainer, toast } from "react-toastify";
import apiList from "../liberary/apiList";
import BatchYear from "../Batch-Year";

const Assessmentaccess = () => {
	const { state } = useLocation();
	const [selectedInstitute, setSelectedInstitute] = useState(null);
	const [isOpen, setIsOpen] = useState(true);
	const [addblogslist, setAddblogslist] = useState([]);
	const [selectedInstitutes, setSelectedInstitutes] = useState([]);
	const [selectedBatchYear, setSelectedBatchYear] = useState([]);
	const [selectedBatch, setSelectedBatch] = useState();
	const [isFiltered, setIsFiltered] = useState(false);
	const [addInstitutelist, setInstitutelist] = useState([]);
	const [categoriesAccessData, setCategoriesAccessData] = useState([]);
	const [dataisavailable, setdataisavailable] = useState([]);
	const [editMode, setEditMode] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { Option } = Select;
	const { CategoryTitle, CategoryId } = state || {};
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
		const filteredData = addblogslist.filter((institute) => {
			const isInstituteSelected = selectedInstitutes.includes(
				institute.InstituteName
			);
			const isBatchYearSelected = selectedBatchYear.includes(
				institute.InstituteBatchYear[0].BatchYear
			);
			const isBatchSelected = selectedBatch.includes(
				institute.InstituteBatchYear[0].InsituteBatch[0].Batch
			);
			return isInstituteSelected && isBatchYearSelected && isBatchSelected;
		});

		setIsFiltered(filteredData.length > 0);
		setAddblogslist(filteredData);
		console.log("Number of filtered jobs:", filteredData);
	};
	const [selectedInstituteId, setSelectedInstituteId] = useState("");

	const [filteredInstitutionData, setFilteredInstitutionData] = useState([]);
	const [filteredBatchYearData, setFilteredBatchYearData] = useState([]);
	const [selectedBatchYearId, setSelectedBatchYearId] = useState("");
	const [selectedBatchId, setSelectedBatchId] = useState("");

	const handleInstituteSelection = (e) => {
		const datavalue = e.target.options[e.target.selectedIndex].getAttribute("data-value");
		setSelectedInstitute(datavalue);
		setFilteredInstitutionData([]);
		setFilteredBatchYearData([]);
		setSelectedInstituteId(
			e.target.options[e.target.selectedIndex].getAttribute("value")
		);
		const selectedId = e.target.value;
		const result = addInstitutelist?.find((item) => item?._id === selectedId);

		console.log("Filtered Data 1:", result?.InstituteBatchYear);
		setTimeout(() => {
			setFilteredInstitutionData(result?.InstituteBatchYear || []);
		}, 10);
		setSelectedBatchYearId("");
		setSelectedBatchId("");
	};
	const handleBatchYearSelection = (e) => {
		const datavalue = e.target.options[e.target.selectedIndex].getAttribute("data-value");
		setSelectedBatchYear(datavalue);
		setFilteredBatchYearData([]);
		setSelectedBatchYearId(
			e.target.options[e.target.selectedIndex].getAttribute("value")
		);
		const selectedById = e.target.value;
		const result2 = filteredInstitutionData?.find(
			(item) => item?._id === selectedById
		);
		console.log("Filtered Data 2:", result2);
		setFilteredBatchYearData(result2?.InsituteBatch || []);
		setSelectedBatchId("");
	};
	const handleBatchSelection = (e) => {
		const datavalue = e.target.options[e.target.selectedIndex].getAttribute("data-value");
		setSelectedBatch(datavalue);
		setSelectedBatchId(
			e.target.options[e.target.selectedIndex].getAttribute("value")
		);
	};

	const handleBatchYearChange = (e) => {
		const value = e.target.value;
		setSelectedBatchYear(value);
		console.log(value);
	};

	const handleBatchChange = (value) => {
		// const value = e.target.value
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

	useEffect(() => {
		fetchData();
	}, []);
	const fetchData = () => {
		axios
			.get(`${apiList.categories}`)
			.then((response) => {
				console.log("Response Status:", response.status);
				console.log("Response Data:", response.data);
				setdataisavailable(response.data)
				if (response && response.data) {
					setCategoriesAccessData(
						response.data.filter((v) => v._id === CategoryId)
					);
					setIsLoading(false);
				} else {
					console.error("Invalid response or data:", response);
				}
			})
			.catch((error) => {
				console.error("Error fetching categories:", error.response.data);
			});
	};
	const [Access, setAccess] = useState("off");

	const onsubmitform = async () => {
		try {
			const userData = {
				InstituteName: selectedInstitute,
				BatchYear: selectedBatchYear,
				Batch: selectedBatch,
				Access: "On",
			};
			const response = await axios.post(
				`${apiList.CategorywiseAccess}/${CategoryId}`,
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
				InstituteDetails();
				setSelectBatch();
				setSelectedInstitute("")
				setTimeout(function () {}, 3000);
				fetchblogs();
				fetchData();
				
			}
		} catch (error) {
			console.error(error);
			message.error(
				`An error occurred while updating the institute: ${error.message}`
			);
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

	const handleDelete = async (CategoryId, accessId) => {
		try {
			const response = await axios.delete(
				`${apiList.categoriesAccessDelete}/${CategoryId}/${accessId}`
			);

			if (response.status === 200) {
				toast("Access Deleted Successfully", {
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
				setTimeout(function () {}, 3000);
				fetchblogs();
				fetchData();
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
		{ field: "InstituteName", headerName: "InstituteName", width: 300 },
		{ field: "BatchYear", headerName: "BatchYear", width: 280 },
		{ field: "Batch", headerName: "Batch", width: 280 },
		{
			field: "ACTION",
			headerName: "Action",
			width: 507,
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
			{categoriesAccessData && categoriesAccessData.length > 0 && categoriesAccessData[0].AccessDetails && categoriesAccessData[0].AccessDetails.length <= 0 ? (<div></div>):(

			<i
				className="fa-solid fa-trash delete mb-1"
				data-toggle="modal"
				data-target="#myModalDelete"
				onClick={() =>
					setDeleteId({ CategoryId: blog._id, accessId: blog.deleteid })
				}
			></i>
			)}
		</div>
	);
	let cnt = 0;
	let rows = [];
	// dataisavailable.some((v) => v._id === CategoryId && v.AccessDetails?.length === 0
	console.log(categoriesAccessData,"categoriesAccessData")
	if (categoriesAccessData && categoriesAccessData.length > 0 && categoriesAccessData[0].AccessDetails && categoriesAccessData[0].AccessDetails.length <= 0) {
		rows = [{
			id: 'no-data',
			SNO: 'No Access Given',
		}];
	} else {
		rows = categoriesAccessData.flatMap((blog) =>
			(blog?.AccessDetails || []).flatMap((each, instituteIndex) => ({
				id: ++cnt, // Add this line to include a unique id for each row
				SNO: cnt,
				InstituteName: each.InstituteName,
				BatchYear: each.BatchYear,
				Batch: each.Batch,
				deleteid: each._id,
				_id: blog._id,
				ACTION: renderActionButtons(each),
			}))
		);
	}
	

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
											onOk={() =>
												
												handleDelete(deleteId.CategoryId, deleteId.accessId)
											}
											
											onCancel={() => setDeleteId(null)}
										>
											<p>Are you sure you want to delete this institute?</p>
										</Modal>
									</div>
									<div className="row">
										<div className="col-md-12 mb-1 text-center">
											<h4 style={{color: "rgb(22, 195, 234)"}}>{CategoryTitle} Categories Access</h4>
										</div>
										<div className="col-md-3">
											<label><b>Select Institutions</b></label>
											<select
												name=""
												id=""
												className="form-control"
												onChange={handleInstituteSelection}
											>
												<option value="Select Institutions">
													Select Institutions
												</option>
												{addInstitutelist.map((institute) => (
													<option
														key={institute.id}
														value={institute._id}
														data-value={institute.InstituteName}
													>
														{institute.InstituteName}
													</option>
												))}
											</select>
										</div>
										<div className="col-md-3">
											<label><b>Select Batch Year</b></label>
											<select
												name=""
												id=""
												className="form-control"
												onChange={handleBatchYearSelection}
											>
												<option value="Select Batch Year">
													Select Batch Year
												</option>
												{filteredInstitutionData.map((year) =>(	<option 
												key={year.id} 
												value={year._id}
												data-value={year.BatchYear} >
															{year.BatchYear}
														</option>
													)
												)}
											</select>
										</div>
										<div className="col-md-3">
											<label><b>Select Batch</b></label>
											<select
												name=""
												id=""																				className="form-control"
												onChange={handleBatchSelection}
												
											>
												<option value="Select Institutions">
													Select Batch
												</option>
												{filteredBatchYearData.map((each) => (
															<option key={each.id} value={each._id} data-value={each.Batch}>
																{each.Batch}
															</option>
														)
												)}
											</select>
										</div>
										<div className="col-md-3 mt-4">
											<button
												className="btn btn-light mt-2 ml-5"
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

export default Assessmentaccess;
