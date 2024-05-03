import React from "react";
import { useEffect, useState, useRef } from "react";
import Sidebar from "../Sidebar";
import { Audio } from "react-loader-spinner";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import apiList from "../liberary/apiList";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function Participation() {
	const [isOpen, setIsOpen] = useState(true);
	let navigate = useNavigate();
	const [worksheetLoading, setWorksheetLoading] = useState(true);
	const [institutionData, setInstitutionData] = useState([]);
	const [categoryData, setCategoryData] = useState([]);
	const [assessmentData, setAssessmentData] = useState([]);
	const [batchYears, setBatchYears] = useState([]);
	const [batches, setBatches] = useState([]);
	const [topics, setTopics] = useState([]);
	const [selectedInstitution, setSelectedInstitution] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedAssessment, setSelectedAssessment] = useState("");
	const [selectedBatchYear, setSelectedBatchYear] = useState("");
	const [selectedBatch, setSelectedBatch] = useState("");
	const [selectedTopic, setSelectedTopic] = useState("");

	useEffect(() => {
		const fetchInstitutionData = async () => {
			const api = `${apiList.allAddInstitutes}`;
			try {
				const response = await axios.get(api);
				setInstitutionData(response.data);
				setWorksheetLoading(false);
			} catch (error) {
				console.error("Error in Getting the Institution data");
			}
		};

		const fetchCategoryData = async () => {
			const api = `${apiList.categories}`;
			try {
				const response = await axios.get(api);
				setCategoryData(response.data);
			} catch (error) {
				console.error("Error in Getting the Category");
			}
		};

		const fetchTopicData = async () => {
			const api = `${apiList.allpractices}`;
			try {
				const response = await axios.get(api);
				setTopics(response.data.data);
			} catch (error) {
				console.error("Error in Getting the Category");
			}
		};
		fetchTopicData();
		fetchCategoryData();
		fetchInstitutionData();
	}, []);
	console.log(topics, "topics");

	const [selectedInstituteId, setSelectedInstituteId] = useState("");
	const [selectedBatchYearId, setSelectedBatchYearId] = useState("");
	const [selectedBatchId, setSelectedBatchId] = useState("");
	const [filteredInstitutionData, setFilteredInstitutionData] = useState([]);
	const [filteredBatchYearData, setFilteredBatchYearData] = useState([]);

	console.log(selectedInstituteId, "selected Institutions");
	const handleInstituteSelection = (e) => {
		setFilteredInstitutionData([]);
		setFilteredBatchYearData([]);

		setSelectedInstituteId(
			e.target.options[e.target.selectedIndex].getAttribute("value")
		);
		const selectedId = e.target.value;
		const result = institutionData?.find(
			(item) => item?.InstituteName === selectedId
		);

		console.log("Filtered Data 1:", result?.InstituteBatchYear);
		setTimeout(() => {
			setFilteredInstitutionData(result?.InstituteBatchYear || []);
		}, 10);

		setSelectedBatchYearId("");
		setSelectedBatchId("");
	};
	const handleBatchYearSelection = (e) => {
		setFilteredBatchYearData([]);
		setSelectedBatchYearId(
			e.target.options[e.target.selectedIndex].getAttribute("value")
		);
		const selectedById = e.target.value;
		const result2 = filteredInstitutionData?.find(
			(item) => item?.BatchYear === selectedById
		);
		console.log("Filtered Data 2:", result2);
		setFilteredBatchYearData(result2?.InsituteBatch || []);
		setSelectedBatchId("");
	};
	const handleBatchSelection = (e) => {
		setSelectedBatchId(
			e.target.options[e.target.selectedIndex].getAttribute("value")
		);
	};
	console.log(categoryData, "Category Data");
	console.log(institutionData, " insti All data");
	const handleExportToExcel = () => {
		// Prepare your data for export (replace this with your actual data)
		const dataToExport = {
			institution: selectedInstituteId,
			category: selectedCategory,
			assessment: selectedAssessment,
			batchYear: selectedBatchYearId,
			batch: selectedBatchId,
		};

		// Create a new workbook and add a worksheet
		const ws = XLSX.utils.json_to_sheet([dataToExport]);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "PracticeReport");

		// Save the workbook directly using FileSaver.js
		XLSX.writeFileSync(wb, "Participation.xlsx", {
			bookType: "xlsx",
			mimeType:
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});

		// const blob = XLSX.write(wb, {
		//   bookType: "xlsx",
		//   mimeType:
		//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		// });

		// saveAs(
		//   new Blob([s2ab(blob)], { type: "application/octet-stream" }),
		//   "PracticeReport1212.xlsx"
		// );
	};

	const s2ab = (s) => {
		const buf = new ArrayBuffer(s.length);
		const view = new Uint8Array(buf);
		for (let i = 0; i < s.length; i++) {
			view[i] = s.charCodeAt(i) & 0xff;
		}
		return buf;
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

	const [filteredCategoryData, setFilteredCategoryData] = useState([]);
	const handleCategorySelection = (e) => {
		const selectedId = e.target.value;
		console.log(selectedId);
		setSelectedCategory(
			e.target.options[e.target.selectedIndex].getAttribute("data-value")
		);
		const result = categoryData?.filter((item) => item._id === selectedId);
		console.log("Filtered Data:", result);
		setFilteredCategoryData(result[0].Assessment);
	};
	return (
		<div>
			<div className="container-fluid ">
				<div className="row">
					{isOpen && (
						<div className=" col-12 col-lg-3 col-md-12 sectioncard121">
							<Sidebar />
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
								<div className="">
									<div className="row">
										<div className="col-md-12 text-center">
											<h3 className="my-3" style={{color:"#16c3ea"}}>Practice Participation Reports</h3>
										</div>
										<div className="col-md-6 mt-1">
											<label style={{ fontWeight: "600" }}>
												Select Institution
											</label>
											<select
												name=""
												id=""
												className="p-2 form-control"
												onChange={handleInstituteSelection}
											>
												<option value="SelectInstitutions">
													Select Institutions
												</option>
												{institutionData.map((institute) => (
													<option
														key={institute.id}
														value={institute.InstituteName}
													>
														{institute.InstituteName}
													</option>
												))}
											</select>
										</div>

										<div className="col-md-6 mt-1">
											<label style={{ fontWeight: "600" }}>
												Select Category
											</label>
											<select
												// onChange={(e) => setSelectedCategory(e.target.value)}
												onChange={handleCategorySelection}
												className="form-control"
											>
												<option value="">Select a Category</option>
												{categoryData.map((entry, index) => (
													<option
														key={index}
														value={entry._id}
														data-value={entry.name}
													>
														{entry.name}
													</option>
												))}
											</select>
										</div>

										<div className="col-md-6 mt-1">
											<label style={{ fontWeight: "600" }}>
												Select Assessment
											</label>
											<select
												onChange={(e) => setSelectedAssessment(e.target.value)}
												className="form-control"
											>
												<option value="">Select an Assessment</option>
												{filteredCategoryData.map((entry, index) => (
													<option key={index} value={entry.assessmentname}>
														{entry.assessmentname}
													</option>
												))}
											</select>
										</div>

										<div className="col-md-6 mt-1">
											<label style={{ fontWeight: "600" }}>
												Select Batch Year
											</label>
											<select
												name=""
												id=""
												className=" p-2 form-control"
												onChange={handleBatchYearSelection}
											>
												<option value="">Select Batch Year</option>
												{filteredInstitutionData?.map((year) => (
													<option key={year.id} value={year.BatchYear}>
														{year.BatchYear}
													</option>
												))}
											</select>
										</div>

										<div className="col-md-6 mt-1">
											<label style={{ fontWeight: "600" }}>Select Batch</label>
											<select
												name=""
												id=""
												className="form-control"
												onChange={handleBatchSelection}
											>
												<option value="Select Batch">Select Batch</option>
												{filteredBatchYearData?.map((each) => (
													<option key={each.id} value={each.Batch}>
														{each.Batch}
													</option>
												))}
											</select>
										</div>

										<div className=" text-center mt-4">
											<button
												className="btn12"
												style={{
													backgroundColor: "#16c3ea",
													color: "#000",
													padding: "8px",
													borderRadius:"4px"
												}}
												onClick={handleExportToExcel}
											>
												Export to Excel
											</button>
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
}

export default Participation;
