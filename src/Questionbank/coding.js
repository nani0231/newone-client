import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Basic from "./BasicCoding";
import Sidebar from "../Sidebar";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const steps = ["BASIC", "SAMPLECODE", "TEST CASESS"];
const Coding = () => {
	const navigate = useNavigate();
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());
	const [isOpen, setIsOpen] = useState(true);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
		menuBtnChange();
	};
	const isStepOptional = (step) => {
		return step === 1;
	};

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

	const handleReset = () => {
		setActiveStep(0);
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
	return (
		<div className="container-fluid">
			<div className="row">
				{isOpen && (
					<div className=" col-12 col-lg-3 col-md-12 sectioncard121">
						<Sidebar />
						<ToastContainer />
					</div>
				)}
				<div
					className={`my-3  col-12 col-md-${isOpen ? 12 : 9} col-lg-${
						isOpen ? 9 : 12
					}`}
				>
					<div className="">
						<i
							className="fa-solid fa-bars bars d-lg-block d-none"
							onClick={toggleSidebar}
						></i>
						<div className="">
							<div className="row my-3">
								<div className="col-md-12 text-center">
									<h3 className="my-3" style={{color:"#16c3ea"}}>Create Coding Questions</h3>
								</div>
							</div>

							<Container>
								<Box

								// style={{border:"1px solid red" , padding:"15px"}}
								>
									<Stepper activeStep={activeStep}>
										{steps.map((label, index) => {
											const stepProps = {};
											const labelProps = {};
											if (isStepOptional(index)) {
												labelProps.optional = (
													<Typography variant="caption">Optional</Typography>
												);
											}
											if (isStepSkipped(index)) {
												stepProps.completed = false;
											}
											return (
												<Step key={label} {...stepProps}>
													<StepLabel {...labelProps}>{label}</StepLabel>
												</Step>
											);
										})}
									</Stepper>
									{activeStep === steps.length ? (
										<React.Fragment>
											<Typography sx={{ mt: 2, mb: 1 }}>
												All steps completed - you&apos;re finished
											</Typography>
											<Box
												sx={{ display: "flex", flexDirection: "row", pt: 2 }}
											>
												<Box sx={{ flex: "1 1 auto" }} />
												<Button onClick={() => navigate("/Codingview")}>
													View
												</Button>
											</Box>
										</React.Fragment>
									) : (
										<React.Fragment>
											{activeStep === 0 && <Basic />}
											<Box
												sx={{ display: "flex", flexDirection: "row", pt: 2 }}
											>
												<Button
													color="inherit"
													disabled={activeStep === 0}
													onClick={handleBack}
													sx={{ mr: 1 }}
												>
													Back
												</Button>
												<Box sx={{ flex: "1 1 auto" }} />
												{isStepOptional(activeStep) && (
													<Button
														color="inherit"
														onClick={handleSkip}
														sx={{ mr: 1 }}
													>
														Skip
													</Button>
												)}

												<Button onClick={handleNext}>
													{activeStep === steps.length - 1 ? "Finish" : "Next"}
												</Button>
											</Box>
										</React.Fragment>
									)}
								</Box>
							</Container>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Coding;
