import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { IoMdAlarm } from "react-icons/io";
import { Link, useParams ,useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
import apiList from "../liberary/apiList";
import Cookies from 'js-cookie';

const Sidebar = ({ questions, setCurrentQuestion, currentQuestion }) => {
  const [expanded, setExpanded] = useState(true);

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
    setExpanded(expanded)
  };

  return (
    <div className="" >
      <div className="row status">
        <div className='question_status_info'>
          <h3 className="mock-test">Mock-Test-1</h3>
          <h5 className="mock-test1 " style={{color:"grey"}}>Section</h5>
          <h6>Logical Reasoning</h6>
        </div>
        {questions.map((_, index) => (
          <div className="col-6 col-md-2" key={index} style={{ marginBottom: '10px' }}>
            <button
              className={`styles ${currentQuestion === index ? 'styles1' : ''}`}
              onClick={() => handleQuestionClick(index)}
              style={{borderRadius:"2px"}}
            >
              {index + 1}
            </button>
          </div>
        ))}
      </div>
     
    </div>
  );
};
function Packs6() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { Timelimit,Modalname } = state || {};
  const email = Cookies.get('email')
  const [userdata, setuserdata] = useState([])
  const [userdetails, setuserdetails] = useState([])

  const fetchUserdetails = async () => {
    try {
        const response = await axios.get(`${apiList.user}/${email}`);
        setuserdata(response.data.userDetails[0].InstituteUsersList._id)
        setuserdetails(response.data.userDetails[0].InstituteUsersList)

    } catch (error) {
        console.error("Error fetching Company Details:", error);
        // Handle errors here
    }
}; 
useEffect(() => {
  fetchUserdetails();
}, [email]);
  const [sidebar, setSidebar] = useState(true);
  const handleSide = () => {
    setSidebar(!sidebar);

  };
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(Timelimit * 60);
console.log(timeLeft)
  const handleSaveExamData = async () => {

    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  const [assessmentdata, setAssessmentdata] = useState([]);
  const [questioncount, setQuestioncount] = useState([]);
  const { selectedCategoryId , assessmentId} = useParams();
  
  useEffect(() => {
    const api = `${apiList.getassessment}/${selectedCategoryId}/${assessmentId}`;
    const fetchCardData = async () => {
      try {
        const response = await axios.get(api);
        setAssessmentdata(response.data.assessment?.Questions);
        setQuestioncount(response.data.assessment?.Qustionscount[0])
        
      } catch (e) {
        console.log("Error in Getting the Assessment Data", e);
      }
    };
    fetchCardData();
  }, []);
   
const questions = assessmentdata && assessmentdata.map((each) => ({
  question: each.Question,
  _id:each._id,
  options: [each.Option1,each.Option2,each.Option3]
}));


  const [userAnswers, setUserAnswers] = useState({});
  const handleAnswer = (questionId, selectedOption) => {
    console.log(`${questionId} - Selected option: ${selectedOption}`);
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  // const handleNext = () => {
  //   setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  // };


  const handleNext = () => {
    // Check if an answer is selected for the current question
    if (!userAnswers[questions[currentQuestion]._id]) {
      // If no answer is selected, show an alert toast
      toast.error("Please select an answer before proceeding to the next question", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        className: "custom-toast-custom",
      });
      return; // Stop further execution
    }
  
    // If an answer is selected, proceed to the next question
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };
  


  const handlePrev = () => {
    setCurrentQuestion((prevQuestion) => Math.max(0, prevQuestion - 1));
  };

  const handleSubmit = async () => {
    const QuestionsData = 
      assessmentdata.map((each) => ({
        question: each.Question,
        _id:each._id,
        Options1: each.Option1,
        Options2: each.Option2,
        Options3: each.Option3,
        correctAnswer: each.correctAnswer
    }))
    try {
      await axios.post(`${apiList.submitAssessmentAnswers}/${selectedCategoryId}/${assessmentId}`,{QuestionsData : QuestionsData,QualifingScale:questioncount,userAnswers : userAnswers,userId:userdata,userdetails:userdetails} );
      toast("Quiz Submitted!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        className: "custom-toast-custom",
      });
      setTimeout(() => {
        navigate("/Packs7",{state:{Timelimit:Timelimit,timeLeft:timeLeft,selectedCategoryId:selectedCategoryId,assessmentId:assessmentId,userId:userdata,Modalname:Modalname}})
      }, 1000);
    } catch (error) {
      console.error(error);
    }
    };

  const questionsPerPage = 1;
  return (
    <>
    
    <div className="d-flex py-3" style={{backgroundColor:"rgb(235 235 232)", height:"100vh"}}>
      {/* Left side content */}
      <div className={`sidebar12 text-white ${sidebar ? 'open' : 'closed'}`}>
        <div className="p-4 mr-2 mt-5">
          <Sidebar questions={questions} setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion} />
        </div>
        <ToastContainer />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="d-flex flex-row">
            <div className={`col-${sidebar ? 'md-10' : 'md-12'}`}>
              <div className='time_left'>Time Left: <span style={{ color: 'red' }}><IoMdAlarm /> {formatTime(timeLeft)} min</span> </div>
              <div className="">
                {questions.slice(currentQuestion, currentQuestion + questionsPerPage).map((q, index) => (
                  <TextOne                  
                    key={index}
                    questionNumber={currentQuestion + index + 1}
                    question={q.question}
                    _id={q._id}
                    options={q.options}
                    onAnswer={(selectedOption) => handleAnswer(q._id, selectedOption)}
                  />
                ))}
                <div >
                  <div className="d-flex">
                  <button className="reportedbutton mr-2" onClick={handlePrev} disabled={currentQuestion === 0}>
                    Previous
                  </button>
                  {currentQuestion === questions.length - 1 && (
                    <button className='resume1 py-1' onClick={handleSubmit}>Submit</button>
                  )}
                  <button className="reportedbutton" onClick={handleNext} disabled={currentQuestion === questions.length - 1}>
                    Next
                  </button>
                  </div>
                  
                  
                  <div className='action_buttons mt-4'>
                    {/* <div className='markforreview_next' onClick={handleMarkForReview}> */}
                    <div className='markforreview_next'>

                      Mark For Review & Next
                    </div>
                    {/* <div className='clear_response' onClick={handleClearResponse}> */}
                    <div className='clear_response'>

                      Clear Response
                    </div>
                    <div  style={{position:"absolute", left:"80%"}}>
                    <button className='save_and_next  p-2' onClick={handleSaveExamData}>
                      {/* <button className='save_and_next'> */}

                      Save & Next
                    </button>
                    </div>
                    
                  </div>

                </div>
              </div>
            </div>
            <div className={` mt-5 col-${sidebar ? '' : 'md-5'}`}>
              <div className="">
                <div className="">
                  <div className={`toggle-icon ${sidebar ? '' : ''}`} onClick={handleSide}>
                    {sidebar ? (
                      <FontAwesomeIcon icon={faCaretRight} />
                    ) : (
                      <FontAwesomeIcon icon={faCaretLeft} />
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
    </div>
    </>
  );
}

const TextOne = ({ questionNumber, question, options = [], onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onAnswer(option);
  };

  return (
    <>
    <div className="my-5">
      <h5 className="mt-5">{` ${questionNumber}. ${question}`}</h5>
      <ul className="questions-list"   style={{ listStyle: "none" }}>
        {options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                className="mr-3"
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
              />
              {option}
            </label>  
          </li>
        ))}
      </ul>
      <hr />
    </div>
    </>
  );
};
// code
export default Packs6;




