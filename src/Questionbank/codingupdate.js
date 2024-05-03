import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../Sidebar";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import JoditEditor from "jodit-react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Audio } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import apiList from "../liberary/apiList";

const Codingupdate = () => {
	const { selectedSubjectId, selectedChapterId, codingBasicId } = useParams();
	let navigate = useNavigate();
	const editor = useRef(null);
	console.log(selectedSubjectId);
	console.log(selectedChapterId);
	console.log(codingBasicId);
	const [editorData, setEditorData] = useState("");
	const [Constraints, setConstraints] = useState("");
	const [Description, setDescription] = useState("");
	const [itisLoading, setItisLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(true);
	const [mcqListData, setMcqListData] = useState({
		Subjects: "",
		Chapters: "",
		Title: "",
		Programminglanguage: "",
		Description: "",
		Constraints: "",
	});
	const [mcqLisChangedData, setMcqListChangedData] = useState({});
	const [worksheetLoading, setWorksheetLoading] = useState(true);
	const [blogslist, setblogslist] = useState([]);
	const toggleSidebar = () => {
		setIsOpen(!isOpen);
		menuBtnChange();
	};

	const fetchMcqListData = async () => {
		const api = `${apiList.getbasic}/${selectedSubjectId}/${selectedChapterId}/${codingBasicId}`;
		try {
			const response = await axios.get(api);
			setMcqListData(response.data.codingBasic);

			console.log(response.data.codingBasics);
			setWorksheetLoading(false);
			setItisLoading(false);
		} catch (error) {
			console.error("Error fetch blogs:", error);
			setWorksheetLoading(false);
		}
	};
	console.log(mcqListData);
	useEffect(() => {
		fetchMcqListData();
	}, []);

	const fetchblogs = async () => {
		const api = `${apiList.subjects}`;
		try {
			const response = await axios.get(api, {});
			setblogslist(response.data);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching blogs:", error);
		}
	};
	useEffect(() => {
		// Populate form with existing data
		if (mcqListData) {
			setMcqListChangedData({
				Title: mcqListData.Title || "",
				Programminglanguage: mcqListData.Programminglanguage || "",
				// ... other fields ...
			});
		}
	}, [mcqListData]);
	useEffect(() => {
		fetchblogs();
	}, []);
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

	const onSubmitUpdateForm = (e) => {
		e.preventDefault();

		const UserData = {
			Subjects: mcqListData.Subjects,
			Chapters: mcqListData.Chapters,
			Title: mcqListData.Title,
			Programminglanguage: mcqListData.Programminglanguage,
			Description: mcqListData.Description,
			Constraints: mcqListData.Constraints,
		};
		axios
			.put(
				`${apiList}/v4/${selectedSubjectId}/chapters/${selectedChapterId}/codingbasic/${codingBasicId}`,
				UserData
			)

			.then((response) => {
				if (response.status === 200) {
					toast.success("coding Updated Successfully", {
						position: "top-center",
						autoClose: 1000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					});
				}
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const handleEditInputChange = (value, name) => {
		// console.log(e.target?.value);
		console.log(value, name);
		setMcqListChangedData({
			...mcqLisChangedData,
			[name]: value,
		});
	};

	return (
		<div>
			<ToastContainer />
			<div className="container-fluid ">
				<div className="row">
					{isOpen && (
						<div className=" col-12  col-lg-3 col-md-12 sectioncard121">
							<Sidebar />
						</div>
					)}
					<div
						className={`my-3 col-12 col-md-${isOpen ? 12 : 9} col-lg-${
							isOpen ? 9 : 12
						}`}
					>
						<i
							className="fa-solid fa-bars bars d-lg-block d-none"
							onClick={toggleSidebar}
						></i>

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
							<form className="basic">
								<h3 className="my-3 text-center" style={{color:"#16c3ea"}}>Update Coding</h3>
								<div className="row">
									<div className="my-2 col-lg-6">
										<label style={{ fontWeight: "600" }}>
											Subjects <sup className="star">*</sup>
										</label>
										<input
											type="text"
											style={{ padding: "5px" }}
											placeholder="...Select Subject"
											className="form-control"
											value={mcqListData.Subjects}
											onChange={(e) =>
												setMcqListData({
													...mcqListData,
													Subjects: e.target.value,
												})
											}
											disabled
										/>
									</div>
									<div className="my-2 col-lg-6">
										<label style={{ fontWeight: "600" }}>
											Chapter <sup className="star">*</sup>
										</label>
										<input
											type="text"
											placeholder="...Select Chapter"
											className="form-control"
											value={mcqListData.Chapters}
											onChange={(e) =>
												setMcqListData({
													...mcqListData,
													Chapters: e.target.value,
												})
											}
											disabled
										/>
									</div>
								</div>

								<div className="my-2">
									<h6 className="" style={{ fontWeight: "600" }}>
										Title<sup className="star">*</sup>
									</h6>
									<select
										name="title"
										className="form-select"
										value={mcqListData.Title}
										onChange={(e) =>
											setMcqListData({
												...mcqListData,
												Title: e.target.value,
											})
										}
									>
										<option value="Select Title">Select Title</option>
										<option value="Python">Python</option>
										<option value="Javascript">Javascript</option>
										<option value="React.js">React.js</option>
									</select>
								</div>

								<div className="my-3">
									<h6 className="" style={{ fontWeight: "600" }}>
										Programming language<sup className="star">*</sup>
									</h6>
									<select
										name="programmingLanguage"
										className="form-select"
										value={mcqListData.Programminglanguage}
										onChange={(e) =>
											setMcqListData({
												...mcqListData,
												Programminglanguage: e.target.value,
											})
										}
									>
										<option value="Select programming language">
											Select programming language
										</option>
										<option value="Python">Python</option>
										<option value="Javascript">Javascript</option>
										<option value="React.js">React.js</option>
									</select>
								</div>

								<div className="description">
									<h6 className="" style={{ fontWeight: "600" }}>
										Description<sup className="star">*</sup>
									</h6>

									<CKEditor
										editor={ClassicEditor}
										onReady={(editor) => {
											console.log("Editor is ready to use!", editor);
										}}
										value={mcqListData.Description}
										onChange={(event, editor) => {
											const data = editor.getData();
											// Remove <p> tags from the data
											const cleanData = data
												.replace(/<p>/g, "")
												.replace(/<\/p>/g, "");
											console.log({ event, editor, cleanData });
											setMcqListData({
												...mcqListData,
												Description: cleanData,
											});
										}}
										onBlur={(event, editor) => {
											console.log("Blur.", editor);
										}}
										onFocus={(event, editor) => {
											console.log("Focus.", editor);
										}}
									/>

									<label htmlFor="myfile">
										<h6 className="my-2 ">Description Image</h6>
									</label>
									<input
										type="file"
										id="myfile"
										name="myfile"
										className="form-control my-2"
									/>
								</div>
								<div className="">
									<h6 className="my-3" style={{ fontWeight: "600" }}>
										Constraints<sup className="star">*</sup>
									</h6>
									<CKEditor
										editor={ClassicEditor}
										onReady={(editor) => {
											console.log("Editor is ready to use!", editor);
										}}
										value={mcqListData.Constraints}
										onChange={(event, editor) => {
											const data = editor.getData();
											// Remove <p> tags from the data
											const cleanData = data
												.replace(/<p>/g, "")
												.replace(/<\/p>/g, "");
											console.log({ event, editor, cleanData });
											setMcqListData({
												...mcqListData,
												Constraints: cleanData,
											});
										}}
										onBlur={(event, editor) => {
											console.log("Blur.", editor);
										}}
										onFocus={(event, editor) => {
											console.log("Focus.", editor);
										}}
									/>

									<label htmlFor="myfile">
										<h6 className="my-3">Constraints Image</h6>
									</label>
									<input
										type="file"
										id="myfile"
										name="myfile"
										className="form-control"
									/>
									<br />

									<Link to="/Codingview">
										<button type="submit" className="btn_submit mx-2" style={{backgroundColor:"#000", color:"#fff"}}>
											Back
										</button>
									</Link>
									<button
										type="submit"
										className="btn_submit my-3"
										style={{ backgroundColor: "#16c3ea", color: "#000" }}
										onClick={onSubmitUpdateForm}
									>
										Update
									</button>
								</div>
							</form>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Codingupdate;
