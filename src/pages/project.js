import { useState, useEffect } from 'react'
import Main from '../components/wrappers/Main'
import PageCard from '../components/card/PageCard'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore/lite'

const ProjectPage = () => {
    const [project, setProject] = useState([])
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
                setProject(filteredData)
            } catch {
                console.log("error");
            }
        }
        getProjectList()
    }, [])

    console.log("the project", project);
  return (
    <Main className='ml-64'>
        <section class="bg-white">
        <div class="container px-6 py-10 mx-auto">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">recent posts </h1>

                <button class="focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600 transition-colors duration-300 transform  hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>

            <hr class="my-8 border-gray-200 " />

            <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {project.map(value => (
                    <PageCard image={value?.image} body={value?.body} type={value?.type} title={value?.title} key={value?.id} id={value?.id}/>
                ))}           
            </div>
        </div>
        </section>
    </Main>
  )
}

export default ProjectPage