import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useRef } from "react";
import Sidebar from "../Sidebar";
import { Link, useNavigate } from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import apiList from "../liberary/apiList";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const BlogsEdit = () => {
	let navigate = useNavigate();
	const { id } = useParams();
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
	const [individualInstitute, setIndividualInstitute] = useState({
		Title: "",
		Tags: "",
		Author: "",
		Description: "",
		Image: "",
	});
	const [selectedFile, setSelectedFile] = useState(null);

	const onFileChange = (e) => {
		const file = e.target.files[0];
		setSelectedFile(file);
	};
	const [error, setError] = useState(null);
	const onChangeLearnPathName = (e) => {
		const newValue = e.target.value;
		setIndividualInstitute((prevData) => ({
			...prevData,
			Title: newValue,
		}));
	};
	const onSubmitForm = (e) => {
		e.preventDefault();

		const UserData = {
			Title: individualInstitute.Title,
			Tags: individualInstitute.Tags,
			Author: individualInstitute.Author,
			Description: individualInstitute.Description,
			Image: individualInstitute.Image,
		};

		axios
			.put(`${apiList.updateBlogs}/${id}`, UserData)
			.then((response) => {
				console.log(response.data);
				if (response.status === 200) {
					toast("Update Successful", {
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
						navigate("/Blogs1");
					}, 3000);
				}
			})
			.catch((error) => {
				console.error(error);
				setError("An error occurred while updating the Learn Path.");
				console.log(error.message);
			});
	};
	useEffect(() => {
		const fetchData = async () => {
			console.log(id);
			try {
				const response = await axios.get(
					//   ${apiList.getTopic}/${id}
					`${apiList.IndiVIDUALBlogs}/${id}`
				); // Replace with your API endpoint
				setIndividualInstitute(response.data);
				setWorksheetLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [id]);
	console.log(individualInstitute);
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
								<form onSubmit={onSubmitForm}>
									<h3 className="text-center" style={{ color: "#16c3ea" }}>
										{" "}
										Updata Blogs
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
												value={individualInstitute.Title}
												onChange={(e) =>
													setIndividualInstitute({
														...individualInstitute,
														Title: e.target.value,
													})
												}
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
												value={individualInstitute.Tags}
												onChange={(e) =>
													setIndividualInstitute({
														...individualInstitute,
														Tags: e.target.value,
													})
												}
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
												value={individualInstitute.Author}
												onChange={(e) =>
													setIndividualInstitute({
														...individualInstitute,
														Author: e.target.value,
													})
												}
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
														// setDescription(cleanData)
													}}
													onBlur={(event, editor) => {
														console.log("Blur.", editor);
													}}
													onFocus={(event, editor) => {
														console.log("Focus.", editor);
													}}
													// value={Description}
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
													accept="image/*"
													onChange={onFileChange}
												/>
											</div>
										</div>
									</div>
									<div className="d-flex flex-row  justify-content-center">
										<Link to="/Blogs1">
											<button
												className="creat12 mt-3 mx-2"
												style={{ backgroundColor: "#000", color: "#fff" }}
											>
												Back
											</button>
										</Link>
										<button
											className="creat12 mt-3"
											style={{ backgroundColor: "#16c3ea", color: "#000" }}
										>
											Update
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
export default BlogsEdit;
