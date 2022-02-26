import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import DashBoradAdmin from "./pages/DashBorardAdmin";
import Login from "./pages/Login";
import RegisterGm from "./pages/RegisterGm";
import Header from "./components/Header";

const App = () => {
  return (
      <>
          <Router>
              <div>
                  <Header />
                  <Routes>
                      <Route path='/' element={<Login />}/>
                      <Route path='/dashboardadmin' element={<DashBoradAdmin />}/>
                      <Route path='/registergm' element={<RegisterGm />}/>
                  </Routes>
              </div>
          </Router>
      </>
  );
};

export default App;
