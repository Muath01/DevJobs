import React from 'react'
import nike from '../assets/nike.png'
import {jobs} from "../assets/jobs"

function Jobs() {
  return (
    <div className=' relative top-20 grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-[#afafaf] '>

        {
            jobs.map(job => (
                <div className="bg-white m-2 mt-14 h-[15rem] rounded-lg  relative ">
            <img src={nike} className='w-1/6 absolute top-[-35px] left-[50%] translate-x-[-50%] border border-black' />
            <div className=' h-[60%]  w-full absolute bottom-0  translate-y-[-5%] flex flex-col gap-1 items-start px-10'>
                <h1 className=' text-[24px]  text-gray-400'>{job.type}</h1>
                <h1 className=' text-[24px]'>{job.title}</h1>
                <h1 className=' text-[24px] text-gray-400'>{job.company}</h1>
                <h1 className=' text-[24px] text-blue-400 font-bold absolute bottom-0'>{job.remote ? "Remote" : "in office"} {job.location}</h1>
            </div>

                </div>
            ))
        }
        
        
        
        </div>
  )
}

export default Jobs