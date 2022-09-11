import React, { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import LazyFetch from "./requests/LazyFetch";

const CollectionContext = createContext(undefined);
const CollectionDispatchContext = createContext(undefined);

/** CollectionProvider
 * Creates a Collection data DOM to get information about the Collection.
 *
 * @param {node} children Uncertain what this actually does... TODO: figure that out?
 * @returns CollectionContext DOM to interface with Collection related data.
 */
const CollectionProvider = ({ children }) => {
  const [CollectionDetails, setCollectionDetails] = useState(null);

  useEffect(() => {
    if (!CollectionDetails) {
      LazyFetch({
        type: 'get',
        endpoint: '/api/collection',
        // headers: { Authorization: `Bearer ${user.token}` },
        onSuccess: (data) => {
          // console.debug(`[DEBUG] - ${data.message}`);
          // data.result.forEach(item => {
          //   console.debug(`[DEBUG] - ${JSON.stringify(item)}`);
          // });
          setCollectionDetails(data.result);
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err?.message}`);
        }
      })
    }
  });

  return (
    <CollectionContext.Provider value={CollectionDetails}>
      <CollectionDispatchContext.Provider value={setCollectionDetails}>
        {children}
      </CollectionDispatchContext.Provider>
    </CollectionContext.Provider>
  );
}

CollectionProvider.propTypes = {
  children: PropTypes.node,
}

export { CollectionProvider, CollectionContext, CollectionDispatchContext };
