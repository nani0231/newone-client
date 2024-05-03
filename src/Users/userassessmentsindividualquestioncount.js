import React, { useEffect, useState } from "react";
import { Link, NavLink , useParams } from "react-router-dom";
// import Cards from "./Cards";
// import "./courses.css";
import { FaBookOpen } from "react-icons/fa";
import axios from "axios";
import NavbarUser from "./navbaruser";
import UserFooter from "./userfooter";
import apiList from "../liberary/apiList";


function UserassessmentsIndividualQuestioncount() {
  const [showAllCards, setShowAllCards] = useState(true);

  const handleAllCards = () => {
    setShowAllCards(true);
  };

  const handleSpecificCard = () => {
    setShowAllCards(false);
  };

  const [cardData, setCardData] = useState([]);
  const [assessmentTitle, setAssessmentTitle] = useState([]);
  const { selectedCategoryId , assessmentId} = useParams();

  

  useEffect(() => {
    const api = `${apiList.getassessment}/${selectedCategoryId}/${assessmentId}`;
    const fetchCardData = async () => {
      try {
        const response = await axios.get(api);
        setAssessmentTitle(response.data.assessment?.Qustionscount);
        setShowAllCards(false);
      } catch (e) {
        console.log("Error in Getting the Assessment Data", e);
      }
    };
    fetchCardData();
  }, [selectedCategoryId, assessmentId]);

  console.log(assessmentTitle);
  return (
    <>
      <NavbarUser />
      {showAllCards ? (
        <div className="d-flex flex-row justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="hm-spinner"></div>
        </div>
      ) : (
      <div className=" coursesMain">
        <div className="container courses-wrapper ">
          <div className="mainCardContainer">
          {assessmentTitle && assessmentTitle.map((questionCount) => (
              <div className="cardsBox">
                <div className="cardContainer">
                  <p>Question Count: {questionCount.qustioncount}</p>
                <p>Duration: {questionCount.duration}</p>
                <p>Maxmarks: {questionCount.maxmarks}</p>
                  <NavLink to={`/UserassessmentsQuestionDetails/${selectedCategoryId}/${assessmentId}`}>
                    <button className="cardBtn">Open</button>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}
      <UserFooter />
    </>
  );
}

export default UserassessmentsIndividualQuestioncount;