import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../Sidebar";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import JoditEditor from "jodit-react";
import { Audio } from "react-loader-spinner";
import apiList from "../liberary/apiList";
import Cookies from "js-cookie";

const Mcqupdate = () => {
	let navigate = useNavigate();
	const editor = useRef(null);
	const { state } = useLocation();
	const { subjectId, chapterId, McqId } = state || {};
	const [mcqListData, setMcqListData] = useState({});
	const [mcqLisChangedData, setMcqListChangedData] = useState({});
	const [worksheetLoading, setWorksheetLoading] = useState(true);
	const [itisLoading, setItisLoading] = useState(true);
	// Function to handle input change during chapter edit
	const handleEditInputChange = (value, name) => {
		// console.log(e.target?.value);
		console.log(value, name);
		setMcqListChangedData({
			...mcqLisChangedData,
			[name]: value,
		});
	};
	// console.log(mcqLisChangedData)
	const handleSelectQuestionType = (event) =>
		setSelectQuestionType(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
	const fetchMcqListData = async () => {
		const api = `${apiList.getMCQById}/${subjectId}/${chapterId}/${McqId}`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setMcqListData(response.data.mcq);
			setMcqListChangedData(response.data.mcq);
			console.log(response.data.mcq);
			setWorksheetLoading(false);
			setItisLoading(false);
		} catch (error) {
			console.error("Error fetch blogs:", error);
			setWorksheetLoading(false);
		}
	};

	useEffect(() => {
		fetchMcqListData();
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
	const [allsubjectsData, setAllsubjectsData] = useState([]);
	const fetchsubjectsData = async () => {
		const api = `${apiList.subjects}`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setAllsubjectsData(response.data);
			setWorksheetLoading(false);
			setItisLoading(false);
		} catch (error) {
			console.error("Error fetch blogs:", error);
			setWorksheetLoading(false);
		}
	};
	useEffect(() => {
		fetchsubjectsData();
	}, []);
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

	const onSubmitUpdateForm = async () => {
		let token = Cookies.get("token");
		console.log(mcqLisChangedData);
		try {
			const response = await axios.put(
				`${apiList.updateMCQ}/${subjectId}/${chapterId}/${McqId}`,
				mcqLisChangedData,
				{
					headers: {
						token: token,
					},
				}
			);
			setallquestionData(response.data);
			console.log(response.data);
			if (response.status === 200) {
				toast.success("Question Updated Successfully", {
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
		} catch (error) {
			console.log(error.response.data);
			toast.error("Question already added");
		}
	};
	const [selectedSubjectId, setSelectedSubjectId] = useState([]);
	const handleSubjectTagTypeSelection = (event) => {
		setSelectedSubject(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
		// setFormData({ ...mcqLisChangedData, name: e.target.value })
		setSelectedSubjectId(
			event.target.options[event.target.selectedIndex].getAttribute("value")
		);
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
	};

	const handleCorrectAnswerSelection = (event) => {
		handleEditInputChange(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			),
			"correctAnswer"
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
							<form>
								<div className=" ">
									<i
										className="fa-solid fa-bars bars d-lg-block d-none"
										onClick={toggleSidebar}
									></i>
									<div class=" mt-2">
										<h3 className="text-center" style={{ color: "#16c3ea" }}>
											Update Text Question
										</h3>
										<label style={{ fontWeight: "600" }}>
											Question Type <sup className="star">*</sup>
										</label>
										<input
											type="text"
											placeholder="...select Question Type..."
											className="form-control"
											value={
												selectQuestionType || mcqListData?.selectquestiontype
											}
											disabled
										/>
										<div className="row mt-3">
											<div className="col-md-6">
												<label style={{ fontWeight: "600" }}>
													Subjects <sup className="star">*</sup>
												</label>
												<input
													type="text"
													style={{ padding: "5px" }}
													placeholder="...Select Subject"
													className="form-control"
													value={selectedSubject || mcqListData?.Subjects}
													disabled
												/>
											</div>
											<div className="col-md-6">
												<label style={{ fontWeight: "600" }}>
													Chapter <sup className="star">*</sup>
												</label>
												<input
													type="text"
													placeholder="...Select Chapter"
													className="form-control"
													value={selectedChapter || mcqListData?.Chapters}
													disabled
												/>
											</div>
										</div>

										<div className="my-3">
											<label style={{ fontWeight: "600" }}>
												Difficulty <sup className="star">*</sup>
											</label>
											<div className="row">
												<div className="d-flex flex-row col-4">
													<div>
														<input
															type="radio"
															name="Difficulty"
															value="Difficult"
															onChange={(e) =>
																handleEditInputChange(
																	e.target.value,
																	"Difficulty"
																)
															}
															checked={
																mcqLisChangedData?.Difficulty === "Difficult" ||
																""
															}
														/>
													</div>
													<div className="px-2">Difficult</div>
												</div>
												<div className="d-flex flex-row col-4">
													<div>
														<input
															type="radio"
															name="Difficulty"
															value="Easy"
															onChange={(e) =>
																handleEditInputChange(
																	e.target.value,
																	"Difficulty"
																)
															}
															checked={
																mcqLisChangedData?.Difficulty === "Easy" || ""
															}
														/>
													</div>
													<div className="mx-2">Easy</div>
												</div>
												<div className="d-flex flex-row col-4">
													<div>
														<input
															type="radio"
															name="Difficulty"
															value="Medium"
															onChange={(e) =>
																handleEditInputChange(
																	e.target.value,
																	"Difficulty"
																)
															}
															checked={
																mcqLisChangedData?.Difficulty === "Medium" || ""
															}
														/>
													</div>
													<div className="mx-2">Medium</div>
												</div>
											</div>
										</div>

										<label style={{ fontWeight: "600" }}>
											Reference <sup className="star">*</sup>
										</label>
										<input
											type="text"
											name="Reference"
											placeholder="Reference"
											className="form-control "
											onChange={(e) =>
												handleEditInputChange(e.target.value, "Reference")
											}
											value={mcqLisChangedData?.Reference || ""}
										/>
										{/* <option>Reference</option> */}

										<div className="description">
											<h6 className="my-3" style={{ fontWeight: "600" }}>
												Question
												<sup className="star">*</sup>
											</h6>
											<JoditEditor
												ref={editor}
												name="Question"
												value={mcqLisChangedData?.Question || ""}
												tabIndex={1} // tabIndex of textarea
												onBlur={(newContent) =>
													handleEditInputChange(newContent, "Question")
												} // preferred to use only this option to update the content for performance reasons
												// onChange={handleEditInputChange()}
											/>
											<label htmlFor="myfile">
												<h6 className="my-3">Description Image</h6>
											</label>
											<input
												type="file"
												id="myfile"
												name="myfile"
												className="form-control"
											/>
										</div>
										<div className="my-2">
											<span>
												<b>Question Image</b>
											</span>
										</div>
										<div className="row text-center">
											<div className="col-12 col-md-6 mt-2">
												<button
													style={{
														backgroundColor: "white",
														width: "fit-content",
														padding: "7px 20px",
														borderRadius: "6px",
														color: "black",
														border: "1px solid black",
													}}
												>
													Choose Image
												</button>
											</div>

											<div className="col-12 col-md-6 mt-2">
												<button
													style={{
														width: "fit-content",
														backgroundColor: "#333",
														color: "white",
														border: "none",
														padding: "7px 20px",
														borderRadius: "6px",
													}}
												>
													Insert Image
												</button>
											</div>
										</div>

										{/* option 1 */}

										<div className="description">
											<h6 className="my-3" style={{ fontWeight: "600" }}>
												Option 1<sup className="star">*</sup>
											</h6>
											<JoditEditor
												ref={editor}
												name="Option1"
												value={mcqLisChangedData?.Option1 || ""}
												tabIndex={1} // tabIndex of textarea
												onBlur={(newContent) =>
													handleEditInputChange(newContent, "Option1")
												} // preferred to use only this option to update the content for performance reasons
											/>
										</div>
										<div className="my-1">
											<p>Option1 Image</p>
										</div>
										<div className="row text-center">
											<div className="col-12 col-md-4 ">
												<div className="my-1">
													<button
														style={{
															width: "fit-content",
															backgroundColor: "white",
															color: "black",
															border: "1px solid black",
															padding: "7px 20px ",
															borderRadius: "6px",
														}}
													>
														Choose Image
													</button>
												</div>
											</div>

											<div className="col-12 col-md-4  mt-1">
												<button
													style={{
														backgroundColor: "#ec4d37",
														color: "#1d1b1b",
														border: "none",
														padding: "7px 20px",
														borderRadius: "6px",
													}}
												>
													Delete option
												</button>
											</div>
											<div className="col-12 col-md-4 mt-1">
												<button
													style={{
														width: "fit-content",
														backgroundColor: "#333",
														color: "white",
														border: "none",
														padding: "7px 20px",
														borderRadius: "6px",
													}}
												>
													Insert Image
												</button>
											</div>
										</div>

										<div className="description">
											<h6 className="my-3" style={{ fontWeight: "600" }}>
												Option 2<sup className="star">*</sup>
											</h6>
											<JoditEditor
												ref={editor}
												name="Option2"
												value={mcqLisChangedData?.Option2 || ""}
												tabIndex={1} // tabIndex of textarea
												onBlur={(newContent) =>
													handleEditInputChange(newContent, "Option2")
												} // preferred to use only this option to update the content for performance reasons
											/>
										</div>
										<div className="my-1">
											<p>Option2 Image</p>
										</div>
										<div className="row text-center">
											<div className="col-12 col-md-4 ">
												<div className="my-1">
													<button
														style={{
															width: "fit-content",
															backgroundColor: "white",
															color: "black",
															border: "1px solid black",
															borderRadius: "6px",
															padding: "7px 20px",
														}}
													>
														Choose Image
													</button>
												</div>
											</div>

											<div className="col-12 col-md-4  my-1">
												<button
													style={{
														backgroundColor: "#ec4d37",
														color: "#1d1b1b",
														border: "none",
														width: "fit-content",
														padding: "7px 20px",
														borderRadius: "6px",
													}}
												>
													Delete option
												</button>
											</div>
											<div className="col-12 col-md-4 mt-1">
												<button
													style={{
														width: "fit-content",
														backgroundColor: "#333",
														color: "white",
														border: "none",
														padding: "7px 20px",
														borderRadius: "6px",
													}}
												>
													Insert Image
												</button>
											</div>
										</div>

										<div className="description">
											<h6 className="my-3" style={{ fontWeight: "600" }}>
												Option 3<sup className="star">*</sup>
											</h6>
											<JoditEditor
												ref={editor}
												name="Option3"
												value={mcqLisChangedData?.Option3 || ""}
												tabIndex={1} // tabIndex of textarea
												onBlur={(newContent) =>
													handleEditInputChange(newContent, "Option3")
												} // preferred to use only this option to update the content for performance reasons
											/>
										</div>
										<div className="my-2">
											<p>Option3 Image</p>
										</div>
										<div className="row text-center">
											<div className="col-12 col-md-4 ">
												<div className="my-1">
													<button
														style={{
															width: "fit-content",
															backgroundColor: "white",
															color: "black",
															border: "1px solid black",
															borderRadius: "6px",
															padding: "7px 20px",
														}}
													>
														Choose Image
													</button>
												</div>
											</div>

											<div className="col-12 col-md-4  my-1">
												<button
													style={{
														backgroundColor: "#ec4d37",
														color: "#1d1b1b",
														border: "none",
														width: "fit-content",
														padding: "7px 20px",
														borderRadius: "6px",
													}}
												>
													Delete option
												</button>
											</div>
											<div className="col-12 col-md-4 mt-1">
												<button
													style={{
														width: "fit-content",
														backgroundColor: "#333",
														color: "white",
														border: "none",
														padding: "7px 20px",
														borderRadius: "6px",
													}}
												>
													Insert Image
												</button>
											</div>
										</div>

										<div>
											<label className="mt-3" style={{ fontWeight: "600" }}>
												Correct Answer <sup className="star">*</sup>
											</label>
											<select
												type="text"
												name="correctAnswer"
												placeholder="....Select Correct Answer ..."
												className="form-control"
												onChange={handleCorrectAnswerSelection}
											>
												<option>
													{mcqLisChangedData?.correctAnswer || ""}
												</option>
												<option data-value="option1">option1</option>
												<option data-value="option2">option2</option>
												<option data-value="option3">option3</option>
												<option data-value="All of the Above">
													All of the Above
												</option>
											</select>
										</div>

										<label style={{ fontSize: "15px" , fontWeight:"600"}} className="my-3">
											Explanation <sup className="star">*</sup>
										</label>

										<div className="text-center mb-3">
											<button
												type="button"
												className="btn btn-light"
												style={{
													width: "fit-content",
													backgroundColor: "#16c3ea",
													color: "#000",
												}}
												onClick={() => onSubmitUpdateForm(mcqListData?._id)}
											>
												Update
											</button>
											<button
												className="btn btn-light mx-1"
												style={{ backgroundColor: "#000", color: "#fff" }}
												onClick={() =>
													navigate("/McqView", {
														state: {
															subjectId: subjectId,
															chapterId: chapterId,
															McqId: McqId,
														},
													})
												}
											>
												Back
											</button>
										</div>
									</div>
								</div>
							</form>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Mcqupdate;
