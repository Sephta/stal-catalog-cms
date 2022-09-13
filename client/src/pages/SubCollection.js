import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { CategoryContainer } from "../components/SubCollectionPage";
import { v4 as uuid } from "uuid";
import { useInterval } from "../hooks";
import { LazyFetch } from "../components/common/requests";
import Loading from "../components/common/Loading";
import { useReducer } from "react";

const DispatchAction = {
  SubCollection: "subCollection",
  Categories: "categories",
};

const reducer = (state, action) => {
  switch (action.type) {
    case DispatchAction.SubCollection:
      return { ...state, subCollection: action.payload };
    case DispatchAction.Categories:
      return { ...state, categories: action.payload };
    default:
      break;
  }
};

const SubCollection = (props) => {
  const { id } = useParams();

  const [pageState, dispatch] = useReducer(reducer, {
    subCollection: null,
    categories: [],
  });

  useInterval(() => {
    if (!pageState.subCollection) {
      LazyFetch({
        type: `get`,
        endpoint: `/api/subcollection/${id}`,
        onSuccess: (data) => {
          dispatch({
            type: DispatchAction.SubCollection,
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
    if (pageState.subCollection) {
      // console.debug(`[DEBUG] - REDUCER TEST UPDATED ${JSON.stringify(pageState, null, 4)}`);
      for (const categoryId of pageState.subCollection.categories) {
        LazyFetch({
          type: `get`,
          endpoint: `/api/category/${categoryId}`,
          onSuccess: (data) => {
            dispatch({
              type: DispatchAction.Categories,
              payload: pageState.categories
                ? [<CategoryContainer key={uuid()} data={data.result} />]
                : [
                    ...pageState.categories,
                    <CategoryContainer key={uuid()} data={data.result} />,
                  ],
            });
          },
          onFailure: (err) => {
            console.error(`[ERROR] - ${err}`);
          },
        });
      }
    }
  }, [pageState.subCollection]);

  return (
    <>
      <Navbar />
      <Wrapper>
        <h1>
          {pageState.subCollection ? pageState.subCollection.name : <></>}
        </h1>
        {pageState.categories}
      </Wrapper>
      <Footer />
    </>
  );
};

export default SubCollection;

SubCollection.propTypes = {};

const Wrapper = styled.div`
  height: 100%;
  padding: 1em;
`;
