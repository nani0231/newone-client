import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../Sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { BiPlus } from "react-icons/bi";
import "./Practice.css";
import { BiTrash, BiEdit } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import apiList from "../liberary/apiList";

const TextTable = () => {
	const editor = useRef(null);
	const [isOpen, setIsOpen] = useState(true);
	const [allPrcaticeData, setallPrcaticeData] = useState([]);
	const [itisLoading, setItisLoading] = useState(true);
	const [filteredData, setFilteredData] = useState([]);
	const handleInputChange = (e) => {
		const term = e.target.value;

		let filtered;
		filtered = allPrcaticeData;

		if (term) {
			filtered = filtered.filter((blog) =>
				blog.name.toLowerCase().includes(term.toLowerCase())
			);
		}

		setFilteredData(filtered.length ? filtered : []);
	};

	let navigate = useNavigate();

	const gotoTest = ()=>{
		navigate("/createTest")
	}

	const fetchPracticeTestData = async () => {
		const api = `${apiList.allpractices}`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setallPrcaticeData(response.data.data);
			setFilteredData(response.data.data);
			setItisLoading(false);
			console.log(data, "data");
		} catch (error) {
			console.error("Can't Get the Practice Test Data", error);
		}
	};
	const handleDelete = async (categoryId, topicId, testId) => {
		const res = await axios.delete(
			`${apiList.deletetestinpractice}/${categoryId}/${topicId}/${testId}`
		);
		if (res.status === 200) {
			toast.success("Test Deleted", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				className: "custom-toast-custom",
			});

			fetchPracticeTestData();
		}
	};


	useEffect(() => {
		fetchPracticeTestData();
	}, []);
	const columns = [
		{ field: "SNO", headerName: "S.No", width: 160 },
		{ field: "CATEGORY", headerName: "Category", width: 240 },
		{ field: "TOPICNAME", headerName: "Topic Name", width: 240 },
		{ field: "TESTNAME", headerName: "Test Name", width: 240 },
		{
			field: "ACTION",
			headerName: "Actions",
			width: 582,
			renderCell: (params) => renderActionButtons(params.row),
		},
	];


	const headerColumns = columns.map((col) => ({
		field: col.field,
		headerName: col.headerName,
		width: col.width,
		renderCell: col.renderCell,
	}));

	const renderActionButtons = (item) => (
		<div>
			{filteredData && filteredData.length <= 0 ?(<div></div>):(
				<>
			<Link to={`/SelectQuestionView`}>
			<i
					class="fa-regular fa-eye "
					style={{
						backgroundColor: "#d6dadd",
						padding: "6px",
						borderRadius: "4px",
						marginRight: "5px",
						fontSize: "18px",
						cursor:"pointer",
						color:"#050505"
						
					}}
				></i>
			</Link>

			<Link
				to={`/practiceTestEdit/${item.categoryId}/${item.topicId}/${item.testId}`}
			>
				<i className="fa-solid fa-pencil pencile"></i>
			</Link>
			<i
				className="fa-solid fa-trash delete "
				onClick={() => handleDelete(item.categoryId, item.topicId, item.testId)}
			></i>
			</>
			)}
		</div>
	);
	var cnt = 0;
	let rows = [];
	if (filteredData && filteredData.length <= 0) {
		rows = [
		  {
			  id: 1,
			SNO: 'No Data',
		  },
		];
	  } else {
	rows = filteredData?.flatMap((blog) =>
		blog?.Practicetopic?.flatMap((topic) =>
			topic?.Testtopic?.map((test) => ({
				id: ++cnt,
				SNO: cnt,
				CATEGORY: blog?.name, // Assuming "subjectTag" is the property name for the subject tag
				TOPICNAME: topic?.topicName, // Assuming "totalqustions" is the property name for the total questions
				TESTNAME: test?.testName,
				ACTION: renderActionButtons(blog),
				_id: test?._id,
				categoryId: blog?._id,
				topicId: topic?._id,
				testId: test?._id,
			}))
		)
	);
		}
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
							<div className="">
								<i
									className="fa-solid fa-bars bars  d-lg-block d-none"
									onClick={toggleSidebar}
								></i>
								<div class="">
									<div class="row">
										<div className="col-md-12 text-center">
											<h3 className="" style={{color:"#16c3ea"}}>Tests</h3>
										</div>
										<div className="col-md-4 d-flex">
										<label className="mt-2 mr-2">Search: </label>
											<input
												type="text"
												className="form-control"
												//   value={searchQuery}
												placeholder="Search by name"
												onChange={handleInputChange}
											/>
										</div>
										<div className="col-md-4"></div>

										<div className="col-md-4">
											
												<button
													className="btn3 float-right"
													onClick={gotoTest}
													style={{ backgroundColor: "#16c3ea", color: "#000" }}
												>
													+ Create Test
												</button>
											
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
		</div>
	);
};

export default TextTable;
