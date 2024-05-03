import React, { useState } from "react";
import "./Basic.css";
import { useNavigate } from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import apiList from "../liberary/apiList";
import AWS from "aws-sdk";

import awsConfig from "../keys123/AWS";

AWS.config.update({
	accessKeyId: awsConfig.accessKeyId,
	secretAccessKey: awsConfig.secreteAccessKey,
	region: awsConfig.region,
});

const Basic = () => {
	let navigate = useNavigate();
	const [editorData, setEditorData] = useState("");
	const [Subjects, setSubjects] = useState("");
	const [Chapters, setChapters] = useState("");
	const [Title, setTitle] = useState("");
	const [Programminglanguage, setProgramminglanguage] = useState("");
	const [Description, setDescription] = useState("");
	const [Constraints, setConstraints] = useState("");
	const [descriptionImage, setDescriptionImage] = useState("");
	const [constraintsImage, setConstraintsImage] = useState("");
	const [uploadedImageNamedescription, setUploadedImageNameDescription] =
		useState("");
	const [uploadedImageNameconstraints, setUploadedImageNameConstraints] =
		useState("");
	const [itisLoading, setItisLoading] = useState(true);

	const useData2 = {
		Subjects: Subjects,
		Chapters: Chapters,
		Title: Title,
		Programminglanguage: Programminglanguage,
		Description: Description,
		Constraints: Constraints,
		descriptionImage: uploadedImageNamedescription,
		constraintsImage: uploadedImageNameconstraints,
	};
	console.log(useData2);

	const [selectedSubjectId, setSelectedSubjectId] = useState("");
	const [filteredSubjectsData, setFilteredsubjectsData] = useState([]);

	const handleSubjectTagTypeSelection = (event) => {
		setSelectedSubjectId(event.target.value);
		setSubjects(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
		const selectedId = event.target.value;
		const result = allsubjectsData?.find((item) => item?._id === selectedId);

		console.log("Filtered Data 1:", result?.chapter);
		setTimeout(() => {
			setFilteredsubjectsData(result?.chapter || []);
		}, 10);
		setSelectedChapterId("");
	};

	console.log(selectedSubjectId);

	const [selectedChapterId, setSelectedChapterId] = useState("");

	const handleChapterTagTypeSelection = (event) => {
		setSelectedChapterId(event.target.value);
		setChapters(
			event.target.options[event.target.selectedIndex].getAttribute(
				"data-value"
			)
		);
	};

	console.log(selectedChapterId);
	const [allsubjectsData, setAllsubjectsData] = useState([]);
	const fetchsubjectsData = async () => {
		const api = `${apiList.getbasic}`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setAllsubjectsData(response.data);
			setItisLoading(false);
		} catch (error) {
			console.error("Error fetch blogs:", error);
		}
	};
	useEffect(() => {
		fetchsubjectsData();
	}, []);

	const s3 = new AWS.S3();

	useEffect(() => {
		const uploadImageToS3 = async () => {
			if (descriptionImage && descriptionImage.name) {
				const currentTimestamp = new Date().getTime();
				const fileExtension = descriptionImage.name.split(".").pop();

				const params = {
					Bucket: awsConfig.bucket,
					Key: `learningpathimages/${currentTimestamp}.${fileExtension}`,
					Body: descriptionImage,
					ContentType: descriptionImage.type,
				};

				try {
					console.log("Start uploading to S3:", params);

					const uploadResult = await s3.upload(params).promise();
					console.log("Uploaded to S3:", uploadResult);

					const imageUrl = `https://skillhub1.s3.ap-south-1.amazonaws.com/learningpathimages/${currentTimestamp}.${fileExtension}`;

					setUploadedImageNameDescription(imageUrl);
					console.log(imageUrl);
					console.log("Image uploaded successfully:", imageUrl);
				} catch (error) {
					console.error("Error uploading image to S3:", error);
				} finally {
					const imageInput = document.getElementById("imageInput");
					if (imageInput) {
						imageInput.value = "";
					}
				}
			}
		};

		uploadImageToS3();
	}, [descriptionImage]);

	const s4 = new AWS.S3();

	useEffect(() => {
		const uploadImageToS4 = async () => {
			if (constraintsImage && constraintsImage.name) {
				const currentTimestamp = new Date().getTime();
				const fileExtension = constraintsImage.name.split(".").pop();

				const params = {
					Bucket: awsConfig.bucket,
					Key: `learningpathimages/${currentTimestamp}.${fileExtension}`,
					Body: constraintsImage,
					ContentType: constraintsImage.type,
				};

				try {
					console.log("Start uploading to S4:", params);

					const uploadResult = await s4.upload(params).promise();
					console.log("Uploaded to S3:", uploadResult);

					const imageUrl = `https://skillhub1.s4.ap-south-1.amazonaws.com/learningpathimages/${currentTimestamp}.${fileExtension}`;

					setUploadedImageNameConstraints(imageUrl);
					console.log(imageUrl);
					console.log("Image uploaded successfully:", imageUrl);
				} catch (error) {
					console.error("Error uploading image to S3:", error);
				} finally {
					const imageInput = document.getElementById("imageInput");
					if (imageInput) {
						imageInput.value = "";
					}
				}
			}
		};

		uploadImageToS4();
	}, [constraintsImage]);

	console.log(selectedSubjectId);
	console.log(selectedChapterId);
	const onSubmitForm3 = (e) => {
		e.preventDefault();

		if (
			(Subjects,
			Chapters,
			Title,
			Programminglanguage,
			Description,
			descriptionImage,
			constraintsImage,
			Constraints !== "")
		) {
			axios
				.post(
					`${apiList.addbasic}/${selectedSubjectId}/${selectedChapterId}`,
					useData2
				)
				.then((response) => {
					console.log(useData2);
					if (response.status === 200) {
						toast("Coding Added Successfully", {
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
							navigate("/Codingview");
						}, 3000);
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

	const descriptionImage12 = (event) => {
		const file = event.target.files[0];

		if (file) {
			console.log("Selected File:", file);
			setDescriptionImage(file);
		} else {
			console.error("No file selected");
		}
	};
	const ConstraintsImage12 = (event) => {
		const file = event.target.files[0];

		if (file) {
			console.log("Selected File:", file);
			setConstraintsImage(file);
		} else {
			console.error("No file selected");
		}
	};
	return (
		<>
			<ToastContainer />

			{itisLoading ? (
				<>
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
				</>
			) : (
				<form className="basic" onSubmit={onSubmitForm3}>
					<div className="row">
						<div className="col-md-6">
							<div className="my-2">
								<h6 className="">
									Subjects <span className="star">*</span>
								</h6>

								<select
									style={{ padding: "5px" }}
									className="form-control"
									value={selectedSubjectId}
									onChange={handleSubjectTagTypeSelection}
								>
									<option className="hidden" value="">
										Select Subject
									</option>
									{allsubjectsData?.map((subject) => (
										<option
											className="name_item"
											key={subject._id}
											data-value={subject.name}
											value={subject._id}
										>
											{subject.name}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="col-md-6">
							<div className="my-2">
								<h6 className="">
									Chapter <span className="star">*</span>
								</h6>

								<select
									type="text"
									placeholder="...Select Chapter"
									className="form-control"
									onChange={handleChapterTagTypeSelection}
									value={selectedChapterId}
								>
									<option>Select Chapter</option>
									{filteredSubjectsData.map((chapter) => (
										<option
											className="name_item"
											key={chapter._id} // Use a unique key for each option
											data-value={chapter.Name}
											value={chapter._id}
										>
											{chapter.Name}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="col-md-6">
							<div className="my-2">
								<h6 className="">
									Title <span className="star">*</span>
								</h6>
								<select
									class="form-select"
									onChange={(e) => setTitle(e.target.value)}
									value={Title}
								>
									<option selected>Select Title</option>
									<option value="Python">Python</option>
									<option value="Javascript">Javascript</option>
									<option value="React.js">React.js</option>
								</select>
							</div>
						</div>
						<div className="col-md-6">
							<div className="my-2">
								<h6 className="">
									Programming language <span className="star">*</span>
								</h6>
								<select
									class="form-select"
									onChange={(e) => setProgramminglanguage(e.target.value)}
									value={Programminglanguage}
								>
									<option selected>Select programming language</option>
									<option value="Python">Python</option>
									<option value="Javascript">Javascript</option>
									<option value="React.js">React.js</option>
								</select>
							</div>
						</div>
					</div>

					<div className="description">
						<h6 className="my-3">
							Description <span className="star">*</span>
						</h6>
						{/* <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onReady={(editor) => {
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              setDescription(data);
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
            value={Description}
          /> */}
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
							<h6 className="my-3">Description Image</h6>
						</label>
						<input
							type="file"
							id="imageInput"
							accept="image/*"
							className="form-control"
							onChange={descriptionImage12}
						/>
					</div>
					<div className="my-3">
						<h6 className="mb-3">
							Constraints <span className="star">*</span>
						</h6>
						{/* <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onReady={(editor) => {
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              setConstraints(data);
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
            value={Constraints}
          /> */}
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
								setConstraints(cleanData);
							}}
							onBlur={(event, editor) => {
								console.log("Blur.", editor);
							}}
							onFocus={(event, editor) => {
								console.log("Focus.", editor);
							}}
							value={Constraints}
						/>

						<label htmlFor="myfile">
							<h6 className="my-3">Constraints Image</h6>
						</label>
						<input
							type="file"
							id="imageInput"
							accept="image/*"
							className="form-control"
							onChange={ConstraintsImage12}
						/>
						<br />
						<Link to="/Codingview">
							<button
								className="btn_submit mx-2"
								style={{ backgroundColor: "#000", color: "#fff" }}
							>
								Back
							</button>
						</Link>
						<button className="btn_submit">Submit</button>
					</div>
				</form>
			)}
		</>
	);
};

export default Basic;
