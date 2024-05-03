import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarUser from "../navbaruser";
import UserFooter from "../userfooter";
import apiList from "../../liberary/apiList";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const VideoSection = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const [currentVideo, setCurrentVideo] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploadVideoUrls, setUploadVideoUrls] = useState([]);
  const [videoTitles, setVideoTitles] = useState([]);

  const [videosNotFound, setVideosNotFound] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const { learningPathTitle } = useParams();
  const [assessmentdata, setAssessmentdata] = useState([]);
  const [questioncount, setQuestioncount] = useState([]);
  const { selectedCategoryId , assessmentId} = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  useEffect(() => {
    const api = `${apiList.getassessmentTitlewise}/${learningPathTitle}/${encodeURIComponent(currentVideo.title)}`;
    const fetchCardData = async () => {
      try {
        const response = await axios.get(api);
        setAssessmentdata(response.data.assessment?.Questions);
        console.log(response.data.assessment?.Questions)
        setQuestioncount(response.data.assessment?.Qustionscount[0])
        
      } catch (e) {
        console.log("Error in Getting the Assessment Data", e);
      }
    };
    fetchCardData();
  }, [learningPathTitle,currentVideo.title]);
   
const questions = assessmentdata && assessmentdata.map((each) => ({
  question: each.Question,
  _id:each._id,
  options: [each.Option1,each.Option2,each.Option3],
  correctAnswer: each.correctAnswer
}));
const handleQuestionClick = (index) => {
  setCurrentQuestion(index);
  setExpanded(expanded)
};


const [userAnswers, setUserAnswers] = useState({});
const handleAnswer = (questionId, selectedOption) => {
  console.log(`${questionId} - Selected option: ${selectedOption}`);
  setUserAnswers((prevAnswers) => ({
    ...prevAnswers,
    [questionId]: selectedOption,
  }));
};


const handleSaveExamData = async () => {

  setCurrentQuestion((prevQuestion) => prevQuestion + 1);
};


const handlePrev = () => {
  setCurrentQuestion((prevQuestion) => Math.max(0, prevQuestion - 1));
  setResult("")
  setExpanded(false);

};

const [showAnswer, setShowAnswer] = useState(false);
const [Result, setResult] = useState('');
const [showResult, setShowResult] = useState(false);


const handleNext = () => {
  setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  setResult("")
  setShowAnswer(false)
};
const handleSubmit = async (id) => {
  const QuestionsData = assessmentdata.find((each) => each._id === id);
  const selectedOption = userAnswers[id];

  let resultMessage;
  if (selectedOption === QuestionsData[QuestionsData.correctAnswer]) {
    console.log(selectedOption,QuestionsData[QuestionsData.correctAnswer],'sai')
    resultMessage = 'Correct!';
  } else {
    resultMessage = 'Wrong. The correct answer is: ' + QuestionsData.correctAnswer;
  }

setResult(resultMessage)
setShowResult(true);
  try {
    // Your axios.post logic here...
  } catch (error) {
    console.error(error);
  }
};

const questionsPerPage = 1;
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(
          `${apiList.coursesvideossectionwise}/${learningPathTitle}`
        );
        const videoData = response.data.videos.videoFile;

        // Extract titles and URLs from all videos
        const titles = videoData.map((video) => video.VideoTitleName);
        const urls = videoData.map((video) => video.Video1);

        setVideoTitles(titles);
        setUploadVideoUrls(urls);
        setLoading(false);

        // Set the first video as the default
        handleVideoClick(urls[0], titles[0]);
      } catch (e) {
        console.error("Error in Getting the Section-wise Videos", e);
        setLoading(false);
      }
    };
    fetchVideoData();
  }, [learningPathTitle]);

  const handleVideoClick = (videoUrl, videoTitle) => {
    setCurrentVideo({
      title: videoTitle,
      url: videoUrl,
    });

    // Reset the showQuestions state when a new video is selected
    setShowQuestions(false);
  };

  const handleVideoEnd = () => {
    // Show questions section when the video ends
    setShowQuestions(true);
  };

  if (loading) {
    return <div>
      <div
					className="d-flex flex-row justify-content-center align-items-center"
					style={{ height: "100vh" }}
				>
					<div className="hm-spinner"></div>
				</div>
    </div>;
  }
  

  return (
    <>
      <NavbarUser />
      <div className="container-fluid playerWrapper my-5 pt-5">
        <h3 className="videoMainHeading mt-5">{currentVideo.title}</h3>
        <div className="playerContainer">
          <ReactPlayer
            className="reactPlayerBox"
            url={currentVideo.url}
            controls
            width="799px"
            height="450px"
            onEnded={handleVideoEnd}
          />
        </div>
      </div>
      <div className="container">        
      {showQuestions && (
          <div>
            <h4>PracticeQuestions</h4>
             <div className="">
                {questions.slice(currentQuestion, currentQuestion + questionsPerPage).map((q, index) => (
                  <TextOne                  
                    key={index}
                    questionNumber={currentQuestion + index + 1}
                    question={q.question}
                    _id={q._id}
                    options={q.options}
                    onAnswer={(selectedOption) => handleAnswer(q._id, selectedOption)}
                    showAnswer={showAnswer}
                    showResult={showResult}
                    handleSubmit={() => handleSubmit(q._id)} 
                  />                
                ))}
                <div>
                <h5 style={{color:"green"}}>{showAnswer && `Correct Answer: ${questions[currentQuestion].correctAnswer}`}</h5>
                {showResult && <h5 style={{color:"green"}}>{Result}</h5>}
                </div>
                <div className="my-5">
                  <div className="buttons-container">
                    <button className="reportedbutton mr-2" onClick={handlePrev} disabled={currentQuestion === 0}>
                      Previous
                    </button>
                    <button className="reportedbutton mr-2" onClick={() => setShowAnswer(!showAnswer)}
                    >
                      {showAnswer ? 'Hide Answer' : 'Show Answer'}
                    </button>
                      <button className='reportedbutton mr-2' onClick={() => handleSubmit(questions[currentQuestion]._id)}>
                        Submit
                      </button>
                  
                    <button className="reportedbutton" onClick={handleNext} disabled={currentQuestion === questions.length - 1}>
                      Next
                    </button>
                  </div>                  
                  {/* <div className='action_buttons mt-4'>
                    <div  style={{position:"absolute", left:"80%"}}>
                    <button className='save_and_next  p-2' onClick={handleSaveExamData}>

                      Save & Next
                    </button>
                    </div>
                    
                  </div> */}

                </div>
              </div>
          </div>
        )}        
        <h4 className="upNxtHeading mt-3" style={{ textDecoration: "none" ,textAlign:"center"}}>
          Course Content
        </h4>
        <div className="VideoSideBar">
          <ul className="videoUlSection">
            {uploadVideoUrls.map((videoUrl, i) => (
              <li
                className={`upNxtVideosLi ${currentVideo.url === videoUrl ? "selected" : ""
                  }`}
                key={i}
                onClick={() => handleVideoClick(videoUrl, videoTitles[i])}
              >
                <i className="fa-solid fa-play"></i> Video {i + 1}
              </li>
            ))}
          </ul>
        </div>
        <div className="my-5">
        <button style={{textAlign:"center"}} className='reportedbutton mr-2' onClick={()=>navigate(`/Assessmentdetialsbeforetest/${learningPathTitle}`)}>Get certification on this course</button>
        </div>

        </div>
    <UserFooter />
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

export default VideoSection;
