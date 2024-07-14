import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import Home from './Home'
import Launches from './Launches'
import CreateNewLaunch from './CreateNewLaunch'

const Main = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/launches" element={<Launches />} />
            <Route path="/create-new-launch" element={<CreateNewLaunch />} />
        </Routes>
    </BrowserRouter>
</>
  )
}

export default Main