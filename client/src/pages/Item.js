import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useInterval, useCatalogReducer } from "../hooks";
import { CatalogDispatchAction } from "../reducers";
import { LazyFetch } from "../components/common/requests";

const Item = (props) => {
  const { id } = useParams();

  const [pageState, dispatch] = useCatalogReducer({
    Item: null,
  });

  useInterval(() => {
    if (!pageState.Item) {
      LazyFetch({
        type: `get`,
        endpoint: `/api/item/${id}`,
        onSuccess: (data) => {
          // console.debug(`[DEBUG] - `, data.result);
          dispatch({ type: CatalogDispatchAction.Item, payload: data.result });
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err}`);
        },
      });
    }
  }, 1000);

  return (
    <>
      <Wrapper>
        <h1>{pageState.Item ? pageState.Item.name : <></>}</h1>
      </Wrapper>
    </>
  );
};

export default Item;

Item.propTypes = {};

const Wrapper = styled.div``;
