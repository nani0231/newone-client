import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./assement.css";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import apiList from "../liberary/apiList";
const steps = [
	"BASIC",
	"SET ASSESSMENT PAPER",
	"SELECT QUESTIONS",
	"ASSESSMENT SETTINGS",
];

function Assement() {
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());
	const [isOpen, setIsOpen] = useState(true);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
		menuBtnChange();
	};
	const uma = () => {
		setActiveStep(3);
	};
	const isStepOptional = (step) => {
		return step === 1;
	};
	const isStepSkipped = (step) => {
		return skipped.has(step);
	};
	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};
	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			throw new Error("You can't skip a step that isn't optional.");
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};
	const [addSection, setAddSection] = useState(false);
	//   const [category, setCategory] = useState("");
	const [topic, setTopic] = useState("");
	const [practiceTopic, setPracticeTopic] = useState("");
	const [question, setQuestion] = useState("");
	const [subject, setSubject] = useState("");
	const [chapter, setChapter] = useState("");
	const [mcq, setMcq] = useState("");
	const [paragraph, setParagraph] = useState("");
	const [selectedSubject, setSelectedSubject] = useState("");
	const [selectedChapters, setSelectedChapters] = useState([]);
	const [questionListMcq, setQuestionListMcq] = useState([]);
	const [questionListParag, setQuestionListParag] = useState([]);
	const [allQuestionData, setAllQuestionData] = useState("");
	const [viewCheckbox, setViewCheckbox] = useState(false);
	const [showMcqBox, setShowMcqBox] = useState(false);
	const [showParagBox, setShowParagBox] = useState(false);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const openMcqBox = () => {
		setShowMcqBox(true);
		setShowParagBox(false);
	};

	const openParagBox = () => {
		setShowMcqBox(false);
		setShowParagBox(true);
	};

	const [allsubjectsData, setAllsubjectsData] = useState([]);
	const fetchsubjectsData22 = async () => {
		const api = `${apiList.subjects}`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setAllsubjectsData(response.data);
			setLoading(false);
		} catch (error) {
			console.error("Error fetch blogs:", error);
		}
	};
	useEffect(() => {
		fetchsubjectsData22();
	}, []);

	console.log(allsubjectsData, "All Subjects");

	const handleSubjectChange = (event) => {
		setSelectedSubject(event.target.value);
		setSelectedChapters([]);
	};

	console.log(selectedSubject, "subjects");

	const handleChapterChange = (event) => {
		const chapterName = event.target.value;
		const isChecked = event.target.checked;
		setQuestionListMcq([]);

		if (isChecked) {
			setSelectedChapters([...selectedChapters, chapterName]); // Add to selected chapters
		} else {
			setSelectedChapters(
				selectedChapters.filter((chapter) => chapter !== chapterName)
			); // Remove from selected chapters
		}
	};
	console.log(selectedChapters, "Chapters");

	//to handle mcq data and parag data
	const handleQuestionList = (e, mcq) => {
		const isChecked = e.target.checked;

		if (isChecked) {
			setQuestionListMcq([...questionListMcq, mcq.Question]);
		} else {
			setQuestionListMcq(
				questionListMcq.filter(
					(selectedQuestion) => selectedQuestion !== mcq.Question
				)
			);
		}
	};

	const handleParagQuestionList = (e, parag) => {
		const isChecked = e.target.checked;

		if (isChecked) {
			setQuestionListParag([...questionListParag, parag.Question]);
		} else {
			setQuestionListParag(
				questionListParag.filter(
					(selectedQuestion) => selectedQuestion !== parag.Question
				)
			);
		}
	};
	// console.log(selectedChapters, "chapter");
	console.log(questionListParag, "parag");

	const toggleVisibility = () => {
		setAddSection(!addSection);
	};

	const toggleCheckbox = () => {
		setViewCheckbox(!viewCheckbox);
	};
	// console.log(allsubjectsData[12].chapter[0].MCQ, "all Subject Chapter");
	console.log(selectedChapters);
	console.log(questionListMcq);

	const handleReset = () => {
		setActiveStep(0);
	};
	const [companyDetails, setCompanyDetails] = useState([]);
	const [assessmentId, setAssessmentId] = useState("");

	const [category, setCategory] = useState([]);
	const [category1, setCategory1] = useState("");
	const [assessmentname, setAssessmentName] = useState("");
	const [nooftimes, setNoOfTimes] = useState("");
	const [assessmentpassword, setAssessmentPassword] = useState("");
	const [exametype, setExamType] = useState("");
	const [cutofftype, setCutoffType] = useState("");
	const [questionselection, setQuestionSelection] = useState("");
	const [assessmentreport, setAssessmentReport] = useState([]);
	const [assessmentflow, setAssessmentFlow] = useState("");
	const [assessmentadaptiveness, setAssessmentAdaptiveness] = useState("");
	const [blogslist, setAddblogslist] = useState([]);

	const [individualSelectedCategory, setIndividaulCategorydetails] = useState(
		{}
	);
	const [latestAssessmentId, setLatestAssesmentId] = useState("");
	// const fetchCompanyDetails1 = async () => {
	//     try {
	//         const options = {
	//             method: "GET",
	//         };

	//         const response = await fetch(
	//             `${apiList.categories}`,
	//             options
	//         );

	//         if (!response.ok) {
	//             throw new Error("Network response was not ok.");
	//         }

	//         const data = await response.json();

	//         setCategory(data);

	//         console.log(data);
	//     } catch (error) {
	//         console.error("Error fetching Company Details:", error);
	//         // Handle errors here, such as setting an error state or displaying an error message
	//     }
	// };
	const fetchCompanyDetails1 = async () => {
		try {
			const options = {
				method: "GET",
			};

			const response = await fetch(`${apiList.categories}`, options);

			if (!response.ok) {
				throw new Error("Network response was not ok.");
			}

			const data = await response.json();
			console.log(data);
			setCategory(data);

			// const filteredAssessmentIds = data
			// .filter(item => item._id === selectedcategoryId)
			// .map(item => item.Assessment.find(each => each._id));

			const assessment = data.Assessment.find(
				(category) => category._id === selectedcategoryId
			);

			if (assessment) {
				const assessmentId = assessment._id.$oid;
				console.log("Found Assessment ID:", assessmentId);
			} else {
				console.log("Assessment not found for the selected category ID");
			}

			console.log(assessment);
		} catch (error) {
			console.error("Error fetching Company Details:", error);
			// Handle errors here, such as setting an error state or displaying an error message
		}
	};

	useEffect(() => {
		fetchCompanyDetails1();
	}, []);

	const [selectedcategoryId, setSelectedcategoryId] = useState([]);
	useEffect(() => {
		const fetchCompanyDetails = async () => {
			try {
				const options = {
					method: "GET",
				};

				const response = await fetch(
					`${apiList.getassessment}/${selectedcategoryId}/${assessmentId}`,
					options
				);

				if (!response.ok) {
					throw new Error("Network response was not ok.");
				}

				const data = await response.json();
				setCompanyDetails(data);

				console.log(data);
			} catch (error) {
				console.error("Error fetching Company Details:", error);
				// Handle errors here, such as setting an error state or displaying an error message
			}
		};

		fetchCompanyDetails();
	}, [selectedcategoryId, assessmentId]);
	console.log(selectedcategoryId);
	console.log(latestAssessmentId);
	const handleInstituteSelection = async (event) => {
		setCategory1(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
		setSelectedcategoryId(
			event.target.options[event.target.selectedIndex].getAttribute("value")
		);
		try {
			const response = await axios.get(
				`${apiList.getIndiVIDUAL}/${event.target.options[
					event.target.selectedIndex
				].getAttribute("value")}`
			);

			setIndividaulCategorydetails(response.data.category);
		} catch (e) {
			console.log(e);
		}

		// try {
		//     const response = await axios.get(api, {});
		//     const data = response.data;
		//     setAllsubjectsData(response.data);
		// } catch (error) {
		//     console.error("Error fetch blogs:", error);
		// }
	};

	const getCategorydetails = async () => {
		try {
			const response = await axios.get(
				`${apiList.getIndiVIDUAL}/${selectedcategoryId}`
			);

			console.log(response.data.category);
			console.log(
				response.data.category.Assessment[
					response.data.category.Assessment.length - 1
				]._id
			);
			setLatestAssesmentId(
				response.data.category.Assessment[
					response.data.category.Assessment.length - 1
				]._id
			);
		} catch (e) {
			console.log(e);
		}
	};

	console.log(selectedcategoryId);
	const handleCheckboxChange = (value) => {
		const updatedOptions = assessmentreport.includes(value)
			? assessmentreport.filter((option) => option !== value)
			: [...assessmentreport, value];

		setAssessmentReport(updatedOptions);
		console.log(updatedOptions);
	};
	// const assessmentReportString = assessmentreport.join(", ");
	const [questions, setquestions] = useState("");
	const [selectedMCQs, setSelectedMCQs] = useState([]);
	const handleCheckboxChange1 = (e, questiondata) => {
		setSelectedMCQs((prevSelectedMCQs) => {
			if (!e.target.checked) {
				return prevSelectedMCQs.filter((q) => q !== questiondata._id);
			} else {
				return [...prevSelectedMCQs, questiondata];
			}
		});
	};

	console.log(selectedMCQs);

	const QustionAdd = async (e) => {
		e.preventDefault();

		try {
			// Make a POST request to your API endpoint with the selectedMCQs
			const response = await axios.post(
				`${apiList.Questions}/${selectedcategoryId}/${latestAssessmentId}`,
				{ questions: selectedMCQs }
			);

			if (response.status === 200) {
				setActiveStep(3);
				fetchCompanyDetails1();
			} else {
				console.error(
					"Error posting questions. Unexpected status:",
					response.status
				);
				// Handle unexpected status code
			}

			console.log(response.data); // Handle success response
		} catch (error) {
			console.error("Error posting questions:", error);
			// Handle error response
		}
	};

	const useData2 = {
		assessmentname: assessmentname,
		assessmentpassword: assessmentpassword,
		exametype: exametype,
		cutofftype: cutofftype,
		questionselection: questionselection,
		assessmentreport: assessmentreport,
		assessmentflow: assessmentflow,
		nooftimes: nooftimes,
		assessmentadaptiveness: assessmentadaptiveness,
	};

	console.log(useData2);
	console.log(category);

	const onSubmitForm3 = (e) => {
		e.preventDefault();
		if (
			(assessmentname,
			nooftimes,
			assessmentpassword,
			exametype,
			cutofftype,
			questionselection,
			assessmentreport,
			assessmentflow,
			assessmentadaptiveness !== "")
		) {
			axios
				.post(`${apiList.assessment}/${selectedcategoryId}`, useData2)
				.then((response) => {
					if (response.status === 200) {
						setActiveStep(1);
						getCategorydetails();
					}
				})
				.catch((error) => {
					console.log(error.message);
					toast.error("Registration Failed");
				});
		} else {
			toast.warning("Enter the Required Details");
		}
	};
	const menuBtnChange = () => {
		const sidebar = document.querySelector(".sidebar");
		const closeBtn = document.querySelector("#btn");

		if (sidebar?.classList.contains("open")) {
			closeBtn?.classList.replace("bx-menu", "bx-menu-alt-right");
		} else {
			closeBtn?.classList.replace("bx-menu-alt-right", "bx-menu");
		}
	};
	const [qustioncount, setQustioncount] = useState("");
	const [totalqustion, setTotalqustion] = useState("");
	const [duration, setDuration] = useState("");
	const [percentage, setPercentage] = useState("");
	const [modelname, setModelname] = useState("");
	const [maxmarks, setMaxmarks] = useState("");
	const useData3 = {
		qustioncount: qustioncount,
		totalqustion: totalqustion,
		duration: duration,
		percentage: percentage,
		modelname: modelname,
		maxmarks: maxmarks,
	};
	console.log(useData3, selectedcategoryId);

	const onSubmitForm4 = (e) => {
		e.preventDefault();
		if (
			qustioncount &&
			totalqustion &&
			duration &&
			percentage &&
			modelname &&
			maxmarks !== ""
		) {
			axios
				.post(
					`${apiList.assessmentqestion}/${selectedcategoryId}/${latestAssessmentId}`,
					useData3
				)
				.then((response) => {
					if (response.status === 200) {
						setActiveStep(2);
						fetchCompanyDetails1();
					}
				})
				.catch((error) => {
					console.log(error.message);
					toast.error("Registration Failed");
				});
		} else {
			toast.warning("Enter the Required Details");
		}
	};
	const [isChapterListVisible, setChapterListVisible] = useState(false);
	const [isChapterListVisible1, setChapterListVisible1] = useState(false);
	const toggleChapterList = () => {
		setChapterListVisible(!isChapterListVisible);
	};

	const Checkbox = () => {
		setChapterListVisible1(!isChapterListVisible1);
	};
	const [selectedSubjectId, setSelectedSubjectId] = useState("");

	const handleSubjectTagTypeSelection = (event) => {
		setSelectedSubjectId(event.target.value);
		setSubjects(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
	};
	const [selectedChapterId, setSelectedChapterId] = useState("");
	const [Chapters, setChapters] = useState("");
	const handleChapterTagTypeSelection = (event) => {
		setSelectedChapterId(event.target.value);
		setChapters(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
	};

	console.log(selectedChapterId);
	useEffect(() => {
		fetchsubjectsData();
		fetchsubjectsData1();
	}, []);
	console.log(selectedSubjectId);
	const [Subjects, setSubjects] = useState("");

	const fetchsubjectsData = async () => {
		const api = `${apiList.getbasic}`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setAllsubjectsData(response.data);
		} catch (error) {
			console.error("Error fetch blogs:", error);
		}
	};
	const [blogslist1, setbloslist1] = useState([]);
	const fetchsubjectsData1 = async () => {
		const api = `${apiList.getMCQs}/${selectedSubjectId}/${selectedChapterId}`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setbloslist1(response.data);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetch blogs:", error);
		}
	};

	const [selectedMcqList, setSelectedMcqList] = useState({});
	const handleGoButtonClick = () => {
		const filteredMCQs = allsubjectsData
			.filter((subject) => subject?._id === selectedSubjectId)
			.flatMap(
				(subject) =>
					subject.chapter.find((chapter) => chapter?._id === selectedChapterId)
						?.MCQ || []
			);

		console.log(filteredMCQs);
		setSelectedMcqList(filteredMCQs || "");
	};
	const [SelectedparaList, setSelectedparaList] = useState({});
	const handleGetAllfilter = async () => {
		const api = `${apiList.getparamcqs}/${selectedSubjectId}/${selectedChapterId}/paragMCQ`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setSelectedparaList(response?.data?.paragMCQs);
		} catch (error) {
			console.error("Error fetch blogs:", error);
		}
	};

	const [Tab, setTab] = useState("");
	const [assessmentTabs, setassessmentTabs] = useState("");
	const [Enable, setEnable] = useState("");
	const [Restrict, setRestrict] = useState("");
	const useData5 = {
		Enable: Enable,
		Restrict: Restrict,
		Tab: Tab,
		assessmentTabs: assessmentTabs,
	};

	const onSubmitForm5 = async (e) => {
		e.preventDefault();
		try {
			const { Enable, Restrict, Tab, assessmentTabs } = useData5;
			const response = await fetch(
				`${apiList.Assessmentsettings}/${selectedcategoryId}/${latestAssessmentId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},

					body: JSON.stringify({
						Enable,
						Restrict,
						Tab,
						assessmentTabs,
					}),
				}
			);

			if (response.ok) {
				console.log("Tab data posted successfully");
				toast.success("Assessment create Successfull", {
					position: "top-right",
					autoClose: 1000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
				navigate("/Assementview");
			} else {
				console.error("Failed to post question data");
			}
		} catch (error) {
			console.error("Internal server error:", error);
		}
	};
	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					{isOpen && (
						<div className="col-12 col-lg-3 col-md-12 sectioncard121">
							<Sidebar />
							<ToastContainer />
						</div>
					)}
					<div
						className={`my-3 col-12 col-md-${isOpen ? 12 : 9} col-lg-${
							isOpen ? 9 : 12
						}`}
					>
						{loading ? (
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
									className="fa-solid fa-bars bars d-lg-block d-none"
									onClick={toggleSidebar}
								></i>
								<div className="">
									<Container>
										<Box>
											<Stepper activeStep={activeStep}>
												{steps.map((label, index) => {
													const stepProps = {};
													const labelProps = {};
													if (isStepOptional(index)) {
														labelProps.optional = (
															<Typography variant="caption">
																Optional
															</Typography>
														);
													}
													if (isStepSkipped(index)) {
														stepProps.completed = false;
													}
													return (
														<Step key={label} {...stepProps}>
															<StepLabel {...labelProps}>{label}</StepLabel>
														</Step>
													);
												})}
											</Stepper>
											{activeStep === steps.length ? (
												<React.Fragment>
													<Typography
														style={{ fontSize: "20px" }}
														sx={{ mt: 3, mb: 1, ml: 1 }}
													>
														All steps completed - you&apos;re finished
													</Typography>
													<Box
														sx={{
															display: "flex",
															flexDirection: "row",
															pt: 2,
														}}
													>
														<Box sx={{ flex: "1 1 auto" }} />
														<Button onClick={handleReset}>Reset</Button>
													</Box>
												</React.Fragment>
											) : (
												<React.Fragment>
													{activeStep === 0 && (
														<div>
															<div className="row">
																<div className="col-md-12">
																	<form onSubmit={(e) => onSubmitForm3(e)}>
																		<div class="col-md-12">
																			<p
																				className="leableheading mt-3"
																				style={{ fontWeight: "600" }}
																			>
																				Category <sup className="star">*</sup>
																			</p>

																			<select
																				name=""
																				id=""
																				className="p-2 form-control"
																				onChange={handleInstituteSelection}
																			>
																				<option value="Select Category">
																					Select Category
																				</option>
																				{category.map((category) => (
																					<option
																						key={category.id}
																						value={category._id}
																					>
																						{category.name}
																					</option>
																				))}
																			</select>
																			<div className="row">
																				<div className="col-md-4">
																					<div className=" mt-4">
																						<p className="leableheading">
																							Assessment Name
																							<sup className="star">*</sup>
																						</p>
																						<input
																							placeholder="Enter assessment name"
																							className="w-100 form-control"
																							onChange={(e) =>
																								setAssessmentName(
																									e.target.value
																								)
																							}
																							value={assessmentname}
																						/>
																					</div>
																				</div>
																				<div className="col-md-4">
																					<div className=" mt-4">
																						<p className="leableheading">
																							No of Times
																							<sup className="star">*</sup>
																						</p>
																						<input
																							placeholder="Enter Time"
																							className="w-100 form-control"
																							onChange={(e) =>
																								setNoOfTimes(e.target.value)
																							}
																							value={nooftimes}
																						/>
																					</div>
																				</div>
																				<div className="col-md-4">
																					<div className=" mt-4">
																						<p className="leableheading">
																							Assessment Password
																							<sup className="star">*</sup>
																						</p>
																						<input
																							placeholder="Enter password"
																							className="w-100 form-control"
																							onChange={(e) =>
																								setAssessmentPassword(
																									e.target.value
																								)
																							}
																							value={assessmentpassword}
																						/>
																					</div>
																				</div>
																			</div>
																			<div className="row">
																				<div className="col-md-4">
																					<div className=" mt-4">
																						<p className="leableheading">
																							Exam Type{" "}
																							<sup className="star">*</sup>
																						</p>
																						<select
																							className="w-100 form-control"
																							onChange={(e) =>
																								setExamType(e.target.value)
																							}
																						>
																							<option></option>
																							<option value=" Single Timer">
																								{" "}
																								Single Timer
																							</option>
																							<option value="Sectional wise timer">
																								Sectional wise timer
																							</option>
																						</select>
																					</div>
																				</div>
																				<div className="col-md-4">
																					<div className=" mt-4">
																						<p className="leableheading">
																							Cutoff Type
																							<sup className="star">*</sup>
																						</p>
																						<select
																							className="w-100 form-control"
																							onChange={(e) =>
																								setCutoffType(e.target.value)
																							}
																						>
																							<option></option>
																							<option value="Single Cutoff">
																								Single Cutoff
																							</option>
																							<option value="Sectional Cutoff">
																								Sectional Cutoff
																							</option>
																						</select>
																					</div>
																				</div>
																				<div className="col-md-4">
																					<div className=" mt-4">
																						<p className="leableheading">
																							Question Selection{" "}
																							<sup className="star">*</sup>
																						</p>
																						<select
																							className="w-100 form-control light-gray-text"
																							onChange={(e) =>
																								setQuestionSelection(
																									e.target.value
																								)
																							}
																						>
																							<option></option>
																							<option value="Random">
																								Random
																							</option>
																							<option value="What is React Life cycle">
																								What is React Life cycle
																							</option>
																							<option value="Routing">
																								Routing
																							</option>
																							<option value="Explain about UseEffect hook in react">
																								Explain about UseEffect hook in
																								react
																							</option>
																							<option value="What is python?">
																								What is python?
																							</option>
																						</select>
																					</div>
																				</div>
																			</div>
																			<p className="mt-5 leableheading">
																				Assessment Report Options
																				<sup className="star">*</sup>
																			</p>
																			<div className="container showoption">
																				<div className="row">
																					<div className="col-md-10">
																						<div className="row">
																							<div className="col-12 col-md-5">
																								<input
																									type="checkbox"
																									className="custom-checkbox "
																									value="Show Qualifying percentager"
																									checked={assessmentreport.includes(
																										"Show Qualifying percentager"
																									)}
																									onChange={() =>
																										handleCheckboxChange(
																											"Show Qualifying percentager"
																										)
																									}
																								/>
																								<label className="reports ">
																									Show Qualifying percentager
																								</label>
																							</div>

																							<div className="col-12 col-md-3">
																								<input
																									type="checkbox"
																									className="custom-checkbox "
																									value="Show Reports"
																									checked={assessmentreport.includes(
																										"Show Reports"
																									)}
																									onChange={() =>
																										handleCheckboxChange(
																											"Show Reports"
																										)
																									}
																								/>
																								<label className="reports ">
																									Show Reports
																								</label>
																								{/* //uma */}
																							</div>
																							<div className="col-12 col-md-4">
																								<input
																									type="checkbox"
																									value="Show Check answers"
																									className="custom-checkbox "
																									checked={assessmentreport.includes(
																										"Show Check answers"
																									)}
																									onChange={() =>
																										handleCheckboxChange(
																											"Show Check answers"
																										)
																									}
																								/>
																								<label className="reports  ">
																									Show Check answers
																								</label>
																							</div>
																							<div className="col-12 col-md-5">
																								<input
																									type="checkbox"
																									value="Show Chapter Wise Report"
																									className="custom-checkbox"
																									checked={assessmentreport.includes(
																										"Show Chapter Wise Report"
																									)}
																									onChange={() =>
																										handleCheckboxChange(
																											"Show Chapter Wise Report"
																										)
																									}
																								/>
																								<label className="reports ">
																									Show Chapter Wise Report
																								</label>
																							</div>
																							<div className="col-12 col-md-3">
																								<input
																									type="checkbox"
																									value="Show Explanation"
																									className="custom-checkbox "
																									checked={assessmentreport.includes(
																										"Show Explanation"
																									)}
																									onChange={() =>
																										handleCheckboxChange(
																											"Show Explanation"
																										)
																									}
																								/>
																								<label className="reports  ">
																									Show Explanation
																								</label>
																							</div>

																							<div className="col-12 col-md-4">
																								<input
																									type="checkbox"
																									value="Show Accuracy Report"
																									className="custom-checkbox "
																									checked={assessmentreport.includes(
																										"Show Accuracy Report"
																									)}
																									onChange={() =>
																										handleCheckboxChange(
																											"Show Accuracy Report"
																										)
																									}
																								/>
																								<label className="reports ">
																									Show Accuracy
																								</label>
																							</div>
																							<div className="col-12 col-md-5">
																								<input
																									type="checkbox"
																									value="Show Leaderboard"
																									className="custom-checkbox "
																									checked={assessmentreport.includes(
																										"Show Leaderboard"
																									)}
																									onChange={() =>
																										handleCheckboxChange(
																											"Show Leaderboard"
																										)
																									}
																								/>
																								<label className="reports ">
																									Show Leaderboard
																								</label>
																							</div>
																							<div className="col-12 col-md-4">
																								<input
																									type="checkbox"
																									value="Show Private Testcases Output"
																									className="custom-checkbox "
																									checked={assessmentreport.includes(
																										"Show Private Testcases Output"
																									)}
																									onChange={() =>
																										handleCheckboxChange(
																											"Show Private Testcases Output"
																										)
																									}
																								/>
																								<label className="reports">
																									Show Private Testcases
																								</label>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>

																			<p className="mt-5 leableheading">
																				Assessment Flow
																				<sup className="star">*</sup>
																			</p>
																			<div className="row">
																				<div className="col-md-4">
																					<input
																						type="radio"
																						name="assessmentflow"
																						value="Non-Linear"
																						className="custom-checkbox"
																						onChange={(e) =>
																							setAssessmentFlow(e.target.value)
																						}
																					/>
																					<span className="ravi mx-2 reports">
																						Non-Linear
																					</span>
																				</div>
																				<div className="col-md-4">
																					<input
																						type="radio"
																						name="assessmentflow"
																						value="Linear"
																						className="custom-checkbox"
																						onChange={(e) =>
																							setAssessmentFlow(e.target.value)
																						}
																					/>
																					<span className="ravi mx-2 reports">
																						Linear
																					</span>
																				</div>
																			</div>
																			<p className="mt-5 leableheading">
																				Assessment Adaptiveness
																				<sup className="star">*</sup>
																			</p>
																			<div>
																				<input
																					type="radio"
																					name="assessmentadaptiveness"
																					value="Non-Adaptive"
																					className="custom-checkbox"
																					onChange={(e) =>
																						setAssessmentAdaptiveness(
																							e.target.value
																						)
																					}
																				/>
																				<span className="ravi mx-2 reports">
																					Non-Adaptive
																				</span>
																			</div>
																		</div>
																		<div className="d-flex flex-row  justify-content-center">
																			<button
																				className="creat12 mt-3"
																				style={{
																					backgroundColor: "#16c3ea",
																					color: "#000",
																				}}
																			>
																				Continue
																			</button>
																		</div>
																	</form>
																</div>
															</div>
														</div>
													)}
													{activeStep === 1 && (
														<div>
															<div className="row">
																<form onSubmit={onSubmitForm4}>
																	<div className="col-12 col-md-12">
																		<h5 className="my-3">Assessment Options</h5>
																		<div className="row">
																			<div className="col-md-3">
																				<div className="d-flex flex-column mt-2">
																					<p style={{ fontWeight: "600" }}>
																						Qustions Count
																						<sup className="star">*</sup>
																					</p>
																					<input
																						placeholder="Enter qustioncount"
																						className="p-2 w-100 form-control"
																						value={qustioncount}
																						onChange={(e) =>
																							setQustioncount(e.target.value)
																						}
																					/>
																				</div>
																			</div>
																			<div className="col-md-3">
																				<div className="d-flex flex-column mt-2">
																					<p style={{ fontWeight: "600" }}>
																						Total Marks
																						<sup className="star">*</sup>
																					</p>
																					<input
																						placeholder="Enter totalqustion"
																						className="p-2 w-100 form-control"
																						value={totalqustion}
																						onChange={(e) =>
																							setTotalqustion(e.target.value)
																						}
																					/>
																				</div>
																			</div>
																			<div className="col-md-3">
																				<div className="d-flex flex-column mt-2">
																					<p style={{ fontWeight: "600" }}>
																						Duration
																						<sup className="star">*</sup>
																					</p>
																					<input
																						placeholder="Enter duration"
																						className="p-2 w-100 form-control"
																						value={duration}
																						onChange={(e) =>
																							setDuration(e.target.value)
																						}
																					/>
																				</div>
																			</div>
																			<div className="col-md-3">
																				<div className="d-flex flex-column mt-2">
																					<p style={{ fontWeight: "600" }}>
																						Qualifying Percentage
																						<sup className="star">*</sup>
																					</p>
																					<input
																						placeholder="Enter percentage"
																						className="p-2 w-100 form-control"
																						value={percentage}
																						onChange={(e) =>
																							setPercentage(e.target.value)
																						}
																					/>
																				</div>
																			</div>
																		</div>
																		<h5 className="my-3">Assessment Models</h5>
																		<div className="row">
																			<div className="col-md-6">
																				<div className="d-flex flex-column mt-2">
																					<p style={{ fontWeight: "600" }}>
																						Model Name
																						<sup className="star">*</sup>
																					</p>
																					<input
																						placeholder="Enter modelname"
																						className="p-2 w-100 form-control"
																						value={modelname}
																						onChange={(e) =>
																							setModelname(e.target.value)
																						}
																					/>
																				</div>
																			</div>

																			<div className="col-md-6">
																				<div className="d-flex flex-column mt-2">
																					<p style={{ fontWeight: "600" }}>
																						Max Marks
																						<sup className="star">*</sup>
																					</p>
																					<input
																						placeholder="Enter maxmarks"
																						className="p-2 w-100 form-control"
																						value={maxmarks}
																						onChange={(e) =>
																							setMaxmarks(e.target.value)
																						}
																					/>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div className="d-flex flex-row  justify-content-center">
																		<button
																			className="creat12 mt-3"
																			style={{
																				backgroundColor: "#16c3ea",
																				color: "#000",
																			}}
																		>
																			Continue
																		</button>
																	</div>
																</form>
															</div>
														</div>
													)}
													{activeStep === 2 && (
														// <div>
														//     <div className='container'>
														//         <div className='row'>
														//             <div className="col-md-6">
														//                 <div className='d-flex flex-column mt-4'>
														//                     <h5>Required Qustions:10</h5>
														//                     <p>Selected Qustions:</p>
														//                 </div>
														//             </div>
														//             <div className="col-md-6">
														//                 <div className='d-flex flex-column mt-4'>
														//                     <h5>Required Qustions:10</h5>
														//                     <p>Selected Qustions:</p>
														//                 </div>
														//             </div>
														//             <div className='card123 '>
														//                 <select
														//                     type="text"
														//                     placeholder="...Select Subject"

														//                     className="form-control"
														//                     value={selectedSubjectId}
														//                     onChange={handleSubjectTagTypeSelection}
														//                 >
														//                     <option className="hidden" value="">
														//                         Select Subject
														//                     </option>
														//                     {allsubjectsData?.map((subject) => (
														//                         <option
														//                             className="name_item"
														//                             key={subject._id}
														//                             data-value={subject.name}
														//                             value={subject._id}
														//                         >
														//                             {subject.name}
														//                         </option>
														//                     ))}
														//                 </select>

														//                 <p onClick={toggleChapterList} className="mt-3">Show Chapters</p>
														//             </div>

														//             {isChapterListVisible && (
														//                 <div>
														//                     <p className="mt-3">Chapters List:</p>
														//                     <select
														//                         type="text"
														//                         placeholder="...Select Chapter"
														//                         className="form-control w-25"
														//                         onChange={handleChapterTagTypeSelection}
														//                         value={selectedChapterId}
														//                     >
														//                         <option>...select Chapter...</option>
														//                         {allsubjectsData?.map((subject) =>
														//                             subject?.chapter?.map((chapter) => (
														//                                 <option
														//                                     className="name_item"
														//                                     key={chapter._id} // Use a unique key for each option
														//                                     data-value={chapter.Name}
														//                                     value={chapter._id}
														//                                 >
														//                                     {chapter.Name}
														//                                 </option>
														//                             ))
														//                         )}
														//                     </select>

														//                     <div className='col-md-6'>
														//                         <div className='d-flex flex-row mt-3'>
														//                             <input type='checkbox' onClick={Checkbox} /> <span className='mx-3'>Life Cycle Of Component</span>
														//                         </div>
														//                     </div>
														//                 </div>
														//             )}
														//             {isChapterListVisible1 && (

														//                 <div>
														//                     <div className='gobutton1'>
														//                         <button className="creat12 mt-3" onClick={handleGoButtonClick}>Search</button>
														//                     </div>
														//                     <div className='d-flex flex-row mt-3'>
														//                         <button className="selectbuton mx-2" onClick={() => setSelectedQuestionType('MCQ')}>MCQ Questions</button>
														//                         <button className="selectbuton mx-2" onClick={() => setSelectedQuestionType('Para')}>Para Questions</button>
														//                         <button className="selectbuton mx-2" onClick={() => setSelectedQuestionType('Coding')}>Coding Questions</button>
														//                         <button className="selectbuton mx-2" onClick={() => setSelectedQuestionType('Speaking')}>Speaking Questions</button>

														//                     </div>
														//                     {renderTable()}
														//                 </div>
														//             )}

														//         </div>
														//     </div>
														// </div>
														<div className="">
															<div className="row">
																<div className="col-md-8">
																	<div className="col-md-6">
																		<label className="mt-3">
																			Select Subject
																		</label>
																		<select
																			onChange={handleSubjectChange}
																			className="form-control"
																		>
																			<option value="">Select Subject</option>
																			{allsubjectsData?.map((subject) => (
																				<>
																					<option
																						key={subject._id}
																						data-value={subject.name}
																						value={subject._id}
																						className="form-control"
																					>
																						{subject.name}
																					</option>
																				</>
																			))}
																		</select>
																	</div>

																	<div className="col-4 mt-3 ">
																		<button
																			style={{
																				backgroundColor: "#16c3ea",
																				color: "#000",
																				border: "none",
																				padding: "6px",
																				borderRadius: "6px",
																			}}
																			onClick={toggleVisibility}
																		>
																			Show Chapters
																		</button>
																	</div>
																</div>
															</div>
															{addSection && (
																<div className="row">
																	<div className="col-md-6">
																		<div className="mt-3 ml-3">
																			{selectedSubject &&
																				allsubjectsData.map((subject) => {
																					if (subject._id === selectedSubject) {
																						return (
																							<div key={subject._id}>
																								{subject?.chapter?.map(
																									(chapter, id) => (
																										<div
																											key={id}
																											className="checkboxSection1"
																										>
																											<input
																												type="checkbox"
																												id={`chapter_${id}`}
																												value={chapter._id}
																												checked={selectedChapters.includes(
																													chapter._id
																												)}
																												onChange={
																													handleChapterChange
																												}
																												onClick={toggleCheckbox}
																											/>
																											<label
																												htmlFor={`chapter_${id}`}
																												className="mt-1"
																											>
																												{chapter.Name}
																											</label>
																										</div>
																									)
																								)}
																							</div>
																						);
																					}
																					return null;
																				})}
																		</div>
																	</div>
																</div>
															)}
															{viewCheckbox && (
																<div>
																	<div className="viewCheckBoxBtn">
																		<button
																			className="btnBox2"
																			onClick={openMcqBox}
																		>
																			MCQ
																		</button>
																		<button
																			className="btnBox2"
																			onClick={openParagBox}
																		>
																			PARAGRAPH
																		</button>
																	</div>

																	{showMcqBox && (
																		<>
																			{/* <from className="mcqSection" onSubmit={QustionAdd}>
                                                                            {allsubjectsData
                                                                                .filter((subject) => subject._id === selectedSubject)
                                                                                .map((selectedSubject) =>
                                                                                    selectedSubject.chapter
                                                                                        .filter((chapter) =>
                                                                                            selectedChapters.includes(chapter._id)
                                                                                        )
                                                                                        .map((selectedChapter) => (
                                                                                            <div key={selectedChapter._id}>
                                                                                               
                                                                                                {selectedChapter.MCQ.map((mcq) => (
                                                                                                    <div key={mcq._id} className="mcqSection1">
                                                                                                        <input
                                                                                                            type="checkbox"
                                                                                                            id={`mcq_${mcq._id}`}
                                                                                                            value={mcq.Question} // Pass the entire question object as the value
                                                                                                            checked={questionListMcq.includes(
                                                                                                                mcq.Question
                                                                                                            )}
                                                                                                            // checked={assessmentreport.includes('Show Qualifying percentager')}
                                                                                                    onChange={() => handleCheckboxChange1('mcq.Question')}
                                                                                                            // onChange={(e) => handleQuestionList(e, mcq)} // Pass the question object to the handler
                                                                                                        />
                                                                                                        <label htmlFor={`mcq_${mcq._id}`}>
                                                                                                            {mcq.Question}
                                                                                                        </label>
                                                                                                        
                                                                                                    </div>
                                                                                                ))}
                                                                                            </div>
                                                                                        ))
                                                                                )}
                                                                                 <div className="d-flex flex-row  justify-content-center">
                                                                            <button className="creat12 mt-3">Continue</button>
                                                                        </div>
                                                                        </from> */}
																			<form
																				className="mt-3"
																				onSubmit={QustionAdd}
																			>
																				{/* ... your other JSX code */}
																				{/* Make sure to update the values accordingly based on your state structure */}
																				{allsubjectsData
																					.filter(
																						(subject) =>
																							subject._id === selectedSubject
																					)
																					.map((selectedSubject) =>
																						selectedSubject.chapter
																							.filter((chapter) =>
																								selectedChapters.includes(
																									chapter._id
																								)
																							)
																							.map((selectedChapter) => (
																								<div key={selectedChapter._id}>
																									{selectedChapter.MCQ.map(
																										(mcq) => (
																											<div
																												key={mcq._id}
																												className="mcqSection1"
																											>
																												<input
																													type="checkbox"
																													id={`mcq_${mcq._id}`}
																													value={mcq.Question}
																													checked={selectedMCQs
																														.map((v) => v._id)
																														.includes(mcq._id)}
																													onChange={(e) =>
																														handleCheckboxChange1(
																															e,
																															mcq
																														)
																													}
																												/>
																												<label
																													htmlFor={`mcq_${mcq._id}`}
																													className="mt-1"
																												>
																													{mcq.Question}
																												</label>
																											</div>
																										)
																									)}
																								</div>
																							))
																					)}

																				<div className="d-flex flex-row justify-content-center">
																					<button
																						type="submit"
																						className=""
																						style={{
																							backgroundColor: "#16c3ea",
																							color: "#000",
																							padding: "6px",
																							border: "none",
																							borderRadius: "6px",
																						}}
																					>
																						Continue
																					</button>
																				</div>
																			</form>
																		</>
																	)}

																	{showParagBox && (
																		<>
																			<div className="mt-3">
																				{allsubjectsData
																					.filter(
																						(subject) =>
																							subject._id === selectedSubject
																					)
																					.map((selectedSubject) =>
																						selectedSubject.chapter
																							.filter((chapter) =>
																								selectedChapters.includes(
																									chapter._id
																								)
																							)
																							.map((selectedChapter) => (
																								<div key={selectedChapter._id}>
																									{/* <h3>{selectedChapter.Name}</h3> */}
																									{selectedChapter.paragMCQ.map(
																										(parag) => (
																											<div
																												key={parag._id}
																												className="mcqSection1"
																											>
																												<input
																													type="checkbox"
																													id={`parag_${parag._id}`}
																													value={parag.Question} // Pass the entire question object as the value
																													checked={questionListParag.includes(
																														parag.Question
																													)}
																													onChange={(e) =>
																														handleParagQuestionList(
																															e,
																															parag
																														)
																													} // Pass the question object to the handler
																												/>
																												<label
																													htmlFor={`parag_${parag._id}`}
																													className="mt-1"
																												>
																													{parag.Question}
																												</label>
																											</div>
																										)
																									)}
																								</div>
																							))
																					)}
																			</div>
																		</>
																	)}
																</div>
															)}
														</div>
													)}
													{activeStep === 3 && (
														<div className="ml-2">
															<h5 className="mt-3">Assessment Settings</h5>
															<p className="mt-3">Proctoring</p>

															<ToastContainer
																position="top-center"
																autoClose={1000}
																hideProgressBar={false}
																newestOnTop={false}
																closeOnClick
																rtl={false}
																pauseOnFocusLoss
																draggable
																pauseOnHover
																theme="colored"
															/>
															<form onSubmit={onSubmitForm5}>
																<div>
																	<span className="mx-3">
																		{" "}
																		<input
																			type="checkbox"
																			name="Enable"
																			value="Enable Proctoring"
																			onChange={(e) =>
																				setEnable(e.target.value)
																			}
																		/>{" "}
																		Enable Proctoring
																	</span>
																	<br />
																	<span className="mx-3">
																		{" "}
																		<input
																			type="checkbox"
																			name="Restrict"
																			value="Restrict Browser Tab Switching"
																			onChange={(e) =>
																				setRestrict(e.target.value)
																			}
																		/>{" "}
																		Restrict Browser Tab Switching
																	</span>
																</div>

																<div>
																	<div className="row">
																		<div className="col-12 col-md-2">
																			<p>
																				{" "}
																				<input
																					type="radio"
																					className="mx-3 mt-3"
																					name="Tab"
																					value="Yes"
																					onChange={(e) =>
																						setTab(e.target.value)
																					}
																				/>
																				Yes
																			</p>
																		</div>
																		<div className="col-12 col-md-2">
																			<p>
																				<input
																					type="radio"
																					className="mx-3 mt-3"
																					name="Tab"
																					value="No"
																					onChange={(e) =>
																						setTab(e.target.value)
																					}
																				/>
																				No
																			</p>
																		</div>
																		<p className="mt-4">
																			Allow the Assessment to be taken on?
																		</p>
																		<div className="col-12 col-md-3">
																			<input
																				type="checkbox"
																				name="assessmentTabs"
																				value="On Desktop/Laptop"
																				onChange={(e) =>
																					setassessmentTabs(e.target.value)
																				}
																			/>{" "}
																			<span className="mx-2">
																				On Desktop/Laptop
																			</span>
																		</div>
																		<div className="col-12 col-md-3">
																			<input
																				type="checkbox"
																				name="assessmentTabs"
																				value="On Tablet"
																				onChange={(e) =>
																					setassessmentTabs(e.target.value)
																				}
																			/>{" "}
																			<span className="mx-2">On Tablet</span>
																		</div>
																		<div className="col-12 col-md-3">
																			<input
																				type="checkbox"
																				name="assessmentTabs"
																				value="On Mobile"
																				onChange={(e) =>
																					setassessmentTabs(e.target.value)
																				}
																			/>{" "}
																			<span className="mx-2">On Mobile</span>
																		</div>
																	</div>
																</div>
																<div className="d-flex flex-row  justify-content-center">
																	<button
																		className="creat12 mt-3"
																		style={{
																			backgroundColor: "#16c3ea",
																			color: "#000",
																		}}
																	>
																		Continue
																	</button>
																</div>
															</form>
														</div>
													)}
													<Box
														sx={{
															display: "flex",
															flexDirection: "row",
															pt: 2,
														}}
													>
														<Button
															color="inherit"
															disabled={activeStep === 0}
															onClick={handleBack}
															sx={{ mr: 1 }}
														>
															Back
														</Button>
														<Box sx={{ flex: "1 1 auto" }} />
														{isStepOptional(activeStep) && (
															<Button
																color="inherit"
																onClick={handleSkip}
																sx={{ mr: 1 }}
															>
																Skip
															</Button>
														)}
														<Button onClick={handleNext}>
															{activeStep === steps.length - 1
																? "Finish"
																: "Next"}
														</Button>
													</Box>
												</React.Fragment>
											)}
										</Box>
									</Container>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Assement;
