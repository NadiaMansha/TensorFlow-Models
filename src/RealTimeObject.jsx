import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import Webcam from 'react-webcam';
export default function RealTimeObject() {
  const [objects, setObjects] = useState([]);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  useEffect(() => {
    const runCoco = async () => {
      const net = await cocossd.load();
      setInterval(() => {
        detect(net);
      }, 10);
    };
    runCoco();
  }, []);
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
  
      // Set video width and height
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
  
      // Make detections
      const obj = await net.detect(video);
  
      // Draw bounding boxes
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Loop through each detected object
      obj.forEach((d) => {
        // Get x, y, width and height coordinates
        const x = d.bbox[0];
        const y = d.bbox[1];
        const width = d.bbox[2];
        const height = d.bbox[3];
  
        // Draw the bounding box
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.strokeStyle = "green";
        ctx.rect(x, y, width, height);
        ctx.stroke();
  
        // Draw the label and score
        ctx.fillStyle = "green";
        ctx.fillText(d.class + " - " + d.score.toFixed(2), x, y);
      });
  
      // Set objects in state
      setObjects(obj);
    }
  };
  
  return (
  

     
  <div>
    <h1>Real time Object Detection using Tensorflow.js</h1>
    <Webcam 
   
    ref={webcamRef}
    muted={true} 
    style={{
      position: "absolute",
      marginLeft: "auto",
      marginRight: "auto",
      left: 0,
      right: 0,
      textAlign: "center",
      zindex: 9,
      width: 640,
      height: 480,
    }}
  />

  <canvas
    ref={canvasRef}
    style={{
      position: "absolute",
      marginLeft: "auto",
      marginRight: "auto",
      left: 0,
      right: 0,
      textAlign: "center",
      zindex: 8,
      width: 640,
      height: 480,
    }}
  />
     
      
  </div>
);
}
      