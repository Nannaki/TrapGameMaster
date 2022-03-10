import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer, Slide} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DashBoardAdmin from "./pages/DashBoardAdmin";
import Login from "./pages/Login";
import RegisterGm from "./pages/RegisterGm";
import DashBoardGM from "./pages/DashBoardGM";
import Rooms from "./pages/Rooms";
import GM from "./pages/GM";
import ShowRooms from "./pages/ShowRooms";
import DeleteRoom from "./pages/DeleteRoom"
import AddRoom from "./pages/AddRoom";
import ModifyRoom from "./pages/ModifyRoom";

//TODO mettre user isAdmin ? dans routes

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
                      <Route path='/gm' element={<GM />}/>
                      <Route path='/showrooms' element = {<ShowRooms />} />
                      <Route path='/deleteRoom' element = {<DeleteRoom />} />
                      <Route path='/addroom' element= {<AddRoom />} />
                      <Route path='/modifyroom' element={<ModifyRoom />} />
                  </Routes>
              </div>
          </Router>
          <ToastContainer theme={"dark"} position={"top-right"} autoClose={2000} transition={Slide}/>
      </>
  );
};

export default App;
