import React from "react";
import { IoMdBook } from "react-icons/io";
import moment from "moment"; // Import the moment library for date formatting

const Card = ({ learningPath }) => {
  const {
    learningPathTitle,
    relevantSkillTags,
    coverLetter,
    difficultyLevel,
    subscription,
    price,
    discount,
    authorName,
    hours,
    minutes,
    learningimg,
    fileName,
    requirements,
    CurrentTime,
    topics,
  } = learningPath;

  return (
    <div className="card">
      <img src={learningimg} alt={learningPathTitle} className="card-img" />
      <div className="card-content">
        <h2 className="card-title">{learningPathTitle}</h2>
        <p>Author: {authorName}</p>
        <p>Difficulty Level: {difficultyLevel}</p>
        <p>Subscription: {subscription}</p>
        <p>Price: {price}</p>
        <p>Discount: {discount}</p>
        <p>
          Duration: {hours} hours {minutes} minutes
        </p>
        <p>Requirements: {requirements}</p>
        <p>
          Published on:{" "}
          {moment(CurrentTime).format("MMMM DD, YYYY [at] hh:mm A")}
        </p>
        <div className="topics">
          <h3>Topics:</h3>
          <ul>
            {topics &&
              topics.map((topic, index) => (
                <li key={index}>
                  <strong>{topic.topicName}</strong>: {topic.description}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="card-buttons">
        <button
          className="custom-button"
          onClick={() => console.log("Open clicked")}
        >
          Open
        </button>
      </div>
    </div>
  );
};

export default Card;
