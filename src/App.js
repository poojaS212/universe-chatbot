
import './App.css';
import Head from './components/Head';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import SideBar from './components/SideBar';
import DashBoard from './pages/Dashboard';
import LayoutPage from './pages/LayoutPage'
import Conversation from './pages/Conversation';

function App() {
  return (
    <div className="App">
       <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/sidebar' element={<SideBar />}/>
          <Route path='/dashboard' element={<DashBoard />}/>
          <Route path='/dashboardpage' element={<LayoutPage />} />
          <Route path='/conversation' element={<Conversation />} />
       </Routes>
    </div>
  );
}

export default App;
