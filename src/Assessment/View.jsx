import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Table, Popconfirm, message } from "antd";
import { Audio } from "react-loader-spinner";
import { FaUserFriends } from "react-icons/fa";
import "./Views.css";
import Sidebar from "../Sidebar";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import apiList from "../liberary/apiList";

function View() {
	const { state } = useLocation();
	const [Access, setAccess] = useState("On");
	const [data1, setdata1] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);
	const [toggleStatus, setToggleStatus] = useState({});
	const [scheduleActivated, setScheduleActivated] = useState(false);
	const { CategoryTitle,CategoryId,AssessmentId } = state || {};

	const handleToggle = (rowId) => {
		setToggleStatus((prevStatus) => ({
			...prevStatus,
			[rowId]: !prevStatus[rowId],
		}));
	};

	const handleSchedule = () => {
		if (Object.values(toggleStatus).some((status) => status)) {
			setScheduleActivated(!scheduleActivated);
		}
	};
	const handleAccessToAll = () => {
		const updatedToggleStatus = {};
		data.forEach((item) => {
			updatedToggleStatus[item.id] = true;
		});

		setToggleStatus(updatedToggleStatus);

		// Check if the toast function is being called
		console.log("Access given to all Batches");

		toast.success("Access given to all Batches", {
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
	};

	// Define the cancel function
	const cancel = () => {
		const updatedToggleStatus = {};
		data.forEach((item) => {
			updatedToggleStatus[item.id] = false;
		});

		setToggleStatus(updatedToggleStatus);
		toast.error("Access denied!", {
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
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${apiList.allAddInstitutes}`);
				const formattedData = response.data;
				setData(formattedData);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);
	const handleCheckboxChange2 = (rowId, batchyearId, batchId) => {
		console.log("Check EVENT", rowId, batchyearId, batchId);
		setSelectedRows((prevSelectedRows) => {
			if (prevSelectedRows.includes(batchId)) {
				setAccess("On");
				return prevSelectedRows.filter((id) => id !== batchId);
			} else {
				setAccess("Off")
				return [...prevSelectedRows, batchId];
			}
		});
		const AddAccessGiven = {
			Access: Access,
			CategoryId:CategoryId,
			AssessmentTopicId:AssessmentId
		};
		console.log(AddAccessGiven);
		axios
			.post(
				`${apiList.AccessView}/${rowId}/${batchyearId}/${batchId}`,
				AddAccessGiven
			)
			.then((response) => {
				setdata1(response.data);
				console.log(response.data);
				if (response.status === 200) {
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
				}
			})
			.catch((error) => {
				if (error.response && error.response.status === 400) {
					toast("");
				} else {
					console.log(error.message);
					setError("An error occurred while creating FolderPath.");
				}
			});
	};

	const [isOpen, setIsOpen] = useState(true);

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
	const [selectedRows, setSelectedRows] = useState([]);

	const columns = [
		{ field: "SNO", headerName: "S.No", width: 90 },
		{ field: "Institute", headerName: "Institute", width: 170 },
		{ field: "BatchYear", headerName: "BatchYear", width: 150 },
		{ field: "Batch", headerName: "Batch", width: 100 },
		{
			field: "Access",
			headerName: "Access",
			width: 120,
			renderCell: (params) => (
				<div className="form-check form-switch toogle">
					<input
						className="form-check-input"
						type="checkbox"
						role="switch"
						checked={selectedRows.includes(params.row.batchId)}
						onChange={() => {
							handleCheckboxChange2(
								params.row._id,
								params.row.batchyearId,
								params.row.batchId
							);
							handleToggle(params.row.id);
						}}
					/>
				</div>
			),
		},
		{ field: "UserlevelAccess", headerName: "UserlevelAccess", width: 130 },
		{
			field: "FreezTest",
			headerName: "FreezTest",
			width: 130,
			renderCell: () => (
				<div class="form-check form-switch toogle">
					<input class="form-check-input" type="checkbox" role="switch" />
				</div>
			),
		},
		{
			field: "ACTION",
			headerName: "Schedule",
			width: 572,
			renderCell: (params) => renderActionButtons(params.row.id),
		},
	];

	const headerColumns = columns.map((col) => ({
		field: col.field,
		headerName: col.headerName,
		width: col.width,
		renderCell: col.renderCell,
	}));

	const renderActionButtons = (rowId) => (
		<div>
			<>
				<button
					className="bty"
					onClick={handleSchedule}
					style={{
						backgroundColor: toggleStatus[rowId]
							? scheduleActivated
								? "green"
								: "#981a96"
							: "#515365",
						cursor: toggleStatus[rowId] ? "pointer" : "not-allowed",
					}}
					disabled={!toggleStatus[rowId]}
				>
					TimeSchedule
				</button>
				<button type="button" className="mx-2 btn view_button2 btn-primary">
					<FaUserFriends />
				</button>
			</>
		</div>
	);
	let cnt = 0;
	const rows = data.flatMap((blog, index) =>
    blog.InstituteBatchYear.flatMap((batchYear) => {
      const batches = batchYear.InsituteBatch.map((batch) => {
        cnt++;
        return {
		id: cnt,
		SNO: cnt,
		Institute: blog.InstituteName,
		_id: blog._id,
		batchyearId: batchYear._id,
		batchId: batch._id,
		BatchYear: batchYear.BatchYear,
		Batch: batch.Batch,
		Access: blog.Access,
		UserlevelAccess: "yes",
		ACTION: renderActionButtons(blog._id),
		batchId: batch._id,
	};
  });
  return batches;
})
);

const selectedRows2 = () => {
    const ischecked = data.flatMap((blog) =>
      blog.InstituteBatchYear.flatMap((batchYear) =>
        batchYear.InsituteBatch.filter(
          (batch) => batch.AssessmentTopicAcess.some(each=> each.Access === "On" && each.CategoryId === CategoryId && each.AssessmentTopicId === AssessmentId)
        ).map((batch) => batch._id)
      )
    );
    setSelectedRows(ischecked);
		}


	useEffect(() => {
		selectedRows2();
	}, [data]);
	return (
		<div className="container-fluid">
			<div className="row">
				{isOpen && (
					<div className="col-12 col-lg-3 col-md-12 sectioncard121">
						<Sidebar />
						<ToastContainer />
					</div>
				)}
				<div
					className={`my-3 col-12 col-md-${isOpen ? 12 : 9} col-lg-${
						isOpen ? 9 : 12
					}`}
				>
					{isLoading ? (
						<div
							className="d-flex justify-content-center align-items-center"
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
									<div className="col-md-12 text-center">
										<h4 className="" style={{color: "rgb(22, 195, 234)"}}>{CategoryTitle} Access</h4>
									</div>
									<div className="col-md-3 mt-2">
										<h5 className="text-left"></h5>
									</div>
									<div className="col-md-6"></div>
									<div className="col-md-3">
										<div className="text-end">
											<Popconfirm
												title="Grant Access To all"
												description="Are you sure to Access To all?"
												onConfirm={handleAccessToAll}
												onCancel={cancel}
												okText="Yes"
												cancelButtonProps={{
													style: { backgroundColor: "#16c3ea", color: "white" },
												}}
												okButtonProps={{
													style: { backgroundColor: "#000", color: "white" },
												}}
												cancelText="No"
											>
												<button
													type="button"
													className="btn btn-light"
													style={{ backgroundColor: "#16c3ea", color: "#000" }}
													onChange={handleAccessToAll}
												>
													+ Access To all
												</button>
											</Popconfirm>
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
					)}
				</div>
			</div>
		</div>
	);
}

export default View;
