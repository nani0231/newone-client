import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import Cards from "./Cards";
// import "./courses.css";
import { FaBookOpen } from "react-icons/fa";
import axios from "axios";
import NavbarUser from "./navbaruser";
import UserFooter from "./userfooter";
import apiList from "../liberary/apiList";


function Userassessments() {
  const [showAllCards, setShowAllCards] = useState(true);

  const handleAllCards = () => {
    setShowAllCards(true);
  };

  const handleSpecificCard = () => {
    setShowAllCards(false);
  };

  const [cardData, setCardData] = useState([]);
  const [assessmentTitle, setAssessmentTitle] = useState([]);
  const [CardDatalength, setCardDatalength] = useState([]);
  

  useEffect(() => {
    const api = `${apiList.getassessmentscategories}`;
    const fetchCardData = async () => {
      try {
        const response = await axios.get(api);
        setCardData(response.data.assessments.map((each)=>each.Assessment));
        setCardDatalength(response.data.assessments.map((each)=>each.Assessment.length));
        setAssessmentTitle(response.data.assessments)
        setShowAllCards(false);
      } catch (e) {
        console.log("Error in Getting the Videos Folder", e);
      }
    };
    fetchCardData();
  }, []);
  const [selectedCategory, setSelectedCategory] = useState('All');
	const uniqueCategories = ['All', ...new Set(assessmentTitle.map(item => item.tag))];  
	const filterProjects = category => {
	  setSelectedCategory(category);
	};  
	const filteredProjects = selectedCategory === 'All' ? assessmentTitle : assessmentTitle.filter(item => item.tag === selectedCategory);

  return (
    <>
      <NavbarUser />
      {showAllCards ? (
        <div className="d-flex flex-row justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="hm-spinner"></div>
        </div>
      ) : (
      <div className=" coursesMain">
        <div className="container-fluid courses-wrapper ">
        <div className="row mt-5">
        <div className="col-md-2"></div>
            {uniqueCategories.map(category => (
              <div key={category} className="col-md-2 mx-2">
               <button
                  className={`btn btn-light shadow w-100 p-2 ${selectedCategory === category ? 'btn-active' : ''}`}
                  onClick={() => filterProjects(category)}
                  style={{
                    backgroundColor: selectedCategory === category ? '#16c3ea' : 'white',
                    color: selectedCategory === category ? '#000' : '#000',
                  }}
                >
                  {category}
                </button>
              </div>
            ))}
          <div className="col-md-2"></div>
          </div>
          <div className="mainCardContainer mt-1">
            {filteredProjects?.map((video, index) => (
              <div className="cardsBox">
                <div className="cardContainer">
                  <ul className="cardPaidUl">
                    <span className="cardProgramming">{video.tag}</span>
                    <span className="cardPaid">{video.accessplan}</span>
                  </ul>
                  <h5 className="cardHeading">{video.name}</h5>
                  <ul className="cardTopics">
                    <li className="cardtopicLi">
                      <i class="fa-solid fa-book-open"></i>                      
                      <span className="cardTopicSpan">
                      {(video.Assessment.length) || 0} Assessments
                      </span>                    
                    </li>
                  </ul>
                  <NavLink to={`/UserassessmentsIndividual/${video._id}/${video.name}/${video.tag}`}>
                    <button className="cardBtn">Open</button>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}
      <div className="mt-5">
      <UserFooter />
      </div>
    </>
  );
}

export default Userassessments;