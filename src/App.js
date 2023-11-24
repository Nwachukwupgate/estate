import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SideBar from './components/layouts.js/SideBar';
import ProjectPage from './pages/project';
import ProjectDetails from './pages/details';
import CreateProject from './pages/create';
import CreateArchitecture from './pages/architecture';
import ViewArchitecture from './pages/view';

function App() {
  return (
    <>
    <SideBar />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProjectPage/>} />
        <Route path='/detail/:id' element={<ProjectDetails />} />  
        <Route path='/create' element={<CreateProject />} /> 
        <Route path='/architecture' element={ <CreateArchitecture />} /> 
        <Route path='/view' element={ <ViewArchitecture />} /> 
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
