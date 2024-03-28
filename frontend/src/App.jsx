import Hero from './home/Hero'
import img1 from './img/1.jpg'
import img2 from './img/2.jpg'
import img3 from './img/3.jpg'
// pavelpronin.com

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Hero/>}/>
        </Routes>

        <img src={img1} alt="" />
        <img src={img2} alt="" />
        <img src={img3} alt="" />
      </BrowserRouter>
    </>
  )
}

export default App