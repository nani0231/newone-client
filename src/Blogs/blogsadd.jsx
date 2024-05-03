import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar";
import { Link, useNavigate } from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import apiList from "../liberary/apiList";
import AWS from "aws-sdk";

import awsConfig from "../keys123/AWS";

AWS.config.update({
	accessKeyId: awsConfig.accessKeyId,
	secretAccessKey: awsConfig.secreteAccessKey,
	region: awsConfig.region,
});
const Blogsadd = () => {
	let navigate = useNavigate();
	const [editorData, setEditorData] = useState("");
	const [isOpen, setIsOpen] = useState(true);
	const [worksheetLoading, setWorksheetLoading] = useState(true);

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
	const [Title, setTitle] = useState("");
	const [Tags, setTags] = useState("");
	const [Author, setAuthor] = useState("");
	const [Description, setDescription] = useState("");
	const [Image, setImage] = useState("");

	const [imageFile, setImageFile] = useState(null);
	const useData2 = {
		Title: Title,
		Tags: Tags,
		Author: Author,
		Description: Description,
		Image: Image,
	};
	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageFile(file);
				setImage(reader.result); // Set the image path or data URL
			};
			reader.readAsDataURL(file);
		}
	};

	const onSubmitForm3 = (e) => {
		e.preventDefault();

		if ((Title, Tags, Author, Description, Image !== "")) {
			axios
				.post(`${apiList.Blogs}`, useData2)
				.then((response) => {
					if (response.status === 200) {
						toast("Blogs Added Successfully", {
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
					console.log(error.message);
					toast.error(" Failed");
				});
		} else {
			toast("Enter the Required Details", {
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
	useEffect(() => {
		// Simulate loading delay
		const timer = setTimeout(() => {
			setWorksheetLoading(false); // Set loading to false after delay
		}, 1000); // Change delay as needed

		return () => clearTimeout(timer);
	}, []);
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
						<div className="">
							<i
								className="fa-solid fa-bars bars d-lg-block d-none"
								onClick={toggleSidebar}
							></i>
							<div className="">
								<form onSubmit={onSubmitForm3}>
									<h3 className="text-center" style={{ color: "#16c3ea" }}>
										{" "}
										Create Blogs
									</h3>
									<div className="row">
										<div class="col-md-12">
											<p
												className="leableheading mt-3"
												style={{ fontWeight: "600" }}
											>
												Title<sup className="star">*</sup>
											</p>
											<input
												className="p-2 form-control"
												placeholder="Enter Title"
												onChange={(e) => setTitle(e.target.value)}
												value={Title}
											/>
										</div>
										<div className="col-md-6 mt-2">
											<p
												className="leableheading"
												style={{ fontWeight: "600" }}
											>
												Tags<sup className="star">*</sup>
											</p>
											<select
												class="form-select "
												name="Tags"
												onChange={(e) => setTags(e.target.value)}
											>
												<option selected></option>
												<option value="Python">Python</option>
												<option value="Javascript">Javascript</option>
												<option value="React.js">React.js</option>
												<option value="MongoDB">MongoDB</option>
												<option value="Ruby">Ruby</option>
												<option value=" C and C++"> C and C++</option>
												<option value="TypeScript">TypeScript</option>
												<option value=" SQL"> SQL</option>
											</select>
										</div>
										<div className="col-md-6 mt-2">
											<p
												className="leableheading"
												style={{ fontWeight: "600" }}
											>
												Created By Author<sup className="star">*</sup>
											</p>
											<input
												placeholder="Enter Author"
												className="p-2 form-control"
												value={Author}
												onChange={(e) => setAuthor(e.target.value)}
											/>
										</div>
										<div className="col-md-12 mt-2">
											<p
												className="leableheading"
												style={{ fontWeight: "600" }}
											>
												Description<sup className="star">*</sup>
											</p>
											<div>
												<CKEditor
													editor={ClassicEditor}
													data={editorData}
													onReady={(editor) => {
														console.log("Editor is ready to use!", editor);
													}}
													onChange={(event, editor) => {
														const data = editor.getData();
														// Remove <p> tags from the data
														const cleanData = data
															.replace(/<p>/g, "")
															.replace(/<\/p>/g, "");
														console.log({ event, editor, cleanData });
														setDescription(cleanData);
													}}
													onBlur={(event, editor) => {
														console.log("Blur.", editor);
													}}
													onFocus={(event, editor) => {
														console.log("Focus.", editor);
													}}
													value={Description}
												/>
												<label htmlFor="myfile">
													<p className="leableheading mt-3">
														Insert Image <sup className="star">*</sup>
													</p>
												</label>
												<input
													type="file"
													id="myfile"
													name="myfile"
													className="form-control"
													accept="image/*" // Specify that only image files are allowed
													onChange={(e) => handleImageChange(e)}
												/>
											</div>
										</div>
									</div>
									<div className="d-flex flex-row  justify-content-center">
										<Link to="/Blogs1">
											<button
												className="creat12 mt-3 mx-2"
												style={{ backgroundColor: "#010101" }}
											>
												Back
											</button>
										</Link>
										<button
											className="creat12 mt-3"
											style={{ backgroundColor: "#16c3ea", color: "#000" }}
										>
											Create
										</button>
									</div>
								</form>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default Blogsadd;
