import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../Sidebar";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import axios from "axios";
import JoditEditor from "jodit-react";
import { Audio } from "react-loader-spinner";
import apiList from "../liberary/apiList";
import Cookies from "js-cookie";
import AWS from "aws-sdk";

import awsConfig from "../keys123/AWS";

AWS.config.update({
	accessKeyId: awsConfig.accessKeyId,
	secretAccessKey: awsConfig.secreteAccessKey,
	region: awsConfig.region,
});

const CreateQuestion = () => {
	let navigate = useNavigate();
	const editor = useRef(null);
	const [content, setContent] = useState("");
	const [worksheetLoading, setWorksheetLoading] = useState(true);
	const handleSelectQuestionType = (event) => {
		setSelectQuestionType(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
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
	const [selectQuestionType, setSelectQuestionType] = useState("");
	const [selectedSubject, setSelectedSubject] = useState("");
	const [selectedChapter, setSelectedChapter] = useState("");
	const [selectedDifficulty, setSelectedDifficulty] = useState("");
	const [reference, setReferencce] = useState("");
	const [Image1, setImage1] = useState(null);
	const [uploadedImageName, setUploadedImageName] = useState("");
	const [question, setQuestion] = useState("");
	const [option1, setOption1] = useState("");
	const [option2, setOption2] = useState("");
	const [option3, setOption3] = useState("");
	const [correctAnswer, setCorrectAnswer] = useState("");
	const [allquestionData, setallquestionData] = useState("");

	// const htmlContent = '<p>What is ReactJS?</p>';
	const sanitizeAndRenderHTML = (htmlString) => {
		const sanitizedHTML = htmlString.replace(/<\/?p>/g, "");
		return sanitizedHTML;
	};

	const s3 = new AWS.S3();

	useEffect(() => {
		const uploadImageToS3 = async () => {
			if (Image1 && Image1.name) {
				const currentTimestamp = new Date().getTime();
				const fileExtension = Image1.name.split(".").pop();

				const params = {
					Bucket: awsConfig.bucket,
					Key: `learningpathimages/${currentTimestamp}.${fileExtension}`,
					Body: Image1,
					ContentType: Image1.type,
				};

				try {
					console.log("Start uploading to S3:", params);

					const uploadResult = await s3.upload(params).promise();
					console.log("Uploaded to S3:", uploadResult);

					const imageUrl = `https://skillhub1.s3.ap-south-1.amazonaws.com/learningpathimages/${currentTimestamp}.${fileExtension}`;

					setUploadedImageName(imageUrl);
					console.log(imageUrl);
					console.log("Image uploaded successfully:", imageUrl);
				} catch (error) {
					console.error("Error uploading image to S3:", error);
				} finally {
					const imageInput = document.getElementById("imageInput");
					if (imageInput) {
						imageInput.value = "";
					}
				}
			}
		};

		uploadImageToS3();
	}, [Image1]);
	//   {sanitizeAndRenderHTML(htmlContent)}
	const onSubmitForm = async (e) => {
		e.preventDefault();
		const token = Cookies.get("token");
		if (
			selectQuestionType &&
			selectedSubject &&
			selectedChapter &&
			selectedDifficulty &&
			reference &&
			Image1 &&
			question &&
			option1 &&
			option2 &&
			option3 &&
			correctAnswer !== ""
		) {
			try {
				const QuestionData = {
					selectquestiontype: selectQuestionType,
					Subjects: selectedSubject,
					Chapters: selectedChapter,
					Difficulty: selectedDifficulty,
					Reference: reference,
					Image1: uploadedImageName,
					Question: sanitizeAndRenderHTML(question),
					// Question: question,
					// questionImage:'',
					Option1: sanitizeAndRenderHTML(option1),
					Option2: sanitizeAndRenderHTML(option2),
					Option3: sanitizeAndRenderHTML(option3),
					correctAnswer: correctAnswer,
					// Explanation:'',
				};
				console.log(QuestionData);
				const response = await axios.post(
					`${apiList.addMCQ}/${selectedSubjectId}/${selectedChapterId}`,
					QuestionData
					// {
					// 	headers: {
					// 		token: token,
					// 	},
					// }
				);
				//
				setallquestionData(response.data);
				console.log(response.data);
				console.log(QuestionData);
				if (response.status === 200) {
					toast("Question Added Successfully", {
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
					setSelectQuestionType("");
					setSelectedChapter("");
					setSelectedSubject("");
					setSelectedDifficulty("");
					setReferencce("");
					setQuestion("");
					setOption1("");
					setOption2("");
					setOption3("");
					setCorrectAnswer("");
					setTimeout(function () {
						navigate("/McqView");
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
			toast("Enter Required details", {
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
	const handleCorrectAnswerSelection = (event) => {
		setCorrectAnswer(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];

		if (file) {
			console.log("Selected File:", file);
			setImage1(file);
		} else {
			console.error("No file selected");
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
							<form>
								<div className=" ">
									<i
										className="fa-solid fa-bars bars d-lg-block d-none"
										onClick={toggleSidebar}
									></i>
									<div class=" mt-2">
										<h3 className="text-center" style={{color:"#16c3ea"}}>Create Questions</h3>
										<label style={{ fontWeight: "600" }}>
											Select Question Type <sup className="star">*</sup>
										</label>
										<select
											onChange={handleSelectQuestionType}
											type="text"
											placeholder="...select Question Type..."
											className="form-control"
										>
											<option>Select Question Type</option>
											<option data-value="Single Correct Option">
												Single Correct Option
											</option>
											<option data-value="Multi Correct Option">
												Multi Correct Option
											</option>
											<option data-value="Multi Correct Option With Partial Marketing">
												Multi Correct Option With Partial Marketing
											</option>
											<option data-value="Fill in the Blanks">
												Fill in the Blanks
											</option>
											<option data-value="True Or False">True Or False</option>
											<option data-value="Writing">Writing</option>
											<option data-value="Speaking">Speaking</option>
										</select>
										<span style={{ fontSize: "13px" }}>Option Question</span>
										<div className="my-2">
											<p style={{ fontSize: "14px", color: "orange" }}>
												<span style={{ color: "black", fontSize: "16px" }}>
													Note:
												</span>
												<b> {selectQuestionType}</b> Will have a minimum of 3
												options and a maximum of 5 options. One of the option
												will be the correct answer for this type of question.{" "}
											</p>
										</div>
										<div className="row">
											<div className="col-md-6">
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
											<div className="col-md-6">
												<label style={{ fontWeight: "600" }}>
													Chapter <sup className="star">*</sup>
												</label>
												<select
													type="text"
													placeholder="...Select Chapter"
													className="form-control"
													onChange={handleChapterTagTypeSelection}
												>
													<option>Select Chapter</option>
													{/* {allsubjectsData?.map((subject, index) =>
													subject?.chapter?.map((chapter) => (
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
													))
												)} */}

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
										</div>

										<div className="my-3">
											<p className="mb-2" style={{ fontWeight: "600" }}>
												Difficulty <sup className="star">*</sup>
											</p>
											<div className="row">
												<div className="d-flex flex-row col-4">
													<div>
														<input
															type="radio"
															name="difficulty"
															value="Difficult"
															onChange={handleDifficultyChange}
															checked={selectedDifficulty === "Difficult"}
														/>
													</div>
													<div className="px-2">Difficult</div>
												</div>
												<div className="d-flex flex-row col-4">
													<div>
														<input
															type="radio"
															name="difficulty"
															value="Easy"
															onChange={handleDifficultyChange}
															checked={selectedDifficulty === "Easy"}
														/>
													</div>
													<div className="mx-2">Easy</div>
												</div>
												<div className="d-flex flex-row col-4">
													<div>
														<input
															type="radio"
															name="difficulty"
															value="Medium"
															onChange={handleDifficultyChange}
															checked={selectedDifficulty === "Medium"}
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
											placeholder="Reference"
											className="form-control "
											onChange={(e) => setReferencce(e.target.value)}
										/>
										{/* <option>Reference</option> */}

										<div className="description">
											<h6 className="mt-3" style={{ fontWeight: "600" }}>
												Question
												<sup className="star">*</sup>
											</h6>
											<JoditEditor
												ref={editor}
												value={question}
												tabIndex={1} // tabIndex of textarea
												onBlur={(newContent) => setQuestion(newContent)} // preferred to use only this option to update the content for performance reasons
											/>

											<label htmlFor="myfile">
												<h6 className="my-2 mx-2">Description Image</h6>
											</label>
											{/* <input type="file" id="myfile" name="myfile" /> */}
											<input
												id="imageInput"
												accept="image/*"
												type="file"
												className="form-control"
												onChange={handleImageChange}
												// onChange={(e) => setlearningimg(e.target.value)}
												// value={learningimg}
											/>
										</div>
										<div className="my-2">
											<span>
												<b>Question Image</b>
											</span>
										</div>
										<div className="row text-center my-3">
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
											<h6 className="" style={{ fontWeight: "600" }}>
												Option 1 <sup className="star">*</sup>
											</h6>
											<JoditEditor
												ref={editor}
												value={option1}
												tabIndex={1} // tabIndex of textarea
												onBlur={(newContent) => setOption1(newContent)} // preferred to use only this option to update the content for performance reasons
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

											<div className="col-12 col-md-4 mt-1">
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
											<h6 className="mt-3" style={{ fontWeight: "600" }}>
												Option 2 <sup className="star">*</sup>
											</h6>
											<JoditEditor
												ref={editor}
												value={option2}
												tabIndex={1} // tabIndex of textarea
												onBlur={(newContent) => setOption2(newContent)} // preferred to use only this option to update the content for performance reasons
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

											<div className="col-12 col-md-4">
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
											<h6 className="mt-3" style={{ fontWeight: "600" }}>
												Option 3 <sup className="star">*</sup>
											</h6>
											<JoditEditor
												ref={editor}
												value={option3}
												tabIndex={1} // tabIndex of textarea
												onBlur={(newContent) => setOption3(newContent)} // preferred to use only this option to update the content for performance reasons
											/>
										</div>
										<div className="my-1">
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

											<div className="col-12 col-md-4">
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
											<div className=" col-12 col-md-4 mt-1">
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
												placeholder="....Select Correct Answer ..."
												className="form-control"
												onChange={handleCorrectAnswerSelection}
											>
												<option>Select Correct Answer</option>
												<option data-value="Option1">option1</option>
												<option data-value="Option2">option2</option>
												<option data-value="Option3">option3</option>
												<option data-value="All of the Above">
													All of the Above
												</option>
											</select>
										</div>
										<label style={{ fontSize: "15px", fontWeight:"600" }} className="my-3">
											Explanation <sup className="star">*</sup>
										</label>

										<div className="text-center">
											<button
												style={{
													width: "fit-content",
													backgroundColor: "#16c3ea",
													color: "#000",
													border: "none",
													padding: "7px 20px",
													borderRadius: "6px",
												}}
												onClick={(e) => onSubmitForm(e)}
											>
												Submit
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
export default CreateQuestion;
