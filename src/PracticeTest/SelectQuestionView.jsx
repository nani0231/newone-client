import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom, toast } from "react-toastify";
import apiList from "../liberary/apiList";
import Sidebar from "../Sidebar";


function  SelectQuestionView() {
  const [addSection, setAddSection] = useState(false);
  const [category, setCategory] = useState("");
  const [topic, setTopic] = useState("");
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
  const [allQuestionData, setAllQuestionData] = useState("");
  const [viewCheckbox, setViewCheckbox] = useState(false);
  const [showMcqBox, setShowMcqBox] = useState(false);
  const [showParagBox, setShowParagBox] = useState(false);
	const [worksheetLoading, setWorksheetLoading] = useState(true);

  const navigate = useNavigate()

  const openMcqBox = () => {
    setShowMcqBox(true);
    setShowParagBox(false);
  };

  const openParagBox = () => {
    setShowMcqBox(false);
    setShowParagBox(true);
  };

  const [allsubjectsData, setAllsubjectsData] = useState([]);
  const fetchsubjectsData = async () => {
    const api = `${apiList.subjects}`;
    try {
      const response = await axios.get(api, {});
      const data = response.data;
      setAllsubjectsData(response.data);
      setWorksheetLoading(false)
    } catch (error) {
      console.error("Error fetch blogs:", error);
    }
  };
  useEffect(() => {
    fetchsubjectsData();
  }, []);

  console.log(allsubjectsData, "All Subjects");

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setSelectedChapters([]);
  };

  console.log(selectedSubject, "subjects");

  const handleChapterChange = (event) => {
    const chapterName = event.target.value;
    const isChecked = event.target.checked;
    setQuestionListMcq([]);

    if (isChecked) {
      setSelectedChapters([...selectedChapters, chapterName]); // Add to selected chapters
    } else {
      setSelectedChapters(
        selectedChapters.filter((chapter) => chapter !== chapterName)
      ); // Remove from selected chapters
    }
  };
  console.log(selectedChapters, "Chapters");

  //to handle mcq data and parag data
  const handleQuestionList = (e, mcq) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setQuestionListMcq([...questionListMcq, mcq.Question]);
    } else {
      setQuestionListMcq(
        questionListMcq.filter(
          (selectedQuestion) => selectedQuestion !== mcq.Question
        )
      );
    }
  };

  const handleParagQuestionList = (e, parag) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setQuestionListParag([...questionListParag, parag.Question]);
    } else {
      setQuestionListParag(
        questionListParag.filter(
          (selectedQuestion) => selectedQuestion !== parag.Question
        )
      );
    }
  };
  // console.log(selectedChapters, "chapter");
  console.log(questionListParag, "parag");
  const onSubmitQuestion = async (e) => {
    e.preventDefault();
    if (
      category &&
      topic &&
      practiceTopic &&
      question &&
      subject &&
      chapter &&
      mcq &&
      paragraph !== ""
    ) {
      try {
        const testData = {
          category: category,
          topic: topic,
          practiceTopic: practiceTopic,
          question: question,
          subject: subject,
          chapter: chapter,
          mcq: mcq,
          paragraph: paragraph,
        };
        console.log(testData);
        const response = await axios.post(
          `${apiList.practiceTest}`,
          testData
        );
        setAllQuestionData(response.data);
        console.log(response.data);

        if (response.status === 200) {
          toast("Test Added Successfully", {
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
          navigate("");
        }
      } catch (error) {
        console.log(error.response.data);
        toast("Test already added", {
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
  const [isOpen, setIsOpen] = useState(true);

  const toggleVisibility = () => {
    setAddSection(!addSection);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    menuBtnChange();
  };
  const toggleCheckbox = () => {
    setViewCheckbox(!viewCheckbox);
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
  // console.log(allsubjectsData[12].chapter[0].MCQ, "all Subject Chapter");
  console.log(selectedChapters);
  console.log(questionListMcq);
  return (
    <>
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
            
            {/* <div
          colSpan="4"
          className="d-flex flex-row justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Audio type="Audio" color="#6a2a69" height={40} width={60} />
        </div> */}

            <div className="">
              <i
                className="fa-solid fa-bars bars  d-lg-block d-none"
                onClick={toggleSidebar}
              ></i>
              {worksheetLoading ? (
							<div
								colSpan="4"
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
						) : (
      <div className="">
        {/* <h6>Required Questions:0</h6>
        <h6>Selected Questions:0</h6> */}
        <div className="row">
            <div className="col-md-6 mt-3">
              <label style={{fontWeight:"500"}}>Select Subject</label>
              
              <select onChange={handleSubjectChange} className="form-control">
                <option value="">Select Subject</option>
                {allsubjectsData?.map((subject) => (
                  <>
                    <option
                      key={subject._id}
                      data-value={subject.name}
                      value={subject._id}
                      className="form-control"
                    >
                      {subject.name}
                    </option>
                  </>
                ))}
              </select>
            </div>
            <br/>
            {/* <p>Question :0</p> */}
            <div className="col-4 btnCard ">
              <button className="btnBox mt-5" style={{backgroundColor:"#16c3ea", color:"#000", padding:"7px", borderRadius:"4px"}} onClick={toggleVisibility}>
                Show Chapters
              </button>
            </div>
          </div>
          {/* <div className="col-4 selectbtn">
            <button className="btnBox1">Add Subject</button>
          </div> */}
        
        {addSection && (
          <div className="row">
            <div className="col-md-6">
              <div className="mt-3">
                {/* <h6>Chapters:</h6> */}
                {selectedSubject &&
                  allsubjectsData.map((subject) => {
                    if (subject._id === selectedSubject) {
                      return (
                        <div key={subject._id}>
                          {subject?.chapter?.map((chapter, id) => (
                            <div key={id} className="checkboxSection1">
                              <input
                                type="checkbox"
                                id={`chapter_${id}`}
                                value={chapter._id}
                                checked={selectedChapters.includes(chapter._id)}
                                onChange={handleChapterChange}
                                onClick={toggleCheckbox}
                              />
                              <label htmlFor={`chapter_${id}`} className="mt-1">
                                {chapter.Name}
                              </label>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>
            </div>
          </div>
        )}
        {viewCheckbox && (
          <div>
            <div className="viewCheckBoxBtn">
            <button className="btnBox2" onClick={openMcqBox}>MCQ</button>
            <button className="btnBox2" onClick={openParagBox}>PARAGRAPH</button>

            </div>

            {showMcqBox && (
              <>
                <div className="mt-3">
                  {allsubjectsData
                    .filter((subject) => subject._id === selectedSubject)
                    .map((selectedSubject) =>
                      selectedSubject.chapter
                        .filter((chapter) =>
                          selectedChapters.includes(chapter._id)
                        )
                        .map((selectedChapter) => (
                          <div key={selectedChapter._id}>
                            {/* <h3>{selectedChapter.Name}</h3> */}
                            {selectedChapter.MCQ.map((mcq) => (
                              <div key={mcq._id} className="mcqSection1">
                                <input
                                  type="checkbox"
                                  id={`mcq_${mcq._id}`}
                                  value={mcq.Question} // Pass the entire question object as the value
                                  checked={questionListMcq.includes(
                                    mcq.Question
                                  )}
                                  onChange={(e) => handleQuestionList(e, mcq)} // Pass the question object to the handler
                                />
                                <label htmlFor={`mcq_${mcq._id}`} className="mt-1">
                                  {mcq.Question}
                                </label>
                              </div>
                            ))}
                          </div>
                        ))
                    )}
                </div>
              </>
            )}

            {showParagBox && (
              <>
                <div className="mt-3">
                  {allsubjectsData
                    .filter((subject) => subject._id === selectedSubject)
                    .map((selectedSubject) =>
                      selectedSubject.chapter
                        .filter((chapter) =>
                          selectedChapters.includes(chapter._id)
                        )
                        .map((selectedChapter) => (
                          <div key={selectedChapter._id}>
                            {/* <h3>{selectedChapter.Name}</h3> */}
                            {selectedChapter.paragMCQ.map((parag) => (
                              <div key={parag._id} className="mcqSection1">
                                <input
                                  type="checkbox"
                                  id={`parag_${parag._id}`}
                                  value={parag.Question} // Pass the entire question object as the value
                                  checked={questionListParag.includes(
                                    parag.Question
                                  )}
                                  onChange={(e) =>
                                    handleParagQuestionList(e, parag)
                                  } // Pass the question object to the handler
                                />
                                <label htmlFor={`parag_${parag._id}`} className="mt-1">
                                  {parag.Question}
                                </label>
                              </div>
                            ))}
                          </div>
                        ))
                    )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
            )}
      </div>
      </div>
      </div>
      </div>
      </div>
    </>
  );
}

export default SelectQuestionView;
