import { Link } from "react-router-dom";
import React from "react";
// import sideimage from "../public/Images/Skill hub Logo Dark.png";
import Login from "./All Images/Login-Page.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiList from "./liberary/apiList";
import Cookies from "js-cookie";

function InstituteLogin() {
	let navigate = useNavigate();

	const [UserEmail, setUserEmail] = useState("");
	const [UserPassword, setUserPassword] = useState("");

	const isValidEmail = (UserEmail) => {
		// A simple email validation regex
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(UserEmail);
	};

	console.log(UserEmail);
	const usersData = {
		UserEmail: UserEmail,
		UserPassword: UserPassword,
	};
	console.log(usersData);

	const onSubmitBtn = (e) => {
		e.preventDefault();

		if (UserEmail && UserPassword !== "") {
			if (!isValidEmail(UserEmail, UserPassword)) {
				toast.error("Enter a valid UserEmail address", {
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
				return;
			}
			const userData = { UserEmail, UserPassword };

			axios
				.post(`${apiList.Userlogin}`, userData)
				.then((response) => {
					if (response.status === 200) {
						let jwtToken = response.data.token;
						Cookies.set("token", jwtToken);

						toast("Successfully logged in!", {
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

						setTimeout(function () {
							navigate("/PerfexHome");
						}, 3000);
					}
				})
				.catch((error) => {
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

	const ShowcomfirmPassword = () => {
		setloginpassword(!loginpassword);
	};

	// useEffect(() => {
	//   const token = localStorage.getItem("token");

	//   if (token) {
	//     navigate("/Dashboard");
	//   }
	// }, []);
	useEffect(() => {
		const token = Cookies.get("token");

		if (token) {
			navigate("/PerfexHome");
		}
	}, []);

	const gotoforgot = () => {
		navigate("/ForgotPassword");
	};
	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					<div className="container51">
						<div class="container mt-5">
							<div class="row">
								<div class="col-md-3 d-none d-sm-block">
									{/* <div class=" mt-5">
                    <img
                      src="https://img.freepik.com/premium-vector/online-registration-sign-up-with-man-sitting-near-smartphone_268404-95.jpg"
                      alt={sideimage}
                      className=""
                      style={{width:"530px"}}
                    />
                  </div> */}
								</div>

								<div class="col-md-6 mt-2">
									<div class="  logincard1 px-4 py-4">
										<div class="loginheader">
											<img
												src="./Images/Skill Hub Logo Dark (2).png"
												alt="img"
												className=" m-2 pb-1"
												style={{
													width: "150px",
													height: "150px",
													borderRadius: "10px",
												}}
											/>
										</div>

										<ToastContainer
											position="top-center"
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

										<ToastContainer />
										<form className="forms2" onSubmit={onSubmitBtn}>
											<div className="input-with-icon">
												<label className=" " style={{ fontWeight: "500" , color:"#000"}}>
													Email ID
												</label>
												<div className="d-flex">
													<div>
														<i
															class="fa-solid fa-user"
															style={{ padding: "10px", color:"#000" }}
														></i>
													</div>
													<div className="w-100">
														<input
															type="text"
															className=" form-control  effect-1"
															style={{
																border: "none",
																backgroundColor: "transparent",
															}}
															placeholder="Enter your UserEmail ID"
															onChange={(e) => setUserEmail(e.target.value)}
															value={UserEmail}
														/>
														<span class="focus-border"></span>
													</div>
												</div>
											</div>

											<div class="col-3"></div>

											<div className="input-with-icon">
												<label className=" mt-4" style={{ fontWeight: "500", color:"#000" }}>
													Password
												</label>
												<div className="d-flex">
													<div className="">
														<i
															class="fa-solid fa-key  "
															style={{ padding: "10px", color:"#000"}}
														></i>
													</div>
													<div className="w-100">
														<input
															type={loginpassword ? "text" : "password"}
															className="form-control  effect-2"
															style={{
																border: "none",
																backgroundColor: "transparent",
															}}
															placeholder="Enter your Password"
															onChange={(e) => setUserPassword(e.target.value)}
															value={UserPassword}
														/>
														<span class="focus-border1"></span>
													</div>
													<div className="text-end">
														<i
															class="fa-regular fa-eye  "
															style={{
																padding: "10px",color:"grey"
															}}
															onClick={ShowcomfirmPassword}
														></i>
													</div>
												</div>
											</div>

											{/* <a
												href="/ForgotPassword"
												style={{ textDecoration: "none" }}
											> */}
											<div className="text-end">
												<span
													onClick={gotoforgot}
													className="forgetpassword1 mt-2 mb-0"
													style={{ cursor: "pointer" }}
												>
													Forgot password?
												</span>
											</div>

											{/* </a> */}
											<br />
											<div className="text-center mb-2">
												<button
													className=" col-12 col-md-3 Registerbtn11   p-2 "
													type="submit"
												>
													Sign in
												</button>
											</div>
										</form>
										{/* <form className="forms2" onSubmit={onSubmitBtn1}>

                      <label className="heading123 m-2">Email ID</label>
                      <br />
                      <input
                        type="text"
                        className="p1"
                        style={{ border: "1px solid #c9bed7" }}
                        placeholder="  Enter your UserEmail ID"
                        onChange={(e) => setuserEmail(e.target.value)}
                        value={userEmail}
                      />
                      <br />

                      <div className="input-with-icon">
                        <label className="heading123 m-2">Password</label>
                        <br />
                        <div className="">
                          <input
                            type={loginpassword ? "text" : "password"}
                            className="p-2 p10912"
                            style={{ border: "1px solid #c9bed7" }}
                            placeholder="   Minimum 6 characters"
                            onChange={(e) => setPassword(e.target.value)}
                            value={Password}
                          />
                          <i
                            class="fa-regular fa-eye icon1"
                            onClick={ShowcomfirmPassword}
                          ></i>
                        </div>
                      </div>

                      <a
                        href="/ForgotPassword"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="forgetpassword1">
                          Forgot password?
                        </span>
                      </a>
                      <br />

                      <button
                        class=" col-12 col-md-3 Registerbtn11  mb-3 p-2"
                        type="submit"
                      >
                        Sign in
                      </button>
                    </form> */}
									</div>
								</div>
								<div class="col-md-3"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default InstituteLogin;
