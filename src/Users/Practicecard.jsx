import React, { useEffect, useState } from "react";
import axios from 'axios';

import './Practice.css';
import { Link } from "react-router-dom";
import NavbarUser from "./navbaruser";
import UserFooter from "./userfooter";
import apiList from "../liberary/apiList";

const Practicecard = () => {
  const [titles, setTitles] = useState([]);
  const [worksheetLoading, setWorksheetLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const api = `${apiList.allpractices}`;
      try {
        const response = await axios.get(api, {});
        setTitles(response.data.data);
        setWorksheetLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching practices:", error);
      }
    };

    fetchData();
  }, []);
  const [selectedCategory, setSelectedCategory] = useState('All');
	const uniqueCategories = ['All', ...new Set(titles.map(item => item.tag))];  
	const filterProjects = category => {
	  setSelectedCategory(category);
	};  
	const filteredProjects = selectedCategory === 'All' ? titles : titles.filter(item => item.tag === selectedCategory);

  return (
    <>
      <NavbarUser />
      {worksheetLoading ? (
        <div colSpan="4" className="d-flex flex-row justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div>
            <div className="hm-spinner"></div>
          </div>
        </div>
      ) : (
        <div className="coursesMain">
        <div className="container-fluid courses-wrapper ">
          <div className="row mt-5">
          <div className="col-md-2"></div>
            {uniqueCategories.map(category => (
              <div key={category} className="col-md-2">
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
          <div className="mainCardContainer text-center mt-1">
            {filteredProjects.map((path) => (
                <div className="cardsBox">
                  <div className="cardContainer">
                    <ul className="cardPaidUl">
                      <span className="cardProgramming">{path.tag}</span>
                      <span className="cardPaid">Retail</span>
                    </ul>
                    <h5 className="cardHeading">{path.name}</h5>
                    <ul className="cardTopics">
                      <li className="cardtopicLi">
                        <i className="fa-solid fa-book-open"></i>
                        <span className="cardTopicSpan"> {path.Practicetopic && path.Practicetopic.length} Topics</span>
                      </li>
                    </ul>
                    <Link to={`/topics/${path._id}`} >
                      <button className="cardBtn">Open</button>
                    </Link>
                   
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
};

export default Practicecard;