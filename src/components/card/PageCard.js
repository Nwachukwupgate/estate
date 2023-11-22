import React, {useState} from 'react'
import Button from '../button/button'
import DeleteModal from '../Modal/DeleteModal'
import { Link } from 'react-router-dom';

const PageCard = ({image, body, type, title, id}) => {
    const [showModal, setShowModal] = useState(false);

    const acceptHandler = (e) => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
  return (
    <>
    <div>
        <div className='relative'>
            <img className="object-cover object-center w-full h-64 rounded-lg lg:h-80" src={image} alt={title} />
            <div className='absolute top-0 right-0'>
                <Button label="Delete" colour="blue" color="white" onClick={acceptHandler}/>
            </div>            
        </div>

        <div className="mt-8">
            <span className="text-blue-500 uppercase">{type}</span>

            <h1 className="mt-4 text-xl font-semibold text-gray-800 ">
                {title}
            </h1>

            <p className="mt-2 text-gray-500 ">
                {body.substring(0, 108)}...
            </p>

            <div className="flex items-center justify-between mt-4">
                <div>
                    <a href="google.com" className="text-lg font-medium text-gray-700  hover:underline hover:text-gray-500">
                        Admin
                    </a>

                    <p className="text-sm text-gray-500 ">February 1, 2022</p>
                </div>

                <Link to={`/detail/${id}`} className="inline-block text-blue-500 underline hover:text-blue-400">Read more</Link>
                
            </div>

        </div>
    </div>

    <DeleteModal open={showModal} closeModal={closeModal} id={id}/>
    </>
  )
}

export default PageCard