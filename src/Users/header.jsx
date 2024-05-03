import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import UserNavbar from "./Usernavbar";
import UserFooter from "./userfooter";
import apiList from "../liberary/apiList";

const Header = () => {
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const [userId, setUserId] = useState(null);

	let navigate = useNavigate();
	const [data, setdata] = useState([]);

	console.log(email);

	const usersData = {
		email: email,
		password: password,
	};

	console.log(usersData);

	const onSubmitForm = (e) => {
		e.preventDefault();
		if (email && password !== "") {
			axios
				.post(`${apiList.login}`, usersData)
				.then((response) => {
					setdata(response.data);

					console.log(response.data);
					if (response.status === 200) {
						const jwtToken = response.data.token;
						Cookies.set("email", email);
						Cookies.set("password", password);
						Cookies.set("token", jwtToken);
						// console.log(response.data.token);

						// toast.success("Login Successful", {
						//     position: "top-right",
						//     autoClose: 1000,
						//     hideProgressBar: false,
						//     closeOnClick: true,
						//     pauseOnHover: true,
						//     draggable: true,
						//     progress: undefined,
						//     theme: "colored"
						// });
						if (response.data.id) {
							setUserId(response.data.id);
							console.log("User ID:", response.data.id);
							Cookies.set("id", response.data.id);
						}
						toast.success("Successfully logged In", {
							position: "top-center",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "colored",
							className: "custom-toast-custom",
						});

						//         setTimeout(function () {
						//             navigate('/')
						//         }, 3000)

						//     }

						// })
						setTimeout(() => {
							navigate("/Userdashbord");
						}, 3000);
					}
				})
				//             .catch((error) => {
				//                 console.log(error.message);
				//             });
				//     }

				//     else {
				//         toast.warning("Enter the Required Details");

				//     }
				// };
				.catch((error) => {
					// ... (your error handling code remains unchanged)
					if (error.response) {
						if (error.response.status === 401) {
							if (error.response.data.message === "Email not found") {
								toast.error(
									"UserEmail not found. Please check your UserEmail.",
									{
										position: "top-center",
										autoClose: 5000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: "colored",
										className: "custom-toast-custom",
									}
								);
							} else if (error.response.data.message === "Incorrect password") {
								toast.error("Incorrect password. Please check your password.", {
									position: "top-center",
									autoClose: 5000,
									hideProgressBar: false,
									closeOnClick: true,
									pauseOnHover: true,
									draggable: true,
									progress: undefined,
									theme: "colored",
									className: "custom-toast-custom",
								});
							}
						} else {
							toast.error(
								"An error occurred on the server. Please try again later.",
								{
									position: "top-center",
									autoClose: 5000,
									hideProgressBar: false,
									closeOnClick: true,
									pauseOnHover: true,
									draggable: true,
									progress: undefined,
									theme: "colored",
									className: "custom-toast-custom",
								}
							);
						}
					} else {
						toast.error(
							"An error occurred. Please check your network connection and try again.",
							{
								position: "top-center",
								autoClose: 5000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
								theme: "colored",
								className: "custom-toast-custom",
							}
						);
						console.error(error);
					}
				});
		} else {
			toast.warning("Enter the Required Details", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				className: "custom-toast-custom",
			});
		}
	};
	const [loginpassword, setloginpassword] = useState(false);
	const [worksheetLoading, setWorksheetLoading] = useState(true);

	const ShowcomfirmPassword = () => {
		setloginpassword(!loginpassword);
	};
	useEffect(() => {
		const token = Cookies.get("token");
		setWorksheetLoading(false);
		if (token) {
			navigate("/Userdashbord");
		}
	}, []);

	const gotosignup = () => {
		navigate("/signupUserData");
	};

	return (
		<div>
			{/* middle position */}
			{worksheetLoading ? (
				<div
					colSpan="4"
					className="d-flex flex-row justify-content-center align-items-center"
					style={{ height: "100vh" }}
				>
					<div>
						<div class="hm-spinner"></div>
					</div>
				</div>
			) : (
				<div className="">
					<div className="container ">
						<div className="row ">
							<div className="col-md-3"></div>
							<div className="col-md-6   ">
								<div className="logincard1 " style={{ marginTop: "50px" }}>
									<div className="text-center">
										<img
											src="./Images/Skill Hub Logo Dark (2).png"
											alt="img"
											className="img-fluid pt-2"
											style={{
												width: "150px",
												height: "120px",
												borderRadius: "10px",
											}}
										/>
									</div>
									<h4 className="text-center pt-3" style={{ color: "#16c3ea" }}>
										USER LOGIN
									</h4>
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
									<div className="p-4">
										<form onSubmit={onSubmitForm}>
											<div className="input-with-icon ">
												<label className="" style={{ fontSize: "16px" }}>
													Email
												</label>
												<div className="d-flex w-100 login_form">
													<div>
														<i class="fa-solid fa-envelope pt-2 text-dark"></i>
													</div>
													<div className="w-100">
														<input
															type="text"
															placeholder="Enter your Email"
															className="w-100 secondname form-control effect-1"
															onChange={(e) => setemail(e.target.value)}
															style={{
																backgroundColor: "transparent",
																border: "none",
																color: "#000",
															}}
														/>
														<span class="focus-border"></span>
													</div>
												</div>
											</div>
											<div className="input-with-icon mt-4">
												<label className="my-1" style={{ fontSize: "16px" }}>
													Password
												</label>

												<div className="d-flex login_form">
													<div>
														<i
															class="fa-regular fa-eye pt-3  text-dark"
															onClick={ShowcomfirmPassword}
														></i>
													</div>
													<div className="w-100 ">
														<input
															type={loginpassword ? "text" : "password"}
															className={`form-control my-1 secondname effect-2 w-100 
                }`}
															placeholder="Enter Your Password"
															id="input"
															onChange={(e) => setpassword(e.target.value)}
															value={password}
															style={{
																backgroundColor: "transparent",
																border: "none",
																color: "#000",
															}}
														/>
														<span class="focus-border1"></span>
													</div>
												</div>
											</div>
											{<div className="invalid-feedback"></div>}
											<div className="row mt-4">
												<div className="col-md-12">
													<div className="my-2 text-center mt-3">
														<button
															className=""
															style={{
																backgroundColor: "#16c3ea",
																color: "white",
																border: "none",
																borderRadius: "7px",
																width: "150px",
																padding: "8px",
															}}
														>
															Login
														</button>
													</div>
												</div>
												{/* <div className="col-md-6">
													<div className="text-center mt-3">
														{" "}
														<button
															onClick={gotosignup}
															className=""
															style={{
																backgroundColor: "#a90b9b",
																color: "#fff",
																border: "none",
																borderRadius: "7px",
																padding: "8px",
																width: "150px",
															}}
														>
															Sign Up
														</button>
													</div>
												</div> */}
											</div>
										</form>
										{userId && <p>User ID: {userId}</p>}

										<p className="mt-4 text-dark text-center">
											{" "}
											Don't have account ? <span className="singup_data" onClick={gotosignup}>Sign up</span>
										</p>
									</div>
								</div>
							</div>
							<div className="col-md-3 "></div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default Header;
