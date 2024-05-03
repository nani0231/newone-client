

// import React from 'react';
// import { Link, useParams } from 'react-router-dom';
// import NavbarUser from './navbaruser';
// import UserFooter from './userfooter';

// function Packs4() {
//   const { id } = useParams();

//   const assessmentDetails = {
//     module: 'Python',
//     questions: 40,
//     maxMarks: 40,
//     negativeMarks: 0,
//     duration: 20,
//   };

//   return (
//     <>
//       <NavbarUser />
//       <div className=' container'>
//         <div className='table'>
//           <div className='aa row'>
//             <button className='btn2'>Assessment Details</button>
//             <button className='btn2'>Previous Attempts</button>
//           </div>
//           <div className='row'>
//             <table className='table-1'>
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>MODULE</th>
//                   <th>QUESTIONS</th>
//                   <th>MAX MARKS</th>
//                   <th>NEGATIVE MARKS</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>1</td>
//                   <td>{assessmentDetails.module}</td>
//                   <td>{assessmentDetails.questions}</td>
//                   <td>{assessmentDetails.maxMarks}</td>
//                   <td>{assessmentDetails.negativeMarks}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           <div className='aaa row'>
//             <button className='btn-1'>Duration</button>
//             <button className='btn-2'>{assessmentDetails.duration} Min</button>
//           </div>
//           <div className='aaaa row p-5'>
//             <Link to={`/Packs5`}>
//               <button className='btns-3 bg-primary text-light'>Start Test</button>
//             </Link>
//           </div>
//         </div>
//       </div>
//       <UserFooter />
//     </>
//   );
// }

// export default Packs4;





// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import NavbarUser from './navbaruser';
// import UserFooter from './userfooter';
// import axios from 'axios';

// function Packs4() {
//   const { assessmentId,selectedCategoryId } = useParams();
//   const [assessmentDetails, setAssessmentDetails] = useState({
//     module: '',
//     questions: 0,
//     maxMarks: 0,
//     negativeMarks: 0,
//     duration: 0,
//   });

//   useEffect(() => {
//     const fetchAssessmentDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4010/assessmentquestion/${selectedCategoryId}/${assessmentId}`);
//         const data = response.data;
//         setAssessmentDetails(data.questions || []);
//       } catch (error) {
//         console.error('Error fetching assessment details:', error);
//         setAssessmentDetails({
//           module: '',
//           questions: 0,
//           maxMarks: 0,
//           negativeMarks: 0,
//           duration: 0,
//         });
//       }
//     };

//     fetchAssessmentDetails();
//   }, [assessmentId,selectedCategoryId]);

//   return (
//     <>
//       <NavbarUser />
//       <div className='container'>
//         <div className='table'>
//           <div className='aa row'>
//             <button className='btn2'>Assessment Details</button>
//             <button className='btn2'>Previous Attempts</button>
//           </div>
//           <div className='row'>
//             <table className='table-1'>
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>MODULE</th>
//                   <th>QUESTIONS</th>
//                   <th>MAX MARKS</th>
//                   <th>NEGATIVE MARKS</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>1</td>
//                   <td>{assessmentDetails.module}</td>
//                   <td>{assessmentDetails.questions}</td>
//                   <td>{assessmentDetails.maxMarks}</td>
//                   <td>{assessmentDetails.negativeMarks}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           <div className='aaa row'>
//             <button className='btn-1'>Duration</button>
//             <button className='btn-2'>{assessmentDetails.duration} Min</button>
//           </div>
//           <div className='aaaa row p-5'>
//             <Link to={`/Packs5`}>
//               <button className='btns-3 bg-primary text-light'>Start Test</button>
//             </Link>
//           </div>
//         </div>
//       </div>
//       <UserFooter />
//     </>
//   );
// }

// export default Packs4;



// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import NavbarUser from './navbaruser';
// import UserFooter from './userfooter';
// import axios from 'axios';

