import React from 'react'

function Search() {
  return (
    <>
    <div className='bg-purple-500 relative h-[12rem]  w-full '>
        <div className=' absolute  flex left-1/2 translate-x-[-50%] bottom-[-30px]  w-full justify-center'>
        <input placeholder='text' className='p-5 rounded-lg  sm:w-1/2 w-[80%] outline-none '/>
        <button className='p-5 bg-blue-400 hover:bg-blue-500'>Search</button>
        </div>
    </div>
    </>
  )
}

export default Search