import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"
import { UserProvider } from "./components/common/UserProvider";
import { CollectionProvider } from "./components/common/CollectionProvider";
import Collection from "./pages/Collection";

const App = (props) => {
  return (
    <>
    <Router>
        <UserProvider>
          <CollectionProvider>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path={`/collection/:name`} element={<Collection />} />
            </Routes>
          </CollectionProvider>
        </UserProvider>
    </Router>
    </>
  );
}

export default App;
