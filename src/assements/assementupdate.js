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
import { useLocation, useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import apiList from "../liberary/apiList";
import { useParams } from "react-router-dom";

// const steps = ["BASIC", "SET ASSESSMENT PAPER", "SELECT QUSTIONS", "ASSESSMENT SETTINGS"];
const steps = ["BASIC", "ASSESSMENT SETTINGS"];

function AssementUpdate() {
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());
	const [isOpen, setIsOpen] = useState(true);
	const { categoryId, id } = useParams();
	console.log(categoryId);
	console.log(id);
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
	const menuBtnChange = () => {
		const sidebar = document.querySelector(".sidebar");
		const closeBtn = document.querySelector("#btn");

		if (sidebar?.classList.contains("open")) {
			closeBtn?.classList.replace("bx-menu", "bx-menu-alt-right");
		} else {
			closeBtn?.classList.replace("bx-menu-alt-right", "bx-menu");
		}
	};
	const [assessmentreport, setAssessmentReport] = useState([]);
	const handleCheckboxChange = (value) => {
		const updatedOptions = assessmentreport.includes(value)
			? assessmentreport.filter((option) => option !== value)
			: [...assessmentreport, value];

		setAssessmentReport(updatedOptions);
		console.log(updatedOptions);
	};
	const assessmentReportString = assessmentreport.join(", ");
	const [selectedMCQs, setSelectedMCQs] = useState([]);
	const handleCheckboxChange1 = (question) => {
		setSelectedMCQs((prevSelectedMCQs) => {
			if (prevSelectedMCQs.includes(question)) {
				return prevSelectedMCQs.filter((q) => q !== question);
			} else {
				return [...prevSelectedMCQs, question];
			}
		});
	};
	const [category, setCategory] = useState([]);
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
		}
	};

	useEffect(() => {
		fetchCompanyDetails1();
	}, []);
	const [individualSelectedCategory, setIndividaulCategorydetails] = useState(
		{}
	);
	const [selectedcategoryId, setSelectedcategoryId] = useState([]);
	const [category1, setCategory1] = useState("");
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
	};
	const [assementindividual, setassementindividual] = useState({});
	const [assessmentSettings, setAssessmentSettings] = useState({});
	const [individualInstitute, setIndividualInstitute] = useState({
		assessmentname: "",
		nooftimes: "",
		exametype: "",
		cutofftype: "",
		questionselection: "",
		assessmentreport: [], // Initialize as an empty array
		assessmentflow: "",
		assessmentadaptiveness: "",
		assessmentpassword: "",
	});

	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			console.log(id);
			try {
				const response = await axios.get(`${apiList.categories}/${categoryId}`);
				setIndividualInstitute(response.data);
				console.log(response.data);
				setassementindividual(
					response.data.Assessment.filter(
						(assessment) => assessment._id === id
					)[0]
				);
				console.log(
					"setassementindividual",
					response.data.Assessment.filter((assessment) => assessment._id === id)
				);
				setAssessmentSettings(
					response.data.Assessment.filter(
						(assessment) => assessment._id === id
					)[0].Assessmentsettings[0]
				);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [categoryId, id]);

	const handleEditInputChange = (value, name) => {
		if (name === "assessmentreport") {
			const currentOptions = assementindividual[name] || [];
			const updatedOptions = [...currentOptions];

			if (updatedOptions.includes(value)) {
				// If the option is already in the array, remove it
				updatedOptions.filter((v) => v == !value);
			} else {
				// If the option is not in the array, add it
				updatedOptions.push(value);
			}

			setassementindividual({
				...assementindividual,
				[name]: updatedOptions,
			});
		} else {
			setassementindividual({
				...assementindividual,
				[name]: value,
			});
		}
	};

	const handleEditInputAssessmentSettingsChange = (value, name) => {
		console.log(value, name);
		setAssessmentSettings({
			...assessmentSettings,
			[name]: value,
		});
	};

	const onSubmitForm = (e) => {
		e.preventDefault();
		axios
			.put(
				`${apiList.updateassessment}/${categoryId}/${id}`,
				assementindividual
			)
			.then((response) => {
				console.log(response.data);
				if (response.status === 200) {
					toast("Update Successful", {
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
					setTimeout(function () {
						setActiveStep(1);
					}, 3000);
				}
			})
			.catch((error) => {
				console.error(error);
				setError("An error occurred while updating the Learn Path.");
				console.log(error.message);
			});
	};

	const onSubmitForm1 = (e) => {
		e.preventDefault();
		axios
			.put(
				`${apiList.Assessmentsettings}/${categoryId}/${id}`,
				assessmentSettings
			)
			.then((response) => {
				console.log(response.data);
				if (response.status === 200) {
					toast("Update Successful", {
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
					setTimeout(function () {
						// navigate("/Blogs1");
					}, 3000);
				}
			})
			.catch((error) => {
				console.error(error);
				setError("An error occurred while updating the Learn Path.");
				console.log(error.message);
			});
	};
	const [addSection, setAddSection] = useState(false);
	const [selectedSubject, setSelectedSubject] = useState("");
	const [selectedChapters, setSelectedChapters] = useState([]);
	const [questionListMcq, setQuestionListMcq] = useState([]);
	const [questionListParag, setQuestionListParag] = useState([]);
	const [viewCheckbox, setViewCheckbox] = useState(false);
	const [showMcqBox, setShowMcqBox] = useState(false);
	const [showParagBox, setShowParagBox] = useState(false);
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
						<div className="">
							<i
								className="fa-solid fa-bars bars d-lg-block d-none"
								onClick={toggleSidebar}
							></i>
							<div className="mt-3 w-100">
								<Container>
									<Box>
										<Stepper activeStep={activeStep}>
											{steps.map((label, index) => {
												const stepProps = {};
												const labelProps = {};
												if (isStepOptional(index)) {
													labelProps.optional = (
														<Typography variant="caption"></Typography>
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
												<Typography sx={{ mt: 3, mb: 1, ml: 1 }}>
													All steps completed - you&apos;re finished
												</Typography>
												<Box
													sx={{ display: "flex", flexDirection: "row", pt: 2 }}
												>
													<Box sx={{ flex: "1 1 auto" }} />
													<Button onClick={() => navigate("/Assementview")}>
														View
													</Button>
												</Box>
											</React.Fragment>
										) : (
											<React.Fragment>
												{activeStep === 0 && (
													<div>
														<div className="row">
															<div className="col-md-12">
																<form onSubmit={onSubmitForm}>
																	<div class="col-md-12">
																		<p
																			className="leableheading mt-3"
																			style={{ fontWeight: "600" }}
																		>
																			Category <sup className="star">*</sup>
																		</p>
																		<input
																			name=""
																			id=""
																			className="p-2 form-control"
																			value={individualInstitute.name}
																			disabled
																		/>{" "}
																		<div className="row">
																			<div className="col-md-4">
																				<div className="d-flex flex-column mt-4">
																					<p className="leableheading">
																						Assessment Name
																						<sup className="star">*</sup>
																					</p>
																					{/* assementindividual */}
																					<input
																						placeholder="Enter assessment name"
																						className=" w-100 form-control"
																						name="assessmentname"
																						onChange={(e) =>
																							handleEditInputChange(
																								e.target.value,
																								"assessmentname"
																							)
																						}
																						value={
																							assementindividual?.assessmentname
																						}
																					/>
																				</div>
																			</div>
																			<div className="col-md-4">
																				<div className="d-flex flex-column mt-4">
																					<p className="leableheading">
																						No of Times
																						<sup className="star">*</sup>
																					</p>
																					<input
																						placeholder="Enter Time"
																						className="w-100 form-control"
																						name="nooftimes"
																						onChange={(e) =>
																							handleEditInputChange(
																								e.target.value,
																								"nooftimes"
																							)
																						}
																						value={
																							assementindividual?.nooftimes
																						}
																					/>
																				</div>
																			</div>
																			<div className="col-md-4">
																				<div className="d-flex flex-column mt-4">
																					<p className="leableheading">
																						Assement Password
																						<sup className="star">*</sup>
																					</p>
																					<input
																						placeholder="Enter password"
																						className="w-100 form-control"
																						name="assessmentpassword"
																						onChange={(e) =>
																							handleEditInputChange(
																								e.target.value,
																								"assessmentpassword"
																							)
																						}
																						value={
																							assementindividual?.assessmentpassword
																						}
																					/>
																				</div>
																			</div>
																		</div>
																		<div className="row">
																			<div className="col-md-4">
																				<div className="d-flex flex-column mt-4">
																					<p className="leableheading">
																						Exame Type{" "}
																						<sup className="star">*</sup>
																					</p>
																					<select
																						className="w-100 form-control"
																						name="exametype"
																						onChange={(e) =>
																							handleEditInputChange(
																								e.target.value,
																								"exametype"
																							)
																						}
																						value={
																							assementindividual?.exametype
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
																				<div className="d-flex flex-column mt-4">
																					<p className="leableheading">
																						Cutoff Type
																						<sup className="star">*</sup>
																					</p>
																					<select
																						className=" w-100 form-control"
																						name="cutofftype"
																						onChange={(e) =>
																							handleEditInputChange(
																								e.target.value,
																								"cutofftype"
																							)
																						}
																						value={
																							assementindividual?.cutofftype
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
																				<div className="d-flex flex-column mt-4">
																					<p className="leableheading">
																						Question Selection{" "}
																						<sup className="star">*</sup>
																					</p>
																					<select
																						className="w-100 form-control light-gray-text"
																						name="questionselection"
																						onChange={(e) =>
																							handleEditInputChange(
																								e.target.value,
																								"questionselection"
																							)
																						}
																						value={
																							assementindividual?.questionselection
																						}
																					>
																						<option></option>
																						<option value="select">
																							select
																						</option>
																						<option value="Random">
																							Random
																						</option>
																					</select>
																				</div>
																			</div>
																		</div>
																		<p className="mt-5 leableheading">
																			Assessment Report Options
																			<sup className="star">*</sup>
																		</p>
																		<div className=" showoption">
																			<div className="row">
																				<div className="col-md-12">
																					<div className="row">
																						<div className="col-12 col-md-4">
																							<input
																								type="checkbox"
																								className="custom-checkbox "
																								name="assessmentreport"
																								value="Show Qualifying percentager"
																								onChange={(e) =>
																									handleEditInputChange(
																										e.target.value,
																										"assessmentreport"
																									)
																								}
																								checked={assementindividual.assessmentreport?.includes(
																									"Show Qualifying percentager"
																								)}
																							/>
																							<label className="reports">
																								Show Qualifying percentager
																							</label>
																						</div>

																						<div className="col-12 col-md-4">
																							<input
																								type="checkbox"
																								className="custom-checkbox "
																								// value="Show Reports"
																								name="assessmentreport"
																								value="Show Reports"
																								onChange={(e) =>
																									handleEditInputChange(
																										e.target.value,
																										"assessmentreport"
																									)
																								}
																								checked={assementindividual.assessmentreport?.includes(
																									"Show Reports"
																								)}
																							/>
																							<label className="reports ">
																								Show Reports
																							</label>
																						</div>
																						<div className="col-12 col-md-4">
																							<input
																								type="checkbox"
																								// value="Show Check answers"
																								className="custom-checkbox "
																								name="assessmentreport"
																								value="Show Check answers"
																								onChange={(e) =>
																									handleEditInputChange(
																										e.target.value,
																										"assessmentreport"
																									)
																								}
																								checked={assementindividual.assessmentreport?.includes(
																									"Show Check answers"
																								)}
																							/>
																							<label className="reports">
																								Show Check answers
																							</label>
																						</div>
																						<div className="col-12 col-md-4">
																							<input
																								type="checkbox"
																								// value="Show Explanation"
																								className="custom-checkbox "
																								name="assessmentreport"
																								value="Show Explanation"
																								onChange={(e) =>
																									handleEditInputChange(
																										e.target.value,
																										"assessmentreport"
																									)
																								}
																								checked={assementindividual.assessmentreport?.includes(
																									"Show Explanation"
																								)}
																							/>
																							<label className="reports ">
																								Show Explanation
																							</label>
																						</div>

																						<div className="col-12 col-md-4">
																							<input
																								type="checkbox"
																								// value="Show Chapter Wise Report"
																								className="custom-checkbox"
																								name="assessmentreport"
																								value="Show Chapter Wise Report"
																								onChange={(e) =>
																									handleEditInputChange(
																										e.target.value,
																										"assessmentreport"
																									)
																								}
																								checked={assementindividual.assessmentreport?.includes(
																									"Show Chapter Wise Report"
																								)}
																							/>
																							<label className="reports">
																								Show Chapter Wise Report
																							</label>
																						</div>
																						<div className="col-12 col-md-4">
																							<input
																								type="checkbox"
																								// value="Show Accuracy Report"
																								className="custom-checkbox "
																								name="assessmentreport"
																								value="Show Accuracy"
																								onChange={(e) =>
																									handleEditInputChange(
																										e.target.value,
																										"assessmentreport"
																									)
																								}
																								checked={assementindividual.assessmentreport?.includes(
																									"Show Accuracy"
																								)}
																							/>
																							<label className="reports">
																								Show Accuracy
																							</label>
																						</div>
																						<div className="col-12 col-md-4">
																							<input
																								type="checkbox"
																								// value="Show Leaderboard"
																								className="custom-checkbox "
																								name="assessmentreport"
																								value="Show Leaderboard"
																								onChange={(e) =>
																									handleEditInputChange(
																										e.target.value,
																										"assessmentreport"
																									)
																								}
																								checked={assementindividual.assessmentreport?.includes(
																									"Show Leaderboard"
																								)}
																							/>
																							<label className="reports">
																								Show Leaderboard
																							</label>
																						</div>
																						<div className="col-12 col-md-4">
																							<input
																								type="checkbox"
																								// value="Show Private Testcases Output"
																								className="custom-checkbox "
																								name="assessmentreport"
																								value="Show Private Testcases"
																								onChange={(e) =>
																									handleEditInputChange(
																										e.target.value,
																										"assessmentreport"
																									)
																								}
																								checked={assementindividual.assessmentreport?.includes(
																									"Show Private Testcases"
																								)}
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
																					value="Non-Linear"
																					className="custom-checkbox"
																					name="assessmentflow"
																					onChange={(e) =>
																						handleEditInputChange(
																							e.target.value,
																							"assessmentflow"
																						)
																					}
																					checked={
																						assementindividual?.assessmentflow ===
																							"Non-Linear" || ""
																					}
																				/>
																				<span className="ravi mx-2 reports">
																					Non-Linear
																				</span>
																			</div>
																			<div className="col-md-4">
																				<input
																					type="radio"
																					value="Linear"
																					className="custom-checkbox"
																					name="assessmentflow"
																					onChange={(e) =>
																						handleEditInputChange(
																							e.target.value,
																							"assessmentflow"
																						)
																					}
																					checked={
																						assementindividual?.assessmentflow ===
																							"Linear" || ""
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
																				className="custom-checkbox"
																				name="assessmentadaptiveness"
																				value="assessmentadaptiveness"
																				onChange={(e) =>
																					handleEditInputChange(
																						e.target.value,
																						"assessmentadaptiveness"
																					)
																				}
																				checked={
																					assementindividual?.assessmentadaptiveness ===
																						"Non-Adaptive" || ""
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
														<h6 className="mt-3">Assessmentsettings</h6>
														<p className="mt-3">Proctoring</p>
														<form onSubmit={onSubmitForm1}>
															<div>
																<span className="mx-3">
																	<input
																		type="checkbox"
																		name="Enable"
																		value="Enable Proctoring"
																		onChange={(e) =>
																			handleEditInputAssessmentSettingsChange(
																				e.target.value,
																				"Enable"
																			)
																		}
																		checked={assessmentSettings.Enable.includes(
																			"Enable Proctoring"
																		)}
																	/>{" "}
																	Enable Proctoring
																</span>
																<br />
																<span className="mx-3">
																	<input
																		type="checkbox"
																		name="Restrict"
																		value="Restrict Browser Tab Switching"
																		onChange={(e) =>
																			handleEditInputAssessmentSettingsChange(
																				e.target.value,
																				"Restrict"
																			)
																		}
																		checked={assessmentSettings.Restrict.includes(
																			"Restrict Browser Tab Switching"
																		)}
																	/>{" "}
																	Restrict Browser Tab Switching
																</span>
															</div>
															<div>
																<div className="container">
																	<div className="row">
																		<div className="col-12 col-md-2">
																			<p>
																				<input
																					type="radio"
																					className="mx-3 mt-3"
																					name="Tab"
																					value="Yes"
																					onChange={(e) =>
																						handleEditInputAssessmentSettingsChange(
																							e.target.value,
																							"Tab"
																						)
																					}
																					checked={assessmentSettings.Tab.includes(
																						"Yes"
																					)}
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
																						handleEditInputAssessmentSettingsChange(
																							e.target.value,
																							"Tab"
																						)
																					}
																					checked={assessmentSettings.Tab.includes(
																						"No"
																					)}
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
																					handleEditInputAssessmentSettingsChange(
																						e.target.value,
																						"assessmentTabs"
																					)
																				}
																				checked={assessmentSettings.assessmentTabs.includes(
																					"On Desktop/Laptop"
																				)}
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
																					handleEditInputAssessmentSettingsChange(
																						e.target.value,
																						"assessmentTabs"
																					)
																				}
																				checked={assessmentSettings.assessmentTabs.includes(
																					"On Tablet"
																				)}
																			/>{" "}
																			<span className="mx-2">On Tablet</span>
																		</div>
																		<div className="col-12 col-md-3">
																			<input
																				type="checkbox"
																				name="assessmentTabs"
																				value="On Mobile"
																				onChange={(e) =>
																					handleEditInputAssessmentSettingsChange(
																						e.target.value,
																						"assessmentTabs"
																					)
																				}
																				checked={assessmentSettings.assessmentTabs.includes(
																					"On Mobile"
																				)}
																			/>{" "}
																			<span className="mx-2">On Mobile</span>
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
												)}
												<Box
													sx={{ display: "flex", flexDirection: "row", pt: 2 }}
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
					</div>
				</div>
			</div>
		</div>
	);
}

export default AssementUpdate;