// function Packs4() {
//   const { assessmentId,selectedCategoryId } = useParams();
//   const [categoryDetails, setCategoryDetails] = useState({});
//   const [assessments, setAssessments] = useState([]);
//   const [assessmentDetails, setAssessmentDetails] = useState({
//     module: '',
//     questions: 0,
//     maxMarks: 0,
//     negativeMarks: 0,
//     duration: 0,
//   });

//   // useEffect(() => {
//   //   const fetchCategoryAndAssessments = async () => {
//   //     try {
//   //       const assessmentsResponse = await axios.get(`http://localhost:4010/assessmentquestion/${selectedCategoryId}/${assessmentId}`);
//   //       console.log('Assessments Response:', assessmentsResponse);
  
//   //       // Use optional chaining for safer data access
//   //       const assessmentData = assessmentsResponse.data?.questions || {};
  
//   //       // Set assessment details
//   //       setAssessmentDetails({
//   //         module: assessmentData.module || '',
//   //         questions: assessmentData.questions || 0,
//   //         maxMarks: assessmentData.maxMarks || 0,
//   //         negativeMarks: assessmentData.negativeMarks || 0,
//   //         duration: assessmentData.duration || 0,
//   //       });
//   //     } catch (error) {
//   //       console.error('Error fetching category and assessments:', error);
//   //       // Handle the error, show a user-friendly message or redirect to an error page
//   //     }
//   //   };
  
//   //   fetchCategoryAndAssessments();
//   // }, [selectedCategoryId, assessmentId]);
  

//   useEffect(() => {
//     const fetchCategoryAndAssessments = async () => {
//       try {
//         const assessmentsResponse = await axios.get(`http://localhost:4010/assessmentquestion/${selectedCategoryId}/${assessmentId}`);
//         console.log('Assessments Response:', assessmentsResponse);
  
//         // Use optional chaining for safer data access
//         const assessmentData = assessmentsResponse.data || {};
//         const qustionsCountArray = assessmentData.Qustionscount || [];
  
//         // Assuming you want the first item from Qustionscount array
//         const firstQustionCount = qustionsCountArray[0] || {};
  
//         // Set assessment details
//         setAssessmentDetails({
//           module: firstQustionCount.modelname || '',
//           questions: firstQustionCount.totalqustion || 0,
//           maxMarks: firstQustionCount.maxmarks || 0,
//           negativeMarks: firstQustionCount.negativeMarks || 0,
//           duration: firstQustionCount.duration || 0,
//         });
  
//         // Access assessment names from Qustionscount array
//         const assessmentNames = qustionsCountArray.map((qCount) => qCount.modelname);
//         console.log('Assessment Names:', assessmentNames);
//       } catch (error) {
//         console.error('Error fetching category and assessments:', error);
//         // Handle the error, show a user-friendly message or redirect to an error page
//       }
//     };
  
//     fetchCategoryAndAssessments();
//   }, [selectedCategoryId, assessmentId]);
  

//   return (
//     <>
//       <NavbarUser />
//       <div className='container'>
//         <div className='table'>
//           <div className='aa row'>
//             <button className='btn2'>Assessment Details</button>
//             <button className='btn2'>Previous Attempts</button>
//           </div>
//           <div className='row'>
//             <table className='table-1'>
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>MODULE</th>
//                   <th>QUESTIONS</th>
//                   <th>MAX MARKS</th>
//                   <th>NEGATIVE MARKS</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>1</td>
//                   <td>{assessmentDetails.modelname}</td>
//                   <td>{assessmentDetails.qustioncount}</td>
//                   <td>{assessmentDetails.maxmarks}</td>
//                   <td>{assessmentDetails.negativeMarks}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           <div className='aaa row'>
//             <button className='btn-1'>Duration</button>
//             <button className='btn-2'>{assessmentDetails.duration} Min</button>
//           </div>
//           <div className='aaaa row p-5'>
//             <Link to={`/Packs5`}>
//               <button className='btns-3 bg-primary text-light'>Start Test</button>
//             </Link>
//           </div>
//         </div>
//       </div>
//       <UserFooter />
//     </>
//   );
// }

// export default Packs4;





