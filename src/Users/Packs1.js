
import React, { useState, useEffect } from "react";
import { IoLockClosed } from "react-icons/io5";
import { MdCurrencyRupee } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import NavbarUser from "./navbaruser";
import UserFooter from "./userfooter";
import UserNavbar from "./Usernavbar";
import apiList from "../liberary/apiList";
import axios from "axios";

const Packs1 = () => {
  let navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [assessments, setAssessments] = useState([]);



  const handleLoginToBuyClick = () => {
    setShowForm(true);
  };

  const closePaymentForm = () => {
    setShowForm(false);
  };
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get(
          `${apiList.categories}`
        );
        setCardData(response.data);
      } catch (e) {
        console.log("Error in Getting the Videos Folder", e);
      }
    };
    fetchCardData();
  }, []);
  const [videosdata, setVideosdata] = useState([]);
    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await axios.get(`${apiList.allAddVideosData}`);
                setVideosdata(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error state or setTitles([]) if needed
            }
        };
        fetchVideoData();
    }, []);
    const [practicesdata, setPracticesdata] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiList.allpractices}`);
                setPracticesdata(response.data.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error state or setTitles([]) if needed
            }
        };
        fetchData();
    }, []);
  return (
    <>
      <UserNavbar />
      <div className="container p-5 mt-5">
        <div className="row">
          <div className="col-md-3">
            <h3 className="my">My Packs</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 text-center">
            <h6>Please Login To see Your Subscribed Packs</h6>
            <button type="button" className="" style={{backgroundColor:"#16c3ea", color:"#000", padding:"8px", border:"none",borderRadius:"7px"}}>
              <IoLockClosed />
              <span className="log" onClick={() => navigate("/userlogindetails")}>Login</span></button>

          </div>
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-3">
            <h3>Explore Packs</h3>
          </div>
        </div>   
        <div className="row p-3 packing">
          {cardData.map((pack, i) => (
            <div key={i} className="col-sm-4 col-md-4 col-lg-3 col-xl-3 packs0">
              <h5 className="aptitude">{pack.name}</h5>
              <br />
              <h6>Assessments: {pack.Assessment?.length || 0}</h6>
              {/* Other details */}
              <h6>Courses: {videosdata.filter(each=>each.VideofolderName === pack.name).map(each=>each.videoFile.length)}</h6>
              <h6>Practices: {practicesdata.filter(each=>each.name === pack.name).map(each=>each.Practicetopic.length) || 0}</h6>
              <hr />
              <h6>Get This Pack For {pack.accessPeriod}</h6>
              <h6 className="rupee-not">
                {/* <s className="not-rupee"><MdCurrencyRupee />{pack.assessmentPractice}</s> */}
                <MdCurrencyRupee />{pack.assessmentPractice}
              </h6>
              <div className="text-center">
              
                <button type="button" className="btn2 p-1"
                 onClick={()=>navigate(`/Packs2/${pack.name}`,{state:{price:pack.assessmentPractice,period:pack.accessPeriod}})}
                 >
                  View Details
                </button>
            
              <button type="button" className="btn5" onClick={handleLoginToBuyClick}>
                <IoLockClosed />
                <h6 className="log">Login To Buy</h6>
              </button>
              </div>
             
            </div>
          ))}
        </div>
      </div>
      <UserFooter />
    </>
  )

}
export default Packs1;