import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { FaRegEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import { Audio } from "react-loader-spinner";
import apiList from "../liberary/apiList";

const ParagView = () => {
	const navigate = useNavigate();
	const [selectQuestionType, setSelectQuestionType] = useState("");
	const [selectedSubject, setSelectedSubject] = useState("");
	const [selectedChapter, setSelectedChapter] = useState("");
	const [selectedDifficulty, setSelectedDifficulty] = useState("");
	const [reference, setReferencce] = useState("");
	const [question, setQuestion] = useState("");
	const [option1, setOption1] = useState("");
	const [option2, setOption2] = useState("");
	const [option3, setOption3] = useState("");
	const [correctAnswer, setCorrectAnswer] = useState("");
	const [allquestionData, setallquestionData] = useState("");
	const [allsubjectsData, setAllsubjectsData] = useState([]);
	const [filteredsubjectsData, setFilteredsubjectsData] = useState([]);
	const [filteredchapterData, setFilteredchapterData] = useState([]);
	const [filteredreferenceData, setFilteredreferenceData] = useState([]);
	const [allParagList, setallParagList] = useState([]);
	const [worksheetLoading, setWorksheetLoading] = useState(true);

	const fetchsubjectsData = async () => {
		const api = `${apiList.subjects}`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setAllsubjectsData(response.data);
			setFilteredsubjectsData(response.data);
			setWorksheetLoading(false);
		} catch (error) {
			console.error("Error fetch blogs:", error);
			setWorksheetLoading(false);
		}
	};

	const fetchMCQs = async () => {
		const api = `${apiList.getparamcq}/${selectedSubjectId}/${selectedChapterId}/paragMCQ`;

		try {
			const response = await axios.get(api);
			setallParagList(response.data);
			setWorksheetLoading(false);
		} catch (error) {
			console.error("Error fetching blogs:", error);
			setWorksheetLoading(false);
		}
	};
	console.log(allParagList);
	useEffect(() => {
		fetchsubjectsData();
		// fetchMCQs();
	}, []);
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
	const [selectedSubjectId, setSelectedSubjectId] = useState([]);
	const [filteredSubjectIdArray, setFilteredSubjectIdArray] = useState({});
	console.log(filteredSubjectIdArray);

	const handleSubjectTagTypeSelection = (event) => {
		setSelectedSubject(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
		setSelectedSubjectId(
			event.target.options[event.target.selectedIndex].getAttribute("value")
		);
		const subjectfilterId =
			event.target.options[event.target.selectedIndex].getAttribute("value");

		const selectedId = event.target.value;
		const result2 = allsubjectsData?.find((item) => item?._id === selectedId);

		console.log("Filtered Data 1:", result2?.chapter);
		setTimeout(() => {
			setFilteredchapterData(result2?.chapter || []);
		}, 10);
		setSelectedChapterId("");
		setSelectedReferenceId("");
	};
	const [selectedChapterId, setSelectedChapterId] = useState([]);

	const handleChapterTagTypeSelection = (event) => {
		setSelectedChapter(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
		setSelectedChapterId(
			event.target.options[event.target.selectedIndex].getAttribute("value")
		);
		const selectedById = event.target.value;
		const result2 = filteredchapterData?.find(
			(item) => item?._id === selectedById
		);
		console.log("Filtered Data 2:", result2);
		setFilteredreferenceData(result2?.paragMCQ || []);
		setSelectedReferenceId("");
	};
	const [selectedReferenceId, setSelectedReferenceId] = useState([]);
	const handleReferenceTypeSelection = (event) => {
		setReferencce(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
		setSelectedReferenceId(
			event.target.options[event.target.selectedIndex].getAttribute("value")
		);
	};
	// const [selectedQuestionId, setSelectedQuestionId] = useState([]);

	const [selectedMcqList, setSelectedMcqList] = useState([]);

	const handleGoButtonClick = () => {
		const filteredMCQs = allsubjectsData
			.filter((subject) => subject?._id === selectedSubjectId)
			.flatMap(
				(subject) =>
					subject.chapter.find((chapter) => chapter?._id === selectedChapterId)
						?.paragMCQ || []
			)
			.find((mcq) => mcq?._id === selectedReferenceId);

		console.log(filteredMCQs);
		setSelectedMcqList([filteredMCQs] || []);
	};
	// console.log("selectedMcqList", selectedMcqList);

	const handleClearFilterButtonClick = () => {
		setSelectedMcqList([]);
		setFilteredsubjectsData([]);
		setFilteredchapterData([]);
		setFilteredreferenceData([]);
		fetchsubjectsData();
	};
	const handleGetAllfilter = async () => {
		const api = `${apiList.getparamcq}/${selectedSubjectId}/${selectedChapterId}/paragMCQ`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setSelectedMcqList(response?.data?.paragMCQs);
			setWorksheetLoading(false);
		} catch (error) {
			console.error("Error fetch blogs:", error);
			setWorksheetLoading(false);
		}
	};

	const GotohandleDeleteClick = (subjectId, chapterId, McqId) => {
		// const token = Cookies.get("token");
		const api = `${apiList.delete}/${subjectId}/${chapterId}/${McqId}`;
		try {
			const response = axios.delete(api);
			//   console.log("Password updated successfully:", response.data);
			toast("Deleted Parag successfully", {
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
			fetchsubjectsData();
			handleGetAllfilter();
			setTimeout(function () {}, 3000);
		} catch (error) {
			console.error("Error Delete Parag");
		}
		// toast.warning("Pending some fields Please check")
	};

	// const columns: GridColDef[] = [

	const [deleteid, setDeleteid] = useState("");

	const idpassingfordelete = (id) => {
		setDeleteid(id);
	};
	const columns = [
		{ field: "ID", headerName: "ID", width: 100 },
		{ field: "SNO", headerName: "SNO", width: 100 },
		{ field: "Modulue", headerName: "Modulue", width: 120 },
		{ field: "Chapter", headerName: "Chapter", width: 120 },
		{ field: "Question", headerName: "Question", width: 210 },
		{ field: "Diffculty", headerName: "Diffculty", width: 120 },
		{ field: "Reference", headerName: "Reference", width: 160 },
		{
			field: "ACTION",
			headerName: "Action",
			width: 532,
			renderCell: (params) => renderActionButtons(params.row),
		},
	];

	const headerColumns = columns.map((col) => ({
		field: col.field,
		headerName: col.headerName,
		width: col.width,
		renderCell: col.renderCell,
	}));

	const renderActionButtons = (McqId) => (
		<div>
			{selectedMcqList && selectedMcqList.length > 0 ? (
				<>
					<i
						class="fa-regular fa-eye "
						onClick={() =>
							navigate("/ParticularParagView", {
								state: {
									subjectId: selectedSubjectId,
									chapterId: selectedChapterId,
									McqId: McqId._id,
								},
							})
						}
						style={{
							backgroundColor: "#d6dadd",
							padding: "6px",
							borderRadius: "4px",
							marginRight: "5px",
							fontSize: "18px",
							cursor: "pointer",
							color: "#050505",
						}}
					></i>
					<i
						className="fa-solid fa-pencil pencile"
						onClick={() =>
							navigate("/paragEdit", {
								state: {
									subjectId: selectedSubjectId,
									chapterId: selectedChapterId,
									McqId: McqId._id,
								},
							})
						}
					></i>
					<i
						className="fa-solid fa-trash delete mb-1"
						data-toggle="modal"
						data-target="#myModalDelete"
						onClick={() => idpassingfordelete(McqId._id)}
					></i>
				</>
			) : (
				<div></div>
			)}
		</div>
	);
	var rows = [];
	var cnt = 0;

	if (selectedMcqList && selectedMcqList.length > 0) {
		rows = selectedMcqList.map((mcq) => {
			return {
				id: ++cnt,
				ID: cnt,
				SNO: cnt,
				Modulue: 1, // Assuming "Name" is the property name for the chapter name
				Chapter: mcq?.Chapters, // Assuming "subjectTag" is the property name for the subject tag
				Question: mcq?.Question, // Assuming "totalqustions" is the property name for the total questions
				Diffculty: mcq?.Difficulty,
				Reference: mcq?.Reference,
				ACTION: renderActionButtons(mcq),
				_id: mcq?._id,
			};
		});
	} else {
		rows = [
			{
				id: "",
				ID: "NoData",
				SNO: "",
			},
		];
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
								<i
									className="fa-solid fa-bars bars d-lg-block d-none"
									onClick={toggleSidebar}
								></i>
								<div class="">
									<div className="row">
										<div className="col-md-12 text-center mt-2">
											<h3 className="my-3" style={{ color: "#16c3ea" }}>
												Filter Paragraph Question
											</h3>
										</div>
										<div className="col-5 my-3">
											<select
												style={{ padding: "5px" }}
												className="form-control"
												onChange={handleSubjectTagTypeSelection}
											>
												<option className="hidden" value="">
													Select Subject
												</option>
												{filteredsubjectsData?.map((subject) => (
													<>
														<option
															className="name_item"
															key={subject._id} // Use a unique key for each option
															data-value={subject.name}
															value={subject?._id}
														>
															{subject.name}
														</option>
													</>
												))}
											</select>
											{/* <p>Select Subject</p> */}
										</div>
										<div className="col-4 my-3">
											<select
												type="text"
												placeholder="Select Chapter"
												className="form-control"
												onChange={handleChapterTagTypeSelection}
											>
												<option>Select Chapter</option>
												{filteredchapterData?.map((chapter) => (
													<>
														<option
															className="name_item"
															key={chapter._id} // Use a unique key for each option
															data-value={chapter.Name}
															value={chapter?._id}
														>
															{chapter.Name}
														</option>
													</>
												))}
											</select>
										</div>
										<div className="col-3 my-3">
											<button
												className="paragbtn mx-3"
												style={{ backgroundColor: "#16c3ea", color: "#000" }}
												onClick={handleGetAllfilter}
											>
												Get All Questions
											</button>
										</div>
										<div className="col-6">
											<select
												type="text"
												placeholder="...Select Reference"
												className="form-control"
												onChange={handleReferenceTypeSelection}
											>
												<option>Select Reference</option>
												{filteredreferenceData?.map((each) => (
													<>
														<option
															className="name_item"
															key={each._id} // Use a unique key for each option
															data-value={each.Reference}
															value={each?._id}
														>
															{each.Reference}
														</option>
													</>
												))}
											</select>
											{/* <label>Reference</label> */}
										</div>
										<div className="col-6">
											<button
												className="btn btn-danger"
												style={{
													backgroundColor: "#16c3ea",
													color: "#000",
												}}
												onClick={handleGoButtonClick}
											>
												Search
											</button>
											<button
												className="btn btn-light mx-1"
												style={{
													backgroundColor: "transparent",
													border: "1px solid #16c3ea",
												}}
												onClick={handleClearFilterButtonClick}
											>
												Clear Filter
											</button>
										</div>
										<div className="mt-3">
											<div className="col-md-4 pl-0">
												<h5 className="">Paragraph Question</h5>
											</div>
											{/* <div className="col-md-3"></div>
										<div className="col-md-2" style={{textAlign:"right"}}>
											<label>Search: </label>
                      </div>
                      <div className="col-md-3">
											<input type="text"
                      className="form-control"
                    //   value={searchQuery}
                      placeholder="Search by folder name"
                    //   onChange={handleInputChange} 
                        />
										</div> */}
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

									{allParagList.map((blog, index) => (
										<p key={index}>{blog.questiontype}</p>
									))}
								</div>

								<div class="modal" id="myModalDelete">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<h4 class="modal-title">Delete Question</h4>
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
													Would you like to delete Question ?{" "}
												</p>
											</div>
											<div class="modal-footer d-flex justify-content-end">
												<button
													type="button"
													class="btn_yes "
													data-dismiss="modal"
													onClick={() =>
														GotohandleDeleteClick(
															selectedSubjectId,
															selectedChapterId,
															deleteid
														)
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
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default ParagView;
