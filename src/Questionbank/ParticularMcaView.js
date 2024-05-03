import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Pagination } from "antd";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import apiList from "../liberary/apiList";

const ParticularMcaView = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { subjectId, chapterId, McqId } = state || {};
	const [mcqListData, setMcqListData] = useState([]);

	const gotoMcqUpdate = () => {
		navigate(() =>
			navigate("/Mcqupdate", {
				state: { subjectId: subjectId, chapterId: chapterId, McqId: McqId },
			})
		);
	};

	const fetchMcqListData = async () => {
		const api = `${apiList.getMCQById}/${subjectId}/${chapterId}/${McqId}`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setMcqListData(response.data.mcq);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetch blogs:", error);
		}
	};

	useEffect(() => {
		fetchMcqListData();
	}, []);
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
	const difficulty = mcqListData?.Difficulty;
	let difficultyClass = "";
	if (difficulty === "easy" || "Easy") {
		difficultyClass = "green";
	} else if (difficulty === "medium") {
		difficultyClass = "orange";
	} else if (difficulty === "difficulty") {
		difficultyClass = "red";
	}

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
					>
						<div className=" ">
							<i
								className="fa-solid fa-bars bars d-lg-block d-none"
								onClick={toggleSidebar}
							></i>
							<div className=" row mt-3">
								<div className="col-md-12">
									<div className="row">
										<div className="col-md-4">
											<p>
												Subject : <b>{mcqListData?.Subjects}</b>
											</p>
										</div>
										<div className="col-md-5">
											<p>
												Chapter : <b>{mcqListData?.Chapters}</b>
											</p>
										</div>
										<div
											className="d-flex flex-row justify-content-center col-md-3 float-right mb-2"
											style={{ float: "right", paddingRight: "0px" }}
										>
											<button
												className="btn btn-light"
												onClick={() =>
													navigate("/Mcqupdate", {
														state: {
															subjectId: subjectId,
															chapterId: chapterId,
															McqId: McqId,
														},
													})
												}
											>
												<i class="fa-solid fa-pencil pencile"></i>Edit
											</button>
											<button
												className="btn btn-light ml-2" style={{backgroundColor:"#010101", color:"#fff"}}
												onClick={() =>
													navigate("/McqView", {
														state: {
															subjectId: subjectId,
															chapterId: chapterId,
															McqId: McqId,
														},
													})
												}
											>
												Back
											</button>
										</div>
									</div>
									<div className="row">
										<div className="col-md-5">
											<p>Question Type: {mcqListData?.selectquestiontype}</p>
										</div>
										<div className="col-md-3">
											<p>
												Diffculty :{" "}
												<span className={difficultyClass}>
													{mcqListData?.Difficulty}
												</span>
											</p>
										</div>
										<div className="col-md-4">
											<p>Reference: {mcqListData?.Reference}</p>
										</div>
									</div>
									<div className="row">
										<div className="col-md-12">
											<p>Question:</p>
											<h5>
												<b>{mcqListData?.Question}</b>
											</h5>
											<div>
												<p>Assessment Used: 10</p>
												<p>Student Attemoted: 800</p>
												<p>Solving Accuracy: 95%</p>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-12">
											<div className="card p-3 my-2">
												<p>Option 1:</p>
												<p>{mcqListData?.Option1}</p>
											</div>
											<div className="card p-3 my-2">
												<p>Option 2:</p>
												<p>{mcqListData?.Option2}</p>
											</div>
											<div className="card p-3 my-2">
												<p>Option 3:</p>
												<p>{mcqListData?.Option3}</p>
											</div>
											<div className="card p-3 my-2">
												<p>correctAnswer:</p>
												<p style={{ color: "green" }}>
													<b>{mcqListData?.correctAnswer}</b>
												</p>
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
	);
};
export default ParticularMcaView;
