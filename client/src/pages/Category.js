import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Navbar, Footer } from "../components";
import { SubCategoryInfoBlock } from "../components/CategoryPage";
import { useInterval, useCatalogReducer } from "../hooks";
import { CatalogDispatchAction } from "../reducers";
import { LazyFetch } from "../components/common/requests";
import { v4 as uuid } from "uuid";

const Category = (props) => {
  const { id } = useParams();

  const [pageState, dispatch] = useCatalogReducer({
    Category: null,
    SubCategory: [],
  });

  useInterval(() => {
    if (!pageState.Category) {
      LazyFetch({
        type: `get`,
        endpoint: `/api/category/${id}`,
        onSuccess: (data) => {
          // console.debug(`[DEBUG] - ${JSON.stringify(data, null, 4)}`);
          dispatch({
            type: CatalogDispatchAction.Category,
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
    if (pageState.Category) {
      LazyFetch({
        type: `post`,
        endpoint: `/api/subcategory/multi`,
        data: { ids: pageState.Category.subCategories },
        onSuccess: (data) => {
          let newPayload = [];
          for (const subCat of data.result) {
            // console.debug(`[DEBUG] - data ${JSON.stringify(subCat, null, 4)}`);
            let newSubCategoryInfoBlock = (
              <SubCategoryInfoBlock key={uuid()} data={subCat} />
            );
            newPayload = [...new Set([...newPayload, newSubCategoryInfoBlock])];
          }

          dispatch({
            type: CatalogDispatchAction.SubCategory,
            payload: newPayload,
          });
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err}`);
        },
      });
    }
  }, [pageState.Category]);

  return (
    <>
      <Navbar />
      <Wrapper>
        <h1>{pageState.Category ? pageState.Category.name : <></>}</h1>
        <ContentWrapper>
          {/* { pageState.SubCategory.length > 0 ? pageState.SubCategory : <ThreeDots fill={`var\(--highlight-04\)`} /> } */}
          {pageState.SubCategory.length > 0 ? pageState.SubCategory : <></>}
        </ContentWrapper>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Category;

Category.propTypes = {};

const Wrapper = styled.div`
  height: 100%;
  padding: 1em;
`;

const ContentWrapper = styled.ul`
  padding: 1em;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
`;
