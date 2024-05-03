import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import axios from "axios";
import apiList from "../liberary/apiList";

function Access() {
  let navigate = useNavigate();
const [learningPaths, setLearningPaths] = useState([]);

const fetchApi = async () => {
  try {
    const response = await axios.get(`${apiList.alllearningpathsDetails}`, {});
    console.log(response.data);
    setLearningPaths(response.data);
  } catch (error) {
    console.error("Error fetching learning paths:", error);
  }
};

useEffect(() => {
  fetchApi();
}, []);

  const gotoLearning = () => {
    navigate("/Learning");
  };

  const gotoLearnAccess = () => {
    navigate("/learnaccess");
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

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

  const [isInstitutionsOpen, setIsInstitutionsOpen] = useState(true);

  const toggleInstitutions = () => {
    setIsInstitutionsOpen(!isInstitutionsOpen);
  };

  const [isInstitutionsOpen1, setIsInstitutionsOpen1] = useState(false);

  const toggleInstitutions1 = () => {
    setIsInstitutionsOpen1(!isInstitutionsOpen1);
  };

  const [isInstitutionsOpen2, setIsInstitutionsOpen2] = useState(true);

  const toggleInstitutions2 = () => {
    setIsInstitutionsOpen2(!isInstitutionsOpen2);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          {isOpen && (
            <div className=" col-12 col-lg-3 col-md-12 sectioncard121">
              <Sidebar />
            </div>
          )}
          <div
            className={`my-3 col-12 col-md-${isOpen ? 12 : 10} col-lg-${
              isOpen ? 9 : 12
            }`}
          >
            <div className="mr-1 d-lg-block d-none">
              <i
                className="fa-solid fa-bars bars  d-lg-block d-none"
                onClick={toggleSidebar}
              ></i>
            </div>
            <div className="batch_card p-3">
              <div className="batch_flex mb-4">
                <p style={{ fontSize: "20px" }}>Learning Path</p>
                <div>
                  <button className="year" onClick={gotoLearning}>
                    {" "}
                    + Add Learning Path
                  </button>
                  <div className="mt-3">
                    Search :<input type="text" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="mb-3 col-lg-2 col-md-2">
                <select className="p-1 form-control">
                  <option value="" hidden>
                    0
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div className=" mb-4" style={{ overflowX: "scroll" }}>
                <table className="table table-bordered text-center">
                  <thead
                    style={{
                      fontWeight: "400",
                    }}
                  >
                    <tr>
                      <th
                        style={{
                          fontWeight: "500",
                          color: "#fff",
                          backgroundColor: "#333333",
                        }}
                      >
                        S NO
                      </th>
                      <th
                        style={{
                          fontWeight: "500",
                          color: "#fff",
                          backgroundColor: "#333333",
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{
                          fontWeight: "500",
                          color: "#fff",
                          backgroundColor: "#333333",
                        }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {Array.isArray(learningPaths) &&
                  learningPaths.map((learningPath, index) => (
                    <tr key={index}>
                      <td className="p-1">{index + 1}</td>
                      <td className="p-1">{learningPath.learningPathTitle}</td>
                      <td className="p-1">
                        <i className="fa-solid fa-file file" onClick={gotoLearnAccess}></i>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Access;

