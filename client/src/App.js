import React from "react";
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { UserProvider } from "./components/common/UserProvider";
import { CollectionProvider } from "./components/common/CollectionProvider";

import { 
  Home,
  Login,
  Register,
  Collection,
  SubCollection,
  Category,
  SubCategory,
  UserProfile,
} from './pages';

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
              <Route path={`/userprofile` } element={<UserProfile />} />
              <Route path={`/collection/:name`} element={<Collection />} />
              <Route path={`/subcollection/:name`} element={<SubCollection />} />
              <Route path={`/category/:name`} element={<Category />} />
              <Route path={`/subcategory/:name`} element={<SubCategory />} />
            </Routes>
          </CollectionProvider>
          </UserProvider>
      </Router>
    </>
  );
}

export default App;

App.propTypes = {};
