import { useRef, useState } from 'react'
import '@tensorflow/tfjs-backend-cpu'
import '@tensorflow/tfjs-backend-webgl'
import * as cocosd from '@tensorflow-models/coco-ssd'
import styled from 'styled-components'

const BoxContainerstyle = styled.div`
  position: absolute;
  left: ${({ x }) => x + "px"};
  top: ${({ y }) => y + "px"};
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border: 4px solid #1ac71a;
  background-color: transparent;
  z-index: 20;
  &::before {
    content: "${({ classType, score }) => `${classType} ${score.toFixed(1)}%`}";
    color: #1ac71a;
    font-weight: 500;
    font-size: 17px;
    position: absolute;
    top: -1.5em;
    left: -5px;
  }
`;

 
function DetectionFromImage() {
  const [loading,setLoading]=useState(false)
  const inputRef=useRef()
  const imageRef=useRef()
  const [image,setImage]=useState(null)
  const [predictions,setPredictions]=useState([])
  const imagePicker=()=>{
    inputRef.current &&
    inputRef.current.click()
  }
  const imageSelector=(e)=>{
    setPredictions([]);
    setLoading(true);
    const file=e.target.files[0]
    if(file){
      const reader=new FileReader()
      reader.onload=(e)=>{
        setImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
    
    const imageElement=document.createElement('img')
    
   imageElement.src=URL.createObjectURL(file)
    console.log(imageElement)
    imageElement.onload=async ()=>{
      console.log("image loaded")
      const imageSize={
        width:imageElement.width,
        height:imageElement.height
      }
      await detect(imageElement,imageSize)
      setLoading(false)
  }
  }
  const normalizePredictions = (predictions, imgSize) => {
    if (!predictions || !imgSize || !imageRef) return predictions || [];
    return predictions.map((prediction) => {
      const { bbox } = prediction;
      const oldX = bbox[0];
      const oldY = bbox[1];
      const oldWidth = bbox[2];
      const oldHeight = bbox[3];

      const imgWidth = imageRef.current.width;
      const imgHeight = imageRef.current.height;

      const x = (oldX * imgWidth) / imgSize.width;
      const y = (oldY * imgHeight) / imgSize.height;
      const width = (oldWidth * imgWidth) / imgSize.width;
      const height = (oldHeight * imgHeight) / imgSize.height;

      return { ...prediction, bbox: [x, y, width, height] };
    });
  };

  const detect=async(imageElement,imageSize)=>{
    const model=await cocosd.load()
    const predictions=await model.detect(imageElement)

    console.log("predicting")
    console.log("predictions",predictions)
    const normalizedPredictions = normalizePredictions(predictions, imageSize);
    setPredictions(normalizedPredictions);
  }



  



  


  return (
    <div className="App">
      <h1>Tensorflow.js Object Detection</h1>
      <div className="container"
      style={{display:"flex",flexDirection:"column",alignItems:"center"}}
      >
        <div className="image-container" 
           style={{
            minWidth: 700,
    height: 500,
     border: "3px solid #ccc",
    borderRadius: "4px",
    padding: "5px",
    display: "flex",
  
   alignItems: "center",
    justifyContent: "center",
    position:" relative"
             }
            }
        
        >
         {image && <img src={image} alt=""
       
          ref={imageRef}
          style={{
            height: "100%",
            width:"100%"
          }}
         
          
         />}
          {
            predictions && predictions.map((prediction,index)=>{
              
              return (
                <BoxContainerstyle
                key={index}
                x={prediction.bbox[0]}
                y={prediction.bbox[1]}
                width={prediction.bbox[2]}
                height={prediction.bbox[3]}
                classType={prediction.class}
                score={prediction.score * 100}
                />
              )
            }
            )
          }
        </div>
      <input type="file" name="image" id="image" ref={inputRef} 
      onChange={ imageSelector}
      style={{display:"none"}}
      />
      <button 
      style={{
        padding: "10px 20px",
    backgroundColor: "#1ac71a",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    marginTop: "10px",
    cursor: "pointer",
    outline: "none",
    fontSize: "18px"
        
      }}
      onClick={
        imagePicker
      }
      >
        {
          loading ? "Recognizing..." : "Pick Image"
        }</button>
        </div>
        <div className="predictions">
          { 
            predictions.length>0 &&
            <>
            <h4>{predictions[0].class}</h4>
            <h5>{predictions[0].score*100}</h5>
            </>
          }
        </div>


      
     </div>
  )
}


export default DetectionFromImage
