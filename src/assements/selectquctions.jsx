import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

import './assement.css'
import apiList from '../liberary/apiList';
function Selectquctions() {
  const [isChapterListVisible, setChapterListVisible] = useState(false);
  const [isChapterListVisible1, setChapterListVisible1] = useState(false);
  const toggleChapterList = () => {
    setChapterListVisible(!isChapterListVisible);
  };

  const Checkbox = () => {
    setChapterListVisible1(!isChapterListVisible1);
  }
  const [selectedSubjectId, setSelectedSubjectId] = useState("");

  const handleSubjectTagTypeSelection = (event) => {
    setSelectedSubjectId(event.target.value);
    setSubjects(
      event.target.options[event.target.selectedIndex].getAttribute(
        "data-value"
      )
    );
  };
  const [selectedChapterId, setSelectedChapterId] = useState("");
  const [Chapters, setChapters] = useState("");
  const handleChapterTagTypeSelection = (event) => {
    setSelectedChapterId(event.target.value);
    setChapters(
      event.target.options[event.target.selectedIndex].getAttribute(
        "data-value"
      )
    );
  };

  console.log(selectedChapterId);
  useEffect(() => {
    fetchsubjectsData();
    fetchsubjectsData1()
  }, []);
  console.log(selectedSubjectId);
  const [Subjects, setSubjects] = useState("");
  const [allsubjectsData, setAllsubjectsData] = useState([]);
  const fetchsubjectsData = async () => {
    const api = `${apiList.getbasic}`;
    try {
      const response = await axios.get(api, {});
      const data = response.data;
      setAllsubjectsData(response.data);
    } catch (error) {
      console.error("Error fetch blogs:", error);
    }
  };
  const [blogslist, setbloslist] = useState([])
  const fetchsubjectsData1 = async () => {
    const api = `${apiList.getMCQs}/${selectedSubjectId}/${selectedChapterId}`;
    try {
      const response = await axios.get(api, {});
      const data = response.data;
      setbloslist(response.data);
      console.log(response.data);

    } catch (error) {
      console.error("Error fetch blogs:", error);
    }
  };

  const [selectedMcqList, setSelectedMcqList] = useState({});
  const handleGoButtonClick = () => {
    const filteredMCQs = allsubjectsData
      .filter((subject) => subject?._id === selectedSubjectId)
      .flatMap((subject) =>
        subject.chapter.find((chapter) => chapter?._id === selectedChapterId)?.MCQ || []
      )

    console.log(filteredMCQs);
    setSelectedMcqList(filteredMCQs || "")
  };
  console.log("selectedMcqList", selectedMcqList)

  const handleClearFilterButtonClick = () => {
    setAllsubjectsData('');
  };
  const [SelectedparaList, setSelectedparaList] = useState({})
  const handleGetAllfilter = async () => {
    const api = `${apiList.getparamcqs}/${selectedSubjectId}/${selectedChapterId}/paragMCQ`
    try {
      const response = await axios.get(api, {});
      const data = response.data;
      setSelectedparaList(response?.data?.paragMCQs);

    } catch (error) {
      console.error("Error fetch blogs:", error);

    }
  }
  const [selectedQuestionType, setSelectedQuestionType] = useState('MCQ');
  const renderTable = () => {

    switch (selectedQuestionType) {
      case 'MCQ':
        return (
          <div>

            <table className="table text-center table-bordered">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Question</th>
                  <th>Difficulty </th>
                  <th>Positive</th>
                  <th>Negative</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(selectedMcqList) && selectedMcqList.length > 0 ? (
                  selectedMcqList.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.Question}</td>
                      <td>{item.Difficulty}</td>
                      <td>{item.positive}</td>
                      <td>{item.negative}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No data available for the selected criteria</td>
                  </tr>
                )}




              </tbody>
            </table>
            <div className="d-flex flex-row  justify-content-center">
                            <button className="creat12 mt-3">Continue</button>
                            </div>
          </div>
        );
      case 'Para':
        return (
          <div>
          
            <table className="table text-center table-bordered">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Question</th>
                  <th>Difficulty </th>
                  <th>Positive</th>
                  <th>Negative</th>
                </tr>
              </thead>
              <tbody>

                {Array.isArray(selectedMcqList) && selectedMcqList.length > 0 ? (
                  selectedMcqList.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.Question}</td>
                      <td>{item.Difficulty}</td>
                      <td>{item.positive}</td>
                      <td>{item.negative}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No data available for the selected criteria</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="d-flex flex-row  justify-content-center">
                            <button className="creat12 mt-3">Continue</button>
                            </div>
          </div>
        );

      case 'Coding':
        return (
          <div>
            <table className="table text-center table-bordered">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Question</th>
                  <th>Difficulty </th>
                  <th>Points</th>

                </tr>
              </thead>
              <tbody>

                {Array.isArray(selectedMcqList) && selectedMcqList.length > 0 ? (
                  selectedMcqList.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.Question}</td>
                      <td>{item.Difficulty}</td>
                      <td>{item.positive}</td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No data available for the selected criteria</td>
                  </tr>
                )}


              </tbody>
            </table>
            <div className="d-flex flex-row  justify-content-center">
                            <button className="creat12 mt-3">Continue</button>
                            </div>
          </div>
        );
      case 'Speaking':
        return (
          <div>
            <p>No Qustions were present</p>


            <div className="d-flex flex-row  justify-content-center">
                            <button className="creat12 mt-3">Continue</button>
                            </div>
          </div>
          
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className="col-md-6">
            <div className='d-flex flex-column'>
              <h5>Required Qustions:10</h5>
              <p>Selected Qustions:</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className='d-flex flex-column'>
              <h5>Required Qustions:10</h5>
              <p>Selected Qustions:</p>
            </div>
          </div>
          <div className='card123 shadow'>
            <select
              type="text"
              placeholder="...Select Subject"

              className="form-control"
              value={selectedSubjectId}
              onChange={handleSubjectTagTypeSelection}
            >
              <option className="hidden" value="">
                Select Subject
              </option>
              {allsubjectsData?.map((subject) => (
                <option
                  className="name_item"
                  key={subject._id}
                  data-value={subject.name}
                  value={subject._id}
                >
                  {subject.name}
                </option>
              ))}
            </select>
            <p onClick={toggleChapterList}>Show Chapters</p>
          </div>
        
                           
          {isChapterListVisible && (
            <div>
              <p>Chapters List:</p>
              <select
                type="text"
                placeholder="...Select Chapter"
                className="form-control"
                onChange={handleChapterTagTypeSelection}
                value={selectedChapterId}
              >
                <option>...select Chapter...</option>
                {allsubjectsData?.map((subject) =>
                  subject?.chapter?.map((chapter) => (
                    <option
                      className="name_item"
                      key={chapter._id} // Use a unique key for each option
                      data-value={chapter.Name}
                      value={chapter._id}
                    >
                      {chapter.Name}
                    </option>
                  ))
                )}
              </select>

              <div className='col-md-6'>
                <div className='d-flex flex-row'>
                  <input type='checkbox' onClick={Checkbox} /> <span className='mx-3'>Life Cycle Of Component</span>
                </div>
              </div>
              {/* <div className='col-md-6'>
                <div className='d-flex flex-row'>
                  <span>Selected Qustions:0</span>
                  <span>Selected Marks:0</span>
                </div>
              </div> */}
            </div>
          )}
          {isChapterListVisible1 && (

            <div>
              <div className='gobutton1'>
                <button className='gobutton ' onClick={handleGoButtonClick}>Go</button>
              </div>
              <div className='d-flex flex-row'>
                <button className="selectbuton mx-2" onClick={() => setSelectedQuestionType('MCQ')}>MCQ Questions</button>
                <button className="selectbuton mx-2" onClick={() => setSelectedQuestionType('Para')}>Para Questions</button>
                <button className="selectbuton mx-2" onClick={() => setSelectedQuestionType('Coding')}>Coding Questions</button>
                <button className="selectbuton mx-2" onClick={() => setSelectedQuestionType('Speaking')}>Speaking Questions</button>

              </div>
              {renderTable()}
            </div>
          )}


        </div>
      </div>
    </div>
  )
}

export default Selectquctions