import React, { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { LazyFetch } from "../components/common/requests";
import { Navbar, Footer } from "../components";
import { SubCollectionContainer } from "../components/CollectionPage";
import { v4 as uuid } from "uuid";
import { useInterval, useCatalogReducer } from "../hooks";
import { CatalogDispatchAction } from "../reducers";

const Collection = (props) => {
  const { id } = useParams();

  const [pageState, dispatch] = useCatalogReducer({
    Collection: null,
    SubCollection: [],
  });

  useInterval(() => {
    if (!pageState.Collection) {
      LazyFetch({
        type: `get`,
        endpoint: `/api/collection/${id}`,
        onSuccess: (data) => {
          dispatch({
            type: CatalogDispatchAction.Collection,
            payload: data.result,
          });
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err}`);
        },
      });
    }
  }, 1000);

  useEffect(() => {
    if (pageState.Collection) {
      for (const subCollectionId of pageState.Collection.subCollections) {
        LazyFetch({
          type: `get`,
          endpoint: `/api/subcollection/${subCollectionId}`,
          onSuccess: (data) => {
            let newSubCollection = (
              <SubCollectionContainer key={uuid()} data={data.result} />
            );
            dispatch({
              type: CatalogDispatchAction.SubCollection,
              payload: pageState.SubCollection
                ? [newSubCollection]
                : [...pageState.SubCollection, newSubCollection],
            });
          },
          onFailure: (err) => {
            console.error(`[ERROR] - `);
          },
        });
      }
    }
  }, [pageState.Collection]);

  return (
    <>
      <Navbar />
      <Wrapper>
        <h1>{pageState.Collection ? pageState.Collection.name : <></>}</h1>
        {/* {pageState.SubCollection.length > 0 ? (pageState.SubCollection) : (<ThreeDots fill={`var\(--highlight-04\)`} />)} */}
        {pageState.SubCollection.length > 0 ? pageState.SubCollection : <></>}
      </Wrapper>
      <Footer />
    </>
  );
};

export default Collection;

Collection.propTypes = {};

const Wrapper = styled.div`
  height: 100%;
  padding: 1em;
`;
