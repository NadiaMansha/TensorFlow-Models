
import React, { useState } from "react";
import * as toxicity from "@tensorflow-models/toxicity";

const MyComponent = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [toxicityPredictions, setToxicityPredictions] = useState([]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleClassification = async () => {
    setLoading(true);
    const model = await toxicity.load(0.9);
    const predictions = await model.classify([text]);
    setToxicityPredictions(predictions);
    setLoading(false);
    console.log(predictions)
  };

  return (
    <div 
    style={{ display: "flex", flexDirection: "column", alignItems: "center",marginTop:"20px" }}
    >
        <h1>Text-Toxicity Detection in Tensorflow.js</h1>
      <textarea 
        style={{ width: "600px", height: "50px"
         ,
         border: "1px solid black",
            borderRadius: "5px",
            marginTop:"15px"
    
    }}
    placeholder="Enter text to classify"
      value={text} onChange={handleTextChange} />
      <button 
        style={{
            backgroundColor: "blue",
            color: "white",
            border: "none",
            padding: "15px 30px",
            borderRadius: "5px",
            marginTop: "30px",
            cursor: "pointer",
        }}
      onClick={handleClassification}>
       {
          loading ? "Classifying..." : "Classify"
       }
       </button>
      <ul
      >
        {
          toxicityPredictions.length > 0 &&
        toxicityPredictions.map((prediction, index) => (
          <li
          style={{
            listStyle: "none",
            marginTop: "10px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "green",
          }}

           key={index}>
            {prediction.label}: {prediction.results[0].match?.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
