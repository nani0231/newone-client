import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../Sidebar";
import "./parag.css";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JoditEditor from "jodit-react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { Audio } from "react-loader-spinner";
import apiList from "../liberary/apiList";
import Cookies from "js-cookie";

const ParagHome = () => {
	const editor = useRef(null);
	const [isOpen, setIsOpen] = useState(true);
	const [selectedSubject, setSelectedSubject] = useState("");
	const [selectedChapter, setSelectedChapter] = useState("");
	const [selectedDifficulty, setSelectedDifficulty] = useState("");
	const [reference, setReferencce] = useState("");
	const [question, setQuestion] = useState("");
	const [allquestionData, setallquestionData] = useState("");
	const [questionImage, setQuestionImage] = useState("");
	const [worksheetLoading, setWorksheetLoading] = useState(true);
	const sanitizeAndRenderHTML = (htmlString) => {
		const sanitizedHTML = htmlString.replace(/<\/?p>/g, "");
		return sanitizedHTML;
	};
	let navigate = useNavigate();

	const onSubmitForm = async (e) => {
		e.preventDefault();
		const token = Cookies.get("token");
		if (
			selectedSubject &&
			selectedChapter &&
			selectedDifficulty &&
			reference &&
			question !== ""
		) {
			try {
				const QuestionData = {
					Subjects: selectedSubject,
					Chapters: selectedChapter,
					Difficulty: selectedDifficulty,
					Reference: reference,
					Question: sanitizeAndRenderHTML(question),
				};
				console.log(QuestionData);
				const response = await axios.post(
					`${apiList.addparaMcq}/${selectedSubjectId}/${selectedChapterId}`,
					QuestionData
					// {
					// 	headers: {
					// 		token: token,
					// 	},
					// }
				);

				setallquestionData(response.data);
				console.log(response.data);
				if (response.status === 200) {
					toast("Paragraph Added Successfully", {
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
					setSelectedSubject("");
					setSelectedChapter("");
					setSelectedDifficulty("");
					setReferencce("");
					setQuestion("");
					setTimeout(function () {
						navigate("/ParagView");
					}, 3000);
				}
			} catch (error) {
				console.log(error.response.data);
				toast("Question already added", {
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
	const [selectedSubjectId, setSelectedSubjectId] = useState([]);
	const [filteredSubjectsData, setFilteredsubjectsData] = useState([]);
	const handleSubjectTagTypeSelection = (event) => {
		setSelectedSubject(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
		setSelectedSubjectId(
			event.target.options[event.target.selectedIndex].getAttribute("value")
		);
		const selectedId = event.target.value;
		const result = allsubjectsData?.find((item) => item?._id === selectedId);

		console.log("Filtered Data 1:", result?.chapter);
		setTimeout(() => {
			setFilteredsubjectsData(result?.chapter || []);
		}, 10);
		setSelectedChapterId("");
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

	const handleDifficultyChange = (event) => {
		setSelectedDifficulty(event.target.value);
	};

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
		menuBtnChange();
	};
	const [allsubjectsData, setAllsubjectsData] = useState([]);
	const fetchsubjectsData = async () => {
		const api = `${apiList.subjects}`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setAllsubjectsData(response.data);
			setWorksheetLoading(false);
		} catch (error) {
			console.error("Error fetch blogs:", error);
			setWorksheetLoading(false);
		}
	};
	useEffect(() => {
		fetchsubjectsData();
	}, []);

	const handleEditorChange = (content, editor) => {
		setQuestion(content); // Update the state with the new content
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
									className="fa-solid fa-bars bars  d-lg-block d-none"
									onClick={toggleSidebar}
								></i>
								<div class=" ">
									<h3 className="text-center my-3" style={{color:"#16c3ea"}}>Create Paragraph Questions</h3>
									<form>
										<div className="paragSubject">
											<label style={{ fontWeight: "600" }}>
												Subjects <sup className="star">*</sup>
											</label>
											<select
												style={{ padding: "5px" }}
												className="form-control"
												onChange={handleSubjectTagTypeSelection}
											>
												<option className="hidden" value="">
													Select Subject
												</option>
												{allsubjectsData?.map((subject) => (
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
										</div>
										<div className="paragChapter">
											<label style={{ fontWeight: "600" }}>
												Chapter<sup className="star">*</sup>
											</label>
											<select
												type="text"
												placeholder="...Select Chapter"
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
										</div>
										<label className="my-3" style={{ fontWeight: "600" }}>
											Difficulty <sup className="star">*</sup>
										</label>
										<div className="row">
											<div className="d-flex flex-row col-4">
												<div>
													<input
														type="radio"
														name="diffculty"
														value="easy"
														onChange={handleDifficultyChange}
														checked={selectedDifficulty === "easy"}
													/>
												</div>
												<div className="px-2">Easy</div>
											</div>
											<div className="d-flex flex-row col-4">
												<div>
													<input
														type="radio"
														name="diffculty"
														value="Medium"
														onChange={handleDifficultyChange}
														checked={selectedDifficulty === "Medium"}
													/>
												</div>
												<div className="mx-2">Medium</div>
											</div>

											<div className="d-flex flex-row col-4">
												<div>
													<input
														type="radio"
														name="diffculty"
														value="Hard"
														onChange={handleDifficultyChange}
														checked={selectedDifficulty === "Hard"}
													/>
												</div>
												<div className="mx-2">Hard</div>
											</div>
										</div>
										<div className="paragRef mt-3">
											<label style={{ fontWeight: "600" }}>
												Reference <sup className="star">*</sup>
											</label>
											<input
												className="form-control"
												type="text"
												placeholder="Reference"
												onChange={(e) => setReferencce(e.target.value)}
											></input>
										</div>
										<label className="my-2" style={{ fontWeight: "600" }}>
											Question <sup className="star">*</sup>
										</label>
										<div>
											<JoditEditor
												ref={editor}
												value={question}
												tabIndex={1} // tabIndex of textarea
												onBlur={(newContent) => setQuestion(newContent)} // preferred to use only this option to update the content for performance reasons
											/>
										</div>
										<div className="my-1">
											<p>
												<b>Question Image</b>
											</p>
										</div>
										<div className="row">
											<div className="my-1 col-md-6 col-12 text-center">
												<button
													className="paragImg"
													style={{
														borderRadius: "7px",
														border: "1px solid black",
														backgroundColor: "transparent",
														color: "#000",
													}}
												>
													Choose Image
												</button>
											</div>
											<div className="my-3 col-md-6 col-12 text-center">
												<button
													className="paragInsert"
													style={{
														borderRadius: "7px",
														border: "none",
														backgroundColor: "#333",
														color: "#fff",
														padding: "7px 20px",
													}}
												>
													Insert Image
												</button>
											</div>
										</div>

										<div className="my-3 text-center">
											<button
												type="submit"
												className="paragbtn"
												onClick={(e) => onSubmitForm(e)}
												style={{
													borderRadius: "7px",
													border: "none",
													backgroundColor: "#16c3ea",
													color: "#000",
													padding: "7px 20px",
												}}
											>
												Submit
											</button>
										</div>
									</form>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ParagHome;
