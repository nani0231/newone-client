import { FaBars } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import sideimage from "./All Images/Logo133.jpeg";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import apiList from "../liberary/apiList";
// import siva from "../src/All Images/Siva Image.jpeg";

const VideoFolderUpdatePage = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [individualInstitute, setIndividualInstitute] = useState({
		VideofolderName: "",
	});

	// const changeMessage = (e) => {
	//   const { name, value } = e.target;
	//   setIndividualInstitute((prevIndividualInstitute) => ({
	//     ...prevIndividualInstitute,
	//     [name]: value,
	//   }));
	// };

	// const onSubmitForm = (e) => {
	//   e.preventDefault();

	//   // Assuming you don't want form validation here, so no need for the validateInputs function
	//   const UserData = {
	//     InstituteName: InstituteName,
	//     // Include other form fields as needed
	//   };

	//   axios
	//     .put("" + id, UserData)
	//     .then((response) => {
	//       console.log(response.data);
	//       if (response.status === 200) {
	//         toast.success("Registration Successful", {
	//           position: "top-right",
	//           autoClose: 1000,
	//           hideProgressBar: false,
	//           closeOnClick: true,
	//           pauseOnHover: true,
	//           draggable: true,
	//           progress: undefined,
	//           theme: "colored",
	//         });
	//       }
	//     })
	//     .catch((error) => {
	//       console.error(error);
	//       setError("An error occurred while updating the institute.");

	//       console.log(error.message);
	//     });
	// };

	const onSubmitForm = (e) => {
		e.preventDefault();

		const UserData = {
			VideofolderName: individualInstitute.VideofolderName,
		};

		axios
			.put(`${apiList.UpdateVideosDetails}` + id, UserData)
			.then((response) => {
				console.log(response.data);
				if (response.status === 200) {
					toast.success("Video Folder Update Successful", {
						position: "top-right",
						autoClose: 1000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					});
					setTimeout(function () {
						navigate("/LearnPath");
					}, 3000);
				}
			})
			.catch((error) => {
				console.error(error);
				setError("An error occurred while updating the institute.");
				console.log(error.message);
			});
	};

	useEffect(() => {
		const fetchData = async () => {
			console.log(id);
			try {
				const response = await axios.get(
					`${apiList.DisplayIndividualVideo}/${id}`
				); // Replace with your API endpoint
				setIndividualInstitute(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

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
	const [isInstitutionsOpen, setIsInstitutionsOpen] = useState(true);

	const toggleInstitutions = () => {
		setIsInstitutionsOpen(!isInstitutionsOpen);
	};

	return (
		<div>
			<div className="container-fluid">
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
						<i
							className="fa-solid fa-bars bars  d-lg-block d-none"
							onClick={toggleSidebar}
						></i>

						{loading ? (
							<p>Loading...</p>
						) : individualInstitute ? (
							<div>
								<div className="modal-dialog ">
									<div className="modal-content">
										<div className="modal-header">
											<h4 className="modal-title">Update Video Folder :</h4>
											<br />
											<Link to="/LearnPath">
												<button type="button" className="btn-close"></button>
											</Link>
										</div>
										<div className="modal-body text-start">
											<ToastContainer
												position="top-right"
												autoClose={5000}
												hideProgressBar={false}
												newestOnTop={false}
												closeOnClick
												rtl={false}
												pauseOnFocusLoss
												draggable
												pauseOnHover
												theme="light"
											/>
											{/* Same as */}
											<ToastContainer />
											<form action="" onSubmit={onSubmitForm}>
												<div className="col-12 col-md-6 m-2">
													<label className="headingAdd">Video Folder:</label>
													<br />
													<input
														type="text"
														className="etotal"
														style={{
															border: "1px solid black",
														}}
														placeholder="Enter Head Name"
														value={individualInstitute.VideofolderName}
														onChange={(e) =>
															setIndividualInstitute({
																...individualInstitute,
																VideofolderName: e.target.value,
															})
														}
													/>
												</div>

												<div className="modal-footer mt-3">
													<button
														type="submit"
														className="btn"
														style={{
															backgroundColor: "#a5059d",
															color: "white",
														}}
													>
														Update
													</button>
												</div>
												<p>{error}</p>
											</form>
										</div>
									</div>
								</div>
							</div>
						) : (
							<p>Data not found</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoFolderUpdatePage;
