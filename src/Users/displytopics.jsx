import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import NavbarUser from "./navbaruser";
import UserFooter from "./userfooter";
import apiList from "../liberary/apiList";
import './disply.css';

const DisplyTopics = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [_id, set_id] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiList.categoriesUser}/${id}`);
        setCategory(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTopics = async () => {
      try {
        const response = await axios.get(`${apiList.practicetopics}/${id}`);
        setTopics(response.data); 
        console.log(response.data)
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
    fetchTopics();
    set_id(id);
  }, [id]);

  return (
    <>
      <NavbarUser />
      {loading ? (
        <div className="d-flex flex-row justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="hm-spinner"></div>
        </div>
      ) : (
        <div className="container-fluid mt-5 pb-2">
          <div className="row">
          <div className="mainCardContainer">
            <div className="col-md-12">
              <div className="Topicss ">
                <div className="text-center">
                <h3 className="my-3 head text-center">{category.name}</h3>
                </div>
               
                <div className="text-center">
                  <h6 className="my-2 parahead ">{category.tag}</h6>
                </div>
              </div>
            </div>
            {topics.map((practiceTopic) => (
              <div className="cardsBox mb-5">
                <div className="cardContainer">
                    <h5 className="text-center mb-3">{practiceTopic}</h5>
                  <Link to={`/question/${_id}/${practiceTopic}`}>
                    <button className="cardBtn">Open</button>
                  </Link>
              </div>
              </div>
            ))} 
          </div>
          </div>
        </div>
      )}
      {error && <div className="error-message">Error: {error.message}</div>}
      <div className="mt-5">
      <UserFooter />
        </div>
     
    </>
  );
};

export default DisplyTopics;