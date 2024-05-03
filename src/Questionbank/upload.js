import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { useEffect } from "react";
import axios from "axios";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import apiList from "../liberary/apiList";
import { ToastContainer } from "react-toastify";

const Upload = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [allsubjectsData, setAllsubjectsData] = useState([]);
	const [allMcqsList, setallMCqsList] = useState([]);
	const [selectedSubject, setSelectedSubject] = useState("");
	const [selectedChapter, setSelectedChapter] = useState("");
	const [itisLoading, setItisLoading] = useState(true);

	useEffect(() => {
		fetchblogs();
	});

	const fetchblogs = async () => {
		const api = `${apiList.subjects}`;
		try {
			const response = await axios.get(api);
			setAllsubjectsData(response.data);
			setItisLoading(false);
		} catch (error) {
			console.error("Error fetching blogs:", error);
		}
	};

	const [selectedSubjectId, setSelectedSubjectId] = useState([]);
	const handleSubjectTagTypeSelection = (event) => {
		setSelectedSubject(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
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
	console.log(selectedSubjectId);
	console.log(selectedChapterId);
	const exportToExcel = () => {
		const dataToExport = allsubjectsData;
		const fileType =
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
		const fileExtension = ".xlsx";

		const ws = XLSX.utils.json_to_sheet(dataToExport);
		const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, "praticipation_data" + fileExtension);
	};

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
	const [isInstitutionsOpen, setIsInstitutionsOpen] = useState(false);

	const toggleInstitutions = () => {
		setIsInstitutionsOpen(!isInstitutionsOpen);
	};
	const [isInstitutionsOpen1, setIsInstitutionsOpen1] = useState(true);

	const toggleInstitutions1 = () => {
		setIsInstitutionsOpen1(!isInstitutionsOpen1);
	};
	const [isInstitutionsOpen2, setIsInstitutionsOpen2] = useState(true);

	const toggleInstitutions2 = () => {
		setIsInstitutionsOpen2(!isInstitutionsOpen2);
	};

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
						style={{ height: "100vh", overflowY: "scroll" }}
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
							<>
								<i
									className="fa-solid fa-bars bars  d-lg-block d-none"
									onClick={toggleSidebar}
								></i>{" "}
								<div className="">
									<div className="row">
										<div className="col-md-12 text-center">
											<h3 className="my-3" style={{color:"#16c3ea"}}>Upload Questions</h3>
										</div>
									</div>
									<div className="row ">
										<div className="col-6">
											<select
												onChange={handleSubjectTagTypeSelection}
												className="form-control"
											>
												<option>Select Subject</option>
												{allsubjectsData?.map((subject) => (
													<option
														className="name_item"
														key={subject._id}
														data-value={subject.subjectTag}
														value={subject._id}
													>
														{subject.subjectTag}
													</option>
												))}
											</select>
										</div>
										<div className="col-6">
											<select
												type="text"
												placeholder="...Select Chapter"
												className="form-control"
												onChange={handleChapterTagTypeSelection}
											>
												<option>Select Chapter</option>
												{allsubjectsData?.map((subject, index) =>
													subject?.chapter?.map((chapter) => (
														<>
															<option
																className="name_item"
																key={chapter._id} // Use a unique key for each option
																data-value={chapter.ChapterTag}
																value={chapter._id}
															>
																{chapter.ChapterTag}
															</option>
														</>
													))
												)}
											</select>
										</div>
									</div>
									<div className="row mt-3">
										<div className="col-md-6">
											{/* <input type="text" className="w-100" /> */}
											<div className="">
												{/* inpu className="w-100 text-start ">No file choosen</button> */}
												<label>Add File</label>
												<input
													type="file"
													className=" text-start form-control"
													accept=".xls, .xlsx"
												/>
											</div>
										</div>
										<div className="col-md-6 mt-4">
											<div
												className="btn btn-light mt-2"
												style={{
													backgroundColor: "#a5059d",
													color: "white",
												}}
												onClick={exportToExcel}
											>
												{" "}
												<i class="fa-solid fa-download"></i> Download Format
											</div>
										</div>
									</div>

									<div className="text-center mt-3">
										<button
											style={{
												backgroundColor: "#16c3ea",
												color: "#000",
											}}
											className="btn"
										>
											Upload Question
										</button>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Upload;
