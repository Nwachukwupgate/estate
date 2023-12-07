import { useState, useEffect } from 'react'
import { db, imgDb } from '../config/firebase'
import { getDocs, collection, query, where, addDoc } from 'firebase/firestore/lite'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import Main from '../components/wrappers/Main'
import Button from '../components/button/button'

const CreateArchitecture = () => {
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const projectCollection = collection(db, "estate")
  const architectureCollection = collection(db, "architecture")

    useEffect(() => {
        const getProjectList = async () => {
            try{
                const data = await getDocs(projectCollection)
                const filteredData = data.docs.map((doc) => doc.data().title);
                setTitles(filteredData)
            } catch {
                console.log("error");
            }
        }
        getProjectList()
    }, [])

    const handleTitleSelect = async (title) => {
      setSelectedTitle(title);
    
      // const imagesCollection = await firebase.firestore().collection('images').where('title', '==', title).get();
      const q = query(architectureCollection, where('title', '==', title));
      // const imagesData = q.docs.map(doc => doc.data());
      const querySnapshot = await getDocs(q);
      const imagesData = querySnapshot.forEach((doc) => 
        doc.data() 
        // console.log(doc.id, " => ", doc.data());
      );
      setImages(imagesData);
    };

    const handleImageUpload = async () => {
      setLoading(true);
      try {
        const storageRef = ref(imgDb, `${selectedTitle}/`);
      
        // Iterate over each selected image file
        for (const file of imageFiles) {
          // Create a child reference for the current image file in the Storage
          const imageRef = ref(storageRef, file.name);

          // Upload the image file to Firebase Storage
          await uploadBytes(imageRef, file);

          // Get the download URL of the uploaded image
          const imageUrl = await getDownloadURL(imageRef);
      
          // Add information about the uploaded image to the 'images' collection in Firestore
          await addDoc(architectureCollection, {
            title: selectedTitle,
            image: imageUrl,
          });
        }
      
        // Refresh the images after upload by fetching the updated list
        handleTitleSelect(selectedTitle);
      } catch (error) {
        console.error("Error during image upload:", error);
      } finally {
        // Use setTimeout to delay setting loading to false by 30 seconds
        setTimeout(() => {
          setLoading(false);
        }, 130000); // 30,000 milliseconds = 1min 30 seconds
      }
    };
    
    console.log("titles", titles);
  return (
    <Main>
        <div className='flex flex-col justify-center items-center pt-12'>
          <div><h1 className=''>Titles</h1></div>
          <div>
            <select
              name='title'
              onChange={(e) => handleTitleSelect(e.target.value)}
              value={selectedTitle}
              className="p-2 border border-gray-300 rounded-md text-gray-800 bg-white w-[36rem] mb-4"
            >
              {titles.map((title, index) => (
              <option key={index} value={title}>{title}</option>
              ))}
            </select>
          </div>

          {selectedTitle && (
            <div className='flex flex-col'>
              <h2>{selectedTitle}</h2>
              <div>
                <input type="file" multiple onChange={(e) => setImageFiles(e.target.files)}  className="p-2 border border-gray-300 rounded-md text-gray-800 bg-white w-[36rem]"/>
              </div>
              <div className="mt-4">
              {/* <button onClick={handleImageUpload}>Upload Images</button> */}
                <Button colour="blue" color="gray-600" className="mt-4" onClick={handleImageUpload} disabled={loading} label={loading ? "Loading..." : "Upload Images"}  />
              </div>
            </div>
          )}
        </div>
    </Main>
  )
}

export default CreateArchitecture