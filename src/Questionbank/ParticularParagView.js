import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Pagination } from "antd";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { Navigate, useLocation,useNavigate } from "react-router-dom";
import apiList from "../liberary/apiList";
import { green, orange, red } from "@mui/material/colors";

const ParticularParagView = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
	const { subjectId,chapterId,McqId} = state || {}; 
	const [mcqListData, setMcqListData] = useState([]);
	const [itisLoading, setItisLoading] = useState(true);

	const gotoMcqUpdate = ()=>{
        navigate(()=>navigate("/Mcqupdate",{state :{subjectId:subjectId,chapterId:chapterId,McqId:McqId}}))
    }

	const fetchMcqListData = async () => {
		const api = `${apiList.getParagMCQById}/${subjectId}/${chapterId}/${McqId}`
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setMcqListData(response.data.paragMCQ);
			setItisLoading(false)
            console.log(response.data)
		} catch (error) {
			console.error("Error fetch blogs:", error);
		}
	};

	useEffect(() => {
		fetchMcqListData();
	},[]);
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
    const difficulty = mcqListData?.Difficulty; // Assuming this holds the difficulty level

// Define classes based on difficulty
let difficultyClass = "";
if (difficulty === "easy") {
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
							<ToastContainer/>
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
						<div className=" ">
							<i className="fa-solid fa-bars bars d-lg-block d-none" onClick={toggleSidebar}></i>
							<div className=" row mt-3">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <p>Subject : <b>{mcqListData?.Subjects}</b></p>
                                        </div>
                                        <div className="col-md-5">
                                            <p>Chapter : <b>{mcqListData?.Chapters}</b></p>
                                        </div>
                                        <div className="d-flex flex-row justify-content-center col-md-3 float-right mb-2" style={{float:"right",paddingRight:"0px"}}>
                                            <button className="btn btn-light "
                                            onClick={()=>navigate("/paragEdit",{state :{subjectId:subjectId,chapterId:chapterId,McqId:McqId}})}	><i class="fa-solid fa-pencil pencile"		
                                            						
											></i>Edit</button>
                                            <button className="btn btn-light ml-2"
                                            onClick={()=>navigate("/ParagView",{state :{subjectId:subjectId,chapterId:chapterId,McqId:McqId}})}	style={{backgroundColor:"#010101", color:"#fff"}}>Back</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {/* <div className="col-md-5">
                                            <p>Question Type: {mcqListData?.selectquestiontype}</p>
                                        </div> */}
                                        <div className="col-md-3">
                                            <p>Diffculty : <span className= {difficultyClass}>{mcqListData?.Difficulty}</span></p>
                                        </div>
                                        <div className="col-md-4">
                                            <p>Reference: {mcqListData?.Reference}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                           <p>Question:</p>
                                           <h5><b>{mcqListData?.Question}</b></h5>
                                            <div>
                                                <p>Assessment Used: 10</p>
                                                <p>Student Attempted: 800</p>
                                                <p>Solving Accuracy: 95%</p>
                                            </div>
                                        </div>
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
};
export default ParticularParagView;
