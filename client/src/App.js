import './App.css';
import {Routes, Route} from "react-router-dom"
import Navbar from './components/navbar/Navbar';
import Odi from "./components/odi/Odi"
import Batting from './components/batting/Batting';
import Fielding from './components/fielding/Fielding';
import Home from './components/home/Home';
import Signin from './components/login_signin/Signin';
import Login from './components/login_signin/Login';
import { useState } from 'react';
// import Reuse from './components/reuse/Reuse';
function App() {

  const [userData, setUserData] = useState("")
  return (
    <div className="App">
     
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/odi" element={<Odi/>}/>
      <Route path="/batting" element={<Batting/>}/>
      <Route path="/fielding" element={<Fielding/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </div>
  );
}

export default App;
