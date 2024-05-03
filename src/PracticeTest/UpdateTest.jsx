import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../Sidebar";
import { Editor } from "@tinymce/tinymce-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import JoditEditor from "jodit-react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { BiPlus } from "react-icons/bi";
import "./Practice.css";
import apiList from "../liberary/apiList";

const UpdateTest = () => {
	const editor = useRef(null);
	const [isOpen, setIsOpen] = useState(true);
	const [updateTest, setUpdateTest] = useState({
		testName: "",
	});

	const { categoryId, topicId, testId } = useParams();
	const [worksheetLoading, setWorksheetLoading] = useState(true);


	const fetchSingleTest = async () => {
		const res = await axios.get(
			`${apiList.getPracticeMCQById}/${categoryId}/${topicId}/${testId}`
		);
		console.log(res.data.mcq);
		setUpdateTest({
			testName: res.data.mcq.testName,
		});
		setWorksheetLoading(false)
	};
	let navigate = useNavigate();

	useEffect(() => {
		fetchSingleTest();
	}, []);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUpdateTest({
			...updateTest,
			[name]: value,
		});
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		// console.log(updateTest);
		const res = await axios.put(
			`${apiList.practiceTestdata}/${categoryId}/${topicId}/${testId}`,
			updateTest
		);
		if (res.status === 200) {
			toast.success("Test Updated", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				className: "custom-toast-custom",
			});
			window.location = "/testTable";
		}
	};

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
	return (
		<div>
			<div className="container-fluid ">
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
						
						{/* <div
              colSpan="4"
              className="d-flex flex-row justify-content-center align-items-center"
              style={{ height: "100vh" }}
            >
              <Audio type="Audio" color="#6a2a69" height={40} width={60} />
            </div> */}

						<div className="">
							<i
								className="fa-solid fa-bars bars  d-lg-block d-none"
								onClick={toggleSidebar}
							></i>
							{worksheetLoading ? (
							<div
								colSpan="4"
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
							<div className=" form">
								<h3 className="text-center" style={{color:"#16c3ea"}}>Edit Practice Test</h3>
								<div className="updateContainer">
									<form onSubmit={handleSubmit} >
										<div className="formUpdate">
											<label style={{fontWeight:"600"}}>
												Test Name <sup className="star">*</sup>
											</label>
											<input
												type="text"
												placeholder="Enter test name"
												value={updateTest.testName}
												onChange={handleChange}
												name="testName"
												className="form-control w-100"
											/>
											<div className="text-center">
											<button className=" mt-3" style={{backgroundColor:"#16c3ea", color:"#000", padding:"7px", borderRadius:"4px", border:"none"}} onClick={handleSubmit}>
												Update Test
											</button>
											</div>
											
										</div>
									</form>
									<ToastContainer />
								</div>
							</div>
						)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateTest;
