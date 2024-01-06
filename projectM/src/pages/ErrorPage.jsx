import React from 'react';
import errorimg from '../assets/images/error.svg'

const ErrorPage = () => {
  return (
    <div className='container mx-auto flex flex-col items-center justify-center h-full text-center'>
      <img src={errorimg} className='w-full p-6 md:w-[50%]'/>
      <h1 className='font-bold text-2xl m-2 mx-1'><span className='text-4xl font-extrabold'>Uh Oh! </span> Something went wrong</h1>
      <p className='font-thin mt-2 mx-1'>This is a mere detour in your project journey; we'll be back on track soon.</p>
      <p className='font-bold mt-3 md:mt-2'>You may also refresh the page or try again later</p>
    </div>
  )
}

export default ErrorPage
