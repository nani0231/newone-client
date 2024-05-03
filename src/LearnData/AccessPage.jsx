import React from "react";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Sidebar from "../Sidebar";
import apiList from "../liberary/apiList";

const AccessPage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [addblogslist, setAddblogslist] = useState([]);
  const [addInstitutelist, setInstitutelist] = useState([]);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showInstitutionsOptions, setShowInstitutionsOptions] = useState(false);
  const [selectedInstitutes, setSelectedInstitutes] = useState([]);
  const [selectedBatchYear, setSelectedBatchYear] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const [showSingleUserForm, setShowSingleUserForm] = useState(true);
  const [showMultipleUserForm, setShowMultipleUserForm] = useState(false);

  const handleSingleUserButtonClick = () => {
    setShowSingleUserForm(true);
    setShowMultipleUserForm(false);
  };

  const handleMultipleUserButtonClick = () => {
    setShowSingleUserForm(false);
    setShowMultipleUserForm(true);
  };

  const [error, setError] = useState(null);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };
  useEffect(() => {
    fetchblogs();
    InstituteDetails();
    if (token == undefined) {
      navigate("/");
    }
  }, [selectedInstitutes]);

  const InstituteDetails = async () => {
    const api = `${apiList.allAddInstitutes}`;
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk";
    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setInstitutelist(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const fetchblogs = async () => {
    const api = `${apiList.allUsersData}`;
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk";
    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setAddblogslist(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const filterJobs = () => {
    const filteredInstitutes = addblogslist.filter(
      (institute) =>
        selectedInstitutes.includes(institute.InstituteType) &&
        selectedBatchYear.includes(institute.BatchYear) &&
        selectedBatch.includes(institute.SelectBatch)
    );
    setIsFiltered(filteredInstitutes.length > 0);
    setAddblogslist(filteredInstitutes);

    // Print the count of filtered jobs to the console
    console.log("Number of filtered jobs:", filteredInstitutes.length);
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (selectedInstitutes.includes(value)) {
      setSelectedInstitutes(
        selectedInstitutes.filter((item) => item !== value)
      );
    } else {
      setSelectedInstitutes([...selectedInstitutes, value]);
    }
  };

  const handleBatchYearChange = (e) => {
    const value = e.target.value;
    if (selectedBatchYear.includes(value)) {
      setSelectedBatchYear(selectedBatchYear.filter((item) => item !== value));
    } else {
      setSelectedBatchYear([...selectedBatchYear, value]);
    }
  };

  const handleBatchChange = (e) => {
    const value = e.target.value;
    if (selectedBatch.includes(value)) {
      setSelectedBatch(selectedBatch.filter((item) => item !== value));
    } else {
      setSelectedBatch([...selectedBatch, value]);
    }
  };

  const [Regdid, setRegdid] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userNumber, setuserNumber] = useState("");
  const [BatchYear, setBatchYear] = useState("");
  const [SelectBatch, setSelectBatch] = useState("");
  const [InstituteType, setInstituteType] = useState("");
  const [AxiosPlans, setAxiosPlans] = useState("");
  const [Password, setPassword] = useState("");
  const [ExpiryDate, setExpiryDate] = useState("");

  const [data1, setdata1] = useState([]);
  console.log(FirstName);
  const AddInstitute = {
    Regdid: Regdid,
    FirstName: FirstName,
    LastName: LastName,
    userEmail: userEmail,
    userNumber: userNumber,
    BatchYear: BatchYear,
    SelectBatch: SelectBatch,
    InstituteType: InstituteType,
    AxiosPlans: AxiosPlans,
    Password: Password,
    ExpiryDate: ExpiryDate,
  };
  console.log(FirstName);
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (
      Regdid &&
      FirstName &&
      LastName &&
      userEmail &&
      userNumber &&
      BatchYear &&
      SelectBatch &&
      InstituteType &&
      AxiosPlans &&
      Password &&
      ExpiryDate !== ""
    ) {
      const headers = {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk",
      };
      axios
        .post(`${apiList.AddUsers}`, AddInstitute, {
          headers,
        })
        .then((response) => {
          setdata1(response.data);

          console.log(response.data);
          if (response.status === 200) {
            toast.success("Save Data Successfull", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setTimeout(function () {}, 3000);
            fetchblogs();
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      toast.warning("Enter the Required Details");
    }
  };
  console.log(data1);

  console.log(FirstName);

  //By-Batch
  const AddInstitute1 = {
    BatchYear: BatchYear,
    SelectBatch: SelectBatch,
    InstituteType: InstituteType,
    AxiosPlans: AxiosPlans,
  };
  console.log(FirstName);
  const onSubmitForm1 = (e) => {
    e.preventDefault();
    if (
      // Regdid &&
      // FirstName &&
      // LastName &&
      // userEmail &&
      // userNumber &&
      BatchYear &&
      SelectBatch &&
      InstituteType &&
      AxiosPlans !== ""
      // Password &&
      // ExpiryDate !== ""
    ) {
      console.log(`${apiList.ByBatchData}/${InstituteType}`);
      const headers = {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk",
      };
      axios
        .put(
          `${apiList.ByBatchData}/${InstituteType}`,
          AddInstitute1,
          {
            headers,
          }
        )
        .then((response) => {
          setdata1(response.data);

          console.log(response.data);
          if (response.status === 200) {
            toast.success("Access Updated Successfully For 7 Users", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setTimeout(function () {}, 3000);
            fetchblogs();
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      toast.warning("Enter the Required Details");
    }
  };
  console.log(data1);

  const [aboveData, setaboveData] = useState("");
  const [institutionpara, setinstitutionpara] = useState("");
  const [state1, setState1] = useState("");
  console.log(state1);
  //By-LIst
  const AddInstitute2 = {
    aboveData: aboveData,
    institutionpara: institutionpara,
    InstituteType: InstituteType,
    AxiosPlans: AxiosPlans,
  };
  console.log(FirstName);
  const onSubmitForm2 = (e) => {
    e.preventDefault();
    if (
      // Regdid &&
      // FirstName &&
      // LastName &&
      // userEmail &&
      // userNumber &&
      aboveData &&
      institutionpara &&
      InstituteType &&
      AxiosPlans !== ""
      // Password &&
      // ExpiryDate !== ""
    ) {
      const headers = {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk",
      };
      axios
        .put(
          `${apiList.ByListData}/${InstituteType}`,
          AddInstitute2,
          {
            headers,
          }
        )
        .then((response) => {
          setdata1(response.data);

          console.log(response.data);
          if (response.status === 200) {
            toast.success("Save Data Successfull", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setTimeout(function () {}, 3000);
            fetchblogs();
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      toast.warning("Enter the Required Details");
    }
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleDownloadFormat = () => {
    // Check if a file is selected
    if (selectedFile) {
      // Implement your file download logic here
      // For example, you can create a download link and trigger a click event
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(selectedFile);
      downloadLink.download = "Institute.xlsx"; // Specify the desired file name
      downloadLink.click();
    } else {
      alert("Please select a file before downloading the format.");
    }
  };

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
      <div className="container-fluid ">
        <div className="row">
          <div className="">
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
                <div className="d-lg-block">
                  <i
                    className="fa-solid fa-bars bars  d-lg-block d-none"
                    onClick={toggleSidebar}
                  ></i>
                  <div class="">
                    <div className="batch_card section-31 p-2">
                      <div className="row">
                        <div className="col-md-4">
                          <h4 className="">Learning Path Access</h4>
                        </div>
                        <div className="col-md-8 text-end">
                          <div style={{ marginLeft: "auto" }} class="m-2">
                            <div>
                              <button
                                style={{
                                  border: "none",
                                  backgroundColor: "white",
                                }}
                                className=""
                              >
                                {/* <i
                                  type="button"
                                  class="material-symbols-outlined "
                                  data-bs-toggle="modal"
                                  data-bs-target="#myModal23"
                                >
                                  edit_square
                                </i> */}
                                {/* <b class="resumeh7 row mx-3">+Add</b> */}
                              </button>
                              <ToastContainer
                                position="top-right"
                                autoClose={1000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="colored"
                              />

                              <div class="modal" id="myModal23">
                                <div class="modal-dialog ">
                                  <div class="modal-content text-start">
                                    {/* <!-- Modal Header --> */}
                                    <div class="modal-header">
                                      <div className="d-flex flex-row">
                                        <button
                                          style={{
                                            border: "none",
                                            borderRadius: "6px",
                                          }}
                                          className={`p-1 m-2 ${
                                            showSingleUserForm
                                              ? "bg-primary"
                                              : ""
                                          }`}
                                          onClick={handleSingleUserButtonClick}
                                        >
                                          Single User
                                        </button>
                                        <button
                                          style={{
                                            border: "none",
                                            borderRadius: "6px",
                                          }}
                                          className={`p-1 m-2 ${
                                            showMultipleUserForm
                                              ? "bg-primary"
                                              : ""
                                          }`}
                                          onClick={
                                            handleMultipleUserButtonClick
                                          }
                                        >
                                          Multiple User
                                        </button>
                                      </div>
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                      ></button>
                                    </div>

                                    {showSingleUserForm && (
                                      <div class="modal-body">
                                        <form action="" onSubmit={onSubmitForm}>
                                          <div className="row">
                                            <div className="col-12 col-md-4 ">
                                              <label className="headingAdd">
                                                Institution :
                                              </label>

                                              {/* <div className="">
                                            <select
                                              name=""
                                              id=""
                                              className="p-2"
                                              onChange={(e) =>
                                                setInstituteType(e.target.value)
                                              }
                                            >
                                              <option value="SelectInstitutions">
                                                ---Select Institutions---
                                              </option>
                                              {addInstitutelist.map(
                                                (institute) => (
                                                  <option
                                                    key={institute.id}
                                                    value={
                                                      institute.InstituteName
                                                    }
                                                  >
                                                    {institute.InstituteName}
                                                  </option>
                                                )
                                              )}
                                            </select>
                                          </div> */}
                                              <div className="">
                                                <select
                                                  name=""
                                                  id=""
                                                  className="p-2 form-control"
                                                  onChange={(e) =>
                                                    setInstituteType(
                                                      e.target.value
                                                    )
                                                  }
                                                >
                                                  <option value="SelectInstitutions">
                                                    ---Select Institutions---
                                                  </option>
                                                  {addInstitutelist.map(
                                                    (institute) => (
                                                      <option
                                                        key={institute.id}
                                                        value={
                                                          institute.InstituteName
                                                        }
                                                      >
                                                        {
                                                          institute.InstituteName
                                                        }
                                                      </option>
                                                    )
                                                  )}
                                                </select>
                                              </div>
                                            </div>
                                            <div className="col-12 col-md-4 ">
                                              <label className="headingAdd">
                                                Batch Year :
                                              </label>

                                              <div className=" ">
                                                <select
                                                  name=""
                                                  id=""
                                                  className=" p-2 form-control"
                                                  onChange={(e) =>
                                                    setBatchYear(e.target.value)
                                                  }
                                                >
                                                  <option value="Select Batch Year">
                                                    ---Select Batch Year---
                                                  </option>
                                                  {addInstitutelist.map(
                                                    (institute) => (
                                                      <option
                                                        key={institute.id}
                                                        value={
                                                          institute.BatchYear
                                                        }
                                                      >
                                                        {institute.BatchYear}
                                                      </option>
                                                    )
                                                  )}
                                                </select>
                                              </div>
                                            </div>
                                            <div className="col-12 col-md-4 ">
                                              <label className="headingAdd">
                                                Batch :
                                              </label>

                                              <div className="">
                                                <select
                                                  name=""
                                                  id=""
                                                  className="p-2 form-control"
                                                  onChange={(e) =>
                                                    setSelectBatch(
                                                      e.target.value
                                                    )
                                                  }
                                                >
                                                  <option value="Select Batch">
                                                    ---Select Batch---
                                                  </option>
                                                  {addInstitutelist.map(
                                                    (institute) => (
                                                      <option
                                                        key={institute.id}
                                                        value={
                                                          institute.SelectBatch
                                                        }
                                                      >
                                                        {institute.SelectBatch}
                                                      </option>
                                                    )
                                                  )}
                                                </select>
                                              </div>
                                            </div>
                                          </div>
                                          <br />

                                          <div className="row">
                                            <div className="col-12 col-md-6">
                                              <label className="headingAdd">
                                                First Name :
                                              </label>
                                              <br />
                                              <input
                                                type="text"
                                                className="etotal form-control p-2"
                                                style={{
                                                  border: "1px solid black",
                                                }}
                                                placeholder="Enter  First Name "
                                                onChange={(e) =>
                                                  setFirstName(e.target.value)
                                                }
                                                value={FirstName}
                                              />
                                            </div>
                                            <div className="col-12 col-md-6">
                                              <label className="headingAdd">
                                                Last Name :
                                              </label>
                                              <br />
                                              <input
                                                type="text"
                                                className="etotal form-control p-2"
                                                style={{
                                                  border: "1px solid black",
                                                }}
                                                placeholder="Enter Last Name"
                                                onChange={(e) =>
                                                  setLastName(e.target.value)
                                                }
                                                value={LastName}
                                              />
                                            </div>
                                          </div>
                                          <br />
                                          <div className="col-12 col-md-12">
                                            <label className="headingAdd">
                                              Email :
                                            </label>
                                            <br />
                                            <input
                                              type="text"
                                              className="etotal form-control p-2 "
                                              style={{
                                                border: "1px solid black",
                                              }}
                                              placeholder="Enter Email"
                                              onChange={(e) =>
                                                setuserEmail(e.target.value)
                                              }
                                              value={userEmail}
                                            />
                                          </div>
                                          <br />

                                          <div className="row">
                                            <div className="col-12 col-md-6">
                                              <label className="headingAdd">
                                                Regd Id :
                                              </label>
                                              <br />
                                              <input
                                                type="text"
                                                className="etotal form-control p-2"
                                                style={{
                                                  border: "1px solid black",
                                                }}
                                                placeholder="Enter Regd Id/Hallticket No"
                                                onChange={(e) =>
                                                  setRegdid(e.target.value)
                                                }
                                                value={Regdid}
                                              />
                                            </div>
                                            <div className="col-12 col-md-6 ">
                                              <label className="headingAdd">
                                                Mobile No :
                                              </label>
                                              <br />
                                              <input
                                                type="text"
                                                className="etotal form-control p-2"
                                                style={{
                                                  border: "1px solid black",
                                                }}
                                                placeholder="Enter Mobile No"
                                                onChange={(e) =>
                                                  setuserNumber(e.target.value)
                                                }
                                                value={userNumber}
                                              />
                                            </div>
                                          </div>
                                          <br />

                                          <div className="row">
                                            <div className="col-12 col-md-6 ">
                                              <label className="headingAdd">
                                                Password :
                                              </label>
                                              <br />
                                              <input
                                                type="text"
                                                className="etotal form-control p-2"
                                                style={{
                                                  border: "1px solid black",
                                                }}
                                                placeholder="Enter Password"
                                                onChange={(e) =>
                                                  setPassword(e.target.value)
                                                }
                                                value={Password}
                                              />
                                            </div>
                                            <div className="col-12 col-md-6 ">
                                              <label className="headingAdd">
                                                Access Period :
                                              </label>
                                              <br />

                                              <select
                                                name=""
                                                id=""
                                                onChange={(e) =>
                                                  setAxiosPlans(e.target.value)
                                                }
                                                value={AxiosPlans}
                                                className="Typesection p-2 w-100 form-control"
                                              >
                                                <option value="3 Months">
                                                  -- Select Access Period --
                                                </option>
                                                <option
                                                  value="Exam Practice1"
                                                  onChange={(e) =>
                                                    setAxiosPlans(
                                                      e.target.value
                                                    )
                                                  }
                                                >
                                                  3 Months
                                                </option>
                                                <option
                                                  value="6 Months"
                                                  onChange={(e) =>
                                                    setAxiosPlans(
                                                      e.target.value
                                                    )
                                                  }
                                                >
                                                  6 Months
                                                </option>
                                                <option
                                                  value="9 Months"
                                                  onChange={(e) =>
                                                    setAxiosPlans(
                                                      e.target.value
                                                    )
                                                  }
                                                >
                                                  9 Months
                                                </option>
                                                <option
                                                  value="12 Months"
                                                  onChange={(e) =>
                                                    setAxiosPlans(
                                                      e.target.value
                                                    )
                                                  }
                                                >
                                                  12 Months
                                                </option>
                                              </select>
                                            </div>
                                          </div>
                                          <div className="col-12 col-md-6">
                                            <label className="headingAdd mt-3">
                                              Expired Date :
                                            </label>
                                            <br />
                                            <input
                                              type="Date"
                                              className="etotal p-2 form-control"
                                              style={{
                                                border: "1px solid black",
                                              }}
                                              placeholder="Enter Expired Date"
                                              onChange={(e) =>
                                                setExpiryDate(e.target.value)
                                              }
                                              value={ExpiryDate}
                                            />
                                          </div>

                                          <div class="modal-footer mt-3">
                                            <button
                                              type="submit"
                                              class="btn adduserdata"
                                              data-bs-dismiss="modal"
                                            >
                                              Add Users
                                            </button>
                                          </div>
                                        </form>
                                      </div>
                                    )}

                                    {showMultipleUserForm && (
                                      <div class="modal-body">
                                        <div className="d-flex justify-content-between">
                                          <h5>Upload Users</h5>
                                          <div className=" text-end">
                                            <button
                                              className="bg-warning  text-white"
                                              style={{
                                                border: "none",
                                                borderRadius: "6px",
                                                padding: "7px 20px",
                                              }}
                                              onClick={handleDownloadFormat}
                                            >
                                              <i
                                                class="fa-solid fa-download"
                                                style={{ color: "white" }}
                                              ></i>{" "}
                                              Download Format
                                            </button>
                                          </div>
                                        </div>
                                        <form action="" onSubmit={onSubmitForm}>
                                          <div className="row">
                                            <div className="col-12 col-md-4 ">
                                              <label className="headingAdd">
                                                Institution :
                                              </label>

                                              <div className="">
                                                <select
                                                  name=""
                                                  id=""
                                                  className="p-2 form-control"
                                                  onChange={(e) =>
                                                    setInstituteType(
                                                      e.target.value
                                                    )
                                                  }
                                                >
                                                  <option value="SelectInstitutions">
                                                    ---Select Institutions---
                                                  </option>
                                                  {addInstitutelist.map(
                                                    (institute) => (
                                                      <option
                                                        key={institute.id}
                                                        value={
                                                          institute.InstituteName
                                                        }
                                                      >
                                                        {
                                                          institute.InstituteName
                                                        }
                                                      </option>
                                                    )
                                                  )}
                                                </select>
                                              </div>
                                            </div>
                                            <div className="col-12 col-md-4 ">
                                              <label className="headingAdd">
                                                Batch Year :
                                              </label>

                                              <div className=" ">
                                                <select
                                                  name=""
                                                  id=""
                                                  className=" p-2 form-control"
                                                  onChange={(e) =>
                                                    setBatchYear(e.target.value)
                                                  }
                                                >
                                                  <option value="Select Batch Year">
                                                    ---Select Batch Year---
                                                  </option>
                                                  {addInstitutelist.map(
                                                    (institute) => (
                                                      <option
                                                        key={institute.id}
                                                        value={
                                                          institute.BatchYear
                                                        }
                                                      >
                                                        {institute.BatchYear}
                                                      </option>
                                                    )
                                                  )}
                                                </select>
                                              </div>
                                            </div>
                                            <div className="col-12 col-md-4 ">
                                              <label className="headingAdd">
                                                Batch :
                                              </label>

                                              <div className="">
                                                <select
                                                  name=""
                                                  id=""
                                                  className="p-2 form-control"
                                                  onChange={(e) =>
                                                    setSelectBatch(
                                                      e.target.value
                                                    )
                                                  }
                                                >
                                                  <option value="Select Batch">
                                                    ---Select Batch---
                                                  </option>
                                                  {addInstitutelist.map(
                                                    (institute) => (
                                                      <option
                                                        key={institute.id}
                                                        value={
                                                          institute.SelectBatch
                                                        }
                                                      >
                                                        {institute.SelectBatch}
                                                      </option>
                                                    )
                                                  )}
                                                </select>
                                              </div>
                                            </div>
                                          </div>
                                          <br />
                                          <div className="row">
                                            <div className="col-12 col-md-6 mt-2">
                                              <label className="headingAdd">
                                                Access Period :
                                              </label>
                                              <br />

                                              <select
                                                name=""
                                                id=""
                                                onChange={(e) =>
                                                  setAxiosPlans(e.target.value)
                                                }
                                                value={AxiosPlans}
                                                className="Typesection form-control p-2 "
                                              >
                                                <option value="3 Months">
                                                  -- Select Access Period --
                                                </option>
                                                <option
                                                  value="Exam Practice"
                                                  onChange={(e) =>
                                                    setAxiosPlans(
                                                      e.target.value
                                                    )
                                                  }
                                                >
                                                  3 Months
                                                </option>
                                                <option
                                                  value="6 Months"
                                                  onChange={(e) =>
                                                    setAxiosPlans(
                                                      e.target.value
                                                    )
                                                  }
                                                >
                                                  6 Months
                                                </option>
                                                <option
                                                  value="9 Months"
                                                  onChange={(e) =>
                                                    setAxiosPlans(
                                                      e.target.value
                                                    )
                                                  }
                                                >
                                                  9 Months
                                                </option>
                                                <option
                                                  value="12 Months"
                                                  onChange={(e) =>
                                                    setAxiosPlans(
                                                      e.target.value
                                                    )
                                                  }
                                                >
                                                  12 Months
                                                </option>
                                              </select>
                                            </div>
                                            <div className="col-12 col-md-6 mt-2">
                                              <label className="headingAdd">
                                                Users File:
                                              </label>
                                              <br />
                                              <input
                                                type="file"
                                                className="etotal p-2 form-control"
                                                style={{
                                                  border: "1px solid black",
                                                }}
                                                placeholder="Enter Password"
                                                onChange={handleFileChange}
                                                accept=".xls, .xlsx" // Limit file selection to Excel files
                                              />
                                            </div>
                                          </div>

                                          <div class="modal-footer mt-5">
                                            <button
                                              type="submit"
                                              class="btn adduserdata"
                                              data-bs-dismiss="modal"
                                            >
                                              Add Users
                                            </button>
                                          </div>
                                        </form>
                                      </div>
                                    )}

                                    {/* <!-- Modal footer --> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-5">
                            {/* <button
                              className="extends12 p-2 bg-secoundary"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal2"
                            >
                              {" "}
                              <i class="fa-solid fa-plus"></i> Extende Users
                            </button> */}

                            <div class="modal" id="myModal2">
                              <div class="modal-dialog ">
                                <div class="modal-content">
                                  {/* <!-- Modal Header --> */}
                                  <div class="modal-header">
                                    <div className="d-flex flex-row">
                                      <button
                                        style={{
                                          border: "none",
                                          borderRadius: "6px",
                                        }}
                                        className={`p-1 m-2 ${
                                          showSingleUserForm ? "bg-primary" : ""
                                        }`}
                                        onClick={handleSingleUserButtonClick}
                                      >
                                        By Batch
                                      </button>
                                      <button
                                        style={{
                                          border: "none",
                                          borderRadius: "6px",
                                        }}
                                        className={`p-1 m-2 ${
                                          showMultipleUserForm
                                            ? "bg-primary"
                                            : ""
                                        }`}
                                        onClick={handleMultipleUserButtonClick}
                                      >
                                        By List
                                      </button>
                                    </div>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                    ></button>
                                  </div>

                                  {showSingleUserForm && (
                                    <div class="modal-body text-start">
                                      <form action="" onSubmit={onSubmitForm1}>
                                        <div className="row">
                                          <div className="col-12 col-md-4 ">
                                            <label className="headingAdd">
                                              Institution :
                                            </label>

                                            <div className="">
                                              <select
                                                name=""
                                                id=""
                                                className="p-2 form-control"
                                                onChange={(e) =>
                                                  setInstituteType(
                                                    e.target.value
                                                  )
                                                }
                                              >
                                                <option value="SelectInstitutions">
                                                  ---Select Institutions---
                                                </option>
                                                {addInstitutelist.map(
                                                  (institute) => (
                                                    <option
                                                      key={institute.id}
                                                      value={
                                                        institute.InstituteName
                                                      }
                                                    >
                                                      {institute.InstituteName}
                                                    </option>
                                                  )
                                                )}
                                              </select>
                                            </div>
                                          </div>
                                          <div className="col-12 col-md-4 ">
                                            <label className="headingAdd">
                                              Batch Year :
                                            </label>

                                            <div className=" ">
                                              <select
                                                name=""
                                                id=""
                                                className=" p-2 form-control"
                                                onChange={(e) =>
                                                  setBatchYear(e.target.value)
                                                }
                                              >
                                                <option value="Select Batch Year">
                                                  ---Select Batch Year---
                                                </option>
                                                {addInstitutelist.map(
                                                  (institute) => (
                                                    <option
                                                      key={institute.id}
                                                      value={
                                                        institute.BatchYear
                                                      }
                                                    >
                                                      {institute.BatchYear}
                                                    </option>
                                                  )
                                                )}
                                              </select>
                                            </div>
                                          </div>
                                          <div className="col-12 col-md-4 ">
                                            <label className="headingAdd">
                                              Batch :
                                            </label>

                                            <div className="">
                                              <select
                                                name=""
                                                id=""
                                                className="p-2 form-control"
                                                onChange={(e) =>
                                                  setSelectBatch(e.target.value)
                                                }
                                              >
                                                <option value="Select Batch">
                                                  ---Select Batch---
                                                </option>
                                                {addInstitutelist.map(
                                                  (institute) => (
                                                    <option
                                                      key={institute.id}
                                                      value={
                                                        institute.SelectBatch
                                                      }
                                                    >
                                                      {institute.SelectBatch}
                                                    </option>
                                                  )
                                                )}
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                        <br />

                                        <div className="col-12 col-md-6  ">
                                          <label className="headingAdd">
                                            Access Period :
                                          </label>
                                          <br />

                                          <select
                                            name=""
                                            id=""
                                            onChange={(e) =>
                                              setAxiosPlans(e.target.value)
                                            }
                                            value={AxiosPlans}
                                            className="Typesection form-control p-2 "
                                          >
                                            <option value="Exam Practice">
                                              -- Select Access Period --
                                            </option>
                                            <option
                                              value="3 Months"
                                              onChange={(e) =>
                                                setAxiosPlans(e.target.value)
                                              }
                                            >
                                              3 Months
                                            </option>
                                            <option
                                              value="6 Months"
                                              onChange={(e) =>
                                                setAxiosPlans(e.target.value)
                                              }
                                            >
                                              6 Months
                                            </option>
                                            <option
                                              value="9 Months"
                                              onChange={(e) =>
                                                setAxiosPlans(e.target.value)
                                              }
                                            >
                                              9 Months
                                            </option>
                                            <option
                                              value="12 Months"
                                              onChange={(e) =>
                                                setAxiosPlans(e.target.value)
                                              }
                                            >
                                              12 Months
                                            </option>
                                          </select>
                                        </div>
                                        <div className="col-12 col-md-12">
                                          <div
                                            class="modal-footer1 mt-3"
                                            style={{ textAlign: "center" }}
                                          >
                                            <button
                                              type="submit"
                                              class=" adduserdata"
                                              data-bs-dismiss="modal"
                                            >
                                              Extend Users
                                            </button>
                                            <p
                                              className=" mt-2"
                                              style={{
                                                color: "orange",
                                                fontWeight: "500",
                                                fontSize: "12px",
                                              }}
                                            >
                                              Note:Extending Users Access is a
                                              irreverible action. Please
                                              Continue with care
                                            </p>
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  )}

                                  {showMultipleUserForm && (
                                    <div class="modal-body text-start">
                                      <form action="" onSubmit={onSubmitForm2}>
                                        <div className="row">
                                          <div className="col-12 col-md-6 ">
                                            <label className="headingAdd">
                                              Institution :
                                            </label>

                                            <div className="">
                                              <select
                                                name=""
                                                id=""
                                                className="p-2 form-control"
                                                onChange={(e) =>
                                                  setInstituteType(
                                                    e.target.value
                                                  )
                                                }
                                              >
                                                <option value="SelectInstitutions">
                                                  ---Select Institutions---
                                                </option>
                                                {addInstitutelist.map(
                                                  (institute) => (
                                                    <option
                                                      key={institute.id}
                                                      value={
                                                        institute.InstituteName
                                                      }
                                                    >
                                                      {institute.InstituteName}
                                                    </option>
                                                  )
                                                )}
                                              </select>
                                            </div>
                                          </div>

                                          <div className="col-12 col-md-6 ">
                                            <label className="headingAdd">
                                              Access Period :
                                            </label>
                                            <br />

                                            <select
                                              name=""
                                              id=""
                                              onChange={(e) =>
                                                setAxiosPlans(e.target.value)
                                              }
                                              value={AxiosPlans}
                                              className=" p-2 form-control "
                                            >
                                              <option value="Exam Practice">
                                                -- Select Access Period --
                                              </option>
                                              <option
                                                value="3 Months"
                                                onChange={(e) =>
                                                  setAxiosPlans(e.target.value)
                                                }
                                              >
                                                3 Months
                                              </option>
                                              <option
                                                value="6 Months"
                                                onChange={(e) =>
                                                  setAxiosPlans(e.target.value)
                                                }
                                              >
                                                6 Months
                                              </option>
                                              <option
                                                value="9 Months"
                                                onChange={(e) =>
                                                  setAxiosPlans(e.target.value)
                                                }
                                              >
                                                9 Months
                                              </option>
                                              <option
                                                value="12 Months"
                                                onChange={(e) =>
                                                  setAxiosPlans(e.target.value)
                                                }
                                              >
                                                12 Months
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                        <br />
                                        <div className="col-12 col-md-12">
                                          <label className="headingAdd">
                                            Institution :
                                          </label>
                                          <br />
                                          <textarea
                                            className="form-control p-3"
                                            name=""
                                            id=""
                                            rows="5"
                                            placeholder="Please all users seperated with :"
                                            onChange={(e) =>
                                              setinstitutionpara(e.target.value)
                                            }
                                            value={institutionpara}
                                          ></textarea>
                                        </div>

                                        <div className="col-12 col-md-12">
                                          <label className="headingAdd">
                                            is the above data :
                                          </label>
                                          <br />
                                          <div className="row">
                                            <div className="col-md-6">
                                              <input
                                                type="radio"
                                                id="html"
                                                onChange={(e) =>
                                                  setaboveData(e.target.value)
                                                }
                                                value="Emails?"
                                                name="aboveData"
                                              />

                                              <label
                                                for="html"
                                                value="Emails?"
                                                className="mx-3"
                                              >
                                                Emails?
                                              </label>
                                              <br />
                                            </div>
                                            <div className="col-md-6">
                                              <input
                                                type="radio"
                                                id="html"
                                                className="mx-3 shadow"
                                                name="aboveData"
                                                onChange={(e) =>
                                                  setaboveData(e.target.value)
                                                }
                                                value=" Hallticket/Regd,Numbers"
                                              />
                                              <label
                                                value="Hallticket/Regd,Numbers,"
                                                for="html"
                                              >
                                                Hallticket/Regd, Numbers
                                              </label>
                                              {/* <p for="html" className="mx-5">
                                            Numbers,
                                          </p> */}
                                              <br />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-12 col-md-12">
                                          <div
                                            class="modal-footer1 mt-3"
                                            style={{ textAlign: "center" }}
                                          >
                                            <button
                                              type="submit"
                                              class=" adduserdata"
                                              data-bs-dismiss="modal"
                                            >
                                              Extend Users
                                            </button>
                                            <p
                                              className=" mt-2"
                                              style={{
                                                color: "red",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              Note:Extending Users Access is a
                                              irreverible action. Please
                                              Continue with care
                                            </p>
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  )}

                                  {/* <!-- Modal footer --> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="p-2 col-md-3">
                          <select
                            name=""
                            id=""
                            className="form-control"
                            onChange={handleCheckboxChange}
                          >
                            <option value="Select Institutions">
                              Select Institutions
                            </option>
                            {addInstitutelist.map((institute) => (
                              <option
                                key={institute.id}
                                value={institute.InstituteName}
                              >
                                {institute.InstituteName}
                              </option>
                            ))}
                          </select>
                          {/* <h6 className="mx-2" style={{ fontWeight: "600" }}>
                            Select Institutions
                          </h6> */}
                        </div>

                        <div className="p-2 col-md-3">
                          <select
                            name=""
                            id=""
                            className="form-control"
                            onChange={handleBatchYearChange}
                          >
                            <option value="Select Batch Year">
                              Select Batch Year
                            </option>
                            {addInstitutelist.map((institute) => (
                              <option
                                key={institute.id}
                                value={institute.BatchYear}
                              >
                                {institute.BatchYear}
                              </option>
                            ))}
                          </select>
                          {/* <h6 className="mx-2" style={{ fontWeight: "600" }}>
                            Select Batch Year
                          </h6> */}
                        </div>

                        {/* Batch filter */}
                        <div className="p-2 col-md-3">
                          <select
                            name=""
                            id=""
                            className="form-control"
                            onChange={handleBatchChange}
                          >
                            <option value="Select Batch">Select Batch</option>
                            {addInstitutelist.map((institute) => (
                              <option
                                key={institute.id}
                                value={institute.SelectBatch}
                              >
                                {institute.SelectBatch}
                              </option>
                            ))}
                          </select>
                          {/* <h6 className="mx-2" style={{ fontWeight: "600" }}>
                            Select Batch
                          </h6> */}
                        </div>

                        <div className="col-md-3">
                          <button
                            className="p-2 selectbtn1 mx-2"
                            onClick={filterJobs}
                          >
                            Search
                          </button>
                          <Link to="/Learn">
                            <button className="create_btn1">Back</button>
                          </Link>
                        </div>
                      </div>
                      <br />

                      <div className="">
                        <div className="col-lg-12">
                          <div className="table-responsive">
                            <table className="table table-striped text-center">
                              <thead>
                                <tr className="table-dark">
                                  <th>S.NO</th>
                                  <th>INSTITUTION NAME</th>
                                  <th>BATCH YEAR</th>
                                  <th>BATCH</th>
                                  <th>ACCESS</th>
                                </tr>
                              </thead>
                              {isFiltered ? (
                                <tbody>
                                  {addblogslist.map((blog, index) => (
                                    <tr key={blog.id}>
                                      <td>{index + 1}</td>
                                      <td>{blog.InstituteType}</td>
                                      <td>{blog.BatchYear}</td>
                                      <td>{blog.SelectBatch}</td>

                                      <td className="text-center">
                                        <ToastContainer
                                          position="top-right"
                                          autoClose={1000}
                                          hideProgressBar={false}
                                          newestOnTop={false}
                                          closeOnClick
                                          rtl={false}
                                          pauseOnFocusLoss
                                          draggable
                                          pauseOnHover
                                          theme="colored"
                                        />
                                        <a
                                          href="./ShowData"
                                          style={{ color: "black" }}
                                        >
                                          <Link to={`/ShowData/${blog._id}`}>
                                            {/* <span
                                              className="material-symbols-outlined "
                                              style={{
                                                backgroundColor: "#04386b",
                                                padding: "3px",
                                                borderRadius: "5px",
                                                color: "#fff",
                                              }}
                                            >
                                              visibility
                                            </span> */}
                                            <span
                                              class="material-symbols-outlined"
                                              style={{
                                                backgroundColor: "#04386b",
                                                padding: "3px",
                                                borderRadius: "5px",
                                                color: "#fff",
                                              }}
                                            >
                                              check_box
                                            </span>
                                          </Link>
                                        </a>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              ) : (
                                <div>
                                  {/* Display a "No Data" message when no data is found */}
                                  No Data Found
                                </div>
                              )}
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessPage;
