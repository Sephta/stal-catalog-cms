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

const SubCategory = (props) => {
  const { id } = useParams();
  const [subCategory, setSubCategory] = useState(null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    asyncFetchSubCategory();
  }, []);

  const asyncFetchSubCategory = async () => {
    LazyFetch({
    type: `get`,
    endpoint: `/api/subcategory/${id}`,
    onSuccess: (data) => {
      setSubCategory(data.result);
    },
    onFailure: (err) => {
      console.error(`[ERROR] - ${err}`);
    },
    })
  }

  useEffect(() => {
    if (subCategory) {
      console.debug(`[DEBUG] - ${JSON.stringify(subCategory)}`);
      asyncFetchItems();
    }
  }, [subCategory]);

  const asyncFetchItems = async () => {
    for (const itemId of subCategory.items) {
      await LazyFetch({
        type: `get`,
        endpoint: `/api/item/${itemId}`,
        onSuccess: (data) => {
          let newSubCategoryItemBlock = (<SubCategoryItemBlock 
            key={uuid()} 
            data={data.result}
          />);
          
          if (items) {
            for (const item of items) {
              if (!(item.props.data.id === data.result.id)) {
                setItems(items ? [...items, newSubCategoryItemBlock] : [newSubCategoryItemBlock]);
              }
            }
          } else {
            setItems(items ? [...items, newSubCategoryItemBlock] : [newSubCategoryItemBlock]);
          }
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err}`);
        },
      })
    }
  }

  return subCategory ? (
    <>
      <Navbar />
      <Wrapper>
        <h1>{subCategory.title}</h1>
        <Content>
          {items}
        </Content>
      </Wrapper>
      <Footer />
    </>
  ) : (<Loading />);
};

export default SubCategory;

SubCategory.propTypes = {}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1em;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
