import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../Sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import JoditEditor from "jodit-react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import Basic from "./Basic";
import "./Practice.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SelectQuestion from "./SelectQuestion";
import "./Practice.css";
import apiList from "../liberary/apiList";

function CreateTest() {
  const editor = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const steps = ["BASIC", "SELECT QUESTION"];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [topic, setTopic] = useState("");
  const [testName, setTestName] = useState("");
  const [practiceType, setPracticeType] = useState("");
  const [questions, setQuestions] = useState("");
  // const [allQuestionData, setAllQuestionData] = useState("");
  const [addSection, setAddSection] = useState(false);
  // const [category, setCategory] = useState("");
  // const [topic, setTopic] = useState("");
  const [practiceTopic, setPracticeTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [mcq, setMcq] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [questionListMcq, setQuestionListMcq] = useState([]);
  const [questionListParag, setQuestionListParag] = useState([]);
  const [questionListCoding, setQuestionListCoding] = useState([]);
  const [allQuestionData, setAllQuestionData] = useState("");
  const [viewCheckbox, setViewCheckbox] = useState(false);
  const [showMcqBox, setShowMcqBox] = useState(false);
  const [showParagBox, setShowParagBox] = useState(false);
  const [showCodingBox, setShowCodingBox] = useState(false);
  const [itisLoading, setItisLoading] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      testName &&
      practiceType &&
      questions &&
      selectedSubject &&
      selectedChapters &&
      questionListMcq ||
      questionListParag ||
      questionListCoding !== ""
    ) {
      try {
        const practiceData = {
          testName: testName,
          practiceType: practiceType,
          questions: questions,
          selectedSubject: selectedSubject,
          selectedChapters: selectedChapters,
          questionListMcq: questionListMcq,
          questionListParag: questionListParag,
          questionListCoding: questionListCoding,
        };
        console.log(practiceData);
        const res = await axios.post(
          `${apiList.addtestinpractice}/${category}/${topic}`,
          practiceData
        );
        setAllQuestionData(res.data);
        if (res.status === 200) {
          toast.success("Questions Created Successfully", {
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
          setTimeout(function () {}, 3000);
          fetchData();
        }
      } catch (error) {
        console.log(error.res.data);
      }
    } else {
      toast("Enter Required details", {
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
    }
  };
  const [topicdetails, settopicdetails] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const [allsubjectsData, setAllsubjectsData] = useState([]);
  const fetchsubjectsData = async () => {
    const api = `${apiList.subjects}`;
    try {
      const response = await axios.get(api, {});
      const data = response.data;
      setAllsubjectsData(response.data);
      setItisLoading(false)
    } catch (error) {
      console.error("Error fetch blogs:", error);
    }
  };
  useEffect(() => {
    fetchsubjectsData();
  }, []);

  const fetchData = async () => {
    const api = `${apiList.allpractices}`;
    try {
      const response = await axios.get(api, {});
      settopicdetails(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetch blogs:", error);
    }
  };

  const openMcqBox = () => {
    setShowMcqBox(true);
    setShowParagBox(false);
    setShowCodingBox(false)
  };

  const openParagBox = () => {
    setShowMcqBox(false);
    setShowParagBox(true);
    setShowCodingBox(false)
  };

  const openCodingBox =()=>{
    setShowMcqBox(false);
    setShowParagBox(false);
    setShowCodingBox(true)
  }

  const handleSubjectChange = (event) => {
    const newSelectedSubject = event.target.value;
    setSelectedSubject(newSelectedSubject);
    setSelectedChapters([]); // Reset selected chapters
    console.log("Selected Subject:", newSelectedSubject);
  };

  console.log(selectedSubject, "subjects");

  const handleChapterChange = (chapterName) => {
    setQuestionListMcq([]);

    setSelectedChapters((prevChapters) => {
      if (prevChapters.includes(chapterName)) {
        // If chapter is already selected, remove it
        return prevChapters.filter((chapter) => chapter !== chapterName);
      } else {
        // If chapter is not selected, add it
        return [...prevChapters, chapterName];
      }
    });
  };
  console.log(selectedChapters, "Chapters");

  //to handle mcq data and parag data
  const handleQuestionList = (e,questionData) => {
    const checkboxvalue= e.target.checked
    console.log(checkboxvalue)
    setQuestionListMcq((prevQuestions) => {
      if (!e.target.checked) {
        return prevQuestions.filter(
          (selectedQuestion) => selectedQuestion._id !== questionData._id
        );
      } else {
        return [...prevQuestions, questionData];
      }
    });
  };
  console.log(questionListMcq, "Mcq");
  const toggleVisibility = () => {
    setAddSection(!addSection);
  };

  const toggleCheckbox = () => {
    setViewCheckbox(!viewCheckbox);
  };

  const handleParagQuestionList = (e,paragdata) => {
    setQuestionListParag((prevQuestions) => {
      if (!e.target.checked) {
        return prevQuestions.filter(
          (selectedQuestion) => selectedQuestion._id !== paragdata._id
        );
      } else {
        return [...prevQuestions, paragdata];
      }
    });
  };

  const hanldeCodingQuestionList = (e,codingdata) => {
    setQuestionListCoding((prevQuestions) => {
      if (!e.target.checked) {
        return prevQuestions.filter(
          (selectedQuestion) => selectedQuestion._id !== codingdata._id
        );
      } else {
        return [...prevQuestions, codingdata];
      }
    });
  };
  console.log(questionListCoding,"Coding")
  const handleCategorySelection = (event) => {
    setCategory(
      event.target.options[event.target.selectedIndex].getAttribute(
        "data-value"
      )
    );
  };
  const handleTopicSelection = (event) => {
    setTopic(
      event.target.options[event.target.selectedIndex].getAttribute(
        "data-value"
      )
    );
  };
  const isFormValid = () => {
    return selectedSubject !== "" && selectedChapters.length > 0;
  };
  const handleTestNameSelection = (event) => {
    setTestName(event.target.value);
  };
  const handlePracticeTypeSelection = (event) => {
    setPracticeType(
      event.target.options[event.target.selectedIndex].getAttribute(
        "data-value"
      )
    );
  };
  const handleQuestionSelection = (event) => {
    setQuestions(event.target.value);
  };
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    menuBtnChange();
  };

  const menuBtnChange = () => {
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");
    const searchBtn = document.querySelector(".bx-search");

    if (sidebar?.classList.contains("open")) {
      closeBtn?.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn?.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  };
  const handleViewClick = (e) => {
    e.preventDefault();
    //
    navigate("/testTable");
  };
  return (
    <div>
      <div className="container-fluid ">
        <div className="row">
          {isOpen && (
            <div className=" col-12 col-lg-3 col-md-12 sectioncard121">
              <Sidebar />
              <ToastContainer />
            </div>
          )}
          <div
            className={`my-3 col-12 col-md-${isOpen ? 12 : 9} col-lg-${
              isOpen ? 9 : 12
            }`}
          >
            
            {itisLoading ? (
							<>
								<div
									className="d-flex flex-row justify-content-center align-items-center"
									style={{ height: "100vh" }}
								>
									<div className="loader loader1">
										<div>
											<div>
												<div>
													<div>
														<div>
															<div></div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>
						) : (

            <div className="">
              <i
                className="fa-solid fa-bars bars  d-lg-block d-none"
                onClick={toggleSidebar}
              ></i>
              <div class="">
                <h3 className="text-center" style={{color:"#16c3ea"}}>Create Test</h3>
                <Container>
                  <Box
                    sx={{ bgcolor: "#F9F9F9" }}
                    style={{ padding: "30px 30px 30px 30px" }}
                  >
                    <Stepper activeStep={activeStep}>
                      {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                          labelProps.optional = (
                            <Typography variant="caption"></Typography>
                          );
                        }
                        if (isStepSkipped(index)) {
                          stepProps.completed = false;
                        }
                        return (
                          <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                    {activeStep === steps.length ? (
                      <React.Fragment>
                        <Typography style={{fontSize:"20px"}} sx={{ mt: 2, mb: 1, ml:1 }}>
                          All steps completed - you&apos;re finished
                        </Typography>
                        <Box
                          sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                        >
                          <Box sx={{ flex: "1 1 auto" }} />
                          <Button onClick={handleViewClick}>View</Button>
                        </Box>
                      </React.Fragment>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <React.Fragment>
                          {activeStep === 0 && (
                            <>
                              <div className="basic">
                                <div className="container createWrapper">
                                  <div className="row rowWrapper">
                                    <div className="col-md-6 sectionWrapper">
                                      <label style={{fontWeight:"600"}}>
                                        Category<sup className="star">*</sup>
                                      </label>
                                      <select
                                        id="category"
                                        className="form-control"
                                        onChange={handleCategorySelection}
                                      >
                                        <option selected>
                                          Select Category
                                        </option>
                                        {topicdetails?.map((each) => (
                                          <option
                                            key={each.id}
                                            data-value={each._id}
                                          >
                                            {each.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    <div className="col-md-6 sectionWrapper">
                                      <label style={{fontWeight:"600"}}>
                                        Topic <sup className="star">*</sup>
                                      </label>
                                      <select
                                        id="topic"
                                        className="form-control"
                                        onChange={handleTopicSelection}
                                      >
                                        <option selected>Select Topic</option>
                                        {topicdetails?.map((each) =>
                                          each.Practicetopic.map((test) => (
                                            <option
                                              key={test.id}
                                              data-value={test._id}
                                            >
                                              {test.topicName}
                                            </option>
                                          ))
                                        )}
                                      </select>
                                    </div>
                                    <div className="col-md-6 sectionWrapper">
                                      <label style={{fontWeight:"600"}}>
                                        Test Name <sup className="star">*</sup>
                                      </label>
                                      <input
                                        type="text"
                                        id="TestName"
                                        placeholder="Test Name"
                                        className="form-control"
                                        onChange={(e) =>
                                          setTestName(e.target.value)
                                        }
                                      ></input>
                                    </div>
                                    <div className="col-md-6 sectionWrapper ">
                                      <label style={{fontWeight:"600"}}>
                                        Practice Type <sup className="star">*</sup>
                                      </label>
                                      <select
                                        onChange={handlePracticeTypeSelection}
                                        className="form-control"
                                      >
                                        <option selected>Select Type</option>
                                        {/* <option value="Test Topic">Test Topic</option> */}
                                        <option data-value="MCQ">MCQ</option>
                                        <option data-value="Coding">
                                          Coding
                                        </option>

                                        <option data-value="writing">
                                          writing
                                        </option>
                                      </select>
                                    </div>
                                    <div className="col-md-6 sectionWrapper">
                                      <label style={{fontWeight:"600"}}>
                                        Question Count <sup className="star">*</sup>
                                      </label>
                                      <input
                                        type="text"
                                        id="questions"
                                        placeholder="Count"
                                        className="form-control"
                                        onChange={(e) =>
                                          setQuestions(e.target.value)
                                        }
                                      ></input>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          {activeStep === 1 && (
                            <>
                              <div className="container">
                                {/* <h6>Required Questions:0</h6>
        <h6>Selected Questions:0</h6> */}
                                <div className="row">
                                  <div className=" testSubJectBox">
                                    <div className="">
                                      <label className="">
                                        Select Subject
                                      </label>
                                      <select
                                        className="testInput form-control w-50"
                                        value={selectedSubject}
                                        onChange={handleSubjectChange}
                                      >
                                        <option value="">Select Subject</option>
                                        {allsubjectsData?.map((subject) => (
                                          <option
                                            key={subject._id}
                                            value={subject.name}
                                          >
                                            {subject.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    <br />
                                    {/* <p>Question :0</p> */}
                                    <div className=" btnCard">
                                      <button
                                        type="button"
                                        className="btnBox"
                                        onClick={toggleVisibility}
                                        style={{backgroundColor:"#16c3ea", borderRadius:"4px", padding:"7px"}}
                                      >
                                        Show Chapters
                                      </button>
                                    </div>
                                  </div>
                                  {/* <div className="col-4 selectbtn">
            <button className="btnBox1">Add Subject</button>
          </div> */}
                                </div>
                                {addSection && (
                                  <div className="">
                                    {/* <h6>Chapters:</h6> */}
                                    {selectedSubject &&
                                      allsubjectsData.map((subject) => {
                                        if (subject.name === selectedSubject) {
                                          return (
                                            <div key={subject._id}>
                                              {subject?.chapter?.map(
                                                (chapter, id) => (
                                                  <div
                                                    key={id}
                                                    className="checkboxSection1 mt-2"
                                                  >
                                                    <input
                                                      type="checkbox"
                                                      id={`chapter_${id}`}
                                                      checked={selectedChapters.includes(
                                                        chapter.Name
                                                      )}
                                                      onChange={() =>
                                                        handleChapterChange(
                                                          chapter.Name
                                                        )
                                                      }
                                                      onClick={toggleCheckbox}
                                                    />
                                                    <label
                                                      className="labelTest "
                                                      htmlFor={`chapter_${id}`}
                                                    >
                                                      {chapter.Name}
                                                    </label>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          );
                                        }
                                        return null;
                                      })}
                                  </div>
                                )}
                                {viewCheckbox && (
                                  <div>
                                    <div className="viewCheckBoxBtn">
                                      <button
                                        type="button"
                                        className="btnBox2"
                                        onClick={openMcqBox}
                                      >
                                        MCQ
                                      </button>
                                      <button
                                        type="button"
                                        className="btnBox2"
                                        onClick={openParagBox}
                                      >
                                        PARAGRAPH
                                      </button>
                                      <button
                                        type="button"
                                        className="btnBox2"
                                        onClick={openCodingBox}
                                      >
                                        CODING
                                      </button>
                                    </div>

                                    {showMcqBox && (
                                      <>
                                        <div className="mt-2">
                                          {selectedSubject &&
                                            allsubjectsData.map((subject) => {
                                              if (
                                                subject.name === selectedSubject
                                              ) {
                                                return (
                                                  <div key={subject._id}>
                                                    {subject?.chapter?.map(
                                                      (chapter) => {
                                                        if (
                                                          selectedChapters.includes(
                                                            chapter.Name
                                                          )
                                                        ) {
                                                          return (
                                                            <div
                                                              key={chapter._id}
                                                            >
                                                              {chapter.MCQ.map(
                                                                (mcq) => (
                                                                  <div
                                                                    key={
                                                                      mcq._id
                                                                    }
                                                                    className="mt-2"
                                                                  >
                                                                    <input
                                                                      type="checkbox"
                                                                      id={`mcq_${mcq._id}`}
                                                                      value={
                                                                        mcq.Question
                                                                      }
                                                                      checked={questionListMcq.map(q => q?._id).includes(
                                                                        mcq._id
                                                                      )}
                                                                      onChange={(e) =>
                                                                        handleQuestionList(
                                                                          e,mcq
                                                                        )
                                                                      }
                                                                    />
                                                                    <label
                                                                      className="labelTest"
                                                                      htmlFor={`mcq_${mcq._id}`}
                                                                    >
                                                                      {
                                                                        mcq.Question
                                                                      }
                                                                    </label>
                                                                  </div>
                                                                )
                                                              )}
                                                            </div>
                                                          );
                                                        }
                                                        return null;
                                                      }
                                                    )}
                                                  </div>
                                                );
                                              }
                                              return null;
                                            })}
                                        </div>
                                      </>
                                    )}

                                    {showParagBox && (
                                      <>
                                        <div className="mt-2">
                                          {selectedSubject &&
                                            allsubjectsData.map((subject) => {
                                              if (
                                                subject.name === selectedSubject
                                              ) {
                                                return (
                                                  <div key={subject._id}>
                                                    {subject?.chapter?.map(
                                                      (chapter) => {
                                                        if (
                                                          selectedChapters.includes(
                                                            chapter.Name
                                                          )
                                                        ) {
                                                          return (
                                                            <div
                                                              key={chapter._id}
                                                            >
                                                              {chapter.paragMCQ.map(
                                                                (parag) => (
                                                                  <div
                                                                    key={
                                                                      parag._id
                                                                    }
                                                                    className="mt-2"
                                                                  >
                                                                    <input
                                                                      type="checkbox"
                                                                      id={`parag_${parag._id}`}
                                                                      value={
                                                                        parag.Question
                                                                      }
                                                                      checked={questionListParag.map(q=>q?._id).includes
                                                                        (parag._id
                                                                      )}
                                                                      onChange={(e) =>
                                                                        handleParagQuestionList(e,
                                                                          parag
                                                                        )
                                                                      }
                                                                    />
                                                                    <label
                                                                      className="labelTest"
                                                                      htmlFor={`parag_${parag._id}`}
                                                                    >
                                                                      {
                                                                        parag.Question
                                                                      }
                                                                    </label>
                                                                  </div>
                                                                )
                                                              )}
                                                            </div>
                                                          );
                                                        }
                                                        return null;
                                                      }
                                                    )}
                                                  </div>
                                                );
                                              }
                                              return null;
                                            })}
                                        </div>
                                      </>
                                    )}
                                    {showCodingBox && (
                                      <>
                                        <div className="mt-2">
                                          {selectedSubject &&
                                            allsubjectsData.map((subject) => {
                                              if (
                                                subject.name === selectedSubject
                                              ) {
                                                return (
                                                  <div key={subject._id}>
                                                    {subject?.chapter?.map(
                                                      (chapter) => {
                                                        if (
                                                          selectedChapters.includes(
                                                            chapter.Name
                                                          )
                                                        ) {
                                                          return (
                                                            <div
                                                              key={chapter._id}
                                                            >
                                                              {chapter.codingbasic.map(
                                                                (coding) => (
                                                                  <div
                                                                    key={
                                                                      coding._id
                                                                    }
                                                                    className="mt-2"
                                                                  >
                                                                    <input
                                                                      type="checkbox"
                                                                      id={`coding_${coding._id}`}
                                                                      value={
                                                                        coding.Description
                                                                      }
                                                                      checked={questionListCoding.map(q => q?._id).includes(
                                                                        coding._id
                                                                      )}
                                                                      onChange={(e) =>
                                                                        hanldeCodingQuestionList(
                                                                          e,coding
                                                                        )
                                                                      }
                                                                    />
                                                                    <label
                                                                      className="labelTest"
                                                                      htmlFor={`coding_${coding._id}`}
                                                                    >
                                                                      {
                                                                        coding.Description
                                                                      }
                                                                    </label>
                                                                  </div>
                                                                )
                                                              )}
                                                            </div>
                                                          );
                                                        }
                                                        return null;
                                                      }
                                                    )}
                                                  </div>
                                                );
                                              }
                                              return null;
                                            })}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            </>
                          )}

                          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              pt: 2,
                            }}
                          >
                            <Button
                              color="inherit"
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              sx={{ mr: 1 }}
                            >
                              Back
                            </Button>
                            <Box sx={{ flex: "1 1 auto" }} />
                            {isStepOptional(activeStep) && (
                              <Button
                                color="inherit"
                                className="btn12"
                                onClick={handleSubmit}
                                disabled={!isFormValid()}
                                sx={{ mr: 1 }}
                              >
                                Submit
                              </Button>
                            )}

                            <Button onClick={handleNext}>
                              {activeStep === steps.length - 1
                                ? "Finish"
                                : "Next"}
                            </Button>
                          </Box>
                        </React.Fragment>
                      </form>
                    )}
                  </Box>
                </Container>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTest;
