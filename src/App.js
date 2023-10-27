import './App.css'
import { Route, Routes } from 'react-router-dom';
import Registerform from './components/Registerform';
import Login from './components/Loginform';
import Updateform from './components/Updateform';

function App() {
  return (
      <div className='container-fluid'>
      <Routes>
      <Route path='/' element={<Registerform/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/update' element={<Updateform/>}/>
      </Routes>
      </div>
  );
}

export default App;