import { useState } from 'react'
import MyComponent from './MyComponent'
import './App.css'
import ImageClassifier from './ImageClassifier'
import { BrowserRouter ,Route,Routes,Link} from 'react-router-dom'
import Home from './Home'
import DetectionFromVideo from './DetectionFromVideo'
import DetectionFromImage from './DetectionFromImage'
import RealTimeObject from './RealTimeObject'

function App() {
 

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/image-classifier" element={<ImageClassifier />} />
          <Route path="/Text-toxicity" element={<MyComponent />} />
          <Route path="/Detection-from-video" element={<DetectionFromVideo />} />
          <Route path="/Detection-from-image" element={<DetectionFromImage />} />
          <Route path="Real-time-object-detection" element={<RealTimeObject />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
     
    </div>
  )
}

export default App
