import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate } from "react-router-dom";
import apiList from "../liberary/apiList";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { green } from "@mui/material/colors";

const TestViewSolutions = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { Timelimit, timeLeft, selectedCategoryId, assessmentId, userId } =
		state || {};
	const [assessmentDetails, setAssessmentDetails] = useState([]);

	useEffect(() => {
		const api = `${apiList.getTestAssessmentDetails}/${userId}/${selectedCategoryId}/${assessmentId}`;

		const fetchCardData = async () => {
			try {
				const response = await axios.get(api);
				setAssessmentDetails(response.data);
				console.log(response.data);
			} catch (e) {
				console.log("Error in Getting the Assessment Data", e);
			}
		};

		fetchCardData();
	}, [selectedCategoryId, assessmentId]);

	const [selectedAnswers, setSelectedAnswers] = useState({});
	const [incorrectAnswers, setIncorrectAnswers] = useState([]);
	useEffect(() => {
		if (
			assessmentDetails?.SubmittedAnswers &&
			assessmentDetails?.QuestionsData
		) {
			const incorrectAnswersArray = [];

			assessmentDetails.QuestionsData.forEach((question) => {
				const submittedAnswer =
					assessmentDetails.SubmittedAnswers[0][question._id];
				if (submittedAnswer !== question.correctAnswer) {
					incorrectAnswersArray.push(question._id);
				}
			});

			setIncorrectAnswers(incorrectAnswersArray);
		}
	}, [assessmentDetails]);
	const handleOptionChange = (questionId, selectedOption) => {
		setSelectedAnswers((prevAnswers) => ({
			...prevAnswers,
			[questionId]: selectedOption,
		}));
	};
	return (
		<div style={{ backgroundColor: "rgb(235 235 232)", height: "auto" }}>
			<div className="container pt-3">
				<div className="row">
					<div className="col-md-12 text-center">
						<h2 className="my-4" style={{color:"#16c3ea"}}>Assessment Details</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12 float-right">
						<div className="row">
							<div className="col-md-8"></div>
							<div className="col-md-2 ">
								<p
									className=" p-2"
									style={{ backgroundColor: "#16c3ea", color: "#000", borderRadius:"4px", fontWeight:"500" }}
								>
									Marks Scored: {assessmentDetails.Score}
								</p>
							</div>
							<div className="col-md-2 ">
								<p
									type="button"
									className=" p-2 text-center"
									style={{ backgroundColor: "#dbb98f", color: "#96351e",borderRadius:"4px", fontWeight:"500" }}
									onClick={() =>
										navigate("/PreviousTestViews", {
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
									Previous Attempts
								</p>
							</div>
						</div>
					</div>
				</div>
        <div className="card_item w-100 m-auto p-4">
				<div className="row">
					<div className="col-md-8">
						<ul className="questions-list">
							{assessmentDetails?.QuestionsData?.map((question, index) => (
								<li key={question._id}>
									<p style={{fontSize:"18px", fontWeight:"500"}}>
										{index + 1}. {question.question}
									</p>
									<ul>
										<li>
											<input
												className="mr-3"
												type="radio"
												value={question.Options1}
												checked={
													selectedAnswers[question._id] === question.Options1 ||
													assessmentDetails.SubmittedAnswers[0][
														question._id
													] === question.Options1
												}
												onChange={() =>
													handleOptionChange(question._id, question.Options1)
												}
											/>
											<label style={{color:"grey"}}>{question.Options1}</label>
										</li>
										<li>
											<input
												className="mr-3"
												type="radio"
												value={question.Options2}
												checked={
													selectedAnswers[question._id] === question.Options2 ||
													assessmentDetails.SubmittedAnswers[0][
														question._id
													] === question.Options2
												}
												onChange={() =>
													handleOptionChange(question._id, question.Options2)
												}
											/>
											<label style={{color:"grey"}}>{question.Options2}</label>
										</li>
										<li>
											<input
												className="mr-3"
												type="radio"
												value={question.Options3}
												checked={
													selectedAnswers[question._id] === question.Options3 ||
													assessmentDetails.SubmittedAnswers[0][
														question._id
													] === question.Options3
												}
												onChange={() =>
													handleOptionChange(question._id, question.Options3)
												}
											/>
											<label style={{color:"grey"}}>{question.Options3}</label>
										</li>
									</ul>
									<p style={{fontWeight:"400"}}>
										Correct Answer :
										<span className="pl-1" style={{ color: "#317773", fontWeight: "bold" }}>
											{question.correctAnswer}
										</span>
									</p>
									{/* <p>
                  Submitted Answer:{" "}
                  <span style={{ color: incorrectAnswers.includes(question._id) ? "red" : "green" }}>
                    {assessmentDetails.SubmittedAnswers[0][question._id]}
                  </span>
                </p> */}
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12 my-2">
						<div className="row">
							<div className="col-md-5"></div>
							<div className="col-md-1">
								<button
									className="btn btn-dark mx-2"
									onClick={() =>
										navigate("/Packs7", {
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
							<div className="col-md-1">
								<button
									className="btn btn-danger mx-2"
									onClick={() => navigate("/Userassessments")}
                  style={{backgroundColor:"#16c3ea", color:"#000", border:"none", borderRadius:"4px", padding:"7px"}}
								>
									Close
								</button>
							</div>
							<div className="col-md-5"></div>
						</div>
					</div>
				</div>
        </div>
			</div>
		</div>
	);
};

export default TestViewSolutions;
