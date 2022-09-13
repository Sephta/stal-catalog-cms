import React, { useState, useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { SubCategoryInfoBlock } from '../components/CategoryPage';
import Loading from '../components/common/Loading';
import { useInterval } from '../hooks';
import { LazyFetch } from '../components/common/requests';
import { v4 as uuid } from 'uuid';
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots';

const DispatchAction = {
  Category: 'category',
  SubCategories: 'subcategories',
}

const reducer = (state, action) => {
  switch (action.type) {
    case DispatchAction.Category:
      return { ...state, category: action.payload };
    case DispatchAction.SubCategories:
      return { ...state, subCategories: action.payload };
    default:
      break;
  }
}

const Category = (props) => {
  const { id } = useParams();

  const [pageState, dispatch] = useReducer(reducer, {
    category: null,
    subCategories: [],
  });

  useInterval(() => {
    if (!pageState.category) {
      LazyFetch({
        type: `get`,
        endpoint: `/api/category/${id}`,
        onSuccess: (data) => {
          // console.debug(`[DEBUG] - ${JSON.stringify(data, null, 4)}`);
          dispatch({ type: DispatchAction.Category, payload: data.result });
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err}`);
        },
      })
    }
  }, 1000);

  useEffect(() => {
    if (pageState.category) {
      LazyFetch({
        type: `post`,
        endpoint: `/api/subcategory/multi`,
        data: { ids: pageState.category.subCategories },
        onSuccess: (data) => {
          let newPayload = []
          for (const subCat of data.result) {
            // console.debug(`[DEBUG] - data ${JSON.stringify(subCat, null, 4)}`);
            let newSubCategoryInfoBlock = <SubCategoryInfoBlock key={uuid()} data={subCat} />;
            newPayload = [...new Set([...newPayload, newSubCategoryInfoBlock])]
          }
          
          dispatch({ type: DispatchAction.SubCategories, payload: newPayload });
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err}`);
        },
      })
    }
  }, [pageState.category]);

  // useEffect(() => {
  //   if (pageState.subCategories) {
  //     console.debug(`[DEBUG] - REDUCER TEST UPDATED ${JSON.stringify(pageState, null, 4)}`);
  //   }
  // }, [pageState]);

  return pageState.category ? (
    <>
      <Navbar />
      <Wrapper>
        <h1>{pageState.category.name}</h1>
        <ContentWrapper>
          { pageState.subCategories.length > 0 ? pageState.subCategories : <ThreeDots fill={`var\(--highlight-04\)`} /> }
        </ContentWrapper>
      </Wrapper>
      <Footer />
    </>
  ) : (<Loading />);
};

export default Category;

Category.propTypes = {}

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
