
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import './assement.css'
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import apiList from "../liberary/apiList";
function Basic1() {
    
  const [companyDetails, setCompanyDetails] = useState([]);
const navigate=useNavigate();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const options = {
          method: "GET",
        };

        const response = await fetch(
          `${apiList.allassessment}`, // Use extracted 'id'
          options
        );

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = await response.json();
        setCompanyDetails(data);

        console.log(data);
      } catch (error) {
        console.error("Error fetching Company Details:", error);
        // Handle errors here, such as setting an error state or displaying an error message
      }
    };

    fetchCompanyDetails();
  }, []);
    const [category, setCategory] = useState("");
    const [assessmentname, setAssessmentName] = useState("");
    const [nooftimes, setNoOfTimes] = useState("");
    const [assessmentpassword, setAssessmentPassword] = useState("");
    const [exametype, setExamType] = useState("");
    const [cutofftype, setCutoffType] = useState("");
    const [questionselection, setQuestionSelection] = useState("");
    const [assessmentreport, setAssessmentReport] = useState([]);
    const [assessmentflow, setAssessmentFlow] = useState("");
    const [assessmentadaptiveness, setAssessmentAdaptiveness] = useState("");
    const[blogslist,setAddblogslist] = useState([])
   
    
     
    const useData2 = {
        category: category,
        assessmentname: assessmentname,
        assessmentpassword: assessmentpassword,
        exametype: exametype,
        cutofftype: cutofftype,
        questionselection: questionselection,
        assessmentreport: assessmentreport,
        assessmentflow: assessmentflow,
        nooftimes: nooftimes,
        assessmentadaptiveness: assessmentadaptiveness

    };

    const onSubmitForm3 = (e, category) => {
        e.preventDefault();
       

        if (category, assessmentname, nooftimes, assessmentpassword, exametype, cutofftype, questionselection, assessmentreport, assessmentflow, assessmentadaptiveness !== "") {
            axios
                .post(`${apiList.assessment}`, useData2)
                .then((response) => {
                    if (response.status === 200) {
                        let jwtToken = response.data.token;
                        localStorage.setItem("token", jwtToken);

                        toast.success("Assessment create Successfull", {
                            position: "top-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                        navigate("/Assessmentpaper", {state : category})
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                    toast.error("Registration Failed");
                });
        } else {
            toast.warning("Enter the Required Details");
        }
    }

   
        return (
        <div>

            <div className='container'>
                <div className='row'>
                    <div className="col-md-12">
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
                     <form onSubmit={(e) => onSubmitForm3(e, category)}>

                            <div class="col-md-12">
                                <p className="mt-3">Category<span className="bcolor">*</span></p>
                                <input className="p-2 w-75 form-control" placeholder="select category" onChange={(e) => setCategory(e.target.value)}
                                    value={category} />

                                <div className="d-flex flex-row">
                                    <div className="col-md-4">
                                        <div className="d-flex flex-column mt-4">
                                            <p>Assement Name<span className="bcolor">*</span></p>
                                            <input placeholder="Enter assessment name" className="p-2 w-75 form-control" onChange={(e) => setAssessmentName(e.target.value)}
                                                value={assessmentname} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="d-flex flex-column mt-4">
                                            <p>No of Times<span className="bcolor">*</span></p>
                                            <input placeholder="Enter Time" className="p-2 w-75 form-control" onChange={(e) => setNoOfTimes(e.target.value)}
                                                value={nooftimes} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="d-flex flex-column mt-4">
                                            <p>Assement Password<span className="bcolor">*</span></p>
                                            <input placeholder="Enter password" className="p-2 w-75 form-control" onChange={(e) => setAssessmentPassword(e.target.value)}
                                                value={assessmentpassword} />
                                        </div>
                                    </div>

                                </div>
                                <div className="d-flex flex-row">
                                    <div className="col-md-4">
                                        <div className="d-flex flex-column mt-4">
                                            <p>Exame Type <span className="bcolor">*</span></p>
                                            <select className="p-2 w-75 form-control" onChange={(e) => setExamType(e.target.value)}>
                                                <option >select option</option>
                                                <option value=" Single Timer">  Single Timer</option>
                                                <option value="Sectional wise timer">Sectional wise timer</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="d-flex flex-column mt-4">
                                            <p>Cutoff Type<span className="bcolor">*</span></p>
                                            <select className="p-2 w-75 form-control" onChange={(e) => setCutoffType(e.target.value)}
                                            >
                                                <option>select option</option>
                                                <option value="Single Cutoff">Single Cutoff</option>
                                                <option value="Sectional Cutoff">Sectional Cutoff</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="d-flex flex-column mt-4">
                                            <p>Question Selection <span className="bcolor">*</span></p>
                                            <select className="p-2 w-75 form-control light-gray-text" onChange={(e) => setQuestionSelection(e.target.value)}>
                                                <option>select option</option>
                                                <option value="Random">Random</option>
                                                <option value="What is React Life cycle">What is React Life cycle</option>
                                                <option value="Routing">Routing</option>
                                                <option value="Explain about UseEffect hook in react">Explain about UseEffect hook in react</option>
                                                <option value="What is python?">What is python?</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-5">Assessment Report Options<span className="bcolor">*</span></p>
                                <div className="container showoption">

                                    <div className="row">
                                        <div className="col-md-9 d-flex flex-wrap">
                                            <div className="d-flex flex-row">
                                                <div className="col-12 col-md-5 m-1">
                                                    <input
                                                        type="checkbox"
                                                        name="assessmentreport"
                                                        value="Show Reports"
                                                        onChange={(e) => setAssessmentReport(e.target.value)}
                                                    />
                                                    <span className="mx-3 reports">Show Reports</span>
                                                </div>
                                                <div className="col-12 col-md-5 m-1">
                                                    <input
                                                        type="checkbox"
                                                        name="assessmentreport"
                                                        value="Show Qualifying percentager"
                                                        onChange={(e) => setAssessmentReport(e.target.value)}
                                                    />
                                                    <span className="mx-3 reports">Show Qualifying percentage</span>
                                                </div>
                                                <div className="col-12 col-md-4 m-1">
                                                    <input
                                                        type="checkbox"
                                                        name="assessmentreport"
                                                        value="Show Check answers"
                                                        onChange={(e) => setAssessmentReport(e.target.value)}
                                                    />
                                                    <span className="mx-3 reports">Show Check answers</span>
                                                </div>
                                                <div className="col-12 col-md-4 m-1">
                                                    <input
                                                        type="checkbox"
                                                        name="assessmentreport"
                                                        value="Show Explanation"
                                                        onChange={(e) => setAssessmentReport(e.target.value)}
                                                    />
                                                    <span className="mx-3 reports">Show Explanation</span>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row">
                                                <div className="col-12 col-md-5 ">
                                                    <input
                                                        type="checkbox"
                                                        name="assessmentreport"
                                                        value="Show Chapter Wise Report"
                                                        onChange={(e) => setAssessmentReport(e.target.value)}
                                                    />
                                                    <span className="mx-3 reports">Show Chapter Wise Report</span>
                                                </div>
                                                <div className="col-12 col-md-5 m-1">
                                                    <input
                                                        type="checkbox"
                                                        name="assessmentreport"
                                                        value="Show Accuracy Report"
                                                        onChange={(e) => setAssessmentReport(e.target.value)}
                                                    />
                                                    <span className="mx-3 reports">Show Accuracy Report</span>
                                                </div>
                                                <div className="col-12 col-md-4 m-1">
                                                    <input
                                                        type="checkbox"
                                                        name="assessmentreport"
                                                        value="Show Leaderboard"
                                                        onChange={(e) => setAssessmentReport(e.target.value)}
                                                    />
                                                    <span className="mx-3 reports">Show Leaderboard</span>
                                                </div>
                                                <div className="col-12 col-md-5 m-1">
                                                    <input
                                                        type="checkbox"
                                                        name="assessmentreport"
                                                        value="Show Private Testcases Output"
                                                        onChange={(e) => setAssessmentReport(e.target.value)}
                                                    />
                                                    <span className="mx-3 reports">Show Private Testcases Output</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
       
                        <p className="mt-5">Assessment Flow<span className="bcolor">*</span></p>
                                <div className="row">
                                    <div className="col-md-4">
                                        <input
                                            type="radio"
                                            name="assessmentflow"
                                            value="Non-Linear"
                                            onChange={(e) => setAssessmentFlow(e.target.value)}
                                        />
                                        <span className="ravi mx-2 reports">Non-Linear</span>
                                    </div>
                                    <div className="col-md-4">
                                        <input
                                            type="radio"
                                            name="assessmentflow"
                                            value="Linear"
                                            onChange={(e) => setAssessmentFlow(e.target.value)}
                                        />
                                        <span className="ravi mx-2 reports">Linear</span>
                                    </div>
                                </div>
                                <p className="mt-5">Assessment Adaptiveness<span className="bcolor">*</span></p>
                                <div>
                                    <input
                                        type="radio"
                                        name="assessmentadaptiveness"
                                        value="Non-Adaptive"
                                        onChange={(e) => setAssessmentAdaptiveness(e.target.value)}
                                    />
                                    <span className="ravi mx-2 reports">Non-Adaptive</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row  justify-content-center">
                            <button className="creat12 mt-3">Continue</button>
                            </div>
                           
                           

                                
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Basic1