import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Audio } from "react-loader-spinner";
import apiList from "../liberary/apiList";

const Practicecategory = () => {
	useEffect(() => {
		fetchblogs2();
	}, []);
	const [Open, setOpen] = useState(false);
	// const [isLoading, setIsLoading] = useState(true);

	const [blogslist, setBlogslist] = useState([]);
	// const [worksheetLoading, setWorksheetLoading] = useState(true);

	console.log(blogslist);
	let navigate = useNavigate("");

	// const GotoAccess = () => {
	// 	navigate("/access"
	// }

	const fetchblogs2 = async () => {
		const api = `${apiList.allpractices}`;
		try {
			const response = await axios.get(api, {});
			setBlogslist(response.data.data);
			setFilteredData(response.data.data);
			console.log(response.data);
			setWorksheetLoading(false);
		} catch (error) {
			console.error("Error fetch blogs:", error);
			setWorksheetLoading(false);
		}
	};
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [tag, setTag] = useState("");
	const [accesstype, setAccesstype] = useState("");
	const [accessplan, setAccessplan] = useState("");
	const [formVisible, setFormVisible] = useState(false);
	const [data2, setData2] = useState("");
	const [worksheetLoading, setWorksheetLoading] = useState(true);
	const [filteredData, setFilteredData] = useState([]);
	const handleInputChange = (e) => {
		const term = e.target.value;

		let filtered;
		filtered = blogslist;

		if (term) {
			filtered = filtered.filter((blog) =>
				blog.name.toLowerCase().includes(term.toLowerCase())
			);
		}

		setFilteredData(filtered.length ? filtered : []);
	};

	const handleTagTypeSelection = (event) => {
		setTag(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
	};

	const handleAccessTypeSelection = (event) => {
		setAccesstype(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
	};
	const handleAccessplanSelection = (event) => {
		setAccessplan(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();
		if (name && description && tag && accesstype && accessplan !== "") {
			// setFormVisible(false);

			try {
				const AddCategory = {
					name: name,
					description: description,
					tag: tag,
					accesstype: accesstype,
					accessplan: accessplan,
				};
				console.log(AddCategory);
				const response = await axios.post(`${apiList.practices}`, AddCategory);
				setData2(response.data);
				console.log(response.data);
				if (response.status === 200) {
					toast("Category Added Successfully", {
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
					// window.location("/categories")
					// setUpdateModalOpen(false);
					setTimeout(function () {}, 3000);

					fetchblogs2();
				}
				// setFormVisible(false);
			} catch (error) {
				console.log(error);
			}
		} else {
			toast("Please fill in all fields", {
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
	};
	console.log("data2");
	const [Error, setError] = useState("");
	const handleDelete = async (id) => {
		try {
			if (!id) {
				setError("Invalid ID provided for delete");
				return;
			}
			console.log("Deleting Category with ID", id);
			const response = await axios.delete(`${apiList.practicelist}/${id}`);
			if (response.status === 200) {
				toast("Category Delete Successfully", {
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
				// setName("");
				// setDescription("");
				// setTag("");
				// setAccesstype("");
				// setAccessplan("");
				setFormVisible(false);
				fetchblogs2();
			} else {
				setError("An error occured while deleting Category.");
			}
		} catch (error) {
			setError("An error occured while deleting the Category.");
		}

		const created = () => {
			setOpen(!Open);
		};
	};

	const onSubmitUpdatedForm = (_id, e) => {
		e.preventDefault();
		// setFormVisible(false);
		const AddCategory = {
			name: name,
			description: description,
			tag: tag,
			accesstype: accesstype,
			accessplan: accessplan,
		};
		const nonemptyuserData = Object.fromEntries(
			Object.entries(AddCategory).filter(([key, value]) => value !== "")
		);
		axios
			.put(`${apiList.practicesupdate}/${_id}`, nonemptyuserData)
			.then((response) => {
				if (response.status === 200) {
					const updatedCategory = response.data;
					toast("Category Updated successfully", {
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
					console.log("Updated Category:", updatedCategory);
					// window.location("/categories")
					// setOpen(false);
					// setUpdateModalOpen(false);
					fetchblogs2();
				}
			})
			.catch((error) => {
				console.log(error.response.data);
				toast.error("Category not Updated");
			});
	};

	// const onSubmitUpdatedForm = (_id, e) => {
	// 	e.preventDefault();
	// 	const AddCategory = {
	// 	  name: name,
	// 	  description: description,
	// 	  tag: tag,
	// 	  accesstype: accesstype,
	// 	  accessplan: accessplan,
	// 	};

	// 	const nonemptyuserData = Object.fromEntries(
	// 	  Object.entries(AddCategory).filter(([key, value]) => value !== "")
	// 	);

	// 	axios.put(`/${_id}`, nonemptyuserData)
	// 	  .then((response) => {
	// 		if (response.status === 200) {
	// 		  toast("Category Updated successfully", {
	// 			// ... (your toast configuration)
	// 		  });

	// 		  // Update the local state with the updated category
	// 		  setBlogslist(prevCategories => {
	// 			const updatedCategories = prevCategories.map(category => {
	// 			  if (category._id === _id) {
	// 				return { ...category, ...nonemptyuserData };
	// 			  }
	// 			  return category;
	// 			});
	// 			return updatedCategories;
	// 		  });

	// 		  // Close modal or perform other actions if needed
	// 		  // setUpdateModalOpen(false);
	// 		}
	// 	  })
	// 	  .catch((error) => {
	// 		console.log(error.response.data);
	// 		toast.error("Category not Updated");
	// 	  });
	//   }

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
	const [deleteid, setDeleteid] = useState("");

	const idpassingfordelete = (id) => {
		setDeleteid(id);
	};
	const columns = [
		{ field: "SNO", headerName: "S.No", width: 220 },
		{ field: "NAME", headerName: "Name", width: 300 },
		{ field: "TOPICS", headerName: "Topics", width: 300 },
		// { field: "CHAPTERS", headerName: "CHAPTERS", width: 170 },
		// { field: "ACCESSPLAN", headerName: "Access Plan", width: 250 },

		{
			field: "ACTION",
			headerName: "Actions",

			width: 557,
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
				<>
			<button
				onClick={() =>
					navigate(`/CategoriesAccess`, {
						state: { CategoryTitle: blog.NAME, CategoryId: blog._id },
					})
				}
				type="button"
				className=" btn-dark"
				style={{
					borderRadius: "4px",
					padding: "5px",
					marginRight: "5px",
					border: "none",
				}}
			>
				Access
			</button>
			</>
			)}
		</div>
	);
	let rows = [];
	if (filteredData && filteredData.length <= 0) {
		rows = [
			{
				id: 1,
				SNO: "No Data",
			},
		];
	} else {
		rows = filteredData.map((blog, index) => ({
			id: index + 1, // Add this line to include a unique id for each row
			SNO: index + 1,
			NAME: blog.name,
			TOPICS: blog?.Practicetopic.length,
			_id: blog._id,
			ACTION: renderActionButtons(blog),
		}));
	}

	const [selectedCategory, setSelectedCategory] = useState(null);
	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
	console.log(selectedCategory);

	const handleTagSelection = (event) => {
		setTag(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
	};
	const handleAccessSelection = (event) => {
		setAccesstype(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
	};
	const handleAccessplanTypeSelection = (event) => {
		setAccessplan(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
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
							<div className=" ">
								<div className=" d-lg-block">
									<i
										className="fa-solid fa-bars bars d-lg-block d-none"
										onClick={toggleSidebar}
									></i>
									<div className="">
										<div class=" row">
											<div className="col-md-12 text-center">
												<h3 className="" style={{ color: "#16c3ea" }}>
													Access
												</h3>
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
											<div className="col-md-4"></div>
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
										<div
											class="modal"
											id="myModalView"
											style={{ display: isUpdateModalOpen ? "block" : "none" }}
										>
											<div class="modal-dialog">
												<div class="modal-content">
													<div class="modal-header">
														<h4 class="modal-title">Update Category</h4>
														<button
															type="button"
															class="btn-close"
															data-bs-dismiss="modal"
															style={{
																marginTop: "-35px",
																marginRight: "-40px",
																backgroundColor: "#fff",
																borderRadius: "100%",
															}}
														></button>
													</div>
													<div class="modal-body">
														<div className="mb-1">
															<label style={{ float: "left" }}>
																Name<sup className="star">*</sup>
															</label>
															<input
																type="text"
																className="form-control"
																placeholder="Name"
																value={name || selectedCategory?.NAME}
																onChange={(e) => setName(e.target.value)}
															/>
														</div>
														<div className="mb-1">
															<label style={{ float: "left" }}>
																Description
																<sup className="star">*</sup>
															</label>
															<input
																type="text"
																className="form-control"
																placeholder="Description"
																value={
																	description || selectedCategory?.DESCRIPTION
																}
																onChange={(e) => setDescription(e.target.value)}
															/>
														</div>
														<label className="mt-3 " style={{ float: "left" }}>
															Tag <sup className="star">*</sup>
														</label>
														<select
															type="text"
															className="form-control"
															placeholder="...tag..."
															value={tag || selectedCategory?.TAG}
															onChange={handleTagSelection}

															// onChange={}
														>
															<option data-value="App Developement">
																App Developement
															</option>
															<option data-value="Banking">Banking</option>
															<option data-value="Aptitude">Aptitude</option>
															<option data-value="Biology">Biology</option>
														</select>
														<p></p>
														<label className="mt-3 " style={{ float: "left" }}>
															Accesstype <sup className="star">*</sup>
														</label>
														<select
															type="text"
															className="form-control"
															placeholder="... ACCESSTYPE..."
															value={accesstype || selectedCategory?.ACCESSTYPE}
															onChange={handleAccessSelection}

															// onChange={}
														>
															<option data-value="All">All</option>
															<option data-value="Restricted">
																Restricted
															</option>
														</select>
														<p></p>
														<label className="mt-3 " style={{ float: "left" }}>
															Accessplan <sup className="star">*</sup>
														</label>
														<select
															type="text"
															className="form-control"
															placeholder="... ACCESSPLAN..."
															value={accessplan || selectedCategory?.ACCESSPLAN}
															onChange={handleAccessplanTypeSelection}

															// onChange={}
														>
															<option data-value="Free">Free</option>
															<option data-value="Paid">Paid</option>
														</select>
														<p></p>
													</div>

													<div class="modal-footer">
														<button
															type="button"
															class="btn"
															style={{
																backgroundColor: "#16c3ea",
																color: "#000",
															}}
															onClick={(e) =>
																onSubmitUpdatedForm(selectedCategory?._id, e)
															}
														>
															Update
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
									<></>
								</div>

								<div class="modal" id="myModalDelete">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<h4 class="modal-title">Delete Category</h4>
												<button
													type="button"
													class="close"
													data-dismiss="modal"
												>
													&times;
												</button>
											</div>
											<div class="modal-body" style={{ textAlign: "start" }}>
												<p
													style={{
														fontSize: "18px",
														fontWeight: "500",
													}}
												>
													Would you like to delete Category ?{" "}
												</p>
											</div>
											<div class="modal-footer d-flex justify-content-end">
												<button
													type="button"
													class="btn_yes "
													data-dismiss="modal"
													onClick={() => handleDelete(deleteid)}
												>
													Yes
												</button>
												<button
													type="button"
													class="btn_no"
													data-dismiss="modal"
												>
													No
												</button>
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

export default Practicecategory;
