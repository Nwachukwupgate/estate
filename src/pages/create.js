import {useState} from 'react'
import Input from '../components/Inputs/Input'
import CustomSelect from '../components/Inputs/CustomSelect'
import CustomTextArea from '../components/Inputs/TextArea'
import CustomFileInput from '../components/Inputs/CustomFile'
import FormWrapper from '../components/Inputs/FormWrapper'
import Main from '../components/wrappers/Main'
import { db } from '../config/firebase'
import { addDoc, collection } from 'firebase/firestore/lite'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { imgDb } from '../config/firebase'
import { useNavigate } from 'react-router-dom';
import Button from '../components/button/button'


const CreateProject = () => {
    let navigate = useNavigate();
    const data = [ "Project", "Architecture" ];
    const projectCollection = collection(db, "estate")
    const [inputField, setInputField] = useState({
        title: "",
        type: '',
        image: null,
        body: ""
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setInputField((prevInputField) => ({
            ...prevInputField,
            [name]: name === 'image' ? files[0] : value
        }));
    };

    const handleUpload = (e) => {
        const imgs = ref(imgDb, `imgs/${v4()}`);
        uploadBytes(imgs, e.target.files[0]).then(data => {
            getDownloadURL(data.ref).then(val => {
                setInputField(prevInputField => ({
                    ...prevInputField,
                    image: val
                }));                
            })
        })
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log(inputField);
        try{
            await addDoc(projectCollection, inputField)
            navigate('/');
        } catch {
            console.log("error");
        }
    }
  return (
    <Main>
        <p className='pt-8 ml-2'>Project / Architecture</p>
        <div className='flex flex-col justify-center items-center'>
            
            <div>
                <Input type="text" handleChange={handleChange} title="Name" placeholder="Project/Architecture Name" autocomplete='true' value={inputField.title} name="title"/>
                <CustomSelect data={data} handleChange={handleChange} title="Choose Type" value={inputField.type} name="type" />
                <CustomFileInput title="Select Image" selectedFile={inputField.image} handleChange={handleUpload} name="image"/>
                <CustomTextArea name="body" title="Description"  placeholder="Describe Project/Architecture" handleChange={handleChange} value={inputField.body}/>
                {/* <Button label="Submit" colour="blue" color="white" onClick={handleSubmit}/> */}
                <button className={`  px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue300 focus:ring-opacity-80`} onClick={(e) => handleSubmit(e)}>
                    Submit
                </button>
            </div>
        </div>
    </Main>
  )
}

export default CreateProject