import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LazyFetch from './components/common/requests/LazyFetch';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"
import { UserProvider } from "./components/common/UserProvider";

const App = (props) => {
  return (
    <Router>
      <div className='container'>
        <UserProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
