import React from 'react'

const DeleteModal = ({id, deleteFunc, setid}) => {
  return (
    <dialog className='absolute bg-transparent top-0 rounded p-4 flex justify-center items-center w-[100%] h-[100%] mb-[20%] md:mb-0'>
        <div className="absolute inset-0 bg-[#0000008f] rounded h-[100%] w-full z-[9]  flex items-center justify-center cursor-pointer" />
         <div className='max-w-[400px] w-full m-0 z-[999] p-3 bg-white rounded-lg flex flex-col sm:m-0 sm:p-4'>
            <h2 className='font-bold text-sm my-4'>Would you like to permanently delete this project?</h2>
            <p className='text-xs mb-4'>Once deleted this project will no longer be accessible</p>
            <div className='mb-4 ml-auto'>
                <button className='p-2 rounded-full font-bold text-xs my-1 border-[1px] border-grey px-4 hover:opacity-70' onClick={()=>setid(null)}>Cancle</button>
                <button className='text-white bg-[red] p-2 rounded-full font-bold my-1 text-xs ml-0 sm:ml-2 hover:opacity-70' onClick={()=>deleteFunc(id)}>Delete Permanently</button>
            </div>
         </div>
    </dialog>
  )
}

export default DeleteModal
