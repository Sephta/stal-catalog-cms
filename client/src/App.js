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
              <Route path={`/collection/:id`} element={<Collection />} />
              <Route path={`/subcollection/:id`} element={<SubCollection />} />
              <Route path={`/category/:id`} element={<Category />} />
              <Route path={`/subcategory/:id`} element={<SubCategory />} />
            </Routes>
          </CollectionProvider>
          </UserProvider>
      </Router>
    </>
  );
}

export default App;

App.propTypes = {};
