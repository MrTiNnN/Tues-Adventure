import DataProvider from './context/DataContext'
import Nav from './pages/header/Nav'
import Login from './pages/account/Login'
import Register from './pages/account/Register'
import Home from './pages/home/Home'
import img1 from './img/1.jpg'
import img2 from './img/2.jpg'
import img3 from './img/3.jpg'
// pavelpronin.com

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Verification from './pages/account/Verification'
import NewAdventure from './pages/newAdventure/NewAdventure'
import Adventure from './pages/adventure/Adventure'
import AllAdventures from './pages/allAdventures/AllAdventures'

function App() {
  return (
    <>
      <BrowserRouter>
        <DataProvider>
          <Nav />

          <Routes>
            <Route path='/' element={<Home />} />
            
            <Route path='/register' element={<Register />} />
            <Route path='/activate/:id/:token' element={<Verification />} />
            <Route path='/login' element={<Login />} />

            <Route path='/new' element={<NewAdventure />} />
            <Route path='/adventure/:id' element={<Adventure />} />
            <Route path='/adventures' element={<AllAdventures />} />
          </Routes>

          {/* <img src={img1} alt="" />
          <img src={img2} alt="" />
          <img src={img3} alt="" /> */}
        </DataProvider>
      </BrowserRouter>
    </>
  )
}

export default App