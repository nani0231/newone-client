import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import "./userblogs.css";
import UserNavbar from "./Usernavbar";
import UserFooter from "./userfooter";
import apiList from "../liberary/apiList";

const Sample = () => {
	const [firstname, setfirstname] = useState("");
	const [lastname, setlastname] = useState("");
	const [email, setemail] = useState("");
	const [organizationname, setorganizationname] = useState("");
	const [mobilenumber, setmobilenumber] = useState("");
	const [password, setpassword] = useState("");

	const [mobileNumberError, setMobilenumberError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const token = Cookies.get("token");

	//   const validateMobileNumber = (value) => {
	//     if (value === "") {
	//       setMobileNumberError("");
	//         return false;
	//     }
	//     const isValid = /^[6-9]\d{9}$/.test(value);
	//     setMobileNumberError(isValid ? "" : "Please enter 10 numbers");
	//     return isValid;

	// };
	const validateMobileNumber = (value) => {
		// Check if the value is empty
		if (value === "") {
			setMobilenumberError(""); // Clear the error message
			return false; // Indicate that the mobile number is not valid
		}

		// Use a regular expression to validate the mobile number
		const isValid = /^[6-9]\d{9}$/.test(value);

		// Set the error message based on validity
		setMobilenumberError(
			isValid ? "" : "Please enter a valid 10-digit mobile number"
		);

		// Return the validity of the mobile number
		return isValid;
	};

	const validatepassword = (value) => {
		const passwordRegex =
			/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		const isValid = passwordRegex.test(value);
		setPasswordError(
			isValid
				? ""
				: "Password does not meet the requirements,password must contain one capital like @"
		);
		return isValid;
	};

	let navigate = useNavigate();
	const [data, setdata] = useState([]);

	console.log(firstname);

	const usersData = {
		firstname: firstname,
		lastname: lastname,
		email: email,
		organizationname: organizationname,
		mobilenumber: mobilenumber,
		password: password,
	};

	console.log(usersData);

	const [worksheetLoading, setWorksheetLoading] = useState(true);

	const onSubmitForm = (e) => {
		e.preventDefault();
		if (
			firstname &&
			lastname &&
			email &&
			organizationname &&
			mobilenumber &&
			password !== ""
		) {
			axios
				.post(`${apiList.signupdata}`, usersData)
				.then((response) => {
					setdata(response.data);
					console.log(response.data);
					if (response.status === 200) {
						toast.success("Registration Successfull", {
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
							navigate("/UserLoginDetails");
						}, 3000);
					}
				})
				.catch((error) => {
					toast.error("User Already Exist ", {
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
					console.log(error.message);
				});
		} else {
			toast.warning("Enter the Required Details", {
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
		}
	};

	console.log(firstname);

	useEffect(() => {
		setWorksheetLoading(false);
		if (token) {
			navigate("/userlogindetails");
		}
	}, []);

	const gotologin = () => {
		navigate("/userlogindetails");
	};

	return (
		<div>
			<UserNavbar />
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
				<div className="container mt-5 py-5">
					<div className="row">
						<div className="col-md-2 "></div>
						<div className="col-md-8   mt-4 ">
							<div className="logincard3 p-4">
								<h3 className="text-center mb-3">USER SIGN UP</h3>
								{/* Same as */}
								<ToastContainer />

								<form onSubmit={onSubmitForm}>
									<div className="row">
										<div className="col-md-6  ">
											<div className="input-with-icon">
												<label style={{ fontSize: "16px", fontWeight: "500" }}>
													FirstName
												</label>

												<div className="d-flex w-100">
													<div>
														<i
															class="fa-solid fa-user"
															style={{
																marginTop: "10px",
																color: "rgba(158, 155, 155, 0.833)",
															}}
														></i>
													</div>
													<div className="w-100 signup_form">
														<input
															type="text"
															placeholder="Enter Your First Name"
															className="w-100 firstname second form-control effect-1"
															name="firstName"
															onChange={(e) => setfirstname(e.target.value)}
															value={firstname}
															style={{
																backgroundColor: "transparent",
																border: "none",
															}}
														/>
														<span class="focus-border"></span>
													</div>
												</div>
											</div>
										</div>
										<div className="col-md-6  ">
											<div className="input-with-icon">
												<label
													className="my-1"
													style={{ fontSize: "16px", fontWeight: "500" }}
												>
													LastName
												</label>

												<div className="d-flex w-100">
													<div>
														<i
															class="fa-solid fa-user"
															style={{
																marginTop: "10px",
																color: "rgba(158, 155, 155, 0.833)",
															}}
														></i>
													</div>
													<div className="w-100 signup_form">
														<input
															type="text"
															placeholder="Enter Your Last Name"
															className="w-100  firstname second form-control effect-2"
															name="fullName"
															onChange={(e) => setlastname(e.target.value)}
															value={lastname}
															style={{
																backgroundColor: "transparent",
																border: "none",
															}}
														/>
														<span class="focus-border1"></span>
													</div>
												</div>
											</div>
										</div>
										<div className="col-md-6 mt-3">
											<div className="input-with-icon">
												<label
													className=""
													style={{ fontSize: "16px", fontWeight: "500" }}
												>
													Email
												</label>
												<div className="d-flex">
													<div>
														<i
															class="fa-solid fa-envelope"
															style={{
																marginTop: "10px",
																color: "rgba(158, 155, 155, 0.833)",
															}}
														></i>
													</div>
													<div className="w-100 signup_form">
														{" "}
														<input
															type="text"
															placeholder="Enter Your Email"
															className="w-100  firstname second form-control effect-2"
															name="fullName"
															onChange={(e) => setemail(e.target.value)}
															value={email}
															style={{
																backgroundColor: "transparent",
																border: "none",
															}}
														/>
														<span class="focus-border1"></span>
													</div>
												</div>
											</div>
										</div>
										<div className="col-md-6 mt-3">
											<div className=" input-with-icon">
												<label
													className=""
													style={{ fontSize: "16px", fontWeight: "500" }}
												>
													Organization Name
												</label>
												<div className="d-flex">
													<div>
														<i
															class="fa-solid fa-house"
															style={{
																marginTop: "10px",
																color: "rgba(158, 155, 155, 0.833)",
															}}
														></i>
													</div>
													<div className="w-100 signup_form">
														{" "}
														<input
															type="text"
															placeholder="Enter Your Organization Name"
															className="w-100  firstname second form-control effect-2"
															name="fullName"
															onChange={(e) =>
																setorganizationname(e.target.value)
															}
															value={organizationname}
															style={{
																backgroundColor: "transparent",
																border: "none",
															}}
														/>
														<span class="focus-border1"></span>
													</div>
												</div>
											</div>
										</div>
										<div className="col-md-6 mt-3">
											<div className="input-with-icon ">
												<label
													className=""
													style={{ fontSize: "16px", fontWeight: "500" }}
												>
													Mobile Number
												</label>
												<div className="d-flex">
													<div>
														<i
															class="fa-solid fa-phone"
															style={{
																marginTop: "10px",
																color: "rgba(158, 155, 155, 0.833)",
															}}
														></i>
													</div>
													<div className="w-100 signup_form">
														<input
															type="text"
															placeholder="Enter Your  Mobile Number"
															className="w-100  firstname second form-control effect-2"
															name="fullName"
															onChange={(e) =>
																setmobilenumber(
																	e.target.value
																		.replace(/\D/g, "")
																		.substring(0, 10)
																)
															}
															value={mobilenumber}
															style={{
																backgroundColor: "transparent",
																border: "none",
															}}
														/>
														<span class="focus-border1"></span>
													</div>
												</div>
											</div>
										</div>
										<div className="col-md-6 mt-3">
											{mobileNumberError && mobilenumber.length === 10 && (
												<div className="invalid-feedback">
													{mobileNumberError}
												</div>
											)}
											{mobilenumber.length > 1 && mobilenumber.length < 10 && (
												<div className="text-danger">
													Please enter 10 numbers
												</div>
											)}
											{mobilenumber && !/^[6-9]/.test(mobilenumber) && (
												<div className="text-danger">
													Mobile number must start with 6, 7, 8, or 9
												</div>
											)}
											<div className="input-with-icon ">
												<label
													className=""
													style={{ fontSize: "16px", fontWeight: "500" }}
												>
													Password
												</label>
												<div className="d-flex">
													<div>
														<i
															class="fa-solid fa-key"
															style={{
																marginTop: "12px",
																color: "rgba(158, 155, 155, 0.833)",
															}}
														></i>
													</div>
													<div className="w-100 signup_form">
														{" "}
														<input
															type="password"
															className={`form-control firstname second  form-control effect-2 ${
																passwordError ? "is-invalid" : ""
															}`}
															placeholder="Enter Your Password"
															id=""
															onChange={(e) => setpassword(e.target.value)}
															value={password}
															style={{
																backgroundColor: "transparent",
																border: "none",
															}}
														/>
														<span class="focus-border1"></span>
													</div>
												</div>

												{passwordError && (
													<div className="invalid-feedback">
														{passwordError}
													</div>
												)}
											</div>
										</div>
										{/* <div className="col-md-6 ">
											<div className="my-4 text-center">
												<button
													className=""
													onClick={gotologin}
													style={{
														backgroundColor: "#981a96",
														color: "#fff",
														border: "none",
														borderRadius: "10px",
														padding: "8px",
														width: "150px",
													}}
												>
													Log In
												</button>
											</div>
										</div> */}
										<div className="col-md-12">
											<div className="my-4 text-center">
												<button
													className=""
													style={{
														backgroundColor: "#16c3ea",
														color: "white",
														border: "none",
														borderRadius: "10px",
														padding: "8px",
														width: "150px",
													}}
												>
													Sign Up
												</button>
											</div>
										</div>

										<p className="text-center">
											{" "}
											Do You have account ?{" "}
											<span onClick={gotologin} className="singup_data">
												Login
											</span>
										</p>
									</div>
								</form>
							</div>
						</div>
						<div className="col-md-2"></div>
					</div>
				</div>
			)}
			<UserFooter />
		</div>
	);
};
export default Sample;
