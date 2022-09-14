import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  UserProvider,
  CollectionProvider,
} from "./components/common/providers";
import PrivateRoute from "./components/common/PrivateRoute";

import {
  Home,
  Login,
  Register,
  Collection,
  SubCollection,
  Category,
  SubCategory,
  UserProfile,
  Item,
} from "./pages";

const App = (props) => {
  return (
    <>
      <Router>
        <UserProvider>
          <CollectionProvider>
            <Routes>
              {/** PUBLIC ROUTES */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path={`/collection/:id`} element={<Collection />} />
              <Route path={`/subcollection/:id`} element={<SubCollection />} />
              <Route path={`/category/:id`} element={<Category />} />
              <Route path={`/subcategory/:id`} element={<SubCategory />} />
              <Route path={`/item/:id`} element={<Item />} />

              {/** PRIVATE ROUTES */}
              <Route
                path={`/userprofile`}
                element={
                  <PrivateRoute>
                    <UserProfile />
                  </PrivateRoute>
                }
              />
            </Routes>
          </CollectionProvider>
        </UserProvider>
      </Router>
    </>
  );
};

export default App;

App.propTypes = {};
