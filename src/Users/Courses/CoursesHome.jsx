import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import Cards from "./Cards";
import "./courses.css";
import { FaBookOpen } from "react-icons/fa";
import axios from "axios";
import NavbarUser from "../navbaruser";
import UserFooter from "../userfooter";
import apiList from "../../liberary/apiList";


function UserCoursesHome() {
  const [showAllCards, setShowAllCards] = useState(true);

  const handleAllCards = () => {
    setShowAllCards(true);
  };

  const handleSpecificCard = () => {
    setShowAllCards(false);
  };

  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const api = `${apiList.alllearningpathsDetails}`;
    const fetchCardData = async () => {
      try {
        const response = await axios.get(api);
        setCardData(response.data);
        setShowAllCards(false)
      } catch (e) {
        console.log("Error in Getting the Videos Folder", e);
      }
    };
    fetchCardData();
  }, []);
  const [videosdata, setVideosdata] = useState([])
  useEffect(() => {
    const fetchVideoData = async () => {
        try {
            const response = await axios.get(`${apiList.allAddVideosData}`);
            setVideosdata(response.data);
            setShowAllCards(false)
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle error state or setTitles([]) if needed
        }
    };
    fetchVideoData();
}, []);
  const [selectedCategory, setSelectedCategory] = useState('All');
	const uniqueCategories = ['All', ...new Set(cardData.map(item => item.relevantSkillTags))];  
	const filterProjects = category => {
	  setSelectedCategory(category);
	};  
	const filteredProjects = selectedCategory === 'All' ? cardData : cardData.filter(item => item.relevantSkillTags === selectedCategory);

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
              <div key={category} className="col-md-2 text-center">
               <button
                  className={`btn btn-light shadow w-100 p-2 ${selectedCategory === category ? 'btn-active' : ''}`}
                  onClick={() => filterProjects(category)}
                  style={{
                    backgroundColor: selectedCategory === category ? '#16c3ea' : '#fff',
                    color: selectedCategory === category ? '#000' : '#000',
                  }}
                >
                  {category}
                </button>
              </div>
            ))}
          <div className="col-md-2"></div>
          </div>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="mainCardContainer text-center">
            {filteredProjects.map((video, index) => (
              <div className="cardsBox">
                <div className="cardContainer">
                  <ul className="cardPaidUl">
                    <span className="cardProgramming">{video.relevantSkillTags}</span>
                    <span className="cardPaid">Paid</span>
                  </ul>
                  <h5 className="cardHeading">{video.learningPathTitle}</h5>
                  <ul className="cardTopics">
                    <li className="cardtopicLi">
                      <i class="fa-solid fa-book-open"></i>
                      <span className="cardTopicSpan">
                        {videosdata.filter(each=>each.VideofolderName ===video.learningPathTitle).map(each=>each.videoFile.length || 0)} Topics
                      </span>
                    </li>
                  </ul>
                  <NavLink to={`/user/coursesdetailsPage/${video._id}`}>
                    <button className="cardBtn">Open</button>
                  </NavLink>
                </div>
              </div>
            ))}
            </div>
            <div className="col-md-2"></div>
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

export default UserCoursesHome;