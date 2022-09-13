import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { useEffect } from 'react';
import Loading from '../components/common/Loading';
import { LazyFetch } from '../components/common/requests';
import SubCategoryItemBlock from '../components/CategoryPage/SubCategoryItemBlock';
import { v4 as uuid } from 'uuid';
import { useReducer } from 'react';
import { useInterval } from '../hooks';
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots';

const DispatchAction = {
  SubCategory: 'subcategory',
  Items: 'items'
}

const reducer = (state, action) => {
  switch (action.type) {
    case DispatchAction.SubCategory:
      return { ...state, subCategory: action.payload };
    case DispatchAction.Items:
      return { ...state, items: action.payload };
    default:
      break;
  }
}

const SubCategory = (props) => {
  const { id } = useParams();
  const [subCategory, setSubCategory] = useState(null);
  const [items, setItems] = useState(null);

  const [pageState, dispatch] = useReducer(reducer, {
    subCategory: null,
    items: [],
  });

  useInterval(() => {
    if (!pageState.subCategory) {
      LazyFetch({
        type: `get`,
        endpoint: `/api/subcategory/${id}`,
        onSuccess: (data) => {
          dispatch({ type: DispatchAction.SubCategory, payload: data.result });
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err}`);
        },
      })
    }
  }, 1000);

  useEffect(() => {
    if (pageState.subCategory) {
      LazyFetch({
        type: `post`,
        endpoint: `/api/item/multi`,
        data: { ids: pageState.subCategory.items },
        onSuccess: (data) => {
          let newPayload = []
          for (const item of data.result) {
            let newSubCategoryItemBlock = (<SubCategoryItemBlock 
              key={uuid()} 
              data={item}
            />);

            newPayload.push(newSubCategoryItemBlock)
          }
          dispatch({ type: DispatchAction.Items, payload: newPayload });
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err}`);
        },
      })
    }
  }, [pageState.subCategory]);

  return pageState.subCategory ? (
    <>
      <Navbar />
      <Wrapper>
        <h1>{pageState.subCategory.title}</h1>
        <Content>
          { pageState.items ? pageState.items : <ThreeDots fill={`var\(--highlight-04\)`} /> }
        </Content>
      </Wrapper>
      <Footer />
    </>
  ) : (<Loading />);
};

export default SubCategory;

SubCategory.propTypes = {}

const Wrapper = styled.div`
  height: 100%;
  padding: 1em;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
