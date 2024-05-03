import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import NavbarUser from "../navbaruser";
import UserFooter from "../userfooter";
import apiList from "../../liberary/apiList";

function CoursesDeatilsPage() {
	const [showContent1, setShowContent1] = useState(false);
	const [showContent2, setShowContent2] = useState(false);
	const [showContent3, setShowContent3] = useState(false);
	const [loading, setloading] = useState(true);

	const [details, setDetails] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		const fetchCardData = async () => {
			try {
				const response = await axios.get(`${apiList.singleLearningPath}/${id}`);
				setDetails(response.data);
			} catch (e) {
				console.log("Error in Getting the Videos Folder", e);
			}
		};
		fetchCardData();
	}, []);

	console.log(details, "Video data");

	const toggleContent1 = () => {
		setShowContent1(!showContent1);
	};

	const toggleContent2 = () => {
		setShowContent2(!showContent2);
	};

	const toggleContent3 = () => {
		setShowContent3(!showContent3);
	};
	console.log(details, "details");
	return (
		<>
			<NavbarUser />
			{/* {loading ? (
        <div className="d-flex flex-row justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="hm-spinner"></div>
        </div>
      ) : ( */}
			<div className="container-fluid coursesDetailsMainWrapper my-5 pt-3">
				<div className="container-fluid detailsHeader">
					<h1 style={{color:"#16c3ea"}}>{details.learningPathTitle}</h1>

					<p>
						"Unlock the Power of {details.learningPathTitle} From Novice to
						Ninja!"
					</p>
					<p>Created by Suraj Pawar - LeadSoft</p>
				</div>
				<div className="container ">
					<div className="row">
						<div className="col-md-8 my-auto">
							<div className="">
								<h3>What you'll learn?</h3>
								<div className="heroUl">
									<ul>
										{details.fileName &&
											details.fileName.map((innerArray, index) => (
												<li key={index} className="mappedLi">
													<ul>
														{Array.isArray(innerArray) ? (
															innerArray.map((item, i) => (
																<li className="mappedLi" key={i}>
																	<i className="fa-solid fa-check"></i> {item}
																</li>
															))
														) : (
															<li className="mappedLi">
																<i className="fa-solid fa-check innerMappedIcon"></i>{" "}
																{innerArray}
															</li>
														)}
													</ul>
												</li>
											))}
									</ul>
								</div>
							</div>
						</div>
						<div className="col-md-4 mt-3">
							<div className="heroright">
								<div className="heroImg">
									{/* <img src="https://instacks.co/uploads/learning_path/lktkifhr.jpg" /> */}
									{/* {details && <img src={data:Image/png;base64,${details}} alt="Your Image" />} */}
									<img className="ImgMain" src={details.learningimg} />
								</div>
								<div className="heroRightBtn">
									<NavLink
										to={`/user/courseVideos/${details._id}/${details.learningPathTitle}`}
									>
										<button className="heroRightBtnBox">
											<i class="fa-solid fa-play"></i> Play Course
										</button>
									</NavLink>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container detailsSubSection">
					<h4>Requirements :</h4>
					{details.requirements &&
						details.requirements.map((innerArray, index) => (
							<li key={index} className="mappedLi">
								<ul>
									{Array.isArray(innerArray) ? (
										innerArray.map((item, i) => (
											<li className="mappedLi" key={i}>
												<i class="fa-solid fa-arrow-right innerMappedIcon"></i>
												{item}
											</li>
										))
									) : (
										<li className="mappedLi">
											<i class="fa-solid fa-arrow-right innerMappedIcon2"></i>
											{innerArray}
										</li>
									)}
								</ul>
							</li>
						))}
				</div>
				<div className="container descriptionSection">
					<h4>Description :</h4>
					<div className="descripText">{details.AboutLearnPath}</div>
				</div>
				<div className="container keyTopicSection">
					<h4>
						Key Topics Covered :
					</h4>
					<br />
					<div className="keyTopicText">
						<p className="text-item">
							<b className="text-dark">Introduction to {details.learningPathTitle}:</b> Setting up the
							environment, understanding {details.learningPathTitle} syntax, and
							running your first program.
						</p>

						<p className="text-item">
							<b className="text-dark">Variables and Data Types:</b> Manipulating data with variables,
							strings, numbers, lists, tuples, dictionaries, and more.
						</p>

						<p className="text-item">
							<b className="text-dark">Control Flow:</b> Mastering conditional statements, loops, and
							branching techniques to control program flow.
						</p>

						<p className="text-item">
							<b className="text-dark">Functions and Modules:</b> Creating reusable code blocks with
							functions and organizing code using modules.
						</p>

						<p className="text-item">
							<b className="text-dark">Object-Oriented Programming (OOP):</b> Embracing the power of
							OOP principles to build robust and scalable applications.
						</p>

						<p className="text-item">
							<b className="text-dark">File Handling:</b> Reading from and writing to files, handling
							exceptions, and managing data persistence.
						</p>
					</div>
				</div>
				<div className="container contentSection">
					<h4 className="mt-4">Course Content</h4>
					<div className="box" onClick={toggleContent1}>
						<div className="contentBoxMain">
							{showContent1 ? (
								<span>
									<i class="fa-solid fa-minus"></i>Introduction To{" "}
									{details.learningPathTitle}
								</span>
							) : (
								<span>
									<i class="fa-solid fa-plus"></i>Introduction To{" "}
									{details.learningPathTitle}
								</span>
							)}
						</div>
					</div>
					{showContent1 && (
						<div className="contentBox">
							<i class="fa-regular fa-circle-play"></i>Installing{" "}
							{details.learningPathTitle}
						</div>
					)}
					<div className="box" onClick={toggleContent2}>
						<div className="contentBoxMain">
							{showContent2 ? (
								<span>
									<i class="fa-solid fa-minus"></i>Data binding with multiple
									Component
								</span>
							) : (
								<span>
									<i class="fa-solid fa-plus"></i>Data binding with multiple
									Component
								</span>
							)}
						</div>
					</div>
					{showContent2 && (
						<div className="contentBox">
							<i class="fa-regular fa-circle-play"></i>Parent-Child
							Communication
						</div>
					)}
					<div className="box" onClick={toggleContent3}>
						<div className="contentBoxMain">
							{showContent3 ? (
								<span>
									<i class="fa-solid fa-minus"></i>Changing Pages with Routing
								</span>
							) : (
								<span>
									<i class="fa-solid fa-plus"></i>Changing Pages with Routing
								</span>
							)}
						</div>
					</div>
					{showContent3 && (
						<div className="contentBox">
							<i class="fa-regular fa-circle-play"></i>Router Guard
						</div>
					)}
				</div>
			</div>
			{/* )} */}
			<UserFooter />
		</>
	);
}

export default CoursesDeatilsPage;
