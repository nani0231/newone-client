
// import React from "react";
// import { useState,useEffect } from "react";
// import Cookies from 'js-cookie';
// import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
// import { MdDeleteForever } from "react-icons/md";
// import { CiLocationArrow1 } from "react-icons/ci";
// import { MdPlace } from "react-icons/md";
// import { FaRegArrowAltCircleLeft } from "react-icons/fa";
// import { FaRegArrowAltCircleRight } from "react-icons/fa";
// import { IoLockClosed } from "react-icons/io5";
// import { MdCurrencyRupee } from "react-icons/md";
// import { Link ,useParams} from 'react-router-dom';
// import { FaExternalLinkAlt } from "react-icons/fa";
// import { FcLike } from "react-icons/fc";






// const Packs1 = () =>{  


//     const [subscribedPacks, setSubscribedPacks] = useState([]);

//   const handleSubscribe = (pack) => {
//     // Replace this with logic to handle actual subscription
//     setSubscribedPacks((prevSubscribedPacks) => [...prevSubscribedPacks, pack]);
//   };

//   const isPackSubscribed = (pack) => {
//     return subscribedPacks.includes(pack);
//   };
//     return(
//         <> 
//         <div className="container p-5">
//           {/* <div className="row">
//             <div className="col-3">
//                 <h3 className="my">My Packs</h3>               
//             </div>
//             <div className="col-6 p-1 m-5">
//                 <h6>Please Login To see Your Subscribed Packs</h6> 
//                 <button type="button" className="btn1">
//                 <IoLockClosed />
//                 <h6 className="log">Login</h6></button>

//             </div>
//           </div> */}
//            <div className="row">
//           <div className="col-3">
//             <h3 className="my">My Packs</h3>
//           </div>
//           <div className="col-6 p-1 m-5">
//             {subscribedPacks.length > 0 ? (
//               <div>
//                 <h3>Your Subscribed Packs</h3>
//                 <ul>
//                   {subscribedPacks.map((pack, index) => (
//                     <li key={index}>{pack}</li>
//                   ))}
//                 </ul>
//               </div>
//             ) : (
//               <div>
//                 <h6>Please Login To see Your Subscribed Packs</h6>
//                 <button type="button" className="btn1">
//                   <IoLockClosed />
//                   <h6 className="log">Login</h6>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//           <div className="row">
//             <div className="col-3">
//                 <h3>Explore Packs</h3>
//             </div>
//           </div>
//           <div className="row p-3 packing ">
//             <div className="col-sm-4col-md-4 col-lg-3 col-xl-3  packs0 ">
//                 <h5 className="aptitude">Aptitude Learning ...</h5>
//                 <br/>
//                 <h6>Assessments: 4</h6>
//                 <h6>Cources: 3</h6>
//                 <h6>Practices: 236</h6>
//                 <hr/>
//                 <h6>Get This Pack For</h6>
//                 <h6  className="rupee-not"><s className="not-rupee"><MdCurrencyRupee />560</s><MdCurrencyRupee />340</h6>              
//                 <Link to = "/Packs2">
//                 <button type="button" className="btn2"   onClick={() => handleSubscribe("Aptitude Learning Pack")}>View Details</button>
//                 </Link>
//                 {isPackSubscribed("Aptitude Learning Pack") ? (
//               <button type="button" className="btn5">
//                 {/* Render whatever you want for subscribed state */}
//                 Subscribed!
//               </button>
//             ) : (
//                 <button type="button" className="btn5">
//                 <IoLockClosed />
//                 <h6 className="log">Login To Buy</h6></button> 
//                          )}              
//             </div>
//             <br/>
//             <div className=" col-sm-4col-md-4 col-lg-3 col-xl-3  packs1 ">
//                 <h5 className="aptitude">Hexaware Recruitement</h5>
//                 <br/>
//                 <h6>Assessments: 1</h6>
//                 <h6>Cources: 3</h6>
//                 <h6>Practices: 236</h6>
//                 <hr/>
//                 <h6>Get This Pack For</h6>
//                 <h6  className="rupee-not"><s className="not-rupee"><MdCurrencyRupee />350</s><MdCurrencyRupee />240</h6>
//                 <Link to = "/Packs2">
//                 <button type="button" className="btn2" >View Details</button>
//                 </Link>
//                 <button type="button" className="btn5">
//                 <IoLockClosed />
//                 <h6 className="log">Login To Buy</h6></button>               
//             </div>
//             <div className="col-sm-4col-md-4 col-lg-3 col-xl-3  packs1 ">
//                 <h5 className="aptitude">Recruitement Pack</h5>
//                 <br/>
//                 <h6>Assessments: 12</h6>
//                 <h6>Cources: 34</h6>               
//                 <hr/>
//                 <h6>Get This Pack For</h6>
//                 <h6 className="rupee-not"><s className="not-rupee"><MdCurrencyRupee />450</s><MdCurrencyRupee />350</h6>
//                 <Link to = "/Packs2">
//                 <button type="button" className="btn2" >View Details</button>
//                 </Link>
//                 <button type="button" className="btn5">
//                 <IoLockClosed />
//                 <h6 className="log">Login To Buy</h6></button>               
//             </div>
//             <div className="col-sm-4col-md-4 col-lg-3 col-xl-3  packs2 ">
//                 <h5 className="aptitude">Python Practice Pack</h5>
//                 <br/>
//                 <h6>Assessments: 124</h6>
//                 <h6>Cources: 45</h6>
//                 <hr/>
//                 <h6>Get This Pack For</h6>
//                 <h6 className="rupee-not"><s className="not-rupee"><MdCurrencyRupee />230</s><MdCurrencyRupee />170</h6>              
//                 <Link to = "/Packs2">
//                 <button type="button" className="btn2" >View Details</button>
//                 </Link>
//                 <button type="button" className="btn5">
//                 <IoLockClosed />
//                 <h6 className="log">Login To Buy</h6></button>               
//             </div>
//             <div className="col-sm-4 col-md-4 col-lg-3 col-xl-3  packs3 ">
//                 <h5 className="aptitude">Tech M _ recruitement</h5>
//                 <br/>
//                 <h6>Assessments: 123</h6>
//                 <hr/>
//                 <h6>Get This Pack For</h6>
//                 <h6 className="rupee-not"><s className="not-rupee"><MdCurrencyRupee />350</s><MdCurrencyRupee />200</h6>              
//                 <Link to = "/Packs2">
//                 <button type="button" className="btn2" >View Details</button>
//                 </Link>
//                 <button type="button" className="btn5">
//                 <IoLockClosed />
//                 <h6 className="log">Login To Buy</h6></button>               
//             </div>         
//           </div>
//             </div>                                    
//         </>
//     )

