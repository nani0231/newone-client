import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Sidebar from "../Sidebar";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import apiList from "../liberary/apiList";
import { Category } from "@mui/icons-material";

const Categories = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [itisLoading, setItisLoading] = useState(true);

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
	const [categories, setCategories] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [name, setname] = useState("");
	const [description, setdescription] = useState("");
	const [tag, settag] = useState([]);
	const [accesstype, setaccesstype] = useState([]);
	const [accessplan, setaccessplan] = useState([]);
	const [display, setdisplay] = useState([]);
	const onSubmitForm = (e) => {
		e.preventDefault();
		if (name && description && tag && accesstype && accessplan && display !== "") {
			const newCategory = {
				name: name,
				description: description,
				tag: tag,
				accesstype: accesstype,
				accessplan: accessplan,
				display: display,
			};
			axios
				.post(`${apiList.categories}`, newCategory)
				.then((response) => {
					console.log(response);
					if (response.status === 200) {
						console.log("Category Added Successfully");
						console.log("hello");
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
						fetchData();
						setname("");
						setdescription("");
						settag("");
						setaccesstype("");
						setaccessplan("");
						setdisplay("");
					}
				})
				.catch((error) => {
					console.log(error.response.data);
				});
		} else {
			toast("Required all Fields", {
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
					setFilteredData(response.data);
					setItisLoading(false);
				} else {
					console.error("Invalid response or data:", response);
				}
			})
			.catch((error) => {
				console.error("Error fetching categories:", error.response.data);
			});
	};
	const [selectedCategory, setSelectedCategory] = useState(null);
	const onEditCategory = (category) => {
		axios
			.get(`${apiList.categories}/${category._id}`)
			.then((response) => {
				if (response && response.data !== undefined) {
					const { name, description, tag, accesstype, accessplan, display } =
						response.data;
					setname(name);
					setdescription(description);
					settag(tag);
					setaccesstype(accesstype);
					setaccessplan(accessplan);
					setdisplay(display);
					setSelectedCategory(response.data);
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
	};
	const onDeleteCategory = (id) => {
		console.log(id);
		axios
			.delete(`${apiList.categories}/${id}`)
			.then((response) => {
				if (response.status === 200) {
					console.log("Category deleted successfully");
					toast("Category Deleted Successfully", {
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
					setCategories((prevCategories) =>
						prevCategories.filter((category) => category._id !== id)
					);
				}
			})
			.catch((error) => {
				console.error("Error deleting category:", error.response.data);
			});
	};
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredCategories, setFilteredCategories] = useState([]);
	const onSearchInputChange = (e) => {
		const term = e.target.value;
		setSearchTerm(term);
		const filtered = categories.filter((category) =>
			category.name.toLowerCase().includes(term.toLowerCase())
		);

		setFilteredCategories(filtered);
	};
	useEffect(() => {
		return () => {
			mountedRef.current = false;
		};
	}, []);
	const onUpdateCategory = () => {
		if (selectedCategory) {
			const updatedData = {
				name,
				description,
				tag,
				accesstype,
				accessplan,
				display,
			};

			axios
				.put(`${apiList.categories}/${selectedCategory._id}`, updatedData)
				.then((response) => {
					if (response && response.data) {
						console.log("Category updated successfully");
						// $("#myModal1").modal("hide");
						fetchData();

						toast("Category Updated Successfully", {
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
				})
				.catch((error) => {
					console.error(
						"Error updating category:",
						error.response ? error.response.data : error.message
					);
				});
		}
	};

	const handleInputChange = (e) => {
		const term = e.target.value;

		let filtered;
		filtered = categories;

		if (term) {
			filtered = filtered.filter((blog) =>
				blog.name.toLowerCase().includes(term.toLowerCase())
			);
		}

		setFilteredData(filtered.length ? filtered : []);
	};
	const [deleteid, setDeleteid] = useState("");
	const idpassingfordelete = (id) => {
		setDeleteid(id);
	};
	const columns = [
		{ field: "SNO", headerName: "S.No", width: 90 },
		{ field: "NAME", headerName: "Name", width: 240 },
		{ field: "ACCESSTYPE", headerName: "AccessType", width: 200 },
		{ field: "ASSESSMENT", headerName: "Assessment", width: 170 },
		{
			field: "DISPLAY",
			headerName: "Display",
			width: 170,
			renderCell: () => (
				<div class="form-check form-switch text-center">
			{filteredData && filteredData.length <= 0 ? (<div></div>):(
					<input class="form-check-input" type="checkbox" role="switch" />
			)}

				</div>
			),
		},

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

	const renderActionButtons = (category) => (
		<div>
			{filteredData && filteredData.length <= 0 ? (<div></div>):(
				<>
			<button
				className=" btn-dark" style={{borderRadius:"4px", padding:"5px", marginRight:"5px" , border:"none"}}
				onClick={() =>
					navigate(`/Assessmentaccess`, {
						state: { CategoryTitle: category.NAME, CategoryId: category._id },
					})
				}
			>
				Access
			</button>

			<i
				className="fa-solid fa-pencil pencile"
				data-toggle="modal"
				data-target="#myModal1"
				onClick={() => onEditCategory(category)}
			></i>
			<i
				className="fa-solid fa-trash delete"
				data-toggle="modal"
				data-target="#myModal2"
				onClick={() => idpassingfordelete(category._id)}
			></i>
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
		rows = filteredData.map((category, index) => ({
			id: index + 1, // Add this line to include a unique id for each row
			SNO: index + 1,
			NAME: category.name,
			ACCESSTYPE: category.accesstype,
			ASSESSMENT: category?.Assessment.length,
			_id: category._id,
			ACTION: renderActionButtons(category),
		}));
	}
	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					{isOpen && (
						<div className=" col-12 col-lg-3 col-md-12 sectioncard121">
							<Sidebar />
							<ToastContainer />
						</div>
					)}
					<div
						className={`my-3 col-12 col-md-${isOpen ? 12 : 10} col-lg-${
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
							<div>
								<i
									className="fa-solid fa-bars bars  d-lg-block d-none"
									onClick={toggleSidebar}
								></i>

								<div className="">
									<div class="row mb-3">
										<div className="col-md-12 text-center">
											<h3 className="" style={{color:"#16c3ea"}}>Categories</h3>
										</div>
										
										<div className="col-md-4 d-flex">
										<label className="mr-2 mt-1">Search: </label>
											<input
												type="text"
												className="form-control"
												//   value={searchQuery}
												placeholder="Search by name"
												onChange={handleInputChange}
											/>
										</div>
										<div className="col-md-4"></div>

										<div className="col-md-4 text-end">
											<button
												className="year float-right"
												data-toggle="modal"
												data-target="#myModal"
												style={{ backgroundColor: "#16c3ea", color: "#000" }}
											>
												{" "}
												+ Add Categories
											</button>
										</div>
										
										<div class="modal" id="myModal">
											<div class="modal-dialog">
												<div class="modal-content">
													<div class="modal-header">
														<h4 class="modal-title">Create Categories</h4>
														<button
															type="button"
															class="close"
															data-dismiss="modal"
														>
															&times;
														</button>
													</div>
													<div class="modal-body">
														<label style={{ fontWeight: "600" }}>
															Name <sup className="star">*</sup>
														</label>
														<input
															className="form-control"
															placeholder="Category Name"
															value={name}
															onChange={(e) => setname(e.target.value)}
														/>
														<label
															className="mt-2"
															style={{ fontWeight: "600" }}
														>
															Description <sup className="star">*</sup>
														</label>
														<textarea
															className="form-control"
															placeholder="Category Description"
															rows={4}
															value={description}
															onChange={(e) => setdescription(e.target.value)}
														></textarea>
														<div>
															<label
																className="mt-2"
																style={{ fontWeight: "600" }}
															>
																Tag <sup className="star">*</sup>
															</label>
															<select
																className="p-1 form-control"
																value={tag}
																onChange={(e) => settag(e.target.value)}
															>
																<option value="" hidden>
																	Select Tag
																</option>
																<option value="App Developement">
																	App Developement
																</option>
																<option value="Aptitude">Aptitude</option>
																<option value="Banking">Banking</option>
																<option value="Biology">Biology</option>
																<option value="BISAT">BISAT</option>
																<option value="CA-Final">CA-Final</option>
																<option value="CAT">CAT</option>
																<option value="Chemistry">Chemistry</option>
																<option value="CMA-Final">CMA-Final</option>
																<option value="CMA-Foundation">
																	CMA-Foundation
																</option>
															</select>
														</div>
														<div>
															<label
																className="mt-2"
																style={{ fontWeight: "600" }}
															>
																Access Type <sup className="star">*</sup>
															</label>
															<select
																className="p-1 form-control"
																value={accesstype}
																onChange={(e) => setaccesstype(e.target.value)}
															>
																<option value="" hidden>
																	Select Access Type
																</option>
																<option value="All">All</option>
																<option value="Restricted">Restricted</option>
															</select>
														</div>
														<div>
															<label
																className="mt-2"
																style={{ fontWeight: "600" }}
															>
																Access Plan <sup className="star">*</sup>
															</label>
															<select
																className="p-1 form-control"
																value={accessplan}
																onChange={(e) => setaccessplan(e.target.value)}
															>
																<option value="" hidden>
																	Select Access Plan
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
																Display <sup className="star">*</sup>
															</label>
															<select
																className="p-1 form-control"
																value={display}
																onChange={(e) => setdisplay(e.target.value)}
															>
																<option value="" hidden>
																	Select status
																</option>
																<option value="YES">YES</option>
																<option value="NO">NO</option>
															</select>
														</div>
													</div>
													<div class="modal-footer">
														<button
															type="button"
															class="btn btn-danger"
															data-dismiss="modal"
															onClick={onSubmitForm}
															style={{
																backgroundColor: "#16c3ea",
																color: "#000",
															}}
														>
															Submit
														</button>
													</div>
												</div>
											</div>
										</div>
										<div class="modal" id="myModal1">
											<div class="modal-dialog">
												<div class="modal-content">
													<div class="modal-header">
														<h4 class="modal-title">Update Categories</h4>
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
															Name{" "}
														</label>
														<input
															className="form-control"
															value={name}
															onChange={(e) => setname(e.target.value)}
														/>
														<label
															className="mt-2"
															style={{ fontWeight: "600" }}
														>
															Description{" "}
														</label>
														<textarea
															className="form-control"
															rows={4}
															value={description}
															onChange={(e) => setdescription(e.target.value)}
														></textarea>
														<div>
															<label
																className="mt-2"
																style={{ fontWeight: "600" }}
															>
																Tag
															</label>
															<select
																className="p-1 form-control"
																value={tag}
																onChange={(e) => settag(e.target.value)}
															>
																<option value="" hidden>
																	Tag
																</option>
																<option value="App Developement">
																	App Developement
																</option>
																<option value="Aptitude">Aptitude</option>
																<option value="Banking">Banking</option>
																<option value="Biology">Biology</option>
																<option value="BISAT">BISAT</option>
																<option value="CA-Final">CA-Final</option>
																<option value="CAT">CAT</option>
																<option value="Chemistry">Chemistry</option>
																<option value="CMA-Final">CMA-Final</option>
																<option value="CMA-Foundation">
																	CMA-Foundation
																</option>
															</select>
														</div>
														<div>
															<label
																className="mt-2"
																style={{ fontWeight: "600" }}
															>
																Access Type
															</label>
															<select
																className="p-1 form-control"
																value={accesstype}
																onChange={(e) => setaccesstype(e.target.value)}
															>
																<option value="" hidden>
																	Access Type
																</option>
																<option value="All">All</option>
																<option value="Restricted">Restricted</option>
															</select>
														</div>
														<div>
															<label
																className="mt-2"
																style={{ fontWeight: "600" }}
															>
																Access Plan
															</label>
															<select
																className="p-1 form-control"
																value={accessplan}
																onChange={(e) => setaccessplan(e.target.value)}
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
														</div>
													</div>
													<div class="modal-footer">
														<button
															type="button"
															class="btn btn-danger"
															data-dismiss="modal"
															onClick={onUpdateCategory}
															style={{
																backgroundColor: "#16c3ea",
																color: "#000",
															}}
														>
															update
														</button>
													</div>
												</div>
											</div>
										</div>

										<div class="modal" id="myModal2">
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
													<div
														class="modal-body"
														style={{ textAlign: "start" }}
													>
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
															onClick={() => onDeleteCategory(deleteid)}
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
								</div>

								<div className="mt-4" style={{ height: "auto", width: "100%" }}>
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
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Categories;
