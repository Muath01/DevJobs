import { useState } from 'react'
import './App.css'
import Search from './components/Search.tsx'
import Jobs from './components/Jobs.tsx'
import NavBar from './components/NavBar.tsx'

function App() {

  return (
    <>
    <div className='w-[100%] absolute '>
      <NavBar/>
        <Search/>
        <Jobs/>

    </div>
    </>
  )
}

export default App
