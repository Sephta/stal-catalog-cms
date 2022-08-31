import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"
import { UserProvider } from "./components/common/UserProvider";

const App = (props) => {
  return (
    <>
    <Router basename="/app">
        <UserProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </UserProvider>
    </Router>
    </>
  );
}

export default App;
