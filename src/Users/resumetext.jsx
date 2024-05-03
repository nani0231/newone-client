
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import NavbarUser from "./navbaruser";
import UserFooter from "./userfooter";
const Sidebar = ({ questions, setCurrentQuestion, currentQuestion }) => {
  const [expanded, setExpanded] = useState(true);

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
    setExpanded(expanded)
  };

  return (
    <div className="scroll-container">
      <div className="row">
        {questions.map((_, index) => (
          <div className="col-6 col-md-4" key={index} style={{ marginBottom: '10px' }}>
            <button
              className={`styles ${currentQuestion === index ? 'styles1' : ''}`}
              onClick={() => handleQuestionClick(index)}
            >
              {index + 1}
            </button>
          </div>
        ))}
      </div>

    </div>

  );
};
function Resumetext() {
  const [sidebar, setSidebar] = useState(true);
  const handleSide = () => {
    setSidebar(!sidebar);

  };
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      question: "What is your favorite programming language?",
      options: ["JavaScript", "Python", "Java", "C++"],
    },
    {
      question: "What is your favorite framework?",
      options: ["React", "Angular", "Vue", "Express"],
    },
    {
      question: "What is your preferred database?",
      options: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"],
    },
    {
      question: "Which version control system do you use?",
      options: ["Git", "SVN", "Mercurial", "None"],
    },
    {
      question: "What is your preferred code editor?",
      options: ["VSCode", "Sublime Text", "Atom", "Eclipse"],
    },
    {
      question: "What is your favorite front-end language?",
      options: ["HTML", "CSS", "JavaScript", "TypeScript"],
    },
    {
      question: "What is your preferred back-end language?",
      options: ["Node.js", "Django", "Flask", "Spring"],
    },
    {
      question: "What is your favorite cloud platform?",
      options: ["AWS", "Azure", "Google Cloud", "Heroku"],
    },
    {
      question: "Which testing framework do you prefer?",
      options: ["Jest", "Mocha", "JUnit", "pytest"],
    },
    {
      question: "What is your preferred project management tool?",
      options: ["Jira", "Trello", "Asana", "Notion"],
    },
    {
      question: "What is your favorite programming language?",
      options: ["JavaScript", "Python", "Java", "C++"],
    },
    {
      question: "What is your favorite framework?",
      options: ["React", "Angular", "Vue", "Express"],
    },
    {
      question: "What is your preferred database?",
      options: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"],
    },
    {
      question: "Which version control system do you use?",
      options: ["Git", "SVN", "Mercurial", "None"],
    },
    {
      question: "What is your preferred code editor?",
      options: ["VSCode", "Sublime Text", "Atom", "Eclipse"],
    },
    {
      question: "What is your favorite front-end language?",
      options: ["HTML", "CSS", "JavaScript", "TypeScript"],
    },
    {
      question: "What is your preferred back-end language?",
      options: ["Node.js", "Django", "Flask", "Spring"],
    },
    {
      question: "What is your favorite cloud platform?",
      options: ["AWS", "Azure", "Google Cloud", "Heroku"],
    },
    {
      question: "Which testing framework do you prefer?",
      options: ["Jest", "Mocha", "JUnit", "pytest"],
    },
    {
      question: "What is your preferred project management tool?",
      options: ["Jira", "Trello", "Asana", "Notion"],
    }, {
      question: "What is your favorite programming language?",
      options: ["JavaScript", "Python", "Java", "C++"],
    },
    {
      question: "What is your favorite framework?",
      options: ["React", "Angular", "Vue", "Express"],
    },
    {
      question: "What is your preferred database?",
      options: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"],
    },
    {
      question: "Which version control system do you use?",
      options: ["Git", "SVN", "Mercurial", "None"],
    },
    {
      question: "What is your preferred code editor?",
      options: ["VSCode", "Sublime Text", "Atom", "Eclipse"],
    },
    {
      question: "What is your favorite front-end language?",
      options: ["HTML", "CSS", "JavaScript", "TypeScript"],
    },
    {
      question: "What is your preferred back-end language?",
      options: ["Node.js", "Django", "Flask", "Spring"],
    },
    {
      question: "What is your favorite cloud platform?",
      options: ["AWS", "Azure", "Google Cloud", "Heroku"],
    },
    {
      question: "Which testing framework do you prefer?",
      options: ["Jest", "Mocha", "JUnit", "pytest"],
    },
    {
      question: "What is your preferred project management tool?",
      options: ["Jira", "Trello", "Asana", "Notion"],
    },

  ]
  const handleAnswer = (question, selectedOption) => {
    console.log(`${question} - Selected option: ${selectedOption}`);
  };

  const handleNext = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handlePrev = () => {
    setCurrentQuestion((prevQuestion) => Math.max(0, prevQuestion - 1));
  };
  const handleSubmit = () => {
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
    console.log("Quiz Submitted!");
  };

  const questionsPerPage = 1;
  const [remainingTime, setRemainingTime] = useState(1 * 60);
  const [timerExpired, setTimerExpired] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        const newTime = Math.max(0, prevTime - 1);
        if (newTime === 0) {
          clearInterval(timer);
          setTimerExpired(true);
          toast.error("Time has expired!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);



  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };
  const isTimeRemaining = remainingTime > 0;
  return (
    <>
    
    <div className="d-flex">
      <div className={`sidebar12 text-white ${sidebar ? 'open' : 'closed'} d-md-block d-none`}>

        <div className="p-4 mr-2 ">
          <Sidebar questions={questions} setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion} />
        </div>
        <ToastContainer />
      </div>
      <div className="container">
        <div className="row">

          <div className="d-flex flex-row">
            <div className={`col-${sidebar ? 'md-9' : 'md-12'}`}>
              <div className="">
                <div className="text-center mt-3">  <h5>Time remaining: <span className="time">{formatTime(remainingTime)}</span></h5></div>
                {isTimeRemaining && questions.slice(currentQuestion, currentQuestion + questionsPerPage).map((q, index) => (
                  <TextOne
                    key={index}
                    questionNumber={currentQuestion + index + 1}
                    question={q.question}
                    options={q.options}
                    onAnswer={(option) => handleAnswer(q.question, option)}
                  />
                ))}

                {!isTimeRemaining && <p className="text-center mt-5">Time has completed. Questions are not available.</p>}

                {isTimeRemaining && (
                  <div className="d-flex flex-row mt-5">
                    <div className="col-12 col-md-11"> <button className="reportedbutton p-2 mr-2" onClick={handlePrev} disabled={currentQuestion === 0}>
                      Previous
                    </button>
                      {currentQuestion === questions.length - 1 && (
                        <button className='p-2 resume1 ' onClick={handleSubmit}>Submit</button>
                      )}
                    </div>

                    <div className="col-12 col-md-1 mt-1 "> <button className="reportedbutton p-2" onClick={handleNext} disabled={currentQuestion === questions.length - 1}>
                      Next
                    </button></div>


                  </div>
                )}
              </div>
            </div>
            <div className={` mt-5 col-${sidebar ? '' : 'md-4'}`}>
              <div className="">
                <div className="">
                  <div className={`toggle-icon ${sidebar ? '' : ''}`} onClick={handleSide}>
                    <Tooltip title={sidebar ? "Collapse Sidebar" : "Expand Sidebar"} arrow>
                      <div className={`toggle-icon ${sidebar ? '' : ''}`} onClick={handleSide}>
                        {sidebar ? (
                          <FontAwesomeIcon icon={faCaretRight} />
                        ) : (
                          <FontAwesomeIcon icon={faCaretLeft} />
                        )}
                      </div>
                    </Tooltip>

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
    onAnswer(question, option);
  };

  return (
    <div className="mt-5">
      <h3>{` ${questionNumber}. ${question}`}</h3>
      <ul style={{ listStyle: "none" }}>
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
  );
};
export default Resumetext;
