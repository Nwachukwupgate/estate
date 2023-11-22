import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SideBar from './components/layouts.js/SideBar';
import ProjectPage from './pages/project';
import ProjectDetails from './pages/details';
import CreateProject from './pages/create';

function App() {
  return (
    <>
    <SideBar />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProjectPage/>} />
        <Route path='/detail/:id' element={<ProjectDetails />} />  
        <Route path='/create' element={<CreateProject />} /> 
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
