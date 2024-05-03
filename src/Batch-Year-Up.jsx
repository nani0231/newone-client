
import React, { useState, useEffect } from "react";
import axios from "axios";


import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import apiList from "./liberary/apiList";

const UpdateYear = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [individualInstitute, setIndividualInstitute] = useState({
    BatchYear: "",
  });

  const onSubmitForm = (e) => {
    e.preventDefault();

    const UserData = {
      BatchYear: individualInstitute.BatchYear,
    };

    axios
      .put(`${apiList.UpdateInstitute}/${id}`, UserData)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          toast.success("Update Successful", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(function () {
            navigate("/BatchYear");
          }, 3000);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred while updating the institute.");
        console.log(error.message);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(id);
      try {
        const response = await axios.get(
          `${apiList.allAddInstitutes}`
        ); // Replace with your API endpoint
        setIndividualInstitute(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
						<div className=" col-12 col-lg-3  col-md-12 sectioncard121">
							<Sidebar />
              <ToastContainer
                      position="top-center"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
						          className= "custom-toast-custom"
                    />
						</div>
					)}
          <div
						className={`my-3 col-12 col-md-${isOpen ? 12 : 9} col-lg-${
							isOpen ? 9 : 12
						}`}
            
					>
            <i
								className="fa-solid fa-bars bars d-lg-block d-none"
								onClick={toggleSidebar}
							></i>
<div className="">
          {loading ? (
            <p>Loading...</p>
          ) : individualInstitute ? (
            <div>
              <div className="modal-dialog ">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Edit Batch Years :</h4>
                    <br />
                    <Link to="/BatchYear">
                      <button type="button" className="btn-close"></button>
                    </Link>
                  </div>
                  <div className="modal-body text-start">
                    <form action="" onSubmit={onSubmitForm}>
                      <div className="col-12 col-md-6 m-2">
                        <label className="headingAdd">Batch Year :</label>
                        <br />
                        <input
                          type="text"
                          className="etotal"
                          style={{
                            border: "1px solid black",
                          }}
                          placeholder="Enter Batch Year"
                          value={individualInstitute.BatchYear}
                          onChange={(e) =>
                            setIndividualInstitute({
                              ...individualInstitute,
                              BatchYear: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* Add other form fields here */}
                      <div className="modal-footer mt-3">
                        <button type="submit" className="btn text-white" style={{backgroundColor: "#a5059d"}}>
                          Update
                        </button>
                      </div>
                      <p>{error}</p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Data not found</p>
          )}
        </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default UpdateYear;

