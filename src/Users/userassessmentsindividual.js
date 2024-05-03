import React, { useEffect, useState } from "react";
import { Link, NavLink , useParams } from "react-router-dom";
// import Cards from "./Cards";
// import "./courses.css";
import { FaBookOpen } from "react-icons/fa";
import axios from "axios";
import NavbarUser from "./navbaruser";
import UserFooter from "./userfooter";
import apiList from "../liberary/apiList";


function UserassessmentsIndividual() {
  const [showAllCards, setShowAllCards] = useState(true);

  const handleAllCards = () => {
    setShowAllCards(true);
  };

  const handleSpecificCard = () => {
    setShowAllCards(false);
  };

  const [cardData, setCardData] = useState([]);
  const [assessmentTitle, setAssessmentTitle] = useState([]);
  const { selectedCategoryId,selectedCategoryName ,selectedCategoryTag} = useParams();

  

  useEffect(() => {
    const api = `${apiList.getassessments}/${selectedCategoryId}`;
    const fetchCardData = async () => {
      try {
        const response = await axios.get(api);
        console.log(response.data)
        setAssessmentTitle(response.data.assessments)
        setShowAllCards(false);
      } catch (e) {
        console.log("Error in Getting the Videos Folder", e);
      }
    };
    fetchCardData();
  }, []);

  console.log(assessmentTitle);
  return (
    <>
      <NavbarUser />
      {showAllCards ? (
        <div className="d-flex flex-row justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="hm-spinner"></div>
        </div>
      ) : (
      <div className="coursesMain">
        <div className="container-fluid courses-wrapper ">
          <div className="mainCardContainer">
          <div className="col-md-12">
               <div className="Topicss">
                 <h3 className="my-2 head">{selectedCategoryName}</h3>
                 <div>
                   <h6 className="my-3 parahead">{selectedCategoryTag}</h6>
                 </div>
               </div>
             </div>
            {assessmentTitle?.map((video, index) => (              
              <div className="cardsBox">
                <div className="cardContainer">
                  {/* <ul className="cardPaidUl">
                    <span className="cardProgramming">{video.questionselection}</span>
                    <span className="cardPaid">Paid</span>
                  </ul> */}
                  <h4 className="cardHeading">{video.assessmentname}</h4>
                  <ul className="cardTopics">
                    <li className="cardtopicLi">
                      {/* <i class="fa-solid fa-book-open"></i> */}
                      <span className="cardTopicSpan">
                      Test Questions :{video.Questions && video.Questions.length} 
                      </span>
                    </li>
                    <li className="cardtopicLi">
                    <span className="cardTopicSpan">
                        Max Marks : {video.Qustionscount[0].maxmarks} 
                      </span>
                    </li>
                    <li className="cardtopicLi">
                    <span className="cardTopicSpan">
                        Duration : {video.Qustionscount[0].duration} Mins
                      </span>
                    </li>
                  </ul>
                  <NavLink to={`/UserassessmentsQuestionDetails/${selectedCategoryId}/${video._id}`}>
                    <button className="cardBtn">Attempt</button>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}
      <div className="mt-4">
      <UserFooter />
      </div>
     
    </>
  );
}

export default UserassessmentsIndividual;