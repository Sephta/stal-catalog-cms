import React, { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import LazyFetch from "../requests/LazyFetch";
import { useInterval } from "../../../hooks";
import { useReducer } from "react";

const SessionDispatchContextAction = {
  Collection: 'collection',
  SubCollection: 'subcollection',
  Category: 'category',
  SubCategory: 'subcategory',
  Item: 'item',
}

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SessionDispatchContextAction.Collection:
      return { ...state, collections: payload };
    case SessionDispatchContextAction.SubCollection:
      return { ...state, subcollections: payload };
    case SessionDispatchContextAction.Category:
      return { ...state, categories: payload };
    case SessionDispatchContextAction.SubCategory:
      return { ...state, subcategories: payload };
    case SessionDispatchContextAction.Item:
      return { ...state, items: payload };
    default:
      break;
  }
}


const SessionContext = createContext(undefined);
const SessionDispatchContext= createContext(undefined);

/** CollectionProvider
 * Creates a Collection data DOM to get information about the Collection.
 *
 * @param {node} children Uncertain what this actually does... TODO: figure that out?
 * @returns CollectionContext DOM to interface with Collection related data.
 */
const SessionProvider = ({ children }) => {
  const [sessionState, dispatch] = useReducer(reducer, {
    collections: [],
    subcollections: [],
    categories: [],
    subcategories: [],
    items: [],
  });

  useEffect(() => {
    // console.debug(`[DEBUG] - Session State: ${JSON.stringify(sessionState, null, 4)}`);
    let sessionStore = sessionStorage.getItem("session");
    // console.debug(`[DEBUG] - Session Store: `, JSON.parse(sessionStore));
    sessionStorage.setItem("session", JSON.stringify(sessionState));
  }, [sessionState]);

  return (
    <SessionContext.Provider value={sessionState}>
      <SessionDispatchContext.Provider value={dispatch}>
        {children}
      </SessionDispatchContext.Provider>
    </SessionContext.Provider>
  );
}

SessionProvider.propTypes = {
  children: PropTypes.node,
}

export { SessionProvider, SessionContext, SessionDispatchContext, SessionDispatchContextAction };
