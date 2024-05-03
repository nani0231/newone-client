import { Link } from "react-router-dom";
import React from "react";
import Login from "../All Images/Login-Page.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiList from "../liberary/apiList";
import Cookies from "js-cookie";

function 
SuperLogin() {
	let navigate = useNavigate();

	const [UserEmail, setUserEmail] = useState("");
	const [UserPassword, setUserPassword] = useState("");
	const [itisLoading, setItisLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  
  const [step, setStep] = useState(1);
  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
	const timer = setTimeout(() => {
		setItisLoading(false);
	}, 1000);

	return () => clearTimeout(timer);
}, []);
useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [counter]);
  
const handleEmailSubmit = (e) => {
	e.preventDefault();
	let emailToSend = email;
	if (!email) {
	  const emailFromLocalStorage = Cookies.get('emailToSend')
	  if (emailFromLocalStorage) {
		emailToSend = emailFromLocalStorage;
	  } else {
		return 	toast('Please Enter Your Email', {
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
			className: "custom-toast-custom2",
		});;
	  }
	}
  
	axios
	  .post(`${apiList.forgetPassword}`, { email: emailToSend })
	  .then((response) => {
		if (response.data.status === 'success') {
		Cookies.set('emailToSend',emailToSend)
		  setStep(3);
		  setMessage(response.data.message);
		  toast(response.data.message, {
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
		  setCounter(59);
		} else {
		  setMessage(response.data.message);
		  toast(response.data.message, {
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
	  })
	  .catch((error) => {
		console.error(error);
		setMessage('An error occurred. Please try again later.');
		toast('An error occurred. Please try again later.', {
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
			className: "custom-toast-custom2",
		});
	  });
  };
  
  const handleOTPSubmit = (e) => {
    e.preventDefault();
    axios.post(`${apiList.verifyOTP}`, { email,otp })
      .then(response => {
        if (response.data.status === 'success') {
          setStep(4);
          setMessage(response.data.message);
		  toast(response.data.message, {
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
			className: "custom-toast-custom2",
		})
        } else {
          setMessage(response.data.message);
		  toast(response.data.message, {
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
			className: "custom-toast-custom2",
		})
        }
      })
      .catch(error => {
        console.error(error);
        setMessage('An error occurred. Please try again later.');
		toast('Invalid OTP', {
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
			className: "custom-toast-custom2",
		})
      });
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
	if(newPassword===newConfirmPassword){
		axios.post(`${apiList.resetPassword}`, { email,newPassword })
      .then(response => {
        if (response.data.status === 'success') {
          setMessage('Password reset successfully. You can now login with your new password.');
		  toast('Password reset successfully. You can now login with your new password.', {
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
			className: "custom-toast-custom2",
		})
          setEmail('');
          setOTP('');
          setNewPassword('');
		  setTimeout(async () => {
			setStep(1)
		  }, 3000);

        } else {
          setMessage(response.data.message);
		  toast(response.data.message, {
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
			className: "custom-toast-custom2",
		})
        }
      })
      .catch(error => {
        console.error(error);
        setMessage('An error occurred. Please try again later.');
		toast('An error occurred. Please try again later.', {
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
			className: "custom-toast-custom2",
		})
      });
	}else 
	return toast('Password should be Match with Confirmpassword', {
		position: "top-center",
		autoClose: 1000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		className: "custom-toast-custom2",})

  };

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
					className: "custom-toast-custom2",
				});
				return;
			}
			const userData = { UserEmail, UserPassword };

			axios
				.post(`${apiList.AllUserslogin}`, userData)
				.then((response) => {
					if (response.status === 200) {
						let jwtToken = response.data.token;
						Cookies.set("token", jwtToken);
                        let empType = response.data.empType;
                        localStorage.setItem("token", jwtToken);
                        localStorage.setItem("employeType", empType);
                        localStorage.setItem("UserEmail", UserEmail);
						toast("Successfully logged in!", {
							position: "top-center",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "colored",
							className: "custom-toast-custom2",
						});
                       
						setTimeout(function () {
                            if (empType === "SuperAdmin") {
                                navigate("/SuperHomePage");
                              }
                            else if (empType === 'Admin') {
                                navigate('/PerfexHome')
                              }
                              else
							navigate("/Userdashbord");
                              
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
										className: "custom-toast-custom2",
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
									className: "custom-toast-custom2",
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
									className: "custom-toast-custom2",
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
								className: "custom-toast-custom2",
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
				className: "custom-toast-custom2",
			});
		}
	};

	const [loginpassword, setloginpassword] = useState(false);
	const [loginnewpassword, setloginnewpassword] = useState(false);

	const ShowcomfirmPassword = () => {
		setloginpassword(!loginpassword);
	};
	const ShowNewcomfirmPassword = () => {
		setloginnewpassword(!loginnewpassword);
	};
	useEffect(() => {
		const token = Cookies.get("token");

		if (token) {
			navigate("/PerfexHome");
		}
	}, []);

	const gotoforgot = () => {
		setStep(2);
		Cookies.remove('emailToSend')
	};
	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					<div className="container51 vh-100">
						<div class="container mt-5">
							<div class="row">
								<div class="col-md-3 d-none d-sm-block">
								</div>
								<div class="col-md-6 mt-4">
									<div class="  logincard1 px-5 py-5 mx-4">
									<h6 className="forgotheading1 text-dark text-center">Welcome User</h6>
										<div class="loginheader">
											<img
												src="./Images/Skill Hub Logo Dark (2).png"
												alt="img"
												className=" m-2 pb-1"
												style={{
													width: "150px",
													height: "60px",
													borderRadius: "10px",
												}}
											/>
										</div>
										<ToastContainer />
										{step === 1 && (
										<form className="" onSubmit={onSubmitBtn}>
											<div className="input-with-icon">
												{/* <label className=" " style={{ fontWeight: "500" , color:"#000"}}>
													Email ID
												</label> */}
												<div className="d-flex mb-5">
													{/* <div>
														<i
															class="fa-solid fa-user"
															style={{ padding: "10px", color:"#000" }}
														></i>
													</div> */}
													<div className="w-100">
														<input
															type="text"
															className=" form-control  effect-1"
															style={{
																border: "",
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
												{/* <label className=" mt-4" style={{ fontWeight: "500", color:"#000" }}>
													Password
												</label> */}
												<div className="d-flex">
													{/* <div className="">
														<i
															class="fa-solid fa-key  "
															style={{ padding: "10px", color:"#000"}}
														></i>
													</div> */}
													<div className="w-100">
														<input
															type={loginpassword ? "text" : "password"}
															className="form-control  effect-2"
															style={{
																border: "",
																backgroundColor: "transparent",
															}}
															placeholder="Enter your Password"
															onChange={(e) => setUserPassword(e.target.value)}
															value={UserPassword}
														/>
														<span class="focus-border1"></span>
													</div>
													<span className="text-end form-control effect-2">
														<i
															class="fa-regular fa-eye  "
															style={{
																padding: "10px",color:"grey"
															}}
															onClick={ShowcomfirmPassword}
														></i>
													</span>
												</div>
											</div>
											<div className="text-end">
												<span
													onClick={gotoforgot}
													className="forgetpassword1 mt-2 mb-0"
													style={{ cursor: "pointer" }}
												>
													Forgot password?
												</span>
											</div>
											<br />
											<div className="text-center mb-2">
												<button
													className="col-12 w-100 Registerbtn11   p-2"
													style={{borderRadius:"20px"}}
												>
													Sign in
												</button>
											</div>
										</form>
										)}
										 {step === 2 && (
								<div>
									<h6 className="forgotheading text-dark">Forget Password</h6>
									<span className="forgotspan">
                                        It only takes a couple of minutes to get started!
                                    </span>
									<form onSubmit={handleEmailSubmit}>
									<div className="text-start mt-3">
                                        {/* <label className="text-dark" style={{fontWeight:"500"}}>Email ID</label> */}

                                        <div className="d-flex ">
                                            <div
                                                className="w-100 input-with-icon"
                                                style={{ borderBottom: "none" }}
                                            >
									 		<input
                                                    type="text"
                                                    style={{ border: "", backgroundColor:"transparent" }}
                                                    className="form-control effect-1"
                                                    placeholder="Enter Your MailId"
                                                    onChange={(e)=>setEmail(e.target.value)}
                                                />
										<span className="focus-border"></span>
                                            </div>
                                        </div>
                                        <p className="forgotspan mt-3 ml-3" style={{color: "rgb(22, 195, 234)"}}>
										{message}
                                        </p>
                                        <div className="text-center mt-5">
                                            <button className="forgotsubmit1 mb-2 p-2 w-100 Registerbtn11" style={{borderRadius:"20px"}}>Submit</button>
                                        </div>
                                    </div>
									</form>
								</div>
								)}
								{step === 3 && (
								<div>
									<div className="">
                                    <h6 className="forgotheading text-dark">Verify OTP</h6>
                                    <span className="forgotspan">
                                        It only takes a couple of Seconds to get started!
                                    </span>

                                    <div className="text-start  mt-4">
                                        {/* <label className="text-dark" style={{fontWeight:"500"}}>PIN</label> */}
										<form onSubmit={handleOTPSubmit}>
                                        <div className="d-flex">
                                            <div
                                                className="w-100 input-with-icon"
                                                style={{ borderBottom: "none" }}
                                            >
                                                <input
                                                    type="text"
                                                    style={{ border: "", backgroundColor:"transparent" }}
                                                    className="form-control effect-1"
                                                    placeholder="Enter OTP"
													value={otp}
                                                    onChange={(e)=>setOTP(e.target.value)}
													required
                                                />
												
                                                <span className="focus-border"></span>
                                            </div>
                                        </div>
                                        <p className="forgotspan mt-3" style={{color: "rgb(22, 195, 234)"}}>
                                            {/* {message} */}
											{counter ===0 ? (<p className='float-right btn' style={{color:'Green'}} onClick={handleEmailSubmit}> Resend OTP</p>):(
											<p className='float-right' style={{color:'red'}}> Expires in {counter} seconds</p>)}
                                        </p>
										    <div className="text-center">
                                            <button className="w-100 forgotsubmit1 mb-2 p-2 Registerbtn11"
											style={{borderRadius:"20px"}}>Verify</button>
                                        </div>
										</form>
                                    </div>
                                </div>
							</div>
								)}
								{step === 4 && (
								<div>
									<div className="">
                                    <h6 className="forgotheading text-dark">Reset Password</h6>
                                    <span className="forgotspan">
                                        It only takes a couple of seconds to get started!
                                    </span>
                                    <div className="text-start  mt-4">
                                        {/* <label className="text-dark" style={{fontWeight:"500"}}>Reset Password</label> */}
										<form onSubmit={handleResetPasswordSubmit}>
                                        <div className="d-flex mb-2 mt-2">
                                            <div
                                                className="w-100 input-with-icon"
                                                style={{ borderBottom: "none" }}
                                            >
                                                <input
													type={loginpassword ? "text" : "password"}
                                                    style={{ border: "", backgroundColor:"transparent" }}
                                                    className="form-control effect-1"
                                                    placeholder="Enter New Password"
                                                    onChange={(e)=>setNewPassword(e.target.value)}
													required
                                                />
												
                                                <span className="focus-border"></span>												
                                            </div>
											<span className="text-end form-control effect-2">
												<i
													class="fa-regular fa-eye  "
													style={{
														padding: "10px",color:"grey"
													}}
													onClick={ShowcomfirmPassword}
												></i>
											</span>										
											
                                        </div>
										<div className="d-flex mt-4 mb-3">
                                            <div
                                                className="w-100 input-with-icon"
                                                style={{ borderBottom: "none" }}
                                            >
                                                <input
                                                   type={loginnewpassword ? "text" : "password"}
                                                    style={{ border: "", backgroundColor:"transparent" }}
                                                    className="form-control effect-1"
                                                    placeholder="Enter Confirm Password"
                                                    onChange={(e)=>setNewConfirmPassword(e.target.value)}
													required
                                                />
                                                <span className="focus-border"></span>
                                            </div>
											<span className="text-end form-control effect-2">
												<i
													class="fa-regular fa-eye  "
													style={{
														padding: "10px",color:"grey"
													}}
													onClick={ShowNewcomfirmPassword}
												></i>
											</span>
											
                                        </div>
                                        {/* <p className="forgotspan mt-3" style={{color: "rgb(22, 195, 234)"}}>
                                            {message}
                                        </p> */}
                                        <div className="text-center mt-4">
                                            <button className="forgotsubmit1 p-2 w-100 Registerbtn11"
											style={{borderRadius:"20px"}}>Submit</button>
                                        </div>
										</form>
                                    </div>
                                </div>
								</div>
								)}
										
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
export default SuperLogin;
