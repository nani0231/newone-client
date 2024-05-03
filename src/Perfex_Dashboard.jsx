import React from "react";

import logo from "../src/All Images/Logo133.jpeg";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import apiList from "./liberary/apiList";
import Cookies from "js-cookie";


function Dashboard() {

  const navigate = useNavigate();

 

  const [individualInstitute, setIndividualInstitute] = useState("");
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const fetchData = async () => {
      
  //     try {
  //       const response = await axios.get(
  //         `${apiList.individualUser}/${id}`
  //       ); // Replace with your API endpoint
  //       setIndividualInstitute(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  //   if (token == undefined) {
  //     navigate("/");
  //   }
  // }, [id]);
  return (
    <div>
      <nav class="  shadow navbar navbar-expand-sm">
        <div class="container">
          <img src={logo} alt="logo" width="200px" />

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
            style={{ backgroundcolor: "black" }}
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <div className="col-12 col-md-1"></div>
            <ul class="navbar-nav logostyle">
              <li class="nav-item">
                <a class="nav-link  mx-2 text-dark  " href="/Assessment">
                  ASSESSMENT
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link mx-2 text-dark  " href="/Courses">
                  COURSES
                </a>
              </li>
              <li class="nav-item">
                {" "}
                <a class="nav-link mx-2  text-dark " href="#">
                  CODE#
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link  mx-2  text-dark" href="/Practice">
                  PRACTICE
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link  mx-2 text-dark " href="/Blogs">
                  BLOGS
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link mx-2  text-primary " href="#">
                  DASHBOARD
                </a>
              </li>
              <div className="col-12 col-md-1"></div>
              <li class="nav-item">
                <button
                  className="btn bg-dark text-white"
                 
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

        <div className="container">
          <div className="row">
            <div className=" col-12 col-md-8 m-2">
              <div className="card mb-3 mt-2 p-2 backgroundcolor">
                <div className="row">
                  <div className="col-12 col-md-7 text-white">
                    <h4 className="mt-3">
                      Welcome{" "}
                      <span className="text-warning">
                        {individualInstitute.FirstName}
                      </span>
                    </h4>
                    <div className="d-flex flex-row">
                      <span class="material-symbols-outlined">mail</span>
                      <p className="mx-2">
                        {individualInstitute.userEmail}
                        siva
                      </p>
                    </div>
                    <div className="d-flex flex-column flex-md-row">
                      <div className="col-12 col-md-2 mb-1">
                        <button className="p-1 bg-secondary text-white btn">
                          <i className="fa-solid fa-pencil"></i>Edit
                        </button>
                      </div>
                      <div className="col-12 col-md-7">
                        <button
                          type="button"
                          class="p-1 bg-warning text-white btn"
                          data-bs-toggle="modal"
                          data-bs-target="#myModal"
                        >
                          Change Password
                        </button>
                      </div>
                    </div>
                    <div class="modal text-dark p-3" id="myModal">
                      <div class="modal-dialog modal-sm p-2">
                        <div class="modal-content p-2">
                          <div class="modal-header">
                            <h4 class="modal-title ">Change Password?</h4>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                            ></button>
                          </div>

                          <h5 htmlFor="">Password</h5>
                          <input
                            type="text"
                            className="w-50"
                            style={{ border: "1px solid black" }}
                          />
                          <h6>Password Should Content:</h6>

                          <ul
                            type="1"
                            style={{ listStyle: "disc", paddingLeft: "20px" }}
                          >
                            <div className="d-flex flex-row">
                              <div>
                                <li>Minimum 8 Characters</li>
                                <li>1 Small Letter</li>
                                <li>1 Capital letter</li>
                              </div>
                              <div className="mx-5">
                                <li>1 Number</li>
                                <li>1 Special Character</li>
                              </div>
                            </div>
                          </ul>

                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-danger"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <br />
                    <button className="col-12 col-md-5  p-1 bg-dark text-white btn">
                      Extend Access
                    </button>
                  </div>
                  <div className="col-12 col-md-5 p-3 text-white">
                    <h6>
                      Institution:
                      <span className="mx-2  ">
                        {individualInstitute.InstituteType}
                      </span>
                    </h6>
                    <h6>
                      Batch:
                      <span className="mx-2  ">
                        {individualInstitute.SelectBatch}
                      </span>
                    </h6>
                    <h6>
                      Hallticket No:
                      <span className="mx-2  ">
                        {individualInstitute.Regdid}
                      </span>
                    </h6>
                    <h6>
                      Status:
                      <span className="mx-2 ">Active</span>
                    </h6>
                    <h6>
                      Expiration Date:{" "}
                      <span className="mx-2  ">
                        {individualInstitute.ExpiryDate}
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="card col-12 col-md-3 mx-3 p-3 m-3 secondcard text-white">
              <h6>Your Overall Accuracy</h6>

              <label for="customRange" class="form-label percentage12">
                50%
              </label>

              <input type="range" id="customRange"></input>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-4">
              <div
                className="card p-3"
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                }}
              >
                <h6 className="Assessmentt123">Assessment Activity</h6>
                <h6>Completed: 3/14</h6>
                <h6>Yet to Start: 10/14</h6>
                <Link to="/RecentAssessment" style={{ textDecoration: "none" }}>
                  <span className="ViewAssessment">
                    View Recent Assessments--
                    <i className="fa-solid fa-greater-than"></i>
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div
                className="card p-3 "
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                }}
              >
                <h6 className="Assessmentt123">Course Activity</h6>
                <h6>InProgress: 6/7</h6>
                <h6>Yet to Start: 1/7</h6>
                <Link to="/RecentCourses" style={{ textDecoration: "none" }}>
                  <span className="ViewAssessment">
                    View Recent Courses--
                    <i class="fa-solid fa-greater-than"></i>
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div
                className="card p-3 "
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                }}
              >
                <h6 className="Assessmentt123">Practice Activity</h6>
                <h6>Completed: 0/44</h6>
                <h6>Yot to Start: 42/44</h6>
                <Link to="/RecentPractice" style={{ textDecoration: "none" }}>
                  <span className="ViewAssessment">
                    View Recent Practice--
                    <i class="fa-solid fa-greater-than"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="row mt-3" id="RangeCode">
            <div className="col-12 col-md-6">
              <div
                className="card cardassessment1"
                style={{ border: "1px solid black", borderRadius: "2px" }}
              >
                <h6 className="bg-white p-3">MCQ: Subject Level Accuracy</h6>

                <div className="d-flex flex-column flex-md-row">
                  <div className="col-12 col-md-7">
                    <div className="d-flex flex-row">
                      <h6 className="mx-2">Java_Programming_</h6>
                      <Link to="/JavaProgramming">
                        <span className="material-symbols-outlined text-primary">
                          double_arrow
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="col-12 col-md-1"></div>

                  <div className="col-12 col-md-4">
                    <h6>
                      22% <br /> <input type="range" />
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div
                className="card cardassessment12   "
                style={{
                  border: "1px solid black",
                  borderRadius: "2px",
                }}
              >
                <h6 className=" bg-white p-3">
                  Coding: Programming Wise Accuracy
                </h6>
              </div>
            </div>
          </div>
        </div>
     
      <br />
    </div>
  );
}
export default Dashboard;
