import React from "react";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Audio } from "react-loader-spinner";
import apiList from "../liberary/apiList";
import Cookies from "js-cookie";

const Access = () => {
  const token = Cookies.get("token");
  const {id} = useParams();
  const navigate = useNavigate();
  const [addblogslist, setAddblogslist] = useState([]);
  const [addInstitutelist, setInstitutelist] = useState([]);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showInstitutionsOptions, setShowInstitutionsOptions] = useState(false);
  const [selectedInstitutes, setSelectedInstitutes] = useState("");
  const [selectedBatchYear, setSelectedBatchYear] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

  const [showSingleUserForm, setShowSingleUserForm] = useState(true);
  const [showMultipleUserForm, setShowMultipleUserForm] = useState(false);
  const [worksheetLoading, setWorksheetLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [filteredData, setFilteredData] = useState(addblogslist);

  const handleSingleUserButtonClick = () => {
    setShowSingleUserForm(true);
    setShowMultipleUserForm(false);
  };

  const handleMultipleUserButtonClick = () => {
    setShowSingleUserForm(false);
    setShowMultipleUserForm(true);
  };

  const [error, setError] = useState(null);

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
    const api = `${apiList.allAddInstitutes}`;
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk";
    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setAddblogslist(response.data);
      setWorksheetLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setWorksheetLoading(false);
    }
  };

  const filterJobs = () => {
    const filteredInstitutes = addblogslist.filter(
      (institute) =>
        selectedInstitutes.includes(institute.InstituteName) &&
        selectedBatchYear.includes(institute.BatchYear) &&
        selectedBatch.includes(institute.SelectBatch)
    );
    setIsFiltered(filteredInstitutes.length > 0);
    setAddblogslist(filteredInstitutes);
    console.log(filteredInstitutes);

    // Print the count of filtered jobs to the console
    console.log("Number of filtered jobs:", filteredInstitutes.length);
    console.log(addInstitutelist, addblogslist);
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

  //By-Batch

  const [aboveData, setaboveData] = useState("");
  const [institutionpara, setinstitutionpara] = useState("");
  const [state1, setState1] = useState("");
  console.log(state1);
  //By-LIst

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

  const [selectedRows, setSelectedRows] = useState([]);
  const [Access, setAccess] = useState("Off");
  const handleCheckboxChange2 = (rowId, batchyearId, batchId) => {
    console.log("Check EVENT", rowId, batchyearId, batchId);
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(batchId)) {
        setAccess("On");
        return prevSelectedRows.filter((id) => id !== batchId);
      } else {
        setAccess("Off")
        return [...prevSelectedRows, batchId];
      
      }
    });
    const AddAccessGiven = {
      Access: Access,
      LearnpathId:id,
    };
    console.log(AddAccessGiven);
    axios
      .post(
        `${apiList.AccessGiven}/${rowId}/${batchyearId}/${batchId}`,
        AddAccessGiven,
        {
          headers: {
            token: token,
          },
        }
      )
      .then((response) => {
        setdata1(response.data);
        console.log(response.data);
        if (response.status === 200) {
          toast("Access Updated Successfully", {
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
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast("");
        } else {
          console.log(error.message);
          setError("An error occured while creating FolderPath.");
        }
      });
  };
  const handleSearch = () => {
    let filtered;
    if (selectedOption && selectedOption !== "0") {
      filtered = addblogslist.slice(0, parseInt(selectedOption, 10));
    } else {
      filtered = addblogslist;
    }

    setFilteredData(filtered);
  };
  useEffect(() => {
    handleSearch();
  }, [selectedOption, addblogslist]);

  const columns = [
    { field: "SNO", headerName: "S.No", width: 120 },
    { field: "INSTITUTENAME", headerName: "Institute Name", width: 260 },
    { field: "BATCHYEAR", headerName: "Batch Year", width: 260 },
    { field: "BATCH", headerName: "Batch", width: 260 },
    {
      field: "ACCESS",
      headerName: "Access",
      width: 557,
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(params.row.batchId)}
          onClick={() =>
            handleCheckboxChange2(
              params.row._id,
              params.row.batchyearId,
              params.row.batchId
            )
          }
          style={{ transform: "scale(1.5)" }}
        />
      ),
    },
  ];

  const renderActionButtons = (blog) => <div></div>;
  let cnt = 0;
  const rows = addInstitutelist.flatMap((blog, index) =>
    blog.InstituteBatchYear.flatMap((batchYear) => {
      const batches = batchYear.InsituteBatch.map((batch) => {
        cnt++;
        return {
          id: cnt,
          SNO: cnt,
          INSTITUTENAME: blog.InstituteName,
          BATCHYEAR: batchYear.BatchYear,
          BATCH: batch.Batch,
          ACCESS: renderActionButtons(blog),
          _id: blog._id,
          batchyearId: batchYear._id,
          batchId: batch._id,
        };
      });
      return batches;
    })
  );

  const selectedRows2 = () => {
    const ischecked = addblogslist.flatMap((blog) =>
      blog.InstituteBatchYear.flatMap((batchYear) =>
        batchYear.InsituteBatch.filter(
          (batch) => batch.LearningPathAccess.some(each=> each.Access === "On" && each.LearningpathId === id)
        ).map((batch) => batch._id)
      )
    );
    setSelectedRows(ischecked);
  };
  useEffect(() => {
    selectedRows2();
  }, [addblogslist]);

  return (
    <div>
      <div className="container-fluid ">
        <div className="row">
          {isOpen && (
            <div className=" col-12 col-lg-3 col-md-12 sectioncard121">
              <Sidebar />
              <ToastContainer />
            </div>
          )}
          <div
            className={`my-3 col-12 col-md-${isOpen ? 12 : 10} col-lg-${
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
              <div className="d-lg-block">
                <i
                  className="fa-solid fa-bars bars  d-lg-block d-none"
                  onClick={toggleSidebar}
                ></i>
                <div className="card-item p-4">
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <h4 className="">Access</h4>
                    </div>
                    <div className="col-md-8 text-end">
                      <div style={{ marginLeft: "auto" }} class="m-2">
                        <div></div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {/* <div className="col-md-3">
                      <select
                        name=""
                        id=""
                        className="form-control"
                        onChange={handleCheckboxChange}
                        placeholder="---Select Institutions---"
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
                      <h6 className="mt-2" style={{ fontWeight: "600" }}>
                        Institution
                      </h6>
                    </div>

                    <div className="col-md-3">
                      <select
                        name=""
                        id=""
                        className="form-control"
                        onChange={handleBatchYearChange}
                      >
                        <option value="Select Batch Year">
                          Select Batch Year
                        </option>
                        {addInstitutelist.map((institute) =>
                          institute?.InstituteBatchYear?.map((year) => (
                            <option key={year.id} value={year._id}>
                              {year.BatchYear}
                            </option>
                          ))
                        )}
                      </select>
                      <h6 className="mt-2" style={{ fontWeight: "600" }}>
                        Batch Year
                      </h6>
                    </div>
                    <div className="col-md-3">
                      <select
                        name=""
                        id=""
                        className="form-control"
                        onChange={handleBatchChange}
                      >
                        <option value="Select Batch">Select Batch</option>
                        {addInstitutelist.map((institute) =>
                          institute?.InstituteBatchYear?.map((year) =>
                            year?.InsituteBatch?.map((each) => (
                              <option key={year.id} value={each._id}>
                                {each.Batch}
                              </option>
                            ))
                          )
                        )}
                      </select>
                      <h6 className="mt-2" style={{ fontWeight: "600" }}>
                        Batch
                      </h6>
                    </div>

                    <div className="col-md-3">
                      <button
                        className="btn btn-dark"
                        style={{
                          backgroundColor: "#16c3ea",
                          border: "none",
                          color: "#000",
                        }}
                        onClick={filterJobs}
                      >
                        Search
                      </button>
                    </div> */}
                  </div>
                  <br />
                  <div style={{ height: "auto", width: "100%" }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Access;
