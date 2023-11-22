import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Main from '../components/wrappers/Main';
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore/lite'
import { useParams } from "react-router-dom";

const ProjectDetails = ({ match}) => {
    let { id } = useParams();

    const [data, setData] = useState({})
    const projectCollection = collection(db, "estate")

    useEffect(() => {
        const getProjectList = async () => {
            try{
                const data = await getDocs(projectCollection)
                console.log("the data", data);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setData(filteredData.filter(data => data.id === id))
            } catch {
                console.log("error");
            }
        }
        getProjectList()
    }, [])
    console.log("single Data", data);
    return(
        <Main>
            <div className=" max-w-screen-lg mx-auto">
                
                <main>

                <div className="mb-4 md:mb-0 w-full mx-auto relative">
                    <div className="px-4 lg:px-0">
                    <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                        {data[0]?.title}
                    </h2>
                    <p 
                        
                        className="py-2 text-green-700 inline-flex items-center justify-center mb-2"
                    >
                        {data[0]?.type}
                    </p>
                    </div>

                    <img src={data[0]?.image} alt={data[0]?.title} class="w-full object-cover lg:rounded" style= {{height : '28em'}} />
                </div>

                <div className="flex flex-col lg:flex-row lg:space-x-12">

                    <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
                        <p className="pb-6" > {data[0]?.body} </p>

                        <Link to="" className="button">
                            Edit Post
                        </Link>
                    </div>

                    <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
                    <div className="p-4 border-t border-b md:border md:rounded">
                        <div className="flex py-2">
                        <img src="https://randomuser.me/api/portraits/men/97.jpg"
                            className="h-10 w-10 rounded-full mr-2 object-cover" alt="" />
                        <div>
                            <p className="font-semibold text-gray-700 text-sm"> nmhbjhbkuhghbjbjkbj </p>
                            <p className="font-semibold text-gray-600 text-xs"> Editor </p>
                        </div>
                        </div>
                        <p className="text-gray-700 py-3">
                        Mike writes about technology
                        Yourself required no at thoughts delicate landlord it be. Branched dashwood do is whatever it.
                        </p>
                        <button className="px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded">
                        Follow 
                        <i className='bx bx-user-plus ml-2' ></i>
                        </button>
                    </div>
                    </div>

                </div>
                </main>
            
            </div>
        </Main>
  );
}
export default ProjectDetails;