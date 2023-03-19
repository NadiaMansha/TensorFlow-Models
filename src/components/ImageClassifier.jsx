import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "@tensorflow/tfjs";
import * as mobileNet from "@tensorflow-models/mobilenet";
import { Spin } from "antd";
import { Tag } from "antd";
import 'antd/dist/reset.css';


const TagsContainer = ({ predictions }) => (
    <div className="tags-container">
        <h4>Predictions:</h4>
      {predictions.map(
        ({ className, probability }) =>
          probability.toFixed(3) > 0 && (
            <Tag className="tag" key={className} color="geekblue">
              {className.split(",")[0]} {probability.toFixed(3)}
            </Tag>
          )
      )}
    </div>
    );

const TagClassificationDemo = () => {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [imageURL, setImageURl] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      const model = await mobileNet.load();
      setModel(model);
    };
    loadModel();
  }, []);

  const handleUploadChange = ({ target }) => {
    setImageURl(URL.createObjectURL(target.files[0]));
  };

  const drawImageOnCanvas = (image, canvas, ctx) => {
    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const isLandscape = naturalWidth > naturalHeight;
    ctx.drawImage(
      image,
      isLandscape ? (naturalWidth - naturalHeight) / 2 : 0,
      isLandscape ? 0 : (naturalHeight - naturalWidth) / 2,
      isLandscape ? naturalHeight : naturalWidth,
      isLandscape ? naturalHeight : naturalWidth,
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );
  };

  const onImageChange = async ({ target }) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawImageOnCanvas(target, canvas, ctx);

    const predictions = await model.classify(canvas, 5);
    console.log(predictions)
    setPredictions(predictions);
  };

  const renderInput = () => (
    <>    <input
    className="input-file"

      type="file"
      onChange={handleUploadChange}
      accept="image/x-png,image/gif,image/jpeg"
    />
   
    </>
  );

  const renderPreview = () => (
    <canvas className="classified-image" 
    style={
        {
            width: "500px",
            height: "400px",
            border: "1px solid black",
            borderRadius: "5px",
            marginTop: "15px",
            marginBottom: "15px"
        }
    }
    ref={canvasRef}>
      <img alt="preview" onLoad={onImageChange} src={imageURL}
       
       />
    </canvas>
  );

  return (
    <div className="app" 
    style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px"
    }}
    >
        <h1>Image classifier using Mobilenet model</h1>
      {!model ? (
        <Spin size="large" tip="Loading Tag Classification Model" />
      ) : (
        <>
          {renderInput()}
          {imageURL && renderPreview()}
          {!!predictions.length && <TagsContainer predictions={predictions} />}
        </>
      )}
    </div>
  );
};

export default TagClassificationDemo;

