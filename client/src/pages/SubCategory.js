import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Navbar, Footer } from "../components";
import { useEffect } from "react";
import { LazyFetch } from "../components/common/requests";
import SubCategoryItemBlock from "../components/CategoryPage/SubCategoryItemBlock";
import { v4 as uuid } from "uuid";
import { useInterval, useCatalogReducer } from "../hooks";
import ThreeDots from "react-loading-icons/dist/esm/components/three-dots";
import { CatalogDispatchAction } from "../reducers";

const SubCategory = (props) => {
  const { id } = useParams();

  const [pageState, dispatch] = useCatalogReducer({
    SubCategory: null,
    Item: [],
  });

  useInterval(() => {
    if (!pageState.SubCategory) {
      LazyFetch({
        type: `get`,
        endpoint: `/api/subcategory/${id}`,
        onSuccess: (data) => {
          dispatch({
            type: CatalogDispatchAction.SubCategory,
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
    if (pageState.SubCategory) {
      LazyFetch({
        type: `post`,
        endpoint: `/api/item/multi`,
        data: { ids: pageState.SubCategory.items },
        onSuccess: (data) => {
          let newPayload = [];
          for (const item of data.result) {
            let newSubCategoryItemBlock = (
              <SubCategoryItemBlock key={uuid()} data={item} />
            );

            newPayload.push(newSubCategoryItemBlock);
          }
          dispatch({ type: CatalogDispatchAction.Item, payload: newPayload });
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err}`);
        },
      });
    }
  }, [pageState.SubCategory]);

  return (
    <>
      <Navbar />
      <Wrapper>
        <h1>{pageState.SubCategory ? pageState.SubCategory.title : <></>}</h1>
        <Content>
          {pageState.Item ? (
            pageState.Item
          ) : (
            <ThreeDots fill={`var\(--highlight-04\)`} />
          )}
        </Content>
      </Wrapper>
      <Footer />
    </>
  );
};

export default SubCategory;

SubCategory.propTypes = {};

const Wrapper = styled.div`
  height: 100%;
  padding: 1em;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
