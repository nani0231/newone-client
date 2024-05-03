import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./Exam.css";
import NavbarUser from "./navbaruser";
import UserFooter from "./userfooter";
import apiList from "../liberary/apiList";


const Examtext = () => {
  const { id } = useParams();
  const [_id, set_id] = useState("");
  const [testTopics, setTestTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [worksheetLoading, setWorksheetLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiList.categoriesUser}/${id}`);
        setTestTopics(response.data.Practicetopic);
        setWorksheetLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchData();
    set_id(id);
  }, [id]);

  return (
    <>
      <NavbarUser />
      {worksheetLoading ? (
        <div className="d-flex flex-row justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div>
            <div className="hm-spinner"></div>
          </div>
        </div>
      ) : error ? (
        <div>Error loading data. Please try again.</div>
      ) : (
        <div className="container mt-5 py-3">
          <div className="row">
            <div className="col-md-12 my-5 text-center">
              <div className="text-center">
                <h4 className="examheading ">
                  {testTopics.length > 0 && (
                    <h4>{testTopics[0].topicName}</h4>
                  )}
                </h4>
              </div>
            </div>
          </div>
          <div className="row">
            {testTopics.map((practiceTopic) => (
              <div key={practiceTopic._id}>
                {practiceTopic.Testtopic.map((test) => (
                  <div key={test._id} className="col-md-6 my-2 carde">
                    <h5 className="mt-2 text-center">{test.testName}</h5>
                    <div className="text-start">
                      <p className="headtittle">Questions: {test.questions}</p>
                    </div>
                    <button type="button" className="btn_q1 ">
                      {test.practiceType}
                    </button>
                    <div className="text-end">
                      <Link to={`/test/${_id}/${practiceTopic._id}/${test._id}`}>
                        <button type="button" className="btn_q2 mb-3">
                          Start
                        </button>
                      </Link>
                    </div>
                   
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-5">
      <UserFooter />
        </div>
    
    </>
  );
};

export default Examtext;