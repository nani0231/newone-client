import React, { useState, useRef } from "react";
import "./Practice.css";
import JoditEditor from "jodit-react";
// import { Editor } from '@tinymce/tinymce-react';

const Basic = (onSubmit) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [formData, setFormData] = useState({
    category: "",
    topic: "",
    testName: "",
    practiceType: "",
    questions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <>
      <div className="basic">
        <div className="container createWrapper">
          <div className="row rowWrapper">
            <form onSubmit={handleSubmit}>
              <div className="col-6 sectionWrapper">
                <label>
                  <b>Category*</b>
                </label>
                <select id="category" onChange={handleChange}>
                  <option selected>Select Category</option>
                  <option value={formData.category}>React.Js</option>
                  <option value={formData.category}>Node.Js</option>
                </select>
              </div>
              <div className="col-6 sectionWrapper">
                <label>
                  <b>Topic*</b>
                </label>
                <select id="topic" onChange={handleChange}>
                  <option selected>Select Topic</option>
                  <option value={formData.topic}>Test Topic</option>
                </select>
              </div>
              <div className="col-6 sectionWrapper">
                <label>
                  <b>Test Name*</b>
                </label>
                <input
                type="text"
                id="TestName"
                value={formData.testName}
                onChange={handleChange}></input>

              </div>
              <div className="col-6 sectionWrapper ">
                <label>
                  <b>Practice Topic*</b>
                </label>
                <select >
                  <option selected>Select Topic</option>
                  {/* <option value="Test Topic">Test Topic</option> */}
                  <option value={formData.practiceType}>MCQ</option>
                  <option value={formData.practiceType}>Coding</option>
                </select>
              </div>
              <div className="col-6 sectionWrapper">
                <label>
                  <b>Question*</b>
                </label>
                <input type="text" value={formData.questions}></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Basic;
