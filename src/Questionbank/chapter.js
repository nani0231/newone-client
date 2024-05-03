import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Audio } from "react-loader-spinner";
import apiList from "../liberary/apiList";

const Chapter = () => {
	useEffect(() => {
		fetchblogs1();
		fetchSubjects();
	}, []);

	const [Open, setOpen] = useState(true);

	const [blogslist, setBlogslist] = useState([]);

	let navigate = useNavigate("");

	const fetchblogs1 = async () => {
		const api = "http://localhost:3051/allchapterData";
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setBlogslist(response.data);
			setWorksheetLoading(false);
		} catch (error) {
			console.error("Error fetch blogs:", error);
			setWorksheetLoading(false);
		}
	};

	const [name1, setname1] = useState("");
	const [Description1, setDescription1] = useState("");
	const [subjecttag1, setsubjecttag1] = useState("");
	const [chaptertag, setchaptertag] = useState("");
	const [data1, setData1] = useState("");
	const [subjectId, setSubjectId] = useState([]);
	const [chapterListUpdate, setChapterListUpdate] = useState({});
	const [worksheetLoading, setWorksheetLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");

	console.log(chapterListUpdate);
	const handleEditInputChange = (value, name) => {
		console.log(value, name);
		setChapterListUpdate({
			...chapterListUpdate,
			[name]: value,
		});
	};
	console.log("chapterListUpdate", chapterListUpdate);
	const onSubmitForm = async (e) => {
		e.preventDefault();

		if (name1 && Description1 && subjecttag1 && chaptertag !== "") {
			try {
				const AddChapter = {
					Name: name1,
					Description: Description1,
					subject: subjecttag1,
					ChapterTag: chaptertag,
				};
				console.log(AddChapter);
				const response = await axios.post(
					`${apiList.addchapter}/${subjectId}`,
					AddChapter
				);

				setData1(response.data);
				console.log(response.data);
				if (response.status === 200) {
					toast("Chapter Added Successfully", {
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
					fetchblogs1();
					fetchSubjects();
					setTimeout(function () {}, 3000);
				}
			} catch (error) {
				// Handle error and display appropriate notifications
				console.log(error);
			}
		} else {
			toast("please fill in all fields", {
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

	const [Error, setError] = useState("");

	const handleDelete = async (subjectid, chapterid) => {
		try {
			console.log("Deleting subject with ID", subjectid, chapterid);
			const response = await axios.delete(
				`${apiList.deleteChapter}/${subjectid}/${chapterid}`
			);
			if (response.status === 200) {
				toast("Chapter Delete Successfully", {
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
				fetchSubjects();
				fetchblogs1();
				setTimeout(function () {}, 3000);
			} else {
				setError("An error occured while deleting subject.");
			}
		} catch (error) {
			setError("An error occured while deleting the subject.");
		}

		const created = () => {
			setOpen(!Open);
		};
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
	const [allSubjects, setAllSubjects] = useState([]);

	const fetchSubjects = async () => {
		const api = `${apiList.subjects}`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setAllSubjects(response.data);
			setAllChapters(response.data);
			setFilteredsubjectData(response.data);
			setWorksheetLoading(false);
			// setBlogslist(response.data);
		} catch (error) {
			console.error("Error fetch blogs:", error);
			setWorksheetLoading(false);
		}
	};

	const onSubmitUpdatedForm = (subid, chapid, e) => {
		e.preventDefault();
		console.log(chapterListUpdate);
		axios
			.put(`${apiList.updateChapter}/${subid}/${chapid}`, chapterListUpdate)
			.then((response) => {
				if (response.status === 200) {
					toast("Chapter Updated successfully", {
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
					setname1("");
					setDescription1("");
					setChapters("");
					fetchblogs1();
					fetchSubjects();
					setTimeout(function () {}, 3000);
				}
			})
			.catch((error) => {
				console.log(error);
				toast("Chapter already Updated", {
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
			});
	};
	const [searchTerm, setSearchTerm] = useState("");
	const [chapters, setChapters] = useState([]);
	const [allChapters, setAllChapters] = useState([]);
	console.log(allChapters, "allchapters");
	console.log(allSubjects);
	const filterChapters = (selectedSubjectId) => {
		const filteredChapters = allSubjects?.filter(
			(subject) =>
				subject._id === selectedSubjectId && subject.chapter.length > 0
		);
		console.log("Filtered Data:", filteredChapters);
		setAllChapters(filteredChapters);
	};

	const clearFilter = (e) => {
		setAllChapters([]);
		setSelectedSubjectId("");
		setFilteredsubjectData([]);
		filterChapters("");
		fetchSubjects();

		// Reset to the original list of chapters
	};

	const getAllChapters = (id) => {
		// Log all chapters to the console
		console.log("Filtered Data:", allSubjects);
		setAllChapters(allSubjects);
	};
	const [selectedSubjectId, setSelectedSubjectId] = useState([]);
	const [selectedChapterId, setSelectedChapterId] = useState([]);
	const [filteredsubjectData, setFilteredsubjectData] = useState([]);

	const handleSubjectTagTypeSelection = (event) => {
		setsubjecttag1(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
		setSubjectId(
			event.target.options[event.target.selectedIndex].getAttribute("value")
		);
		setSelectedSubjectId(
			event.target.options[event.target.selectedIndex].getAttribute("value")
		);
		handleEditInputChange(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			),
			"subject"
		);

		// console.log("Filtered Data 1:", result);
		// setTimeout(() => {
		//   setFilteredsubjectData(result || [])
		// }, 10);
	};
	const handleChapterTagTypeSelection = (event) => {
		handleEditInputChange(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			),
			"ChapterTag"
		);
		setchaptertag(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
		setSelectedChapterId(
			event.target.options[event.target.selectedIndex].getAttribute("value")
		);
	};
	const [selectedChapterData, setSelectedChapterData] = useState(null);

	const GotohandleViewClick = (data) => {
		let Updatedfields = {
			Name: data.CHAPTERNAME,
			Description: data.description,
			subject: data.SUBJECTNAME,
			ChapterTag: data.CHAPTERTAG,
			subjectid: data.subjectid,
			chapterid: data.chapterid,
		};
		setSelectedChapterData(data);
		delete data["ACTION"];
		setChapterListUpdate(Updatedfields);
		// setUpdateModalOpen(true);
	};
	console.log("selectedChapterData", selectedChapterData);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [deletesubjectid, setsubjectDeleteid] = useState("");
	const [deletechapterid, setchapterDeleteid] = useState("");

	const idpassingfordelete = (subjectid, chapterid) => {
		setsubjectDeleteid(subjectid);
		setchapterDeleteid(chapterid);
	};

	const handleSearch = () => {
		let filtered;

		filtered = allChapters;

		if (searchQuery) {
			filtered = allChapters.filter((blog) =>
				blog.chapter.some((each) =>
					each.Name.toLowerCase().includes(searchQuery.toLowerCase())
				)
			);
		}

		setFilteredData(filtered);
	};
	useEffect(() => {
		handleSearch();
	}, [allChapters]);

	const handleInputChange = (e) => {
		const term = e.target.value;
		setSearchQuery(term);

		let filtered;

		filtered = allChapters;

		if (term) {
			filtered = filtered.filter((blog) =>
				blog.chapter.some((each) =>
					each.Name.toLowerCase().includes(term.toLowerCase())
				)
			);
			//   setFilteredData(filtered);
		}

		// setAllChapters(filtered);
		setFilteredData(filtered.length ? filtered : []);
	};
	const [filteredData, setFilteredData] = useState(allChapters);

	const columns = [
		{ field: "SNO", headerName: "S.No", width: 100 },
		{ field: "SUBJECTNAME", headerName: "Subject Name", width: 240 },
		{ field: "CHAPTERTAG", headerName: "Chapter Tag", width: 240 },
		{ field: "CHAPTERNAME", headerName: "Chapter Name", width: 200 },
		{ field: "TOTALQUESTION", headerName: "Total Questions", width: 160 },
		{
			field: "ACTION",
			headerName: "Actions",
			width: 527,
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
			{" "}
			<>
				{filteredData && filteredData.length > 0 ? (
					<div>
						<i
							className="fa-solid fa-pencil pencile"
							data-bs-toggle="modal"
							data-bs-target="#myModalView"
							onClick={() => {
								setIsModalOpen(true);
								GotohandleViewClick(blog);
							}}
						></i>
						<i
							className="fa-solid fa-trash delete mb-1"
							data-toggle="modal"
							data-target="#myModalDelete"
							onClick={() => idpassingfordelete(blog.subjectid, blog.chapterid)}
						></i>
					</div>
				) : (
					<div></div>
				)}
			</>
		</div>
	);
	let rows = [];
	var cnt = 0;
	if (filteredData && filteredData.length <= 0) {
		rows = [
			{
				id: 1,
				SNO: "",
				SUBJECTNAME: "",
				CHAPTERTAG: "No Data",
				CHAPTERNAME: "",
				TOTALQUESTION: "",
				ACTION: "", // You may modify this based on your requirements
			},
		];
	} else {
		rows = filteredData.flatMap((blog) =>
			(blog?.chapter || []).map((each, index) => ({
				id: ++cnt,
				SNO: cnt,
				SUBJECTNAME: blog.name || "",
				CHAPTERTAG: each.ChapterTag || "",
				CHAPTERNAME: each.Name || "",
				TOTALQUESTION:
					(each.MCQ || []).length +
					(each.codingbasic || []).length +
					(each.paragMCQ || []).length,
				ACTION: renderActionButtons(blog),
				subjectid: blog._id,
				chapterid: each._id,
				description: blog.Description,
			}))
		);
	}

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
								<i
									className="fa-solid fa-bars bars d-lg-block d-none"
									onClick={toggleSidebar}
								></i>
								<div className="">
									<div className="row">
										<div className="col-md-12 text-center">
											<h3 className="" style={{color:"#16c3ea"}}>Chapters</h3>
										</div>
										<div className="">
											<div class="row">
												<div className="col-md-4 mt-2">
													<select
														style={{ padding: "5px" }}
														className="w-100 select_item form-control"
														onChange={handleSubjectTagTypeSelection}
													>
														<option className="hidden" value="">
															Select Subject Name
														</option>
														{filteredsubjectData?.map((eachsubject) => (
															<>
																<option
																	className="name_item"
																	key={eachsubject._id} // Use a unique key for each option
																	data-value={eachsubject.name}
																	value={eachsubject._id}
																>
																	{eachsubject.name}
																</option>
															</>
														))}
													</select>
												</div>
												<div className="col-md-1 col-2 mt-2">
													<button
														className="btn btn-secondary go_item"
														onClick={() => filterChapters(selectedSubjectId)}
													>
														Search
													</button>
												</div>
												<div className="col-md-2 col-4 mt-2 text-center">
													<button
														className="btn btn-secondary go_item"
														onClick={(e) => clearFilter(e)}
													>
														Clear Filter
													</button>
												</div>
												<div className="col-md-3 col-6 mt-2">
													<button
														className="btn btn-secondary go_item"
														onClick={() => getAllChapters(allSubjects._id)}
													>
														Get All Chapters
													</button>
												</div>
											</div>
											<div class=" row mt-4">
											
												<div className="col-md-4 d-flex">
												<label className="mt-1 mr-1" style={{fontWeight:"500"}}>Search: </label>
													<input
														type="text"
														className="form-control"
														value={searchQuery}
														placeholder="Search by Chapter Name"
														onChange={(e) => handleInputChange(e)}
													/>
												</div>
												<div className="col-md-4"></div>

												<div className="col-md-4 text-end">
													<button
														type="button"
														class="btn "
														data-bs-toggle="modal"
														data-bs-target="#myModal234565"
														className="float-right btn btn-danger"
														style={{
															backgroundColor: "#16c3ea",
															color: "#000",
														}}
													>
														+Create Chapter
													</button>
												</div>
												

												<div class="modal" id="myModal234565">
													<div class="modal-dialog">
														<div class="modal-content">
															<div class="modal-header">
																<h4 class="modal-title">Create Chapter</h4>

																<button
																	type="button"
																	class="btn-close"
																	data-bs-dismiss="modal"
																	style={{
																		marginTop: "-35px",
																		marginRight: "-40px",
																		backgroundColor: "#fff",
																		borderRadius: "100%",
																		// padding: "6px 12px 6px 12px",
																		// height: "40px",
																		// fontSize: "20px",
																	}}
																></button>
															</div>
															<div class="modal-body">
																<form onSubmit={onSubmitForm}>
																	<label style={{ fontWeight: "600" }}>
																		Name <sup className="star">*</sup>
																	</label>
																	<input
																		className="form-control"
																		type="text"
																		placeholder="Name"
																		onChange={(e) => setname1(e.target.value)}
																		value={name1}
																	/>

																	<label
																		style={{ fontWeight: "600" }}
																		className="mt-3"
																	>
																		Description <sup className="star">*</sup>
																	</label>
																	<input
																		className="form-control"
																		type="text"
																		placeholder="Description"
																		onChange={(e) =>
																			setDescription1(e.target.value)
																		}
																		value={Description1}
																	/>
																	<br></br>
																	<label style={{ fontWeight: "600" }}>
																		Subject Tag <sup className="star">*</sup>
																	</label>
																	<select
																		className="w-100 select_item form-control"
																		onChange={handleSubjectTagTypeSelection}
																	>
																		<option className="hidden" value="">
																			Select subject Name
																		</option>
																		{allSubjects?.map((subject) => (
																			<>
																				<option
																					className="name_item"
																					key={subject._id} // Use a unique key for each option
																					data-value={subject.name}
																					value={subject._id}
																				>
																					{subject.name}
																				</option>
																			</>
																		))}
																	</select>

																	<br></br>

																	<label style={{ fontWeight: "600" }}>
																		Chapter Tag <sup className="star">*</sup>
																	</label>

																	<select
																		className="form-control"
																		value={chaptertag}
																		onChange={handleChapterTagTypeSelection}
																	>
																		<option>select subjects</option>
																		<option data-value="C-Programmer">
																			C-Programmer
																		</option>
																		<option data-value="C++">C++</option>
																		<option data-value="DataStructures">
																			DataStructures
																		</option>
																		<option data-value="Dbms">Dbms</option>
																		<option data-value="Java-programming">
																			Java-programming
																		</option>
																		<option data-value="Others">Others</option>
																		<option data-value="Programming">
																			Programming
																		</option>
																	</select>

																	<div className="modal-footer">
																		<button
																			type="submit"
																			className="btn btn-danger"
																			data-bs-dismiss="modal"
																			style={{
																				backgroundColor: "#16c3ea",
																				color: "#000",
																			}}
																		>
																			Submit
																		</button>
																	</div>
																</form>
															</div>
														</div>
													</div>
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
											<div class="modal" id="myModalView">
												<div class="modal-dialog">
													<div class="modal-content">
														<div class="modal-header">
															<h4 class="modal-title">Update Chapter</h4>

															<button
																type="button"
																class="btn-close"
																data-bs-dismiss="modal"
																style={{
																	marginTop: "-35px",
																	marginRight: "-40px",
																	backgroundColor: "#fff",
																	borderRadius: "100%",
																	// padding: "6px 12px 6px 12px",
																	// height: "40px",
																	// fontSize: "20px",
																}}
															></button>
														</div>
														<div class="modal-body">
															<form>
																<label
																	style={{ float: "left", fontWeight: "600" }}
																>
																	Subject Name Tag <sup className="star">*</sup>
																</label>
																<input
																	style={{ padding: "5px" }}
																	name="subject"
																	value={chapterListUpdate.subject}
																	className="form-control"
																	disabled
																/>
																<br />
																<label
																	style={{ float: "left", fontWeight: "600" }}
																>
																	Chapter Name <sup className="star">*</sup>
																</label>
																<input
																	className="form-control"
																	type="text"
																	name="Name"
																	placeholder="...ChapterName..."
																	onChange={(e) =>
																		handleEditInputChange(
																			e.target.value,
																			"Name"
																		)
																	}
																	value={chapterListUpdate?.Name || ""}
																/>
																<label
																	style={{ float: "left", fontWeight: "600" }}
																	className="mt-3"
																>
																	Chapter Tag <sup className="star">*</sup>
																</label>
																<select
																	type="text"
																	className="form-control"
																	name="ChapterTag"
																	value={
																		chaptertag || chapterListUpdate?.ChapterTag
																	}
																	onChange={handleChapterTagTypeSelection}
																>
																	<option>--select Chapter Tag--</option>
																	<option data-value="C-programming">
																		C-programming
																	</option>
																	<option data-value="Communication">
																		Communication
																	</option>
																	<option data-value="Data-structres">
																		Data-structures
																	</option>
																	<option data-value="Dbms">Dbms</option>
																	<option data-value="java-programming">
																		java-programming
																	</option>
																	<option data-value="others">others</option>
																	<option data-value="programming">
																		programming
																	</option>
																	<option data-value="programming Skills">
																		programming Skills
																	</option>
																</select>

																<label
																	style={{ float: "left", fontWeight: "600" }}
																	className="mt-3"
																>
																	Description <sup className="star">*</sup>
																</label>
																<input
																	className="form-control"
																	type="text"
																	name="Description"
																	placeholder="...description..."
																	onChange={(e) =>
																		handleEditInputChange(
																			e.target.value,
																			"Description"
																		)
																	}
																	value={chapterListUpdate?.Description || ""}
																/>

																<div className="modal-footer">
																	<button
																		type="button"
																		className="btn btn-danger"
																		data-bs-dismiss="modal"
																		style={{
																			backgroundColor: "#16c3ea",
																			color: "#000",
																		}}
																		onClick={(e) =>
																			onSubmitUpdatedForm(
																				chapterListUpdate?.subjectid,
																				chapterListUpdate?.chapterid,
																				e
																			)
																		}
																	>
																		Submit
																	</button>
																</div>
															</form>
														</div>
													</div>
												</div>
											</div>
											<div class="modal" id="myModal">
												<div class="modal-dialog">
													<div class="modal-content">
														<div class="modal-header">
															<h4 class="modal-title">Delete Subject</h4>
															<button
																type="button"
																class="btn-close"
																data-bs-dismiss="modal"
																style={{
																	marginTop: "-35px",
																	marginRight: "-40px",
																	backgroundColor: "#fff",
																	borderRadius: "100%",
																	// padding: "6px 12px 6px 12px",
																	// height: "40px",
																	// fontSize: "20px",
																}}
															></button>
														</div>

														<div class="modal-body">
															Are Sure Delete this subject
														</div>

														<div class="modal-footer">
															<p>No</p>
															<button
																type="button"
																class="btn btn-danger"
																data-bs-dismiss="modal"
																onClick={() =>
																	handleDelete(allSubjects._id, allChapters._id)
																}
															>
																Yes
															</button>
														</div>
													</div>
												</div>
											</div>

											<div class="modal" id="myModalDelete">
												<div class="modal-dialog">
													<div class="modal-content">
														<div class="modal-header">
															<h4 class="modal-title">Delete Chapter</h4>
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
																Would you like to delete Chapter ?{" "}
															</p>
														</div>
														<div class="modal-footer d-flex justify-content-end">
															<button
																type="button"
																class="btn_yes "
																data-dismiss="modal"
																onClick={() =>
																	handleDelete(deletesubjectid, deletechapterid)
																}
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
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Chapter;
