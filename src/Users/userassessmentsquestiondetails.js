import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavbarUser from './navbaruser';
import UserFooter from './userfooter';
import axios from 'axios';
import apiList from '../liberary/apiList';
import { useNavigate } from 'react-router-dom';

function UserassessmentsQuestionDetails() {
  const { assessmentId,selectedCategoryId,questionCountId } = useParams();
  const [categoryDetails, setCategoryDetails] = useState({});
  const [assessments, setAssessments] = useState([]);
  const [assessmentDetails, setAssessmentDetails] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  useEffect(() => {
    const api = `${apiList.getassessment}/${selectedCategoryId}/${assessmentId}`;
    const fetchCardData = async () => {
      try {
        const response = await axios.get(api);
        setAssessmentDetails(response.data.assessment?.Qustionscount);
        setLoading(false)
      } catch (e) {
        console.log("Error in Getting the Assessment Data", e);
      }
    };
    fetchCardData();
  }, [selectedCategoryId, assessmentId]);
  

  return (
    <>
      <NavbarUser />
      {loading ? (
        <div className="d-flex flex-row justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="hm-spinner"></div>
        </div>
      ) : (
      <div className='container-fluid my-5'>
        <div className='table'>
         
           
          
           <h4 className='text-center my-5'>Assessment Details</h4>
           
           
        
         <div className='row'>
            <div className='col-md-2'>
            </div>
            <div className='col-md-8 text-center'>
            <table className='table-1' style={{width:"100%"}}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Module</th>
                  <th>Questions</th>
                  <th>Max Marks</th>
                  <th>Negative Marks</th>
                </tr>
              </thead>
              <tbody>
              {assessmentDetails && assessmentDetails.map((questionCount) => (
                <tr>
                  <td>1</td>
                  <td>{questionCount.modelname}</td>
                  <td>{questionCount.qustioncount}</td>
                  <td>{questionCount.maxmarks}</td>
                  <td style={{color:"red"}}>0</td>
                </tr>
              ))}
              </tbody>
            </table>
            </div>
            <div className='col-md-2'>
            </div>
            </div>
           <div className='row my-3'>
           <div className='col-md-5'>
            </div>
            <div className='col-md-1'>
            <button className='btn-1'>Duration</button>
           </div>
           <div className='col-md-1'>
           <button className='btn-2'>{assessmentDetails.map((questionCount)=>questionCount.duration)} Min</button>
           </div>
           <div className='col-md-5'>
            </div>
            </div>
            <div className='row'>
           <div className='col-md-2 mx-auto text-center'>
              <button type='button' className=' btns-3  my-4' style={{backgroundColor:"#16c3ea", color:"#000", outline:"none"}} onClick={()=>navigate(`/Packs5/${selectedCategoryId}/${assessmentId}`,{state:{Timelimit:assessmentDetails.map((questionCount)=>questionCount.duration),Modalname:assessmentDetails.map((questionCount)=>questionCount.modelname)}})}>Start Test</button>
           </div>
            </div>
           
            </div>
        </div>
      )}
      <div className='mt-5'>
      <UserFooter />
      </div>
     
    </>
  );
}

export default UserassessmentsQuestionDetails;