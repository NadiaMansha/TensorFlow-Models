import { useState } from 'react'
import MyComponent from './MyComponent'
import './App.css'
import ImageClassifier from './ImageClassifier'
import { BrowserRouter ,Route,Routes,Link} from 'react-router-dom'
import Home from './Home'

function App() {
 

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/image-classifier" element={<ImageClassifier />} />
          <Route path="/Text-toxicity" element={<MyComponent />} />
        </Routes>
      </BrowserRouter>
     
    </div>
  )
}

export default App
