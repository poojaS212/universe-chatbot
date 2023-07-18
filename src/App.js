
import './App.css';
import Head from './components/Head';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import SideBar from './components/SideBar';

function App() {
  return (
    <div className="App">
       <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/sidebar' element={<SideBar />}/>
       </Routes>
    </div>
  );
}

export default App;
