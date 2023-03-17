import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
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
        <button >
            <Link to="/image-classifier">Image classifier using mobilenet</Link>
          
        </button>
        <button>
            <Link to="/Text-toxicity">Text toxicity</Link>
        </button>
    </div>
  )
}

export default Home