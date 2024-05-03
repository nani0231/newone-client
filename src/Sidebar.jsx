import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import sideimage from "./All Images/SkillHubLogoSidebar.gif";
import { Link } from "react-router-dom";
import siva from "../src/All Images/Siva Image.jpeg";
import Cookies from "js-cookie";
import apiList from "./liberary/apiList";

function Sidebar() {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const [isNavVisible, setIsNavVisible] = useState(false);
  const [addblogslist, setAddblogslist] = useState([]);

  const [showInstitutionsOptions, setShowInstitutionsOptions] = useState(false);
  const [showUsersOptions, setShowUsersOptions] = useState([]);

  useEffect(() => {
    fetchblogs();
    fetchblogs1();
    fetchInstituteUser()
    if (token == undefined) {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  const fetchblogs1 = async () => {
    const api = `${apiList.allUsersData}`;
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk";
    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setShowUsersOptions(response?.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const fetchblogs = async () => {
    const api = `${apiList.allAddInstitutes}`;
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk";
    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setAddblogslist(response?.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  const fetchInstituteUser = async () => {
    const userEmail = localStorage.getItem("UserEmail")
		const api = `${apiList.ParticularInstitute}/${userEmail}`;
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk";
    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setAddblogslist(response?.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const [isNavOpen, setIsNavOpen] = useState(false);

  const openNav = () => {
    setIsNavOpen(true);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    menuBtnChange();
  };

  const [isNavLinksVisible, setIsNavLinksVisible] = useState(false);

  const toggleNavLinks = () => {
    setIsNavLinksVisible(!isNavLinksVisible);
  };

  const menuBtnChange = () => {
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");
    const searchBtn = document.querySelector(".bx-search");

    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  };
  const [isInstitutionsOpen, setIsInstitutionsOpen] = useState(false);

  const toggleInstitutions = () => {
    setIsInstitutionsOpen(!isInstitutionsOpen);
  };
  const [isQuestionbankOpen, setIsQuestionbankOpen] = useState(false);

  const toggleQuestionBank = () => {
    setIsQuestionbankOpen(!isQuestionbankOpen);
  };
  const [isSelfcreatedQBOpen, setIsSelfcreatedQBOpen] = useState(false);

  const toggleSelfCreatedQB = () => {
    setIsSelfcreatedQBOpen(!isSelfcreatedQBOpen);
  };
  const [isMcqOpen, setIsMcqOpen] = useState(false);

  const toggleMCQ = () => {
    setIsMcqOpen(!isMcqOpen);
  };
  const [isParagQuestionOpen, setIsParagQuestionOpen] = useState(false);

  const toggleParagQuestions = () => {
    setIsParagQuestionOpen(!isParagQuestionOpen);
  };
  const [isParagQuestionOpen1, setIsParagQuestionOpen1] = useState(false);

  const toggleParagQuestions1 = () => {
    setIsParagQuestionOpen1(!isParagQuestionOpen1);
  };
  const [isCodingQuestionOpen, setIsCodingQuestionOpen] = useState(false);

  const toggleCodingQuestions = () => {
    setIsCodingQuestionOpen(!isCodingQuestionOpen);
  };

  const [isInstitutionsOpen1, setIsInstitutionsOpen1] = useState(false);

  const toggleInstitutions1 = () => {
    setIsInstitutionsOpen1(!isInstitutionsOpen1);
  };

  const [isInstitutionsOpen2, setIsInstitutionsOpen2] = useState(false);

  const toggleInstitutions2 = () => {
    setIsInstitutionsOpen2(!isInstitutionsOpen2);
  };
  const [profileopen, setprofileopen] = useState(false);

  const toggleprofile = () => {
    setprofileopen(!profileopen);
  };
  

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  //   const toggleSidebar = () => {
  //     setSidebarOpen(!isSidebarOpen);
  //   };
  //   const [isOpen, setisOpen] = useState(false);
  // 	const [isInstitutionsOpen, setIsInstitutionsOpen] = useState(false);

  // 	const toggle = () => setisOpen(!isOpen);
  // 	const toggleInstitutions = () => setIsInstitutionsOpen(!isInstitutionsOpen);

  const [islearnOpen, setIslearnOpen] = useState(false);

  const togglelearnopen = () => setIslearnOpen(!islearnOpen);

  const [isassessmentopen, setisassessmentopen] = useState(false);

  const toggleAssesment = () => {
    setisassessmentopen(!isassessmentopen);
  };

  const [isassessmentopen1, setisassessmentopen1] = useState(false);

  const toggleAssesment1 = () => {
    setisassessmentopen1(!isassessmentopen1);
  };

  const [ispracticecategory, setispracticecategory] = useState(false);

  const togglepractcecategory = () => {
    setispracticecategory(!ispracticecategory);
  };

  return (
    <div>
      <div className="side_item d-none d-lg-block">
        <div
          className={`sidebar ${isOpen ? "open" : ""}`}
          style={{ height: "100vh", overflowY: "scroll" }}
        >
          <div class="logo_details  ">
            <div class="logo_name fixed-top">
              {" "}
              <img
                src="./Images/Skill Hub Logo Dark (3).png"
                alt="logo"
                width="170px"
                height="120px"
                style={{ borderRadius: "7px" }}
              />
            </div>
          </div>
          <ul class="nav-list" style={{marginTop:"90px"}} >
            <li>
              <span class="tooltip">Dashboard</span>
            </li>
            <li>
              <Link to="/PerfexHome" className="Link_border">
                <i class="bx bx-grid-alt icons"></i>
                <span class="link_name">Dashboard</span>
              </Link>
              {/* <span class="tooltip">Dashboard</span> */}
            </li>
            <li>
              <Link to="/Admin_Home" className="Link_border">
                <i class="fa-solid fa-house icons"></i>

                <span class="link_name">HomePage</span>
              </Link>
              {/* <span class="tooltip">HomePage</span> */}
            </li>
            <li
              className="d-flex justify-content-between align-items-center"
              onClick={toggleInstitutions}
            >
              <div>
                <Link to="" className="Link_border">
                  <i class="fa-solid fa-building-columns icons"></i>
                  <span className="link_name "> Institutions </span>
                </Link>
              </div>
              <div>
                <i className="fa-solid fa-chevron-down"></i>
              </div>

              <span className="tooltip">Institutions</span>
            </li>
            {isInstitutionsOpen && (
              <div className="icons_items">
                <li>
                  <Link to="/AdminDashboard" className="Link_border">
                    <i className="fa-solid fa-building-columns icons"></i>
                    <span className="link_name">Institutions</span>
                  </Link>
                  {/* <span className="tooltip">institutions</span> */}
                </li>
                <li>
                  <Link to="/BatchYear" className="Link_border">
                    <i class="fa-solid fa-calendar-days icons"></i>
                    <span className="link_name">Batch Years</span>
                  </Link>
                  {/* <span className="tooltip">Batch Years</span> */}
                </li>
                <li>
                  <Link to="/Batches" className="Link_border">
                    <i className="fa-solid fa-building-columns icons"></i>
                    <span className="link_name">Batches</span>
                  </Link>
                  {/* <span className="tooltip">Batches</span> */}
                </li>
                <li>
                  <Link to="/UsersDetails" className="Link_border">
                    <i className="fa-solid fa-user icons"></i>
                    <span className="link_name">Users</span>
                  </Link>
                  {/* <span className="tooltip">Users</span> */}
                </li>
                <li>
                  <Link to="/SearchOption" className="Link_border">
                    <i className="fa-brands fa-searchengin icons"></i>
                    <span className="link_name">Search Users</span>
                  </Link>
                  {/* <span className="tooltip">Search Users</span> */}
                </li>
              </div>
            )}
            <li
              className="d-flex justify-content-between"
              onClick={toggleQuestionBank}
            >
              <div>
                <Link to="#" className="Link_border">
                  {/* <i class="fa-solid fa-ellipsis-vertical"></i> */}
                  <i class="fa-solid fa-book-open icons"></i>
                  <span className="link_name ">Question Bank </span>
                </Link>
              </div>
              <div>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </li>
            {isQuestionbankOpen && (
              <div className="icons_items">
                <li onClick={toggleSelfCreatedQB}>
                  <Link to="#" className="Link_border">
                    <i class="fa-solid fa-book icons"></i>
                    <Link to="#" className="Link_border">
                      <span className="link_name">Self Created QB</span>
                    </Link>
                  </Link>
                </li>
                {isSelfcreatedQBOpen && (
                  <div className="icons_items">
                    <li>
                      <Link to="/QbSubject" className="Link_border">
                        <i class="fa-solid fa-circle-dot icons"></i>
                        <Link to="/QbSubject" className="Link_border">
                          <span className="link_name">subjects</span>
                        </Link>
                      </Link>
                      {/* <span className="tooltip">subjects</span> */}
                    </li>
                    <li>
                      <Link to="/Chapter" className="Link_border">
                        <i class="fa-solid fa-circle-dot icons"></i>
                        <Link to="/Chapter" className="Link_border">
                          <span className="link_name">chapters</span>
                        </Link>
                      </Link>
                      {/* <span className="tooltip">chapters</span> */}
                    </li>
                  </div>
                )}
                <li onClick={toggleMCQ}>
                  <Link to="#" className="Link_border">
                    <i class="fa-solid fa-book icons"></i>
                    <span className="link_name">MCQ Questions</span>
                  </Link>
                </li>
                {isMcqOpen && (
                  <div className="icons_items">
                    <li>
                      <Link to="/CreateQuestion" className="Link_border">
                        <i class="fa-solid fa-circle-dot icons"></i>
                        <Link to="/CreateQuestion" className="Link_border">
                          <span className="link_name">create</span>
                        </Link>
                      </Link>
                      {/* <span className="tooltip">create</span> */}
                    </li>
                    <li>
                      <Link to="/McqView" className="Link_border">
                        <i class="fa-solid fa-circle-dot icons"></i>
                        <Link to="/McqView" className="Link_border">
                          <span className="link_name">View</span>
                        </Link>
                      </Link>
                      {/* <span className="tooltip">View</span> */}
                    </li>
                    <li>
                      <Link to="/upload" className="Link_border">
                        <i class="fa-solid fa-circle-dot icons"></i>
                        <Link to="/upload" className="Link_border">
                          <span className="link_name">Upload</span>
                        </Link>
                      </Link>
                      {/* <span className="tooltip">Upload</span> */}
                    </li>
                  </div>
                )}
                <li onClick={toggleParagQuestions}>
                  <Link to="#" className="Link_border">
                    <i class="fa-solid fa-book icons"></i>
                    <Link to="#" className="Link_border">
                      <span className="link_name">Parag MCQ Questions</span>
                    </Link>
                  </Link>
                  {/* <span className="tooltip">Parag MCQ Questions</span> */}
                </li>
                {isParagQuestionOpen && (
                  <div className="icons_items">
                    <li>
                      <Link to="/ParagHome" className="Link_border">
                        <i class="fa-solid fa-circle-dot icons"></i>
                        <Link to="/ParagHome" className="Link_border">
                          <span className="link_name">Create</span>
                        </Link>
                      </Link>
                      {/* <span className="tooltip">Create</span> */}
                    </li>
                    <li>
                      <Link to="/ParagView" className="Link_border">
                        <i class="fa-solid fa-circle-dot icons"></i>
                        <Link to="/ParagView" className="Link_border">
                          <span className="link_name">View</span>
                        </Link>
                      </Link>
                      {/* <span className="tooltip">View</span> */}
                    </li>
                  </div>
                )}
                <li onClick={toggleCodingQuestions}>
                  <Link to="#" className="Link_border">
                    <i class="fa-solid fa-book icons"></i>
                    <Link to="#" className="Link_border">
                      <span className="link_name">Coding Questions</span>
                    </Link>
                  </Link>
                  {/* <span className="tooltip">Coding Questions</span> */}
                </li>
                {isCodingQuestionOpen && (
                  <div className="icons_items">
                    <li>
                      <Link to="/Coding" className="Link_border">
                        <i class="fa-solid fa-circle-dot icons"></i>
                        <Link to="/Coding" className="Link_border">
                          <span className="link_name">Create</span>
                        </Link>
                      </Link>
                      {/* <span className="tooltip">Create</span> */}
                    </li>
                    <li>
                      <Link to="#" className="Link_border">
                        <i class="fa-solid fa-circle-dot icons"></i>
                        <Link to="/Codingview" className="Link_border">
                          <span className="link_name">View</span>
                        </Link>
                      </Link>
                      {/* <span className="tooltip">View</span> */}
                    </li>
                  </div>
                )}
                <li onClick={toggleCodingQuestions}>
                  <Link to="/AssignQB" className="Link_border">
                    <i class="fa-solid fa-book icons"></i>
                    <Link to="/AssignQB" className="Link_border">
                      <span className="link_name">Assign QB</span>
                    </Link>
                  </Link>
                  {/* <span className="tooltip">Assign QB</span> */}
                </li>
              </div>
            )}
            <li
              className="d-flex justify-content-between"
              onClick={toggleInstitutions1}
            >
              <div>
                <Link to="#" className="Link_border">
                  {/* <i class="fa-solid fa-ellipsis-vertical"></i> */}
                  <i class="fa-solid fa-school icons"></i>
                  <span className="link_name ">Learning Path</span>
                </Link>
              </div>
              <div>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </li>
            {isInstitutionsOpen1 && (
              <div className="icons_items">
                <li onClick={toggleInstitutions2}>
                  <Link to="#" className="Link_border">
                    <i class="fa-solid fa-school icons"></i>

                    <span className="link_name">Learning Path</span>
                  </Link>
                  {/* <span className="tooltip">Learning Path</span> */}
                </li>
                {isInstitutionsOpen2 && (
                  <div className="icons_items">
                    <li>
                      <Link to="#" className="Link_border">
                        <i class="fa-solid fa-chalkboard icons"></i>
                        <Link to="/Learn" className="Link_border">
                          <span className="link_name">Learning Path</span>
                        </Link>
                      </Link>
                      {/* <span className="tooltip">Learning Path</span> */}
                    </li>
                    <li>
                      <Link to="#" className="Link_border">
                        <i class="fa-solid fa-video icons"></i>
                        <Link to="/LearnPath" className="Link_border">
                          <span className="link_name">Video Folders</span>
                        </Link>
                      </Link>
                      {/* <span className="tooltip">Video Folders</span> */}
                    </li>
                    <li>
                      <Link to="/LearningPathReports" className="Link_border">
                        <i class="fa-solid fa-record-vinyl icons"></i>
                        <span className="link_name">Reports</span>
                      </Link>
                      {/* <span className="tooltip">Reports</span> */}
                    </li>
                  </div>
                )}

                <li>
                  <Link to="/Accesspagedetails" className="Link_border">
                    <i class="fa-brands fa-accessible-icon icons"></i>
                    <span className="link_name">Access</span>
                  </Link>
                  {/* <span className="tooltip">Access</span> */}
                </li>
              </div>
            )}
            <li
              className="d-flex justify-content-between align-items-center"
              onClick={toggleAssesment}
            >
              <div>
                <Link to="#" className="Link_border">
                  {/* <i class="fa-solid fa-ellipsis-vertical"></i> */}
                  <span
                    class="material-symbols-outlined ml-3 "
                    style={{ fontSize: "20px" }}
                  >
                    playlist_add_check_circle
                  </span>
                  <span className="link_name ml-3 ">Assessment</span>
                </Link>
              </div>
              <div>
                <i className="fa-solid fa-chevron-down"></i>
              </div>

              <span className="tooltip">Assessment</span>
            </li>
            {isassessmentopen && (
              <div className="icons_items">
                <li>
                  <Link to="/categories" className="Link_border">
                    <i className="fa-solid fa-building-columns icons"></i>
                    <span className="link_name">Categories</span>
                  </Link>
                  {/* <span className="tooltip">institutions</span> */}
                </li>
                <li>
                  <Link to="/Assementview" className="Link_border">
                    <i class="fa-solid fa-calendar-days icons"></i>
                    <span className="link_name">Assessment</span>
                  </Link>
                  {/* <span className="tooltip">Batch Years</span> */}
                </li>
                <li onClick={toggleParagQuestions}>
                  <Link to="#" className="Link_border">
                    <i class="fa-solid fa-folder icons"></i>
                    <Link to="#" className="Link_border">
                      <span className="link_name">Reports</span>
                    </Link>
                  </Link>
                  {/* <span className="tooltip">Parag MCQ Questions</span> */}
                </li>
                {isParagQuestionOpen && (
                  <div className="icons_items">
                    <li>
                      <Link to="/assessmentsReports" className="Link_border">
                        <i class="fa-solid fa-house icons"></i>
                        <Link to="/assessmentsReports" className="Link_border">
                          <span className="link_name">Assessment Report</span>
                        </Link>
                      </Link>
                      {/* <span className="tooltip">Create</span> */}
                    </li>
                    <li>
                      <Link to="/participationReports" className="Link_border">
                        <i class="fa-solid fa-folder-open icons"></i>
                        <Link
                          to="/participationReports"
                          className="Link_border"
                        >
                          <span className="link_name">
                            Participation Report
                          </span>
                        </Link>
                      </Link>
                      {/* <span className="tooltip">View</span> */}
                    </li>
                  </div>
                )}
                <li onClick={toggleParagQuestions1}>
                  <Link to="#" className="Link_border">
                    <i class="fa-solid fa-folder icons"></i>
                    <Link to="#" className="Link_border">
                      <span className="link_name">Assigned Assessments</span>
                    </Link>
                  </Link>
                  {/* <span className="tooltip">Parag MCQ Questions</span> */}
                </li>
                {isParagQuestionOpen1 && (
                  <div className="icons_items">
                    <li>
                      <Link to="" className="Link_border">
                        <i class="fa-solid fa-house icons"></i>
                        <Link to="/Categories987" className="Link_border">
                          <span className="link_name">Categorie</span>
                        </Link>
                      </Link>
                      {/* <span className="tooltip">Create</span> */}
                    </li>
                    <li>
                      <Link to="" className="Link_border">
                        <i class="fa-solid fa-folder-open icons"></i>
                        <Link to="/acces-assessment" className="Link_border">
                          <span className="link_name">Assessments</span>
                        </Link>
                      </Link>
                      {/* <span className="tooltip">View</span> */}
                    </li>
                  </div>
                )}
               
              </div>
            )}
            <li>
              <Link to="/Blogs1" className="Link_border">
                {/* <span class="material-symbols-outlined mx-3">
									app_blocking
								</span> */}
                {/* <i class="fa-solid fa-ellipsis-vertical"></i> */}
                <span
                  class="material-symbols-outlined ml-3"
                  style={{
                    fontSize: "20px",
                  }}
                >
                  blur_circular
                </span>
                <span className="link_name ml-3">Blogs</span>
              </Link>
            </li>
            <li
              className="d-flex justify-content-between align-items-center"
              onClick={toggleAssesment1}
            >
              <div>
                <Link to="#" className="Link_border">
                  {/* <i class="fa-solid fa-ellipsis-vertical"></i> */}
                  <span
                    class="material-symbols-outlined ml-3"
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    play_shapes
                  </span>
                  <span className="link_name ml-3">Practice</span>
                </Link>
              </div>
              <div>
                <i className="fa-solid fa-chevron-down"></i>
              </div>

              <span className="tooltip">Practice</span>
            </li>
            {isassessmentopen1 && (
              <div className="icons_items">
                <li>
                  <Link to="/categories123" className="Link_border">
                    <i className="fa-solid fa-building-columns icons"></i>
                    <span className="link_name">Categories</span>
                  </Link>
                  {/* <span className="tooltip">institutions</span> */}
                </li>
                <li>
                  <Link to="/practicetopic" className="Link_border">
                    <i class="fa-solid fa-bullseye icons"></i>
                    <span className="link_name">Topic</span>
                  </Link>
                  {/* <span className="tooltip">Batch Years</span> */}
                </li>
                <li>
                  <Link to="/testTable" className="Link_border">
                    <i class="fa-solid fa-bullseye icons"></i>
                    <span className="link_name">Test</span>
                  </Link>
                  {/* <span className="tooltip">Batch Years</span> */}
                </li>
                <Link to="/practiceReports" className="Link_border">
                  <i class="fa-solid fa-file-excel icons"></i>
                  <span className="link_name">Practice Reports</span>
                </Link>
                <li
                  className="d-flex justify-content-between align-items-center mt-2 "
                  onClick={togglepractcecategory}
                >
                  <div>
                    <i
                      class="fa-solid fa-user-group"
                      style={{ fontSize: "12px" }}
                    ></i>
                    <span className="link_name ">Assigned </span>
                  </div>
                  <div>
                    <i className="fa-solid fa-chevron-down pr-3"></i>
                  </div>
                </li>
                {ispracticecategory && (
                  <div className="icons_items mt-2 pl-3">
                    <li className="mt-3 " style={{ listStyleType: "none" }}>
                      <NavLink to="/Practicecategory" className="link_name Link_border">
                        {/* <i class="fa-solid fa-calendar-days icons pr-3"></i> */}
                        <span className="pl-3" style={{ fontSize: "14px" }}>
                          Categories
                        </span>
                      </NavLink>

                      {/* <span className="tooltip">Batch Years</span> */}
                    </li>
                    <li className="mt-3 Link_border" style={{ listStyleType: "none" }}>
                      <NavLink to="/topics" className="link_name Link_border">
                        {/* <i class="fa-solid fa-calendar-days icons pr-3"></i> */}
                        <span className="pl-3" style={{ fontSize: "14px" }}>
                          Topics
                        </span>
                      </NavLink>

                      {/* <span className="tooltip">Batch Years</span> */}
                    </li>
                    <li className="mt-3" style={{ listStyleType: "none" }}>
                      <NavLink to="/tests" className="link_name Link_border">
                        {/* <i class="fa-solid fa-calendar-days icons pr-3"></i> */}
                        <span className="pl-3" style={{ fontSize: "14px" }}>
                          Test
                        </span>
                      </NavLink>

                      {/* <span className="tooltip">Batch Years</span> */}
                    </li>
                  </div>
                )}
              </div>
            )}

            <li className="d-flex justify-content-between align-items-center mt-2 "
              onClick={toggleprofile}
              >

							<div style={{cursor:"pointer"}}>
								<i class="fa-solid fa-user icons" style={{ fontSize: "12px" }}></i>

								<span className="link_name ">Profile </span>
							</div>
              <div>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
						</li>
            {profileopen && (
              <div className="icons_items">
						<li className="mt-2 " style={{ listStyleType: "none" }}>
							<NavLink to="/profile/pricing" className="link_name Link_border">
								<i className="fa-solid fa-dollar-sign icons pl-2"></i>
								<span className="pl-2" style={{ fontSize: "14px" }}>
									Pricing
								</span>
							</NavLink>
						</li>
						<li className="mt-2" style={{ listStyleType: "none" }}>
							<NavLink to="/profile/billing" className="link_name Link_border">
								<i className="fa-regular fa-file icons pl-2"></i>
								<span className="pl-2" style={{ fontSize: "14px" }}>
									Billing
								</span>
							</NavLink>
						</li>
						<li className="mt-2 " style={{ listStyleType: "none" }}>
							<NavLink to="/profile/invoices" className="link_name Link_border">
								<i className="fa-regular fa-file-lines icons pl-2"></i>
								<span className="pl-2" style={{ fontSize: "14px" }}>
									Invoices
								</span>
							</NavLink>
						</li>
						<li className="mt-2 " style={{ listStyleType: "none" }}>
							<NavLink to="/profile/change_password" className="link_name Link_border">
								<i className="fa-solid fa-key icons pl-2"></i>
								<span className="pl-2" style={{ fontSize: "14px" }}>
									Change Password
								</span>
							</NavLink>
						</li>
					
            </div>
            )}
            <li className="profile ">
              <div className="fixed-bottom d-flex login_profile">
                <div>
                  <i className="fa-solid fa-user"></i>
                </div>
                {/* <img src='' alt="profile image" /> */}
                <div class="profile_content">
                  <div class="name">{addblogslist?.HeadName}</div>
                  <div class="designation">Admin</div>
                </div>
                <div>
                  <i
                    class="bx bx-log-out"
                    id="log_out"
                    onClick={handleLogout}
                  ></i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg  bg-dark d-lg-none d-md-block p-0 ">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">
            <img src={sideimage} className="img-fluid skill_img " alt="img" />
          </NavLink>
          {/* Toggle button for the sidebar */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleNavLinks}
          >
            {/* <span className="navbar-toggler-icon"></span> */}
            <i className="fa-solid fa-bars "></i>
          </button>

          {/* Brand/logo */}

          {/* Navbar links */}
          <div
            className={`collapse navbar-collapse p-3 ${
              isNavLinksVisible ? "show" : ""
            }`}
            id="navbarNav"
            style={{ backgroundColor: "transparent", height: "100%" }}
          >
            <ul class="nav-list">
              <li>
                <Link to="#" className="" style={{ fontSize: "15px" }}>
                  <i class="bx bx-grid-alt "></i>
                  <span class="link_name" style={{ paddingLeft: "10px" }}>
                    Dashboard
                  </span>
                </Link>
                {/* <span class="tooltip">Dashboard</span> */}
              </li>
              <li className="mt-2">
                <Link to="/PerfexHome" style={{ fontSize: "15px" }}>
                  <i class="fa-solid fa-house "></i>

                  <span class="link_name" style={{ paddingLeft: "10px" }}>
                    HomePage
                  </span>
                </Link>
                {/* <span class="tooltip">HomePage</span> */}
              </li>
              <li
                className="d-flex justify-content-between align-items-center mt-2"
                onClick={toggleInstitutions}
              >
                <div>
                  <Link to="#" style={{ fontSize: "15px" }}>
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                    <span
                      className="link_name "
                      style={{ paddingLeft: "10px" }}
                    >
                      INSTITUTIONS{" "}
                    </span>
                  </Link>
                </div>
                <div>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>

                <span className="tooltip">Institutions</span>
              </li>
              {isInstitutionsOpen && (
                <div className="icons_items">
                  <li className="mt-2">
                    <Link to="./AdminDashboard" style={{ fontSize: "15px" }}>
                      <i className="fa-solid fa-building-columns icons"></i>
                      <span
                        className="link_name"
                        style={{ paddingLeft: "10px" }}
                      >
                        institutions
                      </span>
                    </Link>
                    {/* <span className="tooltip">institutions</span> */}
                  </li>
                  <li className="mt-2">
                    <Link to="/BatchYear" style={{ fontSize: "15px" }}>
                      <i class="fa-solid fa-calendar-days icons"></i>
                      <span
                        className="link_name"
                        style={{ paddingLeft: "10px" }}
                      >
                        Batch Years
                      </span>
                    </Link>
                    {/* <span className="tooltip">Batch Years</span> */}
                  </li>
                  <li className="mt-2">
                    <Link to="/Batches" style={{ fontSize: "15px" }}>
                      <i className="fa-solid fa-building-columns icons"></i>
                      <span
                        className="link_name"
                        style={{ paddingLeft: "10px" }}
                      >
                        Batches
                      </span>
                    </Link>
                    {/* <span className="tooltip">Batches</span> */}
                  </li>
                  <li className="mt-2">
                    <Link to="/UsersDetails" style={{ fontSize: "15px" }}>
                      <i className="fa-solid fa-user icons"></i>
                      <span
                        className="link_name"
                        style={{ paddingLeft: "10px" }}
                      >
                        Users
                      </span>
                    </Link>
                    {/* <span className="tooltip">Users</span> */}
                  </li>
                  <li className="mt-2">
                    <Link to="/SearchOption" style={{ fontSize: "15px" }}>
                      <i className="fa-brands fa-searchengin icons"></i>
                      <span
                        className="link_name"
                        style={{ paddingLeft: "10px" }}
                      >
                        Search Users
                      </span>
                    </Link>
                    {/* <span className="tooltip">Search Users</span> */}
                  </li>
                </div>
              )}
              <li
                className="d-flex justify-content-between"
                onClick={toggleQuestionBank}
              >
                <div className="mt-2">
                  <Link to="#">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                    <span
                      className="link_name "
                      style={{ paddingLeft: "10px" }}
                    >
                      QUESTION BANK{" "}
                    </span>
                  </Link>
                </div>
                <div>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </li>
              {isQuestionbankOpen && (
                <div className="icons_items">
                  <li onClick={toggleSelfCreatedQB} className="mt-2">
                    <Link to="#" style={{ fontSize: "15px" }}>
                      <i class="fa-solid fa-circle-dot icons"></i>
                      <Link to="#">
                        <span
                          className="link_name"
                          style={{ paddingLeft: "10px" }}
                        >
                          Self Created QB
                        </span>
                      </Link>
                    </Link>
                  </li>
                  {isSelfcreatedQBOpen && (
                    <div className="icons_items">
                      <li className="mt-2">
                        <Link to="/QbSubject" style={{ fontSize: "15px" }}>
                          <i class="fa-solid fa-video icons"></i>
                          <Link to="/QbSubject">
                            <span
                              className="link_name"
                              style={{ paddingLeft: "10px" }}
                            >
                              subjects
                            </span>
                          </Link>
                        </Link>
                        {/* <span className="tooltip">subjects</span> */}
                      </li>
                      <li className="mt-2">
                        <Link to="/Chapter" style={{ fontSize: "15px" }}>
                          <i class="fa-solid fa-video icons"></i>
                          <Link to="/Chapter">
                            <span
                              className="link_name"
                              style={{ paddingLeft: "10px" }}
                            >
                              chapters
                            </span>
                          </Link>
                        </Link>
                        {/* <span className="tooltip">chapters</span> */}
                      </li>
                    </div>
                  )}
                  <li onClick={toggleMCQ} className="mt-2">
                    <Link to="#" style={{ fontSize: "15px" }}>
                      <i class="fa-solid fa-circle-dot icons"></i>
                      <span
                        className="link_name"
                        style={{ paddingLeft: "10px" }}
                      >
                        MCQ Questions
                      </span>
                    </Link>
                  </li>
                  {isMcqOpen && (
                    <div className="icons_items">
                      <li className="mt-2">
                        <Link to="/CreateQuestion" style={{ fontSize: "15px" }}>
                          <i class="fa-solid fa-video icons"></i>
                          <Link to="/CreateQuestion">
                            <span
                              className="link_name"
                              style={{ paddingLeft: "10px" }}
                            >
                              create
                            </span>
                          </Link>
                        </Link>
                        {/* <span className="tooltip">create</span> */}
                      </li>
                      <li className="mt-2">
                        <Link to="/McqView" style={{ fontSize: "15px" }}>
                          <i class="fa-solid fa-video icons"></i>
                          <Link to="/McqView">
                            <span
                              className="link_name"
                              style={{ paddingLeft: "10px" }}
                            >
                              View
                            </span>
                          </Link>
                        </Link>
                        {/* <span className="tooltip">View</span> */}
                      </li>
                      <li className="mt-2">
                        <Link to="/upload" style={{ fontSize: "15px" }}>
                          <i class="fa-solid fa-video icons"></i>
                          <Link to="/upload">
                            <span
                              className="link_name"
                              style={{ paddingLeft: "10px" }}
                            >
                              Upload
                            </span>
                          </Link>
                        </Link>
                        {/* <span className="tooltip">Upload</span> */}
                      </li>
                    </div>
                  )}
                  <li onClick={toggleParagQuestions} className="mt-2">
                    <Link to="#" style={{ fontSize: "15px" }}>
                      <i class="fa-solid fa-circle-dot icons"></i>
                      <Link to="#">
                        <span
                          className="link_name"
                          style={{ paddingLeft: "10px" }}
                        >
                          Parag MCQ Questions
                        </span>
                      </Link>
                    </Link>
                    {/* <span className="tooltip">Parag MCQ Questions</span> */}
                  </li>
                  {isParagQuestionOpen && (
                    <div className="icons_items">
                      <li className="mt-2">
                        <Link to="/ParagHome" style={{ fontSize: "15px" }}>
                          <i class="fa-solid fa-video icons"></i>
                          <Link to="/ParagHome">
                            <span
                              className="link_name"
                              style={{ paddingLeft: "10px" }}
                            >
                              Create
                            </span>
                          </Link>
                        </Link>
                        {/* <span className="tooltip">Create</span> */}
                      </li>
                      <li className="mt-2">
                        <Link to="/ParagView" style={{ fontSize: "15px" }}>
                          <i class="fa-solid fa-video icons"></i>
                          <Link to="/ParagView">
                            <span
                              className="link_name"
                              style={{ paddingLeft: "10px" }}
                            >
                              View
                            </span>
                          </Link>
                        </Link>
                        {/* <span className="tooltip">View</span> */}
                      </li>
                    </div>
                  )}
                  <li onClick={toggleCodingQuestions} className="mt-2">
                    <Link to="#" style={{ fontSize: "15px" }}>
                      <i class="fa-solid fa-circle-dot icons"></i>
                      <Link to="#">
                        <span
                          className="link_name"
                          style={{ paddingLeft: "10px" }}
                        >
                          Coding Questions
                        </span>
                      </Link>
                    </Link>
                    {/* <span className="tooltip">Coding Questions</span> */}
                  </li>
                  {isCodingQuestionOpen && (
                    <div className="icons_items">
                      <li className="mt-2">
                        <Link to="/Coding" style={{ fontSize: "15px" }}>
                          <i class="fa-solid fa-video icons"></i>
                          <Link to="/Coding">
                            <span
                              className="link_name"
                              style={{ paddingLeft: "10px" }}
                            >
                              Create
                            </span>
                          </Link>
                        </Link>
                        {/* <span className="tooltip">Create</span> */}
                      </li>
                      <li className="mt-2">
                        <Link to="#" style={{ fontSize: "15px" }}>
                          <i class="fa-solid fa-video icons"></i>
                          <Link to="/Codingview">
                            <span
                              className="link_name"
                              style={{ paddingLeft: "10px" }}
                            >
                              View
                            </span>
                          </Link>
                        </Link>
                        {/* <span className="tooltip">View</span> */}
                      </li>
                    </div>
                  )}
                  <li onClick={toggleCodingQuestions} className="mt-2">
                    <Link to="/AssignQB" style={{ fontSize: "15px" }}>
                      <i class="fa-solid fa-circle-dot icons"></i>
                      <Link to="/AssignQB">
                        <span
                          className="link_name"
                          style={{ paddingLeft: "10px" }}
                        >
                          Assign QB
                        </span>
                      </Link>
                    </Link>
                    {/* <span className="tooltip">Assign QB</span> */}
                  </li>
                </div>
              )}
              <li
                className="d-flex justify-content-between mt-2"
                onClick={toggleInstitutions1}
              >
                <div>
                  <Link to="#">
                    <i class="fa-solid fa-ellipsis-vertical" style={{fontSize:"px"}}></i>
                    <span
                      className="link_name "
                      style={{ paddingLeft: "10px" }}
                    >
                      LEARNING PATH{" "}
                    </span>
                  </Link>
                </div>
                <div>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </li>
              {isInstitutionsOpen1 && (
                <div className="icons_items">
                  <li onClick={toggleInstitutions2} className="mt-2">
                    <Link to="#" style={{ fontSize: "15px" }}>
                      <i class="fa-solid fa-school icons"></i>

                      <span
                        className="link_name"
                        style={{ paddingLeft: "10px" }}
                      >
                        Learning Path
                      </span>
                    </Link>
                    {/* <span className="tooltip">Learning Path</span> */}
                  </li>
                  {isInstitutionsOpen2 && (
                    <div className="icons_items">
                      <li className="mt-2">
                        <Link to="#" style={{ fontSize: "15px" }}>
                          <i class="fa-solid fa-chalkboard icons"></i>
                          <Link to="/Learn">
                            <span
                              className="link_name"
                              style={{ paddingLeft: "10px" }}
                            >
                              Learning Path
                            </span>
                          </Link>
                        </Link>
                        {/* <span className="tooltip">Learning Path</span> */}
                      </li>
                      <li className="mt-2">
                        <Link to="#" style={{ fontSize: "15px" }}>
                          <i class="fa-solid fa-video icons"></i>
                          <Link to="/LearnPath">
                            <span
                              className="link_name"
                              style={{ paddingLeft: "10px" }}
                            >
                              Video Folders
                            </span>
                          </Link>
                        </Link>
                        {/* <span className="tooltip">Video Folders</span> */}
                      </li>
                      <li className="mt-2">
                        <Link to="#" style={{ fontSize: "15px" }}>
                          <i class="fa-solid fa-record-vinyl icons"></i>
                          <Link to="/LearningPathReports">
                            <span
                              className="link_name"
                              style={{ paddingLeft: "10px" }}
                            >
                              Reports
                            </span>
                          </Link>
                        </Link>
                        {/* <span className="tooltip">Reports</span> */}
                      </li>
                    </div>
                  )}

                  <li className="mt-2">
                    <Link to="#" style={{ fontSize: "15px" }}>
                      <i class="fa-brands fa-accessible-icon icons"></i>
                      <Link to="/Access">
                        <span
                          className="link_name"
                          style={{ paddingLeft: "10px" }}
                        >
                          Access
                        </span>
                      </Link>
                    </Link>
                    {/* <span className="tooltip">Access</span> */}
                  </li>
                </div>
              )}
             <li className="d-flex justify-content-between align-items-center mt-2 ">
							<div>
								<i class="fa-solid fa-user" style={{ fontSize: "14px" }}></i>
								<span className="link_name ">Profile </span>
							</div>
						</li>
						<li className="mt-3" style={{ listStyleType: "none" }}>
							<NavLink to="/profile/pricing" className="link_name">
								<i className="fa-solid fa-dollar-sign pl-5"></i>
								<span className="pl-4" style={{ fontSize: "14px" }}>
									Pricing
								</span>
							</NavLink>
						</li>
						<li className="mt-3" style={{ listStyleType: "none" }}>
							<NavLink to="/profile/billing" className="link_name">
								<i className="fa-regular fa-file pl-5"></i>
								<span className="pl-4" style={{ fontSize: "14px" }}>
									Billing
								</span>
							</NavLink>
						</li>
						<li className="mt-3 " style={{ listStyleType: "none" }}>
							<NavLink to="/profile/invoices" className="link_name">
								<i className="fa-regular fa-file-lines pl-5"></i>
								<span className="pl-4" style={{ fontSize: "14px" }}>
									Invoices
								</span>
							</NavLink>
						</li>
						<li className="mt-3 " style={{ listStyleType: "none" }}>
							<NavLink to="/profile/change_password" className="link_name">
								<i className="fa-solid fa-key pl-5"></i>
								<span className="pl-4" style={{ fontSize: "14px" }}>
									Change Password
								</span>
							</NavLink>
						</li>
						<li className="mt-3 " style={{ listStyleType: "none" }}>
							<NavLink to="/profile/compilerTest" className="link_name">
								<i className="fa-solid fa-house-laptop pl-5"></i>
								<span className="pl-4" style={{ fontSize: "14px" }}>
									Compiler Test
								</span>
							</NavLink>
						</li>

						<li className="profile ">
							<div className="fixed-bottom d-flex login_profile">
								<div>
									<i className="fa-solid fa-user"></i>
								</div>
					
								</div>
						</li>
            </ul>

            <div className="text-center">
              <button className="logout_button" onClick={handleLogout}>
                {" "}
                Logout
                <i class="ri-logout-box-line"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;