import { useState } from 'react'
import './App.css'
import Search from './components/Search.tsx'
import Jobs from './components/Jobs.tsx'
import NavBar from './components/NavBar.tsx'
import { Route, Routes } from 'react-router-dom'
import ListJob from './components/ListJob.tsx'
import Home from './components/Home.tsx'

function App() {

  return (
    <>
    <div className='w-full h-[91%] absolute '>
      <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/list" element={<ListJob/>} />
    </Routes>



    </div>
    </>
  )
}

export default App
