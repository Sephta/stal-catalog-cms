import { useReducer } from "react";
import { catalogReducer } from "../reducers";

export const useCatalogReducer = (initialState) => {
  const [state, dispatch] = useReducer(catalogReducer, initialState);

  return [state, dispatch];
};
