import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiList from "../liberary/apiList";
import NavbarUser from "./navbaruser";
import UserFooter from "./userfooter";
import spinner from "../Users/Spinner.gif";
import Editor from "@monaco-editor/react";
import Navbar from "../Users/Navbar";
import "./Text.css";
import Language from "./language";
const Test = () => {
	const { categoryId, topicId, testId } = useParams();
	console.log(categoryId);
	const [testName, setTestName] = useState("");
	const [questions, setQuestions] = useState([]);
	const [questionsbank, setQuestionsbank] = useState([]);

	const [worksheetLoading, setWorksheetLoading] = useState(true);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [timer, setTimer] = useState(0);
	const [code, setCode] = useState("");

	const [language, setLanguage] = useState("c");

	const [userTheme, setUserTheme] = useState("vs-dark");

	const [fontSize, setFontSize] = useState(20);

	const [userInput, setUserInput] = useState("");

	//  const [userOutput, setUserOutput] = useState("");
	const [output, setOutput] = useState("");
	const [status, setStatus] = useState("");
	const [jobId, setJobId] = useState("");

	const [loading, setLoading] = useState(false);

	const options = {
		fontSize: fontSize,
	};

	useEffect(() => {
		setCode(defaultCodes[language]);
	}, [language]);

	const handleSubmit = async () => {
		setLoading(true);

		const payload = {
			language,
			code,
			input: userInput, // Pass user input to the server
		};

		try {
			setJobId("");
			setStatus("");
			setOutput("");

			const { data } = await axios.post(`${apiList.UserCompilerRun}`, payload);
			console.log(data);
			setJobId(data.jobId);
			let intervalId;

			intervalId = setInterval(async () => {
				const { data: dataRes } = await axios.get(
					`${apiList.UserCompilerStatus}`,
					{ params: { id: data.jobId } }
				);

				const { success, job, error } = dataRes;
				console.log(dataRes);

				if (success) {
					const { status: jobStatus, output: jobOutput } = job;
					setStatus(jobStatus);

					if (jobStatus === "pending") return;

					setOutput(jobOutput);
					clearInterval(intervalId);
					setLoading(false);
				} else {
					setStatus("Error: Please retry!");
					console.error(error);
					clearInterval(intervalId);
					setOutput(error);
					setLoading(false);
				}
				console.log(dataRes);
			}, 1000);
		} catch ({ response }) {
			if (response) {
				const errMsg = response.data.err.stderr;
				setOutput(errMsg);
			} else {
				setOutput("Error Connecting To Server!");
			}

			setLoading(false);
		}
	};

	const defaultCodes = {
		c: "#include <iostream>\n\nint main() {\n    // Enter your C code here\n    return 0;\n}",
		cpp: "#include <iostream>\n\nint main() {\n    // Enter your C++ code here\n    return 0;\n}",
		py: "# Enter your Python code here",
		java: "// Enter your Java code here", // Updated to "java"
		JavaScript: "// Enter your JavaScript code here",
		Ruby: "# Enter your Ruby code here",
	};
	// Function to clear the output screen
	function clearOutput() {
		setOutput("");
		setStatus("");
		setJobId("");
	}
	useEffect(() => {
		const fetchData = async () => {
			const api = `${apiList.categoriesUser}/${categoryId}`;
			try {
				const response = await axios.get(api);
				const selectedTest = response.data.Practicetopic.find(
					(topic) => topic._id === topicId
				).Testtopic.find((test) => test._id === testId);
				console.log(selectedTest);
				const {
					testName,
					questionListMcq,
					questionListCoding,
					questionListParag,
				} = selectedTest;

				// Log the values for debugging
				console.log("testName:", testName);
				console.log("questionListMcq:", questionListMcq);

				setTestName(testName);
				setQuestions(selectedTest.Testtopic);
				const mcqQuestions = questionListMcq
					? questionListMcq.map((each) => each.Question)
					: [];
				const codingQuestions = questionListCoding
					? questionListCoding.map((each) => each.Description)
					: [];
				const paragQuestions = questionListParag
					? questionListParag.map((each) => each.Question)
					: [];
				setQuestionsbank([
					...mcqQuestions,
					...codingQuestions,
					...paragQuestions,
				]);
				// setQuestionsbank(questionListMcq.map(each=>each.Question) || questionListCoding.map(each=>each.Description));
				setWorksheetLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [categoryId, topicId, testId]);

	useEffect(() => {
		// Start the timer
		const timerInterval = setInterval(() => {
			setTimer((prevTimer) => prevTimer + 1);
		}, 1000);

		// Cleanup the interval on component unmount
		return () => clearInterval(timerInterval);
	}, []);

	const handleNextQuestion = () => {
		if (currentQuestionIndex < questionsbank.length - 1) {
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
		}
	};

	const handlePrevQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
		}
	};

	const formatTime = (seconds) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		return `${formatUnit(hours)}:${formatUnit(minutes)}:${formatUnit(secs)}`;
	};

	const formatUnit = (unit) => (unit < 10 ? `0${unit}` : unit);

	return (
		<>
			<NavbarUser />
			<div className="container-fluid  mt-5 pt-4">
				<div className="row">
					<div
						className="col-md-12  mt-2"
						style={{ borderBottom: "2px solid #16c3ea" }}
					>
						<div className="text-center  ">
							<h4 className="pt-4">{testName}</h4>
						</div>
						<div className="clock_time">
							<h6>Timer: {formatTime(timer)}</h6>
						</div>
					</div>
				</div>
				<div className=" p-2 ">
					<div className="row">
						<div className="col-md-2 my-2">
							{questionsbank.length > 0 ? (
								<div className="" style={{marginTop:"60px"}}>
									<p style={{ fontSize: "18px", fontWeight: "500" }}>
										Question {currentQuestionIndex + 1} of{" "}
										{questionsbank.length}
									</p>
									<p>{questionsbank[currentQuestionIndex]}</p>
									<div className="">
										<button
											type="button"
											className="btn "
											style={{
												backgroundColor: "#16c3ea",
												border: "none",
												color: "#000",
											}}
											onClick={handlePrevQuestion}
											disabled={currentQuestionIndex === 0}
										>
											Previous
										</button>

										<button
											type="button"
											className="btn  m-4"
											style={{
												backgroundColor: "#910a8f",
												border: "none",
												color: "#fff",
											}}
											onClick={handleNextQuestion}
											disabled={
												currentQuestionIndex === questionsbank.length - 1
											}
										>
											Next
										</button>
									</div>
								</div>
							) : (
								<p>No questions...</p>
							)}
						</div>
						<div className="col-md-10">
							<div className="text-center">
								<Navbar
									language={language}
									// userTheme={userTheme}
									// setUserTheme={setUserTheme}
									// fontSize={fontSize}
									// setFontSize={setFontSize}
								/>
							</div>

							<div className=" container-fluid">
								<div className="code_navbar py-1">
									<div className="row">
										<div className="col-md-6">
											<div className="row">
												<div className="col-md-7 text-start  m-auto">
													<div className="icons ">
														<button
															className={`img-fluid compiler_img  ${
																language === "c" ? "selected" : ""
															}`}
															style={{ height: "30px", marginRight: "10px" }}
															onClick={() => setLanguage("c")}
														>
															C
														</button>
														<button
															className={`img-fluid compiler_img  ${
																language === "cpp" ? "selected" : ""
															}`}
															style={{ height: "30px", marginRight: "10px" }}
															onClick={() => setLanguage("cpp")}
														>
															C++
														</button>
														<button
															className={`img-fluid compiler_img ${
																language === "py" ? "selected" : ""
															}`}
															style={{ height: "30px", marginRight: "10px" }}
															onClick={() => setLanguage("py")}
														>
															Python
														</button>
														<button
															className={`img-fluid compiler_img ${
																language === "Java" ? "selected" : ""
															}`}
															style={{ height: "30px", marginRight: "10px" }}
															onClick={() => setLanguage("Java")}
														>
															Java
														</button>
														<button
															className={`img-fluid compiler_img ${
																language === "JavaScript" ? "selected" : ""
															}`}
															style={{ height: "30px", marginRight: "10px" }}
															onClick={() => setLanguage("JavaScript")}
														>
															JS
														</button>
														<button
															className={`img-fluid compiler_img ${
																language === "Ruby" ? "selected" : ""
															}`}
															style={{ height: "30px", marginRight: "10px" }}
															onClick={() => setLanguage("Ruby")}
														>
															Ruby
														</button>

														{/* Add more images for other languages */}
													</div>
												</div>
												<div className="col-md-5 text-end m-auto">
													<button className="run-btn" onClick={handleSubmit}>
														Run
													</button>
												</div>
											</div>
										</div>
										<div className="col-md-6 m-auto">
											<div className="row">
												<div className="col-md-6 m-auto">
													<h5 className="compiletext  text-dark text-start mb-0">
														Output
													</h5>
												</div>
												<div className="col-md-6 text-end m-auto">
													<button
														onClick={() => {
															clearOutput();
														}}
														className="clear-btn"
													>
														Clear
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-md-6">
										<div className="">
											<Editor
												options={options}
												height="calc(70vh - 50px)"
												width="100%"
												// theme={userTheme}
												className="code_comp"
												language={language}
												defaultValue={defaultCodes[language]}
												value={code}
												onChange={(value) => {
													setCode(value);
												}}
											/>
										</div>
									</div>
									<div className="col-md-6">
										{loading ? (
											<div className="spinner-box">
												<img
													src={spinner}
													alt="Loading..."
													style={{
														fontSize: "30px",
														height: "100px",
														width: "100px",
														overflowY: "scroll",
													}}
												/>
											</div>
										) : (
											<div className="output-box">
												<p className="text-dark text-start">{output}</p>
											</div>
										)}
									</div>
									<div className="col-md-12">
										<div className="row">
											<div className="col-md-12">
												<h3 className="compiletext  text-dark mt-3">Input</h3>
												<div className="input-box">
													<textarea
														id="code-inp"
														className=""
														rows={8}
														onChange={(e) => setUserInput(e.target.value)}
													></textarea>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<UserFooter />
		</>
	);
};

export default Test;
