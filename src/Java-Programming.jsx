import React from "react";

import logo from "../src/All Images/Logo133.jpeg";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function JavaProgramming() {
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
                <a class="nav-link text-dark  mx-2" href="/Assessment">
                  ASSESSMENT
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link mx-2 text-dark  " href="">
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
                <a class="nav-link  mx-2 text-dark  " href="/Practice">
                  PRACTICE
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link  mx-2 text-dark  " href="/BLOGS">
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
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-12">
            <div
              className="card shadow  cardassessment11"
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
        </div>
      </div>
    </div>
  );
}
export default JavaProgramming;
