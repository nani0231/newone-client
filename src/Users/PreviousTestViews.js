import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import apiList from "../liberary/apiList";

const PreviousTestViews = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { Timelimit, timeLeft, assessmentId, userId, selectedCategoryId } =
		state || {};
	const [assessmentDetails, setAssessmentDetails] = useState([]);


  useEffect(() => {
    const api = `${apiList.getTestAssessmentDetailsalldescendingorder}/${userId}/${selectedCategoryId}/${assessmentId}`;
		const fetchAssessmentDetails = async () => {
			try {
				const response = await axios.get(api);
				setAssessmentDetails(response.data);
			} catch (error) {
				console.error("Error in getting assessment details", error);
			}
		};

		fetchAssessmentDetails();
	}, [userId, selectedCategoryId]);

	return (
		<div style={{ backgroundColor: "rgb(235 235 232)", height: "auto" }}>
			<div className="container pt-3">
				<div className="row">
					<div className="col-md-12 text-center">
						<h2 style={{color:"#16c3ea"}}>Previous Attempts</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-md-10 "></div>
					<div className="col-md-2 my-2 text-end">
						<button
							className="btn btn-dark"
							onClick={() =>
								navigate("/TestViewSolutions", {
									state: {
										Timelimit: Timelimit,
										timeLeft: timeLeft,
										selectedCategoryId: selectedCategoryId,
										assessmentId: assessmentId,
										userId: userId,
									},
								})
							}
						>
							Back
						</button>
					</div>
				</div>
				<div className="card_item w-100 m-auto p-4">
				<div className="row">
					<div className="col-md-12">
						{assessmentDetails?.length > 0 ? (
							<ul className="previous-attempts-list">
								{assessmentDetails.map((attempt, index) => (
									<li key={index} className="attempt-item" style={{listStyleType:"none"}}>
										<h4 className="text-center" style={{ color: "#000", fontWeight:"500" }}>Attempt {index + 1}</h4>
										<p
											className=" "
											style={{ color: "#000", fontWeight: "600", fontSize:"18px" }}
										>
											Score : {attempt.Score}
										</p>
										{/* <p>Submitted Time: {new Date(attempt.SubmittedTime).toLocaleString()}</p> */}
										<p>
											Attempt Finish:
											<span className="ml-2" style={{ color: "#ff69b4", fontWeight: "bold" }}>
												{attempt.SubmittedTime
													? new Date(
															parseInt(attempt.SubmittedTime)
													  ).toLocaleString()
													: "N/A"}
											</span>{" "}
										</p>
										<ul className="questions-list">
											{attempt.QuestionsData.map((question) => (
												<li key={question._id} className="question-item">
													<p style={{fontSize:"18px", fontWeight:"500"}}>{question.question}</p>
													<ul>
														<li>
															<input
																type="radio"
																className="mr-3"
																value={question.Options1}
																checked={
																	attempt.SubmittedAnswers &&
																	attempt.SubmittedAnswers[0] &&
																	attempt.SubmittedAnswers[0][question._id] ===
																		question.Options1
																}
																//   readOnly
															/>
															<label style={{color:"grey"}}>{question.Options1}</label>
														</li>
														<li>
															<input
																type="radio"
																className="mr-3"
																value={question.Options2}
																checked={
																	attempt.SubmittedAnswers &&
																	attempt.SubmittedAnswers[0] &&
																	attempt.SubmittedAnswers[0][question._id] ===
																		question.Options2
																}
																//   readOnly
															/>
															<label style={{color:"grey"}}>{question.Options2}</label>
														</li>
														<li>
															<input
																type="radio"
																className="mr-3"
																value={question.Options3}
																checked={
																	attempt.SubmittedAnswers &&
																	attempt.SubmittedAnswers[0] &&
																	attempt.SubmittedAnswers[0][question._id] ===
																		question.Options3
																}
																//   readOnly
															/>
															<label style={{color:"grey"}}>{question.Options3}</label>
														</li>
													</ul>
													<p style={{fontWeight:"400"}}>
														Correct Answer : 
														<span className="pl-1"
															style={{ color: "#317773", fontWeight: "bold" }}
														>
															{question.correctAnswer}
														</span>
													</p>
												</li>
											))}
										</ul>
									</li>
								))}
							</ul>
						) : (
							<p>No assessment details found.</p>
						)}
					</div>
				</div>
				<div className=" text-center">
						<button
							className="btn btn-dark mb-3"
							onClick={() =>
								navigate("/TestViewSolutions", {
									state: {
										Timelimit: Timelimit,
										timeLeft: timeLeft,
										selectedCategoryId: selectedCategoryId,
										assessmentId: assessmentId,
										userId: userId,
									},
								})
							}
						>
							Back
						</button>
					</div>
					</div>
			</div>
		</div>
	);
};

export default PreviousTestViews;
