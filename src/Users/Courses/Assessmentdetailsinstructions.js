import React, { useState } from "react";
import {
	useHistory,
	useNavigate,
	useParams,
	useLocation,
} from "react-router-dom";
import NavbarUser from "../navbaruser";
import UserFooter from "../userfooter";
import { ToastContainer, toast } from "react-toastify";

function Assessmentdetailsinstructions() {
	const { state } = useLocation();
	const { Timelimit, Modalname } = state || {};
	const navigate = useNavigate();
	const { learningPathTitle} = useParams();
	const [isChecked, setIsChecked] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isInputClicked, setIsInputClicked] = useState(false);

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
		setIsHovered(true);
	};

	const handleInputClick = () => {
		setIsInputClicked(true);
	};

	const handleButtonHover = () => {
		if (isChecked && isHovered) {
			// Navigate to Packs6 page
			navigate(`/Assessmentcertificationtest/${learningPathTitle}`)
        }
    else {
      toast("Please read and check the checkbox before continuing", {
        position: "top-center",
        autoClose: 1500,
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
	return (
		<>
			<NavbarUser />
      <ToastContainer/>
			<div className="container my-5 pt-2">
				<div className="row mt-5">
					<div className="col-12 mocks mt-3">
						<h4 className="mocks-2">{Modalname}</h4>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<h5 className="">Instructions:</h5>
						<div className="span">
							<p className="text-item">
								1.The countdown timer in the top of the screen will display the
								remaining time available for you to complete the examination.
								When the timer reaches zero, the examination will end by itself.
								You will not be required to end or submit your examination.
							</p>

							<p className="text-item">
								2.The Questions Palette displayed on the right side of screen
								will show the status of each question using one of the following
								symbols:
							</p>

							<p className="text-item">
								3.You can navigate from one question to any question any time
								using the Question Palette by directly clicking on the question
								number. (For linear, this point should be in opposite)
							</p>

							<p className="text-item" >
								4.Click on Save and Next to save your answer for the current
								question and then go to the next question.
							</p>

							<p className="text-item">
								5.To select your answer for the question, click on the button of
								one of the options.
							</p>

							<p className="text-item">
								6.To deselect your chosen answer, click on the button of clear
								response.
							</p>

							<p className="text-item">
								7.To change your chosen answer, click on the button of another
								option.
							</p>

							<p className="text-item">
								8.After clicking on the Save and Next button on the last
								question for a section, you will automatically be taken to the
								first question of the next question.
							</p>

							<p className="text-item">
								9.For every Coding Question, You have to click on Submit Code.
								Otherwise, it will be marked as not attempted.
							</p>
						</div>

						<div className="checkbox">
							<input type="checkbox" onChange={handleCheckboxChange} className="mb-3" />
							
							<p className="paragraph">
								I have read and understood the instructions. All computer
								hardware allotted to me are in proper working condition. I
								declare that I am not in possession of / not wearing / not
								carrying any prohibited gadget like mobile phone, bluetooth
								devices etc. /any prohibited material with me into the
								Examination Hall. I agree that in case of not adhering to the
								instructions, I shall be liable to be debarred from this Test
								and/or to disciplinary action, which may include ban from future
								Tests / Examinations
							</p>
						</div>
						<div className="button-1">
							<button
								type="button"
								className={`button-2   ${
									isInputClicked ? "active" : ""
								}`}
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
								onClick={handleButtonHover}
							>
								Continue
							</button>
						</div>
					</div>
				</div>
			</div>
			<UserFooter />
		</>
	);
}

export default Assessmentdetailsinstructions;
