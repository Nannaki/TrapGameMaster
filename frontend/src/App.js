//Imports
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer, Slide} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DashBoardAdmin from "./pages/pagesAdmin/DashBoardAdmin";
import Login from "./components/login/Login";
import RegisterGm from "./pages/pagesAdmin/RegisterGm";
import DashBoardGM from "./pages/pagesGm/DashBoardGM";
import Rooms from "./pages/pagesAdmin/Rooms";
import GM from "./pages/pagesAdmin/GM";
import ShowRooms from "./pages/ShowRooms";
import ShowGm from "./pages/pagesAdmin/ShowGm";
import DeleteRoom from "./pages/pagesAdmin/DeleteRoom"
import AddRoom from "./pages/pagesAdmin/AddRoom";
import ModifyRoom from "./pages/pagesAdmin/ModifyRoom";
import DeleteGm from "./pages/pagesAdmin/DeleteGm";
import ModifyGm from "./pages/pagesAdmin/ModifyGm";
import DeleteRoomOfGm from "./pages/pagesAdmin/DeleteRoomOfGm"
import AddRoomToGm from "./pages/pagesAdmin/AddRoomToGm";
import AvailablityGm from "./pages/pagesGm/AvailablityGm";
import EditSchedule from "./pages/pagesAdmin/EditSchedule";
import ShowScheduleGm from "./components/schedule/gm/ShowScheduleGm";
import {useSelector} from "react-redux";
import { WebSocketProvider } from './WebsocketContext';


const App = () => {

    //Recupère les states de redux
    const {user} = useSelector(state=>state.auth)

  return (
      <>
          {/* Check si user est connecté, sinon redirige sur le login */}
          {!user ? (<Login/>) : (
              <Router>
                  <div>
                      {/* Initialisation de la connection websocket */}
                      <WebSocketProvider url="ws://localhost:5000">
                          <Routes>
                              {/* Routes avec contrôle du rôle de l'utilisaeur */}
                              <Route path='/' element={ user.isAdmin ? <DashBoardAdmin /> : <DashBoardGM />} />
                              <Route path='/showgm' element={<ShowGm/>}/>
                              <Route path='/modifygm' element={<ModifyGm/>}/>
                              <Route path='/registergm' element={<RegisterGm/>}/>
                              <Route path='/deletegm' element={<DeleteGm/>}/>
                              <Route path='addroomtogm' element={<AddRoomToGm/>}/>
                              <Route path='/deleteroomofgm' element={<DeleteRoomOfGm/>}/>
                              <Route path='/deleteRoom' element={<DeleteRoom/>}/>
                              <Route path='/addroom' element={<AddRoom/>}/>
                              <Route path='/modifyroom' element={<ModifyRoom/>}/>
                              <Route path='/rooms' element={<Rooms/>}/>
                              <Route path='/editschedule' element={<EditSchedule/>}/>
                              <Route path='/gm' element={<GM/>}/>
                              <Route path='/showrooms' element={<ShowRooms/>}/>
                              <Route path='/schedulegm' element={<ShowScheduleGm/>}/>
                              <Route path='/dispogm:id' element={<AvailablityGm/>}/>
                          </Routes>
                      </WebSocketProvider>
                  </div>
              </Router>)}

          {/* Container for Toastify with css */}
              <ToastContainer theme={"dark"} position={"top-right"} autoClose={2000} transition={Slide}/>
      </>
  );
};

//Exports
export default App;
