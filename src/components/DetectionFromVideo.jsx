import React, { useRef, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs-backend-cpu'


function DetectionFromVideo () {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const videoRef = useRef(null);

  const loadModel = async () => {
    const loadedModel = await cocoSsd.load();
    setModel(loadedModel);
  }

  const detectObjects = async () => {
    if (videoRef.current && model) {
      const video = videoRef.current;
      const prediction = await model.detect(video);
      setPredictions(prediction);
      requestAnimationFrame(detectObjects);
    }
  }

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  }

  const handleVideoLoad = () => {
    loadModel();
    detectObjects();
  }

  return (
    <div className="App">
      <h1>TensorFlow.js Object Detection on Video</h1>
      <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="video-container">
          <video 
          autoPlay
          src={videoFile ? URL.createObjectURL(videoFile) : "https://www.youtube.com/watch?v=o-ax1jAbfJ8"} controls ref={videoRef} style={{ position: "relative"}} onLoadedData={handleVideoLoad}></video>
          <input type="file" onChange={handleVideoChange} />
          {
            predictions && predictions.map((prediction, index) => {
              return (
                <BoxContainerStyle
                  key={index}
                  x={prediction.bbox[0]}
                  y={prediction.bbox[1]}
                  width={prediction.bbox[2]}
                  height={prediction.bbox[3]}
                  classType={prediction.class}
                  score={prediction.score * 100}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

const BoxContainerStyle = ({ x, y, width, height, classType, score }) => {
  return (
    <div className="box-container" style={{ position: "absolute", top: y, left: x, width: width, height: height }}>
      <div className="box" style={{ position: "absolute", width: "100%", height: "100%", border: "2px solid #0F0", borderRadius: "5px" }}>
        <div className="class-type" style={{ position: "absolute", top: "0px", left: "0px", backgroundColor: "#0F0", color: "#000", padding: "2px 5px", fontSize: "12px" }}>{classType}</div>
        <div className="score" style={{ position: "absolute", bottom: "0px", right: "0px", backgroundColor: "#0F0", color: "#000", padding: "2px 5px", fontSize: "12px" }}>{score}%</div>
      </div>
    </div>
  );
}

export default DetectionFromVideo;
