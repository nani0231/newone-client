import React from "react";

import logo from "../src/All Images/Logo133.jpeg";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function Courses() {
  const [all, setAll] = useState(true);
  const [programming, setProgramming] = useState(false);

  const allOpen = () => {
    setAll(true);
    setProgramming(false);
  };

  const programmingbtn = () => {
    setAll(false);

    setProgramming(true);
  };

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
                <a class="nav-link  mx-2" href="/Assessment">
                  ASSESSMENT
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link mx-2 text-primary " href="">
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
                <a class="nav-link mx-2  text-dark " href="/Dashboard ">
                  DASHBOARD
                </a>
              </li>
              <div className="col-12 col-md-1"></div>
              <li class="nav-item">
                <button className="btn bg-dark text-white">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br />

      <div class="container">
        <div class="row">
          <div class="col-12 col-md-4"></div>
          <div class="col-12 col-md-6">
            <button
              class={`col-12 col-md-1 btn m-1 shadow ${all ? "bg-dark" : ""}`}
              style={{ backgroundColor: "#a5059d", color: "white" }}
              onClick={allOpen}
            >
              All
            </button>
            <button
              class={`col-12 col-md-3 btn m-1 shadow ${
                programming ? "bg-dark" : ""
              }`}
              style={{ backgroundColor: "#a5059d", color: "white" }}
              onClick={programmingbtn}
            >
              Programming
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {all && (
          <div className="row mt-3">
            <div className="col-12 col-md-2"></div>
            <div className="card col-12 col-md-2 m-3 Assessmentcards1">
              <div className="d-flex flex-row p-3">
                <button className="m-1 p-1 FreeeBtn">Programming</button>
                <button className="m-1 p-1 FreeeBtn w-50 ">Free</button>
              </div>
              <h5>Data Structures ...</h5>

              <hr />
              <span>
                {" "}
                <i class="fa-solid fa-book-open-reader text-primary m-1"></i>10
                Topics
              </span>
              <div className="text-center mb-4 mt-1">
                <button className="col-12 col-md-12 btn bg-primary text-white shadow">
                  Open
                </button>
              </div>
            </div>
            <div className="card col-12 col-md-2 m-3 Assessmentcards1">
              <div className="d-flex flex-row p-3">
                <button className="m-1 p-1 FreeeBtn">Programming</button>
                <button className="m-1 p-1 FreeeBtn w-50 ">Free</button>
              </div>
              <h5>Data Structures ...</h5>

              <hr />
              <span>
                {" "}
                <i class="fa-solid fa-book-open-reader text-primary m-1"></i>10
                Topics
              </span>
              <div className="text-center mb-4 mt-1">
                <button className="col-12 col-md-12 btn bg-primary text-white shadow">
                  Open
                </button>
              </div>
            </div>
            <div className="card col-12 col-md-2 m-3 Assessmentcards1">
              <div className="d-flex flex-row p-3">
                <button className="m-1 p-1 FreeeBtn">Programming</button>
                <button className="m-1 p-1 FreeeBtn w-50 ">Free</button>
              </div>
              <h5>Data Structures ...</h5>

              <hr />
              <span>
                {" "}
                <i class="fa-solid fa-book-open-reader text-primary m-1"></i>10
                Topics
              </span>
              <div className="text-center mb-4 mt-1">
                <button className="col-12 col-md-12 btn bg-primary text-white shadow">
                  Open
                </button>
              </div>
            </div>
            <div className="card col-12 col-md-2 m-3 Assessmentcards1">
              <div className="d-flex flex-row p-3">
                <button className="m-1 p-1 FreeeBtn">Programming</button>
                <button className="m-1 p-1 FreeeBtn w-50 ">Free</button>
              </div>
              <h5>Data Structures ...</h5>

              <hr />
              <span>
                {" "}
                <i class="fa-solid fa-book-open-reader text-primary m-1"></i>10
                Topics
              </span>
              <div className="text-center mb-4 mt-1">
                <button className="col-12 col-md-12 btn bg-primary text-white shadow">
                  Open
                </button>
              </div>
            </div>
          </div>
        )}
        {programming && (
          <div className="row mt-3">
            <div className="col-12 col-md-2"></div>
            <div className="card col-12 col-md-2 m-3 Assessmentcards1">
              <div className="d-flex flex-row p-3">
                <button className="m-1 p-1 FreeeBtn">Programming</button>
                <button className="m-1 p-1 FreeeBtn w-50 ">Free</button>
              </div>
              <h5>Data Structures ...</h5>

              <hr />
              <span>
                {" "}
                <i class="fa-solid fa-book-open-reader text-primary m-1"></i>10
                Topics
              </span>
              <div className="text-center mb-4 mt-1">
                <button className="col-12 col-md-12 btn bg-primary text-white shadow">
                  Open
                </button>
              </div>
            </div>
            <div className="card col-12 col-md-2 m-3 Assessmentcards1">
              <div className="d-flex flex-row p-3">
                <button className="m-1 p-1 FreeeBtn">Programming</button>
                <button className="m-1 p-1 FreeeBtn w-50 ">Free</button>
              </div>
              <h5>Data Structures ...</h5>

              <hr />
              <span>
                {" "}
                <i class="fa-solid fa-book-open-reader text-primary m-1"></i>10
                Topics
              </span>
              <div className="text-center mb-4 mt-1">
                <button className="col-12 col-md-12 btn bg-primary text-white shadow">
                  Open
                </button>
              </div>
            </div>
            <div className="card col-12 col-md-2 m-3 Assessmentcards1">
              <div className="d-flex flex-row p-3">
                <button className="m-1 p-1 FreeeBtn">Programming</button>
                <button className="m-1 p-1 FreeeBtn w-50 ">Free</button>
              </div>
              <h5>Data Structures ...</h5>

              <hr />
              <span>
                {" "}
                <i class="fa-solid fa-book-open-reader text-primary m-1"></i>10
                Topics
              </span>
              <div className="text-center mb-4 mt-1">
                <button className="col-12 col-md-12 btn bg-primary text-white shadow">
                  Open
                </button>
              </div>
            </div>
            <div className="card col-12 col-md-2 m-3 Assessmentcards1">
              <div className="d-flex flex-row p-3">
                <button className="m-1 p-1 FreeeBtn">Programming</button>
                <button className="m-1 p-1 FreeeBtn w-50 ">Free</button>
              </div>
              <h5>Data Structures ...</h5>

              <hr />
              <span>
                {" "}
                <i class="fa-solid fa-book-open-reader text-primary m-1"></i>10
                Topics
              </span>
              <div className="text-center mb-4 mt-1">
                <button className="col-12 col-md-12 btn bg-primary text-white shadow">
                  Open
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-5"></div>
    </div>
  );
}
export default Courses;
