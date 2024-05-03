import { useState, useEffect } from "react";

import Navbar from "../Users/Navbar";
import Editor from "@monaco-editor/react";
import axios from "axios";
import spinner from "../Users/Spinner.gif";
import apiList from "../liberary/apiList";
import UserFooter from "./userfooter";
import NavbarUser from "./navbaruser";
import Cookies from "js-cookie";
import UserNavbar from "./Usernavbar";
import Language from "./language";

function CompailerCode() {
	const [code, setCode] = useState("");
	const [language, setLanguage] = useState("c");
	const [userTheme, setUserTheme] = useState("vs-dark");
	const [fontSize, setFontSize] = useState(17);
	const [userInput, setUserInput] = useState("");
	const [output, setOutput] = useState("");
	const [status, setStatus] = useState("");
	const [jobId, setJobId] = useState("");
	const [loading, setLoading] = useState(false);

	const [showAllCards, setShowAllCards] = useState(true);

	const options = {
		fontSize: fontSize,
	};

	useEffect(() => {
		setCode(defaultCodes[language]);
		setShowAllCards(false);
	}, [language]);

	const handleSubmit = async () => {
		setLoading(true);

		const payload = {
			language,
			code,
			input: userInput,
		};

		try {
			setJobId("");
			setStatus("");
			setOutput("");

			const { data } = await axios.post(apiList.UserCompilerRun, payload);
			console.log("Job submitted:", data);
			setJobId(data.jobId);
			setLoading(true);
			let intervalId;

			intervalId = setInterval(async () => {
				try {
					const { data: dataRes } = await axios.get(
						apiList.UserCompilerStatus,
						{
							params: { id: data.jobId },
						}
					);

					const { success, job, error } = dataRes;
					console.log("Status check:", dataRes);

					if (success) {
						const { status: jobStatus, output: jobOutput } = job;
						setStatus(jobStatus);

						if (jobStatus === "pending") return;

						setOutput(jobOutput);
						clearInterval(intervalId);
						setLoading(false);
					} else {
						setStatus("Error: Please retry!");
						console.error("Error in status check:", error);
						clearInterval(intervalId);
						setOutput(error);
						setLoading(false);
					}
				} catch (statusCheckError) {
					console.error("Axios Error in status check:", statusCheckError);
					clearInterval(intervalId);
					setStatus("Error: Unable to check job status");
					setLoading(false);
				}
			}, 1000);
		} catch (submitError) {
			console.error("Axios Error in job submission:", submitError);

			if (submitError.response) {
				console.log("Response data:", submitError.response.data);

				const errMsg = submitError.response.data?.err?.stderr;
				if (errMsg !== undefined) {
					setOutput(errMsg);
				} else {
					setOutput("Error Connecting To Server!");
				}
			}
		}
	};

	const defaultCodes = {
		c: "#include <iostream>\n\nint main() {\n    // Enter your C code here\n    return 0;\n}",
		cpp: "#include <iostream>\n\nint main() {\n    // Enter your C++ code here\n    return 0;\n}",
		py: "# Enter your Python code here",
		Java: "// Enter your Java code here",
		JavaScript: "// Enter your JavaScript code here",
		Ruby: "# Enter your Ruby code here",
	};

	function clearOutput() {
		setOutput("");
		setStatus("");
		setJobId("");
	}
	const [navbarSetting, setNavbarSetting] = useState(null);

	useEffect(() => {
		const token = Cookies.get("token");

		if (token) {
			setNavbarSetting(<NavbarUser />);
		} else {
			setNavbarSetting(<UserNavbar />);
		}
	}, []);

	return (
		<>
			<NavbarUser />
			{showAllCards ? (
				<div
					className="d-flex flex-row justify-content-center align-items-center"
					style={{ height: "100vh" }}
				>
					<div className="hm-spinner"></div>
				</div>
			) : (
				<div className="App py-5" style={{ marginTop: "39px" }}>
          <div className="text-center">
          <Navbar 
						language={language}
						// userTheme={userTheme}
						// setUserTheme={setUserTheme}
						// fontSize={fontSize}
						// setFontSize={setFontSize}
					/>

          </div>
					
       
					<div className="main container-fluid">
						<div className="code_navbar py-1">
              
							<div className="row">
								<div className="col-md-6">
									<div className="row">
										<div className="col-md-6 text-start  m-auto">
                    <Language setLanguage={setLanguage} />
                    </div>
										<div className="col-md-6 text-end m-auto">
											<button className="run-btn" onClick={handleSubmit}>
												Run
											</button>
										</div>
									</div>
								</div>
								<div className="col-md-6 m-auto">
									<div className="row">
										<div className="col-md-6 m-auto">
											<h5 className="compiletext  text-dark text-start mb-0">Output</h5>
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
			)}
			<div className="mt-1">
				<UserFooter />
			</div>
		</>
	);
}

export default CompailerCode;
