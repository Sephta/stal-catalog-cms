import React, { useEffect, useContext, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { LazyFetch, AsyncFetch } from "../components/common/requests";
import { useState } from "react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { ThreeDots } from "react-loading-icons";
import { SubCollectionContainer } from "../components/CollectionPage";
import { CollectionContext } from "../components/common/providers";
import { v4 as uuid } from "uuid";
import Loading from "../components/common/Loading";
import { useInterval } from "../hooks";

const DispatchAction = {
  Collection: "collection",
  SubCollections: "subcollections",
};

const reducer = (state, action) => {
  switch (action.type) {
    case DispatchAction.Collection:
      return { ...state, collection: action.payload };
    case DispatchAction.SubCollections:
      return { ...state, subCollections: action.payload };
    default:
      break;
  }
};

const Collection = (props) => {
  const { id } = useParams();
  const [pageState, dispatch] = useReducer(reducer, {
    collection: null,
    subCollections: [],
  });

  useInterval(() => {
    if (!pageState.collection) {
      LazyFetch({
        type: `get`,
        endpoint: `/api/collection/${id}`,
        onSuccess: (data) => {
          dispatch({ type: DispatchAction.Collection, payload: data.result });
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err}`);
        },
      });
    }
  }, 1000);

  useEffect(() => {
    if (pageState.collection) {
      for (const subCollectionId of pageState.collection.subCollections) {
        LazyFetch({
          type: `get`,
          endpoint: `/api/subcollection/${subCollectionId}`,
          onSuccess: (data) => {
            let newSubCollection = (
              <SubCollectionContainer key={uuid()} data={data.result} />
            );
            dispatch({
              type: DispatchAction.SubCollections,
              payload: pageState.subCollections
                ? [newSubCollection]
                : [...pageState.subCollections, newSubCollection],
            });
          },
          onFailure: (err) => {
            console.error(`[ERROR] - `);
          },
        });
      }
    }
  }, [pageState.collection]);

  return (
    <>
      <Navbar />
      <Wrapper>
        <h1>{pageState.collection ? pageState.collection.name : <></>}</h1>
        {/* {pageState.subCollections.length > 0 ? (pageState.subCollections) : (<ThreeDots fill={`var\(--highlight-04\)`} />)} */}
        {pageState.subCollections.length > 0 ? pageState.subCollections : <></>}
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
