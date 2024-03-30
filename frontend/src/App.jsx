import DataProvider from '../context/DataContext'
import Login from './account/Login'
import Register from './account/Register'
import Hero from './home/Hero'
import img1 from './img/1.jpg'
import img2 from './img/2.jpg'
import img3 from './img/3.jpg'
// pavelpronin.com

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Hero />} />
            
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>

          {/* <img src={img1} alt="" />
          <img src={img2} alt="" />
          <img src={img3} alt="" /> */}
        </BrowserRouter>
      </DataProvider>
    </>
  )
}

export default App