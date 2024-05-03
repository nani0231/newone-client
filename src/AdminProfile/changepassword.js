import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import { useState, useRef } from "react";
import apiList from "../liberary/apiList";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

const Changepassword = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [loading, setLoading] = useState(true);
	const mountedRef = useRef(true);

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

	const [UserPassword, setUserPassword] = useState("");
	const [loggeedInPassword, setLoggedInPassword] = useState("");
	const token = Cookies.get("token");

	console.log(UserPassword);

	useEffect(() => {
		// Fetch data when the component mounts
		fetchData();
	}, []);

	const fetchData = () => {
		axios
			.get(apiList.Userlogin)
			.then((response) => {
				console.log("Response Status:", response.status);
				console.log("Response Data:", response.data);

				if (response && response.data) {
					setUserPassword(response.data);
				} else {
					console.error("Invalid response or data:", response);
					// Handle null or undefined case
				}
			})
			.catch((error) => {
				console.error("Error fetching categories:", error.response.data);
			});
	};

	useEffect(() => {
		getLoggedInDetails();
	}, []);
	const getLoggedInDetails = async (req, res) => {
		try {
			axios
				.get(`${apiList.UserDetail}`, {
					headers: {
						token: token,
					},
				})
				.then((response) => {
					if (response && response.data !== undefined) {
						console.log(response.data);
						const { UserPassword } = response.data;
						// Assuming you have a state variable setPassword to update the password
						setLoggedInPassword(UserPassword);
						// Open the modal for editing
						// $("#myModal1").modal("show");
					} else {
						console.error("Invalid response or data:", response);
					}
				})
				.catch((error) => {
					console.error(
						"Error fetching user details:",
						error.response ? error.response.data : error.message
					);
				});
		} catch (err) {
			console.log(err);
		}
	};

	const [newPassword, setNewPassword] = useState("");
	const [updateMessage, setUpdateMessage] = useState("");
	const [selectedtopic, setselectedtopic] = useState(null);

	const onUpdateCategory = () => {
		try {
			console.log(`${apiList.ChangePassword}`);

				axios.put(
				`${apiList.ChangePassword}`,
				{ UserPassword: newPassword },
				{
					headers: {
						token: token,
					},
				}
			);
			toast.success('Password updated successfully', {
				position: toast.POSITION.TOP_CENTER,
			  });

		} catch (err) {
			console.log(err);	
			toast.error('Password update failed', {
				position: toast.POSITION.TOP_RIGHT,
			  });
		}
	};

	console.log(newPassword);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000); // Simulating a 2-second loading delay
		return () => clearTimeout(timer);
	}, []);

	return (
		<div>
		<ToastContainer/>
			<div className="container-fluid ">
				<div className="row">
					{isOpen && (
						<div className=" col-12 col-lg-3 col-md-12 sectioncard121">
							<Sidebar />
						</div>
					)}
					<div
						className={`my-3 col-12 col-md-${isOpen ? 12 : 10} col-lg-${
							isOpen ? 9 : 12
						}`}
					>
						<div>
							<i
								className="fa-solid fa-bars bars  d-lg-block d-none"
								onClick={toggleSidebar}
							></i>
							{loading ? (
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
						
						<div className="row">
							<div className="col-md-2"></div>
							<div className="col-md-8 mt-5">
								<div className=" ">
									<h3 style={{color:"#16c3ea"}} className="text-center mb-5">Change Password</h3>
									<label className="mb-2">
										Enter Your Password{" "}
										<sup
											style={{ color: "red", fontSize: "16px", top: "-4px" }}
										>
											*
										</sup>
									</label>
									<input
										type="text"
										className="form-control"
										placeholder="Enter Your New Password"
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
									/>
									<div className="mt-4 text-center">
										<button
											className="check_button1"
											onClick={onUpdateCategory}
											style={{backgroundColor:"#16c3ea", color:"#000"}}
										>
											Change Password
										</button>
										{updateMessage && <p>{updateMessage}</p>}
									</div>
								</div>
							</div>
							<div className="col-md-2"></div>
						</div>
						)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Changepassword;
