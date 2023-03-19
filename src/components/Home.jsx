import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
    const linkstyle={
        textDecoration:"none",
        color:"white",
        fontSize:"20px",
        padding:"10px",
    
        borderRadius:"5px",
        margin:"10px",
    
    
    }
  return (
    <div 
    style={
        {
            display:"flex",
            flexDirection:"column",
          
            alignItems:"center",
            height:"100vh"
        }
    }>
        <h1>Tensorflow.js</h1>
        <button  
        style={
            {
                backgroundColor:"blue",
                color:"white",
                border:"1px solid black",
                borderRadius:"5px",
                padding:"10px",
                margin:"10px",
                width:"600px"
            }
        }>
        
        
            <Link to="/image-classifier"
            
            style={
                linkstyle
            }>Image classifier using mobilenet</Link>
          
        </button>
        <button 
         style={
            {
                backgroundColor:"blue",
                color:"white",
                border:"1px solid black",
                borderRadius:"5px",
                padding:"10px",
                margin:"10px",
                width:"600px"
            }
        }>  
            <Link to="/Text-toxicity"
            
            style={
                linkstyle
            }>Text toxicity detection using tensorflow.js</Link>
        </button>
        <button 
         style={
            {
                backgroundColor:"blue",
                color:"white",
                border:"1px solid black",
                borderRadius:"5px",
                padding:"10px",
                margin:"10px",
                width:"600px"
            }
        }>  
            <Link to="/Detection-from-video"
            
            style={
                linkstyle
            }>ObjectDetection from video using cocosd Model</Link>

        </button>

        <button 
         style={
            {
                backgroundColor:"blue",
                color:"white",
                border:"1px solid black",
                borderRadius:"5px",
                padding:"10px",
                margin:"10px",
                width:"600px"
            }
        }>  
            <Link to="/Detection-from-image"
            
            style={
                linkstyle
            }>ObjectDetection from image using cocosd Model</Link>
        </button>
        <button 
         style={
            {
                backgroundColor:"blue",
                color:"white",
                border:"1px solid black",
                borderRadius:"5px",
                padding:"10px",
                margin:"10px",
                width:"600px"
            }
        }> 
            <Link to="/Real-time-object-detection"
            
            style={
                linkstyle
            }>Real time object detection using coco-ssd model</Link>
        </button>
    </div>
  )
}

export default Home