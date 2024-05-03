import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import apiList from "../../liberary/apiList";

const VideoFile = ({ match }) => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await axios.get(
          `${apiList.allAddVideosData}`
        );
        setVideos(responseData.videoFile);
        console.log(responseData);
        const folderNameFromURL = match.params.folderName;
        const currentIndex = responseData.videoFile.findIndex(
          (video) => video.VideofolderName === folderNameFromURL
        );
        setCurrentVideoIndex(currentIndex >= 0 ? currentIndex : 0);
      } catch (error) {
        console.error("Error Fetching Video Files", error);
      }
    };
    fetchData();
  }, [match.params.folderName]);

  const playNextVideo = () => {
    if (currentVideoIndex + 1 < videos.length) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      setCurrentVideoIndex(0);
    }
  };

  return (
    <>
      <div>
        <ReactPlayer
          url={videos[currentVideoIndex].Video1}
          controls
          width="100%"
          height={100}
          onEnded={playNextVideo}
        />
        <div className="video-item-info">
          <h3>{videos[currentVideoIndex].VideoTitleName}</h3>
          <p>Source: {videos[currentVideoIndex].SourceName}</p>
        </div>
        <div className="upcoming-video-list">
          {videos.map((video, index) => (
            <div
              key={video._id}
              className={`upcoming-video-item ${
                index === currentVideoIndex ? "current" : ""
              }`}
            >
              <h4>{video.VideoTitleName}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoFile;