import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavbarUser from './navbaruser';
import UserFooter from './userfooter';
import axios from 'axios';
import apiList from '../liberary/apiList';

function Packs4() {
  const { assessmentId,selectedCategoryId,questionCountId } = useParams();
  const [categoryDetails, setCategoryDetails] = useState({});
  const [assessments, setAssessments] = useState([]);
  const [assessmentDetails, setAssessmentDetails] = useState({
    module: '',
    questions: 0,
    maxMarks: 0,
    negativeMarks: 0,
    duration: 0,
  });

  // useEffect(() => {
  //   const fetchCategoryAndAssessments = async () => {
  //     try {
  //       const assessmentsResponse = await axios.get(`http://localhost:4010/assessmentquestion/${selectedCategoryId}/${assessmentId}`);
  //       console.log('Assessments Response:', assessmentsResponse);
  
  //       // Use optional chaining for safer data access
  //       const assessmentData = assessmentsResponse.data?.questions || {};
  
  //       // Set assessment details
  //       setAssessmentDetails({
  //         module: assessmentData.module || '',
  //         questions: assessmentData.questions || 0,
  //         maxMarks: assessmentData.maxMarks || 0,
  //         negativeMarks: assessmentData.negativeMarks || 0,
  //         duration: assessmentData.duration || 0,
  //       });
  //     } catch (error) {
  //       console.error('Error fetching category and assessments:', error);
  //       // Handle the error, show a user-friendly message or redirect to an error page
  //     }
  //   };
  
  //   fetchCategoryAndAssessments();
  // }, [selectedCategoryId, assessmentId]);
  

  useEffect(() => {
    const fetchCategoryAndAssessments = async () => {
      try {
        const assessmentsResponse = await axios.get(`${apiList.assessmentquestion}/${selectedCategoryId}/${assessmentId}/${questionCountId}`);
        console.log('Assessments Response:', assessmentsResponse);
  
        // Use optional chaining for safer data access
        const assessmentData = assessmentsResponse.data || {};
        const qustionsCountArray = assessmentData.Qustionscount || [];
  
        // Assuming you want the first item from Qustionscount array
        const firstQustionCount = qustionsCountArray[0] || {};
  
        // Set assessment details
        setAssessmentDetails({
          module: firstQustionCount.modelname || '',
          questions: firstQustionCount.totalqustion || 0,
          maxMarks: firstQustionCount.maxmarks || 0,
          negativeMarks: firstQustionCount.negativeMarks || 0,
          duration: firstQustionCount.duration || 0,
        });
  
        // Access assessment names from Qustionscount array
        const assessmentNames = qustionsCountArray.map((qCount) => qCount.modelname);
        console.log('Assessment Names:', assessmentNames);
      } catch (error) {
        console.error('Error fetching category and assessments:', error);
        // Handle the error, show a user-friendly message or redirect to an error page
      }
    };
  
    fetchCategoryAndAssessments();
  }, [selectedCategoryId, assessmentId]);
  

  return (
    <>
      <NavbarUser />
      <div className='container'>
        <div className='table'>
          <div className='aa row'>
            <button className='btn2'>Assessment Details</button>
            <button className='btn2'>Previous Attempts</button>
          </div>
          <div className='row'>
            <table className='table-1'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>MODULE</th>
                  <th>QUESTIONS</th>
                  <th>MAX MARKS</th>
                  <th>NEGATIVE MARKS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{assessmentDetails.modelname}</td>
                  <td>{assessmentDetails.qustioncount}</td>
                  <td>{assessmentDetails.maxmarks}</td>
                  <td>{assessmentDetails.negativeMarks}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='aaa row'>
            <button className='btn-1'>Duration</button>
            <button className='btn-2'>{assessmentDetails.duration} Min</button>
          </div>
          <div className='aaaa row p-5'>
            <Link to={`/Packs5`}>
              <button className='btns-3 bg-primary text-light'>Start Test</button>
            </Link>
          </div>
        </div>
      </div>
      <UserFooter />
    </>
  );
}

export default Packs4;