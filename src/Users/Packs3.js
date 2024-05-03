




// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import NavbarUser from './navbaruser';
// import UserFooter from './userfooter';
// import axios from 'axios';

// const Packs3 = () => {
//   const [categoryDetails, setCategoryDetails] = useState({});
//   const [assessments, setAssessments] = useState([]);
//   const { selectedCategoryId, assessmentId } = useParams();




//   useEffect(() => {
//     const fetchCategoryAndAssessments = async () => {
//       try {
//         const categoryResponse = await axios.get(`http://localhost:4010/getassessment/${selectedCategoryId}/${assessmentId}`);
//         console.log('Category Response:', categoryResponse);
//         const categoryData = await categoryResponse.data;
//         console.log('Category Data:', categoryData);

//         const assessmentsResponse = await axios.get(`http://localhost:4010/assessmentquestion/${selectedCategoryId}/${assessmentId}`);
//         console.log('Assessments Response:', assessmentsResponse);
//         const assessmentsData = await assessmentsResponse.data;
//         console.log('Assessments Data:', assessmentsData);

//         setCategoryDetails(categoryData);
//         setAssessments(assessmentsData.questions || []);
//       } catch (error) {
//         console.error('Error fetching category and assessments:', error);
//       }
//     };
//     fetchCategoryAndAssessments();
//   }, [selectedCategoryId,assessmentId]);



//   return (
//     <>
//       <NavbarUser />
//       <div className="container p-5 mt-5">
//         <div className="row p-3 packing ">
//           <div className="col-12 packs6">
//             <h3 className="aptitudes">{categoryDetails.name}</h3>
//             <p className="para">A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs. This is because paragraphs show a reader where the subdivisions of an essay begin and end, and thus help the reader see the organization of the essay and grasp its main points.</p>
//             <h6 className="aptitude-4">Aptitude</h6>
//           </div>
//           <div className="row p-3">
//             <div className="col-sm-4 col-md-4 col-lg-4 col-xl-3 packs1 p-3 ">
//               <h5 className="reasoning">{categoryDetails.name}</h5>
//               <hr />
//               {/* <h6>Question Count: {assessments.map((each)=>each.qustioncount)}</h6>
//               <h6>Duration: {assessments.map((each)=>each.duration)}</h6>
//               <h6>Max Marks: {assessments.map((each)=>each.maxmarks)}</h6> */}




//               {assessments.map((assessment, index) => (
//                 <div key={index}>

//                   <h6>Question Count: {assessment.qustioncount}</h6>
//                   <h6>Duration: {assessment.duration}</h6>
//                   <h6>Max Marks: {assessment.maxmarks}</h6>
//                 </div>
//               ))}
//               <Link to="/Packs4">
//                 <button type="button" className="btn6">
//                   Attempt
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       <UserFooter />
//     </>
//   );
// };

// export default Packs3;




import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavbarUser from './navbaruser';
import UserFooter from './userfooter';
import axios from 'axios';
import apiList from '../liberary/apiList';

const Packs3 = () => {
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const { selectedCategoryId, assessmentId } = useParams();




  useEffect(() => {
    const fetchCategoryAndAssessments = async () => {
      try {
        const categoryResponse = await axios.get(`${apiList.getassessment}/${selectedCategoryId}/${assessmentId}`);
        // console.log('Category Response:', categoryResponse);
        const categoryData = await categoryResponse.data;
        console.log('Category Data:', categoryData);

        const assessmentsResponse = await axios.get(`${apiList.assessmentquestion}/${selectedCategoryId}/${assessmentId}`);
        // console.log('Assessments Response:', assessmentsResponse);
        const assessmentsData = await assessmentsResponse.data;
        console.log('Assessments Data:', assessmentsData);

        setCategoryDetails(categoryData);
        setAssessments(assessmentsData.questions || []);
      } catch (error) {
        console.error('Error fetching category and assessments:', error);
      }
    };
    fetchCategoryAndAssessments();
  }, [selectedCategoryId, assessmentId]);



  return (
    <>
      <NavbarUser />
      <div className="container p-5 mt-5">
        <div className="row p-3 packing ">
          <div className="col-12 packs6">
            <h3 className="aptitudes">{categoryDetails.assessmentname}</h3>
            <p className="para">A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs. This is because paragraphs show a reader where the subdivisions of an essay begin and end, and thus help the reader see the organization of the essay and grasp its main points.</p>
            <h6 className="aptitude-4">Aptitude</h6>
          </div>
          <div className="row p-3">
          {/* {assessments.map((assessment, index) => (
                <div key={assessment._id}>

                  <h6>Question Count: {assessment.qustioncount}</h6>
                  <h6>Duration: {assessment.duration}</h6>
                  <h6>Max Marks: {assessment.maxmarks}</h6>

                  <Link to={`/Packs4/${selectedCategoryId}/${assessment._id}`}>

                    <button type="button" className="btn6">
                      Attempt
                    </button>
                  </Link>
                </div>

              ))} */}
              {assessments.map((assessment,index) => (
                <div className="col-sm-4 col-md-4 col-lg-4 col-xl-3 packs1 p-3 ">
           
                <h5 className="reasoning">{assessment.modelname}</h5>
                <hr />
                <div key={assessment._id}>

                  <h6>Question Count: {assessment.qustioncount}</h6>
                  <h6>Duration: {assessment.duration}</h6>
                  <h6>Max Marks: {assessment.maxmarks}</h6>

                  <Link to={`/Packs4/${selectedCategoryId}/${assessmentId}`}>

                    <button type="button" className="btn6">
                      Attempt
                    </button>
                  </Link>
                </div>

                </div>

              ))}
            
             

            </div>
          </div>
        </div>
    
      <UserFooter />
    </>
  );
};

export default Packs3;