import { useState } from 'react'
import MyComponent from './components/MyComponent'
import './App.css'
import ImageClassifier from './components/ImageClassifier'
import { BrowserRouter ,Route,Routes} from 'react-router-dom'
import Home from './components/Home'
import DetectionFromVideo from './components/DetectionFromVideo'
import DetectionFromImage from './components/DetectionFromImage'
import RealTimeObject from './components/RealTimeObject'

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
