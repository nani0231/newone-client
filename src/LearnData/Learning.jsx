import React from "react";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
// import logo from "../src/All Images/pab bottom-logo (1).jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import sideimage from "../All Images/Logo133.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import siva from "../All Images/Siva Image.jpeg";
import Sidebar from "../Sidebar";
import Cookies from "js-cookie";
import apiList from "../liberary/apiList";
import AWS from "aws-sdk";

import awsConfig from "../keys123/AWS";

AWS.config.update({
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey:awsConfig.secreteAccessKey,
  region:awsConfig.region,
});

const Learning = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token == undefined) {
      navigate("/");
    }
    setCurrentTime(new Date().toLocaleString());
  }, []);

  //Add Institute

  const [learningPathTitle, setlearningPathTitle] = useState("");
  const [relevantSkillTags, setrelevantSkillTags] = useState("");
  const [coverLetter, setcoverLetter] = useState("");
  const [difficultyLevel, setdifficultyLevel] = useState("");
  const [subscription, setsubscription] = useState("");
  const [price, setprice] = useState("");
  const [discount, setdiscount] = useState("");
  const [AboutLearnPath, setAboutLearnPath] = useState("");
  const [authorName, setauthorName] = useState("");
  const [hours, sethours] = useState("");
  const [minutes, setminutes] = useState("");
  const [fileName, setfileName] = useState(['']);
  const [requirements, setrequirements] = useState(['']);
  const [CurrentTime, setCurrentTime] = useState("");
  const [learningimg, setlearningimg] = useState(null);
  const [uploadedImageName, setUploadedImageName] = useState("");
  const [itisLoading, setItisLoading] = useState(true);
  const [data1, setdata1] = useState([]);
  if (!CurrentTime) {
    setCurrentTime(new Date().toLocaleString());
  }
  console.log(CurrentTime);
  const AddPathDetails1 = {
    learningPathTitle: learningPathTitle,
    relevantSkillTags: relevantSkillTags,
    coverLetter: coverLetter,
    difficultyLevel: difficultyLevel,
    subscription: subscription,
    price: price,
    discount: discount,
    AboutLearnPath: AboutLearnPath,
    authorName: authorName,
    hours: hours,
    minutes: minutes,
    learningimg: learningimg,
    fileName: fileName,
    requirements: requirements,
    CurrentTime: CurrentTime,
  };
  console.log(AddPathDetails1);
  const s3 = new AWS.S3();

  useEffect(() => {
    const uploadImageToS3 = async () => {
      if (learningimg && learningimg.name) {
        const currentTimestamp = new Date().getTime();
        const fileExtension = learningimg.name.split(".").pop();

        
        const params = {
          Bucket: awsConfig.bucket,
          Key: `learningpathimages/${currentTimestamp}.${fileExtension}`,
          Body: learningimg,
          ContentType: learningimg.type,
        };

        try {
          console.log("Start uploading to S3:", params);

          const uploadResult = await s3.upload(params).promise();
          console.log("Uploaded to S3:", uploadResult);

          const imageUrl = `https://saiproject123.s3.ap-south-1.amazonaws.com/learningpathimages/${currentTimestamp}.${fileExtension}`;

          setUploadedImageName(imageUrl);
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
  }, [learningimg]);
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (
      learningPathTitle &&
      relevantSkillTags &&
      coverLetter &&
      difficultyLevel &&
      subscription &&
      AboutLearnPath &&
      authorName &&
      hours &&
      minutes &&
      learningimg &&
      fileName &&
      CurrentTime &&
      requirements !== ""
    ) {
      const headers = {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk", // Replace with your actual token
      };

      const AddPathDetails = {
        learningPathTitle: learningPathTitle,
        relevantSkillTags: relevantSkillTags,
        coverLetter: coverLetter,
        difficultyLevel: difficultyLevel,
        subscription: subscription,
        price: price,
        discount: discount,
        AboutLearnPath: AboutLearnPath,
        authorName: authorName,
        hours: hours,
        minutes: minutes,
        fileName: fileName,
        requirements: requirements,
        CurrentTime: CurrentTime,
        learningimg: uploadedImageName,
      };
      console.log(AddPathDetails)

      axios
        .post(`${apiList.addlearningpath}`, AddPathDetails, {
          headers,
        })
        .then((response) => {
          setdata1(response.data);

          console.log(response.data);
          if (response.status === 200) {
            const currentTime = new Date().toLocaleTimeString();
            const savedTimes =
              JSON.parse(localStorage.getItem("savedTimes")) || [];

            savedTimes.push(currentTime);
            localStorage.setItem("savedTimes", JSON.stringify(savedTimes));
            toast("Path Created Successfully", {
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
              navigate("/Learn");
            }, 3000);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            toast("Path Already Registered", {
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
          } else {
            console.log(error.message);
          }
        });
    } else {
      toast("Enter the Required Details", {
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
    }
  };

  console.log(data1);

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    menuBtnChange();
  };

  const menuBtnChange = () => {
    const sidebar = document.querySelector(".sidebar");

    if (sidebar) {
      const closeBtn = document.querySelector("#btn");
      const searchBtn = document.querySelector(".bx-search");

      if (sidebar.classList.contains("open")) {
        closeBtn?.classList.replace("bx-menu", "bx-menu-alt-right");
      } else {
        closeBtn?.classList.replace("bx-menu-alt-right", "bx-menu");
      }
    } else {
      console.error("Sidebar element not found");
    }
  };
  const addInput = () => {
    setfileName((prev) => [...prev, '']);
  };
  const addInputrequirement = () => {
    setrequirements((prev)=>[...prev,''])

  };
 



  // Function to remove an input field based on key
  const removeInput = (index) => {
    const updatedFileNames = [...fileName];
    updatedFileNames.splice(index, 1);
    setfileName(updatedFileNames);
  };
  const removeInputRequirement = (index) => {
    const updatedRequirementNames = [...requirements];
    updatedRequirementNames.splice(index, 1);
    setrequirements(updatedRequirementNames);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      console.log("Selected File:", file);
      setlearningimg(file);
      
    } else {
      console.error("No file selected");
    }
  };

  useEffect(() => {
		const timer = setTimeout(() => {
			setItisLoading(false);
		}, 1000); // Simulating a 2-second loading delay
		return () => clearTimeout(timer);
	}, []);
  // Corporate Office
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className=" ">
            <div className="row">
              {isOpen && (
                <div className=" col-12 col-lg-3 col-md-12 sectioncard121">
                  <Sidebar />
                </div>
              )}
              <div
                className={`my-3 col-12 col-md-${isOpen ? 12 : 9} col-lg-${
                  isOpen ? 9 : 12
                }`}
              >
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
                <div className="">
                  <i
                    className="fa-solid fa-bars bars d-lg-block d-none"
                    onClick={toggleSidebar}
                  ></i>
                  <div class="">
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
                    <div>
                      <div className="text-center">
                        <h4 style={{color:"#16c3ea"}}>Add Learning Path</h4>
                        </div>
                      <div className="mt-3">
                        <div>
                          <p className="learningpage m-0 pb-1">Learning Path <sup className="star">*</sup></p>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Learning Path"
                            style={{ border: "1px solid #dee2e6" }}
                            onChange={(e) =>
                              setlearningPathTitle(e.target.value)
                            }
                            value={learningPathTitle}
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <div>
                          <p className="learningpage m-0 pb-1">Tags <sup className="star">*</sup></p>
                          <select
                            className="p-1 form-control"
                            onChange={(e) =>
                              setrelevantSkillTags(e.target.value)
                            }
                          >
                            <option value="">Select Relavent Tags</option>
                            <option value="AWS">AWS</option>
                            <option value="Database">Database</option>
                            <option value="DataScience">DataScience</option>
                            <option value="DevOps">DevOps</option>
                            <option value="Mobile App Developement">
                              Mobile App Developement
                            </option>
                            <option value="Programming">Programming</option>
                            <option value="Scripting">Scripting</option>
                            <option value="Software Testing">
                              Software Testing
                            </option>
                            <option value="Test Preparation">
                              Test Preparation
                            </option>
                            <option value="Web Development">
                              Web Development
                            </option>
                            <option value="Web Services">Web Services</option>
                            <option value="Verbal and Communication">
                              Verbal and Communication
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div>
                          <p className="learningpage m-0 pb-1">Cover Letter <sup className="star">*</sup></p>
                          {/* <input type="text" className="form-control"/> */}
                          <textarea
                            className="form-control"
                            rows={4}
                            onChange={(e) => setcoverLetter(e.target.value)}
                            value={coverLetter}
                          ></textarea>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div>
                          <p className="learningpage m-0 pb-1">Difficulty <sup className="star">*</sup></p>
                          <select
                            className="p-1 form-control"
                            onChange={(e) => setdifficultyLevel(e.target.value)}
                            value={difficultyLevel}
                          >
                            <option value="">Select Difficulty</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div>
                          <p className="learningpage m-0 pb-1">Subcription <sup className="star">*</sup></p>

                          <select
                            className="p-1 form-control"
                            onChange={(e) => setsubscription(e.target.value)}
                            value={subscription}
                          >
                            <option value="">Select Subscription</option>
                            <option value="Free">Free</option>
                            <option value="Paid">Paid</option>
                          </select>
                        </div>
                      </div>

                      {subscription === "Paid" && (
                        <div>
                          <div className="mt-3">
                            <div>
                              <p className="m-0 pb-1" style={{fontWeight:"700"}}>Price <sup className="star">*</sup></p>
                              <input
                                type="number"
                                className="form-control"
                                onChange={(e) => setprice(e.target.value)}
                                value={price}
                              />
                            </div>
                          </div>
                          <div className="mt-3">
                            <div>
                              <p className="m-0 pb-1" style={{fontWeight:"700"}}>Discount <sup className="star">*</sup></p>
                              <input
                                type="number"
                                className="form-control"
                                onChange={(e) => setdiscount(e.target.value)}
                                value={discount}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      <div className=" mt-3">
                        <div>
                          <p className="learningpage m-0 pb-1">About This Learning Path <sup className="star">*</sup></p>
                          <textarea
                            className="form-control"
                            rows={6}
                            onChange={(e) => setAboutLearnPath(e.target.value)}
                            value={AboutLearnPath}
                          ></textarea>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div>
                          <p className="learningpage m-0 pb-1">Author <sup className="star">*</sup></p>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="author"
                            style={{ border: "1px solid #dee2e6" }}
                            onChange={(e) => setauthorName(e.target.value)}
                            value={authorName}
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="row">
                          <div className="col-lg-3">
                            <div>
                              <p className="learningpage pb-1 m-0">Hours <sup className="star">*</sup></p>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="author"
                                onChange={(e) => sethours(e.target.value)}
                                value={hours}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div>
                              <p className="learningpage m-0 pb-1">Minutes <sup className="star">*</sup></p>
                              <input
                                type="number"
                                className="form-control"
                                onChange={(e) => setminutes(e.target.value)}
                                value={minutes}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div>
                              <p className="learningpage m-0 pb-1">Learning Page <sup className="star">*</sup></p>
                              <input
                                id="imageInput"
                                accept="image/*"
                                type="file"
                                className="form-control"
                                 
                                onChange={handleImageChange}
                                // onChange={(e) => setlearningimg(e.target.value)}
                                // value={learningimg}
                              />
                            </div>
                          </div>
                          <div className="text-center mt-4">
                            {learningimg ? (
                              <div className="text-center  mt-3">
                                
                                <img
                                  src={
                                    typeof learningimg === "string"
                                      ? learningimg
                                      : URL.createObjectURL(learningimg)
                                  }
                                  className="imageDisplay"
                                  alt="Selected Image"
                                  style={{
                                     
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: "80px",
                                  }}
                                />
                              </div>
                            ) : (
                              <div>
                                <p></p>
                              </div>
                            )}
                             
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="batch_flex mb-4">
                          <p className="learningpage m-0 pb-1">What You'll Learn <sup className="star">*</sup></p>
                          <div>
                            <button className="year" onClick={addInput}> + Add</button>
                          </div>
                        </div>
                        {fileName.map((value, index) => (
                          <div key={index} className="mb-2">
                            <input
                              type="text"
                              className="form-control"
                              style={{ border: "1px solid #dee2e6" }}
                              onChange={(e) => {
                                const updatedFileNames = [...fileName];
                                updatedFileNames[index] = e.target.value;
                                setfileName(updatedFileNames);
                              }}
                              value={value}
                            />
                            {index > 0 && <button className="year mt-1" onClick={() => removeInput(index)}>Remove</button>}
                          </div>
                        ))}
                      </div>
                      <div className="mt-3">
                        <div className="batch_flex mb-4">
                          <p className="learningpage m-0 pb-1">Requirement <sup className="star">*</sup></p>
                          <div>
                            <button className="year" onClick={addInputrequirement}> + Add</button>
                          </div>
                        </div>
                        {requirements.map((value, index) => (
                          <div key={index} className="mb-2">
                            <input
                              type="text"
                              className="form-control"
                              style={{ border: "1px solid #dee2e6" }}
                              onChange={(e) => {
                                const updatedRequirementNames = [...requirements];
                                updatedRequirementNames[index] = e.target.value;
                                setrequirements(updatedRequirementNames);
                              }}
                              value={value}
                            />
                            {index > 0 && <button className="year mt-1" onClick={() => removeInputRequirement(index)}>Remove</button>}
                          </div>
                        ))}
                      </div>
                      <div>
                        <button
                          className="create_btn mr-3"
                          style={{backgroundColor:"#16c3ea", color:"#000"}}
                          onClick={onSubmitForm}
                        >
                          Create
                        </button>
                        <Link to="/Learn">
                          <button className="create_btn1">Back</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
            )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;