
import { Route, Routes } from "react-router-dom";
import './App.css';
import {Signin} from "./components/Signin";
import {Dashboard} from "./components/Dashboard";
import {Signup} from "./components/Signup";

import {Home} from "./components/Home";
function App() {
  return (
    <Routes>
    
    <Route path="signin/dashboard" exact element={<Dashboard />} />
    <Route path="/signup" exact element={<Signup />} />
    <Route path="/signin" exact element={<Signin />} />
   
    <Route path = "/" element = {<Home/>}/> 
  </Routes>
  );
}

export default App;
