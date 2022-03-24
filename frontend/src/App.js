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
import ShowGm from "./pages/ShowGm";
import DeleteRoom from "./pages/DeleteRoom"
import AddRoom from "./pages/AddRoom";
import ModifyRoom from "./pages/ModifyRoom";
import DeleteGm from "./pages/DeleteGm";
import ModifyGm from "./pages/ModifyGm";
import DeleteRoomOfGm from "./pages/DeleteRoomOfGm"
import AddRoomToGm from "./pages/AddRoomToGm";
import AvailablityGm from "./pages/AvailablityGm";
import EditSchedule from "./pages/EditSchedule";
//TODO mettre user isAdmin ? dans routes
//TODO Changer le bouton logout
//TODO voir ou mettre les horaires
//TODO proteger les routes avec contrôle token
//TODO gerer couleur event rooms

const App = () => {
  return (
      <>
          <Router>
              <div>
                  <Routes>
                      {/* Login route */}
                      <Route path='/' element={<Login />}/>

                      {/* Admins routes */}
                      <Route path='/dashboardadmin' element={<DashBoardAdmin />}/>
                      <Route path='/showgm' element={<ShowGm />} />
                      <Route path='/modifygm' element={<ModifyGm />} />
                      <Route path='/registergm' element={<RegisterGm />}/>
                      <Route path='/deletegm' element={<DeleteGm />} />
                      <Route path='addroomtogm' element={<AddRoomToGm />} />
                      <Route path='/deleteroomofgm' element={<DeleteRoomOfGm />} />
                      <Route path='/rooms' element={<Rooms />}/>
                      <Route path='/gm' element={<GM />}/>
                      <Route path='/deleteRoom' element = {<DeleteRoom />} />
                      <Route path='/addroom' element= {<AddRoom />} />
                      <Route path='/modifyroom' element={<ModifyRoom />} />
                      <Route path='/showrooms' element = {<ShowRooms />} />
                      <Route path='/editschedule' element={<EditSchedule />}/>

                      {/* Users routes */}
                      <Route path='/dashboardGM:id' element={<DashBoardGM />}/>
                      <Route path='/dispogm:id' element={<AvailablityGm />} />

                  </Routes>
              </div>
          </Router>

          {/* Container for Toastify with css */}
          <ToastContainer theme={"dark"} position={"top-right"} autoClose={2000} transition={Slide}/>
      </>
  );
};

export default App;
