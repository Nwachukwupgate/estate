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
    const [loading, setLoading] = useState(false);
    const [inputField, setInputField] = useState({
        title: "",
        type: '',
        image: null,
        image2: null,
        image3: null,
        image4: null,
        slide: null,
        slide2: null,
        slide3: null,
        slide4: null,
        body: "",
        extraText: "",
        specify: "",
        specify2: "",
        specify3: "",
        specify4: "",
        benefit: "",
        benefit2: "",
        benefit3: "",
        benefit4: "",
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setInputField((prevInputField) => ({
            ...prevInputField,
            [name]: name === 'image' ? files[0] : value
        }));
    };

    const handleUpload = (e, fieldName) => {
        const imgs = ref(imgDb, `imgs/${v4()}`);
        uploadBytes(imgs, e.target.files[0]).then(data => {
            getDownloadURL(data.ref).then(val => {
                setInputField(prevInputField => ({
                    ...prevInputField,
                    [fieldName]: val
                }));                
            })
        })
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        // console.log(inputField);
        try{
            await addDoc(projectCollection, inputField)
            // navigate('/');
        } catch {
            console.log("error");
        } finally {
            setTimeout(() => {
                setLoading(false);
                 setInputField({
                title: "",
                type: '',
                image: null,
                image2: null,
                image3: null,
                image4: null,
                slide: null,
                slide2: null,
                slide3: null,
                slide4: null,
                body: "",
                extraText: "",
                specify: "",
                specify2: "",
                specify3: "",
                specify4: "",
                benefit: "",
                benefit2: "",
                benefit3: "",
                benefit4: "",
            })
              }, 130000); // 30,000 milliseconds = 1min 30 seconds // Set loading back to false whether the API call succeeds or fails
            // navigate('/');
                
        }
    }
  return (
    <Main>
        <p className='pt-8 ml-2'>Project</p>
        <div className='flex flex-col justify-center items-center'>
            
            <div>
                <Input type="text" handleChange={handleChange} title="Name" placeholder="Project/Architecture Name" autocomplete='true' value={inputField.title} name="title"/>
                <CustomSelect data={data} handleChange={handleChange} title="Choose Type" value={inputField.type} name="type" />
                <CustomFileInput title="Select Image" selectedFile={inputField.image} handleChange={(e) =>handleUpload(e, "image")}name="image"/>
                <CustomFileInput title="Select Image 2" selectedFile={inputField.image2} handleChange={(e) =>handleUpload(e, "image2")} name="image2"/>
                <CustomFileInput title="Select Image 3" selectedFile={inputField.image3} handleChange={(e) =>handleUpload(e, "image3")} name="image3"/>
                <CustomFileInput title="Select Image 4" selectedFile={inputField.image4} handleChange={(e) =>handleUpload(e, "image4")} name="image4"/>
                <br/> <br /> <br/>
                <CustomFileInput title="Slide Image 1" selectedFile={inputField.slide} handleChange={(e) =>handleUpload(e, "slide")} name="slide"/>
                <CustomFileInput title="Slide Image 2" selectedFile={inputField.slide2} handleChange={(e) =>handleUpload(e, "slide2")} name="slide2"/>
                <CustomFileInput title="Slide Image 3" selectedFile={inputField.slide3} handleChange={(e) =>handleUpload(e, "slide3")} name="slide3"/>
                <CustomFileInput title="Slide Image 4" selectedFile={inputField.slide4} handleChange={(e) =>handleUpload(e, "slide4")} name="slide4"/>
                <CustomTextArea name="body" title="Description"  placeholder="Describe Project/Architecture" handleChange={handleChange} value={inputField.body}/>

                <CustomTextArea handleChange={handleChange} title="Additional Description" placeholder="Describtion" value={inputField.extraText} name="extraText"/>

                <Input type="text" handleChange={handleChange} title="Specification" placeholder="Insert Specification" autocomplete='true' value={inputField.specify} name="specify"/>
                <Input type="text" handleChange={handleChange} title="Specification 2" placeholder="Insert Specification" autocomplete='true' value={inputField.specify2} name="specify2"/>
                <Input type="text" handleChange={handleChange} title="Specification 3" placeholder="Insert Specification" autocomplete='true' value={inputField.specify3} name="specify3"/>
                <Input type="text" handleChange={handleChange} title="Specification 4" placeholder="Insert Specification" autocomplete='true' value={inputField.specify4} name="specify4"/>

                <Input type="text" handleChange={handleChange} title="Benefit" placeholder="Insert Benefit" autocomplete='true' value={inputField.benefit} name="benefit"/>
                <Input type="text" handleChange={handleChange} title="Benefit 2" placeholder="Insert Benefit" autocomplete='true' value={inputField.benefit2} name="benefit2"/>
                <Input type="text" handleChange={handleChange} title="Benefit 3" placeholder="Insert Benefit" autocomplete='true' value={inputField.benefit3} name="benefit3"/>
                <Input type="text" handleChange={handleChange} title="Benefit 4" placeholder="Insert Specification" autocomplete='true' value={inputField.benefit4} name="benefit4"/>
                {/* <Button label="Submit" colour="blue" color="white" onClick={handleSubmit}/> */}
                <button className={`  px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue300 focus:ring-opacity-80`} onClick={(e) => handleSubmit(e)}
                disabled={loading}>
                    {loading? "Loading..." : "Submit"} 
                </button>
            </div>
        </div>
    </Main>
  )
}

export default CreateProject