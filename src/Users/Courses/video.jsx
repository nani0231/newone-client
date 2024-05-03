import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card"; // Import your Card component
import apiList from "../../liberary/apiList";

function LearningPaths() {
  const [learningPaths, setLearningPaths] = useState([]);

  useEffect(() => {
    const fetchLearningPaths = async () => {
      try {
        const response = await axios.get(
          `${apiList.allAddVideosData}`
        );
        setLearningPaths(response.data);
      } catch (error) {
        console.error("Error fetching learning paths:", error);
      }
    };

    fetchLearningPaths();
  }, []);

  return (
    <div>
      {learningPaths.map((learningPath) => (
        <Card key={learningPath._id} learningPath={learningPath} />
      ))}
    </div>
  );
}

export default LearningPaths;
