import React from "react";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../Sidebar";
import "./parag.css";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import apiList from "../liberary/apiList";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import { fontWeight } from "@mui/system";

const ParagEdit = () => {
	let navigate = useNavigate();
	const editor = useRef(null);
	const { state } = useLocation();
	const [isOpen, setIsOpen] = useState(true);
	const { subjectId, chapterId, McqId } = state || {};
	const [mcqListData, setMcqListData] = useState({});
	const [mcqLisChangedData, setMcqListChangedData] = useState({});
	const [itisLoading, setItisLoading] = useState(true);
	console.log(mcqListData);
	const toggleSidebar = () => {
		setIsOpen(!isOpen);
		menuBtnChange();
	};

	const handleEditInputChange = (value, name) => {
		console.log(value, name);
		setMcqListChangedData({
			...mcqLisChangedData,
			[name]: value,
		});
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
	const sanitizeAndRenderHTML = (htmlString) => {
		const sanitizedHTML = htmlString?.replace(/<p>/g, "").replace(/<\/p>/g, "");
		return sanitizedHTML;
	};
	const debouncedHandleChange = debounce((newContent) => {
		handleEditInputChange(sanitizeAndRenderHTML(newContent), "Question");
	}, 3000);

	const fetchMcqListData = async () => {
		const api = `${apiList.getParagMCQById}/${subjectId}/${chapterId}/${McqId}`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setMcqListData(response.data.paragMCQ);
			setMcqListChangedData(response.data.paragMCQ);
			setItisLoading(false);
			console.log(response.data.paragMCQ);
		} catch (error) {
			console.error("Error fetch blogs:", error);
		}
	};

	useEffect(() => {
		fetchMcqListData();
	}, []);
	const onSubmitUpdateForm = async () => {
		const token = Cookies.get("token");
		console.log(mcqLisChangedData);
		try {
			const response = await axios.put(
				`${apiList.update}/${subjectId}/${chapterId}/${McqId}`,
				mcqLisChangedData,
				{
					headers: {
						token: token,
					},
				}
			);
			//
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
				setTimeout(function () {
					navigate("/ParagView");
				}, 3000);
			}
		} catch (error) {
			console.log(error.response.data);
			toast.error("Question already added");
		}
	};
	const editorKey = "Question"; // Replace this with the dynamic key or variable

	return (
		<>
			<div className="container-fluid ">
				<div className="row">
					{isOpen && (
						<div className=" col-12 col-lg-3  col-md-12 sectioncard121">
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
							<div className="">
								<i
									className="fa-solid fa-bars bars d-lg-block d-none"
									onClick={toggleSidebar}
								></i>
								<div className="">
									<div className="row">
										<div className="col-md-12 text-center">
											<h3 style={{color:"#16c3ea"}}>
												Update Paragraph
											</h3>
										</div>
										<form>
											<div className="paragSubject">
												<label style={{ fontWeight: "600" }}>
													Subjects <sup className="star">*</sup>
												</label>
												<input
													className="form-control"
													placeholder="subject"
													value={mcqListData?.Subjects}
												/>
											</div>
											<div className="paragChapter">
												<label style={{ fontWeight: "600" }}>
													Chapters <sup className="star">*</sup>
												</label>
												<input
													className="form-control"
													placeholder="subject"
													value={mcqListData?.Chapters}
												/>
											</div>
											<label className="mt-2" style={{ fontWeight: "600" }}>
												Difficulty <sup className="star">*</sup>
											</label>
											<div className="row">
												<div className="d-flex flex-row col-4">
													<div>
														<input type="radio" />
													</div>
													<div className="px-2">Diffcult</div>
												</div>
												<div className="d-flex flex-row col-4">
													<div>
														<input type="radio" />
													</div>
													<div className="mx-2">Easy</div>
												</div>

												<div className="d-flex flex-row col-4">
													<div>
														<input type="radio" />
													</div>
													<div className="mx-2">Medium</div>
												</div>
											</div>
											<div className="paragRef mt-2">
												<label style={{ fontWeight: "600" }}>
													Reference <sup className="star">*</sup>
												</label>
												<input
													className="form-control"
													onChange={(e) =>
														handleEditInputChange(e.target.value, "Reference")
													}
													value={mcqLisChangedData?.Reference || ""}
												/>
											</div>
											<label className="my-2" style={{ fontWeight: "600" }}>
												Question <sup className="star">*</sup>
											</label>
											<div>
												<JoditEditor
													ref={editor}
													name="Question"
													value={mcqLisChangedData?.Question || ""}
													tabIndex={1} // tabIndex of textarea
													// onChange={(newContent) => debouncedHandleChange(newContent)}
													onChange={debounce((newContent) => {
														handleEditInputChange(
															sanitizeAndRenderHTML(newContent),
															"Question"
														);
													}, 600)}
													// preferred to use only this option to update the content for performance reasons
													// onChange={handleEditInputChange()}
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
													type="button"
													className="paragbtn"
													style={{
														borderRadius: "7px",
														border: "none",
														backgroundColor: "#16c3ea",
														color: "#000",
														padding: "7px 20px",
													}}
													onClick={() =>
														onSubmitUpdateForm(mcqLisChangedData?._id)
													}
												>
													Update
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
export default ParagEdit;
