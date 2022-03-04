import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer, Slide} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DashBoardAdmin from "./pages/DashBoardAdmin";
import Login from "./pages/Login";
import RegisterGm from "./pages/RegisterGm";
import DashBoardGM from "./pages/DashBoardGM";
import Rooms from "./pages/Rooms";


const App = ({ children }) => {
  return (
      <>
          <Router>
              <div>
                  <Routes>
                      <Route path='/' element={<Login />}/>
                      <Route path='/dashboardadmin' element={<DashBoardAdmin />}/>
                      <Route path='/dashboardGM' element={<DashBoardGM />}/>
                      <Route path='/registergm' element={<RegisterGm />}/>
                      <Route path='/rooms' element={<Rooms />}/>
                  </Routes>
              </div>
          </Router>
          <ToastContainer theme={"dark"} position={"top-right"} autoClose={2000} transition={Slide}/>
      </>
  );
};

export default App;
