import React, { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Navbar, Footer } from "../components";
import { CategoryContainer } from "../components/SubCollectionPage";
import { v4 as uuid } from "uuid";
import { useInterval, useCatalogReducer } from "../hooks";
import { CatalogDispatchAction } from "../reducers";
import { LazyFetch } from "../components/common/requests";

const SubCollection = (props) => {
  const { id } = useParams();

  const [pageState, dispatch] = useCatalogReducer({
    SubCollection: null,
    Category: [],
  });

  useInterval(() => {
    if (!pageState.SubCollection) {
      LazyFetch({
        type: `get`,
        endpoint: `/api/subcollection/${id}`,
        onSuccess: (data) => {
          dispatch({
            type: CatalogDispatchAction.SubCollection,
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
    if (pageState.SubCollection) {
      // console.debug(`[DEBUG] - REDUCER TEST UPDATED ${JSON.stringify(pageState, null, 4)}`);
      for (const categoryId of pageState.SubCollection.categories) {
        LazyFetch({
          type: `get`,
          endpoint: `/api/category/${categoryId}`,
          onSuccess: (data) => {
            dispatch({
              type: CatalogDispatchAction.Category,
              payload: pageState.Category
                ? [<CategoryContainer key={uuid()} data={data.result} />]
                : [
                    ...pageState.Category,
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
  }, [pageState.SubCollection]);

  return (
    <>
      <Navbar />
      <Wrapper>
        <h1>
          {pageState.SubCollection ? pageState.SubCollection.name : <></>}
        </h1>
        {pageState.Category}
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
