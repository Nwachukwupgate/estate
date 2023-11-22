import React from 'react'
import ControlledModal from './ControlledModal';
import Button from '../button/button';
import { db } from '../../config/firebase';
import { deleteDoc, doc } from 'firebase/firestore/lite';

const DeleteModal = ({ open, closeModal, id}) => {
    const closeModalHandler = () => {
        closeModal();
    };

    const DeleteProject = async () => {
      try{
        const projectDoc = doc(db, "estate", id)
        await deleteDoc(projectDoc)
        closeModalHandler()
        window.location.reload()
      }catch {
        console.log("delete Error");
      }
    }
    
      let contentStyle = {
        maxHeight: '30%',
        borderRadius: '12px',
        backgroundColor: 'white',
        width: 'fit-content',
        boxShadow: 'none',
        overflow: 'hidden',
        margin: 'auto',
        maxWidth: '530px',
      };
  return (
    <ControlledModal
      open={open}
      closeModal={closeModalHandler}
      contentStyle={contentStyle}
    >
   
    <div className="flex justify-center min-h-screen px-4 pt-4 pb-20 text-center ">
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
        &#8203;
    </span>

    <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right  sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
        <div>
        <div className="flex items-center justify-center ">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-gray-700 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
        </div>

        <div className="mt-2 text-center">
            <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize " id="modal-title">
            Delete Project
            </h3>
            <p className="mt-2 text-sm text-gray-500 ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur dolorum aliquam ea, ratione deleniti porro officia?
            Explicabo maiores suscipit.
            </p>
        </div>
        </div>

        <div className="mt-5 sm:flex sm:items-center sm:justify-between">
        <a href="google.com" className="text-sm text-blue-500 hover:underline">
            Learn more
        </a>

        <div className="sm:flex sm:items-center ">
            {/* <button
            onClick={closeModal}
            className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
            >
            Cancel
            </button> */}

            <Button label="Cancel" colour="" color="gray-700" className="transition-colors duration-300 transform border border-gray-200" onClick={closeModalHandler} />

            {/* <button
            className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            >
            Delete
            </button> */}

            <Button label="Delete" colour="blue" color="white" className="transition-colors duration-300 transform" onClick={DeleteProject} />
            
        </div>
        </div>
    </div>
    </div>
    
    </ControlledModal>
  )
}

export default DeleteModal