// }
// export default Packs1;


import React, { useState, useEffect } from "react";
import { IoLockClosed } from "react-icons/io5";
import { MdCurrencyRupee } from "react-icons/md";
import { Link ,useNavigate } from 'react-router-dom';
import NavbarUser from "./navbaruser";
import UserFooter from "./userfooter";
import UserNavbar from "./Usernavbar";
import apiList from "../liberary/apiList";
import Cookies from 'js-cookie';



const Subscriptionnote = () => {
	let navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [assessments, setAssessments] = useState([]);
  const [navbarSetting, setNavbarSetting] = useState(null);

	useEffect(() => {
	  const token = Cookies.get("token");
  
	  if (token) {
		navigate("/Userdashbord");
	  }

	}, []);


  const handleLoginToBuyClick = () => {
    setShowForm(true);
  };

  const closePaymentForm = () => {
    setShowForm(false);
  };

  useEffect(() => {
    const apiUrl = `${apiList.allassessment}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setAssessments(data))
      .catch((error) => console.error("Error fetching assessments:", error));
  }, []);

  return (
    <>
    <UserNavbar/>
     <div className="pt-5 mt-3">
     <div className="container-fluid p-5 my-5">
        <div className="row">
          <div className="col-md-12 text-center pb-5">
            <h6 className="mb-4" style={{marginLeft:"50px"}}>Please Login with Your Credentials</h6>
            <div className="text-center">
            <button type="button" className=" " style={{backgroundColor:"#16c3ea", color:"#000", padding:"8px", border:"none",borderRadius:"7px"}} >
              <IoLockClosed />
              <span className="log"  onClick={()=>navigate("/userlogindetails")}>Login</span></button>
            </div>
            

          </div>
        </div>
      </div>
     </div>
    <UserFooter/>
    </>
  )

}
export default Subscriptionnote;



