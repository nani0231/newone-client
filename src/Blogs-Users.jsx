import React from "react";

import logo from "../src/All Images/Logo133.jpeg";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function Blogs() {
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
                <a class="nav-link mx-2  " href="">
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
                <a class="nav-link  mx-2  " href="/Practice">
                  PRACTICE
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link  mx-2 text-primary " href="/BLOGS">
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
          <div className="col-12  m-1">
            <div className="p-2">
              <div className="d-flex flex-column flex-md-row">
                <div className="col-12 col-md-5">
                  <h5 style={{ fontWeight: "800" }}>All Blogs : </h5>
                </div>
                <div className="col-12 col-md-4"></div>
                <div className="m-2 col-12 col-md-3">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 m-1">
            <div className="p-2">
              <div className="d-flex flex-column flex-md-row">
                <div className="col-12 col-md-4">
                  <h6 style={{ fontWeight: "800" }}>Popular Tags :</h6>
                </div>
                <div className="col-12 col-md-6"></div>
                <div className="m-2 col-12 col-md-3">
                  <h6 style={{ fontWeight: "800" }}>Trending Insights :</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5"></div>
    </div>
  );
}
export default Blogs;
