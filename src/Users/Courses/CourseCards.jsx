import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoFile from "./VideoFile";
import apiList from "../../liberary/apiList";

const CourseCards = ({ match, history }) => {
    const [folderData, setFoderData] = useState(null)

    useEffect(() => {
      const fetchData = async () => {
        try {
          const responseData = await axios.get(
            `${apiList.allAddVideosData}`
          );
          console.log(responseData);
          setFoderData(responseData.data);
        } catch (error) {
          console.error("Error Fetching Video Files", error);
        }
      };
      fetchData();
    }, []);
  
    console.log(folderData, "videos");
  
    const handleViewVideoClick = ()=>{
      history.push(`/videos/${folderData.VideofolderName}`)
    }
    return (
      <>
        {/* <div>
         {folderData?(
          <>
          <h2>{folderData.VideofolderName}</h2>
          <buttton onClick={handleViewVideoClick}>View Videos</buttton>
          <VideoFile video={folderData.videoFile}/>
          </>
         ):(
          <p>Loading ....!</p>
         )}
        </div> */}
        <h1>hello</h1>
      </>
    );
};

export default CourseCards;
//     <div className=" coursesMain">
//     <div className="container courses-wrapper ">
//       <h5>Courses</h5>
//       <div className="coursesbtn">
//         <button onClick={handleAllCards} className="cardBtn1">
//           All
//         </button>
//         <button onClick={handleSpecificCard} className="cardBtn1">
//           Programming
//         </button>
//       </div>
//       <div className="cardsBox">
//         {showAllCards ? (
//           <>
//             <div className="cardContainer">
//               <ul className="cardPaidUl">
//                 <span className="cardProgramming">Programming</span>
//                 <span className="cardPaid">Paid</span>
//               </ul>
//               <h5 className="cardHeading">Python</h5>
//               <ul className="cardTopics">
//                 <li>
//                   <i class="fa-solid fa-book-open"></i>
//                   <span className="cardTopicSpan">13 Topics</span>
//                 </li>
//               </ul>
//               <Link to={"/user/coursesdetailsPage"}>
//                 <button className="cardBtn">Open</button>
//               </Link>
//             </div>
//             <div className="cardContainer">
//               <ul className="cardPaidUl">
//                 <span className="cardPaid">Paid</span>
//               </ul>
//               <h5 className="cardHeading">Python</h5>
//               <ul className="cardTopics">
//                 <li>
//                   <i class="fa-solid fa-book-open"></i>
//                   <span className="cardTopicSpan">13 Topics</span>
//                 </li>
//               </ul>
//               <Link to={"/user/coursesdetailsPage"}>
//                 <button className="cardBtn">Open</button>
//               </Link>
//             </div>
//             <div className="cardContainer">
//               <ul className="cardPaidUl">
//                 <span className="cardPaid">Paid</span>
//               </ul>
//               <h5 className="cardHeading">Python</h5>
//               <ul className="cardTopics">
//                 <li>
//                   <i class="fa-solid fa-book-open"></i>
//                   <span className="cardTopicSpan">13 Topics</span>
//                 </li>
//               </ul>
//               <Link to={"/user/coursesdetailsPage"}>
//                 <button className="cardBtn">Open</button>
//               </Link>
//             </div>
//             <div className="cardContainer">
//               <ul className="cardPaidUl">
//                 <span className="cardProgramming">Programming</span>
//                 <span className="cardPaid">Paid</span>
//               </ul>
//               <h5 className="cardHeading">Python</h5>
//               <ul className="cardTopics">
//                 <li>
//                   <i class="fa-solid fa-book-open"></i>
//                   <span className="cardTopicSpan">13 Topics</span>
//                 </li>
//               </ul>
//               <Link to={"/user/coursesdetailsPage"}>
//                 <button className="cardBtn">Open</button>
//               </Link>
//             </div>
//             <div className="cardContainer">
//               <ul className="cardPaidUl">
//                 <span className="cardProgramming">Programming</span>
//                 <span className="cardPaid">Paid</span>
//               </ul>
//               <h5 className="cardHeading">Python</h5>
//               <ul className="cardTopics">
//                 <li>
//                   <i class="fa-solid fa-book-open"></i>
//                   <span className="cardTopicSpan">13 Topics</span>
//                 </li>
//               </ul>
//               <Link to={"/user/coursesdetailsPage"}>
//                 <button className="cardBtn">Open</button>
//               </Link>
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="cardContainer">
//               <ul className="cardPaidUl">
//                 <span className="cardProgramming">Programming</span>
//                 <span className="cardPaid">Paid</span>
//               </ul>
//               <h5 className="cardHeading">Python</h5>
//               <ul className="cardTopics">
//                 <li>
//                   <i class="fa-solid fa-book-open"></i>
//                   <span className="cardTopicSpan">13 Topics</span>
//                 </li>
//               </ul>
//               <Link to={"/user/coursesdetailsPage"}>
//                 <button className="cardBtn">Open</button>
//               </Link>
//             </div>
//             <div className="cardContainer">
//               <ul className="cardPaidUl">
//                 <span className="cardProgramming">Programming</span>
//                 <span className="cardPaid">Paid</span>
//               </ul>
//               <h5 className="cardHeading">Python</h5>
//               <ul className="cardTopics">
//                 <li>
//                   <i class="fa-solid fa-book-open"></i>
//                   <span className="cardTopicSpan">13 Topics</span>
//                 </li>
//               </ul>
//               <Link to={"/user/coursesdetailsPage"}>
//                 <button className="cardBtn">Open</button>
//               </Link>
//             </div>
//             <div className="cardContainer">
//               <ul className="cardPaidUl">
//                 <span className="cardProgramming">Programming</span>
//                 <span className="cardPaid">Paid</span>
//               </ul>
//               <h5 className="cardHeading">Python</h5>
//               <ul className="cardTopics">
//                 <li>
//                   <i class="fa-solid fa-book-open"></i>
//                   <span className="cardTopicSpan">13 Topics</span>
//                 </li>
//               </ul>
//               <Link to={"/user/coursesdetailsPage"}>
//                 <button className="cardBtn">Open</button>
//               </Link>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   </div>
