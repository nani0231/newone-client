import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Pagination } from "antd";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { json, useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import apiList from "../liberary/apiList";

const McqView = () => {
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
	const [allMcqsList, setallMCqsList] = useState([]);
	const [worksheetLoading, setWorksheetLoading] = useState(true);
	const fetchsubjectsData = async () => {
		const api = `${apiList.subjects}`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setAllsubjectsData(response.data);
			setFilteredalldataData(response.data);
			setWorksheetLoading(false);
		} catch (error) {
			console.error("Error fetch blogs:", error);
			setWorksheetLoading(false);
		}
	};

	const fetchMCQs = async () => {
		const api = `${apiList.getMCQs}/subjectId/chapterId`;

		try {
			const response = await axios.get(api);
			setallMCqsList(response.data);
			setWorksheetLoading(false);
		} catch (error) {
			console.error("Error fetching blogs:", error);
			setWorksheetLoading(false);
		}
	};
	useEffect(() => {
		fetchsubjectsData();
		fetchMCQs();
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
	const [filteredSubjectsData, setFilteredsubjectsData] = useState([]);
	const [filteredchapterData, setFilteredchapterData] = useState([]);
	const [filteredReferenceData, setFilteredReferenceData] = useState([]);
	const [filteredalldataData, setFilteredalldataData] = useState([]);

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

		const result = filteredalldataData?.filter(
			(item) => item._id === subjectfilterId
		);
		console.log("Filtered Data:", result);
		setFilteredSubjectIdArray(result.map((each) => each.chapter));

		const selectedId = event.target.value;
		const result2 = allsubjectsData?.find((item) => item?._id === selectedId);

		console.log("Filtered Data 1:", result2?.chapter);
		setTimeout(() => {
			setFilteredsubjectsData(result2?.chapter || []);
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
		const result2 = filteredSubjectsData?.find(
			(item) => item?._id === selectedById
		);
		console.log("Filtered Data 2:", result2);
		setFilteredchapterData(result2?.MCQ || []);
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
		const selectedReferenceId = event.target.value;
		const result2 = filteredchapterData?.find(
			(item) => item?._id === selectedReferenceId
		);
		console.log("Filtered Data 2:", result2);
		setFilteredReferenceData(result2 || []);
		setSelectedReferenceId("");
	};
	const [selectedQuestionId, setSelectedQuestionId] = useState([]);
	const handleQuestionTypeSelection = (event) => {
		setQuestion(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
		setSelectedQuestionId(
			event.target.options[event.target.selectedIndex].getAttribute("value")
		);
	};
	const [selectedMcqList, setSelectedMcqList] = useState({});
	const handleGoButtonClick = () => {
		const filteredMCQs = allsubjectsData
			.filter((subject) => subject?._id === selectedSubjectId)
			.flatMap(
				(subject) =>
					subject.chapter.find((chapter) => chapter?._id === selectedChapterId)
						?.MCQ || []
			)
			.find((mcq) => mcq?._id === selectedQuestionId);

		console.log(filteredMCQs);
		setSelectedMcqList(filteredMCQs || "");
	};
	console.log("selectedMcqList", selectedMcqList);

	const handleClearFilterButtonClick = () => {
		setSelectedMcqList("");
		setFilteredalldataData([]);
		setFilteredsubjectsData([]);
		setFilteredchapterData([]);
		setFilteredReferenceData([]);
		fetchMCQs();
		fetchsubjectsData();
	};

	const GotohandleDeleteClick = (subjectId, chapterId, McqId) => {
		// const token = Cookies.get("token");
		const api = `${apiList.deleteMCQ}/${subjectId}/${chapterId}/${McqId}`;
		try {
			const response = axios.delete(api);
			//   console.log("Password updated successfully:", response.data);
			toast("Deleted Question successfully", {
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
			fetchMCQs();
		} catch (error) {
			console.error("Error Delete Institute:", error);
		}
		// toast.warning("Pending some fields Please check")
	};

	// const columns: GridColDef[] = [

	const [deleteid, setDeleteid] = useState("");

	const idpassingfordelete = (McqId) => {
		setDeleteid(McqId);
	};
	const columns = [
		{ field: "SNO", headerName: "SNO", width: 100 },
		{ field: "ID", headerName: "ID", width: 100 },
		{ field: "Modulue", headerName: "Modulue", width: 120 },
		{ field: "Chapter", headerName: "Chapter", width: 130 },
		{ field: "Question", headerName: "Question", width: 130 },
		{ field: "Difficulty", headerName: "Difficulty", width: 110 },
		{ field: "Reference", headerName: "Reference", width: 110 },
		{ field: "QuestionType", headerName: "Question Type", width: 130 },
		{
			field: "ACTION",
			headerName: "Action",
			width: 537,
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
			<i
				class="fa-regular fa-eye "
				onClick={() =>
					navigate("/ParticularMcaView", {
						state: {
							subjectId: selectedSubjectId,
							chapterId: selectedChapterId,
							McqId: McqId.id,
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
					navigate("/Mcqupdate", {
						state: {
							subjectId: selectedSubjectId,
							chapterId: selectedChapterId,
							McqId: McqId.id,
						},
					})
				}
			></i>
			<i
				className="fa-solid fa-trash delete "
				data-toggle="modal"
				data-target="#myModalDelete"
				onClick={() => idpassingfordelete(McqId.id)}
			></i>
		</div>
	);

	if (Object.keys(selectedMcqList)?.length) {
		console.log("Data");
		var rows = [
			{
				SNO: 1,
				id: selectedMcqList?._id,
				Modulue: 1,
				Chapter: selectedMcqList?.Chapters,
				Question: selectedMcqList?.Question,
				Difficulty: selectedMcqList?.Difficulty,
				Reference: selectedMcqList?.Reference,
				QuestionType: selectedMcqList?.selectquestiontype,
				ACTION: renderActionButtons(selectedMcqList?._id),
			},
		];
	} else {
		var rows = [
			{
				id: "",
				SNO: "NoData",
			},
		];
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
						style={{ height: "100vh", overflowY: "scroll" }}
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
								<div class="">
									<div className="row">
										<div className="col-md-12 text-center">
											<h3 className="mb-3" style={{ color: "#16c3ea" }}>
												Filter Text Question
											</h3>
										</div>
										<div className="col-6">
											<select
												style={{ padding: "5px" }}
												className="form-control"
												onChange={handleSubjectTagTypeSelection}
											>
												<option className="hidden" value="">
													Select Subject
												</option>
												{filteredalldataData?.map((subject) => (
													<>
														<option
															className="name_item"
															key={subject._id} // Use a unique key for each option
															data-value={subject.subjectTag}
															value={subject._id}
														>
															{subject.name}
														</option>
													</>
												))}
											</select>
											<label style={{ fontWeight: "500" }}>Subject</label>
										</div>

										<div className="col-6">
											<select
												type="text"
												placeholder="Select Chapter"
												className="form-control"
												onChange={handleChapterTagTypeSelection}
											>
												<option>Select Chapter</option>
												{filteredSubjectsData?.map((chapter) => (
													<>
														<option
															className="name_item"
															key={chapter._id} // Use a unique key for each option
															data-value={chapter.Name}
															value={chapter._id}
														>
															{chapter.Name}
														</option>
													</>
												))}
											</select>
											<label style={{ fontWeight: "500" }}>Chapter</label>
										</div>
										<div className="col-6">
											<select
												type="text"
												placeholder=""
												className="form-control"
											>
												<option>Easy</option>
												<option>Medium</option>
												<option>Hard</option>
											</select>
											<label style={{ fontWeight: "500" }}>Diffculty</label>
										</div>

										<div className="col-6">
											<select
												type="text"
												placeholder="...Select Reference..."
												className="form-control"
												onChange={handleReferenceTypeSelection}
											>
												<option>Select Reference</option>
												{filteredchapterData?.map((each) => (
													<>
														<option
															className="name_item"
															key={each._id} // Use a unique key for each option
															data-value={each.Reference}
															value={each._id}
														>
															{each.Reference}
														</option>
													</>
												))}
											</select>
											<label style={{ fontWeight: "500" }}>Reference</label>
										</div>

										<div className="col-6">
											<select
												type="text"
												placeholder="...Select Question"
												className="form-control"
												onChange={handleQuestionTypeSelection}
											>
												<option>select Question</option>
												{/* {allsubjectsData?.map((subject,index) => (
										subject?.chapter?.map((chapter) => (
											chapter?.MCQ?.map((each)=>(
											<>
															<option
																className="name_item"
																key={each._id} // Use a unique key for each option
																data-value={each.Question}
																value={each._id}
															>
																{each.Question }
															</option>
															</>
											))))))} */}

												<>
													<option
														className="name_item"
														key={filteredReferenceData._id} // Use a unique key for each option
														data-value={filteredReferenceData.Question}
														value={filteredReferenceData._id}
													>
														{filteredReferenceData.Question}
													</option>
												</>
											</select>
											<label style={{ fontWeight: "500" }}>Question type</label>
										</div>
										<div className="row">
											<div className="col-md-3"></div>
											<div className="col-md-3 float-right ml-3">
												<button
													className="btn btn-light float-right"
													style={{
														backgroundColor: "#16c3ea",
														color: "#000",
														marginRight: "0px",
													}}
													onClick={handleGoButtonClick}
												>
													Search
												</button>
											</div>
											<div className="col-md-3 float-left">
												<button
													className="btn btn-light"
													style={{
														backgroundColor: "transparent",
														color: "red",
														border: "1px solid red",
													}}
													onClick={handleClearFilterButtonClick}
												>
													Clear Filter
												</button>
											</div>
											<div className="col-md-3"></div>
										</div>

										{/* <div
										className="row mt-3 pt-3 p-2"
										style={{ overflowX: "scroll" }}
									> */}
										<div className="col-12 ">
											<p>
												<b>Question Table</b>
											</p>
										</div>

										<div style={{ height: "auto", width: "100%" }}>
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

					<div class="modal" id="myModalDelete">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<h4 class="modal-title">Delete Question</h4>
									<button type="button" class="close" data-dismiss="modal">
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
									<button type="button" class="btn_no" data-dismiss="modal">
										No
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default McqView;
