import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import LazyFetch from "../requests/LazyFetch";
import { useInterval } from "../../../hooks";

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

  useInterval(() => {
    if (!CollectionDetails) {
      // console.debug(`[DEBUG] - wowwie, no collections`);
      LazyFetch({
        type: "get",
        endpoint: "/api/collection",
        onSuccess: (data) => {
          // console.debug(`[DEBUG] - ${data.message}`);
          // data.result.forEach(item => {
          //   console.debug(`[DEBUG] - ${JSON.stringify(item)}`);
          // });
          setCollectionDetails(data.result);
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err?.message}`);
        },
      });
    }
  }, 1000);

  return (
    <CollectionContext.Provider value={CollectionDetails}>
      <CollectionDispatchContext.Provider value={setCollectionDetails}>
        {children}
      </CollectionDispatchContext.Provider>
    </CollectionContext.Provider>
  );
};

CollectionProvider.propTypes = {
  children: PropTypes.node,
};

export { CollectionProvider, CollectionContext, CollectionDispatchContext };
