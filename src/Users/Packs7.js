import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation, useNavigate } from 'react-router-dom';
import apiList from '../liberary/apiList';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Packs7 = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { Timelimit,timeLeft,selectedCategoryId,assessmentId,userId,Modalname } = state || {};
    const [assessmentDetails, setAssessmentDetails] = useState([])
    useEffect(() => {
        const api = `${apiList.getTestAssessmentDetails}/${userId}/${selectedCategoryId}/${assessmentId}`;
        const fetchCardData = async () => {
          try {
            const response = await axios.get(api);
            setAssessmentDetails(response.data);
          } catch (e) {
            console.log("Error in Getting the Assessment Data", e);
          }
        };
        fetchCardData();
      }, [selectedCategoryId, assessmentId]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  function createData(
    key,
    Status,
    Marks,
    Accuracy,
    QualifyingPercentage,
    Percentage,
  ) {
    return { key, Status, Marks, Accuracy, QualifyingPercentage, Percentage };
  }
  
  const rows = [
    createData('1', 'Qualifyied', 80 - 100,80 - 100, 25, 5.0),
    createData('2', 'Not Qualifyied', 0 - 79,0 - 79,80, 4.5),
  ];
  
  
    // const percentage = (assessmentDetails?.Score / assessmentDetails?.QualifingScale[0]?.maxmarks) * 100;
    const percentage = assessmentDetails?.Score
    ? (assessmentDetails.Score / assessmentDetails.QualifingScale[0].maxmarks) * 100
    : 0;
    const markspercentage =
    assessmentDetails?.Score &&
    assessmentDetails.QualifingScale &&
    assessmentDetails?.QualifingScale[0]
      ? (assessmentDetails.Score / assessmentDetails?.QualifingScale[0].maxmarks)
      : 0;
  console.log(Timelimit,timeLeft)
    return (
        <div style={{backgroundColor:"rgb(235 235 232)", height:"100vh"}}>
            <div className="container">
                <div className="row">
                  <div className='col-md-3'></div>
                    <div className="col-md-6 mt-5 text-center">
                        <h2 style={{color:"#16c3ea"}}>{ Modalname}</h2>
                        <div className="row mt-4">
                            <div className="col-6 col-sm-6 col-md-6 mt-1">
                                <h6>Time Spent</h6>
                                <b className="uma" style={{color:"red"}}>{(Timelimit[0]*60 - timeLeft)> 60 ? (Timelimit[0]*60 - timeLeft)+ 'Mins':(Timelimit[0]*60 - timeLeft)+ 'Secs'}</b>
                            </div>
                            <div className="col-6 col-sm-6 col-md-6 mt-1">
                                <h6>Marks</h6>
                                <b className="uma" style={{color:"green"}}>{assessmentDetails.Score}</b>
                            </div>
                            <div className="col-6 col-sm-6 col-md-6 mt-4">
                                <h6>Percentage</h6>
                                <b className="uma">{percentage.toFixed(2)}%</b> 
                            </div>
                            <div className="col-6 col-sm-6 col-md-6 mt-4">
                                <h6>Accuracy</h6>
                                <b className="uma">{percentage.toFixed(2)}%</b>
                            </div>
                            <div className="col-6 col-sm-6 col-md-6 mt-4">
                                <h6>Status</h6>
                                <b className='uma' style={{ color: percentage.toFixed(2) > 80 ? 'green' : 'red' }}>{percentage.toFixed(2) > 80 ? 'Qualified' : 'Not Qualified'}</b>
                            </div>
                            <div className="col-6 col-sm-6 col-md-6 mt-4">
                                <h6>Qualifying Percentage</h6>
                                <b className="uma">{ assessmentDetails.QualifingScale &&
                                assessmentDetails?.QualifingScale[0] ? assessmentDetails?.QualifingScale[0].percentage :0}</b>
                            </div>
                        </div>
                        <div className='text-center mt-5'>
                            <button className='umabtn' onClick={()=>navigate("/TestViewSolutions",{state:{Timelimit:Timelimit,timeLeft:timeLeft,selectedCategoryId:selectedCategoryId,assessmentId:assessmentId,userId:userId}})}>View Solutions</button>
                            {/* <button onClick={()=>navigate("/Packs6")} style={{backgroundColor:"#000", color:"#fff", padding:"9px", borderRadius:"6px", border:"none", marginLeft:"10px"}}>Back</button> */}

                        </div>
                    </div>
                    <div className='col-md-3'></div>
                </div>
            </div>
           <div className='container table mt-4'>
              <div className='row'>
                <div className='col-md-2'></div>
              <div className='col-md-8 text-center'>
            <table className='table-1' style={{width:"1020px"}}>
              <thead style={{fontWeight:"500"}}>
                <tr>
                  <th>Status</th>
                  <th>Marks Percentage</th>
                  <th>Accuracy</th>
                  {/* <th>MAX MARKS</th> */}
                </tr>
              </thead>
              <tbody>
              {/* {assessmentDetails && assessmentDetails.map((questionCount) => ( */}
                <tr>
                  <td>Qualifyied</td>
                  <td>80-100</td>
                  <td>80-100</td>
                  {/* <td>{questionCount.maxmarks}</td>
                  <td style={{color:"red"}}>0</td> */}
                </tr>
                <tr>
                  <td>Not Qualifyied</td>
                  <td>Below 80</td>
                  <td>Below 80</td>
                  {/* <td></td>
                  <td style={{color:"red"}}>0</td> */}
                </tr>
              {/* ))} */}
              </tbody>
            </table>
            </div>
            <div className='col-md-2'></div>
              </div>
           </div>
        </div>
    )
}

export default Packs7;