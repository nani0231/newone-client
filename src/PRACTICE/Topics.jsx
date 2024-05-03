import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import Sidebar from "../sidebar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
// import { Table, Pagination } from "react-bootstrap";
import apiList from "../liberary/apiList";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Edit, Delete, PlayArrow } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Sidebar from "../Sidebar";

const Topics = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [itisLoading, setItisLoading] = useState(true);
	const [topicListUpdate, setTopicListUpdate] = useState({});
	const [filteredData, setFilteredData] = useState([]);
	const handleInputChange = (e) => {
		const term = e.target.value;

		let filtered;
		filtered = topic;

		if (term) {
			filtered = filtered.filter((blog) =>
				blog.name.toLowerCase().includes(term.toLowerCase())
			);
		}

		setFilteredData(filtered.length ? filtered : []);
	};

	const handleEditInputChange = (value, name) => {
		console.log(value, name);
		setTopicListUpdate({
			...topicListUpdate,
			[name]: value,
		});
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const [isOpen, setIsOpen] = useState(true);
	const mountedRef = useRef(true);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
		menuBtnChange();
	};

	let navigate = useNavigate();

	const GotoDetails = () => {
		navigate("/PracticeAccess");
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

	const [topic, settopic] = useState([]);

	const [category, setcategory] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [name, setname] = useState("");
	const [description, setdescription] = useState("");

	const handletopicSelection = (event) => {
		setcategory(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
		setCategoryId(
			event.target.options[event.target.selectedIndex].getAttribute("value")
		);
		//   	setSelectedSubjectId(event.target.options[event.target.selectedIndex].getAttribute(
		// 	"value"
		//   ))
		//   handleEditInputChange(
		// 	event.target.options[event.target.selectedIndex].getAttribute(
		// 		"data-value"
		// 	),"subject"
		// );
	};

	// Practicetopic.js
	const onSubmitForm = (e) => {
		e.preventDefault();
		if (category && name !== "") {
			const newTopic = {
				categoryName: category,
				topicName: name,
				topicdescription: description,
			};

			axios
				.post(`${apiList.addPracticetopic}/${categoryId}`, newTopic)
				.then((response) => {
					if (response.status === 200) {
						console.log("Category Added Successfully");

						// Display toast for category added successfully
						toast("Topic Added Successfully", {
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

						// After adding the category successfully, fetch the updated data
						fetchData();

						// Clear the form fields after successful submission
						setcategory("");
						setname("");
						setdescription("");
					}
				})
				.catch((error) => {
					console.log(error.response.data);
				});
		} else {
			alert("Enter details!");
		}
	};

	useEffect(() => {
		// Fetch data when the component mounts
		fetchData();
	}, []);

	// Practicetopic.js
	const fetchData = async () => {
		const api = `${apiList.allpractices}`;
		try {
			const response = await axios.get(api, {});
			settopic(response.data.data);
			setFilteredData(response.data.data);
			console.log(response.data);
			setItisLoading(false);
		} catch (error) {
			console.error("Error fetch blogs:", error);
			setItisLoading(false);
		}
	};

	const [selectedtopic, setselectedtopic] = useState(null);

	const onEditCategory = (id, categoryId) => {
		// Check if topic is defined and has the _id property
		if (id) {
			axios
				.get(`${apiList.editpracticetopic}/${categoryId}/${id}`)
				.then((response) => {
					if (response && response.data !== undefined) {
						const { category, name, description } = response.data;
						setcategory(category);
						setname(name);
						setdescription(description);
						setselectedtopic(response.data);
						// Open the modal for editing
						// $("#myModal1").modal("show");
					} else {
						console.error("Invalid response or data:", response);
					}
				})
				.catch((error) => {
					console.error(
						"Error fetching category details:",
						error.response ? error.response.data : error.message
					);
				});
		} else {
			console.error("Invalid topic or topic._id is undefined");
			// Handle the case where topic or topic._id is undefined
		}
	};

	const onDeleteCategory = (id, categoryId) => {
		axios
			.delete(`${apiList.Deletepracticetopic}/${id}/${categoryId}`) // Make sure to include the specific topic ID in the URL
			.then((response) => {
				if (response.status === 200) {
					console.log("Topic deleted successfully");

					// Display toast for topic deleted successfully
					toast("Topic Deleted Successfully", {
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

					// Remove the deleted topic from the state without refreshing the page
					settopic((prevTopics) =>
						prevTopics.filter((topic) => topic._id !== id)
					);
				}
			})
			.catch((error) => {
				console.error("Error deleting topic:", error.response.data);
			});
	};

	const [searchTerm, setSearchTerm] = useState("");
	const [Filtertopic, setFiltertopic] = useState([]);
	const [deleteid, setdeleteid] = useState("");
	const gettingdeleteid = (id, categoryId) => {
		setdeleteid({ deletetopicid: id, deletecategoryid: categoryId });
	};
	const onSearchInputChange = (e) => {
		const term = e.target.value;
		setSearchTerm(term);

		// Filter categories based on search term
		const filtered = topic.filter((topic) =>
			topic.category.toLowerCase().includes(term.toLowerCase())
		);

		setFiltertopic(filtered);
	};

	useEffect(() => {
		return () => {
			// Set the mountedRef to false when the component is unmounted
			mountedRef.current = false;
		};
	}, []);

	const onUpdateCategory = (categoryId, topicId) => {
		// if (selectedtopic) {
		// 	// const updatedData = {
		// 	// 	category,
		// 	// 	name,
		// 	// 	description,
		// 	// };

		axios
			.put(
				`${apiList.editpracticetopic}/${categoryId}/${topicId}`,
				topicListUpdate
			)
			.then((response) => {
				if (response && response.data) {
					console.log("Category updated successfully");
					// Close the modal after successful update
					// $("#myModal1").modal("hide");
					fetchData();

					toast("Topic Updated Successfully", {
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
				} else {
					console.error("Invalid response or data:", response);
				}
			});
		// 		.catch((error) => {
		// 			console.error(
		// 				"Error updating category:",
		// 				error.response ? error.response.data : error.message
		// 			);
		// 		});
		// }
	};
	const GotohandleViewClick = (data) => {
		let Updatedfields = {
			category: data.Category,
			description: data.description,
			name: data.TopicName,
			categoryId: data._id,
			topicId: data.categoryId,
		};
		delete data["ACTION"];
		setTopicListUpdate(Updatedfields);
		// setUpdateModalOpen(true);
	};
	console.log(topicListUpdate);
	const columns = [
		{ field: "SNO", headerName: "S.No", width: 200 },
		{ field: "Category", headerName: "Category", width: 250 },
		{ field: "TopicName", headerName: "Topic Name", width: 280 },
		{ field: "Tests", headerName: "Tests", width: 250 },
		{
			field: "ACTION",
			headerName: "Action",
			width: 587,
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
			{filteredData && filteredData.length <= 0 ? (<div></div>):(
			<button
				className=" btn-dark"
				style={{
					borderRadius: "4px",
					padding: "5px",
					marginRight: "5px",
					border: "none",
				}}
				onClick={() =>
					navigate("/PracticeTopicAccess", {
						state: {
							TopicName: blog.TopicName,
							topicId: blog._id,
							CategoryId: blog.categoryId,
						},
					})
				}

			>
				Access
			</button>
			)}
		</div>
	);
	console.log(topic);
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
		 rows = filteredData.flatMap((blog, index) =>
		(blog?.Practicetopic || []).map((each, index) => ({
			id: ++cnt,
			SNO: cnt,
			Category: blog.name,
			TopicName: each.topicName,
			Tests: each?.Testtopic.length,
			description: each.topicdescription,
			_id: blog._id,
			categoryId: each._id,
			ACTION: renderActionButtons(blog),
		}))
	);
	}
	return (
		<div>
			<ToastContainer />
			<div className="container-fluid">
				<div className="row">
					{isOpen && (
						<div className=" col-12 col-lg-3 col-md-12 sectioncard121">
							<Sidebar />
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
							<>
								<div>
									<i
										className="fa-solid fa-bars bars  d-lg-block d-none"
										onClick={toggleSidebar}
									></i>
								</div>
								<div className="">
									<div className="row">
										<div className="col-md-12 text-center">
											<h4 className="" style={{ color: "#16c3ea" }}>
												Access
											</h4>
										</div>
										<div className="col-md-4 d-flex">
											<label className="mr-2 mt-2">Search: </label>
											<input
												type="text"
												className="form-control"
												//   value={searchQuery}
												placeholder="Search by name"
												onChange={handleInputChange}
											/>
										</div>
										<div className="col-md-3"></div>
										<div className="col-md-3"></div>
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
								</div>{" "}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Topics;
