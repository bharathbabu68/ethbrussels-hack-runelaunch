import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import Home from './Home'
import Launches from './Launches'

const Main = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/launches" element={<Launches />} />
        </Routes>
    </BrowserRouter>
</>
  )
}

export default Main