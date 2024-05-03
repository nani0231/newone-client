import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import apiList from './liberary/apiList';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function ForgotPassword() {
	const navigate = useNavigate();
	const [itisLoading, setItisLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter OTP, 3: Reset password
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
		// Handle case where email is not available in localStorage
		return;
	  }
	}
  
	axios
	  .post(`${apiList.forgetPassword}`, { email: emailToSend })
	  .then((response) => {
		if (response.data.status === 'success') {
		Cookies.set('emailToSend',emailToSend)
		  setStep(2);
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
			className: "custom-toast-custom",
		});
	  });
  };
  
  const handleOTPSubmit = (e) => {
    e.preventDefault();
    axios.post(`${apiList.verifyOTP}`, { email,otp })
      .then(response => {
        if (response.data.status === 'success') {
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
			className: "custom-toast-custom",
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
			className: "custom-toast-custom",
		})
      });
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
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
			className: "custom-toast-custom",
		})
          setEmail('');
          setOTP('');
          setNewPassword('');
		  setTimeout(async () => {
			navigate("/SuperLogin")
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
			className: "custom-toast-custom",
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
			className: "custom-toast-custom",
		})
      });
  };

  return (
    <div>
		 <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        {itisLoading ? (
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
                        ) : (
                            <div className="card card-container121  p-3 " >
                               <div className='text-center'>
							   <ToastContainer/>
							   {step === 1 && (
								<div>
									<h6 className="forgotheading text-dark">Forget Password</h6>
									<span className="forgotspan">
                                        It only takes a couple of minutes to get started!
                                    </span>
									<form onSubmit={handleEmailSubmit}>
									<div className="text-start  mt-4">
                                        <label className="text-dark" style={{fontWeight:"500"}}>Email ID</label>

                                        <div className="d-flex">
                                            <div
                                                className="w-100 input-with-icon"
                                                style={{ borderBottom: "none" }}
                                            >
									 		<input
                                                    type="text"
                                                    style={{ border: "none", backgroundColor:"transparent" }}
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
                                        <div className="text-center">
                                            <button className="forgotsubmit1 mb-2 p-2 w-100" >Submit</button>
                                        </div>
                                    </div>
									</form>
								</div>
								)}
								{step === 2 && (
								<div>
									<div className="text-center">
                                    <h6 className="forgotheading text-dark">Verify OTP</h6>
                                    <span className="forgotspan">
                                        It only takes a couple of Seconds to get started!
                                    </span>

                                    <div className="text-start  mt-4">
                                        <label className="text-dark" style={{fontWeight:"500", marginLeft:"15px",}}>PIN</label>
										<form onSubmit={handleOTPSubmit}>
                                        <div className="d-flex">
                                            <div
                                                className="w-100 forms2 input-with-icon"
                                                style={{ borderBottom: "none" }}
                                            >
                                                <input
                                                    type="text"
                                                    style={{ border: "none", backgroundColor:"transparent" }}
                                                    className="form-control effect-1"
                                                    placeholder="Enter OTP"
													value={otp}
                                                    onChange={(e)=>setOTP(e.target.value)}
													required
                                                />
												
                                                <span className="focus-border"></span>
                                            </div>
                                        </div>
                                        <p className="forgotspan mt-3 ml-3" style={{color: "rgb(22, 195, 234)"}}>
                                            {message}
                                        </p>
										{counter ===0 ? (<p className='float-right btn' style={{color:'Green'}} onClick={handleEmailSubmit}> Resend OTP</p>):(
											<p className='float-right' style={{color:'red'}}> Expires in {counter} seconds</p>)}<br/>
                                        <div className="text-center">
                                            <button className="w-100 forgotsubmit1 mb-2 p-2">Verify</button>
                                        </div>
										</form>
                                    </div>
                                </div>
							</div>
								)}
								{step === 3 && (
								<div>
									<div className="text-center">
                                    <h6 className="forgotheading text-dark">Reset Password</h6>
                                    <span className="forgotspan">
                                        It only takes a couple of seconds to get started!
                                    </span>
                                    <div className="text-start  mt-4">
                                        <label className="text-dark" style={{fontWeight:"500", marginLeft:"15px",}}>Reset Password</label>
										<form onSubmit={handleResetPasswordSubmit}>
                                        <div className="d-flex">
                                            <div
                                                className="w-100 forms2 input-with-icon"
                                                style={{ borderBottom: "none" }}
                                            >
                                                <input
                                                    type="password"
                                                    style={{ border: "none", backgroundColor:"transparent" }}
                                                    className="form-control effect-1"
                                                    placeholder="Enter New Password"
                                                    onChange={(e)=>setNewPassword(e.target.value)}
													required
                                                />
                                                <span className="focus-border"></span>
                                            </div>
                                        </div>
                                        <p className="forgotspan mt-3 ml-3" style={{color: "rgb(22, 195, 234)"}}>
                                            {message}
                                        </p>
                                        <div className="text-center">
                                            <button className="forgotsubmit1 mb-2 p-2 w-100">Submit</button>
                                        </div>
										</form>
                                    </div>
                                </div>
								</div>
								)}
								</div>
                            </div>
                        )}
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
     
    </div>
  );
}

export default ForgotPassword;
