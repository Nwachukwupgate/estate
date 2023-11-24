import { useState, useEffect } from 'react'
import Main from '../components/wrappers/Main'
import Button from '../components/button/button'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore/lite'
import { deleteDoc, doc } from 'firebase/firestore/lite';

const ViewArchitecture = () => {
  const [project, setProject] = useState([])
  const projectCollection = collection(db, "architecture")

  useEffect(() => {
    const getProjectList = async () => {
        try{
            const data = await getDocs(projectCollection)
            console.log("the data", data);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setProject(filteredData)
        } catch {
            console.log("error");
        }
    }
    getProjectList()
  }, [])
  console.log(project);

  const DeleteProject = async (id) => {
    console.log(id);
    try{
      const projectDoc = doc(db, "architecture", id)
      await deleteDoc(projectDoc)
    }catch {
      console.log("delete Error");
    }
  }

  return (
    <Main> 
        <div
        name=''
        className='w-full text-center md:text-left'
      >
        <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
          <div className='pb-8'>
            <p className='text-4xl font-bold inline border-b-4 border-gray-500'>
              Architecture          
            </p>
            <p className='py-6'>Page</p>
          </div>

          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:px-5'>
            {project.map(({ id, image, title }) => (
              <div
                key={id}
                className='shadow-md shadow-gray-600 rounded-lg overflow-hidden'
              >
                <img
                  src={image}
                  alt='architecture'
                  className='rounded-md duration-200 hover:scale-105'
                />
                <div className='flex flex-col items-center justify-center'>
                  <p className='text-xl font-bold mt-2'>{title}</p>
                  {/* <button
                    className='w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105'
                    onClick={() => DeleteProject(id)}
                  >
                    button
                  </button>
                  <Button label="Delete" colour="blue" color="white" onClick={DeleteProject(id)} className="w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105"/> */}
                  
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
    </Main>
  )
}

export default ViewArchitecture