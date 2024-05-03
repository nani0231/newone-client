
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import apiList from '../liberary/apiList';
function Assessmentpaper() {
  // const category= useParams;
  const { state } = useLocation();
  console.log(state);

  // const searchParams = new URLSearchParams(location.search);
  // const category = searchParams.get("category");
  const [qustioncount, setQustioncount] = useState('');
  const [totalqustion, setTotalqustion] = useState('');
  const [duration, setDuration] = useState('');
  const [percentage, setPercentage] = useState('');
  const [modelname, setModelname] = useState('');
  const [maxmarks, setMaxmarks] = useState('');
  const [category, setcategory] = useState("")



  const fetchblogs1 = async () => {
    const api = `${apiList.allassessment}`;
    try {
      const response = await axios.get(api, {});
      console.log(response.data);

    } catch (error) {
      console.error("Error fetch blogs:", error);

    }
  };
  useEffect(() => {
    fetchblogs1();
  }, []);
  const useData2 = {
    category: category,
    qustioncount: qustioncount,
    totalqustion: totalqustion,
    duration: duration,
    percentage: percentage,
    modelname: modelname,
    maxmarks: maxmarks,
  };
  const onSubmitForm3 = async (e) => {
    e.preventDefault();

    try {
      // Make sure useData2 has the category property
      const { questioncount, totalquestion, duration, percentage, modelname, maxmarks } = useData2;


      // Make a POST request to your server endpoint for posting question data
      const response = await fetch(`${apiList.addquestion}/${state}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          questioncount,
          totalquestion,
          duration,
          percentage,
          modelname,
          maxmarks,
        }),
      });

      if (response.ok) {
        console.log('Question data posted successfully');
        // Optionally, you can redirect or show a success message

        // Set the category in the state or context here
        // For example, if you are using React state:
        // setCategory(category);
      } else {
        console.error('Failed to post question data');
      }
    } catch (error) {
      console.error('Internal server error:', error);
    }
  };


  return (
    <div>
      <div className='container'>
        <div className='row'>
          <form onSubmit={onSubmitForm3}>
            <div className='col-12 col-md-12'>
              <h5 className='mt-2'>Assessment Options</h5>
              <div className="d-flex flex-row">



                <div className="col-md-3">
                  <div className="d-flex flex-column mt-4">

                    <p>Qustions Count<span className="bcolor">*</span></p>
                    <input placeholder="Enter qustioncount" className="p-2 w-75 form-control"
                      value={qustioncount} onChange={(e) => setQustioncount(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex flex-column mt-4">
                    <p>Total Marks<span className="bcolor">*</span></p>
                    <input placeholder="Enter totalqustion" className="p-2 w-75 form-control"
                      value={totalqustion} onChange={(e) => setTotalqustion(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex flex-column mt-4">
                    <p>Duration<span className="bcolor">*</span></p>
                    <input placeholder="Enter duration" className="p-2 w-75 form-control"
                      value={duration} onChange={(e) => setDuration(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex flex-column mt-4">
                    <p>Qualifying Percentage<span className="bcolor">*</span></p>
                    <input placeholder="Enter percentage" className="p-2 w-75 form-control"
                      value={percentage} onChange={(e) => setPercentage(e.target.value)} />
                  </div>


                </div>

              </div>
              <h5 className='mt-4'>Assessment Models</h5>
              <div className='d-flex flex-row'>

                <div className="col-md-4">
                  <div className="d-flex flex-column mt-4">
                    <p>Model Name<span className="bcolor">*</span></p>
                    <input placeholder="Enter modelname" className="p-2 w-75 form-control"
                      value={modelname} onChange={(e) => setModelname(e.target.value)} />
                  </div>


                </div>
                <div className="col-md-4">
                  <div className="d-flex flex-column mt-4">
                    <p>Qustions Count<span className="bcolor">*</span></p>
                    <input placeholder="Enter qustioncount" className="p-2 w-75 form-control"
                      value={qustioncount} onChange={(e) => setQustioncount(e.target.value)} />
                  </div>


                </div>
                <div className="col-md-4">
                  <div className="d-flex flex-column mt-4">
                    <p>Max Marks<span className="bcolor">*</span></p>
                    <input placeholder="Enter maxmarks" className="p-2 w-75 form-control"
                      value={maxmarks} onChange={(e) => setMaxmarks(e.target.value)} />
                  </div>


                </div>
              </div>

            </div>
            <div className="d-flex flex-row  justify-content-center">
              <button className="creat12 mt-3">Continue</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Assessmentpaper