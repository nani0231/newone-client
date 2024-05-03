import React from "react";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
// import logo from "../src/All Images/pab bottom-logo (1).jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import sideimage from "../All Images/Logo133.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import siva from "../All Images/Siva Image.jpeg";
import { useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import apiList from "../liberary/apiList";

const LearnUpdate = () => {
	const [subscription, setsubscription] = useState("");

	let navigate = useNavigate();

	const { id } = useParams();

	const [loading, setLoading] = useState(true);
	const [itisLoading, setItisLoading] = useState(true);
	const [error, setError] = useState(null);

	const [individualInstitute, setIndividualInstitute] = useState({
		learningPathTitle: "",
		relevantSkillTags: "",
		coverLetter: "",
		difficultyLevel: "",
		subscription: "",
		price: "",
		discount: "",
		AboutLearnPath: "",
		authorName: "",
		hours: "",
		minutes: "",
		learningimg: "",
		fileName: "",
		requirements: "",
	});

	const onChangeLearnPathName = (e) => {
		const newValue = e.target.value;
		setIndividualInstitute((prevData) => ({
			...prevData,
			learningPathTitle: newValue,
		}));
	};

	const onSubmitForm = (e) => {
		e.preventDefault();

		const UserData = {
			learningPathTitle: individualInstitute.learningPathTitle,
			relevantSkillTags: individualInstitute.relevantSkillTags,
			coverLetter: individualInstitute.coverLetter,
			difficultyLevel: individualInstitute.difficultyLevel,
			subscription: individualInstitute.subscription,
			price: individualInstitute.price,
			discount: individualInstitute.discount,
			AboutLearnPath: individualInstitute.AboutLearnPath,
			authorName: individualInstitute.authorName,
			hours: individualInstitute.hours,
			minutes: individualInstitute.minutes,
			learningimg: individualInstitute.learningimg,
			fileName: individualInstitute.fileName,
			requirements: individualInstitute.requirements,
		};

		axios
			.put(`${apiList.updatelearningpath}/${id}`, UserData)
			.then((response) => {
				console.log(response.data);
				if (response.status === 200) {
					toast("Update Successful", {
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
						navigate("/Learn");
					}, 3000);
				}
			})
			.catch((error) => {
				console.error(error);
				setError("An error occurred while updating the Learn Path.");
				console.log(error.message);
			});
	};

	useEffect(() => {
		const fetchData = async () => {
			console.log(id);
			try {
				const response = await axios.get(`${apiList.getTopic}/${id}`); // Replace with your API endpoint
				setIndividualInstitute(response.data);
				setLoading(false);
				setItisLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);
	console.log(individualInstitute);

	const [isOpen, setIsOpen] = useState(true);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
		menuBtnChange();
	};

	const menuBtnChange = () => {
		const sidebar = document.querySelector(".sidebar");

		if (sidebar) {
			const closeBtn = document.querySelector("#btn");
			const searchBtn = document.querySelector(".bx-search");

			if (sidebar.classList.contains("open")) {
				closeBtn?.classList.replace("bx-menu", "bx-menu-alt-right");
			} else {
				closeBtn?.classList.replace("bx-menu-alt-right", "bx-menu");
			}
		} else {
			console.error("Sidebar element not found");
		}
	};
	// Corporate Office
	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					<div className=" ">
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
										{loading ? (
											<p>Loading...</p>
										) : individualInstitute ? (
											<div className="col-md-12">
												<div class="">
													<form action="" onSubmit={onSubmitForm}>
														<div>
															<div className="mt-3">
																<div>
																	<p
																		className="mb-1"
																		style={{ fontWeight: "500" }}
																	>
																		Learning Path
																	</p>
																	<input
																		type="text"
																		className="form-control"
																		placeholder="author"
																		value={
																			individualInstitute.learningPathTitle
																		}
																		onChange={(e) =>
																			setIndividualInstitute({
																				...individualInstitute,
																				learningPathTitle: e.target.value,
																			})
																		}
																	/>
																</div>
															</div>
															<div className="mt-3">
																<div>
																	<p
																		className="mb-1"
																		style={{ fontWeight: "500" }}
																	>
																		Tags
																	</p>
																	<select
																		className="w-100 p-2 form-control"
																		value={
																			individualInstitute.relevantSkillTags
																		}
																		onChange={(e) =>
																			setIndividualInstitute({
																				...individualInstitute,
																				relevantSkillTags: e.target.value,
																			})
																		}
																	>
																		<option value="">
																			Select Relavent Tags
																		</option>
																		<option value="AWS">AWS</option>
																		<option value="Database">Database</option>
																		<option value="DataScience">
																			DataScience
																		</option>
																		<option value="DevOps">DevOps</option>
																		<option value="Mobile App Developement">
																			Mobile App Developement
																		</option>
																		<option value="Programming">
																			Programming
																		</option>
																		<option value="Scripting">Scripting</option>
																		<option value="Software Testing">
																			Software Testing
																		</option>
																		<option value="Test Preparation">
																			Test Preparation
																		</option>
																		<option value="Web Development">
																			Web Development
																		</option>
																		<option value="Web Services">
																			Web Services
																		</option>
																		<option value="Verbal and Communication">
																			Verbal and Communication
																		</option>
																	</select>
																</div>
															</div>
															<div className="mt-3">
																<div>
																	<p
																		className="mb-1"
																		style={{ fontWeight: "500" }}
																	>
																		Cover Letter
																	</p>
																	{/* <input type="text" className="form-control"/> */}
																	<textarea
																		className="form-control"
																		rows={4}
																		value={individualInstitute.coverLetter}
																		onChange={(e) =>
																			setIndividualInstitute({
																				...individualInstitute,
																				coverLetter: e.target.value,
																			})
																		}
																	></textarea>
																</div>
															</div>
															<div className="mt-3">
																<div>
																	<p
																		className="mb-1"
																		style={{ fontWeight: "500" }}
																	>
																		Defficulty
																	</p>
																	<select
																		className="p-1 form-control"
																		value={individualInstitute.difficultyLevel}
																		onChange={(e) =>
																			setIndividualInstitute({
																				...individualInstitute,
																				difficultyLevel: e.target.value,
																			})
																		}
																	>
																		<option value="">
																			--Select Defficulty --
																		</option>
																		<option value="Beginner">Beginner</option>
																		<option value="Intermediate">
																			Intermediate
																		</option>
																		<option value="Advanced">Advanced</option>
																	</select>
																</div>
															</div>

															<div>
																<div className="mt-3">
																	<div>
																		<p
																			className="mb-1"
																			style={{ fontWeight: "500" }}
																		>
																			Subscription
																		</p>
																		<select
																			className="p-1 form-control"
																			onChange={(e) =>
																				setIndividualInstitute({
																					...individualInstitute,
																					subscription: e.target.value,
																				})
																			}
																			value={individualInstitute.subscription}
																		>
																			<option value="">
																				--Select Subscription--
																			</option>
																			<option value="Free">Free</option>
																			<option value="Paid">Paid</option>
																		</select>
																	</div>
																</div>
																{individualInstitute.subscription ===
																	"Paid" && (
																	<div>
																		<div className="mt-3">
																			<div>
																				<p
																					className="mb-1"
																					style={{ fontWeight: "500" }}
																				>
																					Price
																				</p>
																				<input
																					type="number"
																					className="form-control"
																					value={individualInstitute.price}
																					onChange={(e) => {
																						const price = parseFloat(
																							e.target.value
																						);
																						setIndividualInstitute({
																							...individualInstitute,
																							price: isNaN(price) ? "" : price,
																						});
																					}}
																				/>
																			</div>
																		</div>
																		<div className="mt-3">
																			<div>
																				<p
																					className="mb-1"
																					style={{ fontWeight: "500" }}
																				>
																					Discount
																				</p>
																				<input
																					type="number"
																					className="form-control"
																					value={individualInstitute.discount}
																					onChange={(e) => {
																						const discount = parseFloat(
																							e.target.value
																						);
																						setIndividualInstitute({
																							...individualInstitute,
																							discount: isNaN(discount)
																								? ""
																								: discount,
																						});
																					}}
																				/>
																			</div>
																		</div>
																	</div>
																)}
															</div>

															<div className="mt-3">
																<div>
																	<p
																		className="mb-1"
																		style={{ fontWeight: "500" }}
																	>
																		About This Learning Path
																	</p>
																	<textarea
																		className="form-control"
																		rows={6}
																		value={individualInstitute.AboutLearnPath}
																		onChange={(e) =>
																			setIndividualInstitute({
																				...individualInstitute,
																				AboutLearnPath: e.target.value,
																			})
																		}
																	></textarea>
																</div>
															</div>
															<div className="mt-3">
																<div>
																	<p
																		className="mb-1"
																		style={{ fontWeight: "500" }}
																	>
																		Author
																	</p>
																	<input
																		type="text"
																		className="form-control"
																		placeholder="author"
																		style={{ border: "1px solid #dee2e6" }}
																		value={individualInstitute.authorName}
																		onChange={(e) =>
																			setIndividualInstitute({
																				...individualInstitute,
																				authorName: e.target.value,
																			})
																		}
																	/>
																</div>
															</div>
															<div className="mt-3">
																<div className="row">
																	<div className="col-lg-3">
																		<div>
																			<p
																				className="mb-1"
																				style={{ fontWeight: "500" }}
																			>
																				Hours
																			</p>
																			<input
																				type="number"
																				className="form-control"
																				placeholder="author"
																				value={individualInstitute.hours}
																				onChange={(e) =>
																					setIndividualInstitute({
																						...individualInstitute,
																						hours: e.target.value,
																					})
																				}
																			/>
																		</div>
																	</div>
																	<div className="col-lg-3">
																		<div>
																			<p
																				className="mb-1"
																				style={{ fontWeight: "500" }}
																			>
																				Minutes
																			</p>
																			<input
																				type="number"
																				className="form-control"
																				value={individualInstitute.minutes}
																				onChange={(e) =>
																					setIndividualInstitute({
																						...individualInstitute,
																						minutes: e.target.value,
																					})
																				}
																			/>
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div>
																			<p
																				className="mb-1"
																				style={{ fontWeight: "500" }}
																			>
																				Learning Page
																			</p>
																			<input
																				type="file"
																				className="form-control"
																				placeholder="author"
																				onChange={(e) =>
																					setIndividualInstitute({
																						...individualInstitute,
																						learningimg: e.target.files[0], // Use e.target.files to get the selected file
																					})
																				}
																			/>
																		</div>
																	</div>
																</div>
															</div>
															<div className="mt-3">
																<div className="batch_flex mb-4">
																	<p
																		className="my-auto"
																		style={{ fontWeight: "500" }}
																	>
																		What You'll Learn
																	</p>
																	<div>
																		<button className="year my-3">
																			{" "}
																			+ Add
																		</button>
																	</div>
																</div>
																<div>
																	<input
																		type="text"
																		className="form-control p-2"
																		style={{ border: "1px solid #dee2e6" }}
																		value={individualInstitute.fileName}
																		onChange={(e) =>
																			setIndividualInstitute({
																				...individualInstitute,
																				fileName: e.target.value,
																			})
																		}
																	/>
																</div>
															</div>
															<div className="">
																<div className="batch_flex  ">
																	<p
																		className="my-auto"
																		style={{ fontWeight: "500" }}
																	>
																		Requirement
																	</p>
																	<div>
																		<button className="year my-3">
																			{" "}
																			+ Add
																		</button>
																	</div>
																</div>
																<div>
																	<input
																		type="text"
																		className="form-control p-2"
																		style={{ border: "1px solid #dee2e6" }}
																		value={individualInstitute.requirements}
																		onChange={(e) =>
																			setIndividualInstitute({
																				...individualInstitute,
																				requirements: e.target.value,
																			})
																		}
																	/>
																</div>
															</div>
															<div>
																<button
																	className="create_btn mx-2"
																	style={{
																		backgroundColor: "#16c3ea",
																		color: "#000",
																	}}
																>
																	Update
																</button>

																<Link to="/Learn">
																	<button className="create_btn1">Back</button>
																</Link>
															</div>
														</div>
													</form>
												</div>
											</div>
										) : (
											<p>Data not found</p>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LearnUpdate;
